/** Division-level leading indicators tied to Tucson sales (model-ranked). */

export const divisionLeadingIndicatorsExecutiveSentence =
  'Tucson’s site is pulling more raw sessions again, but the model weights “tour scheduled per qualified lead” and “first-visit completion” lower than it did in Q4 — the same gap Gladden shows as missing volume and Catalina shows as missed appointments. Paid traffic is filling part of the funnel while branded return visits fade, which lifts top-of-funnel counts without restoring clean downstream intent.'

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
    metric: 'First appointments scheduled per 100 qualified leads',
    recentChanges:
      'Down from the October–November peak; March ticked up but remains below the six-month average — the pattern matches communities where traffic exists but tours do not reliably land.',
    trend: [
      { period: 'Sep', value: 38 },
      { period: 'Oct', value: 42 },
      { period: 'Nov', value: 40 },
      { period: 'Dec', value: 34 },
      { period: 'Jan', value: 29 },
      { period: 'Feb', value: 31 },
      { period: 'Mar', value: 35 },
    ],
  },
  {
    rank: 2,
    metric: 'Net-new leads (first-time CRM contacts)',
    recentChanges:
      'Four consecutive prints at or under the rolling six-month mean — concentrated in communities where paid geos compensate only partially for weak organic pull.',
    trend: [
      { period: 'Sep', value: 46 },
      { period: 'Oct', value: 45 },
      { period: 'Nov', value: 44 },
      { period: 'Dec', value: 43 },
      { period: 'Jan', value: 40 },
      { period: 'Feb', value: 38 },
      { period: 'Mar', value: 37 },
    ],
  },
  {
    rank: 3,
    metric: 'Branded / direct sessions (share of total web traffic)',
    recentChanges:
      'Steady erosion since late fall; paid and prospecting channels now carry a larger share of sessions — helpful for Gladden’s top line, noisy for Catalina where repeat intent used to convert faster.',
    trend: [
      { period: 'Sep', value: 72 },
      { period: 'Oct', value: 68 },
      { period: 'Nov', value: 62 },
      { period: 'Dec', value: 59 },
      { period: 'Jan', value: 55 },
      { period: 'Feb', value: 52 },
      { period: 'Mar', value: 50 },
    ],
  },
  {
    rank: 4,
    metric: 'High-intent listing views per engaged session',
    recentChanges:
      'Rebounded February–March after a January dip — engagement is improving, but it is concentrated in inventory that is not carrying Gladden’s volume shortfall.',
    trend: [
      { period: 'Sep', value: 88 },
      { period: 'Oct', value: 91 },
      { period: 'Nov', value: 94 },
      { period: 'Dec', value: 87 },
      { period: 'Jan', value: 82 },
      { period: 'Feb', value: 90 },
      { period: 'Mar', value: 93 },
    ],
  },
  {
    rank: 5,
    metric: 'Completed first visits following a scheduled tour',
    recentChanges:
      'Soft through January with only a partial March recovery — aligns with Tanque Verde’s closing efficiency issue more than with Saddlebrook, where the same metric held steadier.',
    trend: [
      { period: 'Sep', value: 40 },
      { period: 'Oct', value: 41 },
      { period: 'Nov', value: 39 },
      { period: 'Dec', value: 35 },
      { period: 'Jan', value: 30 },
      { period: 'Feb', value: 33 },
      { period: 'Mar', value: 36 },
    ],
  },
]

/** Text before inline links to Community Triage and Division Performance on Forecast drivers. */
export const forecastDriversPageFootnoteBeforeLinks =
  'These rankings reflect historical co-movement with Tucson net sales, not guaranteed drivers. Pair with '
