import { Link } from 'react-router-dom'
import {
  type CommunityPerformanceRow,
  type Next90Outlook,
  communityPerformanceAlert,
  communityPerformanceIntro,
  communityPerformanceRows,
  communityPerformanceTableFootnote,
  outlookLegendItems,
} from '@/pulse/data/divisionPerformanceReport'
import { IconAlertCircleSolid, IconExternalLink } from '@/pulse/components/icons'
import { openhomesCommunityPath } from '@/pulse/constants/routes'
import { cn } from '@/lib/cn'
import {
  pulseInsetSectionTitle,
  pulseOutlookBadge,
  pulseSectionTitleOnCard,
  pulseTableHeadPrimary,
} from '@/pulse/ui/pulseTypography'
import {
  pulseTableBase,
  pulseTableCard,
  pulseTableCellGrid,
  pulseTableCellPadding,
  pulseTableHeaderBg,
  pulseTableRowEven,
  pulseTableRowOdd,
  pulseTableScroll,
  pulseTableTd,
} from '@/pulse/ui/pulseTable'

const outlookLegendDisplayOrder: Next90Outlook[] = [
  'off-track',
  'at-risk',
  'on-track',
  'strong',
]

function TableHeadCell({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <th className={cn(pulseTableCellGrid, pulseTableHeaderBg, pulseTableCellPadding, 'align-bottom text-left')}>
      <div className={pulseTableHeadPrimary}>{title}</div>
      {subtitle ? (
        <div className="mt-1 max-w-[11rem] text-[10px] font-normal leading-snug text-neutral-600">
          {subtitle}
        </div>
      ) : null}
    </th>
  )
}

function SalesVsTargetBar({ actual, target }: { actual: number; target: number }) {
  const met = actual >= target
  /** Bar spans 0 → max(actual, target) so the target marker moves when exceeding (e.g. 5/2 shows fill past the line). */
  const scaleMax = Math.max(actual, target, 1)
  const fillPct = (actual / scaleMax) * 100
  const markerPct = target > 0 ? (target / scaleMax) * 100 : 0
  return (
    <div className="mt-2 w-full max-w-[148px]">
      <div className="relative h-2.5 w-full overflow-visible rounded-full bg-slate-200">
        <div
          className={cn(
            'absolute inset-y-0 left-0 rounded-full transition-[width]',
            met ? 'bg-emerald-500' : 'bg-red-500',
          )}
          style={{ width: `${fillPct}%` }}
        />
        {/* Target position on the same scale as fill (not always the right edge of the track). */}
        <div
          className="pointer-events-none absolute top-1/2 z-10 h-4 w-px -translate-y-1/2 bg-neutral-400"
          style={{ left: `${markerPct}%`, marginLeft: '-0.5px' }}
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
  return (
    <span
      className={cn(
        pulseOutlookBadge,
        outlook === 'off-track' && 'border-red-500 bg-red-50 text-red-600',
        outlook === 'at-risk' && 'border-amber-400 bg-amber-100 text-amber-900',
        outlook === 'on-track' && 'border-emerald-400 bg-emerald-50 text-emerald-800',
        outlook === 'strong' && 'border-emerald-500 bg-emerald-100 text-emerald-900',
      )}
    >
      {copy}
    </span>
  )
}

function Next90TargetCell({ row }: { row: CommunityPerformanceRow }) {
  const catchUp = row.next90CatchUp
  return (
    <div className="min-w-[8.5rem] space-y-2 py-1">
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
    </div>
  )
}

function Next90ForecastCell({ row }: { row: CommunityPerformanceRow }) {
  return (
    <div className="min-w-[6.5rem] py-1">
      <OutlookBadge outlook={row.next90Outlook} />
    </div>
  )
}

function PrimaryDriverCell({ row }: { row: CommunityPerformanceRow }) {
  return (
    <div className="flex min-w-[10.5rem] flex-col gap-3 py-1 sm:min-w-[12rem]">
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
          'inline-flex w-full max-w-[11.5rem] items-center justify-center gap-1.5 rounded-lg px-3 py-2.5 text-center text-sm font-semibold shadow-md transition-colors',
          'border-2 border-neutral-900 bg-neutral-900 text-white',
          'hover:border-neutral-950 hover:bg-neutral-950 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-900',
        )}
      >
        Triage Community
        <IconExternalLink className="h-3.5 w-3.5 shrink-0 opacity-95" />
      </Link>
    </div>
  )
}

export function CommunityPerformanceSection() {
  return (
    <section
      id="community-priorities"
      className="scroll-mt-24 rounded-lg border border-neutral-200 bg-white p-5 shadow-sm sm:p-6"
      aria-labelledby="community-performance-heading"
    >
      <div className="min-w-0">
        <h2 id="community-performance-heading" className={pulseSectionTitleOnCard}>
          {communityPerformanceIntro.headline}
        </h2>
        <p className="mt-1 text-sm leading-relaxed text-neutral-600">{communityPerformanceIntro.subline}</p>
        <p className="mt-2 max-w-3xl text-xs leading-relaxed text-neutral-500">
          Gladden is a pure volume problem; Tanque shows engagement without enough net-new leads; Catalina is
          getting traffic closer to plan but not enough sales after visits. Saddlebrook is the relative
          outperformer — use triage to compare modeled impact side by side.
        </p>
      </div>

      <div className="mt-5 flex overflow-hidden rounded-lg border border-red-200 bg-red-50/60">
        <div className="w-1 shrink-0 bg-red-600" aria-hidden />
        <div className="flex min-w-0 flex-1 items-start gap-3 px-4 py-3.5 sm:px-5">
          <IconAlertCircleSolid className="mt-0.5 h-6 w-6 shrink-0 text-red-600 sm:h-7 sm:w-7" aria-hidden />
          <p className="text-sm font-semibold leading-relaxed text-neutral-800">{communityPerformanceAlert}</p>
        </div>
      </div>

      <div className={cn('mt-5', pulseTableCard)}>
        <div className={pulseTableScroll}>
          <table className={cn('min-w-[1080px]', pulseTableBase)}>
            <thead>
              <tr>
                <th
                  className={cn(pulseTableCellGrid, pulseTableHeaderBg, pulseTableCellPadding, 'text-left align-bottom')}
                >
                  <div className={pulseTableHeadPrimary}>Community</div>
                </th>
                <TableHeadCell title="Last 30 Day Sales" subtitle="Actual vs prorated target" />
                <TableHeadCell title="YTD Sales" subtitle="Actual vs target (incl. full Mar)" />
                <TableHeadCell title="Next 90-Day Target" subtitle="Adjusted target*" />
                <TableHeadCell title="Forecasted Outlook" subtitle="AI predicted" />
                <TableHeadCell title="Primary Driver — Past 90 Days" subtitle="Key metric driving the forecast" />
              </tr>
            </thead>
            <tbody>
              {communityPerformanceRows.map((row, rowIndex) => (
                <tr key={row.id} className={cn(rowIndex % 2 === 1 ? pulseTableRowOdd : pulseTableRowEven)}>
                  <td className={pulseTableTd('left', 'align-top')}>
                    <Link
                      to={openhomesCommunityPath(row.id)}
                      className="font-bold text-blue-700 underline decoration-blue-300 underline-offset-2 transition-colors hover:text-blue-800 hover:decoration-blue-500"
                    >
                      {row.name}
                    </Link>
                  </td>
                  <td className={pulseTableTd('left', 'align-top')}>
                    <SalesVsTargetCell actual={row.last30Actual} target={row.last30Target} />
                  </td>
                  <td className={pulseTableTd('left', 'align-top')}>
                    <SalesVsTargetCell actual={row.ytdActual} target={row.ytdTarget} />
                  </td>
                  <td className={pulseTableTd('left', 'align-top')}>
                    <Next90TargetCell row={row} />
                  </td>
                  <td className={pulseTableTd('left', 'align-top')}>
                    <Next90ForecastCell row={row} />
                  </td>
                  <td className={pulseTableTd('left', 'align-top')}>
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
          {outlookLegendDisplayOrder.map((tone) => {
            const item = outlookLegendItems.find((i) => i.tone === tone)
            if (!item) throw new Error(`Missing outlook legend: ${tone}`)
            return (
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
            )
          })}
        </div>
      </div>
    </section>
  )
}
