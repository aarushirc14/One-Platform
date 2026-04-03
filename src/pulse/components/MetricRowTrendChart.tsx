import { useCallback, useState } from 'react'
import { WEB_TRAFFIC_TO_LEADS_TREND, type MetricTrendMonthPoint } from '@/pulse/mock/metricRowTrendSeries'
import { chartPalette } from '@/pulse/styles/chartPalette'
import { cn } from '@/lib/cn'

const W = 720
const H = 248
const padL = 56
const padR = 20
const padT = 12
const padB = 44

const Y_MAX = 2
const Y_TICKS = [0, 0.5, 1.0, 1.5, 2.0]

function formatYTick(v: number): string {
  if (v === 0) return '0.0%'
  if (v === 0.5) return '0.50%'
  if (v === 1.0) return '1.0%'
  if (v === 1.5) return '1.5%'
  return `${v.toFixed(1)}%`
}

function buildPath(
  points: MetricTrendMonthPoint[],
  key: 'communityRate' | 'divisionAvgRate',
  xFn: (i: number) => number,
  yFn: (v: number) => number,
): string {
  return points
    .map((p, i) => `${i === 0 ? 'M' : 'L'} ${xFn(i).toFixed(2)} ${yFn(p[key]).toFixed(2)}`)
    .join(' ')
}

type MetricRowTrendChartProps = {
  data?: MetricTrendMonthPoint[]
  className?: string
}

export function MetricRowTrendChart({ data = WEB_TRAFFIC_TO_LEADS_TREND, className }: MetricRowTrendChartProps) {
  const [hover, setHover] = useState<number | null>(null)
  const clearHover = useCallback(() => setHover(null), [])

  const innerW = W - padL - padR
  const innerH = H - padT - padB
  const n = data.length

  const x = (i: number) => padL + (n <= 1 ? innerW / 2 : (innerW * i) / (n - 1))
  const y = (v: number) => padT + innerH - (v / Y_MAX) * innerH

  const bandW = n <= 1 ? innerW : innerW / (n - 1)
  const hitHalf = Math.max(14, bandW * 0.48)

  const pathCommunity = buildPath(data, 'communityRate', x, y)
  const pathDivision = buildPath(data, 'divisionAvgRate', x, y)

  const benchmarkY = y(data[0]?.industryBenchmarkRate ?? 1.5)
  const benchmarkX1 = padL
  const benchmarkX2 = W - padR

  const c = chartPalette.actualPrimary
  const d = chartPalette.actualSecondary
  const b = chartPalette.target

  const hi = hover !== null ? data[hover] : null
  const tooltipX = hover !== null ? Math.min(Math.max(x(hover), padL + 62), W - padR - 62) : 0

  return (
    <div className={cn('rounded-lg border border-neutral-200 bg-white px-2 py-4 sm:px-4', className)}>
      <h3 className="text-center text-base font-bold text-neutral-950 sm:text-lg">Web Traffic to Total Leads Rate</h3>
      <p className="mt-0.5 text-center text-sm text-neutral-500">Rolling 3 Month Aggregation</p>

      <div className="relative mt-4">
        <svg
          className="w-full max-w-full"
          viewBox={`0 0 ${W} ${H}`}
          preserveAspectRatio="xMidYMid meet"
          role="img"
          aria-label="Line chart: community rate, division average rate, and industry benchmark by month"
          onMouseLeave={clearHover}
        >
          <title>Web Traffic to Total Leads rate over twelve months</title>

          {Y_TICKS.map((v) => {
            const py = y(v)
            return (
              <line
                key={v}
                x1={padL}
                x2={benchmarkX2}
                y1={py}
                y2={py}
                stroke="#e5e5e5"
                strokeWidth={1}
                strokeDasharray="5 5"
                style={{ pointerEvents: 'none' }}
              />
            )
          })}

          {data.map((_, i) => (
            <line
              key={`vgrid-${i}`}
              x1={x(i)}
              x2={x(i)}
              y1={padT}
              y2={padT + innerH}
              stroke="#ebebeb"
              strokeWidth={1}
              style={{ pointerEvents: 'none' }}
            />
          ))}

          <line
            x1={benchmarkX1}
            x2={benchmarkX2}
            y1={benchmarkY}
            y2={benchmarkY}
            fill="none"
            stroke={b}
            strokeWidth={2}
            strokeDasharray="7 5"
            style={{ pointerEvents: 'none' }}
          />

          <path
            d={pathDivision}
            fill="none"
            stroke={d}
            strokeWidth={2.25}
            strokeDasharray="6 5"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ pointerEvents: 'none' }}
          />
          {data.map((p, i) => (
            <circle
              key={`dm-${i}`}
              cx={x(i)}
              cy={y(p.divisionAvgRate)}
              r={3.5}
              fill={d}
              stroke={d}
              strokeWidth={1}
              style={{ pointerEvents: 'none' }}
            />
          ))}

          <path
            d={pathCommunity}
            fill="none"
            stroke={c}
            strokeWidth={2.25}
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ pointerEvents: 'none' }}
          />
          {data.map((p, i) => (
            <circle
              key={`cm-${i}`}
              cx={x(i)}
              cy={y(p.communityRate)}
              r={4}
              fill="#ffffff"
              stroke={c}
              strokeWidth={2}
              style={{ pointerEvents: 'none' }}
            />
          ))}

          {data.map((_, i) => (
            <rect
              key={`hit-${i}`}
              x={x(i) - hitHalf}
              y={padT}
              width={hitHalf * 2}
              height={innerH}
              fill="transparent"
              className="cursor-crosshair"
              onMouseEnter={() => setHover(i)}
            />
          ))}

          {Y_TICKS.map((v) => (
            <text
              key={`yl-${v}`}
              x={padL - 8}
              y={y(v) + 4}
              fill="#737373"
              fontSize={10}
              textAnchor="end"
              style={{ pointerEvents: 'none' }}
            >
              {formatYTick(v)}
            </text>
          ))}

          {data.map((p, i) => (
            <text
              key={`xl-${p.axisLabel}`}
              x={x(i)}
              y={H - 10}
              fill="#525252"
              fontSize={10}
              textAnchor="middle"
              style={{ pointerEvents: 'none' }}
            >
              {p.axisLabel}
            </text>
          ))}

          {hi ? (
            <g pointerEvents="none" transform={`translate(${tooltipX}, ${padT + 6})`}>
              <rect x={-68} y={0} width={136} height={76} rx={8} fill="#fff" stroke="#d4d4d4" strokeWidth={1} />
              <text x={0} y={16} fill="#171717" fontSize={11} fontWeight={700} textAnchor="middle">
                {hi.tooltipTitle}
              </text>
              <text x={-58} y={34} fill={d} fontSize={9} textAnchor="start">
                Division Average Rate: {hi.divisionAvgRate.toFixed(2)}%
              </text>
              <text x={-58} y={48} fill={b} fontSize={9} textAnchor="start">
                Industry Benchmark Rate: {hi.industryBenchmarkRate.toFixed(2)}%
              </text>
              <text x={-58} y={62} fill={c} fontSize={9} textAnchor="start">
                Community Rate: {hi.communityRate.toFixed(2)}%
              </text>
            </g>
          ) : null}
        </svg>
      </div>

      <ul className="mt-3 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs font-medium sm:text-sm">
        <li className="flex items-center gap-2" style={{ color: d }}>
          <span className="inline-block w-5 border-t-2 border-dashed" style={{ borderColor: d }} aria-hidden />
          Division Average Rate
        </li>
        <li className="flex items-center gap-2" style={{ color: b }}>
          <span className="inline-block w-5 border-t-2 border-dashed" style={{ borderColor: b }} aria-hidden />
          Industry Benchmark Rate
        </li>
        <li className="flex items-center gap-2" style={{ color: c }}>
          <span className="h-1 w-5 rounded-full" style={{ background: c }} aria-hidden />
          Community Rate
        </li>
      </ul>
    </div>
  )
}
