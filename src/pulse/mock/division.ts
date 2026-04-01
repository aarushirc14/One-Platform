import type { DivisionCommunityRow, DivisionKpi } from '@/pulse/types'

export const divisionName = 'Tuscon'

export const divisionKpis: DivisionKpi[] = [
  {
    id: 'k1',
    title: 'Sales vs Target (Nov 2025 - Jan 2026)',
    headline: '29.0 sales (-53.2%)',
    headlineTone: 'negative',
    subline: '29.0 sales vs 62.0 plan',
    sublineTone: 'negative',
  },
  {
    id: 'k2',
    title: 'Sales vs Target YTD (2026)',
    headline: '8.0 YTD sales (-33.3%)',
    headlineTone: 'negative',
    subline: '8.0 sales vs 12.0 target',
    sublineTone: 'negative',
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
    webTraffic: { label: '-9.9 sales', band: 'd5' },
    totalLeads: { label: '-4.2 sales', band: 'd4' },
    firstVisits: { label: '-0.2 sales', band: 'n' },
    salesImpact: { label: '+1.3 sales', band: 'u3' },
  },
  {
    id: 'gladden-farms',
    name: 'Gladden Farms',
    salesGap: '-12.3',
    sales: '18',
    target: '30',
    gapTone: 'negative',
    webTraffic: { label: '-12.3 sales', band: 'd6' },
    totalLeads: { label: '-8.1 sales', band: 'd5' },
    firstVisits: { label: '+0.4 sales', band: 'u1' },
    salesImpact: { label: '+7.7 sales', band: 'u5' },
  },
  {
    id: 'saddlebrook',
    name: 'Saddlebrook',
    salesGap: '0.0',
    sales: '11',
    target: '11',
    gapTone: 'neutral',
    webTraffic: { label: '0.0 sales', band: 'n' },
    totalLeads: { label: '-2.1 sales', band: 'd3' },
    firstVisits: { label: '+2.8 sales', band: 'u4' },
    salesImpact: { label: '-0.5 sales', band: 'd2' },
  },
  {
    id: 'tanque-verde',
    name: 'Tanque Verde',
    salesGap: '-4.0',
    sales: '9',
    target: '13',
    gapTone: 'negative',
    webTraffic: { label: '-6.8 sales', band: 'd4' },
    totalLeads: { label: '+1.1 sales', band: 'u2' },
    firstVisits: { label: '0.0 sales', band: 'n' },
    salesImpact: { label: '+3.4 sales', band: 'u4' },
  },
]
