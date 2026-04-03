import { useMemo } from 'react'
import type { CumulativeSalesComparisonPoint } from '@/pulse/data/divisionPerformanceReport'
import { pulseChartSubtitle, pulseChartTitle } from '@/pulse/ui/pulseTypography'
import { chartPalette } from '@/pulse/styles/chartPalette'

type CumulativeSalesComparisonChartProps = {
  data: CumulativeSalesComparisonPoint[]
}

const Y_MAX = 160
const W = 920
const H = 360
const PAD_L = 48
const PAD_R = 28
const PAD_T = 56
const PAD_B = 88

const SERIES_2026 = chartPalette.actualPrimary
const SERIES_2025 = chartPalette.actualSecondary
const SERIES_2024 = chartPalette.forecastSoft
const TARGET_STROKE = chartPalette.target

function sx(i: number, plotW: number, n: number) {
  return PAD_L + (i / Math.max(1, n - 1)) * plotW
}

function sy(v: number, plotH: number) {
  return PAD_T + ((Y_MAX - v) / Y_MAX) * plotH
}

function lineD(
  indices: number[],
  values: (number | null)[],
  plotW: number,
  plotH: number,
  n: number,
) {
  const pts: string[] = []
  for (let k = 0; k < indices.length; k++) {
    const i = indices[k]
    const val = values[k]
    if (val === null) continue
    const x = sx(i, plotW, n)
    const y = sy(val, plotH)
    pts.push(`${pts.length === 0 ? 'M' : 'L'} ${x.toFixed(2)} ${y.toFixed(2)}`)
  }
  return pts.join(' ')
}

export function CumulativeSalesComparisonChart({ data }: CumulativeSalesComparisonChartProps) {
  const plotW = W - PAD_L - PAD_R
  const plotH = H - PAD_T - PAD_B
  const n = data.length

  const actualPath = useMemo(() => {
    const idx: number[] = []
    const vals: (number | null)[] = []
    data.forEach((d, i) => {
      if (d.actual2026 !== null) {
        idx.push(i)
        vals.push(d.actual2026)
      }
    })
    return lineD(idx, vals, plotW, plotH, n)
  }, [data, plotH, plotW, n])

  const forecastPath = useMemo(() => {
    const idx: number[] = []
    const vals: (number | null)[] = []
    data.forEach((d, i) => {
      if (d.forecast2026 !== null) {
        idx.push(i)
        vals.push(d.forecast2026)
      }
    })
    return lineD(idx, vals, plotW, plotH, n)
  }, [data, plotH, plotW, n])

  const bridgePath = useMemo(() => {
    let lastActualI = -1
    for (let i = data.length - 1; i >= 0; i--) {
      if (data[i].actual2026 !== null) {
        lastActualI = i
        break
      }
    }
    const firstFcI = data.findIndex((d) => d.forecast2026 !== null)
    if (lastActualI < 0 || firstFcI < 0 || firstFcI <= lastActualI) return ''
    const v0 = data[lastActualI].actual2026
    const v1 = data[firstFcI].forecast2026
    if (v0 === null || v1 === null) return ''
    const x0 = sx(lastActualI, plotW, n)
    const y0 = sy(v0, plotH)
    const x1 = sx(firstFcI, plotW, n)
    const y1 = sy(v1, plotH)
    return `M ${x0.toFixed(2)} ${y0.toFixed(2)} L ${x1.toFixed(2)} ${y1.toFixed(2)}`
  }, [data, plotH, plotW, n])

  const targetPath = useMemo(() => {
    return data
      .map((d, i) => {
        const x = sx(i, plotW, n)
        const y = sy(d.target2026, plotH)
        return `${i === 0 ? 'M' : 'L'} ${x.toFixed(2)} ${y.toFixed(2)}`
      })
      .join(' ')
  }, [data, plotH, plotW, n])

  const path2025 = useMemo(() => {
    return data
      .map((d, i) => {
        const x = sx(i, plotW, n)
        const y = sy(d.cumulative2025, plotH)
        return `${i === 0 ? 'M' : 'L'} ${x.toFixed(2)} ${y.toFixed(2)}`
      })
      .join(' ')
  }, [data, plotH, plotW, n])

  const path2024 = useMemo(() => {
    return data
      .map((d, i) => {
        const x = sx(i, plotW, n)
        const y = sy(d.cumulative2024, plotH)
        return `${i === 0 ? 'M' : 'L'} ${x.toFixed(2)} ${y.toFixed(2)}`
      })
      .join(' ')
  }, [data, plotH, plotW, n])

  const yTicks = [0, 20, 40, 60, 80, 100, 120, 140, 160]

  return (
    <div className="overflow-hidden rounded-lg border border-neutral-200 bg-white shadow-sm">
      <div className="border-b border-neutral-100 px-4 py-3 sm:px-5 sm:py-4">
        <h3 className={pulseChartTitle}>Cumulative Sales Comparison</h3>
        <p className={pulseChartSubtitle}>
          Year-to-date performance vs prior years and target (2026)
        </p>
      </div>

      <div className="px-1 pb-1 pt-2 sm:px-3">
        <svg
          className="h-auto w-full max-w-full"
          viewBox={`0 0 ${W} ${H}`}
          role="img"
          aria-label="Cumulative sales: 2026 actual and forecast vs target, 2025 and 2024"
        >
          <text
            x={PAD_L - 4}
            y={PAD_T - 32}
            textAnchor="start"
            className="fill-neutral-600 text-[11px] font-semibold"
          >
            Cumulative Sales
          </text>

          {yTicks.map((v) => (
            <g key={v}>
              <line
                x1={PAD_L}
                y1={sy(v, plotH)}
                x2={W - PAD_R}
                y2={sy(v, plotH)}
                stroke="#e5e7eb"
                strokeWidth="1"
              />
              <text
                x={PAD_L - 8}
                y={sy(v, plotH) + 4}
                textAnchor="end"
                className="fill-neutral-500 text-[10px]"
              >
                {v}
              </text>
            </g>
          ))}

          <text
            x={(PAD_L + W - PAD_R) / 2}
            y={H - 22}
            textAnchor="middle"
            className="fill-neutral-600 text-[11px] font-medium"
          >
            Month
          </text>

          {/* Prior years (under 2026) */}
          <path
            d={path2024}
            fill="none"
            stroke={SERIES_2024}
            strokeWidth="1.5"
            strokeLinejoin="round"
            strokeLinecap="round"
          />
          <path
            d={path2025}
            fill="none"
            stroke={SERIES_2025}
            strokeWidth="2.25"
            strokeLinejoin="round"
            strokeLinecap="round"
          />

          {/* 2026 target */}
          <path
            d={targetPath}
            fill="none"
            stroke={TARGET_STROKE}
            strokeWidth="1.5"
            strokeDasharray="5 4"
            strokeLinejoin="round"
          />
          {data.map((d, i) => {
            const cx = sx(i, plotW, n)
            const cy = sy(d.target2026, plotH)
            return (
              <g key={`t-${d.month}`}>
                <circle cx={cx} cy={cy} r={3} fill="white" stroke={TARGET_STROKE} strokeWidth="1.25" />
                <text
                  x={cx}
                  y={cy - 10}
                  textAnchor="middle"
                  className="fill-neutral-600 text-[9px] font-semibold"
                >
                  {d.target2026}
                </text>
              </g>
            )
          })}

          {/* 2026 actual (solid) */}
          {actualPath ? (
            <path
              d={actualPath}
              fill="none"
              stroke={SERIES_2026}
              strokeWidth="3"
              strokeLinejoin="round"
              strokeLinecap="round"
            />
          ) : null}

          {/* Bridge Feb → Mar (dashed forecast continuation) */}
          {bridgePath ? (
            <path
              d={bridgePath}
              fill="none"
              stroke={SERIES_2026}
              strokeWidth="3"
              strokeDasharray="7 5"
              strokeLinejoin="round"
            />
          ) : null}

          {/* 2026 forecast (dashed) */}
          {forecastPath ? (
            <path
              d={forecastPath}
              fill="none"
              stroke={SERIES_2026}
              strokeWidth="3"
              strokeDasharray="7 5"
              strokeLinejoin="round"
              strokeLinecap="round"
            />
          ) : null}

          {/* Markers + value labels for 2026 (blue below) */}
          {data.map((d, i) => {
            const v = d.actual2026 ?? d.forecast2026
            if (v === null) return null
            const cx = sx(i, plotW, n)
            const cy = sy(v, plotH)
            return (
              <g key={`b26-${d.month}`}>
                <circle cx={cx} cy={cy} r={5} fill="white" stroke={SERIES_2026} strokeWidth="2" />
                <text
                  x={cx}
                  y={cy + 18}
                  textAnchor="middle"
                  className="text-[10px] font-bold"
                  fill={SERIES_2026}
                >
                  {v}
                </text>
              </g>
            )
          })}

          {data.map((d, i) => (
            <text
              key={d.month}
              x={sx(i, plotW, n)}
              y={H - PAD_B + 22}
              textAnchor="middle"
              className="fill-neutral-500 text-[9px] sm:text-[10px]"
            >
              {d.month}
            </text>
          ))}
        </svg>

        <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 border-t border-neutral-100 px-3 py-3 text-[10px] text-neutral-600 sm:gap-x-6 sm:px-4 sm:text-[11px]">
          <span className="inline-flex items-center gap-2">
            <span className="inline-flex items-center">
              <span className="h-0.5 w-5 rounded-full" style={{ background: SERIES_2026 }} />
              <span
                className="ml-1 inline-block h-2 w-2 rounded-full border-2 bg-white"
                style={{ borderColor: SERIES_2026 }}
              />
            </span>
            2026 (Actuals)
          </span>
          <span className="inline-flex items-center gap-2">
            <span
              className="inline-block h-0.5 w-6 border-t-[3px] border-dashed"
              style={{ borderColor: SERIES_2026 }}
            />
            <span
              className="inline-block h-2 w-2 rounded-full border-2 bg-white"
              style={{ borderColor: SERIES_2026 }}
            />
            2026 (Forecast)
          </span>
          <span className="inline-flex items-center gap-2">
            <span
              className="inline-block h-0 w-5 border-t border-dashed"
              style={{ borderColor: TARGET_STROKE }}
            />
            <span
              className="inline-block h-1.5 w-1.5 rounded-full ring-1 ring-white"
              style={{ background: TARGET_STROKE }}
            />
            2026 Target
          </span>
          <span className="inline-flex items-center gap-2">
            <span className="h-[3px] w-6 rounded-full" style={{ background: SERIES_2025 }} />
            2025
          </span>
          <span className="inline-flex items-center gap-2">
            <span className="h-0.5 w-6 rounded-full" style={{ background: SERIES_2024 }} />
            2024
          </span>
        </div>
      </div>
    </div>
  )
}
