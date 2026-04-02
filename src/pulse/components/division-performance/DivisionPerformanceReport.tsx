import type { ReactNode } from 'react'
import {
  DIVISION_PERFORMANCE_DATA_FRESHNESS_NOTE,
  DIVISION_PERFORMANCE_DATA_UNTIL_NOTE,
  DIVISION_PERFORMANCE_REPORT_TITLE,
  communityPerformanceAlert,
  cumulativeSalesComparison,
  historicalMonthlySales,
  communityPerformanceRows,
  forecastByPeriod,
  marginDriverRows,
  marginDriversIntro,
  outlookLegend,
  reportFootnotes,
  rollupKpiCards,
  salesForecastIntro,
  salesForecastSummaryCards,
} from '@/pulse/mock/divisionPerformanceReport'
import { DivisionPerformanceRollupKpiCard } from '@/pulse/components/division-performance/DivisionPerformanceRollupKpiCard'
import { CumulativeSalesComparisonChart } from '@/pulse/components/division-performance/CumulativeSalesComparisonChart'
import { ForecastByPeriodChart } from '@/pulse/components/division-performance/ForecastByPeriodChart'
import { HistoricalMonthlySalesChart } from '@/pulse/components/division-performance/HistoricalMonthlySalesChart'
import { NinetyDaySalesForecastChart } from '@/pulse/components/division-performance/NinetyDaySalesForecastChart'
import { SalesForecastSummaryCard } from '@/pulse/components/division-performance/SalesForecastSummaryCard'
import { IconAlertCircleSolid, IconDownload, IconLineChart } from '@/pulse/components/icons'
import { cn } from '@/lib/cn'

function AlertBanner({ children }: { children: ReactNode }) {
  return (
    <div className="rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-950">
      {children}
    </div>
  )
}

function Badge({ children, variant }: { children: ReactNode; variant: 'red' | 'blue' | 'amber' }) {
  return (
    <span
      className={cn(
        'inline-flex items-center justify-center rounded px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide',
        variant === 'red' && 'bg-red-100 text-red-800',
        variant === 'blue' && 'bg-blue-100 text-blue-800',
        variant === 'amber' && 'bg-amber-100 text-amber-900',
      )}
    >
      {children}
    </span>
  )
}

function ChartPlaceholder({ label }: { label: string }) {
  return (
    <div className="flex aspect-[16/10] min-h-[140px] flex-col items-center justify-center rounded-lg border border-dashed border-neutral-300 bg-neutral-50/80 px-3 text-center">
      <p className="text-xs font-semibold uppercase tracking-wide text-neutral-500">{label}</p>
      <p className="mt-2 text-[11px] text-neutral-400">Chart placeholder</p>
    </div>
  )
}

export function DivisionPerformanceReport() {
  return (
    <div className="space-y-8 pb-8">
      <div className="border-b border-neutral-200 pb-4">
        <div className="flex flex-row flex-wrap items-start justify-between gap-3 gap-y-4">
          <h1 className="min-w-0 max-w-full flex-1 text-xl font-bold tracking-tight text-neutral-900 sm:text-2xl">
            {DIVISION_PERFORMANCE_REPORT_TITLE}
          </h1>
          <div className="flex min-w-[10.5rem] shrink-0 sm:min-w-[11.5rem]">
            <button
              type="button"
              className="flex w-full min-h-10 flex-col justify-center gap-0.5 rounded-xl border border-neutral-300/90 bg-neutral-200 px-3 py-2 text-left shadow-sm transition-colors hover:border-neutral-400/80 hover:bg-neutral-300/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-400 active:bg-neutral-300"
            >
              <span className="text-[10px] font-medium leading-none text-neutral-500">Export</span>
              <span className="flex items-center gap-2 text-sm font-semibold tracking-tight text-neutral-950">
                <IconDownload className="h-4 w-4 shrink-0 text-neutral-500" aria-hidden />
                PDF
              </span>
            </button>
          </div>
        </div>
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-neutral-600">
          {DIVISION_PERFORMANCE_DATA_FRESHNESS_NOTE}
        </p>
        <p className="mt-2 text-sm font-medium text-neutral-800">{DIVISION_PERFORMANCE_DATA_UNTIL_NOTE}</p>
      </div>

      <section
        className="grid gap-4 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3 lg:items-stretch"
        aria-label="Division rollup: March MTD, YTD, 90-day forecast"
      >
        {rollupKpiCards.map((card) => (
          <DivisionPerformanceRollupKpiCard key={card.id} {...card} />
        ))}
      </section>

      <section
        className="rounded-xl border border-neutral-200 bg-white p-5 shadow-sm sm:p-6"
        aria-labelledby="sales-forecast-heading"
      >
        <div className="flex gap-3 sm:gap-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-teal-500 text-white shadow-sm">
            <IconLineChart className="h-5 w-5" aria-hidden />
          </div>
          <div className="min-w-0 pt-0.5">
            <h2
              id="sales-forecast-heading"
              className="text-base font-bold uppercase tracking-wide text-neutral-800"
            >
              {salesForecastIntro.headline}
            </h2>
            <p className="mt-1 text-sm leading-relaxed text-neutral-500">{salesForecastIntro.subline}</p>
          </div>
        </div>

        <div className="mt-5 flex overflow-hidden rounded-lg border border-red-100 bg-red-50/95">
          <div className="w-1 shrink-0 bg-red-500" aria-hidden />
          <div className="flex min-w-0 flex-1 items-start gap-3 px-4 py-3.5 sm:px-5">
            <IconAlertCircleSolid className="mt-0.5 h-5 w-5 shrink-0 text-red-500" aria-hidden />
            <p className="text-sm font-medium leading-relaxed text-red-700">{salesForecastIntro.alert}</p>
          </div>
        </div>

        <div className="mt-5 grid gap-4 lg:grid-cols-3 lg:items-stretch">
          {salesForecastSummaryCards.map((card) => (
            <SalesForecastSummaryCard key={card.id} {...card} />
          ))}
        </div>

        <div className="mt-8 border-t border-neutral-200 pt-6">
          <ForecastByPeriodChart rows={forecastByPeriod} />
        </div>

        <div className="mt-6 space-y-6">
          <NinetyDaySalesForecastChart />
          <HistoricalMonthlySalesChart data={historicalMonthlySales} />
          <CumulativeSalesComparisonChart data={cumulativeSalesComparison} />
        </div>
      </section>

      <section className="space-y-3" aria-labelledby="community-performance-heading">
        <h2 id="community-performance-heading" className="text-lg font-semibold text-neutral-900">
          Community performance
        </h2>
        <AlertBanner>{communityPerformanceAlert}</AlertBanner>

        <div className="overflow-hidden rounded-lg border border-neutral-200 bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="min-w-[960px] w-full border-collapse text-sm">
              <thead>
                <tr className="border-b border-neutral-200 bg-neutral-50 text-left text-xs font-semibold uppercase tracking-wide text-neutral-600">
                  <th className="whitespace-nowrap px-3 py-2.5 sm:px-4">Community</th>
                  <th className="whitespace-nowrap px-3 py-2.5 sm:px-4">Last 30 day sales</th>
                  <th className="whitespace-nowrap px-3 py-2.5 sm:px-4">YTD sales</th>
                  <th className="whitespace-nowrap px-3 py-2.5 sm:px-4">Next 90-day target outlook</th>
                  <th className="whitespace-nowrap px-3 py-2.5 sm:px-4">Primary driver — past 90 days</th>
                  <th className="whitespace-nowrap px-3 py-2.5 sm:px-4">Status</th>
                </tr>
              </thead>
              <tbody>
                {communityPerformanceRows.map((row) => (
                  <tr key={row.id} className="border-b border-neutral-100 last:border-b-0">
                    <td className="px-3 py-3 font-semibold text-neutral-900 sm:px-4">{row.name}</td>
                    <td className="px-3 py-3 tabular-nums text-neutral-800 sm:px-4">
                      {row.last30Actual} / {row.last30Target} (actual vs prorated target)
                    </td>
                    <td className="px-3 py-3 tabular-nums text-neutral-800 sm:px-4">
                      {row.ytdActual} / {row.ytdTarget}
                    </td>
                    <td className="px-3 py-3 text-neutral-800 sm:px-4">
                      <span className="tabular-nums font-medium">{row.next90Target}</span> target,{' '}
                      <span className="tabular-nums">{row.next90Plan}</span> plan
                      {row.next90CatchUp > 0 ? (
                        <>
                          {' '}
                          + <span className="tabular-nums font-medium">{row.next90CatchUp}</span> catch-up
                        </>
                      ) : null}
                    </td>
                    <td className="px-3 py-3 text-neutral-800 sm:px-4">{row.primaryDriver}</td>
                    <td className="px-3 py-3 sm:px-4">
                      <div className="flex flex-wrap gap-1">
                        <Badge variant="red">Off track</Badge>
                        <Badge variant="blue">Forecast</Badge>
                        <Badge variant="amber">Needs attention</Badge>
                        <span className="mt-1 w-full text-[10px] font-semibold uppercase text-neutral-500">
                          Triage community
                        </span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="flex flex-wrap gap-3 text-xs text-neutral-600">
          <span className="font-semibold text-neutral-700">Outlook:</span>
          {outlookLegend.map((o) => (
            <span key={o.tone} className="rounded border border-neutral-200 bg-neutral-50 px-2 py-1">
              {o.label}
            </span>
          ))}
        </div>
      </section>

      <section className="space-y-3" aria-labelledby="margin-drivers-heading">
        <h2 id="margin-drivers-heading" className="text-lg font-semibold text-neutral-900">
          {marginDriversIntro.headline}
        </h2>
        <AlertBanner>{marginDriversIntro.alert}</AlertBanner>

        <div className="overflow-hidden rounded-lg border border-neutral-200 bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="min-w-[640px] w-full border-collapse text-sm">
              <thead>
                <tr className="border-b border-neutral-200 bg-neutral-50 text-left text-xs font-semibold uppercase tracking-wide text-neutral-600">
                  <th className="px-3 py-2.5 sm:px-4">Community</th>
                  <th className="px-3 py-2.5 sm:px-4">Options loading</th>
                  <th className="px-3 py-2.5 sm:px-4">Status</th>
                  <th className="px-3 py-2.5 sm:px-4">vs benchmark</th>
                </tr>
              </thead>
              <tbody>
                {marginDriverRows.map((r) => (
                  <tr key={r.communityId} className="border-b border-neutral-100 last:border-b-0">
                    <td className="px-3 py-3 font-semibold text-neutral-900 sm:px-4">
                      {r.communityName}
                    </td>
                    <td className="px-3 py-3 tabular-nums sm:px-4">{r.optionsLoadingPct}</td>
                    <td className="px-3 py-3 sm:px-4">{r.status}</td>
                    <td className="px-3 py-3 text-neutral-700 sm:px-4">{r.vsBenchmark}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <footer className="space-y-4 border-t border-neutral-200 pt-6 text-center">
        <p className="text-xs text-neutral-500">{reportFootnotes.cancellations}</p>
        <p className="text-xs font-semibold uppercase tracking-widest text-neutral-400">
          {reportFootnotes.poweredBy}
        </p>
      </footer>
    </div>
  )
}
