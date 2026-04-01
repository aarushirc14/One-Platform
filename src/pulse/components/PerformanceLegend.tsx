import { legendItems } from '@/pulse/styles/impact'
import { cn } from '@/lib/cn'

type PerformanceLegendProps = {
  /** When true, sits inside another card (no outer border/radius/shadow). */
  embedded?: boolean
}

export function PerformanceLegend({ embedded }: PerformanceLegendProps) {
  return (
    <div
      className={cn(
        embedded
          ? 'border-t border-neutral-200 bg-white px-4 py-5 sm:px-6'
          : 'rounded-xl border border-neutral-200 bg-white px-4 py-5 shadow-sm sm:px-6',
      )}
    >
      <div className="flex flex-wrap items-center gap-x-5 gap-y-2.5">
        {legendItems.map((item) => (
          <div key={item.label} className="flex items-center gap-2 text-xs text-neutral-600">
            <span className={cnSquare(item.className)} aria-hidden />
            <span className="leading-snug">{item.label}</span>
          </div>
        ))}
      </div>
      <p className="mt-4 text-xs italic leading-relaxed text-neutral-500">
        Colors are calculated based on the percent difference between the community stage performance and the
        selected benchmarks.
      </p>
    </div>
  )
}

function cnSquare(colorClass: string) {
  return `inline-block h-3.5 w-3.5 shrink-0 rounded-sm ring-1 ring-black/10 ${colorClass}`
}
