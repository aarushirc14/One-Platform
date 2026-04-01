import { useEffect, useId, useRef, useState } from 'react'
import { IconChevronDown } from '@/pulse/components/icons'
import { cn } from '@/lib/cn'

type Option = { value: string; label: string }

type PulseFilterSelectProps = {
  /** Shown inside the control, de-emphasized above the value */
  label: string
  value: string
  options: readonly Option[]
  onChange: (value: string) => void
  className?: string
}

export function PulseFilterSelect({ label, value, options, onChange, className }: PulseFilterSelectProps) {
  const uid = useId()
  const listboxId = `${uid}-listbox`
  const triggerId = `${uid}-trigger`
  const rootRef = useRef<HTMLDivElement>(null)
  const [open, setOpen] = useState(false)

  const selected = options.find((o) => o.value === value) ?? options[0]

  useEffect(() => {
    if (!open) return
    function onDocMouseDown(e: MouseEvent) {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('mousedown', onDocMouseDown)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onDocMouseDown)
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  return (
    <div
      ref={rootRef}
      className={cn('relative min-w-[10.5rem] max-w-[15rem] shrink-0 sm:min-w-[11.5rem]', className)}
    >
      <label htmlFor={triggerId} className="sr-only">
        {label}
      </label>
      <div
        className={cn(
          'relative rounded-xl border bg-white shadow-sm transition-[border-color,box-shadow]',
          open
            ? 'border-neutral-400 shadow-md ring-2 ring-neutral-950/10'
            : 'border-neutral-200/90 hover:border-neutral-300',
        )}
      >
        <button
          id={triggerId}
          type="button"
          aria-haspopup="listbox"
          aria-expanded={open}
          aria-controls={listboxId}
          onClick={() => setOpen((v) => !v)}
          className="flex w-full min-h-10 flex-col justify-center gap-0.5 py-2 pl-3 pr-10 text-left outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-neutral-900/15 rounded-xl"
        >
          <span className="text-[10px] font-medium leading-none text-neutral-500">{label}</span>
          <span className="min-w-0 truncate text-sm font-semibold leading-tight tracking-tight text-neutral-950">
            {selected.label}
          </span>
        </button>
        <IconChevronDown
          className={cn(
            'pointer-events-none absolute right-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-500 transition-transform duration-200',
            open && 'rotate-180',
          )}
          aria-hidden
        />
      </div>

      {open ? (
        <ul
          id={listboxId}
          role="listbox"
          aria-labelledby={triggerId}
          className={cn(
            'absolute left-0 right-0 top-[calc(100%+6px)] z-50 max-h-64 overflow-y-auto overflow-x-hidden',
            'rounded-xl border border-neutral-200/90 bg-white py-1.5',
            'shadow-[0_10px_40px_-10px_rgba(0,0,0,0.18),0_4px_12px_-4px_rgba(0,0,0,0.08)]',
            'ring-1 ring-black/[0.04]',
          )}
        >
          {options.map((o) => {
            const isSelected = o.value === value
            return (
              <li key={o.value} role="presentation" className="px-1.5">
                <button
                  type="button"
                  role="option"
                  aria-selected={isSelected}
                  onClick={() => {
                    onChange(o.value)
                    setOpen(false)
                  }}
                  className={cn(
                    'flex w-full rounded-lg px-2.5 py-2 text-left text-sm leading-snug transition-colors',
                    isSelected
                      ? 'bg-neutral-900 text-white font-medium'
                      : 'text-neutral-800 hover:bg-neutral-100 active:bg-neutral-200/80',
                  )}
                >
                  {o.label}
                </button>
              </li>
            )
          })}
        </ul>
      ) : null}
    </div>
  )
}
