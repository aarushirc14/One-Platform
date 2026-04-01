import type { HTMLAttributes } from 'react'
import type { ItemStatus } from '@/types'
import { cn } from '@/lib/cn'

const statusStyles: Record<ItemStatus, string> = {
  active: 'bg-emerald-50 text-emerald-800 ring-emerald-600/15',
  draft: 'bg-amber-50 text-amber-900 ring-amber-600/20',
  archived: 'bg-slate-100 text-slate-700 ring-slate-500/15',
}

type BadgeProps = HTMLAttributes<HTMLSpanElement> & {
  status?: ItemStatus
}

export function Badge({ className, status, children, ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium ring-1 ring-inset',
        status ? statusStyles[status] : 'bg-slate-100 text-slate-700 ring-slate-500/15',
        className,
      )}
      {...props}
    >
      {children}
    </span>
  )
}
