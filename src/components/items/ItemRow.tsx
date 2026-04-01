import { Link } from 'react-router-dom'
import type { Item } from '@/types'
import { Badge } from '@/components/ui/Badge'
import { cn } from '@/lib/cn'

type ItemRowProps = {
  item: Item
}

function formatDate(iso: string): string {
  return new Intl.DateTimeFormat(undefined, {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(iso))
}

export function ItemRow({ item }: ItemRowProps) {
  return (
    <Link
      to={`/items/${item.id}`}
      className={cn(
        'group flex flex-col gap-3 rounded-xl border border-transparent px-4 py-4 transition-colors',
        'hover:border-slate-200 hover:bg-white hover:shadow-sm',
      )}
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="font-medium text-slate-900 group-hover:text-indigo-700">{item.title}</p>
          <p className="mt-1 text-sm text-slate-600">{item.summary}</p>
        </div>
        <Badge status={item.status}>{item.status}</Badge>
      </div>
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-slate-500">
        <span>{item.owner}</span>
        <span aria-hidden>·</span>
        <span>Updated {formatDate(item.updatedAt)}</span>
        <span className="hidden sm:inline" aria-hidden>
          ·
        </span>
        <span className="flex flex-wrap gap-1.5">
          {item.tags.map((tag) => (
            <span key={tag} className="rounded-md bg-slate-100 px-2 py-0.5 text-slate-700">
              {tag}
            </span>
          ))}
        </span>
      </div>
    </Link>
  )
}
