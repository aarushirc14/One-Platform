import {
  DIVISION_PERFORMANCE_DATA_FRESHNESS_NOTE,
  DIVISION_PERFORMANCE_DATA_UNTIL_NOTE,
  DIVISION_PERFORMANCE_PAGE_TITLE,
  cumulativeSalesComparison,
  historicalMonthlySales,
  forecastByPeriod,
  marginDriversIntro,
  rollupKpiCards,
  salesForecastIntro,
  salesForecastSummaryCards,
} from '@/pulse/mock/divisionPerformanceReport'
import { CommunityPerformanceSection } from '@/pulse/components/division-performance/CommunityPerformanceSection'
import {
  ExecutiveOverviewPanel,
  ReportDecisionFooter,
  ReportSectionJumpNav,
} from '@/pulse/components/division-performance/DivisionPerformanceDecisionChrome'
import { DivisionPerformanceRollupKpiCard } from '@/pulse/components/division-performance/DivisionPerformanceRollupKpiCard'
import { CumulativeSalesComparisonChart } from '@/pulse/components/division-performance/CumulativeSalesComparisonChart'
import { ForecastByPeriodChart } from '@/pulse/components/division-performance/ForecastByPeriodChart'
import { HistoricalMonthlySalesChart } from '@/pulse/components/division-performance/HistoricalMonthlySalesChart'
import { NinetyDaySalesForecastChart } from '@/pulse/components/division-performance/NinetyDaySalesForecastChart'
import { OptionsUptakeByCommunityChart } from '@/pulse/components/division-performance/OptionsUptakeByCommunityChart'
import { SalesForecastSummaryCard } from '@/pulse/components/division-performance/SalesForecastSummaryCard'
import { PulsePageHeading } from '@/pulse/components/PulsePageHeading'
import { cn } from '@/lib/cn'
import { IconAlertCircleSolid, IconDownload, IconLineChart } from '@/pulse/components/icons'
import { pulseDataValidUntil, pulseJumpNavOverline, pulseSectionTitleOnCard } from '@/pulse/ui/pulseTypography'

export function DivisionPerformanceReport() {
  return (
    <div className="space-y-6 pb-10 sm:space-y-8">
      <header className="border-b border-neutral-300/90 pb-5">
        <div className="flex flex-row flex-wrap items-start justify-between gap-3 gap-y-4">
          <div className="min-w-0 max-w-full flex-1">
            <PulsePageHeading title={DIVISION_PERFORMANCE_PAGE_TITLE} />
          </div>
          <div className="flex min-w-[10.5rem] shrink-0 sm:min-w-[11.5rem]">
            <button
              type="button"
              className="flex w-full min-h-10 flex-col justify-center gap-0.5 rounded-xl border border-neutral-300/90 bg-neutral-200 px-3 py-2 text-left shadow-sm transition-colors hover:border-neutral-400/80 hover:bg-neutral-300/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-400 active:bg-neutral-300"
            >
              <span className="text-[10px] font-semibold leading-none text-neutral-600">Export</span>
              <span className="flex items-center gap-2 text-sm font-semibold tracking-tight text-neutral-950">
                <IconDownload className="h-4 w-4 shrink-0 text-neutral-600" aria-hidden />
                PDF
              </span>
            </button>
          </div>
        </div>
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-neutral-600">
          {DIVISION_PERFORMANCE_DATA_FRESHNESS_NOTE}
        </p>
        <p className={cn('mt-2', pulseDataValidUntil)}>{DIVISION_PERFORMANCE_DATA_UNTIL_NOTE}</p>

        <div className="mt-5">
          <p className={pulseJumpNavOverline}>Jump to</p>
          <ReportSectionJumpNav />
        </div>
      </header>

      <ExecutiveOverviewPanel />

      <section
        id="rollup-kpis"
        className="scroll-mt-24"
        aria-label="Division rollup: March MTD, YTD, 90-day forecast"
      >
        <div className="mb-3">
          <h2 className="text-base font-semibold text-neutral-950">Actuals, Target, and Pace</h2>
          <p className="mt-1 max-w-2xl text-sm text-neutral-600">
            Snapshot of where closed sales sit against plan — the same status objects roll up into the executive
            answers above.
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3 lg:items-stretch">
          {rollupKpiCards.map((card) => (
            <DivisionPerformanceRollupKpiCard key={card.id} {...card} />
          ))}
        </div>
      </section>

      <section
        id="sales-forecast"
        className="scroll-mt-24 rounded-xl border border-neutral-300/90 bg-white p-5 shadow-sm sm:p-6"
        aria-labelledby="sales-forecast-heading"
      >
        <div className="flex gap-3 sm:gap-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-neutral-800 text-white shadow-sm">
            <IconLineChart className="h-5 w-5" aria-hidden />
          </div>
          <div className="min-w-0 pt-0.5">
            <h2 id="sales-forecast-heading" className={pulseSectionTitleOnCard}>
              {salesForecastIntro.headline}
            </h2>
            <p className="mt-1 text-sm leading-relaxed text-neutral-600">{salesForecastIntro.subline}</p>
            <p className="mt-2 max-w-3xl text-xs leading-relaxed text-neutral-500">
              Evidence for the forecast story — use it after you have decided whether pace is acceptable. Charts
              support &ldquo;why&rdquo; conversations; they do not replace the priorities table below.
            </p>
          </div>
        </div>

        <div className="mt-5 flex overflow-hidden rounded-lg border border-neutral-300 bg-neutral-100">
          <div className="w-1 shrink-0 bg-neutral-600" aria-hidden />
          <div className="flex min-w-0 flex-1 items-start gap-3 px-4 py-3.5 sm:px-5">
            <IconAlertCircleSolid className="mt-0.5 h-5 w-5 shrink-0 text-neutral-600" aria-hidden />
            <p className="text-sm font-medium leading-relaxed text-neutral-800">{salesForecastIntro.alert}</p>
          </div>
        </div>

        <div className="mt-5 grid gap-4 lg:grid-cols-3 lg:items-stretch">
          {salesForecastSummaryCards.map((card) => (
            <SalesForecastSummaryCard key={card.id} {...card} />
          ))}
        </div>

        <div className="mt-8 border-t border-neutral-300/80 pt-6">
          <ForecastByPeriodChart rows={forecastByPeriod} />
        </div>

        <div className="mt-6 space-y-6">
          <NinetyDaySalesForecastChart />
          <HistoricalMonthlySalesChart data={historicalMonthlySales} />
          <CumulativeSalesComparisonChart data={cumulativeSalesComparison} />
        </div>
      </section>

      <CommunityPerformanceSection />

      <section
        id="margin-drivers"
        className="scroll-mt-24 rounded-xl border border-neutral-300/90 bg-white p-5 shadow-sm sm:p-6"
        aria-labelledby="margin-drivers-heading"
      >
        <div className="flex gap-3 sm:gap-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-neutral-800 text-white shadow-sm">
            <IconLineChart className="h-5 w-5" aria-hidden />
          </div>
          <div className="min-w-0 pt-0.5">
            <h2 id="margin-drivers-heading" className={pulseSectionTitleOnCard}>
              {marginDriversIntro.headline}
            </h2>
            <p className="mt-1 text-sm leading-relaxed text-neutral-600">{marginDriversIntro.subline}</p>
            <p className="mt-2 max-w-3xl text-xs leading-relaxed text-neutral-500">
              Diagnosis signal for margin — pair with Community Triage when a community shows weak options uptake
              alongside funnel stress.
            </p>
          </div>
        </div>

        <div className="mt-5 flex overflow-hidden rounded-lg border border-neutral-300 bg-neutral-100">
          <div className="w-1 shrink-0 bg-neutral-600" aria-hidden />
          <div className="flex min-w-0 flex-1 items-start gap-3 px-4 py-3.5 sm:px-5">
            <IconAlertCircleSolid className="mt-0.5 h-5 w-5 shrink-0 text-neutral-600" aria-hidden />
            <p className="text-sm font-medium leading-relaxed text-neutral-800">{marginDriversIntro.alert}</p>
          </div>
        </div>

        <div className="mt-5">
          <OptionsUptakeByCommunityChart />
        </div>
      </section>

      <ReportDecisionFooter />
    </div>
  )
}
