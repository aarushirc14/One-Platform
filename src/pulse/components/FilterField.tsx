import { IconChevronDown } from '@/pulse/components/icons'
import { cn } from '@/lib/cn'

type FilterFieldProps = {
  label: string
  value: string
  className?: string
}

export function FilterField({ label, value, className }: FilterFieldProps) {
  return (
    <div className={cn('min-w-[140px] flex-1 sm:min-w-[170px] sm:flex-initial', className)}>
      <p className="mb-1 text-xs font-medium text-neutral-600">{label}</p>
      <button
        type="button"
        className="flex h-9 w-full items-center justify-between gap-2 rounded-md border border-neutral-300 bg-white px-3 text-left text-xs font-medium text-neutral-900 shadow-sm"
      >
        <span className="truncate">{value}</span>
        <IconChevronDown className="shrink-0 text-neutral-500" />
      </button>
    </div>
  )
}
