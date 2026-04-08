import { useLocalCalendarDayKey } from '@/pulse/hooks/useLocalCalendarDayKey'
import { formatPulseDataValidUntil } from '@/pulse/lib/pulseDatePeriods'

/** “Data Up To” line: prior week’s Sunday, recomputed when the local calendar day changes. */
export function usePulseDataValidUntilLabel(): string {
  useLocalCalendarDayKey()
  return formatPulseDataValidUntil(new Date())
}
