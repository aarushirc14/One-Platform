export type ImpactBand =
  | 'd7'
  | 'd6'
  | 'd5'
  | 'd4'
  | 'd3'
  | 'd2'
  | 'd1'
  | 'n'
  | 'u1'
  | 'u2'
  | 'u3'
  | 'u4'
  | 'u5'
  | 'u6'
  | 'u7'

export type CommunityImpactCell = {
  /** Sales-impact view, e.g. "+7.7 sales" */
  label: string
  band: ImpactBand
  /** Conversion view, e.g. "161 (1.5%)" — same band colors as sales impact */
  conversionLabel?: string
}

/** Division communities table: funnel columns show conversion % or sales impact */
export type CommunitiesMetricsMode = 'conversion' | 'salesImpact'

export type DivisionCommunityRow = {
  id: string
  name: string
  salesGap: string
  sales: string
  target: string
  gapTone: 'negative' | 'neutral' | 'positive'
  webTraffic: CommunityImpactCell
  totalLeads: CommunityImpactCell
  firstVisits: CommunityImpactCell
  salesImpact: CommunityImpactCell
}

export type DivisionKpi = {
  id: string
  title: string
  headlineValue: string
  /** e.g. "sales" or "YTD sales" — same color as value/pct */
  headlineUnit: string
  headlinePct: string
  headlineTone: 'negative' | 'positive'
  footerLead: string
  footerMid: string
  footerTarget: string
  footerEnd: string
  infoTooltip: string
}

export type FunnelStatus = 'behind' | 'ahead' | 'onPace'

export type FunnelSegment = {
  title: string
  primaryLine: string
  /** Trend vs prior period (e.g. "↘ 2% from prev 3 months"). */
  secondaryLine?: string
  secondaryLineTone?: 'positive' | 'negative' | 'neutral'
  /** Optional detail line above {@link targetNote} (divider above when set). */
  targetLine?: string
  /** e.g. "60% better vs target" — use "target", not "benchmark". */
  targetNote?: string
  targetNoteTone?: 'positive' | 'negative' | 'neutral'
}

export type FunnelColumn = {
  id: string
  title: string
  status: FunnelStatus
  highlight?: boolean
  segments: FunnelSegment[]
  salesImpactLabel: string
  salesImpactTone: 'negative' | 'positive' | 'neutral'
}

export type MetricTableRow =
  | {
      kind: 'data'
      metric: string
      countsLabel: string
      countsFrom: string
      countsTo: string
      countsToLabel: string
      communityRate: string
      targetRate: string
      performance: string
      performanceTone: 'positive' | 'negative'
      change: string
      changeTone: 'positive' | 'negative'
      changeUp: boolean
    }
  | { kind: 'placeholder'; metric: string }

export type MetricTableSection = {
  title: string | null
  rows: MetricTableRow[]
  /** When set, this data row shows an expandable 12‑month trend chart (row click or Trends control). */
  trendChartForMetric?: string
}
