import { Fragment, useCallback, useState } from 'react'
import type { MetricTableSection } from '@/pulse/types'
import { IconChevronDown, IconInfo, IconTrendSparkDown, IconTrendSparkUp } from '@/pulse/components/icons'
import { MetricRowTrendChart } from '@/pulse/components/MetricRowTrendChart'
import {
  INFO_METRICS_TARGET_RATE,
  INFO_METRICS_COMMUNITY_COUNTS,
  INFO_METRICS_COMMUNITY_RATE,
  INFO_METRICS_PERFORMANCE,
  INFO_METRICS_PCT_CHANGE,
} from '@/pulse/constants/infoTooltips'
import {
  PULSE_METRICS_TABLE_COL_WIDTHS,
  pulseMetricsTableTableClass,
  pulseTableCard,
  pulseTableCardTitleBar,
  pulseTableCellGrid,
  pulseTableHeaderBg,
  pulseTableRowEven,
  pulseTableRowOdd,
} from '@/pulse/ui/pulseTable'
import { pulseTableHeadPrimary } from '@/pulse/ui/pulseTypography'
import { cn } from '@/lib/cn'

type MetricsTableProps = {
  section: MetricTableSection
}

const headInfoBtnClass =
  'inline-flex shrink-0 rounded p-0.5 text-neutral-400 hover:bg-neutral-100 hover:text-neutral-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-400'

/** Tighter padding so fixed columns fit the community pulse max-width without horizontal scroll. */
const mCellPad = 'px-2.5 py-3 sm:px-3 sm:py-3.5'

const metricsTh = (align: 'left' | 'center' | 'right', extra?: string) =>
  cn(
    pulseTableCellGrid,
    pulseTableHeaderBg,
    mCellPad,
    pulseTableHeadPrimary,
    align === 'left' && 'text-left',
    align === 'center' && 'text-center',
    align === 'right' && 'text-right',
    extra,
  )

const bodyCellBase = cn('align-middle', pulseTableCellGrid, mCellPad)

const metricsTrendsButtonClassName =
  'inline-flex max-w-full shrink-0 items-center justify-center gap-0.5 rounded-full border border-sky-200 bg-sky-50 px-2 py-1.5 text-[11px] font-semibold leading-tight text-sky-800 shadow-sm transition-colors hover:bg-sky-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-400 sm:text-xs sm:px-2.5'

const metricsTrendsChevronClassName =
  'h-3.5 w-3.5 shrink-0 text-sky-700 transition-transform duration-200 sm:h-4 sm:w-4'

export function MetricsTable({ section }: MetricsTableProps) {
  const [trendExpanded, setTrendExpanded] = useState(false)
  const toggleTrend = useCallback(() => setTrendExpanded((o) => !o), [])

  return (
    <div className={cn(pulseTableCard, 'min-w-0 w-full')}>
      {section.title ? (
        <div className={pulseTableCardTitleBar}>
          <h3 className="text-base font-semibold text-neutral-900">{section.title}</h3>
        </div>
      ) : null}

      {/* ── Mobile card list (below sm) ── */}
      <ul className="divide-y divide-neutral-200 sm:hidden" role="list">
        {section.rows.map((row, idx) => {
          const isTrendRow =
            row.kind === 'data' &&
            Boolean(section.trendChartForMetric) &&
            row.metric === section.trendChartForMetric

          if (row.kind === 'placeholder') {
            return (
              <li key={`${row.metric}-${idx}`} className="px-4 py-5 text-center text-sm italic text-neutral-500">
                Data coming soon
              </li>
            )
          }

          return (
            <li
              key={`${row.metric}-${idx}`}
              className={idx % 2 === 1 ? 'bg-neutral-50/40' : 'bg-white'}
            >
              {/* Metric name row + optional trends toggle */}
              <div className="flex items-start justify-between gap-3 px-4 pt-3">
                <p className="text-sm font-semibold leading-snug text-neutral-950">{row.metric}</p>
                {isTrendRow ? (
                  <button
                    type="button"
                    className={cn(metricsTrendsButtonClassName, 'shrink-0')}
                    onClick={toggleTrend}
                    aria-expanded={trendExpanded}
                    aria-controls={trendExpanded ? `metric-trend-m-${idx}` : undefined}
                    aria-label="Toggle rate trend chart"
                  >
                    Trends
                    <IconChevronDown
                      className={cn(metricsTrendsChevronClassName, trendExpanded && 'rotate-180')}
                      aria-hidden
                    />
                  </button>
                ) : null}
              </div>

              {/* Counts: label From → label To */}
              <div
                className="mt-2 flex items-center gap-2 px-4 text-xs"
                title={`${row.countsLabel} ${row.countsFrom} → ${row.countsToLabel} ${row.countsTo}`}
              >
                <span className="text-neutral-500">{row.countsLabel}</span>
                <span className="font-semibold tabular-nums text-neutral-900">{row.countsFrom}</span>
                <svg
                  className="h-3.5 w-5 shrink-0 text-neutral-400"
                  viewBox="0 0 28 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden
                >
                  <path
                    d="M2 6h14M16 2.75 24 6 16 9.25"
                    stroke="currentColor"
                    strokeWidth="1.65"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span className="text-neutral-500">{row.countsToLabel}</span>
                <span className="font-semibold tabular-nums text-neutral-900">{row.countsTo}</span>
              </div>

              {/* Stats: 2×2 labeled grid */}
              <div className="mt-2 grid grid-cols-2 gap-x-4 gap-y-2 px-4 pb-3">
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-wide text-neutral-500">
                    Community Rate
                  </p>
                  <p className="mt-0.5 text-sm font-medium tabular-nums text-neutral-950">
                    {row.communityRate}
                  </p>
                </div>
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-wide text-neutral-500">
                    Target Rate
                  </p>
                  <p className="mt-0.5 text-sm font-medium tabular-nums text-neutral-950">
                    {row.targetRate}
                  </p>
                </div>
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-wide text-neutral-500">
                    Performance
                  </p>
                  <p
                    className={cn(
                      'mt-0.5 text-sm font-semibold tabular-nums',
                      row.performanceTone === 'positive' ? 'text-emerald-700' : 'text-red-600',
                    )}
                  >
                    {row.performance}
                  </p>
                </div>
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-wide text-neutral-500">
                    % Change
                  </p>
                  <p
                    className={cn(
                      'mt-0.5 inline-flex items-center gap-1 text-sm font-semibold tabular-nums',
                      row.changeTone === 'positive' ? 'text-emerald-700' : 'text-red-600',
                    )}
                  >
                    {row.changeUp ? (
                      <IconTrendSparkUp className="h-3.5 w-3.5 shrink-0" />
                    ) : (
                      <IconTrendSparkDown className="h-3.5 w-3.5 shrink-0" />
                    )}
                    {row.change}
                  </p>
                </div>
              </div>

              {isTrendRow && trendExpanded ? (
                <div
                  id={`metric-trend-m-${idx}`}
                  className="border-t border-neutral-200 bg-white px-2 py-3"
                >
                  <MetricRowTrendChart />
                </div>
              ) : null}
            </li>
          )
        })}
      </ul>

      {/* ── Desktop table (sm+) ── */}
      <div className="hidden sm:block">
        <table className={pulseMetricsTableTableClass}>
          <colgroup>
            {PULSE_METRICS_TABLE_COL_WIDTHS.map((w, i) => (
              <col key={i} style={{ width: w }} />
            ))}
          </colgroup>
          <thead>
            <tr className="text-xs font-semibold text-neutral-700">
              <th className={metricsTh('left', 'whitespace-nowrap')}>Metric</th>
              <th className={metricsTh('center', 'whitespace-nowrap')}>
                <span className="inline-flex w-full min-w-0 items-center justify-center gap-1 whitespace-nowrap">
                  <span className="sm:hidden">Counts</span>
                  <span className="hidden sm:inline">Community Counts</span>
                  <button
                    type="button"
                    className={headInfoBtnClass}
                    title={INFO_METRICS_COMMUNITY_COUNTS}
                    aria-label={INFO_METRICS_COMMUNITY_COUNTS}
                  >
                    <IconInfo className="text-neutral-400" />
                  </button>
                </span>
              </th>
              <th className={metricsTh('center', 'whitespace-nowrap')}>
                <span className="inline-flex w-full min-w-0 items-center justify-center gap-1 whitespace-nowrap">
                  <span className="sm:hidden">Comm. rate</span>
                  <span className="hidden sm:inline">Community Rate</span>
                  <button
                    type="button"
                    className={headInfoBtnClass}
                    title={INFO_METRICS_COMMUNITY_RATE}
                    aria-label={INFO_METRICS_COMMUNITY_RATE}
                  >
                    <IconInfo className="text-neutral-400" />
                  </button>
                </span>
              </th>
              <th className={metricsTh('center', 'whitespace-nowrap')}>
                <span className="inline-flex w-full min-w-0 items-center justify-center gap-1 whitespace-nowrap">
                  <span className="sm:hidden">Target</span>
                  <span className="hidden sm:inline">Target Rate</span>
                  <button
                    type="button"
                    className={headInfoBtnClass}
                    title={INFO_METRICS_TARGET_RATE}
                    aria-label={INFO_METRICS_TARGET_RATE}
                  >
                    <IconInfo className="text-neutral-400" />
                  </button>
                </span>
              </th>
              <th className={metricsTh('center', 'whitespace-nowrap')}>
                <span className="inline-flex w-full min-w-0 items-center justify-center gap-1 whitespace-nowrap">
                  <span className="sm:hidden">Perf.</span>
                  <span className="hidden sm:inline">Performance</span>
                  <button
                    type="button"
                    className={headInfoBtnClass}
                    title={INFO_METRICS_PERFORMANCE}
                    aria-label={INFO_METRICS_PERFORMANCE}
                  >
                    <IconInfo className="text-neutral-400" />
                  </button>
                </span>
              </th>
              <th className={metricsTh('center', 'whitespace-nowrap')}>
                <span className="inline-flex w-full min-w-0 items-center justify-center gap-1 whitespace-nowrap">
                  <span className="sm:hidden">Δ%</span>
                  <span className="hidden sm:inline">% Change</span>
                  <button
                    type="button"
                    className={headInfoBtnClass}
                    title={INFO_METRICS_PCT_CHANGE}
                    aria-label={INFO_METRICS_PCT_CHANGE}
                  >
                    <IconInfo className="text-neutral-400" />
                  </button>
                </span>
              </th>
              <th className={metricsTh('center', 'whitespace-nowrap')}>
                <span className="sr-only">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {section.rows.map((row, idx) => {
              const isTrendRow =
                row.kind === 'data' &&
                Boolean(section.trendChartForMetric) &&
                row.metric === section.trendChartForMetric

              if (row.kind === 'placeholder') {
                return (
                  <tr key={`${row.metric}-${idx}`} className="bg-neutral-50/60">
                    <td
                      colSpan={7}
                      className={cn('border-b border-neutral-200 text-center text-sm italic text-neutral-500', mCellPad, 'py-5')}
                    >
                      Data coming soon
                    </td>
                  </tr>
                )
              }

              return (
                <Fragment key={`${row.metric}-${idx}`}>
                  <tr
                    className={cn(
                      idx % 2 === 1 ? pulseTableRowOdd : pulseTableRowEven,
                      isTrendRow &&
                        'cursor-pointer hover:bg-neutral-100/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-400',
                    )}
                    onClick={isTrendRow ? toggleTrend : undefined}
                    onKeyDown={
                      isTrendRow
                        ? (e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                              e.preventDefault()
                              toggleTrend()
                            }
                          }
                        : undefined
                    }
                    tabIndex={isTrendRow ? 0 : undefined}
                    aria-expanded={isTrendRow ? trendExpanded : undefined}
                    aria-controls={isTrendRow && trendExpanded ? `metric-trend-${idx}` : undefined}
                    aria-label={isTrendRow ? 'Toggle rate trend chart for this metric' : undefined}
                  >
                  <td className={cn(bodyCellBase, 'min-w-0 align-top text-left')}>
                    <p className="break-words text-sm font-semibold leading-snug text-neutral-950 whitespace-normal">
                      {row.metric}
                    </p>
                  </td>
                  <td className={cn(bodyCellBase, 'min-w-0 text-left')}>
                    <div
                      className="grid w-full min-w-0 grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center gap-x-2 sm:gap-x-3"
                      title={`${row.countsLabel} ${row.countsFrom} → ${row.countsToLabel} ${row.countsTo}`}
                    >
                      <div className="min-w-0">
                        <span className="block truncate text-[10px] font-normal leading-tight text-neutral-500 sm:text-[11px]">
                          {row.countsLabel}
                        </span>
                        <span className="block truncate text-xs font-semibold tabular-nums text-neutral-950 sm:text-sm">
                          {row.countsFrom}
                        </span>
                      </div>
                      <div className="flex shrink-0 items-center justify-center px-0.5" aria-hidden>
                        <svg
                          className="h-4 w-6 shrink-0 text-neutral-400 sm:h-[1.125rem] sm:w-7"
                          viewBox="0 0 28 12"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M2 6h14M16 2.75 24 6 16 9.25"
                            stroke="currentColor"
                            strokeWidth="1.65"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                      <div className="min-w-0 text-right">
                        <span className="block truncate text-[10px] font-normal leading-tight text-neutral-500 sm:text-[11px]">
                          {row.countsToLabel}
                        </span>
                        <span className="block truncate text-xs font-semibold tabular-nums text-neutral-950 sm:text-sm">
                          {row.countsTo}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className={cn(bodyCellBase, 'min-w-0 text-center')}>
                    <span
                      className="block truncate text-center text-sm font-medium tabular-nums text-neutral-950"
                      title={row.communityRate}
                    >
                      {row.communityRate}
                    </span>
                  </td>
                  <td className={cn(bodyCellBase, 'min-w-0 text-center')}>
                    <span
                      className="block truncate text-center text-sm font-medium tabular-nums text-neutral-950"
                      title={row.targetRate}
                    >
                      {row.targetRate}
                    </span>
                  </td>
                  <td
                    className={cn(
                      bodyCellBase,
                      'min-w-0 text-center text-sm font-semibold tabular-nums',
                      row.performanceTone === 'positive' ? 'text-emerald-700' : 'text-red-600',
                    )}
                  >
                    <span className="block truncate text-center" title={row.performance}>
                      {row.performance}
                    </span>
                  </td>
                  <td className={cn(bodyCellBase, 'min-w-0 text-center')}>
                    <span
                      className={cn(
                        'inline-flex w-full min-w-0 items-center justify-center gap-1 text-sm font-semibold tabular-nums',
                        row.changeTone === 'positive' ? 'text-emerald-700' : 'text-red-600',
                      )}
                      title={row.change}
                    >
                      {row.changeUp ? (
                        <IconTrendSparkUp className="h-3 w-3 shrink-0 sm:h-3.5 sm:w-3.5" />
                      ) : (
                        <IconTrendSparkDown className="h-3 w-3 shrink-0 sm:h-3.5 sm:w-3.5" />
                      )}
                      <span className="min-w-0 truncate">{row.change}</span>
                    </span>
                  </td>
                  <td className={cn(bodyCellBase, 'min-w-0 text-center')}>
                    {isTrendRow ? (
                      <span
                        className={cn(metricsTrendsButtonClassName, 'pointer-events-none select-none')}
                        aria-hidden
                      >
                        <span className="sm:hidden">Trend</span>
                        <span className="hidden sm:inline">Trends</span>
                        <IconChevronDown
                          className={cn(metricsTrendsChevronClassName, trendExpanded && 'rotate-180')}
                          aria-hidden
                        />
                      </span>
                    ) : (
                      <button type="button" className={metricsTrendsButtonClassName}>
                        <span className="sm:hidden">Trend</span>
                        <span className="hidden sm:inline">Trends</span>
                        <IconChevronDown className={metricsTrendsChevronClassName} aria-hidden />
                      </button>
                    )}
                  </td>
                </tr>
                  {isTrendRow && trendExpanded ? (
                    <tr className={idx % 2 === 1 ? pulseTableRowOdd : pulseTableRowEven}>
                      <td
                        colSpan={7}
                        id={`metric-trend-${idx}`}
                        className={cn('border-b border-neutral-200 bg-white px-2 py-3 sm:px-3 sm:py-4')}
                      >
                        <MetricRowTrendChart />
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
  )
}
