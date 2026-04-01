import { Link } from 'react-router-dom'
import type { DivisionCommunityRow } from '@/pulse/types'
import { ImpactPill } from '@/pulse/components/ImpactPill'
import { SalesModeToggle } from '@/pulse/components/SalesModeToggle'
import { divisionName } from '@/pulse/mock/division'

type CommunitiesTableProps = {
  rows: DivisionCommunityRow[]
}

export function CommunitiesTable({ rows }: CommunitiesTableProps) {
  return (
    <div className="rounded-lg border border-neutral-200 bg-white shadow-sm">
      <div className="flex flex-col gap-4 border-b border-neutral-200 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-5">
        <h2 className="text-base font-semibold text-neutral-900">{divisionName} Communities</h2>
        <SalesModeToggle />
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-[920px] w-full border-collapse text-sm">
          <thead>
            <tr className="border-b border-neutral-200 bg-neutral-50/80 text-left text-xs font-semibold uppercase tracking-wide text-neutral-500">
              <th className="px-4 py-3 font-semibold">Community</th>
              <th className="px-4 py-3 font-semibold">Sales Gap</th>
              <th className="px-4 py-3 font-semibold">Sales</th>
              <th className="px-4 py-3 font-semibold">Target</th>
              <th className="px-4 py-3 text-center font-semibold">Web Traffic</th>
              <th className="px-4 py-3 text-center font-semibold">Total Leads</th>
              <th className="px-4 py-3 text-center font-semibold">First Visits</th>
              <th className="px-4 py-3 text-center font-semibold">Sales</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.id} className="border-b border-neutral-100 last:border-b-0">
                <td className="px-4 py-3 font-medium text-neutral-900">
                  <Link
                    to={`/pulse/community/${row.id}`}
                    className="text-neutral-900 underline-offset-2 hover:text-black hover:underline"
                  >
                    {row.name}
                  </Link>
                </td>
                <td
                  className={cnGap(row.gapTone)}
                >
                  {row.salesGap}
                </td>
                <td className="px-4 py-3 text-neutral-900">{row.sales}</td>
                <td className="px-4 py-3 text-neutral-900">{row.target}</td>
                <td className="px-4 py-2 align-middle">
                  <ImpactPill cell={row.webTraffic} />
                </td>
                <td className="px-4 py-2 align-middle">
                  <ImpactPill cell={row.totalLeads} />
                </td>
                <td className="px-4 py-2 align-middle">
                  <ImpactPill cell={row.firstVisits} />
                </td>
                <td className="px-4 py-2 align-middle">
                  <ImpactPill cell={row.salesImpact} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

function cnGap(tone: DivisionCommunityRow['gapTone']) {
  const base = 'px-4 py-3 font-medium tabular-nums'
  if (tone === 'negative') return `${base} text-red-600`
  if (tone === 'positive') return `${base} text-emerald-600`
  return `${base} text-neutral-900`
}
