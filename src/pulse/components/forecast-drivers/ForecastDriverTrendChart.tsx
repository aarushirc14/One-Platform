import type { ForecastDriverTrendPoint } from '@/pulse/data/forecastLeadingIndicators'

type ForecastDriverTrendChartProps = {
  metricLabel: string
  points: ForecastDriverTrendPoint[]
  /** Stable id for gradient / aria (e.g. row rank). */
  chartId: string
}

const W = 640
const H = 220
const PAD_L = 48
const PAD_R = 20
const PAD_T = 24
const PAD_B = 40

function buildPath(
  values: number[],
  plotW: number,
  plotH: number,
): { line: string; area: string; dots: { cx: number; cy: number }[] } {
  const n = values.length
  if (n === 0) return { line: '', area: '', dots: [] }
  const min = Math.min(...values)
  const max = Math.max(...values)
  const span = max - min || 1
  const padY = span * 0.08
  const y0 = min - padY
  const y1 = max + padY
  const range = y1 - y0

  const dots: { cx: number; cy: number }[] = []
  const xAt = (i: number) => (n === 1 ? plotW / 2 : (i / (n - 1)) * plotW)

  const pts = values.map((v, i) => {
    const x = xAt(i)
    const y = plotH - ((v - y0) / range) * plotH
    dots.push({ cx: x, cy: y })
    return `${x.toFixed(1)},${y.toFixed(1)}`
  })

  const line = `M ${pts.join(' L ')}`
  const firstX = dots[0]?.cx ?? 0
  const lastX = dots[dots.length - 1]?.cx ?? plotW
  const area = `${line} L ${lastX.toFixed(1)} ${plotH} L ${firstX.toFixed(1)} ${plotH} Z`

  return { line, area, dots }
}

export function ForecastDriverTrendChart({ metricLabel, points, chartId }: ForecastDriverTrendChartProps) {
  const plotW = W - PAD_L - PAD_R
  const plotH = H - PAD_T - PAD_B
  const values = points.map((p) => p.value)
  const { line, area, dots } = buildPath(values, plotW, plotH)

  const min = values.length ? Math.min(...values) : 0
  const max = values.length ? Math.max(...values) : 0
  const yLow = Math.round(min)
  const yHigh = Math.round(max)

  const gradId = `trend-fill-${chartId}`
  const titleId = `trend-title-${chartId}`
  const descId = `trend-desc-${chartId}`
  const n = points.length

  return (
    <div className="rounded-lg border border-neutral-200/90 bg-white px-3 py-3 sm:px-4 sm:py-4">
      <p id={titleId} className="text-sm font-semibold text-neutral-900">
        Trend — {metricLabel}
      </p>
      <p id={descId} className="mt-0.5 text-xs text-neutral-500">
        Monthly index by period — illustrative scale for this view.
      </p>
      <div className="mt-3 overflow-x-auto">
        <svg
          width={W}
          height={H}
          viewBox={`0 0 ${W} ${H}`}
          className="h-auto w-full min-w-[min(100%,640px)] max-w-full"
          role="img"
          aria-labelledby={`${titleId} ${descId}`}
        >
          <title>Trend for {metricLabel}</title>
          <defs>
            <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#2563eb" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#2563eb" stopOpacity="0.02" />
            </linearGradient>
          </defs>
          <g transform={`translate(${PAD_L},${PAD_T})`}>
            <line x1={0} y1={plotH} x2={plotW} y2={plotH} className="stroke-neutral-200" strokeWidth={1} />
            <line x1={0} y1={0} x2={0} y2={plotH} className="stroke-neutral-200" strokeWidth={1} />
            <text x={-8} y={6} className="fill-neutral-500" style={{ fontSize: 10 }}>
              {yHigh}
            </text>
            <text x={-8} y={plotH} className="fill-neutral-500" style={{ fontSize: 10 }}>
              {yLow}
            </text>
            <path d={area} fill={`url(#${gradId})`} />
            <path
              d={line}
              fill="none"
              stroke="#2563eb"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {dots.map((d, i) => (
              <circle key={i} cx={d.cx} cy={d.cy} r={3.5} className="fill-white stroke-blue-600" strokeWidth={2} />
            ))}
            {points.map((p, i) => {
              const x = n === 1 ? plotW / 2 : (i / Math.max(1, n - 1)) * plotW
              return (
                <text
                  key={`${p.period}-${i}`}
                  x={x}
                  y={plotH + 22}
                  textAnchor="middle"
                  className="fill-neutral-600"
                  style={{ fontSize: 11 }}
                >
                  {p.period}
                </text>
              )
            })}
          </g>
        </svg>
      </div>
    </div>
  )
}
