import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import {
  type AggregationId,
  type TargetId,
  DEFAULT_AGGREGATION_ID,
  DEFAULT_TARGET_ID,
  defaultDatePeriodId,
} from '@/pulse/constants/filters'
import { useLocalCalendarDayKey } from '@/pulse/hooks/useLocalCalendarDayKey'
import { buildDatePeriodOptions } from '@/pulse/lib/pulseDatePeriods'

type PulseFiltersContextValue = {
  aggregationId: AggregationId
  setAggregationId: (id: AggregationId) => void
  datePeriodId: string
  setDatePeriodId: (id: string) => void
  targetId: TargetId
  setTargetId: (id: TargetId) => void
  /** Options for the Date Period dropdown (labels follow the current calendar). */
  datePeriodOptions: { id: string; label: string }[]
  /** Selected date range label for copy elsewhere (e.g. funnel subtitle). */
  datePeriodLabel: string
}

const PulseFiltersContext = createContext<PulseFiltersContextValue | null>(null)

export function PulseFiltersProvider({ children }: { children: ReactNode }) {
  const calendarDayKey = useLocalCalendarDayKey()
  const [aggregationId, setAggregationIdState] = useState<AggregationId>(DEFAULT_AGGREGATION_ID)
  const [datePeriodId, setDatePeriodIdState] = useState(() => defaultDatePeriodId(DEFAULT_AGGREGATION_ID))
  const [targetId, setTargetIdState] = useState<TargetId>(DEFAULT_TARGET_ID)

  const datePeriodOptions = useMemo(
    () => buildDatePeriodOptions(aggregationId, new Date()),
    [aggregationId, calendarDayKey],
  )

  useEffect(() => {
    setDatePeriodIdState((prev) =>
      datePeriodOptions.some((o) => o.id === prev) ? prev : datePeriodOptions[0].id,
    )
  }, [datePeriodOptions])

  const setAggregationId = useCallback((id: AggregationId) => {
    setAggregationIdState(id)
    setDatePeriodIdState((prev) => {
      const opts = buildDatePeriodOptions(id, new Date())
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
    return datePeriodOptions.find((o) => o.id === datePeriodId)?.label ?? datePeriodOptions[0].label
  }, [datePeriodOptions, datePeriodId])

  const value = useMemo(
    () => ({
      aggregationId,
      setAggregationId,
      datePeriodId,
      setDatePeriodId,
      targetId,
      setTargetId,
      datePeriodOptions,
      datePeriodLabel,
    }),
    [
      aggregationId,
      setAggregationId,
      datePeriodId,
      setDatePeriodId,
      targetId,
      setTargetId,
      datePeriodOptions,
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
