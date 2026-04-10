import { Link, useParams } from 'react-router-dom'
import {
  PageHeader,
  QuickAccessLinks,
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

const roleDescriptions: Record<OpenHouseRole, string> = {
  executive: 'Diagnosis, likely cause, and what leadership should press next.',
  operator: 'Bottleneck, supporting evidence, and the next execution moves.',
  analyst: 'Business-readable translation and the signals most likely shaping it.',
}

const workflowSteps: Record<OpenHouseRole, { id: string; title: string; detail: string; to?: string; cta?: string }[]> = {
  executive: [
    { id: 'exec-compare', title: 'Browse all communities', detail: '', to: OPENHOMES_COMMUNITIES, cta: 'Browse communities' },
  ],
  operator: [
    { id: 'op-compare', title: 'Browse all communities', detail: '', to: OPENHOMES_COMMUNITIES, cta: 'Browse communities' },
  ],
  analyst: [
    { id: 'an-signal', title: 'Open drivers', detail: '', to: OPENHOMES_DRIVERS, cta: 'Open drivers' },
  ],
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
          <Link to={OPENHOMES_PRIORITIES} className="inline-flex rounded-full bg-neutral-950 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-neutral-800">
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

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Navigation breadcrumbs */}
      <div className="flex flex-wrap gap-2">
        <Link to={OPENHOMES_COMMUNITIES} className="inline-flex rounded-full border border-neutral-200 bg-white px-3 py-1.5 text-xs font-semibold text-neutral-700 transition-colors hover:bg-neutral-50">
          All communities
        </Link>
        <Link to={OPENHOMES_PRIORITIES} className="inline-flex rounded-full border border-neutral-200 bg-white px-3 py-1.5 text-xs font-semibold text-neutral-700 transition-colors hover:bg-neutral-50">
          Focus queue
        </Link>
      </div>

      <PageHeader
        title={community.name}
        description={roleDescriptions[role]}
      />

      <QuickAccessLinks steps={workflowSteps[role]} />

      {/* Diagnosis + Action Brief */}
      <SurfaceCard className="overflow-hidden">
        <div className="grid gap-0 xl:grid-cols-[1.25fr_0.75fr]">
          <div className="border-b border-neutral-200 p-5 sm:p-6 xl:border-b-0 xl:border-r">
            <div className="flex flex-wrap items-center gap-2">
              <ToneBadge tone={community.priorityTone}>
                {community.priorityTone === 'critical' ? 'Critical' : community.priorityTone}
              </ToneBadge>
              <ToneBadge tone={community.outlook}>
                {community.outlook === 'off-track' ? 'Off track' : community.outlook === 'at-risk' ? 'At risk' : community.outlook === 'on-track' ? 'On track' : 'Strong'}
              </ToneBadge>
            </div>

            <h2 className="mt-3 max-w-3xl text-xl font-semibold tracking-tight text-neutral-950 sm:text-2xl">
              {community.primaryDiagnosis}
            </h2>
            <p className="mt-3 max-w-3xl text-sm leading-relaxed text-neutral-600">
              {community.narrative}
            </p>

            <div className="mt-5 grid gap-3 sm:grid-cols-3">
              <div className="rounded-[14px] border border-neutral-200 bg-[#eef0f6] p-3">
                <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-neutral-500">Actual</p>
                <p className="mt-1 text-xl font-semibold tracking-tight text-neutral-950">{community.actualSales}</p>
              </div>
              <div className="rounded-[14px] border border-neutral-200 bg-[#eef0f6] p-3">
                <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-neutral-500">Target</p>
                <p className="mt-1 text-xl font-semibold tracking-tight text-neutral-950">{community.targetSales}</p>
              </div>
              <div className="rounded-[14px] border border-neutral-200 bg-[#eef0f6] p-3">
                <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-neutral-500">Gap</p>
                <p className={cn('mt-1 text-xl font-semibold tracking-tight', community.salesGap < 0 ? 'text-red-700' : 'text-emerald-700')}>
                  {community.salesGap.toFixed(1)}
                </p>
              </div>
            </div>
          </div>

          <div className="p-5 sm:p-6">
            <h3 className="text-lg font-semibold tracking-tight text-neutral-950">Action brief</h3>
            <p className="mt-3 text-sm font-semibold text-neutral-950">{community.nextAction}</p>
            <p className="mt-2 text-sm leading-relaxed text-neutral-600">{community.likelyCause}</p>
            <div className="mt-4 space-y-2.5">
              {community.actions.map((action) => (
                <div key={action.id} className="rounded-[14px] border border-neutral-200 bg-[#eef0f6] p-3">
                  <p className="text-sm font-semibold text-neutral-950">{action.title}</p>
                  <p className="mt-1 text-sm leading-relaxed text-neutral-600">{action.detail}</p>
                  <div className="mt-1.5 flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-neutral-500">
                    <span>{action.owner}</span>
                    <span className="text-neutral-300">&middot;</span>
                    <span>{action.timeframe}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </SurfaceCard>

      {/* Funnel Stage Diagnostics */}
      <SurfaceCard className="p-5 sm:p-6">
        <h3 className="text-lg font-semibold tracking-tight text-neutral-950">Funnel diagnostics</h3>
        <div className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {community.stageDiagnostics.map((stage) => (
            <div key={stage.id} className="rounded-[14px] border border-neutral-200 bg-[#eef0f6] p-3">
              <div className="flex items-center justify-between gap-2">
                <p className="text-sm font-semibold text-neutral-950">{stage.label}</p>
                <ToneBadge tone={stage.tone}>
                  {stage.tone === 'weak' ? 'Weak' : stage.tone === 'watch' ? 'Watch' : 'Strong'}
                </ToneBadge>
              </div>
              <p className="mt-2 text-sm font-medium text-neutral-900">{stage.signal}</p>
              <p className="mt-1 text-sm leading-relaxed text-neutral-600">{stage.interpretation}</p>
            </div>
          ))}
        </div>
      </SurfaceCard>

      {/* Trend + Questions (merged into one row) */}
      <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <SurfaceCard className="p-5 sm:p-6">
          <h3 className="text-lg font-semibold tracking-tight text-neutral-950">Trend</h3>
          <div className="mt-4">
            {trendDriver ? (
              <ForecastDriverTrendChart chartId={`community-${community.id}`} metricLabel={trendDriver.title} points={trendDriver.trend} />
            ) : (
              <StatePanel title="Trend unavailable" description="A diagnostic trend will appear here once a supporting driver is connected." />
            )}
          </div>
        </SurfaceCard>

        <SurfaceCard className="p-5 sm:p-6">
          <h3 className="text-lg font-semibold tracking-tight text-neutral-950">Key questions</h3>
          <ul className="mt-4 space-y-2">
            {community.keyQuestions.map((question) => (
              <li key={question} className="rounded-[14px] border border-neutral-200 bg-[#eef0f6] p-3 text-sm leading-relaxed text-neutral-800">
                {question}
              </li>
            ))}
          </ul>
        </SurfaceCard>
      </div>

      {/* Related Drivers + Other Communities (combined) */}
      <SurfaceCard className="p-5 sm:p-6">
        <h3 className="text-lg font-semibold tracking-tight text-neutral-950">Related drivers</h3>
        <div className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {relatedDrivers.map((driver) => (
            <div key={driver.id} className="rounded-[14px] border border-neutral-200 bg-[#eef0f6] p-3">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="text-sm font-semibold text-neutral-950">{driver.title}</p>
                <ToneBadge tone={driver.credibility}>
                  {driver.credibility === 'high' ? 'High' : 'Medium'}
                </ToneBadge>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-neutral-600">{driver.implication}</p>
            </div>
          ))}
        </div>

        <div className="mt-5 border-t border-neutral-100 pt-4">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-neutral-400">Other communities</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {decisionPlatformModel.priorities
              .filter((item) => item.communityId !== community.id)
              .map((item) => (
                <Link
                  key={item.communityId}
                  to={openhomesCommunityPath(item.communityId)}
                  className="inline-flex rounded-full border border-neutral-200 bg-white px-3 py-1.5 text-xs font-semibold text-neutral-700 transition-colors hover:bg-neutral-50"
                >
                  {item.communityName}
                </Link>
              ))}
          </div>
        </div>
      </SurfaceCard>
    </div>
  )
}
