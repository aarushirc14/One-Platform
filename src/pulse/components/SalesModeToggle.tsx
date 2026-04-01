import { IconInfo } from '@/pulse/components/icons'
import { cn } from '@/lib/cn'

type SalesModeToggleProps = {
  className?: string
}

export function SalesModeToggle({ className }: SalesModeToggleProps) {
  return (
    <div className={cn('flex flex-wrap items-center gap-2', className)}>
      <div
        className="inline-flex h-9 max-w-full items-center rounded-lg bg-neutral-200 p-1 text-xs font-semibold"
        role="presentation"
      >
        <span className="select-none px-3 py-1.5 text-neutral-600">Conversion Rates</span>
        <span className="select-none rounded-md bg-neutral-950 px-3 py-1.5 text-white shadow-sm">
          Sales Impact
        </span>
      </div>
      <button
        type="button"
        className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-neutral-500 transition-colors hover:bg-neutral-100 hover:text-neutral-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-400"
        aria-label="About conversion and sales impact"
      >
        <IconInfo className="text-neutral-500" />
      </button>
    </div>
  )
}
