import { cn } from '@/lib/cn'
import { pulseTableHeadPrimary } from '@/pulse/ui/pulseTypography'

/**
 * Standard data-table chrome for Pulse / Open Homes.
 * Use together: card shell → scroll wrapper → table with cell grid on every th/td.
 */

/** Rounded shell around a title bar + table (outer border = table frame). */
export const pulseTableCard =
  'min-w-0 w-full max-w-full overflow-hidden rounded-lg border border-neutral-200 bg-white shadow-sm'

/** Title row above the grid (matches Communities / Metrics pattern). */
export const pulseTableCardTitleBar =
  'border-b border-neutral-200 bg-neutral-50/80 px-4 py-3 sm:px-5 sm:py-3.5'

/** Horizontal scroll for wide tables. */
export const pulseTableScroll = 'min-w-0 w-full max-w-full overflow-x-auto overscroll-x-contain'

/** Scroll with edge bleed compensation on small viewports (metrics-style tables). */
export const pulseTableScrollWide =
  '-mx-1 overflow-x-auto overscroll-x-contain px-1 sm:mx-0 sm:px-0 sm:overscroll-auto'

/** Default `<table>` — `text-sm`; use `pulseTableBaseCompact` when slightly smaller type is needed. */
export const pulseTableBase = 'w-full border-collapse text-sm'

export const pulseTableBaseCompact = 'w-full border-collapse text-[13px] sm:text-sm'

/**
 * Full internal grid: horizontal + vertical rules.
 * `last:border-r-0` drops the outer right edge (shell border is the frame).
 */
export const pulseTableCellGrid = 'border-b border-r border-neutral-200 last:border-r-0'

/** Header band color (all `<th>`). */
export const pulseTableHeaderBg = 'bg-neutral-50'

/** Default body text color for cells. */
export const pulseTableBodyText = 'text-neutral-900'

/** Standard cell padding (headers + body). */
export const pulseTableCellPadding = 'px-4 py-3.5'

/** Slightly tighter cells (e.g. pill columns) while keeping the same grid. */
export const pulseTableCellPaddingCompact = 'px-3 py-2.5'

/** Zebra striping on `<tbody>` rows. */
export const pulseTableRowEven = 'bg-white'
export const pulseTableRowOdd = 'bg-neutral-50/40'

/** `<th>`: grid + header fill + label style + padding. Pass alignment. */
export function pulseTableTh(align: 'left' | 'center' | 'right' = 'left', extra?: string) {
  return cn(
    pulseTableCellGrid,
    pulseTableHeaderBg,
    pulseTableCellPadding,
    pulseTableHeadPrimary,
    align === 'left' && 'text-left',
    align === 'center' && 'text-center',
    align === 'right' && 'text-right',
    extra,
  )
}

/** `<td>`: grid + padding + default text; row background comes from `<tr>`. */
export function pulseTableTd(align: 'left' | 'center' | 'right' = 'left', extra?: string) {
  return cn(
    pulseTableCellGrid,
    pulseTableCellPadding,
    pulseTableBodyText,
    align === 'left' && 'text-left',
    align === 'center' && 'text-center',
    align === 'right' && 'text-right',
    extra,
  )
}

/** Denser `<td>` (e.g. pill columns) — same grid rules. */
export function pulseTableTdCompact(align: 'left' | 'center' | 'right' = 'left', extra?: string) {
  return cn(
    pulseTableCellGrid,
    pulseTableCellPaddingCompact,
    pulseTableBodyText,
    align === 'left' && 'text-left',
    align === 'center' && 'text-center',
    align === 'right' && 'text-right',
    extra,
  )
}

/** Expanded / nested full-width row under a metric (e.g. Forecast Drivers chart). */
export const pulseTableExpandRowCell =
  'border-b border-neutral-200 bg-neutral-50/95 px-4 py-4 text-left text-neutral-900'

/**
 * Community pulse metrics tables: shared `<col>` widths so every stacked table aligns vertically.
 * Use with `table-fixed` + `w-full min-w-0`. Percentages sum to 100%.
 */
/** Counts column intentionally modest — inner layout spreads content; extra width goes to metric + rates. */
export const PULSE_METRICS_TABLE_COL_WIDTHS = ['21%', '20%', '12%', '12%', '13%', '13%', '9%'] as const

/** `<table>` class for community metrics — fixed layout, fluid width, no horizontal min-width. */
export const pulseMetricsTableTableClass =
  'w-full min-w-0 table-fixed border-collapse text-[13px] sm:text-sm'
