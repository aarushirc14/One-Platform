import { Link } from 'react-router-dom'
import type { CommunitiesMetricsMode, DivisionCommunityRow } from '@/pulse/types'
import { ImpactPill } from '@/pulse/components/ImpactPill'
import { PerformanceLegend } from '@/pulse/components/PerformanceLegend'
import { impactCellForMode } from '@/pulse/lib/communitiesMetricsDisplay'
import { openhomesCommunityPath } from '@/pulse/constants/routes'
import { divisionName } from '@/pulse/mock/division'

type CommunitiesTableProps = {
  rows: DivisionCommunityRow[]
  metricsMode: CommunitiesMetricsMode
}

export function CommunitiesTable({ rows, metricsMode }: CommunitiesTableProps) {
  return (
    <div className="overflow-hidden rounded-lg border border-neutral-200 bg-white shadow-sm">
      <div className="border-b border-neutral-200 bg-neutral-50/80 px-4 py-2.5 sm:px-5 sm:py-3">
        <h2 className="text-base font-semibold text-neutral-900">{divisionName} Communities</h2>
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
          <tbody className="bg-white text-neutral-900">
            {rows.map((row) => (
              <tr key={row.id} className="border-b border-neutral-100 last:border-b-0">
                <td className="px-4 py-2.5 text-left sm:px-5">
                  <Link
                    to={openhomesCommunityPath(row.id)}
                    className="font-semibold text-blue-700 underline decoration-blue-300 underline-offset-2 transition-colors hover:text-blue-800 hover:decoration-blue-500"
                  >
                    {row.name}
                  </Link>
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
            ))}
          </tbody>
        </table>
      </div>
      <PerformanceLegend embedded />
    </div>
  )
}

function cnGap(tone: DivisionCommunityRow['gapTone']) {
  const base = 'px-4 py-2.5 text-center font-medium tabular-nums sm:px-5'
  if (tone === 'negative') return `${base} text-red-600`
  if (tone === 'positive') return `${base} text-emerald-600`
  return `${base} text-neutral-900`
}
