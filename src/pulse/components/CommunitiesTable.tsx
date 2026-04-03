import { Link } from 'react-router-dom'
import type { CommunitiesMetricsMode, DivisionCommunityRow } from '@/pulse/types'
import { ImpactPill } from '@/pulse/components/ImpactPill'
import { PerformanceLegend } from '@/pulse/components/PerformanceLegend'
import { impactCellForMode } from '@/pulse/lib/communitiesMetricsDisplay'
import { openhomesCommunityPath } from '@/pulse/constants/routes'
import { divisionName } from '@/pulse/data/division'
import {
  pulseTableBase,
  pulseTableCard,
  pulseTableCardTitleBar,
  pulseTableRowEven,
  pulseTableRowOdd,
  pulseTableScroll,
  pulseTableTd,
  pulseTableTdCompact,
  pulseTableTh,
} from '@/pulse/ui/pulseTable'
import { cn } from '@/lib/cn'

type CommunitiesTableProps = {
  rows: DivisionCommunityRow[]
  metricsMode: CommunitiesMetricsMode
}

export function CommunitiesTable({ rows, metricsMode }: CommunitiesTableProps) {
  return (
    <div className={pulseTableCard}>
      <div className={pulseTableCardTitleBar}>
        <h2 className="text-base font-semibold text-neutral-900">{divisionName} Communities</h2>
      </div>

      <div className={pulseTableScroll}>
        <table className={cn('min-w-[920px]', pulseTableBase)}>
          <thead>
            <tr>
              <th className={pulseTableTh('left', 'whitespace-nowrap')}>Community</th>
              <th className={pulseTableTh('center', 'whitespace-nowrap')}>Sales Gap</th>
              <th className={pulseTableTh('center', 'whitespace-nowrap')}>Sales</th>
              <th className={pulseTableTh('center', 'whitespace-nowrap')}>Target</th>
              <th className={pulseTableTh('center', 'whitespace-nowrap')}>Web Traffic</th>
              <th className={pulseTableTh('center', 'whitespace-nowrap')}>Total Leads</th>
              <th className={pulseTableTh('center', 'whitespace-nowrap')}>First Visits</th>
              <th className={pulseTableTh('center', 'whitespace-nowrap')}>Sales</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, rowIndex) => (
              <tr key={row.id} className={cn(rowIndex % 2 === 1 ? pulseTableRowOdd : pulseTableRowEven)}>
                <td className={pulseTableTd('left')}>
                  <Link
                    to={openhomesCommunityPath(row.id)}
                    className="font-semibold text-blue-700 underline decoration-blue-300 underline-offset-2 transition-colors hover:text-blue-800 hover:decoration-blue-500"
                  >
                    {row.name}
                  </Link>
                </td>
                <td className={cnGap(row.gapTone)}>{row.salesGap}</td>
                <td className={pulseTableTd('center', 'tabular-nums')}>{row.sales}</td>
                <td className={pulseTableTd('center', 'tabular-nums')}>{row.target}</td>
                <td className={pulseTableTdCompact('center', 'align-middle')}>
                  <ImpactPill cell={impactCellForMode(row.webTraffic, metricsMode)} />
                </td>
                <td className={pulseTableTdCompact('center', 'align-middle')}>
                  <ImpactPill cell={impactCellForMode(row.totalLeads, metricsMode)} />
                </td>
                <td className={pulseTableTdCompact('center', 'align-middle')}>
                  <ImpactPill cell={impactCellForMode(row.firstVisits, metricsMode)} />
                </td>
                <td className={pulseTableTdCompact('center', 'align-middle')}>
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
  const base = pulseTableTd('center', 'font-medium tabular-nums')
  if (tone === 'negative') return cn(base, 'text-red-600')
  if (tone === 'positive') return cn(base, 'text-emerald-700')
  return cn(base, 'text-neutral-900')
}
