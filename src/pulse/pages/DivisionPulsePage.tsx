import { divisionCommunities, divisionKpis, divisionName } from '@/pulse/mock/division'
import { CommunitiesTable } from '@/pulse/components/CommunitiesTable'
import { DivisionKpiCard } from '@/pulse/components/DivisionKpiCard'
import { IconDownload, IconLineChart } from '@/pulse/components/icons'
import { PerformanceLegend } from '@/pulse/components/PerformanceLegend'
import { PulseToolbarFilters } from '@/pulse/components/PulseToolbarFilters'

export function DivisionPulsePage() {
  return (
    <div className="px-6 py-6 lg:px-10 lg:py-8">
      <header className="flex flex-col gap-6 border-b border-neutral-200/80 pb-6 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-black">{divisionName}</h1>
          <p className="mt-2 text-sm text-neutral-600">Data Valid Until: January 31, 2026</p>
        </div>
        <div className="flex w-full flex-col gap-4 lg:w-auto lg:min-w-[520px]">
          <PulseToolbarFilters />
          <div className="flex flex-wrap items-center justify-end gap-2">
            <button
              type="button"
              className="inline-flex h-10 items-center gap-2 rounded-md border border-neutral-300 bg-white px-4 text-sm font-semibold text-neutral-900 shadow-sm hover:bg-neutral-50"
            >
              <IconDownload />
              Spreadsheet
            </button>
            <button
              type="button"
              className="inline-flex h-10 items-center gap-2 rounded-md bg-black px-4 text-sm font-semibold text-white shadow-sm hover:bg-neutral-900"
            >
              <IconLineChart className="text-white" />
              Sales Forecast
            </button>
          </div>
        </div>
      </header>

      <div className="mt-8 grid grid-cols-1 gap-4 lg:grid-cols-2">
        {divisionKpis.map((kpi) => (
          <DivisionKpiCard key={kpi.id} kpi={kpi} />
        ))}
      </div>

      <div className="mt-8 space-y-6">
        <CommunitiesTable rows={divisionCommunities} />
        <PerformanceLegend />
      </div>
    </div>
  )
}
