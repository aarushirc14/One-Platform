import type { CommunitiesMetricsMode, CommunityImpactCell } from '@/pulse/types'

export function impactCellForMode(
  cell: CommunityImpactCell,
  mode: CommunitiesMetricsMode,
): CommunityImpactCell {
  if (mode === 'conversion' && cell.conversionLabel) {
    return { ...cell, label: cell.conversionLabel }
  }
  return cell
}
