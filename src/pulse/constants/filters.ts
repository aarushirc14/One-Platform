import { buildDatePeriodOptions } from '@/pulse/lib/pulseDatePeriods'

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

export function defaultDatePeriodId(aggregationId: AggregationId): string {
  return buildDatePeriodOptions(aggregationId, new Date())[0].id
}

export const TARGET_OPTIONS = [
  { id: 'builder', label: 'Builder Targets' },
  { id: 'division', label: 'Division Averages' },
  { id: 'all_division', label: 'All Division Averages' },
  { id: 'industry', label: 'Industry Benchmark' },
] as const

export type TargetId = (typeof TARGET_OPTIONS)[number]['id']

export const DEFAULT_TARGET_ID: TargetId = 'builder'
