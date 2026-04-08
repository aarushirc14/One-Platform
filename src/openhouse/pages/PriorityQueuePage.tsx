import { Link } from 'react-router-dom'
import {
  PageHeader,
  QuickAccessLinks,
  SectionHeading,
  StatePanel,
  SurfaceCard,
  ToneBadge,
} from '@/openhouse/components/OpenHousePrimitives'
import { decisionPlatformModel, getDriverById } from '@/openhouse/data/decisionEngine'
import { useOpenHouseRole } from '@/openhouse/context/OpenHouseRoleContext'
import { OPENHOMES_DRIVERS, openhomesCommunityPath } from '@/pulse/constants/routes'
import type { OpenHouseRole } from '@/openhouse/types'

const descriptions = {
  executive:
    'Use this queue to decide where leadership time, budget attention, and follow-up pressure should go first.',
  operator:
    'Each item pairs the business problem with the next action, the expected lift, and the community workspace link.',
  analyst:
    'This is the bridge between model signals and operating conversations: ranked communities, causes, and action implications.',
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
    title: 'How executives use the focus queue',
    description: 'Use this page to decide where leadership attention should go first, not to inspect every detail yourself.',
    steps: [
      {
        id: 'exec-rank',
        title: 'Start with the top two priorities',
        detail: 'Use the ranking, gap, and expected lift to decide where intervention matters most.',
      },
      {
        id: 'exec-drill',
        title: 'Open one workspace when the ranking needs context',
        detail: 'Use community workspaces selectively when you need to validate the recommendation.',
        to: openhomesCommunityPath(decisionPlatformModel.priorities[0]?.communityId ?? 'catalina-foothills'),
        cta: 'Open top workspace',
      },
      {
        id: 'exec-brief',
        title: 'Carry the shortlist into leadership briefing',
        detail: 'Treat this queue as the source for what enters the review deck or print packet.',
      },
    ],
  },
  operator: {
    title: 'How operators use the focus queue',
    description: 'This is the working queue for execution. The goal is to pick the next community, assign the move, and work the action plan.',
    steps: [
      {
        id: 'op-pick',
        title: 'Pick the next community to work',
        detail: 'Use the rank, bottleneck, and owner fields to decide what should move next.',
      },
      {
        id: 'op-open',
        title: 'Open the community workspace',
        detail: 'Move directly from the queue into diagnosis, stage evidence, and the operating action brief.',
        to: openhomesCommunityPath(decisionPlatformModel.priorities[0]?.communityId ?? 'catalina-foothills'),
        cta: 'Open top workspace',
      },
      {
        id: 'op-verify',
        title: 'Check the supporting driver if something feels noisy',
        detail: 'Use the driver page when you need to understand whether the bottleneck is truly signal-backed.',
        to: OPENHOMES_DRIVERS,
        cta: 'Review drivers',
      },
    ],
  },
  analyst: {
    title: 'How analysts use the focus queue',
    description: 'Use the queue as the bridge between ranked model-informed priorities and the story you need to tell the business.',
    steps: [
      {
        id: 'an-connect',
        title: 'Connect priority to explanation',
        detail: 'Use each card to tie the operating problem to the signal most likely shaping it.',
      },
      {
        id: 'an-validate',
        title: 'Review the supporting driver',
        detail: 'Jump to the driver layer when you need to pressure-test whether the explanation is credible.',
        to: OPENHOMES_DRIVERS,
        cta: 'Open drivers',
      },
      {
        id: 'an-translate',
        title: 'Open a workspace to ground the narrative',
        detail: 'The community page turns abstract movement into a business-readable story and next questions.',
        to: openhomesCommunityPath(decisionPlatformModel.priorities[0]?.communityId ?? 'catalina-foothills'),
        cta: 'Open top workspace',
      },
    ],
  },
}

export function PriorityQueuePage() {
  const { role } = useOpenHouseRole()
  const priorities = decisionPlatformModel.priorities
  const roleContent = workflowContent[role]

  if (priorities.length === 0) {
    return (
      <StatePanel
        title="No priorities available"
        description="Once community-level performance data is connected, this queue will rank where attention should go first."
        tone="loading"
      />
    )
  }

  const counts = {
    critical: priorities.filter((item) => item.priorityTone === 'critical').length,
    watch: priorities.filter((item) => item.priorityTone === 'watch').length,
    opportunity: priorities.filter((item) => item.priorityTone === 'opportunity').length,
  }

  return (
    <div className="space-y-6 sm:space-y-8">
      <PageHeader
        eyebrow="Action layer"
        title="Focus Queue"
        description={descriptions[role]}
        actions={
          <Link
            to={OPENHOMES_DRIVERS}
            className="inline-flex rounded-full border border-neutral-200 bg-white px-4 py-2 text-sm font-semibold text-neutral-900 shadow-sm transition-colors hover:bg-neutral-50"
          >
            Review drivers
          </Link>
        }
      />

      <QuickAccessLinks steps={roleContent.steps} />

      <div className="grid gap-4 md:grid-cols-3">
        <SurfaceCard className="p-5">
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-neutral-500">Critical now</p>
          <p className="mt-3 text-3xl font-semibold tracking-tight text-red-700">{counts.critical}</p>
          <p className="mt-2 text-sm text-neutral-600">Communities that need direct leadership attention.</p>
        </SurfaceCard>
        <SurfaceCard className="p-5">
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-neutral-500">Watch list</p>
          <p className="mt-3 text-3xl font-semibold tracking-tight text-amber-800">{counts.watch}</p>
          <p className="mt-2 text-sm text-neutral-600">Communities that can improve with focused execution.</p>
        </SurfaceCard>
        <SurfaceCard className="p-5">
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-neutral-500">Playbook opportunities</p>
          <p className="mt-3 text-3xl font-semibold tracking-tight text-emerald-700">{counts.opportunity}</p>
          <p className="mt-2 text-sm text-neutral-600">Communities whose winning behaviors should be exported.</p>
        </SurfaceCard>
      </div>

      <SurfaceCard className="p-5 sm:p-6">
        <SectionHeading
          overline="Ranked queue"
          title="Where to focus next"
          description="Every card answers four questions: how bad is it, what stage is broken, what likely caused it, and what should happen next."
        />
        <div className="mt-5 space-y-4">
          {priorities.map((priority) => {
            const firstDriver = getDriverById(priority.linkedDriverIds[0] ?? '')

            return (
              <article
                key={priority.id}
                className="overflow-hidden rounded-[24px] border border-neutral-200 bg-neutral-50/90 p-4 sm:p-5"
              >
                <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="rounded-full bg-neutral-950 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-white">
                        Priority {priority.rank}
                      </span>
                      <ToneBadge tone={priority.priorityTone}>
                        {priority.priorityTone === 'critical' ? 'Critical' : priority.priorityTone}
                      </ToneBadge>
                      <ToneBadge tone={priority.outlook}>
                        {priority.outlook === 'off-track'
                          ? 'Off track'
                          : priority.outlook === 'at-risk'
                            ? 'At risk'
                            : priority.outlook === 'on-track'
                              ? 'On track'
                              : 'Strong'}
                      </ToneBadge>
                    </div>
                    <h2 className="mt-3 break-words text-2xl font-semibold tracking-tight text-neutral-950">
                      {priority.communityName}
                    </h2>
                    <p className="mt-2 text-sm leading-relaxed text-neutral-600">{priority.summary}</p>
                  </div>

                  <div className="grid min-w-0 gap-3 sm:grid-cols-2 xl:w-[420px] xl:grid-cols-3">
                    <div className="rounded-[20px] border border-neutral-200 bg-white p-3">
                      <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-neutral-500">Status</p>
                      <p className="mt-2 text-lg font-semibold tracking-tight text-neutral-950">
                        {priority.actualSales} / {priority.targetSales}
                      </p>
                      <p className="mt-1 text-sm text-neutral-600">{priority.salesGapLabel}</p>
                    </div>
                    <div className="rounded-[20px] border border-neutral-200 bg-white p-3">
                      <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-neutral-500">
                        Bottleneck
                      </p>
                      <p className="mt-2 text-sm font-semibold text-neutral-950">{priority.primaryDiagnosis}</p>
                    </div>
                    <div className="rounded-[20px] border border-neutral-200 bg-white p-3">
                      <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-neutral-500">
                        Expected lift
                      </p>
                      <p className="mt-2 text-lg font-semibold tracking-tight text-neutral-950">
                        {priority.expectedImpact}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-5 grid gap-4 2xl:grid-cols-[1.15fr_0.85fr]">
                  <div className="rounded-[20px] border border-neutral-200 bg-white p-4">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-neutral-500">
                      Why this item is ranked here
                    </p>
                    <p className="mt-2 text-sm leading-relaxed text-neutral-700">{priority.likelyCause}</p>
                    <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.16em] text-neutral-500">
                      Recommended next move
                    </p>
                    <p className="mt-2 text-sm font-semibold text-neutral-950">{priority.recommendedAction}</p>
                    <p className="mt-2 text-sm text-neutral-600">Owner: {priority.actionOwner}</p>
                  </div>

                  <div className="rounded-[20px] border border-neutral-200 bg-white p-4">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-neutral-500">
                      Supporting driver
                    </p>
                    {firstDriver ? (
                      <>
                        <p className="mt-2 break-words text-sm font-semibold text-neutral-950">{firstDriver.title}</p>
                        <p className="mt-2 text-sm leading-relaxed text-neutral-600">
                          {firstDriver.businessNarrative}
                        </p>
                      </>
                    ) : (
                      <p className="mt-2 text-sm text-neutral-600">Additional signal interpretation will appear here.</p>
                    )}
                  </div>
                </div>

                <div className="mt-5 flex flex-wrap gap-2">
                  <Link
                    to={openhomesCommunityPath(priority.communityId)}
                    className="inline-flex w-full justify-center rounded-full bg-neutral-950 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-neutral-800 sm:w-auto"
                  >
                    Open community workspace
                  </Link>
                  <Link
                    to={OPENHOMES_DRIVERS}
                    className="inline-flex w-full justify-center rounded-full border border-neutral-200 bg-white px-4 py-2 text-sm font-semibold text-neutral-900 transition-colors hover:bg-neutral-50 sm:w-auto"
                  >
                    Review drivers
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
