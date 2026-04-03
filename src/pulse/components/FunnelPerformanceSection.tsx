import type { FunnelColumn, FunnelSegment, FunnelStatus } from '@/pulse/types'
import { IconInfo } from '@/pulse/components/icons'
import { funnelSegmentTooltip, INFO_FUNNEL_SALES_IMPACT } from '@/pulse/constants/infoTooltips'
import { pulseSectionHeadingLg } from '@/pulse/ui/pulseTypography'
import { cn } from '@/lib/cn'
import { Fragment } from 'react'

type FunnelPerformanceSectionProps = {
  columns: FunnelColumn[]
}

export function FunnelPerformanceSection({ columns }: FunnelPerformanceSectionProps) {
  return (
    <section>
      <div className="mb-5">
        <h2 className={pulseSectionHeadingLg}>Overall Funnel Performance</h2>
      </div>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 xl:grid-cols-4">
        {columns.map((col) => (
          <FunnelColumn key={col.id} column={col} />
        ))}
      </div>
    </section>
  )
}

function secondaryToneClass(tone: FunnelSegment['secondaryLineTone']) {
  if (tone === 'negative') return 'text-red-600'
  if (tone === 'positive') return 'text-emerald-700'
  return 'text-neutral-600'
}

function FunnelSegmentBlock({ seg }: { seg: FunnelSegment }) {
  const segmentHelp = funnelSegmentTooltip(seg.title)
  return (
    <div className="min-w-0">
      <div className="flex items-start justify-between gap-2">
        <p className="text-xs font-semibold text-neutral-800">{seg.title}</p>
        <button
          type="button"
          className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded text-neutral-400 hover:bg-neutral-50 hover:text-neutral-700"
          title={segmentHelp}
          aria-label={`${seg.title}: ${segmentHelp}`}
        >
          <IconInfo className="h-3.5 w-3.5" />
        </button>
      </div>
      <p className="mt-1.5 text-xl font-bold tracking-tight text-neutral-900">{seg.primaryLine}</p>
      {seg.secondaryLine ? (
        <p className={cn('mt-0.5 text-xs font-medium', secondaryToneClass(seg.secondaryLineTone))}>
          {seg.secondaryLine}
        </p>
      ) : null}
      {seg.targetLine ? (
        <>
          <div className="my-2 h-px bg-neutral-200" />
          <p className="text-xs font-medium text-neutral-700">{seg.targetLine}</p>
        </>
      ) : null}
      {seg.targetNote ? (
        <p
          className={cn(
            'text-xs font-semibold',
            seg.targetLine ? 'mt-1' : 'mt-2',
            seg.targetNoteTone === 'positive' && 'text-emerald-700',
            seg.targetNoteTone === 'negative' && 'text-red-600',
            seg.targetNoteTone === 'neutral' && 'text-neutral-600',
          )}
        >
          {seg.targetNote}
        </p>
      ) : null}
    </div>
  )
}

function FunnelColumn({ column }: { column: FunnelColumn }) {
  return (
    <div
      className={cn(
        'flex flex-col gap-0 rounded-lg border bg-white p-3 shadow-sm',
        column.highlight ? 'border-2 border-red-600' : 'border-neutral-200',
      )}
    >
      <div className="flex items-start justify-between gap-2 border-b border-neutral-100 pb-2">
        <h3 className="text-sm font-semibold text-neutral-900">{column.title}</h3>
        <StatusBadge status={column.status} />
      </div>
      <div className="flex flex-col gap-3 pt-3">
        {column.segments.map((seg, i) => (
          <Fragment key={seg.title}>
            {i > 0 ? <div className="h-px bg-neutral-200" /> : null}
            <FunnelSegmentBlock seg={seg} />
          </Fragment>
        ))}
      </div>
      <div
        className={cn(
          'mt-3 rounded-lg border px-3 py-2',
          column.salesImpactTone === 'negative' && 'border-red-200 bg-red-50',
          column.salesImpactTone === 'positive' && 'border-emerald-200 bg-emerald-50',
          column.salesImpactTone === 'neutral' && 'border-neutral-200 bg-neutral-100/90',
        )}
      >
        <div className="flex items-center justify-center gap-1.5">
          <p className="text-xs font-semibold text-neutral-600">Sales Impact</p>
          <button
            type="button"
            className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded text-neutral-400 hover:bg-white/60 hover:text-neutral-700"
            title={INFO_FUNNEL_SALES_IMPACT}
            aria-label={`Sales Impact: ${INFO_FUNNEL_SALES_IMPACT}`}
          >
            <IconInfo className="h-3 w-3" />
          </button>
        </div>
        <p
          className={cn(
            'mt-1 text-center text-xl font-bold',
            column.salesImpactTone === 'negative' && 'text-red-600',
            column.salesImpactTone === 'positive' && 'text-emerald-700',
            column.salesImpactTone === 'neutral' && 'text-neutral-900',
          )}
        >
          {column.salesImpactLabel}
        </p>
      </div>
    </div>
  )
}

function StatusBadge({ status }: { status: FunnelStatus }) {
  const label = status === 'behind' ? 'BEHIND' : status === 'ahead' ? 'AHEAD' : 'ON PACE'
  const cls =
    status === 'behind'
      ? 'bg-red-100 text-red-700'
      : status === 'ahead'
        ? 'bg-emerald-100 text-emerald-700'
        : 'bg-sky-100 text-sky-800'

  return (
    <span className={cn('rounded-md px-2 py-0.5 text-[10px] font-bold tracking-wide', cls)}>{label}</span>
  )
}
