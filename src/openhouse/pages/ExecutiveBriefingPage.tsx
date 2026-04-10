import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  PageHeader,
  QuickAccessLinks,
  StatePanel,
  SurfaceCard,
  ToneBadge,
} from '@/openhouse/components/OpenHousePrimitives'
import { decisionPlatformModel } from '@/openhouse/data/decisionEngine'
import { OPENHOMES_PRIORITIES, openhomesCommunityPath } from '@/pulse/constants/routes'
import { IconDownload, IconShare } from '@/pulse/components/icons'
import { useOpenHouseRole } from '@/openhouse/context/OpenHouseRoleContext'
import type { OpenHouseRole } from '@/openhouse/types'

const workflowSteps: Record<OpenHouseRole, { id: string; title: string; detail: string; to?: string; cta?: string }[]> = {
  executive: [
    { id: 'exec-followup', title: 'Open focus queue', detail: '', to: OPENHOMES_PRIORITIES, cta: 'Open focus queue' },
  ],
  operator: [
    { id: 'op-return', title: 'Open focus queue', detail: '', to: OPENHOMES_PRIORITIES, cta: 'Open focus queue' },
  ],
  analyst: [
    { id: 'an-detail', title: 'Open top workspace', detail: '', to: openhomesCommunityPath(decisionPlatformModel.briefing.topPriorities[0]?.communityId ?? 'catalina-foothills'), cta: 'Open top workspace' },
  ],
}

export function ExecutiveBriefingPage() {
  const { role } = useOpenHouseRole()
  const [shareLabel, setShareLabel] = useState('Copy link')
  const briefing = decisionPlatformModel.briefing

  if (!briefing) {
    return (
      <StatePanel title="Briefing unavailable" description="The printable briefing will appear here once summary data is available." tone="loading" />
    )
  }

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(window.location.href)
      setShareLabel('Link copied')
      window.setTimeout(() => setShareLabel('Copy link'), 1500)
    } catch {
      setShareLabel('Copy failed')
      window.setTimeout(() => setShareLabel('Copy link'), 1500)
    }
  }

  return (
    <div className="space-y-6 sm:space-y-8 print:space-y-5">
      <PageHeader
        title={briefing.title}
        description="Printable operating brief generated from live platform data."
        actions={
          <div className="flex flex-wrap gap-2 print:hidden">
            <button
              type="button"
              onClick={() => window.print()}
              className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-neutral-950 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-neutral-800 sm:w-auto"
            >
              <IconDownload className="h-4 w-4" /> Print
            </button>
            <button
              type="button"
              onClick={() => void copyLink()}
              className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-neutral-200 bg-white px-4 py-2 text-sm font-semibold text-neutral-900 transition-colors hover:bg-neutral-50 sm:w-auto"
            >
              <IconShare className="h-4 w-4" /> {shareLabel}
            </button>
          </div>
        }
      />

      <QuickAccessLinks steps={workflowSteps[role]} />

      {/* Summary + Discussion */}
      <SurfaceCard className="p-5 sm:p-6 print:border-none print:shadow-none">
        <div className="flex flex-col gap-4 border-b border-neutral-200 pb-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-xl font-semibold tracking-tight text-neutral-950">Leadership briefing</h2>
            <p className="mt-1 text-sm text-neutral-500">Data up to {briefing.snapshotLabel}</p>
          </div>
          <Link to={OPENHOMES_PRIORITIES} className="inline-flex rounded-full border border-neutral-200 bg-white px-3 py-1.5 text-xs font-semibold text-neutral-700 transition-colors hover:bg-neutral-50 print:hidden">
            Open focus queue
          </Link>
        </div>

        <div className="mt-5 grid gap-5 xl:grid-cols-[1.15fr_0.85fr]">
          <div>
            <h3 className="text-base font-semibold text-neutral-950">Executive summary</h3>
            <p className="mt-2 text-sm leading-relaxed text-neutral-600">{briefing.executiveSummary}</p>

            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              {decisionPlatformModel.overview.statusMetrics.slice(0, 3).map((metric) => (
                <div key={metric.id} className="rounded-[14px] border border-neutral-200 bg-[#eef0f6] p-3">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-neutral-500">{metric.label}</p>
                  <p className="mt-1 text-lg font-semibold tracking-tight text-neutral-950">{metric.value}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[20px] border border-neutral-200 bg-[#eef0f6] p-4">
            <h3 className="text-base font-semibold text-neutral-950">Discussion prompts</h3>
            <ul className="mt-3 space-y-2 text-sm leading-relaxed text-neutral-700">
              {briefing.discussionPrompts.map((prompt) => (
                <li key={prompt} className="rounded-[14px] border border-neutral-200 bg-white p-3">{prompt}</li>
              ))}
            </ul>
          </div>
        </div>
      </SurfaceCard>

      {/* Priorities + Drivers + Actions (consolidated into fewer sections) */}
      <div className="grid gap-6 xl:grid-cols-2">
        <SurfaceCard className="p-5 sm:p-6 print:border-none print:shadow-none">
          <h3 className="text-lg font-semibold tracking-tight text-neutral-950">Top priorities</h3>
          <div className="mt-4 space-y-3">
            {briefing.topPriorities.map((priority) => (
              <div key={priority.id} className="rounded-[14px] border border-neutral-200 bg-[#eef0f6] p-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <p className="text-base font-semibold tracking-tight text-neutral-950">{priority.communityName}</p>
                  <ToneBadge tone={priority.priorityTone}>
                    {priority.priorityTone === 'critical' ? 'Critical' : priority.priorityTone}
                  </ToneBadge>
                </div>
                <p className="mt-2 text-sm text-neutral-600">{priority.salesGapLabel}</p>
                <p className="mt-2 text-sm font-medium text-neutral-900">{priority.recommendedAction}</p>
                <Link
                  to={openhomesCommunityPath(priority.communityId)}
                  className="mt-3 inline-flex rounded-full border border-neutral-200 bg-white px-3 py-1.5 text-xs font-semibold text-neutral-700 transition-colors hover:bg-neutral-50 print:hidden"
                >
                  Open workspace
                </Link>
              </div>
            ))}
          </div>
        </SurfaceCard>

        <div className="space-y-6">
          <SurfaceCard className="p-5 sm:p-6 print:border-none print:shadow-none">
            <h3 className="text-lg font-semibold tracking-tight text-neutral-950">Key drivers</h3>
            <div className="mt-4 space-y-3">
              {briefing.keyDrivers.map((driver) => (
                <div key={driver.id} className="rounded-[14px] border border-neutral-200 bg-[#eef0f6] p-3">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <p className="text-sm font-semibold text-neutral-950">{driver.title}</p>
                    <ToneBadge tone={driver.credibility}>{driver.credibility === 'high' ? 'High' : 'Medium'}</ToneBadge>
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-neutral-600">{driver.implication}</p>
                </div>
              ))}
            </div>
          </SurfaceCard>

          <SurfaceCard className="p-5 sm:p-6 print:border-none print:shadow-none">
            <h3 className="text-lg font-semibold tracking-tight text-neutral-950">Immediate actions</h3>
            <div className="mt-4 space-y-3">
              {briefing.actionRecommendations.map((action) => (
                <div key={action.id} className="rounded-[14px] border border-neutral-200 bg-[#eef0f6] p-3">
                  <p className="text-sm font-semibold text-neutral-950">{action.title}</p>
                  <p className="mt-1 text-sm leading-relaxed text-neutral-600">{action.detail}</p>
                  <p className="mt-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-neutral-500">
                    {action.owner} &middot; {action.timeframe}
                  </p>
                </div>
              ))}
            </div>
          </SurfaceCard>
        </div>
      </div>
    </div>
  )
}
