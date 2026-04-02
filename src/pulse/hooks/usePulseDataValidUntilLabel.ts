import { useMemo } from 'react'
import { useLocalCalendarDayKey } from '@/pulse/hooks/useLocalCalendarDayKey'
import { formatPulseDataValidUntil } from '@/pulse/lib/pulseDatePeriods'

/** “Data Up To” line: prior week’s Sunday, recomputed when the local calendar day changes. */
export function usePulseDataValidUntilLabel(): string {
  const dayKey = useLocalCalendarDayKey()
  return useMemo(() => formatPulseDataValidUntil(new Date()), [dayKey])
}
