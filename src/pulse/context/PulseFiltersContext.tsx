import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react'
import {
  type AggregationId,
  type TargetId,
  DATE_PERIOD_OPTIONS,
  DEFAULT_AGGREGATION_ID,
  DEFAULT_TARGET_ID,
  defaultDatePeriodId,
} from '@/pulse/constants/filters'

type PulseFiltersContextValue = {
  aggregationId: AggregationId
  setAggregationId: (id: AggregationId) => void
  datePeriodId: string
  setDatePeriodId: (id: string) => void
  targetId: TargetId
  setTargetId: (id: TargetId) => void
  /** Selected date range label for copy elsewhere (e.g. funnel subtitle). */
  datePeriodLabel: string
}

const PulseFiltersContext = createContext<PulseFiltersContextValue | null>(null)

export function PulseFiltersProvider({ children }: { children: ReactNode }) {
  const [aggregationId, setAggregationIdState] = useState<AggregationId>(DEFAULT_AGGREGATION_ID)
  const [datePeriodId, setDatePeriodIdState] = useState(() => defaultDatePeriodId(DEFAULT_AGGREGATION_ID))
  const [targetId, setTargetIdState] = useState<TargetId>(DEFAULT_TARGET_ID)

  const setAggregationId = useCallback((id: AggregationId) => {
    setAggregationIdState(id)
    setDatePeriodIdState((prev) => {
      const opts = DATE_PERIOD_OPTIONS[id]
      return opts.some((o) => o.id === prev) ? prev : opts[0].id
    })
  }, [])

  const setDatePeriodId = useCallback((id: string) => {
    setDatePeriodIdState(id)
  }, [])

  const setTargetId = useCallback((id: TargetId) => {
    setTargetIdState(id)
  }, [])

  const datePeriodLabel = useMemo(() => {
    const opts = DATE_PERIOD_OPTIONS[aggregationId]
    return opts.find((o) => o.id === datePeriodId)?.label ?? opts[0].label
  }, [aggregationId, datePeriodId])

  const value = useMemo(
    () => ({
      aggregationId,
      setAggregationId,
      datePeriodId,
      setDatePeriodId,
      targetId,
      setTargetId,
      datePeriodLabel,
    }),
    [
      aggregationId,
      setAggregationId,
      datePeriodId,
      setDatePeriodId,
      targetId,
      setTargetId,
      datePeriodLabel,
    ],
  )

  return <PulseFiltersContext.Provider value={value}>{children}</PulseFiltersContext.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components -- hook paired with provider for pulse routes
export function usePulseFilters(): PulseFiltersContextValue {
  const ctx = useContext(PulseFiltersContext)
  if (!ctx) {
    throw new Error('usePulseFilters must be used within PulseFiltersProvider')
  }
  return ctx
}
