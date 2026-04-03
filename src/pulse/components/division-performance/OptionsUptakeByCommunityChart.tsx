import { Link } from 'react-router-dom'
import type { OptionsUptakeCommunityRow } from '@/pulse/data/divisionPerformanceReport'
import {
  optionsUptakeByCommunity,
  optionsUptakeChartIntro,
  optionsUptakeWeightedAvg,
} from '@/pulse/data/divisionPerformanceReport'
import { openhomesCommunityPath } from '@/pulse/constants/routes'
import { cn } from '@/lib/cn'
import { pulseChartSubtitle, pulseChartTitle } from '@/pulse/ui/pulseTypography'
import { chartPalette } from '@/pulse/styles/chartPalette'

const Y_MAX = 16
const BAR_W = 28
const BAR_GAP = 10
const COL_180 = chartPalette.actualPrimary
const COL_90 = chartPalette.forecastSoft

/** Inner chart dimensions (viewBox space). */
const W = 800
const H = 300
const PAD_L = 52
const PAD_R = 28
const PAD_T = 78
const PAD_B = 36

function yForPct(pct: number, plotH: number) {
  return PAD_T + plotH * (1 - pct / Y_MAX)
}

type BarLabelsProps = {
  x: number
  yTop: number
  sold: number
  pct: number
}

function BarLabels({ x, yTop, sold, pct }: BarLabelsProps) {
  const pctStr = `${pct.toFixed(1)}%`
  return (
    <g>
      <text
        x={x}
        y={yTop - 22}
        textAnchor="middle"
        className="fill-neutral-500"
        style={{ fontSize: 10, fontFamily: 'inherit' }}
      >
        {sold} sold
      </text>
      <text
        x={x}
        y={yTop - 6}
        textAnchor="middle"
        className="fill-neutral-900 font-bold"
        style={{ fontSize: 13, fontFamily: 'inherit' }}
      >
        {pctStr}
      </text>
    </g>
  )
}

export function OptionsUptakeByCommunityChart({
  rows = optionsUptakeByCommunity,
}: {
  rows?: OptionsUptakeCommunityRow[]
}) {
  const plotW = W - PAD_L - PAD_R
  const plotH = H - PAD_T - PAD_B
  const yBase = PAD_T + plotH
  const n = rows.length
  const groupW = plotW / n

  const gridLines = [0, 2, 4, 6, 8, 10, 12, 14, 16]

  return (
    <div className="overflow-hidden rounded-lg border border-neutral-200 bg-white shadow-sm">
      <div className="border-b border-neutral-200 px-4 py-3 sm:px-5 sm:py-4">
        <h3 className={pulseChartTitle}>{optionsUptakeChartIntro.title}</h3>
        <p className={cn(pulseChartSubtitle, 'leading-relaxed')}>{optionsUptakeChartIntro.subtitle}</p>
      </div>

      <div className="px-2 pb-2 pt-4 sm:px-4">
        <svg
          viewBox={`0 0 ${W} ${H}`}
          className="h-auto w-full max-w-full"
          role="img"
          aria-label="Options uptake by community, 180-day vs 90-day"
        >
          <title>Options uptake by community</title>

          {/* Y-axis labels + grid */}
          {gridLines.map((v) => {
            const y = yForPct(v, plotH)
            return (
              <g key={v}>
                <line
                  x1={PAD_L}
                  y1={y}
                  x2={PAD_L + plotW}
                  y2={y}
                  className="stroke-neutral-200"
                  strokeWidth={1}
                />
                <text
                  x={PAD_L - 8}
                  y={y + 4}
                  textAnchor="end"
                  className="fill-neutral-500"
                  style={{ fontSize: 10, fontFamily: 'inherit' }}
                >
                  {v}%
                </text>
              </g>
            )
          })}

          {/* Target — decorative reference line */}
          <line
            x1={PAD_L}
            y1={yForPct(12, plotH)}
            x2={PAD_L + plotW}
            y2={yForPct(12, plotH)}
            stroke={chartPalette.target}
            strokeWidth={1.2}
            strokeDasharray="5 4"
            opacity={0.9}
          />

          {rows.map((row, i) => {
            const xCenter = PAD_L + groupW * (i + 0.5)
            const pairHalf = (BAR_W * 2 + BAR_GAP) / 2
            const x180 = xCenter - pairHalf
            const x90 = xCenter - pairHalf + BAR_W + BAR_GAP
            const y180 = yForPct(row.pct180, plotH)
            const y90 = yForPct(row.pct90, plotH)
            const h180 = yBase - y180
            const h90 = yBase - y90

            return (
              <g key={row.communityId}>
                <rect
                  x={x180}
                  y={y180}
                  width={BAR_W}
                  height={h180}
                  fill={COL_180}
                  rx={2}
                />
                <rect x={x90} y={y90} width={BAR_W} height={h90} fill={COL_90} rx={2} />
                <BarLabels x={x180 + BAR_W / 2} yTop={y180} sold={row.sold180} pct={row.pct180} />
                <BarLabels x={x90 + BAR_W / 2} yTop={y90} sold={row.sold90} pct={row.pct90} />
              </g>
            )
          })}

          {/* Y-axis line */}
          <line
            x1={PAD_L}
            y1={PAD_T}
            x2={PAD_L}
            y2={yBase}
            className="stroke-neutral-300"
            strokeWidth={1}
          />
          <line
            x1={PAD_L}
            y1={yBase}
            x2={PAD_L + plotW}
            y2={yBase}
            className="stroke-neutral-300"
            strokeWidth={1}
          />
        </svg>

        {/* Match SVG plot inset (PAD_L / PAD_R vs W) so each label centers under its bar pair. */}
        <div
          className="-mt-1 grid gap-1 sm:gap-2"
          style={{
            paddingLeft: `${(PAD_L / W) * 100}%`,
            paddingRight: `${(PAD_R / W) * 100}%`,
            gridTemplateColumns: `repeat(${n}, minmax(0, 1fr))`,
          }}
        >
          {rows.map((row) => (
            <div key={row.communityId} className="flex min-w-0 justify-center text-center">
              <Link
                to={openhomesCommunityPath(row.communityId)}
                className={cn(
                  'line-clamp-2 max-w-full text-[11px] font-semibold leading-snug text-blue-700 underline decoration-blue-300',
                  'underline-offset-2 transition-colors hover:text-blue-800 hover:decoration-blue-500',
                )}
              >
                {row.communityName}
              </Link>
            </div>
          ))}
        </div>

        <div className="mt-4 flex flex-col gap-3 border-t border-neutral-100 pt-4 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
          <div
            className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-neutral-600"
            aria-label="Chart legend"
          >
            <span className="inline-flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-sm" style={{ backgroundColor: COL_180 }} aria-hidden />
              180 Days
            </span>
            <span className="inline-flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-sm" style={{ backgroundColor: COL_90 }} aria-hidden />
              90 Days
            </span>
            <span className="inline-flex items-center gap-2">
              <span
                className="inline-block h-px w-6 border-t border-dashed"
                style={{ borderColor: chartPalette.target }}
                aria-hidden
              />
              Target
            </span>
          </div>
          <p className="shrink-0 text-xs text-neutral-700">
            <span className="font-semibold text-neutral-800">Weighted Average:</span>{' '}
            <span className="tabular-nums">180d: {optionsUptakeWeightedAvg.d180}</span>{' '}
            <span className="tabular-nums">90d: {optionsUptakeWeightedAvg.d90}</span>
          </p>
        </div>
      </div>
    </div>
  )
}
