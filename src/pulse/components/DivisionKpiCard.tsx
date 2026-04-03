import type { DivisionKpi } from '@/pulse/types'
import { IconInfo } from '@/pulse/components/icons'
import { cn } from '@/lib/cn'

/** Match Division Performance semantic reds/greens (e.g. Community Performance sales vs target). */
const metricNegative = 'text-red-600'
const metricPositive = 'text-emerald-700'
const titleMuted = 'text-neutral-600'
const footerMuted = 'text-neutral-600'

type DivisionKpiCardProps = {
  kpi: DivisionKpi
}

export function DivisionKpiCard({ kpi }: DivisionKpiCardProps) {
  const neg = kpi.headlineTone === 'negative'
  const pos = kpi.headlineTone === 'positive'
  const mainCls = neg ? metricNegative : metricPositive
  const footerLeadCls = neg ? metricNegative : pos ? metricPositive : 'text-neutral-900'

  return (
    <div className="flex h-full min-h-[10rem] flex-col rounded-lg border border-neutral-200 bg-white p-4 sm:min-h-[10.5rem] sm:p-5">
      <div className="flex items-start justify-between gap-3">
        <h3 className={cn('min-w-0 flex-1 text-sm font-normal leading-snug', titleMuted)}>
          {kpi.title}
        </h3>
        <button
          type="button"
          className="shrink-0 text-neutral-400 transition-colors hover:text-neutral-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-400"
          title={kpi.infoTooltip}
          aria-label={kpi.infoTooltip}
        >
          <IconInfo className="h-4 w-4" />
        </button>
      </div>

      <div className="mt-3 flex min-w-0 flex-wrap items-baseline gap-x-1.5 gap-y-0.5">
        <span className={cn('text-4xl font-bold tabular-nums tracking-tight', mainCls)}>
          {kpi.headlineValue}
        </span>
        <span className={cn('text-sm font-normal tabular-nums', mainCls)}>{kpi.headlineUnit}</span>
        <span className={cn('text-sm font-normal tabular-nums', mainCls)}>{kpi.headlinePct}</span>
      </div>

      <div className="mt-auto border-t border-neutral-200 pt-3">
        <p className="text-sm leading-normal">
          <span className={cn('font-bold tabular-nums', footerLeadCls)}>{kpi.footerLead}</span>
          <span className={footerMuted}>{kpi.footerMid}</span>
          <span className="font-bold tabular-nums text-neutral-900">{kpi.footerTarget}</span>
          <span className={footerMuted}>{kpi.footerEnd}</span>
        </p>
      </div>
    </div>
  )
}
