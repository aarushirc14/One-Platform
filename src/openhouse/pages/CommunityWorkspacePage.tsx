import { Link, useParams } from 'react-router-dom'
import {
  PageHeader,
  QuickAccessLinks,
  SectionHeading,
  StatePanel,
  SurfaceCard,
  ToneBadge,
} from '@/openhouse/components/OpenHousePrimitives'
import { decisionPlatformModel, getCommunityWorkspace, getDriverById } from '@/openhouse/data/decisionEngine'
import { useOpenHouseRole } from '@/openhouse/context/OpenHouseRoleContext'
import {
  OPENHOMES_COMMUNITIES,
  OPENHOMES_DRIVERS,
  OPENHOMES_PRIORITIES,
  openhomesCommunityPath,
} from '@/pulse/constants/routes'
import { ForecastDriverTrendChart } from '@/pulse/components/forecast-drivers/ForecastDriverTrendChart'
import { cn } from '@/lib/cn'
import type { OpenHouseRole } from '@/openhouse/types'

const workflowContent: Record<
  OpenHouseRole,
  {
    title: string
    description: string
    steps: { id: string; title: string; detail: string; to?: string; cta?: string }[]
  }
> = {
  executive: {
    title: 'Executive workflow in a community workspace',
    description: 'Use this page to confirm whether the recommendation is sound, not to become the day-to-day operator.',
    steps: [
      {
        id: 'exec-diagnose',
        title: 'Confirm the real bottleneck',
        detail: 'Use the diagnosis and stage cards to decide whether the issue is demand, lead creation, tours, or close-rate execution.',
      },
      {
        id: 'exec-action',
        title: 'Choose the intervention to press',
        detail: 'The action brief gives you the owner and next move you should reinforce.',
      },
      {
        id: 'exec-compare',
        title: 'Jump to another community if needed',
        detail: 'Use the cross-links at the bottom when you want to compare this story against other priority communities.',
        to: OPENHOMES_COMMUNITIES,
        cta: 'Browse communities',
      },
    ],
  },
  operator: {
    title: 'Operator workflow in a community workspace',
    description: 'This is the execution page: review the bottleneck, work the action brief, and use the evidence to guide follow-through.',
    steps: [
      {
        id: 'op-stage',
        title: 'Inspect the stage diagnostics',
        detail: 'Use the funnel stage cards to identify exactly where the community is leaking pace.',
      },
      {
        id: 'op-act',
        title: 'Work the action brief',
        detail: 'Use the action recommendations to assign the next move, owner, and timeframe.',
      },
      {
        id: 'op-compare',
        title: 'Open another workspace for comparison',
        detail: 'Use this to compare what good execution looks like across communities.',
        to: OPENHOMES_COMMUNITIES,
        cta: 'Browse communities',
      },
    ],
  },
  analyst: {
    title: 'Analyst workflow in a community workspace',
    description: 'Use the page to validate the local narrative, connect it to the supporting signal, and gather the right business questions.',
    steps: [
      {
        id: 'an-narrative',
        title: 'Check whether the diagnosis matches the narrative',
        detail: 'Use the opening story and stage evidence to see if the business explanation holds together.',
      },
      {
        id: 'an-signal',
        title: 'Review the supporting signal and related drivers',
        detail: 'Use the trend and driver cards to tie the local problem back to broader division signals.',
      },
      {
        id: 'an-question',
        title: 'Carry the right questions into the next conversation',
        detail: 'The question list is meant to shape stakeholder discussion, not just describe the funnel.',
      },
    ],
  },
}

export function CommunityWorkspacePage() {
  const { communityId } = useParams<{ communityId: string }>()
  const { role } = useOpenHouseRole()
  const community = communityId ? getCommunityWorkspace(communityId) : null

  if (!community) {
    return (
      <StatePanel
        title="Community workspace unavailable"
        description="That community does not have a configured workspace yet. Return to the focus queue and choose one of the ranked communities."
        tone="error"
        action={
          <Link
            to={OPENHOMES_PRIORITIES}
            className="inline-flex rounded-full bg-neutral-950 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-neutral-800"
          >
            Back to focus queue
          </Link>
        }
      />
    )
  }

  const relatedDrivers = community.relatedDriverIds
    .map((driverId) => getDriverById(driverId))
    .filter((driver): driver is NonNullable<typeof driver> => driver !== null)
  const trendDriver = getDriverById(community.trendDriverId)
  const roleContent = workflowContent[role]

  return (
    <div className="space-y-6 sm:space-y-8">
      <div className="flex flex-wrap gap-2">
        <Link
          to={OPENHOMES_COMMUNITIES}
          className="inline-flex w-full justify-center rounded-full border border-neutral-200 bg-white px-4 py-2 text-sm font-semibold text-neutral-900 transition-colors hover:bg-neutral-50 sm:w-auto"
        >
          All communities
        </Link>
        <Link
          to={OPENHOMES_PRIORITIES}
          className="inline-flex w-full justify-center rounded-full border border-neutral-200 bg-white px-4 py-2 text-sm font-semibold text-neutral-900 transition-colors hover:bg-neutral-50 sm:w-auto"
        >
          Back to focus queue
        </Link>
        <Link
          to={OPENHOMES_DRIVERS}
          className="inline-flex w-full justify-center rounded-full border border-neutral-200 bg-white px-4 py-2 text-sm font-semibold text-neutral-900 transition-colors hover:bg-neutral-50 sm:w-auto"
        >
          Open drivers
        </Link>
      </div>

      <PageHeader
        eyebrow="Community workspace"
        title={community.name}
        description={
          role === 'executive'
            ? 'A concise diagnosis of what is broken, why it matters, and what leadership should press next.'
            : role === 'operator'
              ? 'A working view of the community bottleneck, supporting evidence, and the next execution moves.'
              : 'A business-readable translation of the community story and the signals most likely shaping it.'
        }
      />

      <QuickAccessLinks steps={roleContent.steps} />

      <SurfaceCard className="overflow-hidden">
        <div className="grid gap-0 xl:grid-cols-[1.25fr_0.75fr]">
          <div className="border-b border-neutral-200/80 p-5 sm:p-6 lg:border-b-0 lg:border-r">
            <div className="flex flex-wrap items-center gap-2">
              <ToneBadge tone={community.priorityTone}>
                {community.priorityTone === 'critical' ? 'Critical priority' : community.priorityTone}
              </ToneBadge>
              <ToneBadge tone={community.outlook}>
                {community.outlook === 'off-track'
                  ? 'Off track'
                  : community.outlook === 'at-risk'
                    ? 'At risk'
                    : community.outlook === 'on-track'
                      ? 'On track'
                      : 'Strong'}
              </ToneBadge>
            </div>

            <h2 className="mt-4 max-w-4xl text-balance text-2xl font-semibold tracking-tight text-neutral-950 sm:text-3xl">
              {community.primaryDiagnosis}
            </h2>
            <p className="mt-4 max-w-3xl text-sm leading-relaxed text-neutral-600 sm:text-[15px]">
              {community.narrative}
            </p>

            <div className="mt-6 grid gap-3 md:grid-cols-3">
              <div className="rounded-[20px] border border-neutral-200 bg-neutral-50 p-4">
                <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-neutral-500">Actual sales</p>
                <p className="mt-2 text-2xl font-semibold tracking-tight text-neutral-950">
                  {community.actualSales}
                </p>
              </div>
              <div className="rounded-[20px] border border-neutral-200 bg-neutral-50 p-4">
                <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-neutral-500">Target sales</p>
                <p className="mt-2 text-2xl font-semibold tracking-tight text-neutral-950">
                  {community.targetSales}
                </p>
              </div>
              <div className="rounded-[20px] border border-neutral-200 bg-neutral-50 p-4">
                <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-neutral-500">Gap to plan</p>
                <p
                  className={cn(
                    'mt-2 text-2xl font-semibold tracking-tight',
                    community.salesGap < 0 ? 'text-red-700' : 'text-emerald-700',
                  )}
                >
                  {community.salesGap.toFixed(1)}
                </p>
              </div>
            </div>
          </div>

          <div className="p-5 sm:p-6">
            <SectionHeading
              overline="Next move"
              title="Action brief"
              description="The workspace turns the diagnosis into a clear operating recommendation."
            />
            <p className="mt-4 text-sm font-semibold text-neutral-950">{community.nextAction}</p>
            <p className="mt-3 text-sm leading-relaxed text-neutral-600">{community.likelyCause}</p>
            <div className="mt-5 space-y-3">
              {community.actions.map((action) => (
                <div key={action.id} className="rounded-[18px] border border-neutral-200 bg-neutral-50 p-4">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="text-sm font-semibold text-neutral-950">{action.title}</p>
                    <span className="rounded-full bg-white px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-neutral-500">
                      {action.owner}
                    </span>
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-neutral-600">{action.detail}</p>
                  <p className="mt-2 text-xs font-semibold uppercase tracking-[0.16em] text-neutral-500">
                    {action.timeframe}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </SurfaceCard>

      <SurfaceCard className="p-5 sm:p-6">
        <SectionHeading
          overline="Diagnosis"
          title="Where the funnel is helping or hurting"
          description="Each stage translates raw movement into business impact, so the team can see what truly deserves intervention."
        />
        <div className="mt-5 grid gap-4 sm:grid-cols-2 2xl:grid-cols-4">
          {community.stageDiagnostics.map((stage) => (
            <div key={stage.id} className="rounded-[20px] border border-neutral-200 bg-neutral-50 p-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="text-sm font-semibold text-neutral-950">{stage.label}</p>
                <ToneBadge tone={stage.tone}>
                  {stage.tone === 'weak' ? 'Weak' : stage.tone === 'watch' ? 'Watch' : 'Strong'}
                </ToneBadge>
              </div>
              <p className="mt-3 text-sm font-medium text-neutral-900">{stage.signal}</p>
              <p className="mt-2 text-sm leading-relaxed text-neutral-600">{stage.interpretation}</p>
              <p className="mt-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-neutral-500">
                Impact
              </p>
              <p className="mt-1 text-sm font-semibold text-neutral-950">{stage.impact}</p>
            </div>
          ))}
        </div>
      </SurfaceCard>

      <div className="grid gap-6 2xl:grid-cols-[1.05fr_0.95fr]">
        <SurfaceCard className="p-5 sm:p-6">
          <SectionHeading
            overline="Supporting signal"
            title="Trend tied to the primary diagnosis"
            description="The chart shows the signal that best explains why this community is moving the way it is."
          />
          <div className="mt-5">
            {trendDriver ? (
              <ForecastDriverTrendChart
                chartId={`community-${community.id}`}
                metricLabel={trendDriver.title}
                points={trendDriver.trend}
              />
            ) : (
              <StatePanel
                title="Trend unavailable"
                description="A diagnostic trend will appear here once a supporting driver is connected."
              />
            )}
          </div>
        </SurfaceCard>

        <SurfaceCard className="p-5 sm:p-6">
          <SectionHeading
            overline="Conversation guide"
            title="Questions to resolve next"
            description="These prompts are intended for sales leadership, marketing, and client-facing narrative work."
          />
          <div className="mt-5 space-y-3">
            {community.keyQuestions.map((question) => (
              <div key={question} className="rounded-[20px] border border-neutral-200 bg-neutral-50 p-4">
                <p className="text-sm leading-relaxed text-neutral-800">{question}</p>
              </div>
            ))}
          </div>
        </SurfaceCard>
      </div>

      <SurfaceCard className="p-5 sm:p-6">
        <SectionHeading
          overline="Related drivers"
          title="Signals most relevant to this community"
          description="This connects the community diagnosis back to the division-level explanation layer."
        />
        <div className="mt-5 grid gap-4 sm:grid-cols-2 2xl:grid-cols-3">
          {relatedDrivers.map((driver) => (
            <div key={driver.id} className="rounded-[20px] border border-neutral-200 bg-neutral-50 p-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="break-words text-sm font-semibold text-neutral-950">{driver.title}</p>
                <ToneBadge tone={driver.credibility}>
                  {driver.credibility === 'high' ? 'High credibility' : 'Medium credibility'}
                </ToneBadge>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-neutral-600">{driver.implication}</p>
              <p className="mt-3 text-sm font-medium text-neutral-900">{driver.actionPrompt}</p>
            </div>
          ))}
        </div>
      </SurfaceCard>

      <SurfaceCard className="p-5 sm:p-6">
        <SectionHeading
          overline="More workspaces"
          title="Keep drilling with context"
          description="The redesigned platform treats every community as a real workspace, not a dead-end route."
        />
        <div className="mt-5 flex flex-wrap gap-2">
          {decisionPlatformModel.priorities
            .filter((item) => item.communityId !== community.id)
            .map((item) => (
              <Link
                key={item.communityId}
                to={openhomesCommunityPath(item.communityId)}
                className="inline-flex rounded-full border border-neutral-200 bg-white px-4 py-2 text-sm font-semibold text-neutral-900 transition-colors hover:bg-neutral-50"
              >
                {item.communityName}
              </Link>
            ))}
        </div>
      </SurfaceCard>
    </div>
  )
}
