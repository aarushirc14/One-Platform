import type { FunnelColumn, FunnelStatus } from '@/pulse/types'
import { IconInfo } from '@/pulse/components/icons'
import { usePulseFilters } from '@/pulse/context/PulseFiltersContext'
import { cn } from '@/lib/cn'

type FunnelPerformanceSectionProps = {
  columns: FunnelColumn[]
}

export function FunnelPerformanceSection({ columns }: FunnelPerformanceSectionProps) {
  const { datePeriodLabel } = usePulseFilters()

  return (
    <section>
      <div className="mb-4">
        <h2 className="text-lg font-semibold text-neutral-900">Overall Funnel Performance</h2>
        <p className="text-sm text-neutral-600">{datePeriodLabel}</p>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-4 xl:grid-cols-4">
        {columns.map((col) => (
          <FunnelColumn key={col.id} column={col} />
        ))}
      </div>
    </section>
  )
}

function FunnelColumn({ column }: { column: FunnelColumn }) {
  return (
    <div
      className={cn(
        'flex flex-col gap-3 rounded-lg bg-white p-3',
        column.highlight ? 'border-2 border-red-500 shadow-sm' : 'border border-neutral-200 shadow-sm',
      )}
    >
      <div className="flex items-start justify-between gap-2">
        <h3 className="text-sm font-semibold text-neutral-900">{column.title}</h3>
        <StatusBadge status={column.status} />
      </div>
      {column.segments.map((seg) => (
        <div key={seg.title} className="rounded-lg border border-neutral-200 bg-white p-3 shadow-sm">
          <div className="flex items-start justify-between gap-2">
            <p className="text-xs font-semibold text-neutral-800">{seg.title}</p>
            <button
              type="button"
              className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded text-neutral-400 hover:bg-neutral-50 hover:text-neutral-700"
              aria-label={`${seg.title} info`}
            >
              <IconInfo className="h-3.5 w-3.5" />
            </button>
          </div>
          <p className="mt-2 text-xl font-bold tracking-tight text-neutral-900">{seg.primaryLine}</p>
          <p className="mt-1 text-xs text-neutral-600">{seg.secondaryLine}</p>
          <div className="my-3 h-px bg-neutral-200" />
          <p className="text-xs font-medium text-neutral-700">{seg.benchmarkLine}</p>
          <p
            className={cn(
              'mt-1 text-xs font-semibold',
              seg.benchmarkNoteTone === 'positive' && 'text-emerald-600',
              seg.benchmarkNoteTone === 'negative' && 'text-red-600',
              seg.benchmarkNoteTone === 'neutral' && 'text-neutral-600',
            )}
          >
            {seg.benchmarkNote}
          </p>
        </div>
      ))}
      <div
        className={cn(
          'mt-auto rounded-lg border px-3 py-3 text-center',
          column.salesImpactTone === 'negative' && 'border-red-200 bg-red-50',
          column.salesImpactTone === 'positive' && 'border-emerald-200 bg-emerald-50',
          column.salesImpactTone === 'neutral' && 'border-blue-200 bg-blue-50',
        )}
      >
        <p className="text-xs font-semibold text-neutral-600">Sales Impact</p>
        <p
          className={cn(
            'mt-1 text-xl font-bold',
            column.salesImpactTone === 'negative' && 'text-red-600',
            column.salesImpactTone === 'positive' && 'text-emerald-600',
            column.salesImpactTone === 'neutral' && 'text-blue-700',
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
        : 'bg-blue-100 text-blue-700'

  return (
    <span className={cn('rounded-md px-2 py-0.5 text-[10px] font-bold tracking-wide', cls)}>{label}</span>
  )
}
