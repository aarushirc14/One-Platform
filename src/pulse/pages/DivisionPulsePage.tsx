import { divisionCommunities, divisionKpis, divisionName } from '@/pulse/mock/division'
import { CommunitiesTable } from '@/pulse/components/CommunitiesTable'
import { DivisionKpiCard } from '@/pulse/components/DivisionKpiCard'
import { IconDownload } from '@/pulse/components/icons'
import { PulseToolbarFilters } from '@/pulse/components/PulseToolbarFilters'

export function DivisionPulsePage() {
  return (
    <div className="min-h-full w-full px-4 py-8 sm:px-6 sm:py-10 lg:px-10">
      <div className="mx-auto w-full max-w-[1180px]">
        <header className="border-b border-neutral-200 pb-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between lg:gap-8">
            <div className="min-w-0">
              <h1 className="text-4xl font-bold tracking-tight text-neutral-950 sm:text-[2.5rem] sm:leading-tight">
                {divisionName}
              </h1>
              <p className="mt-2 text-sm italic text-neutral-600">
                Data Valid Until: January 31, 2026
              </p>
            </div>

            <div className="flex w-full min-w-0 flex-col gap-3 lg:max-w-none lg:flex-1 lg:items-end">
              <div className="flex w-full min-w-0 flex-wrap items-center gap-2 sm:gap-2.5 lg:justify-end">
                <PulseToolbarFilters />
                <div className="flex min-w-[10.5rem] max-w-[15rem] shrink-0 sm:min-w-[11.5rem]">
                  <button
                    type="button"
                    className="flex w-full min-h-10 flex-col justify-center gap-0.5 rounded-xl border border-neutral-300/90 bg-neutral-200 px-3 py-2 text-left shadow-sm transition-colors hover:border-neutral-400/80 hover:bg-neutral-300/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-400 active:bg-neutral-300"
                  >
                    <span className="text-[10px] font-medium leading-none text-neutral-500">Export</span>
                    <span className="flex items-center gap-2 text-sm font-semibold tracking-tight text-neutral-950">
                      <IconDownload className="h-4 w-4 shrink-0 text-neutral-500" aria-hidden />
                      Spreadsheet
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </header>

        <section className="mt-8" aria-label="Division KPIs">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5">
            {divisionKpis.map((kpi) => (
              <DivisionKpiCard key={kpi.id} kpi={kpi} />
            ))}
          </div>
        </section>

        <section className="mt-10 pb-10 sm:pb-12" aria-labelledby="division-communities-heading">
          <h2 id="division-communities-heading" className="sr-only">
            Communities
          </h2>
          <CommunitiesTable rows={divisionCommunities} />
        </section>
      </div>
    </div>
  )
}
