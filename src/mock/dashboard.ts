import type { Activity, DashboardStat } from '@/types'

export const mockStats: DashboardStat[] = [
  {
    id: 'throughput',
    label: 'Throughput',
    value: '842',
    hint: 'tasks closed (30d)',
    trend: 'up',
  },
  {
    id: 'cycle',
    label: 'Avg. cycle',
    value: '1.8d',
    hint: 'median time to done',
    trend: 'flat',
  },
  {
    id: 'risk',
    label: 'At-risk items',
    value: '6',
    hint: 'past soft deadline',
    trend: 'down',
  },
  {
    id: 'satisfaction',
    label: 'Demo rating',
    value: '4.7',
    hint: 'internal pilot (mock)',
    trend: 'up',
  },
]

export const mockActivity: Activity[] = [
  {
    id: 'a1',
    title: 'Acme sync checklist marked active',
    time: '2h ago',
    type: 'item',
  },
  {
    id: 'a2',
    title: 'New draft: Launch asset pack',
    time: 'Yesterday',
    type: 'item',
  },
  {
    id: 'a3',
    title: 'Workspace theme preference saved (mock)',
    time: '2d ago',
    type: 'system',
  },
  {
    id: 'a4',
    title: 'Billing runbook link shared with Finance',
    time: '3d ago',
    type: 'item',
  },
]
