import type { CommunityImpactCell, ImpactBand } from '@/pulse/types'

const bandClasses: Record<ImpactBand, string> = {
  d7: 'bg-[#7f1d1d] text-white',
  d6: 'bg-[#b91c1c] text-white',
  d5: 'bg-[#ef4444] text-white',
  d4: 'bg-[#fca5a5] text-[#450a0a]',
  d3: 'bg-[#fdba74] text-[#7c2d12]',
  d2: 'bg-[#fed7aa] text-[#7c2d12]',
  d1: 'bg-amber-100 text-amber-900',
  n: 'bg-transparent text-neutral-900',
  u1: 'bg-[#bbf7d0] text-[#14532d]',
  u2: 'bg-[#86efac] text-[#14532d]',
  u3: 'bg-[#4ade80] text-[#052e16]',
  u4: 'bg-[#22c55e] text-white',
  u5: 'bg-[#15803d] text-white',
  u6: 'bg-[#166534] text-white',
  u7: 'bg-[#14532d] text-white',
}

export function impactPillClass(cell: CommunityImpactCell): string {
  return bandClasses[cell.band]
}

export const legendItems: { className: string; label: string }[] = [
  { className: 'bg-[#7f1d1d]', label: 'below -75%' },
  { className: 'bg-[#b91c1c]', label: '-75% to -50%' },
  { className: 'bg-[#fdba74]', label: '-50% to -25%' },
  { className: 'bg-neutral-200', label: '-25% to +25%' },
  { className: 'bg-[#bbf7d0]', label: '+25% to +50%' },
  { className: 'bg-[#22c55e]', label: '+50% to +75%' },
  { className: 'bg-[#14532d]', label: '+75% and above' },
]
