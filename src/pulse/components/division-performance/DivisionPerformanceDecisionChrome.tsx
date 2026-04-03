import { Link } from 'react-router-dom'
import { OPENHOMES_FORECAST_DRIVERS } from '@/pulse/constants/routes'
import {
  DIVISION_PERFORMANCE_AT_A_GLANCE_HEADING,
  divisionPerformanceExecutiveOverview,
  divisionPerformanceNextSteps,
  divisionPerformanceSectionNav,
  rollupKpiCards,
} from '@/pulse/data/divisionPerformanceReport'
import { DivisionPerformanceRollupKpiCard } from '@/pulse/components/division-performance/DivisionPerformanceRollupKpiCard'
import { divisionLeadingIndicatorsExecutiveSentence } from '@/pulse/data/forecastLeadingIndicators'
import { cn } from '@/lib/cn'
import {
  pulseFooterOverlineOnDark,
  pulseInsetSectionTitle,
  pulseQaCardQuestion,
  pulseRiskOpportunityLabel,
  pulseSectionTitleOnCard,
} from '@/pulse/ui/pulseTypography'

export function ReportSectionJumpNav() {
  return (
    <nav
      className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-1 sm:flex-wrap sm:overflow-visible sm:px-0 sm:pb-0"
      aria-label="Report sections"
    >
      {divisionPerformanceSectionNav.map((item) => (
        <a
          key={item.href}
          href={item.href}
          className="shrink-0 rounded-full border border-neutral-300/90 bg-white px-3 py-1.5 text-xs font-semibold text-neutral-800 shadow-sm transition-colors hover:border-neutral-400 hover:bg-neutral-50"
        >
          {item.label}
        </a>
      ))}
    </nav>
  )
}

export function ExecutiveOverviewPanel() {
  const { qa, risk, riskLabel, opportunity, opportunityLabel } = divisionPerformanceExecutiveOverview

  return (
    <section
      id="executive-overview"
      className="scroll-mt-24 rounded-xl border border-neutral-300/90 bg-white p-4 shadow-sm sm:p-5"
      aria-labelledby="executive-overview-heading"
    >
      <h2 id="executive-overview-heading" className={pulseSectionTitleOnCard}>
        {DIVISION_PERFORMANCE_AT_A_GLANCE_HEADING}
      </h2>

      <div
        id="rollup-kpis"
        className="scroll-mt-24 mt-5 grid gap-4 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3 lg:items-stretch"
        aria-label="March MTD, YTD, and 90-day forecast rollup"
      >
        {rollupKpiCards.map((card) => (
          <DivisionPerformanceRollupKpiCard key={card.id} {...card} />
        ))}
      </div>

      <div className="mt-5 rounded-lg border border-neutral-300/90 bg-neutral-100 px-3 py-3 sm:px-4 sm:py-3.5">
        <p className={pulseInsetSectionTitle}>Leading Indicators</p>
        <p className="mt-1.5 text-sm font-medium leading-relaxed text-neutral-900">
          {divisionLeadingIndicatorsExecutiveSentence}
        </p>
        <Link
          to={OPENHOMES_FORECAST_DRIVERS}
          className="mt-2 inline-flex text-sm font-semibold text-blue-700 underline decoration-blue-300 underline-offset-2 transition-colors hover:text-blue-800 hover:decoration-blue-500"
        >
          View full list on Forecast Drivers →
        </Link>
      </div>

      <ul className="mt-5 grid list-none gap-3 p-0 sm:grid-cols-2" role="list">
        {qa.map((item) => (
          <li
            key={item.id}
            className={cn(
              'overflow-hidden rounded-lg border border-neutral-200/90 border-l-4 shadow-sm',
              item.tone === 'attention' && 'border-l-amber-500 bg-amber-50/90',
              item.tone === 'positive' && 'border-l-emerald-500 bg-emerald-50/80',
              item.tone === 'default' && 'border-l-neutral-500 bg-neutral-100',
            )}
          >
            <div className="min-w-0 px-3 py-3 sm:px-4">
              <p className={pulseQaCardQuestion}>{item.question}</p>
              <p className="mt-1.5 text-sm leading-relaxed text-neutral-800">{item.answer}</p>
            </div>
          </li>
        ))}
      </ul>

      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <div className="rounded-lg border border-red-200/90 bg-red-50/80 px-3 py-3 sm:px-4">
          <p className={cn(pulseRiskOpportunityLabel, 'text-red-800/90')}>{riskLabel}</p>
          <p className="mt-1.5 text-sm leading-relaxed text-red-950">{risk}</p>
        </div>
        <div className="rounded-lg border border-emerald-200/90 bg-emerald-50/70 px-3 py-3 sm:px-4">
          <p className={cn(pulseRiskOpportunityLabel, 'text-emerald-900/90')}>{opportunityLabel}</p>
          <p className="mt-1.5 text-sm leading-relaxed text-emerald-950">{opportunity}</p>
        </div>
      </div>
    </section>
  )
}

export function ReportDecisionFooter() {
  const { title, links, discussionPrompts } = divisionPerformanceNextSteps
  const subtitle = (divisionPerformanceNextSteps as { subtitle?: string }).subtitle

  return (
    <section
      id="next-steps"
      className="scroll-mt-24 rounded-xl border border-neutral-900 bg-neutral-900 p-5 text-white shadow-lg sm:p-6"
      aria-labelledby="next-steps-heading"
    >
      <h2 id="next-steps-heading" className="text-base font-bold tracking-tight">
        {title}
      </h2>
      {subtitle ? (
        <p className="mt-2 max-w-3xl text-sm leading-relaxed text-neutral-300">{subtitle}</p>
      ) : null}

      <ul className="mt-5 grid list-none gap-3 p-0 sm:grid-cols-3" role="list">
        {links.map((item) => (
          <li key={item.id}>
            <Link
              to={item.to}
              className="flex h-full flex-col rounded-lg border border-white/15 bg-white/5 px-4 py-3 transition-colors hover:border-white/30 hover:bg-white/10"
            >
              <span className="text-sm font-semibold text-white">{item.label}</span>
              <span className="mt-1 text-xs leading-relaxed text-neutral-400">{item.hint}</span>
              <span className="mt-3 text-xs font-semibold text-neutral-200">Open →</span>
            </Link>
          </li>
        ))}
      </ul>

      <div className="mt-6 border-t border-white/10 pt-5">
        <p className={pulseFooterOverlineOnDark}>Discussion Prompts</p>
        <ul className="mt-2 list-disc space-y-1.5 pl-5 text-sm leading-relaxed text-neutral-200">
          {discussionPrompts.map((prompt) => (
            <li key={prompt}>{prompt}</li>
          ))}
        </ul>
      </div>
    </section>
  )
}
