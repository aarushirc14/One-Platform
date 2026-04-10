import { Link } from 'react-router-dom'
import {
  PageHeader,
  QuickAccessLinks,
  SurfaceCard,
  ToneBadge,
} from '@/openhouse/components/OpenHousePrimitives'
import { decisionPlatformModel, getDriverById } from '@/openhouse/data/decisionEngine'
import { useOpenHouseRole } from '@/openhouse/context/OpenHouseRoleContext'
import { OPENHOMES_PRIORITIES, openhomesCommunityPath } from '@/pulse/constants/routes'
import type { OpenHouseRole } from '@/openhouse/types'

const descriptions: Record<OpenHouseRole, string> = {
  executive: 'Browse every community, understand which ones matter most, and open the right workspace.',
  operator: 'Choose a community to work on, then jump into its diagnosis and action plan.',
  analyst: 'Each community links to its current narrative, likely cause, and supporting drivers.',
}

const workflowSteps: Record<OpenHouseRole, { id: string; title: string; detail: string; to?: string; cta?: string }[]> = {
  executive: [
    { id: 'exec-open', title: 'Open top workspace', detail: '', to: openhomesCommunityPath(decisionPlatformModel.priorities[0]?.communityId ?? 'catalina-foothills'), cta: 'Open top workspace' },
    { id: 'exec-queue', title: 'Open focus queue', detail: '', to: OPENHOMES_PRIORITIES, cta: 'Open focus queue' },
  ],
  operator: [
    { id: 'op-open', title: 'Open top workspace', detail: '', to: openhomesCommunityPath(decisionPlatformModel.priorities[0]?.communityId ?? 'catalina-foothills'), cta: 'Open top workspace' },
    { id: 'op-reprioritize', title: 'Open focus queue', detail: '', to: OPENHOMES_PRIORITIES, cta: 'Open focus queue' },
  ],
  analyst: [
    { id: 'an-ground', title: 'Open top workspace', detail: '', to: openhomesCommunityPath(decisionPlatformModel.priorities[0]?.communityId ?? 'catalina-foothills'), cta: 'Open top workspace' },
    { id: 'an-queue', title: 'Open focus queue', detail: '', to: OPENHOMES_PRIORITIES, cta: 'Open focus queue' },
  ],
}

export function CommunitiesPage() {
  const { role } = useOpenHouseRole()
  const communities = decisionPlatformModel.priorities

  return (
    <div className="space-y-6 sm:space-y-8">
      <PageHeader
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

      <QuickAccessLinks steps={workflowSteps[role]} />

      {/* Community Listing */}
      <div className="space-y-4">
        {communities.map((community) => {
          const driver = getDriverById(community.linkedDriverIds[0] ?? '')
          return (
            <SurfaceCard key={community.communityId} className="p-5 sm:p-6">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-xs font-semibold uppercase tracking-[0.14em] text-neutral-400">
                      #{community.rank}
                    </span>
                    <ToneBadge tone={community.priorityTone}>
                      {community.priorityTone === 'critical' ? 'Critical' : community.priorityTone}
                    </ToneBadge>
                    <ToneBadge tone={community.outlook}>
                      {community.outlook === 'off-track' ? 'Off track' : community.outlook === 'at-risk' ? 'At risk' : community.outlook === 'on-track' ? 'On track' : 'Strong'}
                    </ToneBadge>
                  </div>
                  <h2 className="mt-2 text-xl font-semibold tracking-tight text-neutral-950">{community.communityName}</h2>
                </div>
                <Link
                  to={openhomesCommunityPath(community.communityId)}
                  className="inline-flex shrink-0 rounded-full bg-neutral-950 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-neutral-800"
                >
                  Open workspace
                </Link>
              </div>

              <div className="mt-4 grid gap-3 sm:grid-cols-3">
                <div className="rounded-[14px] border border-neutral-200 bg-[#eef0f6] px-3 py-2.5">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-neutral-500">Sales</p>
                  <p className="mt-1 text-sm font-semibold text-neutral-950">{community.actualSales} / {community.targetSales}</p>
                  <p className="text-xs text-neutral-600">{community.salesGapLabel}</p>
                </div>
                <div className="rounded-[14px] border border-neutral-200 bg-[#eef0f6] px-3 py-2.5">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-neutral-500">Bottleneck</p>
                  <p className="mt-1 text-sm font-semibold text-neutral-950">{community.primaryDiagnosis}</p>
                </div>
                <div className="rounded-[14px] border border-neutral-200 bg-[#eef0f6] px-3 py-2.5">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-neutral-500">Next move</p>
                  <p className="mt-1 text-sm font-semibold text-neutral-950">{community.recommendedAction}</p>
                </div>
              </div>

              {driver && (
                <p className="mt-3 text-sm text-neutral-600">
                  <span className="font-semibold text-neutral-900">Key driver:</span> {driver.title}
                </p>
              )}
            </SurfaceCard>
          )
        })}
      </div>
    </div>
  )
}
