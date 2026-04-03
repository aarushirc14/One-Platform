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
} from '@/pulse/ui/pulseTypography'
import {
  pulseTableBase,
  pulseTableCard,
  pulseTableExpandRowCell,
  pulseTableRowEven,
  pulseTableRowOdd,
  pulseTableScroll,
  pulseTableTd,
  pulseTableTh,
} from '@/pulse/ui/pulseTable'
import {
  trendsButtonClassName,
  trendsChevronIconClassName,
  trendsControlStyle,
} from '@/pulse/styles/chartPalette'
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
    <div className="w-full px-3 pb-5 pt-1.5 sm:px-6 sm:py-7 lg:min-h-full lg:px-10">
      <div className="mx-auto w-full max-w-[1180px]">
        <header className="border-b border-neutral-300/90 pb-5 sm:pb-6">
          <PulsePageHeading title="Forecast Drivers" />
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-neutral-600">
            Model-ranked website and CRM signals for Tucson. They help explain why paid and email can rise,
            repeat visits can improve, and the sales forecast still trails — usually because tours and
            appointments are not keeping pace with top-of-funnel noise.
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
          className="mt-8 rounded-lg border border-neutral-200 bg-white p-4 shadow-sm sm:p-5"
          aria-labelledby="drivers-exec-heading"
        >
          <h2 id="drivers-exec-heading" className={pulseSectionOverline}>
            At a Glance
          </h2>
          <p className="mt-2 max-w-4xl text-sm font-medium leading-relaxed text-neutral-900">
            {divisionLeadingIndicatorsExecutiveSentence}
          </p>
        </section>

        <section className="mt-6" aria-labelledby="top-leading-indicators-heading">
          <h2 id="top-leading-indicators-heading" className={pulseSectionHeadingLg}>
            Top Leading Indicators
          </h2>

          {/* ── Mobile stacked list (below sm) ── */}
          <ul className={cn('sm:hidden', pulseTableCard)} role="list">
            {forecastDriverTopMetrics.map((row, rowIndex) => {
              const trendOpen = expandedRanks.has(row.rank)
              return (
                <li
                  key={row.rank}
                  className={cn(
                    'border-b border-neutral-200 last:border-b-0',
                    rowIndex % 2 === 1 ? 'bg-neutral-50/40' : 'bg-white',
                  )}
                >
                  <div className="flex items-start justify-between gap-3 px-4 py-3">
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="shrink-0 text-xs font-bold tabular-nums text-neutral-400">
                          #{row.rank}
                        </span>
                        <p className="text-sm font-semibold text-neutral-900">{row.metric}</p>
                      </div>
                      <p className="mt-1.5 text-sm leading-relaxed text-neutral-600">{row.recentChanges}</p>
                    </div>
                    <button
                      type="button"
                      id={`driver-trend-trigger-m-${row.rank}`}
                      aria-expanded={trendOpen}
                      aria-controls={trendOpen ? `driver-trend-panel-m-${row.rank}` : undefined}
                      onClick={() => toggleTrend(row.rank)}
                      className={cn(trendsButtonClassName, 'mt-0.5 shrink-0')}
                      style={trendsControlStyle()}
                    >
                      Trends
                      {trendOpen ? (
                        <IconChevronUp className={trendsChevronIconClassName} aria-hidden />
                      ) : (
                        <IconChevronDown className={trendsChevronIconClassName} aria-hidden />
                      )}
                    </button>
                  </div>
                  {trendOpen ? (
                    <div
                      id={`driver-trend-panel-m-${row.rank}`}
                      role="region"
                      aria-labelledby={`driver-trend-trigger-m-${row.rank}`}
                      className="border-t border-neutral-100 bg-neutral-50/95 px-4 py-4"
                    >
                      <ForecastDriverTrendChart
                        chartId={`fd-m-${row.rank}`}
                        metricLabel={row.metric}
                        points={row.trend}
                      />
                    </div>
                  ) : null}
                </li>
              )
            })}
          </ul>

          {/* ── Desktop table (sm+) ── */}
          <div className={cn('hidden sm:block', pulseTableCard)}>
            <div className={pulseTableScroll}>
              <table className={cn('min-w-[min(100%,520px)]', pulseTableBase)}>
                <thead>
                  <tr>
                    <th className={pulseTableTh('left', 'whitespace-nowrap')}>Rank</th>
                    <th className={pulseTableTh('left')}>Metric</th>
                    <th className={pulseTableTh('left', 'min-w-[14rem]')}>Recent Changes</th>
                    <th className={pulseTableTh('left', 'whitespace-nowrap')} aria-hidden />
                  </tr>
                </thead>
                <tbody>
                  {forecastDriverTopMetrics.map((row, rowIndex) => {
                    const trendOpen = expandedRanks.has(row.rank)
                    return (
                      <Fragment key={row.rank}>
                        <tr className={cn(rowIndex % 2 === 1 ? pulseTableRowOdd : pulseTableRowEven)}>
                          <td className={pulseTableTd('left', 'whitespace-nowrap font-bold tabular-nums')}>
                            {row.rank}
                          </td>
                          <td className={pulseTableTd('left', 'font-medium')}>{row.metric}</td>
                          <td className={pulseTableTd('left', 'leading-relaxed text-neutral-600')}>
                            {row.recentChanges}
                          </td>
                          <td className={pulseTableTd('left', 'whitespace-nowrap align-middle py-2')}>
                            <button
                              type="button"
                              id={`driver-trend-trigger-${row.rank}`}
                              aria-expanded={trendOpen}
                              aria-controls={
                                trendOpen ? `driver-trend-panel-${row.rank}` : undefined
                              }
                              onClick={() => toggleTrend(row.rank)}
                              className={trendsButtonClassName}
                              style={trendsControlStyle()}
                            >
                              Trends
                              {trendOpen ? (
                                <IconChevronUp className={trendsChevronIconClassName} aria-hidden />
                              ) : (
                                <IconChevronDown className={trendsChevronIconClassName} aria-hidden />
                              )}
                            </button>
                          </td>
                        </tr>
                        {trendOpen ? (
                          <tr className={pulseTableRowOdd}>
                            <td colSpan={4} className={pulseTableExpandRowCell}>
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
