import { useMemo, useState } from 'react'
import { getMockItems } from '@/mock'
import type { ItemStatus } from '@/types'
import { PageHeader } from '@/components/ui/PageHeader'
import { ItemRow } from '@/components/items/ItemRow'
import { cn } from '@/lib/cn'

const filters: Array<{ label: string; value: 'all' | ItemStatus }> = [
  { label: 'All', value: 'all' },
  { label: 'Active', value: 'active' },
  { label: 'Draft', value: 'draft' },
  { label: 'Archived', value: 'archived' },
]

export function ItemsPage() {
  const [filter, setFilter] = useState<'all' | ItemStatus>('all')
  const items = useMemo(() => getMockItems(), [])
  const filtered = useMemo(() => {
    if (filter === 'all') return items
    return items.filter((item) => item.status === filter)
  }, [filter, items])

  return (
    <>
      <PageHeader
        title="Items"
        description="Workspace tasks and checklists. Filter is local state only."
      />

      <div className="flex flex-wrap gap-2">
        {filters.map((f) => (
          <button
            key={f.value}
            type="button"
            onClick={() => setFilter(f.value)}
            className={cn(
              'rounded-full px-4 py-1.5 text-sm font-medium transition-colors',
              filter === f.value
                ? 'bg-slate-900 text-white shadow-sm'
                : 'bg-white text-slate-600 ring-1 ring-slate-200 hover:bg-slate-50',
            )}
          >
            {f.label}
          </button>
        ))}
      </div>

      <div className="rounded-2xl border border-slate-200/80 bg-white/90 shadow-sm">
        <div className="divide-y divide-slate-100">
          {filtered.map((item) => (
            <ItemRow key={item.id} item={item} />
          ))}
        </div>
        {filtered.length === 0 ? (
          <p className="px-4 py-12 text-center text-sm text-slate-500">No items match this filter.</p>
        ) : null}
      </div>
    </>
  )
}
