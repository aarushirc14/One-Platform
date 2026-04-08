import { useState } from 'react'
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
import { OPENHOMES_PRIORITIES, openhomesCommunityPath } from '@/pulse/constants/routes'
import { IconDownload, IconShare } from '@/pulse/components/icons'
import { useOpenHouseRole } from '@/openhouse/context/OpenHouseRoleContext'
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
    title: 'Executive workflow in briefing',
    description: 'Use this page as the final artifact for review meetings, printed handoffs, and summary alignment.',
    steps: [
      {
        id: 'exec-summary',
        title: 'Review the top-line story',
        detail: 'Confirm status, top priorities, and key drivers before the meeting starts.',
      },
      {
        id: 'exec-print',
        title: 'Print or share the artifact',
        detail: 'This view is designed to be the portable output of the live platform.',
      },
      {
        id: 'exec-followup',
        title: 'Use the linked priorities for follow-up',
        detail: 'If leadership wants more detail, move straight into the focus queue or a community workspace.',
        to: OPENHOMES_PRIORITIES,
        cta: 'Open focus queue',
      },
    ],
  },
  operator: {
    title: 'Operator workflow in briefing',
    description: 'For operators, this page is less about printing and more about making sure the leadership summary matches the execution plan.',
    steps: [
      {
        id: 'op-align',
        title: 'Check what leadership will see',
        detail: 'Use this page to confirm that the priority list and action framing are aligned with the work in progress.',
      },
      {
        id: 'op-owners',
        title: 'Verify owners and next moves',
        detail: 'Use the action section to make sure the summary still reflects the actual operating plan.',
      },
      {
        id: 'op-return',
        title: 'Return to the focus queue when action changes',
        detail: 'If the work has shifted, go back and update where attention should go next.',
        to: OPENHOMES_PRIORITIES,
        cta: 'Open focus queue',
      },
    ],
  },
  analyst: {
    title: 'Analyst workflow in briefing',
    description: 'For analysts, this page is the final communication layer: a concise business artifact generated from the deeper analysis.',
    steps: [
      {
        id: 'an-story',
        title: 'Review the final story',
        detail: 'Use this page to make sure the summary faithfully reflects the underlying explanation and priorities.',
      },
      {
        id: 'an-translate',
        title: 'Use it as the narrative handoff',
        detail: 'This is the version of the story you can carry into client-facing or leadership-facing communication.',
      },
      {
        id: 'an-detail',
        title: 'Drop back into details only when challenged',
        detail: 'If a reviewer asks why, move into the focus queue or community workspace with context already set.',
        to: openhomesCommunityPath(decisionPlatformModel.briefing.topPriorities[0]?.communityId ?? 'catalina-foothills'),
        cta: 'Open top workspace',
      },
    ],
  },
}

export function ExecutiveBriefingPage() {
  const { role } = useOpenHouseRole()
  const [shareLabel, setShareLabel] = useState('Copy link')
  const briefing = decisionPlatformModel.briefing
  const roleContent = workflowContent[role]

  if (!briefing) {
    return (
      <StatePanel
        title="Briefing unavailable"
        description="The printable briefing will appear here once summary data is available."
        tone="loading"
      />
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
        eyebrow="Print and share"
        title={briefing.title}
        description="A printable operating brief generated from the same live platform state, not a separate PDF workflow."
        actions={
          <div className="flex flex-wrap gap-2 print:hidden">
            <button
              type="button"
              onClick={() => window.print()}
              className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-neutral-950 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-neutral-800 sm:w-auto"
            >
              <IconDownload className="h-4 w-4" />
              Print briefing
            </button>
            <button
              type="button"
              onClick={() => void copyLink()}
              className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-neutral-200 bg-white px-4 py-2 text-sm font-semibold text-neutral-900 transition-colors hover:bg-neutral-50 sm:w-auto"
            >
              <IconShare className="h-4 w-4" />
              {shareLabel}
            </button>
          </div>
        }
      />

      <QuickAccessLinks steps={roleContent.steps} />

      <SurfaceCard className="p-5 sm:p-6 print:border-none print:shadow-none">
        <div className="flex flex-col gap-4 border-b border-neutral-200/80 pb-5 print:pb-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-neutral-500">Snapshot</p>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight text-neutral-950">Leadership briefing</h2>
            <p className="mt-2 text-sm leading-relaxed text-neutral-600">Data up to {briefing.snapshotLabel}</p>
          </div>
          <Link
            to={OPENHOMES_PRIORITIES}
            className="inline-flex rounded-full border border-neutral-200 bg-white px-4 py-2 text-sm font-semibold text-neutral-900 transition-colors hover:bg-neutral-50 print:hidden"
          >
            Open focus queue
          </Link>
        </div>

        <div className="mt-5 grid gap-5 2xl:grid-cols-[1.15fr_0.85fr]">
          <div>
            <SectionHeading
              overline="Executive summary"
              title="What leaders should know"
              description={briefing.executiveSummary}
            />

            <div className="mt-5 grid gap-3 md:grid-cols-3">
              {decisionPlatformModel.overview.statusMetrics.slice(0, 3).map((metric) => (
                <div key={metric.id} className="rounded-[20px] border border-neutral-200 bg-neutral-50 p-4">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-neutral-500">
                    {metric.label}
                  </p>
                  <p className="mt-2 text-lg font-semibold tracking-tight text-neutral-950">{metric.value}</p>
                  <p className="mt-2 text-sm text-neutral-600">{metric.detail}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[24px] border border-neutral-200 bg-neutral-50 p-5">
            <SectionHeading
              overline="Discussion prompts"
              title="Boardroom questions"
              description="These are generated from the same live decision model."
            />
            <ul className="mt-5 space-y-3 text-sm leading-relaxed text-neutral-700">
              {briefing.discussionPrompts.map((prompt) => (
                <li key={prompt} className="rounded-[18px] border border-neutral-200 bg-white p-4">
                  {prompt}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </SurfaceCard>

      <SurfaceCard className="p-5 sm:p-6 print:border-none print:shadow-none">
        <SectionHeading
          overline="Top priorities"
          title="Where to focus now"
          description="This replaces the separate report summary and triage workflow with one ranked decision list."
        />
        <div className="mt-5 grid gap-4 md:grid-cols-2 2xl:grid-cols-3">
          {briefing.topPriorities.map((priority) => (
            <div key={priority.id} className="rounded-[20px] border border-neutral-200 bg-neutral-50 p-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="break-words text-lg font-semibold tracking-tight text-neutral-950">
                  {priority.communityName}
                </p>
                <ToneBadge tone={priority.priorityTone}>
                  {priority.priorityTone === 'critical' ? 'Critical' : priority.priorityTone}
                </ToneBadge>
              </div>
              <p className="mt-3 text-sm font-medium text-neutral-900">{priority.salesGapLabel}</p>
              <p className="mt-2 text-sm leading-relaxed text-neutral-600">{priority.summary}</p>
              <p className="mt-3 text-sm font-semibold text-neutral-950">{priority.recommendedAction}</p>
              <Link
                to={openhomesCommunityPath(priority.communityId)}
                className="mt-4 inline-flex rounded-full border border-neutral-200 bg-white px-4 py-2 text-sm font-semibold text-neutral-900 transition-colors hover:bg-neutral-50 print:hidden"
              >
                Open workspace
              </Link>
            </div>
          ))}
        </div>
      </SurfaceCard>

      <SurfaceCard className="p-5 sm:p-6 print:border-none print:shadow-none">
        <SectionHeading
          overline="Key drivers"
          title="Why the forecast looks this way"
          description="These three signals are the most important parts of the story for leadership."
        />
        <div className="mt-5 grid gap-4 md:grid-cols-2 2xl:grid-cols-3">
          {briefing.keyDrivers.map((driver) => (
            <div key={driver.id} className="rounded-[20px] border border-neutral-200 bg-neutral-50 p-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="break-words text-sm font-semibold text-neutral-950">{driver.title}</p>
                <ToneBadge tone={driver.credibility}>
                  {driver.credibility === 'high' ? 'High' : 'Medium'}
                </ToneBadge>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-neutral-600">{driver.implication}</p>
            </div>
          ))}
        </div>
      </SurfaceCard>

      <SurfaceCard className="p-5 sm:p-6 print:border-none print:shadow-none">
        <SectionHeading
          overline="Immediate actions"
          title="What should happen next"
          description="These actions are printable and discussion-ready because they come directly from the live decision model."
        />
        <div className="mt-5 grid gap-4 md:grid-cols-2 2xl:grid-cols-3">
          {briefing.actionRecommendations.map((action) => (
            <div key={action.id} className="rounded-[20px] border border-neutral-200 bg-neutral-50 p-4">
              <p className="text-sm font-semibold text-neutral-950">{action.title}</p>
              <p className="mt-2 text-sm leading-relaxed text-neutral-600">{action.detail}</p>
              <p className="mt-3 text-xs font-semibold uppercase tracking-[0.16em] text-neutral-500">
                {action.owner} · {action.timeframe}
              </p>
            </div>
          ))}
        </div>
      </SurfaceCard>
    </div>
  )
}
