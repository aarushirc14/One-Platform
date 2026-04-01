import { Link } from 'react-router-dom'
import type { DivisionCommunityRow } from '@/pulse/types'
import { ImpactPill } from '@/pulse/components/ImpactPill'
import { PerformanceLegend } from '@/pulse/components/PerformanceLegend'
import { SalesModeToggle } from '@/pulse/components/SalesModeToggle'
import { divisionName } from '@/pulse/mock/division'

type CommunitiesTableProps = {
  rows: DivisionCommunityRow[]
}

export function CommunitiesTable({ rows }: CommunitiesTableProps) {
  return (
    <div className="overflow-hidden rounded-lg border border-neutral-200 bg-white shadow-sm">
      <div className="flex flex-col gap-4 border-b border-neutral-200 bg-neutral-50/80 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-5">
        <h2 className="text-base font-semibold text-neutral-900">{divisionName} Communities</h2>
        <SalesModeToggle className="w-full min-w-0 sm:w-auto sm:shrink-0 sm:justify-end" />
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-[920px] w-full border-collapse text-sm">
          <thead>
            <tr className="border-b border-neutral-200 bg-neutral-50 text-left text-sm font-medium text-neutral-600">
              <th className="whitespace-nowrap px-4 py-3.5 sm:px-5">Community</th>
              <th className="whitespace-nowrap px-4 py-3.5 sm:px-5">Sales Gap</th>
              <th className="whitespace-nowrap px-4 py-3.5 sm:px-5">Sales</th>
              <th className="whitespace-nowrap px-4 py-3.5 sm:px-5">Target</th>
              <th className="whitespace-nowrap px-4 py-3.5 text-center sm:px-5">Web Traffic</th>
              <th className="whitespace-nowrap px-4 py-3.5 text-center sm:px-5">Total Leads</th>
              <th className="whitespace-nowrap px-4 py-3.5 text-center sm:px-5">First Visits</th>
              <th className="whitespace-nowrap px-4 py-3.5 text-center sm:px-5">Sales</th>
            </tr>
          </thead>
          <tbody className="bg-white text-neutral-900">
            {rows.map((row) => (
              <tr key={row.id} className="border-b border-neutral-100 last:border-b-0">
                <td className="px-4 py-3.5 sm:px-5">
                  <Link
                    to={`/pulse/community/${row.id}`}
                    className="font-semibold text-neutral-950 underline decoration-neutral-400 underline-offset-2 hover:text-black"
                  >
                    {row.name}
                  </Link>
                </td>
                <td className={cnGap(row.gapTone)}>{row.salesGap}</td>
                <td className="px-4 py-3.5 tabular-nums sm:px-5">{row.sales}</td>
                <td className="px-4 py-3.5 tabular-nums sm:px-5">{row.target}</td>
                <td className="px-3 py-2.5 align-middle sm:px-4">
                  <ImpactPill cell={row.webTraffic} />
                </td>
                <td className="px-3 py-2.5 align-middle sm:px-4">
                  <ImpactPill cell={row.totalLeads} />
                </td>
                <td className="px-3 py-2.5 align-middle sm:px-4">
                  <ImpactPill cell={row.firstVisits} />
                </td>
                <td className="px-3 py-2.5 align-middle sm:px-4">
                  <ImpactPill cell={row.salesImpact} />
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
  const base = 'px-4 py-3.5 font-medium tabular-nums sm:px-5'
  if (tone === 'negative') return `${base} text-red-600`
  if (tone === 'positive') return `${base} text-emerald-600`
  return `${base} text-neutral-900`
}
