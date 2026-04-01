/** Time bucket / window for metrics */
export const AGGREGATION_OPTIONS = [
  { id: 'weekly', label: 'Prior Week (Mon–Sun)' },
  { id: 'rolling_4w', label: 'Last 4 Weeks (Rolling)' },
  { id: 'monthly', label: 'Last Completed Month' },
  { id: 'rolling_3m', label: 'Last 3 Months (Rolling)' },
  { id: 'ytd', label: 'Year To Date' },
  { id: 'rolling_12m', label: 'Last 12 Months (Rolling)' },
] as const

export type AggregationId = (typeof AGGREGATION_OPTIONS)[number]['id']

export const DEFAULT_AGGREGATION_ID: AggregationId = 'rolling_4w'

/**
 * Date / range choices depend on aggregation.
 * Prototype “as of” date: Wednesday, April 1, 2026 (last full week ended Sun Mar 29; last full month Mar 2026).
 */
export const DATE_PERIOD_OPTIONS: Record<
  AggregationId,
  readonly { id: string; label: string }[]
> = {
  weekly: [
    { id: 'w_cur', label: 'Mar 23–29, 2026 (Complete Week)' },
    { id: 'w_prev', label: 'Mar 16–22, 2026' },
    { id: 'w_prior', label: 'Mar 9–15, 2026' },
  ],
  rolling_4w: [
    { id: 'r4_cur', label: 'Through Mar 31, 2026' },
    { id: 'r4_prev', label: 'Through Mar 24, 2026' },
    { id: 'r4_mid', label: 'Through Feb 28, 2026' },
  ],
  monthly: [
    { id: 'm_mar', label: 'March 2026' },
    { id: 'm_feb', label: 'February 2026' },
    { id: 'm_jan', label: 'January 2026' },
  ],
  rolling_3m: [
    { id: 'r3_cur', label: 'Jan – Mar 2026' },
    { id: 'r3_prev', label: 'Dec 2025 – Feb 2026' },
    { id: 'r3_prior', label: 'Oct – Dec 2025' },
  ],
  ytd: [
    { id: 'ytd_cur', label: 'Jan 1 – Mar 31, 2026' },
    { id: 'ytd_today', label: 'Jan 1 – Apr 1, 2026 (Through Today)' },
    { id: 'ytd_py', label: 'Full Year 2025' },
    { id: 'ytd_cmp', label: 'YTD Vs Same Period Prior Year' },
  ],
  rolling_12m: [
    { id: 'r12_cur', label: 'Apr 2025 – Mar 2026' },
    { id: 'r12_cal', label: 'Calendar 2025' },
    { id: 'r12_prior', label: 'Apr 2024 – Mar 2025' },
  ],
}

export function defaultDatePeriodId(aggregationId: AggregationId): string {
  return DATE_PERIOD_OPTIONS[aggregationId][0].id
}

export const TARGET_OPTIONS = [
  { id: 'builder', label: 'Builder Target' },
  { id: 'division', label: 'Division Averages' },
  { id: 'all_division', label: 'All Division Averages' },
  { id: 'industry', label: 'Industry Benchmark' },
] as const

export type TargetId = (typeof TARGET_OPTIONS)[number]['id']

export const DEFAULT_TARGET_ID: TargetId = 'builder'
