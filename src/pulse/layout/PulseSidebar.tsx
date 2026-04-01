import { NavLink } from 'react-router-dom'
import { IconChevronDown, IconClose } from '@/pulse/components/icons'
import { divisionName } from '@/pulse/mock/division'
import { cn } from '@/lib/cn'

const otherDivisions = ['Chandler', 'Scottsdale']

export type PulseSidebarProps = {
  id?: string
  className?: string
  onNavigate?: () => void
}

export function PulseSidebar({ id, className, onNavigate }: PulseSidebarProps) {
  return (
    <aside
      id={id}
      className={cn(
        'relative flex h-full min-h-screen flex-col overflow-y-auto border-r border-neutral-200 bg-neutral-50 lg:min-h-0 lg:w-[240px] lg:shrink-0',
        className,
      )}
    >
      {onNavigate ? (
        <button
          type="button"
          className="absolute right-3 top-[max(0.75rem,env(safe-area-inset-top,0px))] z-10 inline-flex h-9 w-9 items-center justify-center rounded-lg border border-neutral-200 bg-white text-neutral-700 shadow-sm lg:top-3 lg:hidden"
          aria-label="Close navigation"
          onClick={onNavigate}
        >
          <IconClose className="h-4 w-4" />
        </button>
      ) : null}

      <div className="px-4 pt-5 max-lg:pt-[max(1rem,calc(env(safe-area-inset-top,0px)+0.5rem))] lg:pt-5">
        <label className="sr-only" htmlFor="open-homes">
          Open Homes
        </label>
        <div className="relative">
          <select
            id="open-homes"
            className="h-10 w-full cursor-pointer appearance-none rounded-lg border border-neutral-300 bg-white py-2 pl-3 pr-9 text-sm font-semibold text-neutral-900 shadow-sm"
            defaultValue="open-homes"
          >
            <option value="open-homes">Open Homes</option>
          </select>
          <IconChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500" />
        </div>
      </div>

      <nav className="mt-5 flex flex-col gap-1 px-3 pb-6 text-sm" aria-label="Community Pulse">
        <button
          type="button"
          className="rounded-md px-3 py-2 text-left font-medium text-neutral-800 hover:bg-neutral-100"
          onClick={() => onNavigate?.()}
        >
          Latest Downloads
        </button>

        <p className="mt-4 px-3 text-[11px] font-bold uppercase tracking-wide text-neutral-500">Divisions</p>

        <NavLink
          to="/pulse"
          className={({ isActive }) =>
            cn(
              'rounded-md px-3 py-2 font-semibold transition-colors',
              isActive ? 'bg-black text-white' : 'text-neutral-800 hover:bg-neutral-100',
            )
          }
          onClick={() => onNavigate?.()}
        >
          {divisionName}
        </NavLink>

        {otherDivisions.map((d) => (
          <span
            key={d}
            className="cursor-default rounded-md px-3 py-2 font-medium text-neutral-400"
            aria-disabled
          >
            {d}
          </span>
        ))}
      </nav>

      <div className="mt-auto border-t border-neutral-200 px-4 py-4">
        <button
          type="button"
          className="flex w-full items-center justify-between gap-2 text-left text-xs text-neutral-600"
          onClick={() => onNavigate?.()}
        >
          <span className="leading-snug">
            Signed in as <span className="font-medium text-neutral-900">aarushirc@openho…</span>
          </span>
          <IconChevronDown className="shrink-0 text-neutral-500" />
        </button>
      </div>
    </aside>
  )
}
