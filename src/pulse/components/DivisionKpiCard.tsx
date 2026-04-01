import type { DivisionKpi } from '@/pulse/types'
import { IconInfo } from '@/pulse/components/icons'
import { cn } from '@/lib/cn'

type DivisionKpiCardProps = {
  kpi: DivisionKpi
}

export function DivisionKpiCard({ kpi }: DivisionKpiCardProps) {
  const headlineNeg = kpi.headlineTone === 'negative'
  const subNeg = kpi.sublineTone === 'negative'
  const subMuted = kpi.sublineTone === 'muted'

  return (
    <div className="relative rounded-lg border border-neutral-200 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <h3 className="pr-6 text-sm font-semibold text-neutral-900">{kpi.title}</h3>
        <button
          type="button"
          className="absolute right-4 top-4 inline-flex h-7 w-7 items-center justify-center rounded-md text-neutral-400 hover:bg-neutral-100 hover:text-neutral-700"
          aria-label="KPI details"
        >
          <IconInfo />
        </button>
      </div>
      <p
        className={cn(
          'mt-4 text-2xl font-bold tracking-tight sm:text-[28px] sm:leading-tight',
          headlineNeg ? 'text-red-600' : 'text-emerald-600',
        )}
      >
        {kpi.headline}
      </p>
      <p
        className={cn(
          'mt-2 text-sm font-medium',
          subNeg && 'text-red-600',
          subMuted && 'text-neutral-500',
          !subNeg && !subMuted && 'text-emerald-600',
        )}
      >
        {kpi.subline}
      </p>
    </div>
  )
}
