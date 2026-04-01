import type { DashboardStat } from '@/types'
import { cn } from '@/lib/cn'
import { Card } from './Card'

const trendLabel: Record<DashboardStat['trend'], string> = {
  up: 'Trending up',
  down: 'Trending down',
  flat: 'Stable',
}

type StatTileProps = {
  stat: DashboardStat
}

export function StatTile({ stat }: StatTileProps) {
  return (
    <Card className="relative overflow-hidden">
      <div
        aria-hidden
        className={cn(
          'pointer-events-none absolute -right-6 -top-6 h-24 w-24 rounded-full opacity-60 blur-2xl',
          stat.trend === 'up' && 'bg-emerald-200',
          stat.trend === 'down' && 'bg-rose-200',
          stat.trend === 'flat' && 'bg-indigo-200',
        )}
      />
      <p className="text-sm font-medium text-slate-500">{stat.label}</p>
      <p className="mt-2 text-3xl font-semibold tracking-tight text-slate-900">{stat.value}</p>
      <p className="mt-1 text-xs font-medium text-slate-500">
        <span className="sr-only">{trendLabel[stat.trend]}.</span>
        {stat.hint}
      </p>
    </Card>
  )
}
