import type { AggregationId } from '@/pulse/constants/filters'

/** YYYY-MM-DD in local calendar */
export function localDateKey(d: Date): string {
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${y}-${m}-${day}`
}

function startOfLocalDay(d: Date): Date {
  const x = new Date(d)
  x.setHours(0, 0, 0, 0)
  return x
}

function addDays(d: Date, n: number): Date {
  const x = new Date(d)
  x.setDate(x.getDate() + n)
  return x
}

/** Monday-start week containing `d` (local). */
function startOfISOWeek(d: Date): Date {
  const x = startOfLocalDay(d)
  const dow = x.getDay()
  const diff = dow === 0 ? -6 : 1 - dow
  return addDays(x, diff)
}

/** Last Mon–Sun week fully before the ISO week that contains `ref`. */
function lastCompleteWeekRange(ref: Date): { mon: Date; sun: Date } {
  const mon = startOfISOWeek(ref)
  const prevSun = addDays(mon, -1)
  const prevMon = addDays(prevSun, -6)
  return { mon: prevMon, sun: prevSun }
}

function startOfMonth(d: Date): Date {
  return new Date(d.getFullYear(), d.getMonth(), 1)
}

function endOfPreviousMonth(ref: Date): Date {
  return addDays(startOfMonth(ref), -1)
}

function monthAddFirstOfMonth(d: Date, deltaMonths: number): Date {
  return new Date(d.getFullYear(), d.getMonth() + deltaMonths, 1)
}

function formatMd(d: Date): string {
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}

function formatMdY(d: Date): string {
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

function formatMonthLong(d: Date): string {
  return d.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
}

function formatWeekCompleteLabel(mon: Date, sun: Date): string {
  if (mon.getFullYear() === sun.getFullYear() && mon.getMonth() === sun.getMonth()) {
    return `${formatMd(mon)}–${sun.getDate()}, ${sun.getFullYear()} (Complete Week)`
  }
  return `${formatMdY(mon)} – ${formatMdY(sun)} (Complete Week)`
}

function formatMonthSpan(startFirstOfMonth: Date, endFirstOfMonth: Date): string {
  const s = startFirstOfMonth.toLocaleDateString('en-US', { month: 'short' })
  const e = endFirstOfMonth.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
  return `${s} – ${e}`
}

function formatRolling12mCur(startMo: Date, endMo: Date): string {
  const sm = startMo.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
  const em = endMo.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
  return `${sm} – ${em}`
}

/**
 * Sunday at the end of the last full Mon–Sun week before the week that contains `ref`
 * (same anchor as weekly / rolling-4w options in {@link buildDatePeriodOptions}).
 */
export function pulseDataValidUntilDate(ref: Date = new Date()): Date {
  return lastCompleteWeekRange(startOfLocalDay(ref)).sun
}

/** e.g. "March 29, 2026" — for “Data Up To” copy. */
export function formatPulseDataValidUntil(ref: Date = new Date()): string {
  return pulseDataValidUntilDate(ref).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })
}

/** Latest Downloads page: always the last calendar day of the month before `ref` (local). */
export function formatLatestDownloadsDataUpTo(ref: Date = new Date()): string {
  const lastDayPrevMonth = endOfPreviousMonth(startOfLocalDay(ref))
  return lastDayPrevMonth.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })
}

/** `YYYY-MM-DD` for Latest Downloads PDF filenames (same anchor as {@link formatLatestDownloadsDataUpTo}). */
export function latestDownloadsPdfDateKey(ref: Date = new Date()): string {
  return localDateKey(endOfPreviousMonth(startOfLocalDay(ref)))
}

/**
 * Dropdown labels for "Date Period" derived from a reference instant (defaults to now).
 * Option ids stay stable so UI state keys do not depend on calendar text.
 */
export function buildDatePeriodOptions(
  aggregationId: AggregationId,
  ref: Date = new Date(),
): { id: string; label: string }[] {
  const refDay = startOfLocalDay(ref)

  switch (aggregationId) {
    case 'weekly': {
      const a = lastCompleteWeekRange(refDay)
      const bMon = addDays(a.mon, -7)
      const bSun = addDays(a.sun, -7)
      const cMon = addDays(bMon, -7)
      const cSun = addDays(bSun, -7)
      return [
        { id: 'w_cur', label: formatWeekCompleteLabel(a.mon, a.sun) },
        { id: 'w_prev', label: formatWeekCompleteLabel(bMon, bSun) },
        { id: 'w_prior', label: formatWeekCompleteLabel(cMon, cSun) },
      ]
    }
    case 'rolling_4w': {
      const anchor = lastCompleteWeekRange(refDay).sun
      return [
        { id: 'r4_cur', label: `Through ${formatMdY(anchor)}` },
        { id: 'r4_prev', label: `Through ${formatMdY(addDays(anchor, -7))}` },
        { id: 'r4_mid', label: `Through ${formatMdY(addDays(anchor, -35))}` },
      ]
    }
    case 'monthly': {
      const lastEnd = endOfPreviousMonth(refDay)
      const cur = startOfMonth(lastEnd)
      const prev = monthAddFirstOfMonth(cur, -1)
      const prior = monthAddFirstOfMonth(cur, -2)
      return [
        { id: 'm_cur', label: formatMonthLong(cur) },
        { id: 'm_prev', label: formatMonthLong(prev) },
        { id: 'm_prior', label: formatMonthLong(prior) },
      ]
    }
    case 'rolling_3m': {
      const lastEnd = endOfPreviousMonth(refDay)
      const endMo = startOfMonth(lastEnd)
      const startMo = monthAddFirstOfMonth(endMo, -2)
      const endPrev = monthAddFirstOfMonth(endMo, -3)
      const startPrev = monthAddFirstOfMonth(endMo, -5)
      const endPrior = monthAddFirstOfMonth(endMo, -6)
      const startPrior = monthAddFirstOfMonth(endMo, -8)
      return [
        { id: 'r3_cur', label: formatMonthSpan(startMo, endMo) },
        { id: 'r3_prev', label: formatMonthSpan(startPrev, endPrev) },
        { id: 'r3_prior', label: formatMonthSpan(startPrior, endPrior) },
      ]
    }
    case 'ytd': {
      const y = refDay.getFullYear()
      const eom = endOfPreviousMonth(refDay)
      const soy = new Date(y, 0, 1)
      return [
        {
          id: 'ytd_cur',
          label: `${formatMdY(soy)} – ${formatMdY(eom)}`,
        },
        {
          id: 'ytd_today',
          label: `${formatMdY(soy)} – ${formatMdY(refDay)} (Through Today)`,
        },
        { id: 'ytd_py', label: `Full Year ${y - 1}` },
        { id: 'ytd_cmp', label: 'YTD Vs Same Period Prior Year' },
      ]
    }
    case 'rolling_12m': {
      const lastEnd = endOfPreviousMonth(refDay)
      const endMo = startOfMonth(lastEnd)
      const startMo = monthAddFirstOfMonth(endMo, -11)
      const endPrior = monthAddFirstOfMonth(endMo, -12)
      const startPrior = monthAddFirstOfMonth(endMo, -23)
      return [
        { id: 'r12_cur', label: formatRolling12mCur(startMo, endMo) },
        { id: 'r12_cal', label: `Calendar ${refDay.getFullYear() - 1}` },
        {
          id: 'r12_prior',
          label: `${formatMonthSpan(startPrior, endPrior)} (prior year window)`,
        },
      ]
    }
    default: {
      const _exhaustive: never = aggregationId
      return _exhaustive
    }
  }
}
