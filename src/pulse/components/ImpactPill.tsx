import type { CommunityImpactCell } from '@/pulse/types'
import { cn } from '@/lib/cn'
import { impactPillClass } from '@/pulse/styles/impact'

type ImpactPillProps = {
  cell: CommunityImpactCell
  className?: string
}

export function ImpactPill({ cell, className }: ImpactPillProps) {
  return (
    <div
      className={cn(
        'flex min-h-[40px] w-full items-center justify-center rounded-md px-2 py-2 text-center text-sm font-medium',
        impactPillClass(cell),
        cell.band === 'n' && 'border border-neutral-200 bg-white',
        className,
      )}
    >
      {cell.label}
    </div>
  )
}
