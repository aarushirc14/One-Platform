import { AGGREGATION_OPTIONS, TARGET_OPTIONS, type AggregationId, type TargetId } from '@/pulse/constants/filters'
import { PulseFilterSelect } from '@/pulse/components/PulseFilterSelect'
import { usePulseFilters } from '@/pulse/context/PulseFiltersContext'
import { cn } from '@/lib/cn'

export function PulseToolbarFilters({ className }: { className?: string }) {
  const {
    aggregationId,
    setAggregationId,
    datePeriodId,
    setDatePeriodId,
    datePeriodOptions,
    targetId,
    setTargetId,
  } = usePulseFilters()

  return (
    <div
      className={cn(
        'flex min-w-0 flex-wrap items-center gap-2 sm:gap-2.5',
        className,
      )}
    >
      <PulseFilterSelect
        label="Aggregation"
        value={aggregationId}
        options={AGGREGATION_OPTIONS.map((o) => ({ value: o.id, label: o.label }))}
        onChange={(v) => setAggregationId(v as AggregationId)}
      />
      <PulseFilterSelect
        label="Date Period"
        value={datePeriodId}
        options={datePeriodOptions.map((o) => ({ value: o.id, label: o.label }))}
        onChange={setDatePeriodId}
      />
      <PulseFilterSelect
        label="Targets"
        value={targetId}
        options={TARGET_OPTIONS.map((o) => ({ value: o.id, label: o.label }))}
        onChange={(v) => setTargetId(v as TargetId)}
      />
    </div>
  )
}
