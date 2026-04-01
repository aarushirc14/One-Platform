import type { CommunitiesMetricsMode, DivisionCommunityRow } from '@/pulse/types'
import { ImpactPill } from '@/pulse/components/ImpactPill'
import { impactCellForMode } from '@/pulse/lib/communitiesMetricsDisplay'
import { cn } from '@/lib/cn'

type DivisionCommunitiesSummaryTableProps = {
  row: DivisionCommunityRow
  metricsMode: CommunitiesMetricsMode
}

export function DivisionCommunitiesSummaryTable({ row, metricsMode }: DivisionCommunitiesSummaryTableProps) {
  return (
    <div className="overflow-hidden rounded-lg border border-neutral-200 bg-white shadow-sm">
      <div className="border-b border-neutral-200 bg-neutral-50/80 px-4 py-2.5 sm:px-5 sm:py-3">
        <h2 id="division-summary-heading" className="text-base font-semibold text-neutral-900">
          {row.name}
        </h2>
        <p className="mt-0.5 text-xs text-neutral-600">
          Rolled up from all communities in the table below.
        </p>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-[920px] w-full border-collapse text-sm">
          <thead>
            <tr className="border-b border-neutral-200 bg-neutral-50 text-center text-sm font-medium text-neutral-600">
              <th className="whitespace-nowrap px-4 py-2.5 text-left sm:px-5">Community</th>
              <th className="whitespace-nowrap px-4 py-2.5 sm:px-5">Sales Gap</th>
              <th className="whitespace-nowrap px-4 py-2.5 sm:px-5">Sales</th>
              <th className="whitespace-nowrap px-4 py-2.5 sm:px-5">Target</th>
              <th className="whitespace-nowrap px-4 py-2.5 sm:px-5">Web Traffic</th>
              <th className="whitespace-nowrap px-4 py-2.5 sm:px-5">Total Leads</th>
              <th className="whitespace-nowrap px-4 py-2.5 sm:px-5">First Visits</th>
              <th className="whitespace-nowrap px-4 py-2.5 sm:px-5">Sales</th>
            </tr>
          </thead>
          <tbody className="bg-neutral-50/60 text-neutral-900">
            <tr className="border-b border-neutral-100">
              <td className="px-4 py-2.5 text-left sm:px-5">
                <span className="font-semibold text-neutral-950">{row.name}</span>
              </td>
              <td className={cnGap(row.gapTone)}>{row.salesGap}</td>
              <td className="px-4 py-2.5 text-center tabular-nums sm:px-5">{row.sales}</td>
              <td className="px-4 py-2.5 text-center tabular-nums sm:px-5">{row.target}</td>
              <td className="px-3 py-1.5 align-middle sm:px-4">
                <ImpactPill cell={impactCellForMode(row.webTraffic, metricsMode)} />
              </td>
              <td className="px-3 py-1.5 align-middle sm:px-4">
                <ImpactPill cell={impactCellForMode(row.totalLeads, metricsMode)} />
              </td>
              <td className="px-3 py-1.5 align-middle sm:px-4">
                <ImpactPill cell={impactCellForMode(row.firstVisits, metricsMode)} />
              </td>
              <td className="px-3 py-1.5 align-middle sm:px-4">
                <ImpactPill cell={impactCellForMode(row.salesImpact, metricsMode)} />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}

function cnGap(tone: DivisionCommunityRow['gapTone']) {
  const base = 'px-4 py-2.5 text-center font-medium tabular-nums sm:px-5'
  if (tone === 'negative') return cn(base, 'text-red-600')
  if (tone === 'positive') return cn(base, 'text-emerald-600')
  return cn(base, 'text-neutral-900')
}
