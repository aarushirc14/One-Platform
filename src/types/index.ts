export type ItemStatus = 'active' | 'draft' | 'archived'

export type Item = {
  id: string
  title: string
  summary: string
  description: string
  status: ItemStatus
  updatedAt: string
  tags: string[]
  owner: string
}

export type DashboardStat = {
  id: string
  label: string
  value: string
  hint: string
  trend: 'up' | 'down' | 'flat'
}

export type Activity = {
  id: string
  title: string
  time: string
  type: 'item' | 'system'
}

export type UserPreferences = {
  emailDigest: boolean
  compactTables: boolean
  workspaceName: string
}
