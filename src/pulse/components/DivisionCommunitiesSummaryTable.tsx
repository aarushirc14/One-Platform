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

const PILL_COLUMNS = [
  { key: 'webTraffic', label: 'Web Traffic' },
  { key: 'totalLeads', label: 'Total Leads' },
  { key: 'firstVisits', label: 'First Visits' },
  { key: 'salesImpact', label: 'Sales Impact' },
] as const

export function DivisionCommunitiesSummaryTable({ row, metricsMode }: DivisionCommunitiesSummaryTableProps) {
  return (
    <div className={pulseTableCard}>
      <div className={pulseTableCardTitleBar}>
        <h2 id="division-summary-heading" className="text-base font-semibold text-neutral-900">
          {row.name}
        </h2>
        <p className="mt-0.5 text-xs text-neutral-600">Rolled up from all communities in the table below.</p>
      </div>

      {/* ── Mobile summary card (below lg) ── */}
      <div className="px-4 py-4 lg:hidden">
        <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-wide text-neutral-500">Sales Gap</p>
            <p className={cn('mt-0.5 text-sm font-semibold tabular-nums', gapTextClass(row.gapTone))}>
              {row.salesGap}
            </p>
          </div>
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-wide text-neutral-500">Sales</p>
            <p className="mt-0.5 text-sm font-semibold tabular-nums text-neutral-950">{row.sales}</p>
          </div>
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-wide text-neutral-500">Target</p>
            <p className="mt-0.5 text-sm font-semibold tabular-nums text-neutral-950">{row.target}</p>
          </div>
        </div>
        <div className="mt-4 grid grid-cols-2 gap-x-3 gap-y-2">
          {PILL_COLUMNS.map(({ key, label }) => (
            <div key={key}>
              <p className="mb-1 text-[10px] font-semibold uppercase tracking-wide text-neutral-500">
                {label}
              </p>
              <ImpactPill cell={impactCellForMode(row[key], metricsMode)} />
            </div>
          ))}
        </div>
      </div>

      {/* ── Desktop table (lg+) ── */}
      <div className="hidden lg:block">
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
    </div>
  )
}

function gapTextClass(tone: DivisionCommunityRow['gapTone']) {
  if (tone === 'negative') return 'text-red-600'
  if (tone === 'positive') return 'text-emerald-700'
  return 'text-neutral-900'
}

function cnGap(tone: DivisionCommunityRow['gapTone']) {
  const base = pulseTableTd('center', 'font-medium tabular-nums')
  if (tone === 'negative') return cn(base, 'text-red-600')
  if (tone === 'positive') return cn(base, 'text-emerald-700')
  return cn(base, 'text-neutral-900')
}
