import { NavLink, useLocation } from 'react-router-dom'
import { IconChevronDown, IconClose } from '@/pulse/components/icons'
import {
  OPENHOMES_COMMUNITY_TRIAGE,
  OPENHOMES_DIVISION_PERFORMANCE,
  OPENHOMES_DOWNLOADS,
  OPENHOMES_FORECAST_DRIVERS,
} from '@/pulse/constants/routes'
import { divisionName } from '@/pulse/data/division'
import { cn } from '@/lib/cn'

type DivisionLink = {
  label: string
  /** When null, item is disabled (other divisions). */
  to: string | null
  /** Custom active check; when omitted, NavLink default matching is used. */
  isActive?: (pathname: string) => boolean
}

type DivisionNavGroup = {
  name: string
  links: DivisionLink[]
}

const divisionNavGroups: DivisionNavGroup[] = [
  {
    name: divisionName,
    links: [
      {
        label: 'Division Performance',
        to: OPENHOMES_DIVISION_PERFORMANCE,
        isActive: (p) =>
          p === OPENHOMES_DIVISION_PERFORMANCE ||
          p.startsWith(`${OPENHOMES_DIVISION_PERFORMANCE}/`),
      },
      {
        label: 'Forecast Drivers',
        to: OPENHOMES_FORECAST_DRIVERS,
        isActive: (p) =>
          p === OPENHOMES_FORECAST_DRIVERS || p.startsWith(`${OPENHOMES_FORECAST_DRIVERS}/`),
      },
      {
        label: 'Community Triage',
        to: OPENHOMES_COMMUNITY_TRIAGE,
        isActive: (p) =>
          p === OPENHOMES_COMMUNITY_TRIAGE || p.startsWith(`${OPENHOMES_COMMUNITY_TRIAGE}/`),
      },
    ],
  },
  {
    name: 'Chandler',
    links: [
      { label: 'Division Performance', to: null },
      { label: 'Forecast Drivers', to: null },
      { label: 'Community Triage', to: null },
    ],
  },
  {
    name: 'Scottsdale',
    links: [
      { label: 'Division Performance', to: null },
      { label: 'Forecast Drivers', to: null },
      { label: 'Community Triage', to: null },
    ],
  },
]

export type PulseSidebarProps = {
  id?: string
  className?: string
  onNavigate?: () => void
}

export function PulseSidebar({ id, className, onNavigate }: PulseSidebarProps) {
  const { pathname } = useLocation()

  return (
    <aside
      id={id}
      className={cn(
        'relative flex h-full min-h-screen flex-col border-r border-neutral-200 bg-neutral-50 lg:min-h-0 lg:w-[240px] lg:shrink-0',
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

      <div className="shrink-0 px-4 pt-5 max-lg:pt-[max(1rem,calc(env(safe-area-inset-top,0px)+0.5rem))] lg:pt-5">
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

      <div className="flex min-h-0 flex-1 flex-col overflow-hidden">
        <nav
          className="min-h-0 flex-1 overflow-y-auto px-3 pb-3 pt-5 text-sm"
          aria-label="Divisions"
        >
          <ul className="list-none space-y-5 p-0" role="list">
            {divisionNavGroups.map((group) => (
              <li key={group.name}>
                <p className="px-3 text-sm font-semibold text-neutral-900">{group.name}</p>
                <ul className="mt-1.5 list-none space-y-0.5 p-0 pl-3" role="list">
                  {group.links.map((link) => (
                    <li key={link.label}>
                      {link.to ? (
                        <NavLink
                          to={link.to}
                          className={({ isActive }) =>
                            cn(
                              'block rounded-md px-3 py-2 font-medium transition-colors duration-150',
                              (link.isActive ? link.isActive(pathname) : isActive)
                                ? 'bg-black text-white hover:bg-neutral-800'
                                : 'text-neutral-800 hover:bg-neutral-200/90 hover:text-neutral-950',
                            )
                          }
                          onClick={() => onNavigate?.()}
                        >
                          {link.label}
                        </NavLink>
                      ) : (
                        <span
                          className="block cursor-default rounded-md px-3 py-2 font-medium text-neutral-800"
                          aria-disabled
                        >
                          {link.label}
                        </span>
                      )}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </nav>

        <div className="shrink-0 border-t border-neutral-200 bg-neutral-50 px-3 py-2">
          <NavLink
            to={OPENHOMES_DOWNLOADS}
            end
            className={({ isActive }) =>
              cn(
                'block rounded-md px-3 py-2 text-sm font-medium transition-colors duration-150',
                isActive
                  ? 'bg-black text-white hover:bg-neutral-800'
                  : 'text-neutral-800 hover:bg-neutral-200/90 hover:text-neutral-950',
              )
            }
            onClick={() => onNavigate?.()}
          >
            Latest Downloads
          </NavLink>
        </div>
      </div>

      <div className="mt-auto shrink-0 border-t border-neutral-200 px-4 py-4">
        <button
          type="button"
          className="flex w-full items-start justify-between gap-2 rounded-lg px-2 py-1.5 text-left text-xs text-neutral-600 transition-colors duration-150 hover:bg-neutral-100 hover:text-neutral-800"
          onClick={() => onNavigate?.()}
        >
          <span className="min-w-0 flex-1 break-words leading-snug">
            Signed in as{' '}
            <span className="font-medium text-neutral-900">someone@openhomes.com</span>
          </span>
          <IconChevronDown className="mt-0.5 shrink-0 text-neutral-500" />
        </button>
      </div>
    </aside>
  )
}
