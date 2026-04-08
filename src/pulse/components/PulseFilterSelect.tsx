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
  /** Pointer hover (works even when CSS @media (hover:hover) is false, e.g. hybrid devices). */
  const [pointerOver, setPointerOver] = useState(false)
  const [triggerFocused, setTriggerFocused] = useState(false)
  /** Which list option the pointer is over (CSS :hover is unreliable on some hybrid devices). */
  const [optionHoverValue, setOptionHoverValue] = useState<string | null>(null)

  const selected = options.find((o) => o.value === value) ?? options[0]
  const showTriggerLift = !open && (pointerOver || triggerFocused)

  useEffect(() => {
    if (!open) return
    function onDocMouseDown(e: MouseEvent) {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        setOpen(false)
        setOptionHoverValue(null)
      }
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        setOpen(false)
        setOptionHoverValue(null)
      }
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
      <button
        id={triggerId}
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listboxId}
        onClick={() => setOpen((v) => !v)}
        onPointerEnter={() => setPointerOver(true)}
        onPointerLeave={() => setPointerOver(false)}
        onFocus={() => setTriggerFocused(true)}
        onBlur={() => setTriggerFocused(false)}
        className={cn(
          'group relative flex w-full min-h-9 cursor-pointer flex-col justify-center gap-0.5 rounded-xl border bg-white py-1.5 pl-3 pr-10 text-left',
          'transition-[border-color,box-shadow,background-color,transform,color] duration-200 ease-out',
          'outline-none focus-visible:ring-2 focus-visible:ring-neutral-900/20 focus-visible:ring-offset-2',
          open
            ? 'z-[1] border-neutral-500 shadow-lg ring-2 ring-neutral-900/10 ring-offset-0'
            : 'border-neutral-300 shadow-sm active:translate-y-0 active:bg-neutral-200/80',
          showTriggerLift &&
            'z-[1] -translate-y-px border-neutral-600 bg-neutral-100 shadow-md motion-reduce:translate-y-0',
        )}
      >
        <span
          className={cn(
            'text-[10px] font-medium leading-none text-neutral-500 transition-colors',
            showTriggerLift && 'text-neutral-700',
          )}
        >
          {label}
        </span>
        <span className="min-w-0 truncate text-sm font-semibold leading-tight tracking-tight text-neutral-950">
          {selected.label}
        </span>
        <IconChevronDown
          className={cn(
            'pointer-events-none absolute right-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-500 transition-[transform,color] duration-200',
            showTriggerLift && 'text-neutral-900',
            open && 'rotate-180 text-neutral-900',
          )}
          aria-hidden
        />
      </button>

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
            const optionHot = optionHoverValue === o.value
            return (
              <li key={o.value} role="presentation" className="px-1.5">
                <button
                  type="button"
                  role="option"
                  aria-selected={isSelected}
                  onClick={() => {
                    onChange(o.value)
                    setOpen(false)
                    setOptionHoverValue(null)
                  }}
                  onPointerEnter={() => setOptionHoverValue(o.value)}
                  onPointerLeave={() =>
                    setOptionHoverValue((cur) => (cur === o.value ? null : cur))
                  }
                  className={cn(
                    'flex w-full cursor-pointer rounded-lg px-2.5 py-2.5 text-left text-sm leading-snug',
                    'transition-[background-color,color,box-shadow] duration-150 ease-out',
                    'outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-neutral-400',
                    isSelected
                      ? cn(
                          'bg-neutral-900 font-medium text-white',
                          optionHot && 'bg-neutral-800 shadow-inner',
                        )
                      : cn(
                          'text-neutral-800',
                          optionHot
                            ? 'bg-neutral-200 font-semibold text-neutral-950 shadow-sm'
                            : 'bg-white hover:bg-neutral-100 active:bg-neutral-200',
                        ),
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
