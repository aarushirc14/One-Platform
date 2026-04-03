/**
 * Company palette for data visuals only (chart lines, bars, areas, SVG fills, chart legends).
 * Do not use for semantic status (red / amber / green) or generic UI (buttons, nav).
 *
 * Conventions:
 * - `actualPrimary` — main actual / current-year series (and aligned forecast stroke where it continues actuals).
 * - `actualSecondary` — second concrete series (e.g. spec vs presale, prior year emphasis).
 * - `target` — targets, budgets, reference markers (same hue across charts).
 * - `forecastAccent` — forecast-only emphasis (e.g. confidence band tint, secondary forecast legend).
 * - `forecastSoft` — lighter fills, second time window, hatch, de-emphasized prior series.
 */
export const chartPalette = {
  actualPrimary: '#139a9a',
  actualSecondary: '#e57b30',
  target: '#4a4a4a',
  forecastAccent: '#fbb447',
  forecastSoft: '#83cec3',
} as const

export type ChartPaletteKey = keyof typeof chartPalette

/** Teal fill/border/text for Trends buttons (matches `actualPrimary` trend charts). */
export function trendsControlStyle(): {
  borderColor: string
  backgroundColor: string
  color: string
} {
  const c = chartPalette.actualPrimary
  return {
    borderColor: `${c}99`,
    backgroundColor: `${c}1f`,
    color: c,
  }
}

/**
 * Shared Trends control — Forecast Drivers table + community MetricsTable.
 * Use with `style={trendsControlStyle()}`.
 */
export const trendsButtonClassName =
  'inline-flex items-center gap-1 rounded-lg border border-solid px-2.5 py-1.5 text-xs font-semibold shadow-sm transition-colors hover:brightness-[0.97] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#139a9a]'

export const trendsChevronIconClassName = 'h-4 w-4 shrink-0 text-[#139a9a]'
