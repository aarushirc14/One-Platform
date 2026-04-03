/** Division-level leading indicators tied to Tucson sales (model-ranked). */

export const divisionLeadingIndicatorsExecutiveSentence =
  'Paid, display, and email are lifting sessions, and repeat visits are stickier than they were in January — but net-new leads are barely moving, scheduled tours per lead are down, and completed appointments sit below last quarter’s peak. That combination is exactly why the 90-day forecast only improved a little while the monthly plan is still out of reach.'

/** One point per period; values use an index scale for the chart. */
export type ForecastDriverTrendPoint = {
  period: string
  value: number
}

export type ForecastDriverTopMetric = {
  rank: number
  metric: string
  recentChanges: string
  trend: ForecastDriverTrendPoint[]
}

export const forecastDriverTopMetrics: ForecastDriverTopMetric[] = [
  {
    rank: 1,
    metric: 'Sessions from paid, display, and email (indexed)',
    recentChanges:
      'Up three months in a row — the clearest bright spot. The catch: those channels are not yet producing enough first tours or contracts on their own, especially where communities were already light on organic demand.',
    trend: [
      { period: 'Sep', value: 82 },
      { period: 'Oct', value: 84 },
      { period: 'Nov', value: 86 },
      { period: 'Dec', value: 88 },
      { period: 'Jan', value: 91 },
      { period: 'Feb', value: 94 },
      { period: 'Mar', value: 98 },
    ],
  },
  {
    rank: 2,
    metric: 'Repeat sessions per returning visitor (stickiness)',
    recentChanges:
      'Higher than the fall average — shoppers are coming back. Without a matching lift in net-new leads, the division is mostly re-working the same pool instead of adding fresh pipeline.',
    trend: [
      { period: 'Sep', value: 58 },
      { period: 'Oct', value: 59 },
      { period: 'Nov', value: 60 },
      { period: 'Dec', value: 61 },
      { period: 'Jan', value: 64 },
      { period: 'Feb', value: 67 },
      { period: 'Mar', value: 69 },
    ],
  },
  {
    rank: 3,
    metric: 'Net-new leads (first-time CRM contacts)',
    recentChanges:
      'Essentially flat since December — this is the bridge that paid traffic has not fully built yet, and it shows up hardest in communities that need raw volume, not just another click.',
    trend: [
      { period: 'Sep', value: 44 },
      { period: 'Oct', value: 43 },
      { period: 'Nov', value: 42 },
      { period: 'Dec', value: 41 },
      { period: 'Jan', value: 41 },
      { period: 'Feb', value: 40 },
      { period: 'Mar', value: 41 },
    ],
  },
  {
    rank: 4,
    metric: 'Scheduled first tours per 100 qualified leads',
    recentChanges:
      'Down from the October high; March only partly recovered. This is the handoff point where interest stops turning into a dated, onsite conversation — the dominant drag on the forward forecast.',
    trend: [
      { period: 'Sep', value: 40 },
      { period: 'Oct', value: 44 },
      { period: 'Nov', value: 41 },
      { period: 'Dec', value: 36 },
      { period: 'Jan', value: 31 },
      { period: 'Feb', value: 32 },
      { period: 'Mar', value: 34 },
    ],
  },
  {
    rank: 5,
    metric: 'Completed buyer appointments vs appointments scheduled',
    recentChanges:
      'Below the recent peak — even when tours get booked, completion rates are softer than last quarter. That shows up as a closing problem in communities that already move traffic reasonably well.',
    trend: [
      { period: 'Sep', value: 42 },
      { period: 'Oct', value: 43 },
      { period: 'Nov', value: 41 },
      { period: 'Dec', value: 37 },
      { period: 'Jan', value: 33 },
      { period: 'Feb', value: 34 },
      { period: 'Mar', value: 35 },
    ],
  },
]

/** Text before inline links to Community Triage and Division Performance on Forecast drivers. */
export const forecastDriversPageFootnoteBeforeLinks =
  'These rankings reflect historical co-movement with Tucson net sales, not guaranteed drivers. Pair with '
