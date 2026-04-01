import type { SalesForecastSummaryCardModel } from '@/pulse/mock/divisionPerformanceReport'
import { cn } from '@/lib/cn'

export function SalesForecastSummaryCard({
  edgeTone,
  label,
  primaryStat,
  primaryStatTone,
  detailLine,
  footerSmall,
  presoldValue,
  specValue,
  specRatioLabel,
}: SalesForecastSummaryCardModel) {
  const edgeGreen = edgeTone === 'positive'
  const statGreen = primaryStatTone === 'positive'

  return (
    <div
      className={cn(
        'flex min-h-0 min-w-0 overflow-hidden rounded-lg border border-neutral-200 bg-white shadow-sm',
      )}
    >
      <div
        className={cn('w-1 shrink-0 sm:w-1.5', edgeGreen ? 'bg-emerald-500' : 'bg-red-500')}
        aria-hidden
      />
      <div className="flex min-w-0 flex-1 flex-col sm:flex-row">
        <div className="min-w-0 flex-1 border-b border-neutral-100 p-4 sm:border-b-0 sm:border-r sm:p-5">
          <p className="text-xs font-semibold uppercase tracking-wide text-neutral-500">{label}</p>
          <p
            className={cn(
              'mt-3 text-xl font-bold leading-snug tracking-tight sm:text-2xl',
              statGreen ? 'text-emerald-600' : 'text-red-600',
            )}
          >
            {primaryStat}
          </p>
          <p className="mt-2 text-sm text-neutral-500">{detailLine}</p>
          {footerSmall ? <p className="mt-1 text-[11px] text-neutral-400">{footerSmall}</p> : null}
        </div>
        <div className="min-w-0 flex-1 bg-sky-50/70 p-4 sm:p-5">
          <ul className="space-y-2.5 text-sm text-neutral-600">
            <li className="flex items-baseline gap-2">
              <span
                className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-blue-500"
                aria-hidden
              />
              <span>
                Presold:{' '}
                <span className="font-semibold tabular-nums text-neutral-900">{presoldValue}</span>
              </span>
            </li>
            <li className="flex items-baseline gap-2">
              <span
                className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-amber-400"
                aria-hidden
              />
              <span>
                Spec:{' '}
                <span className="font-semibold tabular-nums text-neutral-900">{specValue}</span>
              </span>
            </li>
          </ul>
          <p className="mt-3 text-xs text-neutral-500">{specRatioLabel}</p>
        </div>
      </div>
    </div>
  )
}
