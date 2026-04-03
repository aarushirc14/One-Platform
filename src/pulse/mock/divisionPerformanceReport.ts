import {
  OPENHOMES_COMMUNITY_TRIAGE,
  OPENHOMES_DOWNLOADS,
  OPENHOMES_FORECAST_DRIVERS,
} from '@/pulse/constants/routes'

/** Division Performance report copy and figures — Tucson division snapshot. */

/** Main heading on Division Performance (division name is the page sub-heading). */
export const DIVISION_PERFORMANCE_PAGE_TITLE = 'Division Performance'

/** Executive block title — same style as other card section headings (Sales Forecast, etc.). */
export const DIVISION_PERFORMANCE_AT_A_GLANCE_HEADING = 'At a Glance'

/** Fixed reporting boundary for the monthly Division Performance snapshot (no live filters). */
export const DIVISION_PERFORMANCE_DATA_FRESHNESS_NOTE =
  'Division performance is updated monthly and shows only the most recent completed month.'

export const DIVISION_PERFORMANCE_DATA_UNTIL_NOTE = 'Data Up To: March 31, 2026'

export type ExecutiveDecisionQa = {
  id: string
  question: string
  answer: string
  tone: 'default' | 'attention' | 'positive'
}

/** Answers the decision questions in under a minute. */
export const divisionPerformanceExecutiveOverview = {
  qa: [
    {
      id: 'on-track',
      question: 'Are we on track?',
      answer:
        'No — 2026 YTD is 20 net sales against a 39-sale YTD plan, and the 90-day run-rate still trails the monthly target even after a stronger March close. The gap is not a single miss: Gladden is starved for qualified demand, Catalina is losing tours after solid traffic, and Tanque Verde converts foot traffic poorly despite steady sessions.',
      tone: 'attention',
    },
    {
      id: 'focus',
      question: 'Where should I focus?',
      answer:
        'Sequence matters. Stabilize Gladden’s upper funnel first (traffic + first contacts), then tighten Catalina’s appointment show and reschedule discipline while Tanque Verde gets a dedicated first-visit-to-contract playbook. Let Saddlebrook keep running — it is funding patience elsewhere.',
      tone: 'default',
    },
  ] as ExecutiveDecisionQa[],
  riskLabel: 'Largest risk to target',
  risk: 'We treat division-wide session growth as “demand.” Sessions are up in pockets, but scheduled first tours and clean first-visit outcomes are not keeping pace — so Q2 closes stay soft unless mid-funnel execution moves in the next four to six weeks.',
  opportunityLabel: 'Largest upside',
  opportunity:
    'Saddlebrook is at plan with healthier lead-to-visit throughput; modest reallocation of media and onsite labor from over-served geographies could lift Gladden and Catalina without increasing total spend.',
}

export type ReportNextStepLink = {
  id: string
  label: string
  hint: string
  to: string
}

/** Action layer — links into the rest of the unified platform. */
export const divisionPerformanceNextSteps = {
  title: 'Turn This Into a Decision',
  links: [
    {
      id: 'triage',
      label: 'Community Triage',
      hint: 'Ranked communities — volume vs conversion vs execution, with modeled funnel impact',
      to: OPENHOMES_COMMUNITY_TRIAGE,
    },
    {
      id: 'drivers',
      label: 'Forecast Drivers',
      hint: 'Leading indicators — where demand is real vs noisy',
      to: OPENHOMES_FORECAST_DRIVERS,
    },
    {
      id: 'downloads',
      label: 'Exports',
      hint: 'Spreadsheets and PDFs generated from this snapshot',
      to: OPENHOMES_DOWNLOADS,
    },
  ] as ReportNextStepLink[],
  discussionPrompts: [
    'Which community gets incremental media this month without diluting Saddlebrook’s already-strong funnel?',
    'Where is the breakdown: not enough appointments, or appointments that do not convert?',
    'What single metric do we hold sales and marketing jointly accountable to before April’s monthly close?',
  ],
}

export const divisionPerformanceSectionNav = [
  { href: '#executive-overview', label: DIVISION_PERFORMANCE_AT_A_GLANCE_HEADING },
  { href: '#sales-forecast', label: 'Sales Forecast' },
  { href: '#community-priorities', label: 'Community Performance' },
  { href: '#margin-drivers', label: 'Margin Drivers' },
  { href: '#next-steps', label: 'Next Steps' },
] as const

export const salesForecastIntro = {
  headline: 'Sales Forecast',
  subline: 'Forward-looking sales projection vs target',
  /** Shorter copy matches dashboard screenshot (red alert strip). */
  alert:
    'Rolling 90-day pace runs about 3.5 net sales per month under the monthly plan. March helped, but the forward book still reflects weak tour completion and uneven community-level conversion.',
}

export type SalesForecastSummaryCardModel = {
  id: string
  edgeTone: 'positive' | 'negative'
  label: string
  primaryStat: string
  primaryStatTone: 'positive' | 'negative'
  detailLine: string
  footerSmall?: string | null
  presoldValue: string
  specValue: string
  specRatioLabel: string
}

/** Split summary / breakdown cards inside the Sales Forecast panel (screenshot). */
export const salesForecastSummaryCards: SalesForecastSummaryCardModel[] = [
  {
    id: 'sf-march-mtd',
    edgeTone: 'positive',
    label: 'March MTD Sales',
    primaryStat: '5 sales to target',
    primaryStatTone: 'positive',
    detailLine: '8 sales vs 13 target',
    footerSmall: null,
    presoldValue: '8 sales',
    specValue: '0 sales',
    specRatioLabel: 'Spec Ratio: 0%',
  },
  {
    id: 'sf-ytd',
    edgeTone: 'negative',
    label: '2026 YTD Sales',
    primaryStat: '19 sales to target',
    primaryStatTone: 'negative',
    detailLine: '20 sales vs 39 target',
    footerSmall: '(incl. full Mar)',
    presoldValue: '16 sales',
    specValue: '4 sales',
    specRatioLabel: 'Spec Ratio: 20%',
  },
  {
    id: 'sf-90',
    edgeTone: 'negative',
    label: '90-Day Forecast',
    primaryStat: '4 sales/mo behind',
    primaryStatTone: 'negative',
    detailLine: '11 sales/mo vs 15 target',
    footerSmall: null,
    presoldValue: '9 sales/mo',
    specValue: '2 sales/mo',
    specRatioLabel: 'Spec Ratio: 18%',
  },
]

/** Horizontal track layout (0–100%) — tuned to match Forecast by period dashboard screenshot. */
export type ForecastByPeriodRow = {
  id: string
  label: string
  forecastSales: number
  rangeLow: number
  rangeHigh: number
  target: number
  behind: number
  rangeLeftPct: number
  rangeWidthPct: number
  forecastPct: number
  targetPct: number
}

export const forecastByPeriod: ForecastByPeriodRow[] = [
  {
    id: '30',
    label: 'Next 30 Days',
    forecastSales: 8,
    rangeLow: 7,
    rangeHigh: 9,
    target: 14,
    behind: 6,
    rangeLeftPct: 28,
    rangeWidthPct: 14,
    forecastPct: 35,
    targetPct: 76,
  },
  {
    id: '3060',
    label: '30–60 Days',
    forecastSales: 11,
    rangeLow: 9,
    rangeHigh: 13,
    target: 15,
    behind: 4,
    rangeLeftPct: 38,
    rangeWidthPct: 22,
    forecastPct: 49,
    targetPct: 82,
  },
  {
    id: '6090',
    label: '60–90 Days',
    forecastSales: 13,
    rangeLow: 11,
    rangeHigh: 15,
    target: 15,
    behind: 2,
    rangeLeftPct: 58,
    rangeWidthPct: 25,
    forecastPct: 70,
    targetPct: 83,
  },
]

/** Stacked monthly bars + budget line for the Historical Monthly Sales chart (vector replica). */
export type HistoricalMonthlySalesPoint = {
  month: string
  presale: number
  spec: number
  /** Forecast segment (hatched); 0 when none */
  forecast: number
  budget: number
}

export const historicalMonthlySales: HistoricalMonthlySalesPoint[] = [
  { month: "Mar '25", presale: 17, spec: 3, forecast: 0, budget: 20 },
  { month: "Apr '25", presale: 9, spec: 1, forecast: 0, budget: 24 },
  { month: "May '25", presale: 2, spec: 0, forecast: 0, budget: 26 },
  { month: "Jun '25", presale: 8, spec: 1, forecast: 0, budget: 27 },
  { month: "Jul '25", presale: 3, spec: 3, forecast: 0, budget: 27 },
  { month: "Aug '25", presale: 8, spec: 1, forecast: 0, budget: 29 },
  { month: "Sep '25", presale: 10, spec: 2, forecast: 0, budget: 29 },
  { month: "Oct '25", presale: 11, spec: 1, forecast: 0, budget: 30 },
  { month: "Nov '25", presale: 3, spec: 2, forecast: 0, budget: 25 },
  { month: "Dec '25", presale: 8, spec: 0, forecast: 0, budget: 25 },
  { month: "Jan '26", presale: 5, spec: 1, forecast: 0, budget: 12 },
  { month: "Feb '26", presale: 3, spec: 3, forecast: 0, budget: 14 },
  { month: "Mar '26", presale: 8, spec: 0, forecast: 4, budget: 13 },
  { month: "Apr '26", presale: 0, spec: 0, forecast: 9, budget: 16 },
  { month: "May '26", presale: 0, spec: 0, forecast: 12, budget: 15 },
]

/** Jan–Dec cumulative sales lines for the Cumulative Sales Comparison chart. */
export type CumulativeSalesComparisonPoint = {
  month: string
  target2026: number
  /** YTD actual (null after last reported month) */
  actual2026: number | null
  /** Forecast continuation (null outside forecast window) */
  forecast2026: number | null
  cumulative2025: number
  cumulative2024: number
}

export const cumulativeSalesComparison: CumulativeSalesComparisonPoint[] = [
  {
    month: 'Jan',
    target2026: 12,
    actual2026: 6,
    forecast2026: null,
    cumulative2025: 20,
    cumulative2024: 10,
  },
  {
    month: 'Feb',
    target2026: 26,
    actual2026: 12,
    forecast2026: null,
    cumulative2025: 29,
    cumulative2024: 18,
  },
  {
    month: 'Mar',
    target2026: 39,
    actual2026: 20,
    forecast2026: null,
    cumulative2025: 39,
    cumulative2024: 26,
  },
  {
    month: 'Apr',
    target2026: 55,
    actual2026: null,
    forecast2026: 28,
    cumulative2025: 49,
    cumulative2024: 35,
  },
  {
    month: 'May',
    target2026: 70,
    actual2026: null,
    forecast2026: 37,
    cumulative2025: 59,
    cumulative2024: 43,
  },
  {
    month: 'Jun',
    target2026: 85,
    actual2026: null,
    forecast2026: null,
    cumulative2025: 69,
    cumulative2024: 51,
  },
  {
    month: 'Jul',
    target2026: 98,
    actual2026: null,
    forecast2026: null,
    cumulative2025: 78,
    cumulative2024: 60,
  },
  {
    month: 'Aug',
    target2026: 111,
    actual2026: null,
    forecast2026: null,
    cumulative2025: 88,
    cumulative2024: 68,
  },
  {
    month: 'Sep',
    target2026: 123,
    actual2026: null,
    forecast2026: null,
    cumulative2025: 98,
    cumulative2024: 76,
  },
  {
    month: 'Oct',
    target2026: 136,
    actual2026: null,
    forecast2026: null,
    cumulative2025: 107,
    cumulative2024: 85,
  },
  {
    month: 'Nov',
    target2026: 147,
    actual2026: null,
    forecast2026: null,
    cumulative2025: 117,
    cumulative2024: 93,
  },
  {
    month: 'Dec',
    target2026: 160,
    actual2026: null,
    forecast2026: null,
    cumulative2025: 123,
    cumulative2024: 100,
  },
]

export type Next90Outlook = 'strong' | 'on-track' | 'at-risk' | 'off-track'

export type CommunityPerformanceRow = {
  id: string
  name: string
  last30Actual: number
  last30Target: number
  ytdActual: number
  ytdTarget: number
  next90Target: number
  next90Plan: number
  next90CatchUp: number
  primaryDriver: string
  /** Forecast outlook band for the next-90-day column. */
  next90Outlook: Next90Outlook
  /** When true, show “needs attention” callout on the primary driver. */
  driverNeedsAttention: boolean
}

/** Section chrome — matches Sales Forecast header pattern on Division Performance. */
export const communityPerformanceIntro = {
  headline: 'Community Performance',
  subline: 'Past performance and next 90-day outlook by community',
}

export const communityPerformanceAlert =
  '1 of 4 communities on track for the next 90 days: Saddlebrook. Gladden Farms is off-track on volume; Catalina Foothills and Tanque Verde are at-risk on execution after traffic arrives.'

export const communityPerformanceTableFootnote =
  '* Next 90-day plan, plus any YTD gap vs plan spread evenly over the rest of the year.'

export const communityPerformanceRows: CommunityPerformanceRow[] = [
  {
    id: 'catalina-foothills',
    name: 'Catalina Foothills',
    last30Actual: 3,
    last30Target: 4,
    ytdActual: 6,
    ytdTarget: 13,
    next90Target: 15,
    next90Plan: 14,
    next90CatchUp: 1,
    primaryDriver: 'Lead → first visit (tour scheduling)',
    next90Outlook: 'at-risk',
    driverNeedsAttention: true,
  },
  {
    id: 'gladden-farms',
    name: 'Gladden Farms',
    last30Actual: 1,
    last30Target: 3,
    ytdActual: 4,
    ytdTarget: 12,
    next90Target: 10,
    next90Plan: 7,
    next90CatchUp: 3,
    primaryDriver: 'Web traffic & new lead volume',
    next90Outlook: 'off-track',
    driverNeedsAttention: true,
  },
  {
    id: 'saddlebrook',
    name: 'Saddlebrook',
    last30Actual: 3,
    last30Target: 3,
    ytdActual: 8,
    ytdTarget: 8,
    next90Target: 9,
    next90Plan: 9,
    next90CatchUp: 0,
    primaryDriver: 'Lead → first visit throughput',
    next90Outlook: 'on-track',
    driverNeedsAttention: false,
  },
  {
    id: 'tanque-verde',
    name: 'Tanque Verde',
    last30Actual: 1,
    last30Target: 3,
    ytdActual: 2,
    ytdTarget: 6,
    next90Target: 5,
    next90Plan: 5,
    next90CatchUp: 0,
    primaryDriver: 'First visit → sale conversion',
    next90Outlook: 'at-risk',
    driverNeedsAttention: true,
  },
]

export const outlookLegendItems = [
  {
    tone: 'strong' as const,
    label: 'Strong',
    range: '≥75%',
    dotClass: 'bg-emerald-500',
  },
  {
    tone: 'on-track' as const,
    label: 'On Track',
    range: '50–74%',
    dotClass: 'bg-teal-500',
  },
  {
    tone: 'at-risk' as const,
    label: 'At Risk',
    range: '25–49%',
    dotClass: 'bg-orange-500',
  },
  {
    tone: 'off-track' as const,
    label: 'Off Track',
    range: '<25% chance to hit target',
    dotClass: 'bg-red-500',
  },
]

export const marginDriversIntro = {
  headline: 'Margin Drivers',
  subline: 'Options uptake by community',
  alert:
    'Presale options uptake averaged 6.9% over the last 90 days versus 10.8% over 180 days (−3.9 pts). Tanque Verde is holding attach; Catalina and Gladden are soft — consistent with longer decision cycles where tours slip or stall.',
}

/** Legacy table-style margin rows (kept for reference; primary UI is options uptake chart). */
export type MarginDriverRow = {
  communityId: string
  communityName: string
  optionsLoadingPct: string
  status: string
  vsTarget: string
}

export const marginDriverRows: MarginDriverRow[] = [
  {
    communityId: 'catalina-foothills',
    communityName: 'Catalina Foothills',
    optionsLoadingPct: '29%',
    status: 'Not Meeting',
    vsTarget: '$86k vs $148k target',
  },
  {
    communityId: 'gladden-farms',
    communityName: 'Gladden Farms',
    optionsLoadingPct: '24%',
    status: 'Not Meeting',
    vsTarget: '$71k vs $148k target',
  },
  {
    communityId: 'saddlebrook',
    communityName: 'Saddlebrook',
    optionsLoadingPct: '33%',
    status: 'Not Meeting',
    vsTarget: '$96k vs $148k target',
  },
  {
    communityId: 'tanque-verde',
    communityName: 'Tanque Verde',
    optionsLoadingPct: '44%',
    status: 'Meeting',
    vsTarget: '$121k vs $148k target',
  },
]

export const optionsUptakeChartIntro = {
  title: 'Options Uptake by Community',
  subtitle:
    'Presale options as % of sale price (180-day and 90-day periods). Spec options uptake unavailable (missing construction start dates).',
}

export const optionsUptakeWeightedAvg = {
  d180: '10.8%',
  d90: '6.9%',
}

export type OptionsUptakeCommunityRow = {
  communityId: string
  communityName: string
  /** Percent 0–100 scale (e.g. 12.2) */
  pct180: number
  sold180: number
  pct90: number
  sold90: number
}

/** Grouped bar chart — aligned to reference dashboard proportions. */
export const optionsUptakeByCommunity: OptionsUptakeCommunityRow[] = [
  {
    communityId: 'catalina-foothills',
    communityName: 'Catalina Foothills',
    pct180: 11.4,
    sold180: 19,
    pct90: 7.2,
    sold90: 9,
  },
  {
    communityId: 'gladden-farms',
    communityName: 'Gladden Farms',
    pct180: 8.9,
    sold180: 5,
    pct90: 6.1,
    sold90: 3,
  },
  {
    communityId: 'saddlebrook',
    communityName: 'Saddlebrook',
    pct180: 11.8,
    sold180: 14,
    pct90: 8.4,
    sold90: 7,
  },
  {
    communityId: 'tanque-verde',
    communityName: 'Tanque Verde',
    pct180: 10.2,
    sold180: 8,
    pct90: 11.6,
    sold90: 4,
  },
]

export type RollupKpiCardModel = {
  id: string
  title: string
  tone: 'on_track' | 'needs_attention'
  badge: string
  currentValue: string
  midPhrase: string
  targetValue: string
  targetWord: string
  detailLine?: string | null
  fillPct: number
  markerPct: number
  markerLabel: string
}

/** Top rollup KPIs — layout matches division performance PDF / dashboard screenshot. */
export const rollupKpiCards: RollupKpiCardModel[] = [
  {
    id: 'march-mtd',
    title: 'March MTD Sales',
    tone: 'on_track',
    badge: 'On Track',
    currentValue: '8',
    midPhrase: ' sales / ',
    targetValue: '13',
    targetWord: 'target',
    detailLine: null,
    fillPct: Math.round((8 / 13) * 100),
    markerPct: 80,
    markerLabel: 'Target',
  },
  {
    id: 'ytd',
    title: '2026 YTD Sales',
    tone: 'needs_attention',
    badge: 'Needs Attention',
    currentValue: '20',
    midPhrase: ' sales / ',
    targetValue: '39',
    targetWord: 'target',
    detailLine: '(incl. full Mar)',
    fillPct: Math.round((20 / 39) * 100),
    markerPct: 80,
    markerLabel: 'Target',
  },
  {
    id: 'forecast-90',
    title: '90-Day Forecast',
    tone: 'needs_attention',
    badge: 'Needs Attention',
    currentValue: '11',
    midPhrase: ' sales/mo / ',
    targetValue: '15',
    targetWord: 'target/mo',
    detailLine: null,
    fillPct: Math.round((11 / 15) * 100),
    markerPct: 90,
    markerLabel: 'Target/mo',
  },
]
