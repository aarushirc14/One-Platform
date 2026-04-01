import { Link, Navigate, useParams } from 'react-router-dom'
import { usePulseDataValidUntilLabel } from '@/pulse/hooks/usePulseDataValidUntilLabel'
import {
  communityDisplayName,
  communityKpis,
  communitySlug,
  funnelColumns,
  metricSections,
  webTrafficLeadTable,
} from '@/pulse/mock/community'
import { COMMUNITY_TRIAGE_BASE } from '@/pulse/constants/routes'
import { divisionName } from '@/pulse/mock/division'
import { CommunityKpiCard } from '@/pulse/components/CommunityKpiCard'
import { FunnelPerformanceSection } from '@/pulse/components/FunnelPerformanceSection'
import { IconMoreVertical, IconShare } from '@/pulse/components/icons'
import { MetricsTable } from '@/pulse/components/MetricsTable'
import { PulseToolbarFilters } from '@/pulse/components/PulseToolbarFilters'

export function CommunityPulsePage() {
  const { communityId } = useParams<{ communityId: string }>()
  const dataValidUntilLabel = usePulseDataValidUntilLabel()

  if (communityId !== communitySlug) {
    return <Navigate to={COMMUNITY_TRIAGE_BASE} replace />
  }

  return (
    <div className="min-h-full w-full px-3 py-5 sm:px-4 sm:py-7">
      <header className="border-b border-neutral-200/90 pb-5 sm:pb-6">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between lg:gap-8">
          <div className="min-w-0 space-y-1">
            <Link
              to={COMMUNITY_TRIAGE_BASE}
              className="inline-flex items-center gap-1 text-sm font-semibold text-neutral-600 transition-colors hover:text-neutral-950"
            >
              <span aria-hidden>&lt;</span> {divisionName}
            </Link>
            <h1 className="mt-3 text-2xl font-bold tracking-tight text-neutral-950 sm:text-3xl sm:leading-tight lg:text-[2rem]">
              {communityDisplayName}
            </h1>
            <p className="pt-2 text-sm italic leading-relaxed text-neutral-600">
              Data Valid Until: {dataValidUntilLabel}
            </p>
          </div>

          <div className="flex w-full min-w-0 flex-col gap-4 lg:w-auto lg:min-w-0 lg:flex-shrink-0 lg:max-w-none">
            <div className="flex w-full min-w-0 flex-wrap items-center gap-2 sm:gap-2.5 lg:justify-end">
              <PulseToolbarFilters className="min-w-0 flex-1 sm:flex-initial" />
              <div className="flex shrink-0 items-center justify-end gap-1">
                <button
                  type="button"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-transparent text-neutral-600 transition-colors hover:border-neutral-200 hover:bg-white hover:text-neutral-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-400"
                  aria-label="Share"
                >
                  <IconShare />
                </button>
                <button
                  type="button"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-transparent text-neutral-600 transition-colors hover:border-neutral-200 hover:bg-white hover:text-neutral-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-400"
                  aria-label="More options"
                >
                  <IconMoreVertical />
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      <section className="mt-6 sm:mt-7" aria-label="Community sales KPIs">
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
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

      <div className="mt-6 space-y-4 pb-6 sm:mt-7 sm:space-y-5 sm:pb-8">
        <FunnelPerformanceSection columns={funnelColumns} />
        <MetricsTable section={webTrafficLeadTable} />
        {metricSections.map((section, idx) => (
          <MetricsTable key={section.title ?? `metrics-${idx}`} section={section} />
        ))}
      </div>
    </div>
  )
}
