import { Fragment, useCallback, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  OPENHOMES_COMMUNITY_TRIAGE,
  OPENHOMES_DIVISION_PERFORMANCE,
  OPENHOMES_DOWNLOADS,
} from '@/pulse/constants/routes'
import { ForecastDriverTrendChart } from '@/pulse/components/forecast-drivers/ForecastDriverTrendChart'
import { IconChevronDown, IconChevronUp } from '@/pulse/components/icons'
import { PulsePageHeading } from '@/pulse/components/PulsePageHeading'
import {
  forecastDriverTopMetrics,
  forecastDriversPageFootnoteBeforeLinks,
  divisionLeadingIndicatorsExecutiveSentence,
} from '@/pulse/data/forecastLeadingIndicators'
import {
  pulseSectionHeadingLg,
  pulseSectionOverline,
  pulseTableHeadPrimary,
} from '@/pulse/ui/pulseTypography'
import { cn } from '@/lib/cn'

const headerNavPillClass =
  'inline-flex items-center rounded-lg border border-neutral-300 bg-white px-3 py-2 text-sm font-semibold text-neutral-900 shadow-sm transition-colors hover:bg-neutral-50'

export function ForecastDriversPage() {
  const [expandedRanks, setExpandedRanks] = useState<Set<number>>(() => new Set())

  const toggleTrend = useCallback((rank: number) => {
    setExpandedRanks((prev) => {
      const next = new Set(prev)
      if (next.has(rank)) next.delete(rank)
      else next.add(rank)
      return next
    })
  }, [])

  return (
    <div className="min-h-full w-full px-4 py-5 sm:px-6 sm:py-7 lg:px-10">
      <div className="mx-auto w-full max-w-[1180px]">
        <header className="border-b border-neutral-300/90 pb-5 sm:pb-6">
          <PulsePageHeading title="Forecast Drivers" />
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-neutral-600">
            Using our AI models, we've identified the website and CRM metrics that most closely align with your
            divisional sales trends.
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            <Link to={OPENHOMES_DIVISION_PERFORMANCE} className={headerNavPillClass}>
              ← Division Performance
            </Link>
            <Link to={OPENHOMES_COMMUNITY_TRIAGE} className={headerNavPillClass}>
              Community Triage
            </Link>
            <Link to={OPENHOMES_DOWNLOADS} className={headerNavPillClass}>
              Exports
            </Link>
          </div>
        </header>

        <section
          className="mt-8 rounded-xl border border-neutral-300/90 bg-white p-4 shadow-sm sm:p-5"
          aria-labelledby="drivers-exec-heading"
        >
          <h2 id="drivers-exec-heading" className={pulseSectionOverline}>
            At a Glance
          </h2>
          <p className="mt-2 max-w-4xl text-sm font-medium leading-relaxed text-neutral-900">
            {divisionLeadingIndicatorsExecutiveSentence}
          </p>
        </section>

        <section className="mt-6" aria-labelledby="top-features-heading">
          <h2 id="top-features-heading" className={pulseSectionHeadingLg}>
            Top Signals
          </h2>

          <div className="overflow-hidden rounded-xl border border-neutral-300/90 bg-white shadow-sm">
            <div className="overflow-x-auto">
              <table className="min-w-[min(100%,520px)] w-full border-collapse text-sm">
                <thead>
                  <tr className="border-b border-neutral-300/80 bg-neutral-100 text-left">
                    <th className={cn('whitespace-nowrap px-3 py-2.5 sm:px-4', pulseTableHeadPrimary)}>
                      Rank
                    </th>
                    <th className={cn('px-3 py-2.5 sm:px-4', pulseTableHeadPrimary)}>Metric</th>
                    <th className={cn('min-w-[14rem] px-3 py-2.5 sm:px-4', pulseTableHeadPrimary)}>
                      Recent Changes
                    </th>
                    <th className={cn('whitespace-nowrap px-3 py-2.5 sm:px-4', pulseTableHeadPrimary)}>
                      Trends
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {forecastDriverTopMetrics.map((row, rowIndex) => {
                    const trendOpen = expandedRanks.has(row.rank)
                    const isLastMetric = rowIndex === forecastDriverTopMetrics.length - 1
                    return (
                      <Fragment key={row.rank}>
                        <tr
                          className={cn(
                            'border-b border-neutral-200/80 odd:bg-white even:bg-neutral-50/80',
                            isLastMetric && !trendOpen && 'last:border-b-0',
                          )}
                        >
                          <td className="whitespace-nowrap px-3 py-3 font-bold tabular-nums text-neutral-900 sm:px-4">
                            {row.rank}
                          </td>
                          <td className="px-3 py-3 font-medium text-neutral-900 sm:px-4">{row.metric}</td>
                          <td className="px-3 py-3 leading-relaxed text-neutral-600 sm:px-4">
                            {row.recentChanges}
                          </td>
                          <td className="whitespace-nowrap px-3 py-2 align-middle sm:px-4">
                            <button
                              type="button"
                              id={`driver-trend-trigger-${row.rank}`}
                              aria-expanded={trendOpen}
                              aria-controls={
                                trendOpen ? `driver-trend-panel-${row.rank}` : undefined
                              }
                              onClick={() => toggleTrend(row.rank)}
                              className="inline-flex items-center gap-1 rounded-lg border border-neutral-200 bg-white px-2.5 py-1.5 text-xs font-semibold text-neutral-800 shadow-sm transition-colors hover:border-neutral-300 hover:bg-neutral-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-400"
                            >
                              Trends
                              {trendOpen ? (
                                <IconChevronUp className="h-4 w-4 shrink-0 text-neutral-600" aria-hidden />
                              ) : (
                                <IconChevronDown className="h-4 w-4 shrink-0 text-neutral-600" aria-hidden />
                              )}
                            </button>
                          </td>
                        </tr>
                        {trendOpen ? (
                          <tr
                            className={cn(
                              'border-b border-neutral-200/80 bg-neutral-50/95',
                              isLastMetric && 'last:border-b-0',
                            )}
                          >
                            <td colSpan={4} className="px-3 py-4 sm:px-4">
                              <div
                                id={`driver-trend-panel-${row.rank}`}
                                role="region"
                                aria-labelledby={`driver-trend-trigger-${row.rank}`}
                              >
                                <ForecastDriverTrendChart
                                  chartId={`fd-${row.rank}`}
                                  metricLabel={row.metric}
                                  points={row.trend}
                                />
                              </div>
                            </td>
                          </tr>
                        ) : null}
                      </Fragment>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>

          <p className="mt-4 max-w-4xl text-xs leading-relaxed text-neutral-600">
            {forecastDriversPageFootnoteBeforeLinks}
            <Link
              to={OPENHOMES_COMMUNITY_TRIAGE}
              className="font-medium text-neutral-800 underline decoration-neutral-400 underline-offset-2 transition-colors hover:text-neutral-950 hover:decoration-neutral-600"
            >
              Community Triage
            </Link>
            {' and '}
            <Link
              to={OPENHOMES_DIVISION_PERFORMANCE}
              className="font-medium text-neutral-800 underline decoration-neutral-400 underline-offset-2 transition-colors hover:text-neutral-950 hover:decoration-neutral-600"
            >
              Division Performance
            </Link>
            .
          </p>
        </section>
      </div>
    </div>
  )
}
