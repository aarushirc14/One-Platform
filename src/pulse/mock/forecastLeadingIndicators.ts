/** Division-level early signals tied to sales (static data for this build). */

export const divisionLeadingIndicatorsExecutiveSentence =
  'Right now, website engagement and new leads line up most closely with how division sales have been trending.'

/** One point per period; values use an illustrative index scale for the chart. */
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
    metric: 'Engaged visits on the division website',
    recentChanges:
      'Down from Q4; March bounced vs February — similar shape to periods before softer closings.',
    trend: [
      { period: 'Sep', value: 92 },
      { period: 'Oct', value: 88 },
      { period: 'Nov', value: 81 },
      { period: 'Dec', value: 78 },
      { period: 'Jan', value: 74 },
      { period: 'Feb', value: 79 },
      { period: 'Mar', value: 84 },
    ],
  },
  {
    rank: 2,
    metric: 'New leads (first-time contacts)',
    recentChanges: 'Below the rolling six-month average for the last two months.',
    trend: [
      { period: 'Sep', value: 42 },
      { period: 'Oct', value: 44 },
      { period: 'Nov', value: 43 },
      { period: 'Dec', value: 45 },
      { period: 'Jan', value: 44 },
      { period: 'Feb', value: 41 },
      { period: 'Mar', value: 39 },
    ],
  },
  {
    rank: 3,
    metric: 'Traffic from people who already know your brand',
    recentChanges:
      'Steady decline since November; paid sessions now make up a larger share of the mix.',
    trend: [
      { period: 'Sep', value: 68 },
      { period: 'Oct', value: 65 },
      { period: 'Nov', value: 58 },
      { period: 'Dec', value: 62 },
      { period: 'Jan', value: 54 },
      { period: 'Feb', value: 51 },
      { period: 'Mar', value: 48 },
    ],
  },
  {
    rank: 4,
    metric: 'First-time visitors to your site',
    recentChanges: 'Stronger than a year ago on this window; eased slightly from the February high.',
    trend: [
      { period: 'Sep', value: 110 },
      { period: 'Oct', value: 118 },
      { period: 'Nov', value: 122 },
      { period: 'Dec', value: 119 },
      { period: 'Jan', value: 125 },
      { period: 'Feb', value: 128 },
      { period: 'Mar', value: 124 },
    ],
  },
  {
    rank: 5,
    metric: 'Leads who book a first appointment',
    recentChanges:
      'Dip through January; March recovered — worth watching against unchanged lead volume.',
    trend: [
      { period: 'Sep', value: 36 },
      { period: 'Oct', value: 38 },
      { period: 'Nov', value: 35 },
      { period: 'Dec', value: 31 },
      { period: 'Jan', value: 28 },
      { period: 'Feb', value: 32 },
      { period: 'Mar', value: 37 },
    ],
  },
]

/** Text before inline links to Community Triage and Division Performance on Forecast drivers. */
export const forecastDriversPageFootnoteBeforeLinks =
  'These patterns are division-wide and come from the model — they show what tends to move together with sales, not guaranteed cause and effect. Pair with '
