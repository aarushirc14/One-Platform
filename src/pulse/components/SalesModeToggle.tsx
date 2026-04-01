import { IconInfo } from '@/pulse/components/icons'
import { cn } from '@/lib/cn'

export function SalesModeToggle({ className }: { className?: string }) {
  return (
    <div className={cn('flex items-center gap-2', className)}>
      <div
        className="inline-flex h-9 items-center rounded-lg bg-neutral-200/90 p-1 text-xs font-semibold"
        role="presentation"
      >
        <span className="px-3 py-1.5 text-neutral-600">Conversion Rates</span>
        <span className="rounded-md bg-black px-3 py-1.5 text-white shadow-sm">Sales Impact</span>
      </div>
      <button
        type="button"
        className="inline-flex h-8 w-8 items-center justify-center rounded-md text-neutral-500 hover:bg-neutral-100 hover:text-neutral-800"
        aria-label="About conversion and sales impact"
      >
        <IconInfo className="text-neutral-500" />
      </button>
    </div>
  )
}
