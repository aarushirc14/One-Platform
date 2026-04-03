import { IconInfo } from '@/pulse/components/icons'
import { INFO_SALES_IMPACT } from '@/pulse/constants/infoTooltips'
import { cn } from '@/lib/cn'
import type { CommunitiesMetricsMode } from '@/pulse/types'

type SalesModeToggleProps = {
  mode: CommunitiesMetricsMode
  onModeChange: (mode: CommunitiesMetricsMode) => void
  className?: string
}

export function SalesModeToggle({ mode, onModeChange, className }: SalesModeToggleProps) {
  const salesImpact = mode === 'salesImpact'

  return (
    <div
      className={cn(
        'flex flex-wrap items-center gap-2 rounded-lg bg-neutral-100/90 px-3 py-1.5 shadow-sm ring-1 ring-neutral-300/80 sm:gap-2.5',
        className,
      )}
    >
      <span
        className={cn(
          'text-sm transition-colors',
          !salesImpact ? 'font-semibold text-neutral-950' : 'font-medium text-neutral-500',
        )}
      >
        Conversion Rates
      </span>

      <button
        type="button"
        role="switch"
        aria-checked={salesImpact}
        aria-label={
          salesImpact
            ? 'Showing sales impact. Switch to conversion rates.'
            : 'Showing conversion rates. Switch to sales impact.'
        }
        onClick={() => onModeChange(salesImpact ? 'conversion' : 'salesImpact')}
        className={cn(
          'flex h-7 w-12 shrink-0 items-center overflow-hidden rounded-full border border-neutral-700 bg-neutral-600 p-0.5',
          'shadow-[inset_0_1px_3px_rgba(0,0,0,0.35)] transition-[background-color,border-color] hover:bg-neutral-700',
          'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-900/50',
        )}
      >
        <span
          className={cn(
            'h-6 w-6 shrink-0 rounded-full bg-white shadow-md ring-1 ring-black/10 transition-transform duration-200 ease-out',
            salesImpact ? 'translate-x-5' : 'translate-x-0',
          )}
        />
      </button>

      <span
        className={cn(
          'text-sm transition-colors',
          salesImpact ? 'font-semibold text-neutral-950' : 'font-medium text-neutral-500',
        )}
      >
        Sales Impact
      </span>

      <button
        type="button"
        className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-neutral-500 transition-colors hover:bg-neutral-200/80 hover:text-neutral-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-400"
        title={INFO_SALES_IMPACT}
        aria-label={INFO_SALES_IMPACT}
      >
        <IconInfo className="h-4 w-4" />
      </button>
    </div>
  )
}
