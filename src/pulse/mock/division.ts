import { INFO_KPI_SALES_VS_TARGET, INFO_KPI_SALES_VS_TARGET_YTD } from '@/pulse/constants/infoTooltips'
import type { DivisionCommunityRow, DivisionKpi, ImpactBand } from '@/pulse/types'

export const divisionName = 'Tucson'

function parseSalesGap(value: string): number {
  return parseFloat(value)
}

function parseImpactLabelNumber(label: string): number {
  const m = label.trim().match(/^([+-]?\d+(?:\.\d+)?)/)
  return m ? Number.parseFloat(m[1]) : 0
}

function formatImpactSum(n: number): string {
  const abs = Math.abs(n).toFixed(1)
  if (n > 0) return `+${abs} sales`
  if (n < 0) return `-${abs} sales`
  return '0.0 sales'
}

function parseConversionLabel(s: string): { count: number; pct: number } | null {
  const m = s.trim().match(/^(\d+)\s+\(([+-]?\d+(?:\.\d+)?)%\)$/)
  if (!m) return null
  return { count: Number.parseInt(m[1], 10), pct: Number.parseFloat(m[2]) }
}

function aggregateConversionColumn(
  rows: DivisionCommunityRow[],
  key: 'webTraffic' | 'totalLeads' | 'firstVisits' | 'salesImpact',
): string {
  let countSum = 0
  let weightedPct = 0
  for (const r of rows) {
    const raw = r[key].conversionLabel
    const parsed = raw ? parseConversionLabel(raw) : null
    if (parsed) {
      countSum += parsed.count
      weightedPct += parsed.count * parsed.pct
    }
  }
  if (countSum === 0) return '0 (0.0%)'
  const pct = weightedPct / countSum
  return `${countSum} (${pct.toFixed(1)}%)`
}

/** Map net “sales” impact to the same band scale used by community rows. */
function bandFromNetSalesImpact(net: number): ImpactBand {
  if (net === 0 || Math.abs(net) < 0.05) return 'n'
  if (net <= -25) return 'd7'
  if (net <= -15) return 'd6'
  if (net <= -9) return 'd5'
  if (net <= -5) return 'd4'
  if (net <= -2) return 'd3'
  if (net < 0) return 'd2'
  if (net < 2) return 'u1'
  if (net < 4) return 'u2'
  if (net < 8) return 'u3'
  if (net < 14) return 'u4'
  if (net < 18) return 'u5'
  return 'u6'
}

/** Single summary row: sums numeric columns and impact deltas from community rows. */
export function buildDivisionCommunitiesSummary(rows: DivisionCommunityRow[]): DivisionCommunityRow {
  let gapSum = 0
  let salesSum = 0
  let targetSum = 0
  let webSum = 0
  let leadsSum = 0
  let firstSum = 0
  let impactSum = 0

  for (const r of rows) {
    gapSum += parseSalesGap(r.salesGap)
    salesSum += Number.parseInt(r.sales, 10)
    targetSum += Number.parseInt(r.target, 10)
    webSum += parseImpactLabelNumber(r.webTraffic.label)
    leadsSum += parseImpactLabelNumber(r.totalLeads.label)
    firstSum += parseImpactLabelNumber(r.firstVisits.label)
    impactSum += parseImpactLabelNumber(r.salesImpact.label)
  }

  const gapTone: DivisionCommunityRow['gapTone'] =
    gapSum < 0 ? 'negative' : gapSum > 0 ? 'positive' : 'neutral'

  return {
    id: '_division-summary',
    name: `${divisionName} Summary`,
    salesGap: gapSum.toFixed(1),
    sales: String(salesSum),
    target: String(targetSum),
    gapTone,
    webTraffic: {
      label: formatImpactSum(webSum),
      band: bandFromNetSalesImpact(webSum),
      conversionLabel: aggregateConversionColumn(rows, 'webTraffic'),
    },
    totalLeads: {
      label: formatImpactSum(leadsSum),
      band: bandFromNetSalesImpact(leadsSum),
      conversionLabel: aggregateConversionColumn(rows, 'totalLeads'),
    },
    firstVisits: {
      label: formatImpactSum(firstSum),
      band: bandFromNetSalesImpact(firstSum),
      conversionLabel: aggregateConversionColumn(rows, 'firstVisits'),
    },
    salesImpact: {
      label: formatImpactSum(impactSum),
      band: bandFromNetSalesImpact(impactSum),
      conversionLabel: aggregateConversionColumn(rows, 'salesImpact'),
    },
  }
}

export const divisionKpis: DivisionKpi[] = [
  {
    id: 'k1',
    title: 'Sales vs Target (Nov 2025 - Jan 2026)',
    headlineValue: '29.0',
    headlineUnit: 'sales',
    headlinePct: '(-53.2%)',
    headlineTone: 'negative',
    footerLead: '29.0',
    footerMid: ' sales vs ',
    footerTarget: '62.0',
    footerEnd: ' plan',
    infoTooltip: INFO_KPI_SALES_VS_TARGET,
  },
  {
    id: 'k2',
    title: 'Sales vs Target YTD (2026)',
    headlineValue: '8.0',
    headlineUnit: 'YTD sales',
    headlinePct: '(-33.3%)',
    headlineTone: 'negative',
    footerLead: '8.0',
    footerMid: ' sales vs ',
    footerTarget: '12.0',
    footerEnd: ' target',
    infoTooltip: INFO_KPI_SALES_VS_TARGET_YTD,
  },
]

export const divisionCommunities: DivisionCommunityRow[] = [
  {
    id: 'catalina-foothills',
    name: 'Catalina Foothills',
    salesGap: '-1.0',
    sales: '16',
    target: '17',
    gapTone: 'negative',
    webTraffic: { label: '-9.9 sales', band: 'd4', conversionLabel: '2103 (-8.2%)' },
    totalLeads: { label: '+1.3 sales', band: 'u2', conversionLabel: '161 (1.5%)' },
    firstVisits: { label: '-0.2 sales', band: 'n', conversionLabel: '340 (0.0%)' },
    salesImpact: { label: '+7.7 sales', band: 'u6', conversionLabel: '47 (29.2%)' },
  },
  {
    id: 'gladden-farms',
    name: 'Gladden Farms',
    salesGap: '-12.3',
    sales: '18',
    target: '30',
    gapTone: 'negative',
    webTraffic: { label: '-12.3 sales', band: 'd6', conversionLabel: '1840 (-14.6%)' },
    totalLeads: { label: '-8.1 sales', band: 'd5', conversionLabel: '92 (-11.3%)' },
    firstVisits: { label: '+0.4 sales', band: 'u1', conversionLabel: '201 (0.8%)' },
    salesImpact: { label: '+7.7 sales', band: 'u5', conversionLabel: '51 (24.0%)' },
  },
  {
    id: 'saddlebrook',
    name: 'Saddlebrook',
    salesGap: '0.0',
    sales: '11',
    target: '11',
    gapTone: 'neutral',
    webTraffic: { label: '0.0 sales', band: 'n', conversionLabel: '1102 (0.0%)' },
    totalLeads: { label: '-2.1 sales', band: 'd3', conversionLabel: '267 (-3.2%)' },
    firstVisits: { label: '+2.8 sales', band: 'u4', conversionLabel: '88 (12.4%)' },
    salesImpact: { label: '-0.5 sales', band: 'd2', conversionLabel: '33 (-1.8%)' },
  },
  {
    id: 'tanque-verde',
    name: 'Tanque Verde',
    salesGap: '-4.0',
    sales: '9',
    target: '13',
    gapTone: 'negative',
    webTraffic: { label: '-6.8 sales', band: 'd4', conversionLabel: '956 (-6.1%)' },
    totalLeads: { label: '+1.1 sales', band: 'u2', conversionLabel: '134 (2.2%)' },
    firstVisits: { label: '0.0 sales', band: 'n', conversionLabel: '205 (0.0%)' },
    salesImpact: { label: '+3.4 sales', band: 'u4', conversionLabel: '29 (8.7%)' },
  },
]

export const divisionCommunitiesSummary = buildDivisionCommunitiesSummary(divisionCommunities)
