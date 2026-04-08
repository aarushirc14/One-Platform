export type OpenHouseRole = 'executive' | 'operator' | 'analyst'

export type OutlookTone = 'strong' | 'on-track' | 'at-risk' | 'off-track'

export type PriorityTone = 'critical' | 'watch' | 'opportunity'

export type StageTone = 'strong' | 'watch' | 'weak'

export type DriverCredibility = 'high' | 'medium'

export type StatusMetric = {
  id: string
  label: string
  value: string
  detail: string
  tone?: 'positive' | 'negative' | 'neutral'
}

export type DecisionCard = {
  id: string
  question: string
  answer: string
  tone: 'default' | 'attention' | 'positive'
}

export type ActionRecommendation = {
  id: string
  title: string
  detail: string
  owner: string
  timeframe: string
}

export type StageDiagnostic = {
  id: string
  label: string
  signal: string
  impact: string
  tone: StageTone
  interpretation: string
}

export type CommunityWorkspaceModel = {
  id: string
  name: string
  outlook: OutlookTone
  priorityTone: PriorityTone
  actualSales: number
  targetSales: number
  salesGap: number
  summary: string
  narrative: string
  primaryDiagnosis: string
  likelyCause: string
  nextAction: string
  actions: ActionRecommendation[]
  stageDiagnostics: StageDiagnostic[]
  relatedDriverIds: string[]
  trendDriverId: string
  keyQuestions: string[]
}

export type PriorityItem = {
  id: string
  rank: number
  communityId: string
  communityName: string
  outlook: OutlookTone
  priorityTone: PriorityTone
  salesGap: number
  salesGapLabel: string
  actualSales: number
  targetSales: number
  summary: string
  primaryDiagnosis: string
  likelyCause: string
  recommendedAction: string
  expectedImpact: string
  actionOwner: string
  linkedDriverIds: string[]
}

export type DriverInsight = {
  id: string
  rank: number
  title: string
  summary: string
  implication: string
  businessNarrative: string
  credibility: DriverCredibility
  affectedCommunityIds: string[]
  actionPrompt: string
  trend: { period: string; value: number }[]
}

export type PlatformOverview = {
  title: string
  subtitle: string
  overallOutlook: OutlookTone
  narrative: string
  statusMetrics: StatusMetric[]
  decisionCards: DecisionCard[]
  risk: string
  opportunity: string
  actionRecommendations: ActionRecommendation[]
}

export type ExecutiveBriefingModel = {
  title: string
  subtitle: string
  snapshotLabel: string
  executiveSummary: string
  topPriorities: PriorityItem[]
  keyDrivers: DriverInsight[]
  actionRecommendations: ActionRecommendation[]
  discussionPrompts: string[]
}

export type DecisionPlatformModel = {
  divisionName: string
  overview: PlatformOverview
  priorities: PriorityItem[]
  drivers: DriverInsight[]
  communities: Record<string, CommunityWorkspaceModel>
  briefing: ExecutiveBriefingModel
}
