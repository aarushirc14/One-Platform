import { Link } from 'react-router-dom'
import {
  PageHeader,
  QuickAccessLinks,
  SectionHeading,
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

const descriptions = {
  executive:
    'Get the answer first: current outlook, biggest risks, where to focus, and a direct path to a printable executive brief.',
  operator:
    'See which communities need action, what stage is failing, and where to drill next without paging through report sections.',
  analyst:
    'Understand the current business story, then move directly into the drivers and communities that best explain the forecast.',
}

const workflowContent: Record<
  OpenHouseRole,
  {
    title: string
    description: string
    steps: { id: string; title: string; detail: string; to?: string; cta?: string }[]
    actionTitle: string
    actionDescription: string
  }
> = {
  executive: {
    title: 'Executive workflow',
    description: 'Start with the division answer, confirm where leadership attention should go, then leave with a briefing-ready summary.',
    steps: [
      {
        id: 'exec-overview',
        title: 'Confirm division status',
        detail: 'Use this page to understand whether the division is on track and what changed most recently.',
      },
      {
        id: 'exec-focus',
        title: 'Choose the few communities that matter most',
        detail: 'Move directly into the ranked focus queue when you need to decide where leadership time belongs.',
        to: OPENHOMES_PRIORITIES,
        cta: 'Open focus queue',
      },
      {
        id: 'exec-briefing',
        title: 'Take a printable summary into the next review',
        detail: 'Use the briefing as the output artifact for leadership syncs and printed handoffs.',
        to: OPENHOMES_BRIEFING,
        cta: 'Open briefing',
      },
    ],
    actionTitle: 'Immediate action stack',
    actionDescription: 'This turns the forecast into a set of accountable leadership decisions rather than a slide review.',
  },
  operator: {
    title: 'Operator workflow',
    description: 'Use the overview to orient, then move quickly into the queue and community workspaces where execution actually changes the outcome.',
    steps: [
      {
        id: 'op-orient',
        title: 'Orient to the division story',
        detail: 'Get the high-level status and understand which failure mode is hurting pace the most.',
      },
      {
        id: 'op-focus',
        title: 'Jump to the highest-priority work',
        detail: 'Use the focus queue to decide which community or bottleneck deserves attention first.',
        to: OPENHOMES_PRIORITIES,
        cta: 'Open focus queue',
      },
      {
        id: 'op-communities',
        title: 'Move into community execution',
        detail: 'From there, open community workspaces to review the bottleneck, owner, and next move.',
        to: openhomesCommunityPath(decisionPlatformModel.priorities[0]?.communityId ?? 'catalina-foothills'),
        cta: 'Open top workspace',
      },
    ],
    actionTitle: 'Today’s operating moves',
    actionDescription: 'These are the execution decisions that need owner follow-through right now.',
  },
  analyst: {
    title: 'Analyst workflow',
    description: 'Start with the business story, validate the signals shaping the forecast, then carry that explanation into the right communities.',
    steps: [
      {
        id: 'an-story',
        title: 'Read the current business narrative',
        detail: 'Use the top section to understand the plain-language explanation leadership will see first.',
      },
      {
        id: 'an-drivers',
        title: 'Validate the signal layer',
        detail: 'Go to drivers when you need to confirm which signals are truly shaping the forecast and why.',
        to: OPENHOMES_DRIVERS,
        cta: 'Open drivers',
      },
      {
        id: 'an-community',
        title: 'Connect signals back to real communities',
        detail: 'Use community workspaces to translate model behavior into a credible operating narrative.',
        to: openhomesCommunityPath(decisionPlatformModel.priorities[0]?.communityId ?? 'catalina-foothills'),
        cta: 'Open top workspace',
      },
    ],
    actionTitle: 'Narrative and explanation workflow',
    actionDescription: 'These actions help turn model output into a business-readable story with clear next steps.',
  },
}

export function ExecutiveOverviewPage() {
  const { role } = useOpenHouseRole()
  const { overview, priorities } = decisionPlatformModel
  const topPriorities = priorities.slice(0, 3)
  const topDrivers = decisionPlatformModel.drivers.slice(0, 3)
  const roleContent = workflowContent[role]

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

      <QuickAccessLinks steps={roleContent.steps} />

      <SurfaceCard className="overflow-hidden">
        <div className="grid gap-0 xl:grid-cols-[1.3fr_0.9fr]">
          <div className="border-b border-neutral-200/80 p-5 sm:p-6 lg:border-b-0 lg:border-r">
            <div className="flex flex-wrap items-center gap-3">
              <ToneBadge tone={overview.overallOutlook}>At risk</ToneBadge>
              <span className="text-sm font-medium text-neutral-500">Decision-first snapshot</span>
            </div>
            <h2 className="mt-4 max-w-4xl text-balance text-2xl font-semibold tracking-tight text-neutral-950 sm:text-3xl">
              Are we on track? Not yet. The fix is now clearer by community and by funnel stage.
            </h2>
            <p className="mt-4 max-w-3xl text-sm leading-relaxed text-neutral-600 sm:text-[15px]">
              {overview.narrative}
            </p>

            <div className="mt-6 grid gap-3 sm:grid-cols-2 2xl:grid-cols-4">
              {overview.statusMetrics.map((metric) => (
                <StatusMetricCard key={metric.id} metric={metric} />
              ))}
            </div>
          </div>

          <div className="p-5 sm:p-6">
            <SectionHeading
              overline="What leadership should do"
              title={roleContent.actionTitle}
              description={roleContent.actionDescription}
            />
            <div className="mt-5 space-y-3">
              {overview.actionRecommendations.map((action) => (
                <div key={action.id} className="rounded-[20px] border border-neutral-200 bg-neutral-50 p-4">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-sm font-semibold text-neutral-950">{action.title}</span>
                    <span className="rounded-full bg-white px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-neutral-500">
                      {action.owner}
                    </span>
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-neutral-600">{action.detail}</p>
                  <p className="mt-3 text-xs font-semibold uppercase tracking-[0.16em] text-neutral-500">
                    {action.timeframe}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </SurfaceCard>

      <div
        className={cn(
          'grid gap-6 xl:grid-cols-2',
          role === 'operator' && 'xl:[&>*:first-child]:order-2 xl:[&>*:last-child]:order-1',
          role === 'analyst' && 'xl:[&>*:first-child]:order-2 xl:[&>*:last-child]:order-1',
        )}
      >
        <SurfaceCard className="p-5 sm:p-6">
          <SectionHeading
            overline="Where to focus"
            title="Priority communities"
            description="The platform ranks where leadership attention creates the most leverage right now."
          />
          <div className="mt-5 space-y-3">
            {topPriorities.map((priority) => (
              <Link
                key={priority.id}
                to={openhomesCommunityPath(priority.communityId)}
                className="block min-w-0 rounded-[20px] border border-neutral-200 bg-neutral-50 p-4 transition-colors hover:border-neutral-300 hover:bg-white"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-neutral-500">
                      Priority {priority.rank}
                    </p>
                    <p className="mt-1 break-words text-lg font-semibold tracking-tight text-neutral-950">
                      {priority.communityName}
                    </p>
                  </div>
                  <ToneBadge tone={priority.priorityTone}>
                    {priority.priorityTone === 'critical' ? 'Critical' : priority.priorityTone}
                  </ToneBadge>
                </div>
                <p className="mt-3 text-sm font-medium text-neutral-900">{priority.salesGapLabel}</p>
                <p className="mt-2 text-sm leading-relaxed text-neutral-600">{priority.summary}</p>
                <p className="mt-3 text-sm font-semibold text-neutral-900">{priority.recommendedAction}</p>
              </Link>
            ))}
          </div>
        </SurfaceCard>

        <SurfaceCard className="p-5 sm:p-6">
          <SectionHeading
            overline="Why this is happening"
            title="Signal summary"
            description="Instead of raw feature lists, these are the business-readable drivers shaping the forecast."
          />
          <div className="mt-5 space-y-3">
            {topDrivers.map((driver) => (
              <Link
                key={driver.id}
                to={OPENHOMES_DRIVERS}
                className="block min-w-0 rounded-[20px] border border-neutral-200 bg-neutral-50 p-4 transition-colors hover:border-neutral-300 hover:bg-white"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <p className="break-words text-base font-semibold tracking-tight text-neutral-950">
                    {driver.title}
                  </p>
                  <ToneBadge tone={driver.credibility}>
                    {driver.credibility === 'high' ? 'High credibility' : 'Medium credibility'}
                  </ToneBadge>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-neutral-600">{driver.implication}</p>
                <p className="mt-3 text-sm font-medium text-neutral-900">{driver.actionPrompt}</p>
              </Link>
            ))}
          </div>
        </SurfaceCard>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
        <SurfaceCard className="p-5 sm:p-6">
          <SectionHeading
            overline="Decision prompts"
            title="Leadership questions"
            description="The product now answers these directly instead of hiding them inside a long report."
          />
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            {overview.decisionCards.map((card) => (
              <div
                key={card.id}
                className={cn(
                  'rounded-[20px] border p-4',
                  card.tone === 'attention' && 'border-amber-200 bg-amber-50/80',
                  card.tone === 'positive' && 'border-emerald-200 bg-emerald-50/80',
                  card.tone === 'default' && 'border-neutral-200 bg-neutral-50',
                )}
              >
                <p className="text-sm font-semibold text-neutral-950">{card.question}</p>
                <p className="mt-2 text-sm leading-relaxed text-neutral-700">{card.answer}</p>
              </div>
            ))}
          </div>
        </SurfaceCard>

        <SurfaceCard className="p-5 sm:p-6">
          <SectionHeading
            overline="Balance the story"
            title="Risk and upside"
            description="The same surface highlights what could break the plan and what can still be leveraged."
          />
          <div className="mt-5 space-y-3">
            <div className="rounded-[20px] border border-red-200 bg-red-50/80 p-4">
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-red-800">Largest risk</p>
              <p className="mt-2 text-sm leading-relaxed text-red-950">{overview.risk}</p>
            </div>
            <div className="rounded-[20px] border border-emerald-200 bg-emerald-50/80 p-4">
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-emerald-800">
                Largest upside
              </p>
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
      </div>

      <SurfaceCard className="p-5 sm:p-6">
        <SectionHeading
          overline="Forward view"
          title="Forecast shape"
          description="Charts now support the decision, instead of acting as the decision."
        />
        <div className="mt-5">
          <ForecastByPeriodChart rows={forecastByPeriod} />
        </div>
      </SurfaceCard>
    </div>
  )
}
