import { useMemo } from 'react'
import {
  NINETY_DAY_MONTHLY_TARGET_PACE,
  ninetyDayForecastReportMonthIndex,
  ninetyDaySalesForecastSeries,
  type NinetyDayForecastMonthPoint,
} from '@/pulse/data/divisionPerformanceReport'
import { chartPalette } from '@/pulse/styles/chartPalette'
import { pulseChartSubtitle, pulseChartTitle } from '@/pulse/ui/pulseTypography'

const W = 920
const H = 340
const PAD_L = 52
const PAD_R = 28
const PAD_T = 48
const PAD_B = 72

function collectNumericExtents(data: NinetyDayForecastMonthPoint[], targetPace: number): { ymin: number; ymax: number } {
  let lo = Number.POSITIVE_INFINITY
  let hi = Number.NEGATIVE_INFINITY
  for (const p of data) {
    for (const v of [p.actual, p.forecastMid, p.forecastLow, p.forecastHigh]) {
      if (v !== null) {
        lo = Math.min(lo, v)
        hi = Math.max(hi, v)
      }
    }
  }
  if (!Number.isFinite(lo)) lo = 8
  if (!Number.isFinite(hi)) hi = 16
  hi = Math.max(hi, targetPace)
  const pad = Math.max(0.55, (hi - lo) * 0.11)
  return { ymin: lo - pad, ymax: hi + pad }
}

function sx(i: number, plotW: number, n: number) {
  return PAD_L + (i / Math.max(1, n - 1)) * plotW
}

function sy(v: number, plotH: number, ymin: number, ymax: number) {
  return PAD_T + ((ymax - v) / (ymax - ymin)) * plotH
}

function lineThrough(
  data: NinetyDayForecastMonthPoint[],
  plotW: number,
  plotH: number,
  n: number,
  ymin: number,
  ymax: number,
  pick: (p: NinetyDayForecastMonthPoint) => number | null,
): string {
  const pts: string[] = []
  for (let i = 0; i < n; i++) {
    const val = pick(data[i])
    if (val === null) continue
    const x = sx(i, plotW, n)
    const y = sy(val, plotH, ymin, ymax)
    pts.push(`${pts.length === 0 ? 'M' : 'L'} ${x.toFixed(2)} ${y.toFixed(2)}`)
  }
  return pts.join(' ')
}

function confidenceBandPath(
  data: NinetyDayForecastMonthPoint[],
  plotW: number,
  plotH: number,
  n: number,
  ymin: number,
  ymax: number,
): string {
  const top: { x: number; y: number }[] = []
  const bot: { x: number; y: number }[] = []
  for (let i = 0; i < n; i++) {
    const p = data[i]
    if (p.forecastHigh === null || p.forecastLow === null) continue
    top.push({ x: sx(i, plotW, n), y: sy(p.forecastHigh, plotH, ymin, ymax) })
    bot.push({ x: sx(i, plotW, n), y: sy(p.forecastLow, plotH, ymin, ymax) })
  }
  if (top.length < 2) return ''
  const forward = top
    .slice(1)
    .map((pt) => `L ${pt.x.toFixed(2)} ${pt.y.toFixed(2)}`)
    .join(' ')
  const back = [...bot]
    .reverse()
    .map((pt) => `L ${pt.x.toFixed(2)} ${pt.y.toFixed(2)}`)
    .join(' ')
  return `M ${top[0].x.toFixed(2)} ${top[0].y.toFixed(2)} ${forward} ${back} Z`
}

export function NinetyDaySalesForecastChart() {
  const data = ninetyDaySalesForecastSeries
  const n = data.length
  const plotW = W - PAD_L - PAD_R
  const plotH = H - PAD_T - PAD_B
  const { ymin, ymax } = useMemo(() => collectNumericExtents(data, NINETY_DAY_MONTHLY_TARGET_PACE), [data])
  const reportIdx =
    ninetyDayForecastReportMonthIndex >= 0 ? ninetyDayForecastReportMonthIndex : n - 4

  const actualPath = useMemo(
    () => lineThrough(data, plotW, plotH, n, ymin, ymax, (p) => p.actual),
    [data, plotH, plotW, n, ymin, ymax],
  )

  const forecastPath = useMemo(
    () => lineThrough(data, plotW, plotH, n, ymin, ymax, (p) => p.forecastMid),
    [data, plotH, plotW, n, ymin, ymax],
  )

  const bandPath = useMemo(
    () => confidenceBandPath(data, plotW, plotH, n, ymin, ymax),
    [data, plotH, plotW, n, ymin, ymax],
  )

  const yTicks = useMemo(() => {
    const step = 2
    const ticks: number[] = []
    let v = Math.ceil(ymin / step) * step
    while (v <= ymax + 0.001) {
      ticks.push(v)
      v += step
    }
    if (ticks.length > 8) {
      return [8, 10, 12, 14, 16, 18].filter((t) => t >= ymin - 0.5 && t <= ymax + 0.5)
    }
    return ticks
  }, [ymin, ymax])

  const targetY = sy(NINETY_DAY_MONTHLY_TARGET_PACE, plotH, ymin, ymax)
  const markerX = sx(reportIdx, plotW, n)

  const bandFill = `${chartPalette.forecastSoft}55`
  const bandStroke = `${chartPalette.forecastSoft}99`

  return (
    <div className="overflow-hidden rounded-lg border border-neutral-200 bg-white shadow-sm">
      <div className="border-b border-neutral-100 px-4 py-3 sm:px-5 sm:py-4">
        <h3 className={pulseChartTitle}>90-Day Sales Forecast</h3>
        <p className={pulseChartSubtitle}>
          Rolling 90-day actuals vs forecast with confidence interval
        </p>
      </div>

      <div className="px-2 pb-2 pt-1 sm:px-4">
        <svg
          viewBox={`0 0 ${W} ${H}`}
          className="mx-auto block h-auto w-full max-w-[min(100%,56rem)]"
          role="img"
          aria-label="90-day monthly average sales pace: teal actuals, amber historical and forward forecast near actuals, confidence band, fifteen per month target from March 31 forward, vertical marker labeled March 31"
        >
          <title>90-Day Sales Forecast</title>
          <desc>
            Teal line is realized rolling 90-day monthly average sales through March 2026. Amber line is the
            model forecast for the same window — close to actuals but not identical historically — then
            continues forward with a             light teal confidence band for the full series (narrower in the historical window). A dashed
            horizontal target at fifteen per month applies only from the report month onward. A vertical marker
            shows the report month.
          </desc>

          {/* Grid + Y-axis labels */}
          {yTicks.map((v) => {
            const y = sy(v, plotH, ymin, ymax)
            return (
              <g key={v}>
                <line
                  x1={PAD_L}
                  y1={y}
                  x2={PAD_L + plotW}
                  y2={y}
                  className="stroke-neutral-100"
                  strokeWidth={1}
                />
                <text
                  x={PAD_L - 10}
                  y={y + 4}
                  textAnchor="end"
                  className="fill-neutral-500"
                  style={{ fontSize: 10, fontFamily: 'inherit' }}
                >
                  {v}
                </text>
              </g>
            )
          })}

          {/* Next-90-days target only from report month forward (not historical). */}
          <line
            x1={markerX}
            y1={targetY}
            x2={PAD_L + plotW}
            y2={targetY}
            stroke={chartPalette.target}
            strokeWidth={1.2}
            strokeDasharray="6 5"
            opacity={0.85}
          />
          <text
            x={PAD_L + plotW - 4}
            y={targetY - 6}
            textAnchor="end"
            className="fill-neutral-500"
            style={{ fontSize: 10, fontFamily: 'inherit' }}
          >
            Target ({NINETY_DAY_MONTHLY_TARGET_PACE}/mo)
          </text>

          {/* Confidence band */}
          {bandPath ? (
            <path d={bandPath} fill={bandFill} stroke={bandStroke} strokeWidth={0.75} />
          ) : null}

          {/* Forecast line */}
          {forecastPath ? (
            <path
              d={forecastPath}
              fill="none"
              stroke={chartPalette.forecastAccent}
              strokeWidth={2.25}
              strokeLinecap="butt"
              strokeLinejoin="miter"
              strokeMiterlimit={8}
            />
          ) : null}

          {/* Actual line */}
          {actualPath ? (
            <path
              d={actualPath}
              fill="none"
              stroke={chartPalette.actualPrimary}
              strokeWidth={2.75}
              strokeLinecap="butt"
              strokeLinejoin="miter"
              strokeMiterlimit={8}
            />
          ) : null}

          {/* Report date */}
          <line
            x1={markerX}
            y1={PAD_T}
            x2={markerX}
            y2={PAD_T + plotH}
            stroke={chartPalette.target}
            strokeWidth={1.5}
          />
          <text
            x={markerX}
            y={PAD_T - 6}
            textAnchor="middle"
            className="fill-neutral-900"
            style={{ fontSize: 10, fontFamily: 'inherit', fontWeight: 600 }}
          >
            March 31
          </text>

          {/* X-axis */}
          <line
            x1={PAD_L}
            y1={PAD_T + plotH}
            x2={PAD_L + plotW}
            y2={PAD_T + plotH}
            className="stroke-neutral-300"
            strokeWidth={1}
          />

          {data.map((p, i) => {
            const x = sx(i, plotW, n)
            return (
              <text
                key={p.axisLabel}
                x={x}
                y={H - 28}
                textAnchor="end"
                transform={`rotate(-42 ${x} ${H - 28})`}
                className="fill-neutral-500"
                style={{ fontSize: 9, fontFamily: 'inherit' }}
              >
                {p.axisLabel}
              </text>
            )
          })}
        </svg>

        <div className="flex flex-wrap gap-x-6 gap-y-2 border-t border-neutral-100 px-3 py-3 text-[11px] text-neutral-600 sm:px-4">
          <span className="inline-flex items-center gap-2">
            <span className="h-0.5 w-6 rounded-full" style={{ background: chartPalette.forecastAccent }} />
            Forecast (90-Day Monthly Avg)
          </span>
          <span className="inline-flex items-center gap-2">
            <span className="h-0.5 w-6 rounded-full" style={{ background: chartPalette.actualPrimary }} />
            Actual (90-Day Monthly Avg)
          </span>
          <span className="inline-flex items-center gap-2">
            <span
              className="inline-block h-3 w-px"
              style={{ background: chartPalette.target }}
            />
            Current Date
          </span>
          <span className="inline-flex items-center gap-2">
            <span
              className="inline-block w-6 border-t border-dashed"
              style={{ borderColor: chartPalette.target }}
            />
            Target
          </span>
        </div>
      </div>
    </div>
  )
}
