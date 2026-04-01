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
    <div className="px-6 py-6 lg:px-10 lg:py-8">
      <header className="flex flex-col gap-6 border-b border-neutral-200/80 pb-6 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <Link
            to="/pulse"
            className="inline-flex items-center gap-1 text-sm font-semibold text-neutral-600 hover:text-black"
          >
            <span aria-hidden>&lt;</span> {divisionName}
          </Link>
          <h1 className="mt-3 text-3xl font-bold tracking-tight text-black">{communityDisplayName}</h1>
          <p className="mt-2 text-sm italic text-neutral-600">Data Valid Until: January 31, 2026</p>
        </div>
        <div className="flex w-full flex-col gap-3 lg:w-auto lg:max-w-[720px]">
          <div className="flex flex-col items-stretch gap-3 lg:flex-row lg:items-end lg:justify-end">
            <PulseToolbarFilters />
            <div className="flex shrink-0 items-center justify-end gap-1 lg:ml-1 lg:pb-0.5">
              <button
                type="button"
                className="inline-flex h-9 w-9 items-center justify-center rounded-md text-neutral-600 hover:bg-neutral-200/60 hover:text-neutral-900"
                aria-label="Share"
              >
                <IconShare />
              </button>
              <button
                type="button"
                className="inline-flex h-9 w-9 items-center justify-center rounded-md text-neutral-600 hover:bg-neutral-200/60 hover:text-neutral-900"
                aria-label="More options"
              >
                <IconMoreVertical />
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="mt-8 grid grid-cols-1 gap-4 lg:grid-cols-2">
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

      <div className="mt-10 space-y-6">
        <FunnelPerformanceSection columns={funnelColumns} />
        <MetricsTable section={webTrafficLeadTable} />
        {metricSections.map((section, idx) => (
          <MetricsTable key={section.title ?? `metrics-${idx}`} section={section} />
        ))}
      </div>
    </div>
  )
}
