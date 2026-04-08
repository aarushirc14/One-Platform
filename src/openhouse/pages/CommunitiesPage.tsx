import { Link } from 'react-router-dom'
import {
  PageHeader,
  QuickAccessLinks,
  SectionHeading,
  SurfaceCard,
  ToneBadge,
} from '@/openhouse/components/OpenHousePrimitives'
import { decisionPlatformModel, getDriverById } from '@/openhouse/data/decisionEngine'
import { useOpenHouseRole } from '@/openhouse/context/OpenHouseRoleContext'
import { OPENHOMES_PRIORITIES, openhomesCommunityPath } from '@/pulse/constants/routes'
import type { OpenHouseRole } from '@/openhouse/types'

const descriptions = {
  executive:
    'Browse every community in one place, understand which ones matter most, and open the right workspace without guessing where to start.',
  operator:
    'Use this directory to choose the community you want to work on, then jump into its diagnosis and action plan.',
  analyst:
    'This hub connects each community to its current narrative, likely cause, and supporting drivers.',
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
    title: 'Executive workflow in communities',
    description: 'Use this directory when you already know you want to compare communities, not when you want the system to rank what matters first.',
    steps: [
      {
        id: 'exec-browse',
        title: 'Scan communities by urgency',
        detail: 'Use the badges and summaries to see which communities deserve a closer look.',
      },
      {
        id: 'exec-open',
        title: 'Open one workspace for confirmation',
        detail: 'Use a workspace when you need to validate the recommendation before making a call.',
        to: openhomesCommunityPath(decisionPlatformModel.priorities[0]?.communityId ?? 'catalina-foothills'),
        cta: 'Open top workspace',
      },
      {
        id: 'exec-queue',
        title: 'Return to focus when prioritization matters',
        detail: 'The focus queue remains the best place to decide where leadership attention should go next.',
        to: OPENHOMES_PRIORITIES,
        cta: 'Open focus queue',
      },
    ],
  },
  operator: {
    title: 'Operator workflow in communities',
    description: 'This is the directory operators use to choose the community they want to work on and move directly into its action plan.',
    steps: [
      {
        id: 'op-select',
        title: 'Select the community to work',
        detail: 'Use the status, bottleneck, and next move summary to pick the right workspace.',
      },
      {
        id: 'op-open',
        title: 'Open the community workspace',
        detail: 'Each workspace gives you the diagnosis, next action, and questions to resolve.',
        to: openhomesCommunityPath(decisionPlatformModel.priorities[0]?.communityId ?? 'catalina-foothills'),
        cta: 'Open top workspace',
      },
      {
        id: 'op-reprioritize',
        title: 'Go back to focus when priorities shift',
        detail: 'If new information changes the order of work, return to the focus queue.',
        to: OPENHOMES_PRIORITIES,
        cta: 'Open focus queue',
      },
    ],
  },
  analyst: {
    title: 'Analyst workflow in communities',
    description: 'Use this directory to pick the community that best grounds the narrative you are building from the model and driver layer.',
    steps: [
      {
        id: 'an-pick',
        title: 'Choose the community that best represents the story',
        detail: 'Pick the community whose bottleneck and summary best match the signal you are trying to explain.',
      },
      {
        id: 'an-ground',
        title: 'Open the workspace to ground the narrative',
        detail: 'Use the detailed diagnosis and questions to connect the story to business language.',
        to: openhomesCommunityPath(decisionPlatformModel.priorities[0]?.communityId ?? 'catalina-foothills'),
        cta: 'Open top workspace',
      },
      {
        id: 'an-queue',
        title: 'Cross-check with the focus queue',
        detail: 'Return to focus when you need to confirm that the story matches the platform’s ranking of importance.',
        to: OPENHOMES_PRIORITIES,
        cta: 'Open focus queue',
      },
    ],
  },
}

export function CommunitiesPage() {
  const { role } = useOpenHouseRole()
  const communities = decisionPlatformModel.priorities
  const roleContent = workflowContent[role]

  return (
    <div className="space-y-6 sm:space-y-8">
      <PageHeader
        eyebrow="Community directory"
        title="Communities"
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
          overline="How to use this"
          title="A clearer path into drilldown"
          description="Start with the focus queue when you want the platform to tell you where to go next. Start here when you already know which community you need to review."
        />
        <div className="mt-5 grid gap-4 lg:grid-cols-3">
          <div className="rounded-[20px] border border-neutral-200 bg-neutral-50 p-4">
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-neutral-500">Step 1</p>
            <p className="mt-2 text-sm font-semibold text-neutral-950">Choose a community</p>
            <p className="mt-2 text-sm leading-relaxed text-neutral-600">
              Browse all active communities below, sorted by urgency and current outlook.
            </p>
          </div>
          <div className="rounded-[20px] border border-neutral-200 bg-neutral-50 p-4">
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-neutral-500">Step 2</p>
            <p className="mt-2 text-sm font-semibold text-neutral-950">Open the workspace</p>
            <p className="mt-2 text-sm leading-relaxed text-neutral-600">
              Each workspace shows diagnosis, likely cause, supporting drivers, and next actions.
            </p>
          </div>
          <div className="rounded-[20px] border border-neutral-200 bg-neutral-50 p-4">
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-neutral-500">Step 3</p>
            <p className="mt-2 text-sm font-semibold text-neutral-950">Carry the story forward</p>
            <p className="mt-2 text-sm leading-relaxed text-neutral-600">
              Move from community diagnosis to driver explanation or executive briefing without losing context.
            </p>
          </div>
        </div>
      </SurfaceCard>

      <SurfaceCard className="p-5 sm:p-6">
        <SectionHeading
          overline="All active communities"
          title="Browse by urgency"
          description="This gives the product a stable home for community drilldown instead of hiding it behind a single top-priority shortcut."
        />

        <div className="mt-5 grid gap-4 2xl:grid-cols-2">
          {communities.map((community) => {
            const driver = getDriverById(community.linkedDriverIds[0] ?? '')
            return (
              <article
                key={community.communityId}
                className="min-w-0 rounded-[24px] border border-neutral-200 bg-neutral-50/90 p-4 sm:p-5"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-neutral-500">
                      Priority {community.rank}
                    </p>
                    <h2 className="mt-1 break-words text-2xl font-semibold tracking-tight text-neutral-950">
                      {community.communityName}
                    </h2>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <ToneBadge tone={community.priorityTone}>
                      {community.priorityTone === 'critical' ? 'Critical' : community.priorityTone}
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
                </div>

                <div className="mt-4 grid gap-3 lg:grid-cols-3">
                  <div className="rounded-[18px] border border-neutral-200 bg-white p-3">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-neutral-500">Status</p>
                    <p className="mt-2 text-sm font-semibold text-neutral-950">
                      {community.actualSales} / {community.targetSales}
                    </p>
                    <p className="mt-1 text-sm text-neutral-600">{community.salesGapLabel}</p>
                  </div>
                  <div className="rounded-[18px] border border-neutral-200 bg-white p-3">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-neutral-500">
                      Bottleneck
                    </p>
                    <p className="mt-2 text-sm font-semibold text-neutral-950">{community.primaryDiagnosis}</p>
                  </div>
                  <div className="rounded-[18px] border border-neutral-200 bg-white p-3">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-neutral-500">
                      Next move
                    </p>
                    <p className="mt-2 text-sm font-semibold text-neutral-950">{community.recommendedAction}</p>
                  </div>
                </div>

                <p className="mt-4 text-sm leading-relaxed text-neutral-600">{community.summary}</p>
                {driver ? (
                  <p className="mt-3 text-sm text-neutral-700">
                    <span className="font-semibold text-neutral-950">Key driver:</span> {driver.title}
                  </p>
                ) : null}

                <div className="mt-5 flex flex-wrap gap-2">
                  <Link
                    to={openhomesCommunityPath(community.communityId)}
                    className="inline-flex rounded-full bg-neutral-950 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-neutral-800"
                  >
                    Open workspace
                  </Link>
                </div>
              </article>
            )
          })}
        </div>
      </SurfaceCard>
    </div>
  )
}
