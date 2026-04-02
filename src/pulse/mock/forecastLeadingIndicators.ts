/**
 * Division-level early signals tied to sales (mock). Replace with API / Leading Indicator export.
 */

export const divisionLeadingIndicatorsExecutiveSentence =
  'Right now, website engagement and new leads line up most closely with how division sales have been trending.'

export type ForecastDriverTopMetric = {
  rank: number
  metric: string
  whyItMatters: string
}

export const forecastDriverTopMetrics: ForecastDriverTopMetric[] = [
  {
    rank: 1,
    metric: 'Engaged visits on the division website',
    whyItMatters:
      'When this eases off, sales often soften a few weeks later — useful as an early heads-up.',
  },
  {
    rank: 2,
    metric: 'New leads (first-time contacts)',
    whyItMatters: 'Fewer new names in the door usually shows up in closings later.',
  },
  {
    rank: 3,
    metric: 'Traffic from people who already know your brand',
    whyItMatters:
      'Heavy reliance on paid ads while brand traffic slips often goes with harder appointment booking.',
  },
  {
    rank: 4,
    metric: 'First-time visitors to your site',
    whyItMatters: 'Separates brand-new interest from buyers who are still comparing options.',
  },
  {
    rank: 5,
    metric: 'Leads who book a first appointment',
    whyItMatters:
      'If lead count is fine but this drops, focus on follow-up and scheduling — not just more ads.',
  },
]

/** Text before inline links to Community Triage and Division Performance on Forecast drivers. */
export const forecastDriversPageFootnoteBeforeLinks =
  'These patterns are division-wide and come from the model — they show what tends to move together with sales, not guaranteed cause and effect. Pair with '
