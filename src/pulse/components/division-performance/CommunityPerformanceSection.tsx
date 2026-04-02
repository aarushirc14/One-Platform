import { Link } from 'react-router-dom'
import {
  type CommunityPerformanceRow,
  type Next90Outlook,
  communityPerformanceAlert,
  communityPerformanceIntro,
  communityPerformanceRows,
  communityPerformanceTableFootnote,
  outlookLegendItems,
} from '@/pulse/mock/divisionPerformanceReport'
import { IconAlertCircleSolid, IconExternalLink, IconSpreadsheet } from '@/pulse/components/icons'
import { openhomesCommunityPath } from '@/pulse/constants/routes'
import { cn } from '@/lib/cn'
import {
  pulseInsetSectionTitle,
  pulseOutlookBadge,
  pulseSectionTitleOnCard,
  pulseTableHeadPrimary,
} from '@/pulse/ui/pulseTypography'

function TableHeadCell({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <th className="align-bottom px-3 py-3 text-left sm:px-4">
      <div className={pulseTableHeadPrimary}>{title}</div>
      <div className="mt-1 max-w-[11rem] text-[10px] font-normal leading-snug text-neutral-600">
        {subtitle}
      </div>
    </th>
  )
}

function SalesVsTargetBar({ actual, target }: { actual: number; target: number }) {
  const met = actual >= target
  const pct = target > 0 ? Math.min(100, (actual / target) * 100) : 0
  return (
    <div className="mt-2 w-full max-w-[148px]">
      <div className="relative h-2.5 w-full overflow-hidden rounded-full bg-neutral-200/90">
        <div
          className={cn(
            'absolute inset-y-0 left-0 rounded-full transition-[width]',
            met ? 'bg-emerald-600' : 'bg-red-500',
          )}
          style={{ width: met ? '100%' : `${pct}%` }}
        />
        <div
          className="pointer-events-none absolute inset-y-0 right-0 w-px bg-neutral-600/70"
          aria-hidden
          title="Target"
        />
      </div>
    </div>
  )
}

function SalesVsTargetCell({ actual, target }: { actual: number; target: number }) {
  const met = actual >= target
  return (
    <div className="min-w-[8.5rem] py-1">
      <p
        className={cn(
          'text-sm font-semibold tabular-nums',
          met ? 'text-emerald-700' : 'text-red-600',
        )}
      >
        {actual} sales / {target} target
      </p>
      <SalesVsTargetBar actual={actual} target={target} />
    </div>
  )
}

const outlookBadgeCopy: Record<Next90Outlook, string> = {
  strong: 'Strong',
  'on-track': 'On Track',
  'at-risk': 'At Risk',
  'off-track': 'Off Track',
}

function OutlookBadge({ outlook }: { outlook: Next90Outlook }) {
  const copy = outlookBadgeCopy[outlook]
  const isOff = outlook === 'off-track'
  const isRisk = outlook === 'at-risk'
  const isOn = outlook === 'on-track' || outlook === 'strong'
  return (
    <span
      className={cn(
        pulseOutlookBadge,
        isOff && 'border-red-500 bg-white text-red-600',
        isRisk && 'border-amber-500 bg-white text-amber-900',
        isOn && 'border-emerald-600 bg-white text-emerald-900',
      )}
    >
      {copy}
    </span>
  )
}

function Next90OutlookCell({ row }: { row: CommunityPerformanceRow }) {
  const catchUp = row.next90CatchUp
  return (
    <div className="min-w-[10.5rem] space-y-2 py-1">
      <p className="text-sm font-semibold text-neutral-900">
        <span className="tabular-nums">{row.next90Target}</span> sales target
      </p>
      <p className="text-xs leading-relaxed text-neutral-500">
        <span className="tabular-nums font-medium text-neutral-700">{row.next90Plan}</span> plan
        {catchUp > 0 ? (
          <>
            {' '}
            + <span className="tabular-nums font-medium text-neutral-700">{catchUp}</span> catch-up
          </>
        ) : null}
      </p>
      <div className="flex flex-col items-start gap-1">
        <OutlookBadge outlook={row.next90Outlook} />
        <span className="text-[10px] font-semibold text-neutral-400">Forecast</span>
      </div>
    </div>
  )
}

function PrimaryDriverCell({ row }: { row: CommunityPerformanceRow }) {
  return (
    <div className="flex min-w-[12rem] flex-col gap-3 py-1 sm:min-w-[14rem]">
      <div>
        <p className="text-sm font-semibold text-neutral-900">{row.primaryDriver}</p>
        {row.driverNeedsAttention ? (
          <p className="mt-1.5 text-[11px] font-semibold text-red-600">
            <span className="mr-1 text-red-500" aria-hidden>
              ●
            </span>
            Needs Attention
          </p>
        ) : null}
      </div>
      <Link
        to={openhomesCommunityPath(row.id)}
        className={cn(
          'inline-flex w-full max-w-[15rem] items-center justify-center gap-2 rounded-lg px-4 py-3 text-center text-sm font-semibold shadow-md transition-colors',
          'border-2 border-neutral-900 bg-neutral-900 text-white',
          'hover:border-neutral-950 hover:bg-neutral-950 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-900',
        )}
      >
        Community Triage
        <IconExternalLink className="h-4 w-4 shrink-0 opacity-95" />
      </Link>
    </div>
  )
}

export function CommunityPerformanceSection() {
  return (
    <section
      id="community-priorities"
      className="scroll-mt-24 rounded-xl border border-neutral-300/90 bg-white p-5 shadow-sm sm:p-6"
      aria-labelledby="community-performance-heading"
    >
      <div className="flex gap-3 sm:gap-4">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-neutral-800 text-white shadow-sm">
          <IconSpreadsheet className="h-5 w-5" aria-hidden />
        </div>
        <div className="min-w-0 pt-0.5">
          <h2 id="community-performance-heading" className={pulseSectionTitleOnCard}>
            {communityPerformanceIntro.headline}
          </h2>
          <p className="mt-1 text-sm leading-relaxed text-neutral-600">{communityPerformanceIntro.subline}</p>
          <p className="mt-2 max-w-3xl text-xs leading-relaxed text-neutral-500">
            Priorities / triage bridge: rank by outlook and primary driver, then open Community Triage for funnel
            stage detail and modeled impact.
          </p>
        </div>
      </div>

      <div className="mt-5 flex overflow-hidden rounded-lg border border-neutral-300 bg-neutral-100">
        <div className="w-1 shrink-0 bg-neutral-600" aria-hidden />
        <div className="flex min-w-0 flex-1 items-start gap-3 px-4 py-3.5 sm:px-5">
          <IconAlertCircleSolid className="mt-0.5 h-6 w-6 shrink-0 text-neutral-600 sm:h-7 sm:w-7" aria-hidden />
          <p className="text-sm font-semibold leading-relaxed text-neutral-800">{communityPerformanceAlert}</p>
        </div>
      </div>

      <div className="mt-5 overflow-hidden rounded-lg border border-neutral-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="min-w-[1020px] w-full border-collapse text-sm">
            <thead>
              <tr className="border-b border-neutral-200 bg-neutral-50/90">
                <th className="px-3 py-3 text-left sm:px-4">
                  <div className={pulseTableHeadPrimary}>Community</div>
                </th>
                <TableHeadCell title="Last 30 Day Sales" subtitle="Actual vs prorated target" />
                <TableHeadCell title="YTD Sales" subtitle="Actual vs target (incl. full Mar)" />
                <TableHeadCell title="Next 90-Day Target Outlook" subtitle="Adjusted target* — forecasted outlook" />
                <TableHeadCell title="Primary Driver — Past 90 Days" subtitle="Key metric driving the forecast" />
              </tr>
            </thead>
            <tbody className="bg-white">
              {communityPerformanceRows.map((row) => (
                <tr key={row.id} className="border-b border-neutral-100 last:border-b-0">
                  <td className="px-3 py-4 align-top font-bold text-neutral-950 sm:px-4">{row.name}</td>
                  <td className="px-3 py-4 align-top sm:px-4">
                    <SalesVsTargetCell actual={row.last30Actual} target={row.last30Target} />
                  </td>
                  <td className="px-3 py-4 align-top sm:px-4">
                    <SalesVsTargetCell actual={row.ytdActual} target={row.ytdTarget} />
                  </td>
                  <td className="px-3 py-4 align-top sm:px-4">
                    <Next90OutlookCell row={row} />
                  </td>
                  <td className="px-3 py-4 align-top sm:px-4">
                    <PrimaryDriverCell row={row} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="mt-6 space-y-3 border-t border-neutral-200 pt-5">
        <p className="max-w-3xl text-xs leading-relaxed text-neutral-500">{communityPerformanceTableFootnote}</p>
        <div
          className="flex flex-wrap items-center gap-x-3 gap-y-2 border-t border-neutral-100 pt-3 sm:gap-x-4"
          role="list"
          aria-label="Outlook legend"
        >
          <span className={pulseInsetSectionTitle}>Outlook</span>
          {outlookLegendItems.map((item) => (
            <span
              key={item.tone}
              role="listitem"
              className="inline-flex max-w-[min(100%,20rem)] items-center gap-1.5 text-[11px] leading-snug text-neutral-600 sm:max-w-none sm:text-xs"
            >
              <span className={cn('h-2 w-2 shrink-0 rounded-full', item.dotClass)} aria-hidden />
              <span className="min-w-0">
                <span className="font-semibold text-neutral-800">{item.label}</span>
                <span className="text-neutral-500"> — {item.range}</span>
              </span>
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
