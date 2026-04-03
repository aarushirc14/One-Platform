import { useMemo } from 'react'
import type { HistoricalMonthlySalesPoint } from '@/pulse/data/divisionPerformanceReport'
import { cn } from '@/lib/cn'
import { pulseChartSubtitle, pulseChartTitle } from '@/pulse/ui/pulseTypography'
import { chartPalette } from '@/pulse/styles/chartPalette'

type HistoricalMonthlySalesChartProps = {
  data: HistoricalMonthlySalesPoint[]
}

const Y_MAX = 35
const W = 920
const H = 360
const PAD_L = 44
const PAD_R = 28
const PAD_T = 52
const PAD_B = 72

const COLOR_PRESALE = chartPalette.actualPrimary
const COLOR_SPEC = chartPalette.actualSecondary
const COLOR_BUDGET = chartPalette.target

function sy(v: number, plotH: number) {
  return PAD_T + ((Y_MAX - v) / Y_MAX) * plotH
}

export function HistoricalMonthlySalesChart({ data }: HistoricalMonthlySalesChartProps) {
  const plotW = W - PAD_L - PAD_R
  const plotH = H - PAD_T - PAD_B
  const n = data.length
  const slot = plotW / n
  const barW = slot * 0.58
  /** Between Mar '26 (index 12) and Apr '26 (13) */
  const reportX = PAD_L + (12.5 / n) * plotW

  const budgetPath = useMemo(() => {
    return data
      .map((d, i) => {
        const cx = PAD_L + (i + 0.5) * slot
        const y = sy(d.budget, plotH)
        return `${i === 0 ? 'M' : 'L'} ${cx.toFixed(2)} ${y.toFixed(2)}`
      })
      .join(' ')
  }, [data, plotH, slot])

  const yTicks = [0, 5, 10, 15, 20, 25, 30, 35]

  return (
    <div className="overflow-hidden rounded-lg border border-neutral-200 bg-white shadow-sm">
      <div className="border-b border-neutral-100 px-4 py-3 sm:px-5 sm:py-4">
        <h3 className={pulseChartTitle}>Historical Monthly Sales</h3>
        <p className={pulseChartSubtitle}>Monthly net sales by product type vs target</p>
      </div>

      <div className="px-1 pb-1 pt-2 sm:px-3">
        <svg
          className="h-auto w-full max-w-full"
          viewBox={`0 0 ${W} ${H}`}
          role="img"
          aria-label="Historical monthly sales: stacked presale, spec, and forecast vs budget line"
        >
          <defs>
            <pattern
              id="forecastHatch"
              width="6"
              height="6"
              patternUnits="userSpaceOnUse"
              patternTransform="rotate(45)"
            >
              <rect width="6" height="6" fill={chartPalette.forecastSoft} fillOpacity={0.35} />
              <rect width="3" height="8" fill={chartPalette.actualPrimary} opacity={0.72} />
            </pattern>
          </defs>

          {/* Y label */}
          <text
            x={W - PAD_R - 4}
            y={PAD_T - 28}
            textAnchor="end"
            className="fill-neutral-600 text-[11px] font-semibold"
          >
            Monthly Sales
          </text>

          {/* Grid + Y ticks */}
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
              <text
                x={W - PAD_R + 8}
                y={sy(v, plotH) + 4}
                textAnchor="start"
                className="fill-neutral-500 text-[10px]"
              >
                {v}
              </text>
            </g>
          ))}

          {/* X label */}
          <text
            x={(PAD_L + W - PAD_R) / 2}
            y={H - 18}
            textAnchor="middle"
            className="fill-neutral-600 text-[11px] font-medium"
          >
            Month
          </text>

          {/* Report date marker */}
          <line
            x1={reportX}
            y1={PAD_T}
            x2={reportX}
            y2={H - PAD_B}
            stroke="#d1d5db"
            strokeWidth="1.5"
            strokeDasharray="5 4"
          />
          <text
            x={reportX - 6}
            y={PAD_T - 8}
            textAnchor="end"
            className="fill-neutral-500 text-[10px] font-semibold"
          >
            Report Date Forecast →
          </text>

          {/* Bars */}
          {data.map((d, i) => {
            const cx = PAD_L + (i + 0.5) * slot
            const x = cx - barW / 2
            const segments: { key: string; val: number; fill: string }[] = [
              { key: 'p', val: d.presale, fill: COLOR_PRESALE },
              { key: 's', val: d.spec, fill: COLOR_SPEC },
              { key: 'f', val: d.forecast, fill: 'url(#forecastHatch)' },
            ]

            const total = d.presale + d.spec + d.forecast
            const labelY = sy(total, plotH) - 6

            let cumulative = 0
            return (
              <g key={d.month}>
                {segments.map((seg) => {
                  if (seg.val <= 0) return null
                  const yBottom = sy(cumulative, plotH)
                  cumulative += seg.val
                  const yTop = sy(cumulative, plotH)
                  const h = yBottom - yTop
                  const showIn = h > 12
                  const forecastSeg = seg.key === 'f'
                  return (
                    <g key={seg.key}>
                      <rect
                        x={x}
                        y={yTop}
                        width={barW}
                        height={h}
                        fill={seg.fill}
                        stroke="white"
                        strokeWidth="0.5"
                        shapeRendering="crispEdges"
                      />
                      {showIn ? (
                        <text
                          x={cx}
                          y={yTop + h / 2 + 3}
                          textAnchor="middle"
                          className={cn(
                            'text-[9px] font-semibold',
                            forecastSeg ? 'fill-neutral-900' : 'fill-white',
                          )}
                          style={
                            forecastSeg
                              ? undefined
                              : { textShadow: '0 0 2px rgba(0,0,0,0.35)' }
                          }
                        >
                          {seg.val}
                        </text>
                      ) : null}
                    </g>
                  )
                })}
                <text
                  x={cx}
                  y={labelY}
                  textAnchor="middle"
                  className="fill-neutral-900 text-[11px] font-bold"
                >
                  {total}
                </text>
              </g>
            )
          })}

          {/* Budget line */}
          <path
            d={budgetPath}
            fill="none"
            stroke={COLOR_BUDGET}
            strokeWidth="1.75"
            strokeDasharray="5 4"
            strokeLinejoin="round"
          />
          {data.map((d, i) => {
            const cx = PAD_L + (i + 0.5) * slot
            const y = sy(d.budget, plotH)
            return (
              <g key={`b-${d.month}`}>
                <circle cx={cx} cy={y} r={3.5} fill="white" stroke={COLOR_BUDGET} strokeWidth="1.5" />
                <text x={cx} y={y - 8} textAnchor="middle" className="fill-neutral-600 text-[9px] font-medium">
                  {d.budget}
                </text>
              </g>
            )
          })}

          {/* X month labels */}
          {data.map((d, i) => {
            const cx = PAD_L + (i + 0.5) * slot
            return (
              <text
                key={d.month}
                x={cx}
                y={H - PAD_B + 20}
                textAnchor="middle"
                className="fill-neutral-500 text-[8px] sm:text-[9px]"
              >
                {d.month}
              </text>
            )
          })}
        </svg>

        <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 border-t border-neutral-100 px-3 py-3 text-[10px] text-neutral-600 sm:gap-x-7 sm:px-4 sm:text-[11px]">
          <span className="inline-flex items-center gap-2">
            <span
              className="inline-block h-0.5 w-7 border-t border-dashed"
              style={{ borderColor: COLOR_BUDGET }}
            />
            Budget
          </span>
          <span className="inline-flex items-center gap-2">
            <span className="h-2.5 w-5 rounded-sm" style={{ background: COLOR_PRESALE }} />
            Presale
          </span>
          <span className="inline-flex items-center gap-2">
            <span className="h-2.5 w-5 rounded-sm" style={{ background: COLOR_SPEC }} />
            Spec
          </span>
          <span className="inline-flex items-center gap-2">
            <span
              className="h-2.5 w-5 rounded-sm opacity-50"
              style={{ background: chartPalette.forecastAccent }}
              aria-hidden
            />
            <span className="text-neutral-400">Model</span>
          </span>
          <span className="inline-flex items-center gap-2">
            <span
              className="h-2.5 w-5 rounded-sm"
              style={{
                background: `repeating-linear-gradient(45deg, ${chartPalette.actualPrimary}, ${chartPalette.actualPrimary} 2px, ${chartPalette.forecastSoft} 2px, ${chartPalette.forecastSoft} 4px)`,
              }}
            />
            Forecast
          </span>
        </div>
      </div>
    </div>
  )
}
