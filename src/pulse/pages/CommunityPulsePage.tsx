import { Link, Navigate, useParams } from 'react-router-dom'
import {
  communityDisplayName,
  communityKpis,
  communitySlug,
  funnelColumns,
  metricSections,
  webTrafficLeadTable,
} from '@/pulse/mock/community'
import { divisionName } from '@/pulse/mock/division'
import { CommunityKpiCard } from '@/pulse/components/CommunityKpiCard'
import { FunnelPerformanceSection } from '@/pulse/components/FunnelPerformanceSection'
import { IconMoreVertical, IconShare } from '@/pulse/components/icons'
import { MetricsTable } from '@/pulse/components/MetricsTable'
import { PulseToolbarFilters } from '@/pulse/components/PulseToolbarFilters'

export function CommunityPulsePage() {
  const { communityId } = useParams<{ communityId: string }>()

  if (communityId !== communitySlug) {
    return <Navigate to="/pulse" replace />
  }

  return (
    <div className="min-h-full w-full px-3 py-6 sm:px-4 sm:py-10">
      <header className="border-b border-neutral-200/90 pb-8">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between lg:gap-12">
          <div className="min-w-0 space-y-1">
            <Link
              to="/pulse"
              className="inline-flex items-center gap-1 text-sm font-semibold text-neutral-600 transition-colors hover:text-neutral-950"
            >
              <span aria-hidden>&lt;</span> {divisionName}
            </Link>
            <h1 className="mt-3 text-2xl font-bold tracking-tight text-neutral-950 sm:text-3xl sm:leading-tight lg:text-[2rem]">
              {communityDisplayName}
            </h1>
            <p className="pt-2 text-sm italic leading-relaxed text-neutral-600">
              Data Valid Until: January 31, 2026
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

      <section className="mt-10" aria-label="Community sales KPIs">
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
          {communityKpis.map((kpi) => (
            <CommunityKpiCard
              key={kpi.id}
              title={kpi.title}
              headline={kpi.headline}
              pct={kpi.pct}
              pctTone={kpi.pctTone}
              subline={kpi.subline}
            />
          ))}
        </div>
      </section>

      <div className="mt-10 space-y-6 pb-8 sm:space-y-8 sm:pb-10">
        <FunnelPerformanceSection columns={funnelColumns} />
        <MetricsTable section={webTrafficLeadTable} />
        {metricSections.map((section, idx) => (
          <MetricsTable key={section.title ?? `metrics-${idx}`} section={section} />
        ))}
      </div>
    </div>
  )
}
