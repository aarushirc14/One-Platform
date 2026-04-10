import { Link } from 'react-router-dom'
import {
  PageHeader,
  QuickAccessLinks,
  StatePanel,
  SurfaceCard,
  ToneBadge,
} from '@/openhouse/components/OpenHousePrimitives'
import { decisionPlatformModel } from '@/openhouse/data/decisionEngine'
import { useOpenHouseRole } from '@/openhouse/context/OpenHouseRoleContext'
import { OPENHOMES_PRIORITIES, openhomesCommunityPath } from '@/pulse/constants/routes'
import { ForecastDriverTrendChart } from '@/pulse/components/forecast-drivers/ForecastDriverTrendChart'
import type { OpenHouseRole } from '@/openhouse/types'

const descriptions: Record<OpenHouseRole, string> = {
  executive: 'Forecast explanation in business terms, linked to the communities most affected by each signal.',
  operator: 'Understand which stage failures are likely real versus noisy activity.',
  analyst: 'Translate model behavior into a credible business story without manual deck assembly.',
}

const workflowSteps: Record<OpenHouseRole, { id: string; title: string; detail: string; to?: string; cta?: string }[]> = {
  executive: [
    { id: 'exec-community', title: 'Open affected community', detail: '', to: openhomesCommunityPath(decisionPlatformModel.drivers[0]?.affectedCommunityIds[0] ?? 'catalina-foothills'), cta: 'Open community' },
  ],
  operator: [
    { id: 'op-community', title: 'Open affected community', detail: '', to: openhomesCommunityPath(decisionPlatformModel.drivers[0]?.affectedCommunityIds[0] ?? 'catalina-foothills'), cta: 'Open community' },
    { id: 'op-focus', title: 'Open focus queue', detail: '', to: OPENHOMES_PRIORITIES, cta: 'Open focus queue' },
  ],
  analyst: [
    { id: 'an-ground', title: 'Open affected community', detail: '', to: openhomesCommunityPath(decisionPlatformModel.drivers[0]?.affectedCommunityIds[0] ?? 'catalina-foothills'), cta: 'Open community' },
  ],
}

export function DriverIntelligencePage() {
  const { role } = useOpenHouseRole()
  const drivers = decisionPlatformModel.drivers

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

      <QuickAccessLinks steps={workflowSteps[role]} />

      {/* Narrative Summary */}
      <SurfaceCard className="p-5 sm:p-6">
        <h3 className="text-lg font-semibold tracking-tight text-neutral-950">Executive summary</h3>
        <p className="mt-3 max-w-4xl text-sm leading-relaxed text-neutral-700 sm:text-[15px]">
          {decisionPlatformModel.overview.narrative}
        </p>
      </SurfaceCard>

      {/* Individual Driver Cards */}
      <div className="space-y-5">
        {drivers.map((driver) => (
          <SurfaceCard key={driver.id} className="overflow-hidden">
            <div className="grid gap-0 xl:grid-cols-[1fr_1fr]">
              <div className="border-b border-neutral-200 p-5 sm:p-6 xl:border-b-0 xl:border-r">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-full bg-neutral-950 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-white">
                    #{driver.rank}
                  </span>
                  <ToneBadge tone={driver.credibility}>
                    {driver.credibility === 'high' ? 'High credibility' : 'Medium'}
                  </ToneBadge>
                </div>
                <h2 className="mt-3 text-xl font-semibold tracking-tight text-neutral-950">
                  {driver.title}
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-neutral-600">{driver.summary}</p>

                <div className="mt-4 space-y-2.5">
                  <div className="rounded-[14px] border border-neutral-200 bg-[#eef0f6] p-3">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-neutral-500">Implication</p>
                    <p className="mt-1 text-sm leading-relaxed text-neutral-700">{driver.implication}</p>
                  </div>
                  <div className="rounded-[14px] border border-neutral-200 bg-[#eef0f6] p-3">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-neutral-500">Response</p>
                    <p className="mt-1 text-sm font-semibold text-neutral-950">{driver.actionPrompt}</p>
                  </div>
                </div>
              </div>

              <div className="p-5 sm:p-6">
                <h3 className="text-base font-semibold tracking-tight text-neutral-950">Trend and affected communities</h3>
                <div className="mt-4">
                  <ForecastDriverTrendChart chartId={driver.id} metricLabel={driver.title} points={driver.trend} />
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  {driver.affectedCommunityIds.map((communityId) => {
                    const community = decisionPlatformModel.communities[communityId]
                    return (
                      <Link
                        key={communityId}
                        to={openhomesCommunityPath(communityId)}
                        className="inline-flex rounded-full border border-neutral-200 bg-white px-3 py-1.5 text-xs font-semibold text-neutral-700 transition-colors hover:bg-neutral-50"
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
