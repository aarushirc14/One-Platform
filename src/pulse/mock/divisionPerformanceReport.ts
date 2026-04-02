/** Static copy and figures for the Division Performance report (PDF-aligned, Open Homes Tucson). */

export const DIVISION_PERFORMANCE_REPORT_TITLE = 'Tucson Division Performance'

/** Fixed reporting boundary for the monthly Division Performance snapshot (no live filters). */
export const DIVISION_PERFORMANCE_DATA_FRESHNESS_NOTE =
  'Division performance is updated monthly and shows only the most recent completed month.'

export const DIVISION_PERFORMANCE_DATA_UNTIL_NOTE = 'Data Until: March 31 2026'

export const salesForecastIntro = {
  headline: 'SALES FORECAST',
  subline: 'Forward-looking sales projection vs target',
  /** Shorter copy matches dashboard screenshot (red alert strip). */
  alert:
    'Forecast averaging 4 sales/mo below target. Ytd pacing behind target.',
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
    label: 'MARCH MTD SALES',
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
    label: '2026 YTD SALES',
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
    label: '90-DAY FORECAST',
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
    label: 'NEXT 30 DAYS',
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
    label: '30-60 DAYS',
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
    label: '60-90 DAYS',
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
    actual2026: null,
    forecast2026: 24,
    cumulative2025: 39,
    cumulative2024: 26,
  },
  {
    month: 'Apr',
    target2026: 55,
    actual2026: null,
    forecast2026: 33,
    cumulative2025: 49,
    cumulative2024: 35,
  },
  {
    month: 'May',
    target2026: 70,
    actual2026: null,
    forecast2026: 45,
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
}

export const communityPerformanceAlert =
  '0 of 4 communities on track for next 90-day target. 3 communities need 1+ catch-up sales. 1 community pacing ahead but still below YTD target.'

export const communityPerformanceRows: CommunityPerformanceRow[] = [
  {
    id: 'catalina-foothills',
    name: 'Catalina Foothills',
    last30Actual: 4,
    last30Target: 5,
    ytdActual: 8,
    ytdTarget: 13,
    next90Target: 17,
    next90Plan: 16,
    next90CatchUp: 1,
    primaryDriver: 'Web Traffic',
  },
  {
    id: 'gladden-farms',
    name: 'Gladden Farms',
    last30Actual: 2,
    last30Target: 4,
    ytdActual: 3,
    ytdTarget: 12,
    next90Target: 12,
    next90Plan: 10,
    next90CatchUp: 2,
    primaryDriver: 'Web Traffic',
  },
  {
    id: 'saddlebrook',
    name: 'Saddlebrook',
    last30Actual: 1,
    last30Target: 3,
    ytdActual: 4,
    ytdTarget: 9,
    next90Target: 12,
    next90Plan: 11,
    next90CatchUp: 1,
    primaryDriver: 'Web Traffic',
  },
  {
    id: 'tanque-verde',
    name: 'Tanque Verde',
    last30Actual: 5,
    last30Target: 2,
    ytdActual: 5,
    ytdTarget: 5,
    next90Target: 6,
    next90Plan: 6,
    next90CatchUp: 0,
    primaryDriver: 'First Visit → Sale Rate',
  },
]

export const outlookLegend = [
  { label: 'Strong', tone: 'strong' as const },
  { label: 'On Track', tone: 'on' as const },
  { label: 'At Risk', tone: 'risk' as const },
  { label: 'Off Track', tone: 'off' as const },
]

export const marginDriversIntro = {
  headline: 'MARGIN DRIVERS',
  alert:
    'Options uptake trailing benchmark in 3 of 4 communities. Structural margin pressure if loading does not improve.',
}

export type MarginDriverRow = {
  communityId: string
  communityName: string
  optionsLoadingPct: string
  status: string
  vsBenchmark: string
}

export const marginDriverRows: MarginDriverRow[] = [
  {
    communityId: 'catalina-foothills',
    communityName: 'Catalina Foothills',
    optionsLoadingPct: '32%',
    status: 'Not Meeting',
    vsBenchmark: '$92k vs $153k benchmark',
  },
  {
    communityId: 'gladden-farms',
    communityName: 'Gladden Farms',
    optionsLoadingPct: '28%',
    status: 'Not Meeting',
    vsBenchmark: '$81k vs $153k benchmark',
  },
  {
    communityId: 'saddlebrook',
    communityName: 'Saddlebrook',
    optionsLoadingPct: '35%',
    status: 'Not Meeting',
    vsBenchmark: '$101k vs $153k benchmark',
  },
  {
    communityId: 'tanque-verde',
    communityName: 'Tanque Verde',
    optionsLoadingPct: '41%',
    status: 'Meeting',
    vsBenchmark: '$118k vs $153k benchmark',
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
    title: 'MARCH MTD SALES',
    tone: 'on_track',
    badge: 'ON TRACK',
    currentValue: '8',
    midPhrase: ' sales / ',
    targetValue: '13',
    targetWord: 'target',
    detailLine: null,
    fillPct: Math.round((8 / 13) * 100),
    markerPct: 80,
    markerLabel: 'TARGET',
  },
  {
    id: 'ytd',
    title: '2026 YTD SALES',
    tone: 'needs_attention',
    badge: 'NEEDS ATTENTION',
    currentValue: '20',
    midPhrase: ' sales / ',
    targetValue: '39',
    targetWord: 'target',
    detailLine: '(incl. full Mar)',
    fillPct: Math.round((20 / 39) * 100),
    markerPct: 80,
    markerLabel: 'TARGET',
  },
  {
    id: 'forecast-90',
    title: '90-DAY FORECAST',
    tone: 'needs_attention',
    badge: 'NEEDS ATTENTION',
    currentValue: '11',
    midPhrase: ' sales/mo / ',
    targetValue: '15',
    targetWord: 'target/mo',
    detailLine: null,
    fillPct: Math.round((11 / 15) * 100),
    markerPct: 90,
    markerLabel: 'TARGET/MO',
  },
]

export const reportFootnotes = {
  cancellations: '* Does not include cancellations or inventory adjustments.',
  poweredBy: 'POWERED BY OPENPREDICT SALES FORECASTING',
}
