import { Link } from 'react-router-dom'
import {
  PageHeader,
  QuickAccessLinks,
  SectionHeading,
  StatePanel,
  SurfaceCard,
  ToneBadge,
} from '@/openhouse/components/OpenHousePrimitives'
import { decisionPlatformModel } from '@/openhouse/data/decisionEngine'
import { useOpenHouseRole } from '@/openhouse/context/OpenHouseRoleContext'
import { OPENHOMES_PRIORITIES, openhomesCommunityPath } from '@/pulse/constants/routes'
import { ForecastDriverTrendChart } from '@/pulse/components/forecast-drivers/ForecastDriverTrendChart'
import type { OpenHouseRole } from '@/openhouse/types'

const descriptions = {
  executive:
    'Read the forecast explanation in business terms, then move directly into the communities most affected by each signal.',
  operator:
    'Use the drivers to understand which stage failures are likely real, versus which changes are just noisy activity.',
  analyst:
    'This is the explanation layer for translating model behavior into a credible business story without manual deck assembly.',
}

const workflowContent: Record<
  OpenHouseRole,
  {
    title: string
    description: string
    steps: { id: string; title: string; detail: string; to?: string; cta?: string }[]
  }
> = {
  executive: {
    title: 'Executive workflow in drivers',
    description: 'Use this page to understand which signals are leadership-relevant and where to drill next, not to inspect every metric for its own sake.',
    steps: [
      {
        id: 'exec-signal',
        title: 'Identify the few signals that change the story',
        detail: 'Focus on implication and credibility, not the full list of detailed evidence.',
      },
      {
        id: 'exec-community',
        title: 'Open the affected community only when needed',
        detail: 'Use the community links to validate where a signal is materially showing up.',
        to: openhomesCommunityPath(decisionPlatformModel.drivers[0]?.affectedCommunityIds[0] ?? 'catalina-foothills'),
        cta: 'Open an affected community',
      },
      {
        id: 'exec-brief',
        title: 'Carry the message into leadership review',
        detail: 'Treat this page as explanation support for the briefing, not a separate destination.',
      },
    ],
  },
  operator: {
    title: 'Operator workflow in drivers',
    description: 'Use this page when you need to verify whether a bottleneck is real signal or just noise in the funnel.',
    steps: [
      {
        id: 'op-verify',
        title: 'Verify the signal behind an operating issue',
        detail: 'Use the business implication and trend to test whether the problem is worth acting on.',
      },
      {
        id: 'op-community',
        title: 'Jump to the affected communities',
        detail: 'Use the links to move straight into community-level execution after confirming the signal.',
        to: openhomesCommunityPath(decisionPlatformModel.drivers[0]?.affectedCommunityIds[0] ?? 'catalina-foothills'),
        cta: 'Open an affected community',
      },
      {
        id: 'op-focus',
        title: 'Return to the queue when priorities need to be reset',
        detail: 'If the evidence changes your view, go back to the focus queue and re-rank your next move.',
        to: OPENHOMES_PRIORITIES,
        cta: 'Open focus queue',
      },
    ],
  },
  analyst: {
    title: 'Analyst workflow in drivers',
    description: 'This is the main explanation workspace for analysts. Use it to validate the model story and translate it into business language.',
    steps: [
      {
        id: 'an-translate',
        title: 'Translate the signal into plain-language business meaning',
        detail: 'Start with the implication and narrative fields rather than the raw trend alone.',
      },
      {
        id: 'an-ground',
        title: 'Ground the explanation in affected communities',
        detail: 'Move into a community workspace to make sure the driver story matches real operating behavior.',
        to: openhomesCommunityPath(decisionPlatformModel.drivers[0]?.affectedCommunityIds[0] ?? 'catalina-foothills'),
        cta: 'Open an affected community',
      },
      {
        id: 'an-share',
        title: 'Carry the narrative into downstream communication',
        detail: 'Use the resulting language to support briefings, client conversations, and internal interpretation.',
      },
    ],
  },
}

export function DriverIntelligencePage() {
  const { role } = useOpenHouseRole()
  const drivers = decisionPlatformModel.drivers
  const roleContent = workflowContent[role]

  if (drivers.length === 0) {
    return (
      <StatePanel
        title="Driver intelligence unavailable"
        description="Once leading-indicator data is connected, this view will explain what is truly shaping the forecast."
        tone="loading"
      />
    )
  }

  return (
    <div className="space-y-6 sm:space-y-8">
      <PageHeader
        eyebrow="Explanation layer"
        title="Drivers"
        description={descriptions[role]}
        actions={
          <Link
            to={OPENHOMES_PRIORITIES}
            className="inline-flex rounded-full border border-neutral-200 bg-white px-4 py-2 text-sm font-semibold text-neutral-900 shadow-sm transition-colors hover:bg-neutral-50"
          >
            Open focus queue
          </Link>
        }
      />

      <QuickAccessLinks steps={roleContent.steps} />

      <SurfaceCard className="p-5 sm:p-6">
        <SectionHeading
          overline="Executive translation"
          title="What the forecast model is really saying"
          description="The product now emphasizes implication, credibility, and action instead of leaving users to interpret ranked metrics on their own."
        />
        <p className="mt-5 max-w-4xl text-base leading-relaxed text-neutral-700">
          {decisionPlatformModel.overview.narrative}
        </p>
      </SurfaceCard>

      <div className="space-y-5">
        {drivers.map((driver) => (
          <SurfaceCard key={driver.id} className="overflow-hidden">
            <div className="grid gap-0 2xl:grid-cols-[0.95fr_1.05fr]">
              <div className="border-b border-neutral-200/80 p-5 sm:p-6 2xl:border-b-0 2xl:border-r">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-full bg-neutral-950 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-white">
                    Driver {driver.rank}
                  </span>
                  <ToneBadge tone={driver.credibility}>
                    {driver.credibility === 'high' ? 'High credibility' : 'Medium credibility'}
                  </ToneBadge>
                </div>
                <h2 className="mt-4 break-words text-2xl font-semibold tracking-tight text-neutral-950">
                  {driver.title}
                </h2>
                <p className="mt-4 text-sm leading-relaxed text-neutral-600">{driver.summary}</p>

                <div className="mt-5 grid gap-3 xl:grid-cols-2 2xl:grid-cols-1">
                  <div className="rounded-[20px] border border-neutral-200 bg-neutral-50 p-4">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-neutral-500">
                      Business implication
                    </p>
                    <p className="mt-2 text-sm leading-relaxed text-neutral-700">{driver.implication}</p>
                  </div>
                  <div className="rounded-[20px] border border-neutral-200 bg-neutral-50 p-4">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-neutral-500">
                      Why it matters
                    </p>
                    <p className="mt-2 text-sm leading-relaxed text-neutral-700">{driver.businessNarrative}</p>
                  </div>
                </div>

                <div className="mt-5 rounded-[20px] border border-neutral-200 bg-neutral-50 p-4">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-neutral-500">
                    Recommended response
                  </p>
                  <p className="mt-2 text-sm font-semibold text-neutral-950">{driver.actionPrompt}</p>
                </div>
              </div>

              <div className="p-5 sm:p-6">
                <SectionHeading
                  overline="Evidence and affected communities"
                  title="Where this signal should change the conversation"
                />
                <div className="mt-5">
                  <ForecastDriverTrendChart
                    chartId={driver.id}
                    metricLabel={driver.title}
                    points={driver.trend}
                  />
                </div>

                <div className="mt-5 flex flex-wrap gap-2">
                  {driver.affectedCommunityIds.map((communityId) => {
                    const community = decisionPlatformModel.communities[communityId]
                    return (
                      <Link
                        key={communityId}
                        to={openhomesCommunityPath(communityId)}
                        className="inline-flex rounded-full border border-neutral-200 bg-white px-4 py-2 text-sm font-semibold text-neutral-900 transition-colors hover:bg-neutral-50"
                      >
                        {community?.name ?? communityId}
                      </Link>
                    )
                  })}
                </div>
              </div>
            </div>
          </SurfaceCard>
        ))}
      </div>
    </div>
  )
}
