import { IconInfo } from '@/pulse/components/icons'
import { cn } from '@/lib/cn'

type CommunityKpiCardProps = {
  title: string
  headline: string
  pct: string
  pctTone: 'negative' | 'positive'
  subline: string
  infoTooltip: string
}

/** Shell + type align with `DivisionKpiCard` / Division Performance KPI styling. */
export function CommunityKpiCard({ title, headline, pct, pctTone, subline, infoTooltip }: CommunityKpiCardProps) {
  const pctCls = pctTone === 'negative' ? 'text-red-600' : 'text-emerald-700'

  return (
    <div className="flex h-full min-h-[10rem] flex-col rounded-lg border border-neutral-200 bg-white p-4 sm:min-h-[10.5rem] sm:p-5">
      <div className="flex items-start justify-between gap-3">
        <h3 className="min-w-0 flex-1 text-sm font-normal leading-snug text-neutral-600">{title}</h3>
        <button
          type="button"
          className="shrink-0 text-neutral-400 transition-colors hover:text-neutral-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-400"
          title={infoTooltip}
          aria-label={infoTooltip}
        >
          <IconInfo className="h-4 w-4" />
        </button>
      </div>
      <p className="mt-3 text-3xl font-bold tabular-nums tracking-tight text-neutral-900 sm:text-4xl">
        {headline}{' '}
        <span className={cn('text-base font-semibold tabular-nums sm:text-lg', pctCls)}>({pct})</span>
      </p>
      <p className="mt-1.5 text-sm leading-relaxed text-neutral-600">{subline}</p>
    </div>
  )
}
