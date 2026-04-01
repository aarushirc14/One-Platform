import { IconInfo } from '@/pulse/components/icons'
import { cn } from '@/lib/cn'

type CommunityKpiCardProps = {
  title: string
  headline: string
  pct: string
  pctTone: 'negative' | 'positive'
  subline: string
}

export function CommunityKpiCard({ title, headline, pct, pctTone, subline }: CommunityKpiCardProps) {
  return (
    <div className="relative rounded-lg border border-neutral-200 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <h3 className="pr-6 text-sm font-semibold text-neutral-900">{title}</h3>
        <button
          type="button"
          className="absolute right-4 top-4 inline-flex h-7 w-7 items-center justify-center rounded-md text-neutral-400 hover:bg-neutral-100 hover:text-neutral-700"
          aria-label="KPI details"
        >
          <IconInfo />
        </button>
      </div>
      <p className="mt-4 text-4xl font-bold tracking-tight text-neutral-900">
        {headline}{' '}
        <span className={cn('text-lg font-semibold', pctTone === 'negative' ? 'text-red-600' : 'text-emerald-600')}>
          ({pct})
        </span>
      </p>
      <p className="mt-2 text-sm text-neutral-600">{subline}</p>
    </div>
  )
}
