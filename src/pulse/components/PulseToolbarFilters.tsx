import { standardFilters } from '@/pulse/constants/filters'
import { FilterField } from '@/pulse/components/FilterField'

export function PulseToolbarFilters() {
  return (
    <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:items-end sm:justify-end sm:gap-3">
      <FilterField label="Date Period" value={standardFilters.datePeriod} />
      <FilterField label="Aggregation" value={standardFilters.aggregation} />
      <FilterField label="Benchmark" value={standardFilters.benchmark} />
    </div>
  )
}
