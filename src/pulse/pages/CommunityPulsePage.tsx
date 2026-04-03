import { Link, Navigate, useParams } from 'react-router-dom'
import { usePulseFilters } from '@/pulse/context/PulseFiltersContext'
import { usePulseDataValidUntilLabel } from '@/pulse/hooks/usePulseDataValidUntilLabel'
import {
  communityDisplayName,
  communityKpis,
  communitySlug,
  funnelColumns,
  metricSections,
  webTrafficLeadTable,
} from '@/pulse/data/community'
import { OPENHOMES_COMMUNITY_TRIAGE } from '@/pulse/constants/routes'
import { CommunityKpiCard } from '@/pulse/components/CommunityKpiCard'
import { PulsePageHeading } from '@/pulse/components/PulsePageHeading'
import { FunnelPerformanceSection } from '@/pulse/components/FunnelPerformanceSection'
import { MetricsTable } from '@/pulse/components/MetricsTable'
import { PulseToolbarFilters } from '@/pulse/components/PulseToolbarFilters'
import { pulseDataLastRefreshed, pulseDataValidUntil } from '@/pulse/ui/pulseTypography'
import { cn } from '@/lib/cn'

export function CommunityPulsePage() {
  const { communityId } = useParams<{ communityId: string }>()
  const { datePeriodLabel } = usePulseFilters()
  const dataLastRefreshedLabel = usePulseDataValidUntilLabel()

  if (communityId !== communitySlug) {
    return <Navigate to={OPENHOMES_COMMUNITY_TRIAGE} replace />
  }

  return (
    <div className="w-full px-3 pb-5 pt-1.5 sm:px-6 sm:py-7 lg:min-h-full lg:px-10">
      <div className="mx-auto w-full max-w-[1180px]">
        <Link
          to={OPENHOMES_COMMUNITY_TRIAGE}
          className="mb-3 inline-block text-sm font-medium text-neutral-800 underline decoration-neutral-400 underline-offset-2 transition-colors hover:text-neutral-950 hover:decoration-neutral-600 sm:mb-4"
        >
          ← Community Triage
        </Link>
        <header className="border-b border-neutral-200 pb-5 sm:pb-6">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between lg:gap-6">
            <div className="min-w-0">
              <PulsePageHeading title={communityDisplayName} />
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
                <PulseToolbarFilters className="min-w-0 flex-1 sm:flex-initial" />
              </div>
            </div>
          </div>
        </header>

        <section className="mt-5 sm:mt-6" aria-label="Community sales KPIs">
          <div className="grid grid-cols-1 gap-3 sm:gap-4 lg:grid-cols-2">
            {communityKpis.map((kpi) => (
              <CommunityKpiCard
                key={kpi.id}
                title={kpi.title}
                headline={kpi.headline}
                pct={kpi.pct}
                pctTone={kpi.pctTone}
                subline={kpi.subline}
                infoTooltip={kpi.infoTooltip}
              />
            ))}
          </div>
        </section>

        <div className="mt-5 min-w-0 space-y-5 pb-6 sm:mt-6 sm:space-y-6 sm:pb-8">
          <FunnelPerformanceSection columns={funnelColumns} />
          <MetricsTable section={webTrafficLeadTable} />
          {metricSections.map((section, idx) => (
            <MetricsTable key={section.title ?? `metrics-${idx}`} section={section} />
          ))}
        </div>
      </div>
    </div>
  )
}
