import { useEffect, useState } from 'react'
import { localDateKey } from '@/pulse/lib/pulseDatePeriods'

/** Bumps when the local calendar day changes (tab visible + minute poll) so date labels stay fresh. */
export function useLocalCalendarDayKey(): string {
  const [key, setKey] = useState(() => localDateKey(new Date()))

  useEffect(() => {
    const sync = () => {
      setKey((prev) => {
        const next = localDateKey(new Date())
        return next !== prev ? next : prev
      })
    }
    const interval = window.setInterval(sync, 60_000)
    document.addEventListener('visibilitychange', sync)
    sync()
    return () => {
      clearInterval(interval)
      document.removeEventListener('visibilitychange', sync)
    }
  }, [])

  return key
}
