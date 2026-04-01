import { NavLink } from 'react-router-dom'
import { IconChevronDown, IconClose } from '@/pulse/components/icons'
import { COMMUNITY_TRIAGE_BASE } from '@/pulse/constants/routes'
import { divisionName } from '@/pulse/mock/division'
import { cn } from '@/lib/cn'

type DivisionNavGroup = {
  name: string
  triageTo: string | null
}

const divisionNavGroups: DivisionNavGroup[] = [
  { name: divisionName, triageTo: COMMUNITY_TRIAGE_BASE },
  { name: 'Chandler', triageTo: null },
  { name: 'Scottsdale', triageTo: null },
]

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
        <div
          className="flex items-center gap-2.5 rounded-xl border border-neutral-200/90 bg-white px-2.5 py-2 shadow-sm ring-1 ring-black/[0.04]"
          aria-label="Open Homes"
        >
          <div className="flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-neutral-100 ring-1 ring-neutral-200/80">
            <img
              src="/openhouse-logo.png"
              alt=""
              width={44}
              height={44}
              className="h-full w-full object-contain p-1"
              decoding="async"
            />
          </div>
          <div
            className="min-w-0 leading-none"
            style={{ fontFamily: '"Plus Jakarta Sans", ui-sans-serif, system-ui, sans-serif' }}
          >
            <span className="block text-[15px] font-bold tracking-tight">
              <span className="text-neutral-500">O</span>
              <span className="text-[#e57b30]">p</span>
              <span className="text-neutral-500">en</span>
            </span>
            <span className="mt-0.5 block text-[15px] font-bold tracking-tight">
              <span className="text-neutral-500">H</span>
              <span className="text-[#139a9a]">o</span>
              <span className="text-neutral-500">mes</span>
            </span>
          </div>
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

        <ul className="mt-4 list-none space-y-5 p-0" role="list">
          {divisionNavGroups.map((group) => (
            <li key={group.name}>
              <p className="px-3 text-sm font-semibold text-neutral-900">{group.name}</p>
              <ul className="mt-1.5 list-none space-y-0.5 p-0 pl-3" role="list">
                <li>
                  {group.triageTo ? (
                    <NavLink
                      to={group.triageTo}
                      className={({ isActive }) =>
                        cn(
                          'block rounded-md px-3 py-2 font-medium transition-colors',
                          isActive ? 'bg-black text-white' : 'text-neutral-800 hover:bg-neutral-100',
                        )
                      }
                      onClick={() => onNavigate?.()}
                    >
                      Triage Communities
                    </NavLink>
                  ) : (
                    <span
                      className="block cursor-default rounded-md px-3 py-2 font-medium text-neutral-400"
                      aria-disabled
                    >
                      Triage Communities
                    </span>
                  )}
                </li>
                <li>
                  <span
                    className="block cursor-default rounded-md px-3 py-2 font-medium text-neutral-400"
                    aria-disabled
                  >
                    Forecast Drivers
                  </span>
                </li>
              </ul>
            </li>
          ))}
        </ul>
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
