import { Link } from 'react-router-dom'
import {
  PageHeader,
  QuickAccessLinks,
  StatusMetricCard,
  SurfaceCard,
  ToneBadge,
} from '@/openhouse/components/OpenHousePrimitives'
import type { OpenHouseRole } from '@/openhouse/types'
import { decisionPlatformModel, getDriverById } from '@/openhouse/data/decisionEngine'
import { useOpenHouseRole } from '@/openhouse/context/OpenHouseRoleContext'
import { OPENHOMES_BRIEFING, OPENHOMES_DRIVERS, OPENHOMES_PRIORITIES, openhomesCommunityPath } from '@/pulse/constants/routes'
import { ForecastByPeriodChart } from '@/pulse/components/division-performance/ForecastByPeriodChart'
import { forecastByPeriod } from '@/pulse/data/divisionPerformanceReport'
import { cn } from '@/lib/cn'

const descriptions: Record<OpenHouseRole, string> = {
  executive: 'Current outlook, biggest risks, where to focus, and a direct path to a printable executive brief.',
  operator: 'Which communities need action, what stage is failing, and where to drill next.',
  analyst: 'The current business story, then directly into the drivers and communities that explain the forecast.',
}

const workflowSteps: Record<OpenHouseRole, { id: string; title: string; detail: string; to?: string; cta?: string }[]> = {
  executive: [
    { id: 'exec-overview', title: 'Confirm division status', detail: '' },
    { id: 'exec-focus', title: 'Focus on critical communities', detail: '', to: OPENHOMES_PRIORITIES, cta: 'Open focus queue' },
    { id: 'exec-briefing', title: 'Get a printable summary', detail: '', to: OPENHOMES_BRIEFING, cta: 'Open briefing' },
  ],
  operator: [
    { id: 'op-orient', title: 'Orient to division status', detail: '' },
    { id: 'op-focus', title: 'Jump to priority work', detail: '', to: OPENHOMES_PRIORITIES, cta: 'Open focus queue' },
    { id: 'op-communities', title: 'Enter community workspace', detail: '', to: openhomesCommunityPath(decisionPlatformModel.priorities[0]?.communityId ?? 'catalina-foothills'), cta: 'Open top workspace' },
  ],
  analyst: [
    { id: 'an-story', title: 'Read the narrative', detail: '' },
    { id: 'an-drivers', title: 'Validate signal layer', detail: '', to: OPENHOMES_DRIVERS, cta: 'Open drivers' },
    { id: 'an-community', title: 'Connect to communities', detail: '', to: openhomesCommunityPath(decisionPlatformModel.priorities[0]?.communityId ?? 'catalina-foothills'), cta: 'Open top workspace' },
  ],
}

const actionTitles: Record<OpenHouseRole, string> = {
  executive: 'Immediate action stack',
  operator: 'Today\u2019s operating moves',
  analyst: 'Narrative and explanation actions',
}

export function ExecutiveOverviewPage() {
  const { role } = useOpenHouseRole()
  const { overview, priorities } = decisionPlatformModel
  const topPriorities = priorities.slice(0, 3)
  const topDrivers = decisionPlatformModel.drivers.slice(0, 3)

  return (
    <div className="space-y-6 sm:space-y-8">
      <PageHeader
        title={overview.title}
        description={descriptions[role]}
        actions={
          <>
            <Link
              to={OPENHOMES_PRIORITIES}
              className="inline-flex rounded-full border border-neutral-200 bg-white px-4 py-2 text-sm font-semibold text-neutral-900 shadow-sm transition-colors hover:bg-neutral-50"
            >
              Open focus queue
            </Link>
            <Link
              to={OPENHOMES_BRIEFING}
              className="inline-flex rounded-full bg-neutral-950 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-neutral-800"
            >
              Open briefing
            </Link>
          </>
        }
      />

      <QuickAccessLinks steps={workflowSteps[role]} />

      {/* Snapshot + Actions */}
      <SurfaceCard className="overflow-hidden">
        <div className="grid gap-0 xl:grid-cols-[1.3fr_0.9fr]">
          <div className="border-b border-neutral-200 p-5 sm:p-6 xl:border-b-0 xl:border-r">
            <div className="flex flex-wrap items-center gap-3">
              <ToneBadge tone={overview.overallOutlook}>At risk</ToneBadge>
            </div>
            <h2 className="mt-4 max-w-4xl text-balance text-2xl font-semibold tracking-tight text-neutral-950 sm:text-3xl">
              Are we on track? Not yet. The fix is now clearer by community and by funnel stage.
            </h2>
            <p className="mt-4 max-w-3xl text-sm leading-relaxed text-neutral-600 sm:text-[15px]">
              {overview.narrative}
            </p>

            <div className="mt-6 grid grid-cols-2 gap-3 xl:grid-cols-4">
              {overview.statusMetrics.map((metric) => (
                <StatusMetricCard key={metric.id} metric={metric} />
              ))}
            </div>
          </div>

          <div className="p-5 sm:p-6">
            <h3 className="text-lg font-semibold tracking-tight text-neutral-950">{actionTitles[role]}</h3>
            <div className="mt-4 space-y-3">
              {overview.actionRecommendations.map((action) => (
                <div key={action.id} className="rounded-[16px] border border-neutral-200 bg-[#eef0f6] p-4">
                  <p className="text-sm font-semibold text-neutral-950">{action.title}</p>
                  <p className="mt-1.5 text-sm leading-relaxed text-neutral-600">{action.detail}</p>
                  <div className="mt-2 flex flex-wrap items-center gap-2">
                    <span className="rounded-full bg-white px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-neutral-500">
                      {action.owner}
                    </span>
                    <span className="rounded-full bg-white px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-neutral-500">
                      {action.timeframe}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </SurfaceCard>

      {/* Priority Communities + Signal Summary */}
      <div
        className={cn(
          'grid gap-6 xl:grid-cols-2',
          role !== 'executive' && 'xl:[&>*:first-child]:order-2 xl:[&>*:last-child]:order-1',
        )}
      >
        <SurfaceCard className="p-5 sm:p-6">
          <h3 className="text-lg font-semibold tracking-tight text-neutral-950">Priority communities</h3>
          <div className="mt-4 space-y-3">
            {topPriorities.map((priority) => (
              <Link
                key={priority.id}
                to={openhomesCommunityPath(priority.communityId)}
                className="block rounded-[16px] border border-neutral-200 bg-[#eef0f6] p-4 transition-colors hover:border-neutral-300 hover:bg-white"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <p className="text-base font-semibold tracking-tight text-neutral-950">
                    {priority.communityName}
                  </p>
                  <ToneBadge tone={priority.priorityTone}>
                    {priority.priorityTone === 'critical' ? 'Critical' : priority.priorityTone}
                  </ToneBadge>
                </div>
                <p className="mt-2 text-sm text-neutral-600">{priority.salesGapLabel}</p>
                <p className="mt-2 text-sm font-medium text-neutral-900">{priority.recommendedAction}</p>
              </Link>
            ))}
          </div>
        </SurfaceCard>

        <SurfaceCard className="p-5 sm:p-6">
          <h3 className="text-lg font-semibold tracking-tight text-neutral-950">Signal summary</h3>
          <div className="mt-4 space-y-3">
            {topDrivers.map((driver) => (
              <Link
                key={driver.id}
                to={OPENHOMES_DRIVERS}
                className="block rounded-[16px] border border-neutral-200 bg-[#eef0f6] p-4 transition-colors hover:border-neutral-300 hover:bg-white"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <p className="text-base font-semibold tracking-tight text-neutral-950">{driver.title}</p>
                  <ToneBadge tone={driver.credibility}>
                    {driver.credibility === 'high' ? 'High' : 'Medium'}
                  </ToneBadge>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-neutral-600">{driver.implication}</p>
              </Link>
            ))}
          </div>
        </SurfaceCard>
      </div>

      {/* Risk / Opportunity + Decision Prompts */}
      <div className="grid gap-6 xl:grid-cols-[0.85fr_1.15fr]">
        <SurfaceCard className="p-5 sm:p-6">
          <h3 className="text-lg font-semibold tracking-tight text-neutral-950">Risk and upside</h3>
          <div className="mt-4 space-y-3">
            <div className="rounded-[16px] border border-red-200 bg-red-50/80 p-4">
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-red-800">Largest risk</p>
              <p className="mt-2 text-sm leading-relaxed text-red-950">{overview.risk}</p>
            </div>
            <div className="rounded-[16px] border border-emerald-200 bg-emerald-50/80 p-4">
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-emerald-800">Largest upside</p>
              <p className="mt-2 text-sm leading-relaxed text-emerald-950">{overview.opportunity}</p>
            </div>
            {getDriverById(topPriorities[0]?.linkedDriverIds[0] ?? '') ? (
              <Link
                to={openhomesCommunityPath(topPriorities[0].communityId)}
                className="inline-flex rounded-full border border-neutral-200 bg-white px-4 py-2 text-sm font-semibold text-neutral-900 shadow-sm transition-colors hover:bg-neutral-50"
              >
                Drill into {topPriorities[0].communityName}
              </Link>
            ) : null}
          </div>
        </SurfaceCard>

        <SurfaceCard className="p-5 sm:p-6">
          <h3 className="text-lg font-semibold tracking-tight text-neutral-950">Leadership questions</h3>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {overview.decisionCards.map((card) => (
              <div
                key={card.id}
                className={cn(
                  'rounded-[16px] border p-4',
                  card.tone === 'attention' && 'border-amber-200 bg-amber-50/80',
                  card.tone === 'positive' && 'border-emerald-200 bg-emerald-50/80',
                  card.tone === 'default' && 'border-neutral-200 bg-[#eef0f6]',
                )}
              >
                <p className="text-sm font-semibold text-neutral-950">{card.question}</p>
                <p className="mt-2 text-sm leading-relaxed text-neutral-700">{card.answer}</p>
              </div>
            ))}
          </div>
        </SurfaceCard>
      </div>

      {/* Forecast Chart */}
      <SurfaceCard className="p-5 sm:p-6">
        <h3 className="text-lg font-semibold tracking-tight text-neutral-950">Forecast shape</h3>
        <div className="mt-4">
          <ForecastByPeriodChart rows={forecastByPeriod} />
        </div>
      </SurfaceCard>
    </div>
  )
}
