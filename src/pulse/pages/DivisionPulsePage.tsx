import { useState } from 'react'
import { divisionCommunities, divisionCommunitiesSummary, divisionKpis } from '@/pulse/data/division'
import { usePulseFilters } from '@/pulse/context/PulseFiltersContext'
import { usePulseDataValidUntilLabel } from '@/pulse/hooks/usePulseDataValidUntilLabel'
import { CommunitiesTable } from '@/pulse/components/CommunitiesTable'
import { DivisionCommunitiesSummaryTable } from '@/pulse/components/DivisionCommunitiesSummaryTable'
import { DivisionKpiCard } from '@/pulse/components/DivisionKpiCard'
import { SalesModeToggle } from '@/pulse/components/SalesModeToggle'
import { IconDownload } from '@/pulse/components/icons'
import { PulsePageHeading } from '@/pulse/components/PulsePageHeading'
import { PulseToolbarFilters } from '@/pulse/components/PulseToolbarFilters'
import type { CommunitiesMetricsMode } from '@/pulse/types'
import { pulseDataLastRefreshed, pulseDataValidUntil } from '@/pulse/ui/pulseTypography'
import { cn } from '@/lib/cn'

export function DivisionPulsePage() {
  const [metricsMode, setMetricsMode] = useState<CommunitiesMetricsMode>('conversion')
  const { datePeriodLabel } = usePulseFilters()
  const dataLastRefreshedLabel = usePulseDataValidUntilLabel()

  return (
    <div className="min-h-full w-full px-4 py-5 sm:px-6 sm:py-7 lg:px-10">
      <div className="mx-auto w-full max-w-[1180px]">
        <header className="border-b border-neutral-200 pb-5 sm:pb-6">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between lg:gap-6">
            <div className="min-w-0">
              <PulsePageHeading title="Community Triage" />
              <p className={cn('mt-2', pulseDataValidUntil)}>
                <span className="sr-only">Date period: </span>
                {datePeriodLabel}
              </p>
              <p className={cn('mt-1', pulseDataLastRefreshed)}>
                Data Last Refreshed: {dataLastRefreshedLabel}
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

        <section className="mt-5 sm:mt-6" aria-label="Division KPIs">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
            {divisionKpis.map((kpi) => (
              <DivisionKpiCard key={kpi.id} kpi={kpi} />
            ))}
          </div>
        </section>

        <section className="mt-5 space-y-3 sm:mt-6" aria-label="Division community metrics">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-end">
            <SalesModeToggle mode={metricsMode} onModeChange={setMetricsMode} className="w-full sm:w-auto" />
          </div>
          <DivisionCommunitiesSummaryTable row={divisionCommunitiesSummary} metricsMode={metricsMode} />
        </section>

        <section className="mt-5 pb-6 sm:mt-6 sm:pb-8" aria-labelledby="division-communities-heading">
          <h2 id="division-communities-heading" className="sr-only">
            Communities
          </h2>
          <CommunitiesTable rows={divisionCommunities} metricsMode={metricsMode} />
        </section>
      </div>
    </div>
  )
}
