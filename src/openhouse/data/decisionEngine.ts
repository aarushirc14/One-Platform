import {
  divisionCommunities,
  divisionCommunitiesSummary,
  divisionKpis,
  divisionName,
} from '@/pulse/data/division'
import {
  divisionPerformanceExecutiveOverview,
  divisionPerformanceNextSteps,
  salesForecastSummaryCards,
} from '@/pulse/data/divisionPerformanceReport'
import {
  divisionLeadingIndicatorsExecutiveSentence,
  forecastDriverTopMetrics,
} from '@/pulse/data/forecastLeadingIndicators'
import { formatPulseDataValidUntil } from '@/pulse/lib/pulseDatePeriods'
import type {
  ActionRecommendation,
  CommunityWorkspaceModel,
  DecisionPlatformModel,
  DriverInsight,
  OutlookTone,
  PriorityItem,
  PriorityTone,
  StageDiagnostic,
  StageTone,
  StatusMetric,
} from '@/openhouse/types'

type StageKey = 'webTraffic' | 'totalLeads' | 'firstVisits' | 'salesImpact'

type CommunityCopy = {
  summary: string
  narrative: string
  primaryDiagnosis: string
  likelyCause: string
  nextAction: string
  actions: Omit<ActionRecommendation, 'id'>[]
  keyQuestions: string[]
  relatedDriverIds: string[]
  trendDriverId: string
}

const stageDefinitions: Record<
  StageKey,
  { label: string; positive: string; negative: string; watch: string }
> = {
  webTraffic: {
    label: 'Demand volume',
    positive: 'Traffic quality is strong enough to support more pace if the team protects conversion.',
    negative: 'Qualified demand is too light to feed the funnel consistently.',
    watch: 'Traffic is moving, but the current mix is not yet dependable enough for plan.',
  },
  totalLeads: {
    label: 'Lead creation',
    positive: 'Interest is being converted into leads at a healthy rate.',
    negative: 'Attention is not reliably becoming net-new leads in the CRM.',
    watch: 'Lead capture is mixed and needs tighter landing-page and follow-up execution.',
  },
  firstVisits: {
    label: 'Tour scheduling',
    positive: 'Lead handoff into first visits is supporting future closes.',
    negative: 'Prospects are stalling before the first serious sales conversation.',
    watch: 'Visit creation is uneven and likely depends too much on individual rep execution.',
  },
  salesImpact: {
    label: 'Close efficiency',
    positive: 'Visits are converting into sales cleanly enough to create a playbook.',
    negative: 'The community is leaking too much value after the first visit.',
    watch: 'Close performance is close to acceptable, but not dependable enough for target.',
  },
}

const communityCopy: Record<string, CommunityCopy> = {
  'catalina-foothills': {
    summary: 'Catalina is not short on attention. It is short on clean conversion after shoppers engage.',
    narrative:
      'Catalina Foothills is the clearest example of a middle-to-late funnel problem. Traffic and first visits are close enough to keep the community in the game, but too few qualified visits are ending in contracts. That is why the community still sits materially behind plan even without a pure demand collapse.',
    primaryDiagnosis: 'Fix visit-to-sale execution before adding more spend.',
    likelyCause:
      'The main leak is post-visit conversion: shoppers are arriving, but pricing clarity, follow-up cadence, or offer framing is not moving enough buyers to commitment.',
    nextAction: 'Audit recent first visits, pricing objections, and 7-day follow-up coverage.',
    actions: [
      {
        title: 'Review every lost visit from the last 30 days',
        detail: 'Look for recurring objections around pricing, homesite fit, incentives, and sales rep follow-up timing.',
        owner: 'Sales leader',
        timeframe: 'This week',
      },
      {
        title: 'Tighten the post-visit conversion motion',
        detail: 'Standardize a 48-hour recap, an offer-path recommendation, and a manager review for every qualified visit.',
        owner: 'Community sales team',
        timeframe: 'Next 2 weeks',
      },
      {
        title: 'Protect qualified traffic while conversion work happens',
        detail: 'Do not over-rotate budget out of Catalina until close-rate execution has been addressed.',
        owner: 'Marketing lead',
        timeframe: 'This month',
      },
    ],
    keyQuestions: [
      'Is the real blocker pricing confidence, product fit, or follow-up discipline after the first visit?',
      'Which recent visits looked finance-ready but still failed to contract?',
    ],
    relatedDriverIds: ['driver-4', 'driver-5', 'driver-2'],
    trendDriverId: 'driver-4',
  },
  'gladden-farms': {
    summary: 'Gladden is the biggest volume problem in the division and needs more qualified demand, not just better storytelling.',
    narrative:
      'Gladden Farms is behind because the funnel starts too small. The downstream stages are not perfect, but the dominant issue is that the community does not generate enough qualified top-of-funnel traffic or enough net-new leads to give sales a real chance of catching plan.',
    primaryDiagnosis: 'Refill qualified traffic and net-new lead creation.',
    likelyCause:
      'Paid and email are helping the division overall, but Gladden is not receiving enough of that lift in a way that turns into fresh pipeline.',
    nextAction: 'Rebuild channel mix and creative around net-new demand generation.',
    actions: [
      {
        title: 'Shift paid media toward high-intent acquisition',
        detail: 'Review channel mix, geo radius, and creative to prioritize audiences most likely to book an initial conversation.',
        owner: 'Marketing lead',
        timeframe: 'This week',
      },
      {
        title: 'Audit lead capture friction end to end',
        detail: 'Check landing pages, forms, call routing, and response time for every high-intent campaign.',
        owner: 'Growth ops',
        timeframe: 'Next 10 days',
      },
      {
        title: 'Set a traffic floor before judging sales execution',
        detail: 'Avoid over-correcting the rep team until the community has enough qualified volume to work.',
        owner: 'Division president',
        timeframe: 'This month',
      },
    ],
    keyQuestions: [
      'Are we under-investing in demand, or are we buying the wrong traffic for Gladden?',
      'Which campaigns are generating clicks without credible lead creation?',
    ],
    relatedDriverIds: ['driver-1', 'driver-3', 'driver-4'],
    trendDriverId: 'driver-1',
  },
  saddlebrook: {
    summary: 'Saddlebrook is the healthiest community in the portfolio and should be treated as the operating playbook.',
    narrative:
      'Saddlebrook is effectively on plan and is the best proof that the division can still close efficiently when visits are clean. The value of this community is not just its own result; it is the clearest source of operating patterns that can be copied into weaker communities.',
    primaryDiagnosis: 'Scale what works before the rest of the division slips further.',
    likelyCause:
      'This community is doing the basics well: enough demand, solid lead creation, and stronger visit-to-sale conversion than the rest of the division.',
    nextAction: 'Codify Saddlebrook’s visit-to-sale playbook and export it.',
    actions: [
      {
        title: 'Capture the close-rate playbook',
        detail: 'Document how Saddlebrook handles first visits, manager involvement, and follow-up pacing.',
        owner: 'Sales excellence lead',
        timeframe: 'This week',
      },
      {
        title: 'Reuse the best-performing campaign mix',
        detail: 'Mirror the channel and messaging patterns that are generating the cleanest visits here.',
        owner: 'Marketing lead',
        timeframe: 'Next 2 weeks',
      },
      {
        title: 'Use Saddlebrook as the control group',
        detail: 'Measure other interventions against the one community already proving the model can work.',
        owner: 'Analyst',
        timeframe: 'Ongoing',
      },
    ],
    keyQuestions: [
      'What is Saddlebrook doing on visit-to-sale that can be standardized elsewhere?',
      'Which parts of the demand mix are unique here versus portable across the division?',
    ],
    relatedDriverIds: ['driver-5', 'driver-1', 'driver-2'],
    trendDriverId: 'driver-5',
  },
  'tanque-verde': {
    summary: 'Tanque is seeing enough interest to stay relevant, but not enough of it becomes fresh pipeline.',
    narrative:
      'Tanque Verde has early demand signals that look better than the sales result. Repeat engagement and some traffic quality metrics are encouraging, but the community is not turning that attention into enough net-new leads or enough high-quality first visits. It is a lead-creation and handoff problem more than a pure awareness problem.',
    primaryDiagnosis: 'Convert repeat interest into net-new leads and cleaner first visits.',
    likelyCause:
      'The community is re-engaging existing shoppers more effectively than it is capturing fresh prospects and moving them into scheduled conversations.',
    nextAction: 'Tighten lead capture and rep handoff before adding incremental budget.',
    actions: [
      {
        title: 'Diagnose repeat-visitor leakage',
        detail: 'Identify where returning traffic is failing to request information, schedule, or re-enter the CRM as a high-intent lead.',
        owner: 'Analyst',
        timeframe: 'This week',
      },
      {
        title: 'Refresh offer and form experience',
        detail: 'Reduce friction on the highest-intent pages and test a stronger reason to raise a hand.',
        owner: 'Growth ops',
        timeframe: 'Next 2 weeks',
      },
      {
        title: 'Recalibrate rep follow-up for recycled interest',
        detail: 'Give the team a distinct follow-up motion for returning shoppers who have not yet converted.',
        owner: 'Sales leader',
        timeframe: 'This month',
      },
    ],
    keyQuestions: [
      'Why are returning shoppers reappearing without becoming fresh pipeline?',
      'Is the community losing intent on the site, in the CRM handoff, or at the first scheduling step?',
    ],
    relatedDriverIds: ['driver-2', 'driver-3', 'driver-4'],
    trendDriverId: 'driver-2',
  },
}

const driverNotes: Record<
  string,
  Omit<DriverInsight, 'id' | 'trend' | 'rank' | 'title' | 'summary'>
> = {
  'driver-1': {
    implication: 'Traffic growth is real, but it is not enough to declare the division healthy.',
    businessNarrative:
      'This is the strongest positive signal in the model, but it matters only if communities turn that lift into new leads and first tours. It should influence where budget goes, not create false comfort.',
    credibility: 'high',
    affectedCommunityIds: ['gladden-farms', 'tanque-verde', 'saddlebrook'],
    actionPrompt: 'Lean into the channels that are genuinely expanding demand, then verify the lead bridge immediately.',
  },
  'driver-2': {
    implication: 'The division is recycling attention better than it is creating fresh pipeline.',
    businessNarrative:
      'Returning visitors are more engaged, which is useful, but it can disguise stagnation if teams mistake repeat browsing for net-new demand.',
    credibility: 'high',
    affectedCommunityIds: ['tanque-verde', 'catalina-foothills', 'saddlebrook'],
    actionPrompt: 'Separate repeat-interest nurture from true demand-generation and measure them differently.',
  },
  'driver-3': {
    implication: 'Forecast softness will persist until net-new lead creation improves.',
    businessNarrative:
      'This is the clearest bridge between strong traffic optics and weak forecast performance. Without more fresh leads, the division will keep reworking a limited buyer pool.',
    credibility: 'high',
    affectedCommunityIds: ['gladden-farms', 'tanque-verde'],
    actionPrompt: 'Treat net-new lead creation as the gating metric for near-term forecast confidence.',
  },
  'driver-4': {
    implication: 'The sales forecast is being constrained by a weak handoff into first tours.',
    businessNarrative:
      'This is the operational choke point. Interest exists, but enough prospects are not reaching a dated, onsite conversation. Until that improves, forecast gains will stay muted.',
    credibility: 'high',
    affectedCommunityIds: ['catalina-foothills', 'gladden-farms', 'tanque-verde'],
    actionPrompt: 'Audit scheduling, rep responsiveness, and manager intervention at the first-tour handoff.',
  },
  'driver-5': {
    implication: 'Communities that do schedule appointments still need cleaner execution to finish the sale.',
    businessNarrative:
      'This is the close-quality signal. It is especially useful for explaining why some communities look healthy mid-funnel but still miss on contracts.',
    credibility: 'medium',
    affectedCommunityIds: ['catalina-foothills', 'saddlebrook'],
    actionPrompt: 'Benchmark post-appointment close discipline and copy the best-performing motion division-wide.',
  },
}

function parseSignedValue(value: string): number {
  const match = value.match(/[+-]?\d+(?:\.\d+)?/)
  return match ? Number.parseFloat(match[0]) : 0
}

function formatGapLabel(gap: number) {
  const abs = Math.abs(gap)
  if (gap > 0) return `${abs.toFixed(1)} sales ahead`
  if (gap < 0) return `${abs.toFixed(1)} sales behind`
  return 'On plan'
}

function getPriorityTone(gap: number): PriorityTone {
  if (gap <= -7) return 'critical'
  if (gap < 0) return 'watch'
  return 'opportunity'
}

function getOutlookTone(gap: number, closeImpact: number): OutlookTone {
  if (gap >= 0 && closeImpact >= 0) return 'strong'
  if (gap >= -2 && closeImpact > -2) return 'on-track'
  if (gap >= -6) return 'at-risk'
  return 'off-track'
}

function getStageTone(value: number): StageTone {
  if (value <= -2) return 'weak'
  if (value < 0.5) return 'watch'
  return 'strong'
}

function buildStageDiagnostic(
  stageId: StageKey,
  signal: string | undefined,
  impact: string,
): StageDiagnostic {
  const impactValue = parseSignedValue(impact)
  const tone = getStageTone(impactValue)
  const stage = stageDefinitions[stageId]
  const interpretation =
    tone === 'strong' ? stage.positive : tone === 'weak' ? stage.negative : stage.watch

  return {
    id: stageId,
    label: stage.label,
    signal: signal ?? 'Signal unavailable',
    impact,
    tone,
    interpretation,
  }
}

function buildDrivers(): DriverInsight[] {
  return forecastDriverTopMetrics.map((metric) => {
    const id = `driver-${metric.rank}`
    const note = driverNotes[id]
    return {
      id,
      rank: metric.rank,
      title: metric.metric,
      summary: metric.recentChanges,
      implication: note.implication,
      businessNarrative: note.businessNarrative,
      credibility: note.credibility,
      affectedCommunityIds: note.affectedCommunityIds,
      actionPrompt: note.actionPrompt,
      trend: metric.trend,
    }
  })
}

const drivers = buildDrivers()
const driversById = Object.fromEntries(drivers.map((driver) => [driver.id, driver]))

function buildCommunityWorkspace(row: (typeof divisionCommunities)[number]): CommunityWorkspaceModel {
  const copy = communityCopy[row.id]
  const actualSales = Number.parseInt(row.sales, 10)
  const targetSales = Number.parseInt(row.target, 10)
  const salesGap = parseSignedValue(row.salesGap)
  const closeImpact = parseSignedValue(row.salesImpact.label)

  return {
    id: row.id,
    name: row.name,
    outlook: getOutlookTone(salesGap, closeImpact),
    priorityTone: getPriorityTone(salesGap),
    actualSales,
    targetSales,
    salesGap,
    summary: copy.summary,
    narrative: copy.narrative,
    primaryDiagnosis: copy.primaryDiagnosis,
    likelyCause: copy.likelyCause,
    nextAction: copy.nextAction,
    actions: copy.actions.map((action, index) => ({
      id: `${row.id}-action-${index + 1}`,
      ...action,
    })),
    stageDiagnostics: [
      buildStageDiagnostic('webTraffic', row.webTraffic.conversionLabel, row.webTraffic.label),
      buildStageDiagnostic('totalLeads', row.totalLeads.conversionLabel, row.totalLeads.label),
      buildStageDiagnostic('firstVisits', row.firstVisits.conversionLabel, row.firstVisits.label),
      buildStageDiagnostic('salesImpact', row.salesImpact.conversionLabel, row.salesImpact.label),
    ],
    relatedDriverIds: copy.relatedDriverIds,
    trendDriverId: copy.trendDriverId,
    keyQuestions: copy.keyQuestions,
  }
}

const communities = Object.fromEntries(
  divisionCommunities.map((row) => [row.id, buildCommunityWorkspace(row)]),
) satisfies Record<string, CommunityWorkspaceModel>

const priorities: PriorityItem[] = divisionCommunities
  .map((row) => {
    const workspace = communities[row.id]
    return {
      id: `priority-${row.id}`,
      rank: 0,
      communityId: row.id,
      communityName: row.name,
      outlook: workspace.outlook,
      priorityTone: workspace.priorityTone,
      salesGap: workspace.salesGap,
      salesGapLabel: formatGapLabel(workspace.salesGap),
      actualSales: workspace.actualSales,
      targetSales: workspace.targetSales,
      summary: workspace.summary,
      primaryDiagnosis: workspace.primaryDiagnosis,
      likelyCause: workspace.likelyCause,
      recommendedAction: workspace.nextAction,
      expectedImpact: row.salesImpact.label,
      actionOwner: workspace.actions[0]?.owner ?? 'Division team',
      linkedDriverIds: workspace.relatedDriverIds,
    }
  })
  .sort((a, b) => {
    const toneScore = { critical: 3, watch: 2, opportunity: 1 }
    const scoreA = toneScore[a.priorityTone] * 100 + Math.abs(a.salesGap)
    const scoreB = toneScore[b.priorityTone] * 100 + Math.abs(b.salesGap)
    return scoreB - scoreA
  })
  .map((item, index) => ({ ...item, rank: index + 1 }))

const topPriorities = priorities.slice(0, 3)

const statusMetrics: StatusMetric[] = [
  {
    id: 'actuals',
    label: 'Actuals',
    value: `${divisionKpis[0]?.headlineValue ?? '0'} sales`,
    detail: `${divisionCommunitiesSummary.sales} actual vs ${divisionCommunitiesSummary.target} target YTD`,
    tone: 'negative',
  },
  {
    id: 'gap',
    label: 'Gap to plan',
    value: formatGapLabel(parseSignedValue(divisionCommunitiesSummary.salesGap)),
    detail: 'Division-wide plan variance across all active communities',
    tone: 'negative',
  },
  {
    id: 'pace',
    label: '90-day pace',
    value: salesForecastSummaryCards[2]?.detailLine ?? '12 sales/mo vs 15 target',
    detail: salesForecastSummaryCards[2]?.primaryStat ?? '3 sales/mo behind',
    tone: 'negative',
  },
  {
    id: 'best-community',
    label: 'Best operating signal',
    value: 'Saddlebrook',
    detail: 'Only community currently on plan and ready to export as a playbook',
    tone: 'positive',
  },
]

const overviewActions: ActionRecommendation[] = topPriorities.map((priority, index) => ({
  id: `overview-action-${index + 1}`,
  title: priority.recommendedAction,
  detail: `${priority.communityName}: ${priority.summary}`,
  owner: priority.actionOwner,
  timeframe: index === 0 ? 'This week' : index === 1 ? 'Next 2 weeks' : 'This month',
}))

export const decisionPlatformModel: DecisionPlatformModel = {
  divisionName,
  overview: {
    title: `${divisionName} Decision Engine`,
    subtitle: 'One platform to understand status, focus, causes, and next actions.',
    overallOutlook: 'at-risk',
    narrative: divisionLeadingIndicatorsExecutiveSentence,
    statusMetrics,
    decisionCards: divisionPerformanceExecutiveOverview.qa,
    risk: divisionPerformanceExecutiveOverview.risk,
    opportunity: divisionPerformanceExecutiveOverview.opportunity,
    actionRecommendations: overviewActions,
  },
  priorities,
  drivers,
  communities,
  briefing: {
    title: `${divisionName} Executive Briefing`,
    subtitle: 'Printable decision brief generated from the same live platform view.',
    snapshotLabel: formatPulseDataValidUntil(new Date()),
    executiveSummary:
      'The division is still behind plan, but the path to improvement is clearer than the old report structure suggested: Gladden needs demand, Tanque needs lead creation, Catalina needs close-rate repair, and Saddlebrook should be treated as the playbook community.',
    topPriorities,
    keyDrivers: drivers.slice(0, 3),
    actionRecommendations: overviewActions,
    discussionPrompts: divisionPerformanceNextSteps.discussionPrompts,
  },
}

export function getCommunityWorkspace(communityId: string) {
  return decisionPlatformModel.communities[communityId] ?? null
}

export function getDriverById(driverId: string) {
  return driversById[driverId] ?? null
}
