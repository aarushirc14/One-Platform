import { legendItems } from '@/pulse/styles/impact'

export function PerformanceLegend() {
  return (
    <div className="mt-6 rounded-lg border border-neutral-200 bg-white px-4 py-4 shadow-sm">
      <div className="flex flex-wrap items-center gap-x-4 gap-y-3">
        {legendItems.map((item) => (
          <div key={item.label} className="flex items-center gap-2 text-xs text-neutral-600">
            <span className={cnSquare(item.className)} aria-hidden />
            <span>{item.label}</span>
          </div>
        ))}
      </div>
      <p className="mt-3 text-xs italic text-neutral-500">
        Colors are calculated based on the percent difference between the community stage performance and the
        selected benchmarks.
      </p>
    </div>
  )
}

function cnSquare(colorClass: string) {
  return `inline-block h-3.5 w-3.5 shrink-0 rounded-sm border border-black/5 ${colorClass}`
}
