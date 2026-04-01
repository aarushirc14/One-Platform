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
  label: string
  band: ImpactBand
}

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
  headline: string
  headlineTone: 'negative' | 'positive'
  subline: string
  sublineTone: 'negative' | 'positive' | 'muted'
}

export type FunnelStatus = 'behind' | 'ahead' | 'onPace'

export type FunnelSegment = {
  title: string
  primaryLine: string
  secondaryLine: string
  benchmarkLine: string
  benchmarkNote: string
  benchmarkNoteTone: 'positive' | 'negative' | 'neutral'
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
      benchmarkRate: string
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
}
