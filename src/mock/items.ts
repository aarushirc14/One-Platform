import type { Item } from '@/types'

const items: Item[] = [
  {
    id: 'acme-sync',
    title: 'Acme sync checklist',
    summary: 'Weekly customer data validation',
    description:
      'Run through the Acme export pipeline, spot-check ten random rows, and confirm webhook receipts in the audit log. Escalate discrepancies to #ops-data.',
    status: 'active',
    updatedAt: '2026-03-28T14:20:00.000Z',
    tags: ['Customers', 'ETL'],
    owner: 'Jordan Lee',
  },
  {
    id: 'launch-assets',
    title: 'Launch asset pack',
    summary: 'Prep screenshots and copy variants',
    description:
      'Collect three hero screenshots, two short Looms, and four headline variants for the April drop. Store final assets under Marketing / 2026 Q2.',
    status: 'draft',
    updatedAt: '2026-03-26T09:05:00.000Z',
    tags: ['Marketing', 'Design'],
    owner: 'Sam Rivera',
  },
  {
    id: 'billing-runbook',
    title: 'Billing runbook',
    summary: 'End-of-month close procedure',
    description:
      'Step-by-step outline for invoice generation, dunning retries, and reconciliation with the ledger. Keep this synchronized with Finance’s spreadsheet.',
    status: 'active',
    updatedAt: '2026-03-24T16:40:00.000Z',
    tags: ['Finance', 'Ops'],
    owner: 'Taylor Kim',
  },
  {
    id: 'api-health',
    title: 'API health dashboard',
    summary: 'Latency and error budget tiles',
    description:
      'Layout for p95 latency, 5xx rate, and saturated workers — illustrative until gateway telemetry is wired in.',
    status: 'archived',
    updatedAt: '2026-02-10T11:00:00.000Z',
    tags: ['Engineering'],
    owner: 'Alex Chen',
  },
  {
    id: 'support-macros',
    title: 'Support macros refresh',
    summary: 'Revise top ten canned replies',
    description:
      'Audit macros for tone and accuracy after the pricing change. Pair each macro with a help-article link and a fallback escalation path.',
    status: 'active',
    updatedAt: '2026-03-30T08:15:00.000Z',
    tags: ['Support', 'Content'],
    owner: 'Riley Patel',
  },
  {
    id: 'security-review',
    title: 'Vendor security review',
    summary: 'Quarterly third-party questionnaire',
    description:
      'Collect SOC 2 reports, pen-test summaries, and subprocessors list. Track missing items in the compliance tracker with due dates.',
    status: 'draft',
    updatedAt: '2026-03-21T19:30:00.000Z',
    tags: ['Security', 'Legal'],
    owner: 'Morgan Blake',
  },
]

export function getSampleItems(): Item[] {
  return items
}

export function getItemById(id: string): Item | undefined {
  return items.find((item) => item.id === id)
}
