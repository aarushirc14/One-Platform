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

export function CommunityKpiCard({ title, headline, pct, pctTone, subline, infoTooltip }: CommunityKpiCardProps) {
  return (
    <div className="relative rounded-xl border border-neutral-200/90 bg-white p-4 shadow-sm sm:p-5">
      <div className="flex items-start justify-between gap-3">
        <h3 className="pr-8 text-sm font-semibold leading-snug text-neutral-900">{title}</h3>
        <button
          type="button"
          className="absolute right-3 top-3 inline-flex h-8 w-8 items-center justify-center rounded-lg text-neutral-400 transition-colors hover:bg-neutral-100 hover:text-neutral-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-400"
          title={infoTooltip}
          aria-label={infoTooltip}
        >
          <IconInfo />
        </button>
      </div>
      <p className="mt-3 text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl">
        {headline}{' '}
        <span
          className={cn(
            'text-base font-semibold sm:text-lg',
            pctTone === 'negative' ? 'text-red-600' : 'text-emerald-600',
          )}
        >
          ({pct})
        </span>
      </p>
      <p className="mt-1.5 text-sm leading-relaxed text-neutral-600">{subline}</p>
    </div>
  )
}
