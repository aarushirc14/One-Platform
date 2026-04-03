import type { ForecastByPeriodRow } from '@/pulse/data/divisionPerformanceReport'
import { chartPalette } from '@/pulse/styles/chartPalette'
import { pulseChartTitle } from '@/pulse/ui/pulseTypography'
import { cn } from '@/lib/cn'

type ForecastByPeriodChartProps = {
  rows: ForecastByPeriodRow[]
}

function ForecastTrack({
  rangeLeftPct,
  rangeWidthPct,
  forecastPct,
  targetPct,
}: Pick<
  ForecastByPeriodRow,
  'rangeLeftPct' | 'rangeWidthPct' | 'forecastPct' | 'targetPct'
>) {
  return (
    <div className="relative h-3 w-full min-w-[120px]">
      {/* Background track */}
      <div className="absolute inset-x-0 top-1/2 h-2.5 w-full -translate-y-1/2 rounded-full bg-neutral-100" />
      {/* Confidence range */}
      <div
        className="absolute top-1/2 h-2.5 -translate-y-1/2 rounded-full shadow-sm"
        style={{
          left: `${rangeLeftPct}%`,
          width: `${rangeWidthPct}%`,
          backgroundColor: `${chartPalette.forecastSoft}cc`,
        }}
      />
      {/* Forecast point */}
      <div
        className="absolute top-1/2 z-20 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 bg-white shadow-sm"
        style={{ left: `${forecastPct}%`, borderColor: chartPalette.actualPrimary }}
      />
      {/* Target marker */}
      <div
        className="pointer-events-none absolute top-1/2 z-10 h-5 w-0 -translate-x-1/2 -translate-y-1/2 border-l border-dashed"
        style={{ left: `${targetPct}%`, borderColor: chartPalette.target }}
      />
    </div>
  )
}

function Legend() {
  return (
    <div
      className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-neutral-100 pt-4 text-xs text-neutral-500"
      aria-label="Chart legend"
    >
      <span className="inline-flex items-center gap-2">
        <span className="relative inline-flex h-3 w-3 items-center justify-center">
          <span
            className="absolute h-2.5 w-2.5 rounded-full border-2 bg-white"
            style={{ borderColor: chartPalette.actualPrimary }}
          />
        </span>
        Forecast
      </span>
      <span className="inline-flex items-center gap-2">
        <span
          className="inline-block h-2 w-6 rounded-sm"
          style={{ backgroundColor: `${chartPalette.forecastSoft}cc` }}
        />
        Confidence Range
      </span>
      <span className="inline-flex items-center gap-2">
        <span
          className="inline-block h-4 w-0 border-l border-dashed"
          style={{ borderColor: chartPalette.target }}
        />
        Target
      </span>
    </div>
  )
}

export function ForecastByPeriodChart({ rows }: ForecastByPeriodChartProps) {
  return (
    <div className="rounded-lg border border-neutral-200 bg-white p-4 shadow-sm sm:p-5">
      <h3 className={pulseChartTitle}>Forecast by Period</h3>

      <div className="mt-5 space-y-5">
        {rows.map((row) => (
          <div
            key={row.id}
            className="grid gap-3 border-b border-neutral-100 pb-5 last:border-b-0 last:pb-0 sm:gap-4 lg:grid-cols-[10rem_minmax(0,1fr)_minmax(7rem,9rem)_minmax(7rem,9rem)] lg:items-center lg:gap-5 lg:pb-6"
          >
            <div className="text-xs font-semibold leading-snug text-neutral-600">{row.label}</div>

            <div className="min-w-0 lg:min-w-[140px]">
              <ForecastTrack
                rangeLeftPct={row.rangeLeftPct}
                rangeWidthPct={row.rangeWidthPct}
                forecastPct={row.forecastPct}
                targetPct={row.targetPct}
              />
            </div>

            <div className="text-left lg:text-right">
              <p className="tabular-nums">
                <span className="text-xl font-bold" style={{ color: chartPalette.actualPrimary }}>
                  {row.forecastSales}
                </span>
                <span className="ml-1 text-sm font-normal text-neutral-500">sales</span>
              </p>
              <p className="mt-0.5 text-xs text-neutral-500">
                Range: {row.rangeLow}-{row.rangeHigh}
              </p>
            </div>

            <div className="text-left lg:text-right">
              <p className="text-sm font-semibold tabular-nums text-neutral-800">
                Target: {row.target}
              </p>
              <p
                className={cn(
                  'mt-0.5 text-xs font-medium tabular-nums',
                  row.behind > 0 && 'text-red-600',
                  row.behind === 0 && 'text-emerald-700',
                  row.behind < 0 && 'text-emerald-700',
                )}
              >
                {row.behind > 0
                  ? `${row.behind} sales behind`
                  : row.behind < 0
                    ? `${Math.abs(row.behind)} sales ahead`
                    : 'At target'}
              </p>
            </div>
          </div>
        ))}
      </div>

      <Legend />
    </div>
  )
}
