import { Link } from 'react-router-dom'
import {
  PageHeader,
  QuickAccessLinks,
  StatePanel,
  SurfaceCard,
  ToneBadge,
} from '@/openhouse/components/OpenHousePrimitives'
import { decisionPlatformModel, getDriverById } from '@/openhouse/data/decisionEngine'
import { useOpenHouseRole } from '@/openhouse/context/OpenHouseRoleContext'
import { OPENHOMES_DRIVERS, openhomesCommunityPath } from '@/pulse/constants/routes'
import type { OpenHouseRole } from '@/openhouse/types'

const descriptions: Record<OpenHouseRole, string> = {
  executive: 'Decide where leadership time and follow-up pressure should go first.',
  operator: 'Each item pairs the problem with the next action, expected lift, and community workspace.',
  analyst: 'Ranked communities with causes and action implications to bridge model signals and operating conversations.',
}

const workflowSteps: Record<OpenHouseRole, { id: string; title: string; detail: string; to?: string; cta?: string }[]> = {
  executive: [
    { id: 'exec-drill', title: 'Open top workspace', detail: '', to: openhomesCommunityPath(decisionPlatformModel.priorities[0]?.communityId ?? 'catalina-foothills'), cta: 'Open top workspace' },
  ],
  operator: [
    { id: 'op-open', title: 'Open top workspace', detail: '', to: openhomesCommunityPath(decisionPlatformModel.priorities[0]?.communityId ?? 'catalina-foothills'), cta: 'Open top workspace' },
    { id: 'op-verify', title: 'Review drivers', detail: '', to: OPENHOMES_DRIVERS, cta: 'Review drivers' },
  ],
  analyst: [
    { id: 'an-validate', title: 'Open drivers', detail: '', to: OPENHOMES_DRIVERS, cta: 'Open drivers' },
    { id: 'an-translate', title: 'Open top workspace', detail: '', to: openhomesCommunityPath(decisionPlatformModel.priorities[0]?.communityId ?? 'catalina-foothills'), cta: 'Open top workspace' },
  ],
}

export function PriorityQueuePage() {
  const { role } = useOpenHouseRole()
  const priorities = decisionPlatformModel.priorities

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

      <QuickAccessLinks steps={workflowSteps[role]} />

      {/* Summary Counts */}
      <div className="grid gap-4 md:grid-cols-3">
        <SurfaceCard className="p-5">
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-neutral-500">Critical</p>
          <p className="mt-2 text-3xl font-semibold tracking-tight text-red-700">{counts.critical}</p>
        </SurfaceCard>
        <SurfaceCard className="p-5">
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-neutral-500">Watch</p>
          <p className="mt-2 text-3xl font-semibold tracking-tight text-amber-800">{counts.watch}</p>
        </SurfaceCard>
        <SurfaceCard className="p-5">
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-neutral-500">Opportunity</p>
          <p className="mt-2 text-3xl font-semibold tracking-tight text-emerald-700">{counts.opportunity}</p>
        </SurfaceCard>
      </div>

      {/* Priority List */}
      <div className="space-y-4">
        {priorities.map((priority) => {
          const firstDriver = getDriverById(priority.linkedDriverIds[0] ?? '')

          return (
            <SurfaceCard key={priority.id} className="p-5 sm:p-6">
              {/* Header row */}
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="rounded-full bg-neutral-950 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-white">
                      #{priority.rank}
                    </span>
                    <ToneBadge tone={priority.priorityTone}>
                      {priority.priorityTone === 'critical' ? 'Critical' : priority.priorityTone}
                    </ToneBadge>
                    <ToneBadge tone={priority.outlook}>
                      {priority.outlook === 'off-track' ? 'Off track' : priority.outlook === 'at-risk' ? 'At risk' : priority.outlook === 'on-track' ? 'On track' : 'Strong'}
                    </ToneBadge>
                  </div>
                  <h2 className="mt-2 text-xl font-semibold tracking-tight text-neutral-950">
                    {priority.communityName}
                  </h2>
                </div>
                <Link
                  to={openhomesCommunityPath(priority.communityId)}
                  className="inline-flex shrink-0 rounded-full bg-neutral-950 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-neutral-800"
                >
                  Open workspace
                </Link>
              </div>

              {/* Key metrics row */}
              <div className="mt-4 grid gap-3 sm:grid-cols-3">
                <div className="rounded-[14px] border border-neutral-200 bg-[#eef0f6] px-3 py-2.5">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-neutral-500">Sales</p>
                  <p className="mt-1 text-base font-semibold text-neutral-950">{priority.actualSales} / {priority.targetSales}</p>
                  <p className="text-xs text-neutral-600">{priority.salesGapLabel}</p>
                </div>
                <div className="rounded-[14px] border border-neutral-200 bg-[#eef0f6] px-3 py-2.5">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-neutral-500">Bottleneck</p>
                  <p className="mt-1 text-sm font-semibold text-neutral-950">{priority.primaryDiagnosis}</p>
                </div>
                <div className="rounded-[14px] border border-neutral-200 bg-[#eef0f6] px-3 py-2.5">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-neutral-500">Expected lift</p>
                  <p className="mt-1 text-base font-semibold text-neutral-950">{priority.expectedImpact}</p>
                </div>
              </div>

              {/* Why + Action (flat, no nested cards) */}
              <div className="mt-4 border-t border-neutral-100 pt-4">
                <p className="text-sm leading-relaxed text-neutral-600">{priority.likelyCause}</p>
                <p className="mt-3 text-sm font-semibold text-neutral-950">Next: {priority.recommendedAction}</p>
                <p className="mt-1 text-xs text-neutral-500">Owner: {priority.actionOwner}</p>
              </div>

              {/* Supporting driver (flat) */}
              {firstDriver && (
                <div className="mt-3 border-t border-neutral-100 pt-3">
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-neutral-400">Key driver</p>
                  <p className="mt-1 text-sm font-medium text-neutral-900">{firstDriver.title}</p>
                </div>
              )}
            </SurfaceCard>
          )
        })}
      </div>
    </div>
  )
}
