import type { CommunitiesMetricsMode, DivisionCommunityRow } from '@/pulse/types'
import { ImpactPill } from '@/pulse/components/ImpactPill'
import { impactCellForMode } from '@/pulse/lib/communitiesMetricsDisplay'
import {
  pulseTableBase,
  pulseTableCard,
  pulseTableCardTitleBar,
  pulseTableRowEven,
  pulseTableScroll,
  pulseTableTd,
  pulseTableTdCompact,
  pulseTableTh,
} from '@/pulse/ui/pulseTable'
import { cn } from '@/lib/cn'

type DivisionCommunitiesSummaryTableProps = {
  row: DivisionCommunityRow
  metricsMode: CommunitiesMetricsMode
}

export function DivisionCommunitiesSummaryTable({ row, metricsMode }: DivisionCommunitiesSummaryTableProps) {
  return (
    <div className={pulseTableCard}>
      <div className={pulseTableCardTitleBar}>
        <h2 id="division-summary-heading" className="text-base font-semibold text-neutral-900">
          {row.name}
        </h2>
        <p className="mt-0.5 text-xs text-neutral-600">Rolled up from all communities in the table below.</p>
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
            <tr className={pulseTableRowEven}>
              <td className={pulseTableTd('left')}>
                <span className="font-semibold text-neutral-950">{row.name}</span>
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
          </tbody>
        </table>
      </div>
    </div>
  )
}

function cnGap(tone: DivisionCommunityRow['gapTone']) {
  const base = pulseTableTd('center', 'font-medium tabular-nums')
  if (tone === 'negative') return cn(base, 'text-red-600')
  if (tone === 'positive') return cn(base, 'text-emerald-700')
  return cn(base, 'text-neutral-900')
}
