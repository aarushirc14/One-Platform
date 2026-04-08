import { useMemo, useState } from 'react'
import { NavLink, Outlet, useLocation } from 'react-router-dom'
import { OpenHouseRoleProvider, useOpenHouseRole } from '@/openhouse/context/OpenHouseRoleContext'
import { OpenHouseBrand } from '@/openhouse/components/OpenHouseBrand'
import { decisionPlatformModel } from '@/openhouse/data/decisionEngine'
import {
  OPENHOMES_BRIEFING,
  OPENHOMES_COMMUNITIES,
  OPENHOMES_DRIVERS,
  OPENHOMES_OVERVIEW,
  OPENHOMES_PRIORITIES,
} from '@/pulse/constants/routes'
import { IconClose, IconMenu } from '@/pulse/components/icons'
import { usePulseDataValidUntilLabel } from '@/pulse/hooks/usePulseDataValidUntilLabel'
import { cn } from '@/lib/cn'
import type { OpenHouseRole } from '@/openhouse/types'

type NavItem = {
  to: string
  label: string
  shortLabel: string
  match: string
  description: string
}

type NavGroup = {
  title: string
  items: NavItem[]
}

const navGroups: NavGroup[] = [
  {
    title: 'Start here',
    items: [
      {
        to: OPENHOMES_OVERVIEW,
        label: 'Overview',
        shortLabel: 'Overview',
        match: OPENHOMES_OVERVIEW,
        description: 'Overall status and main takeaways',
      },
      {
        to: OPENHOMES_PRIORITIES,
        label: 'Focus Queue',
        shortLabel: 'Focus',
        match: OPENHOMES_PRIORITIES,
        description: 'Where attention should go next',
      },
    ],
  },
  {
    title: 'Investigate',
    items: [
      {
        to: OPENHOMES_COMMUNITIES,
        label: 'Communities',
        shortLabel: 'Communities',
        match: OPENHOMES_COMMUNITIES,
        description: 'Browse and open any community workspace',
      },
      {
        to: OPENHOMES_DRIVERS,
        label: 'Drivers',
        shortLabel: 'Drivers',
        match: OPENHOMES_DRIVERS,
        description: 'Why the forecast is moving',
      },
    ],
  },
  {
    title: 'Share',
    items: [
      {
        to: OPENHOMES_BRIEFING,
        label: 'Briefing',
        shortLabel: 'Briefing',
        match: OPENHOMES_BRIEFING,
        description: 'Printable leadership summary',
      },
    ],
  },
]

const roleDescriptions: Record<OpenHouseRole, string> = {
  executive: 'Lead with status, priorities, and printable briefing outputs.',
  operator: 'Lead with bottlenecks, community actions, and execution follow-through.',
  analyst: 'Lead with explanation, credibility, and narrative support.',
}

const roleTitles: Record<OpenHouseRole, string> = {
  executive: 'Executive view',
  operator: 'Operator view',
  analyst: 'Analyst view',
}

const roleAccentDot: Record<OpenHouseRole, string> = {
  executive: 'bg-[#e57b30]',
  operator: 'bg-[#139a9a]',
  analyst: 'bg-violet-500',
}

function LayoutFrame() {
  const [mobileNavOpen, setMobileNavOpen] = useState(false)
  const { pathname } = useLocation()
  const dataValidUntil = usePulseDataValidUntilLabel()
  const { role, setRole } = useOpenHouseRole()

  const pageMeta = useMemo(() => {
    if (pathname.includes('/communities/')) {
      const currentCommunity = decisionPlatformModel.priorities.find((item) =>
        pathname.endsWith(`/${item.communityId}`),
      )
      return {
        title: currentCommunity?.communityName ?? 'Community Workspace',
        section: 'Communities',
        helper: 'Diagnosis, likely cause, and next actions for a specific community.',
      }
    }
    if (pathname === OPENHOMES_COMMUNITIES) {
      return {
        title: 'Communities',
        section: 'Investigate',
        helper: 'Browse every community and open the right workspace quickly.',
      }
    }
    if (pathname === OPENHOMES_PRIORITIES) {
      return {
        title: 'Focus Queue',
        section: 'Start here',
        helper: 'Ranked view of where leadership and operators should focus next.',
      }
    }
    if (pathname === OPENHOMES_DRIVERS) {
      return {
        title: 'Drivers',
        section: 'Investigate',
        helper: 'Business-readable explanation of forecast movement.',
      }
    }
    if (pathname === OPENHOMES_BRIEFING) {
      return {
        title: 'Briefing',
        section: 'Share',
        helper: 'Printable summary built from the live product.',
      }
    }
    return {
      title: 'Overview',
      section: 'Start here',
      helper: 'Start with the current outlook, then move into focus areas or community drilldown.',
    }
  }, [pathname])

  return (
    <div className="openhouse-shell min-h-[100dvh] bg-[#f5f6fb] text-neutral-950 print:bg-white">
      <div className="mx-auto flex min-h-[100dvh] max-w-[1680px]">
        <aside className="hidden w-[284px] shrink-0 border-r border-neutral-200/80 bg-white/92 px-5 py-6 print:hidden xl:w-[308px] lg:flex lg:flex-col">
          <OpenHouseBrand />
          <div className="mt-6 rounded-[28px] border border-neutral-200/90 bg-[linear-gradient(145deg,rgba(229,123,48,0.08),rgba(19,154,154,0.06)_52%,rgba(255,255,255,0.98))] p-4 shadow-[0_8px_30px_rgba(0,0,0,0.04)]">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-neutral-500">View as</p>
                <div className="mt-2 flex items-center gap-2">
                  <span className={cn('h-2.5 w-2.5 rounded-full shadow-sm', roleAccentDot[role])} aria-hidden />
                  <p className="text-sm font-semibold text-neutral-950">{roleTitles[role]}</p>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-neutral-600">{roleDescriptions[role]}</p>
              </div>
            </div>
            <div className="mt-4 rounded-[20px] border border-white/70 bg-white/80 p-1 shadow-[inset_0_1px_0_rgba(255,255,255,0.7)]">
              <RoleSwitcher role={role} setRole={setRole} />
            </div>
          </div>
          <div className="mt-8 rounded-[24px] border border-neutral-200 bg-neutral-50 p-4">
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-neutral-500">Decision engine</p>
            <p className="mt-2 text-sm leading-relaxed text-neutral-700">
              The live source of truth for status, focus, explanation, action, and briefing.
            </p>
          </div>

          <div className="mt-8 space-y-6" aria-label="Primary">
            {navGroups.map((group) => (
              <div key={group.title}>
                <p className="mb-2 px-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-neutral-500">
                  {group.title}
                </p>
                <nav className="space-y-1" aria-label={group.title}>
                  {group.items.map((item) => {
                    const active =
                      item.match === OPENHOMES_COMMUNITIES
                        ? pathname === OPENHOMES_COMMUNITIES || pathname.includes('/communities/')
                        : pathname === item.match
                    return (
                      <NavLink
                        key={item.label}
                        to={item.to}
                        className={cn(
                          'block rounded-2xl px-4 py-3 transition-colors',
                          active
                            ? 'bg-neutral-950 text-white shadow-sm'
                            : 'text-neutral-700 hover:bg-neutral-100 hover:text-neutral-950',
                        )}
                      >
                        <span className="block break-words text-sm font-medium">{item.label}</span>
                        <span
                          className={cn(
                            'mt-1 block text-pretty text-xs leading-relaxed',
                            active ? 'text-neutral-300' : 'text-neutral-500',
                          )}
                        >
                          {item.description}
                        </span>
                      </NavLink>
                    )
                  })}
                </nav>
              </div>
            ))}
          </div>

        </aside>

        <div className="flex min-w-0 flex-1 flex-col">
          <header className="sticky top-0 z-30 border-b border-neutral-200/80 bg-white/88 backdrop-blur-xl print:hidden">
            <div className="flex min-h-16 items-center gap-3 px-3 py-3 sm:px-5 lg:px-8">
              <button
                type="button"
                className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border border-neutral-200 bg-white text-neutral-800 shadow-sm lg:hidden"
                aria-label="Open navigation"
                onClick={() => setMobileNavOpen(true)}
              >
                <IconMenu className="h-5 w-5" />
              </button>
              <OpenHouseBrand compact className="lg:hidden" />
              <div className="min-w-0 flex-1 lg:hidden">
                <p className="truncate text-sm font-semibold text-neutral-950">{pageMeta.title}</p>
                <p className="mt-0.5 line-clamp-2 text-xs leading-relaxed text-neutral-500">{pageMeta.helper}</p>
              </div>
              <div className="hidden min-w-0 lg:block">
                <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-neutral-500">
                  {pageMeta.section}
                </p>
                <p className="mt-1 text-sm font-semibold text-neutral-950">{pageMeta.title}</p>
                <p className="mt-1 text-sm text-neutral-600">{pageMeta.helper}</p>
              </div>
              <div className="ml-auto flex items-center gap-2 sm:gap-3">
                <div className="hidden xl:block">
                  <RoleSwitcher role={role} setRole={setRole} />
                </div>
                <div className="hidden min-w-[10.5rem] rounded-[18px] border border-neutral-200/80 bg-white/80 px-3 py-2 shadow-[0_1px_2px_rgba(0,0,0,0.03)] sm:block">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-neutral-400">Data up to</p>
                  <p className="mt-0.5 text-sm font-medium leading-tight text-neutral-600">{dataValidUntil}</p>
                </div>
              </div>
            </div>
            <div className="px-3 pb-3 sm:px-5 xl:hidden lg:px-8">
              <RoleSwitcher role={role} setRole={setRole} />
            </div>
            <div className="flex flex-wrap gap-2 px-3 pb-3 sm:px-5 lg:hidden">
              {navGroups.flatMap((group) => group.items).map((item) => {
                const active =
                  item.match === OPENHOMES_COMMUNITIES
                    ? pathname === OPENHOMES_COMMUNITIES || pathname.includes('/communities/')
                    : pathname === item.match
                return (
                  <NavLink
                    key={item.label}
                    to={item.to}
                    className={cn(
                      'rounded-full border px-3 py-1.5 text-xs font-semibold transition-colors',
                      active
                        ? 'border-neutral-950 bg-neutral-950 text-white'
                        : 'border-neutral-200 bg-white text-neutral-700',
                    )}
                  >
                    {item.shortLabel}
                  </NavLink>
                )
              })}
            </div>
          </header>

          {mobileNavOpen ? (
            <button
              type="button"
              className="fixed inset-0 z-40 bg-neutral-950/40 backdrop-blur-[2px] print:hidden lg:hidden"
              aria-label="Close navigation"
              onClick={() => setMobileNavOpen(false)}
            />
          ) : null}

          <aside
            className={cn(
              'fixed inset-y-0 left-0 z-50 w-[min(320px,calc(100vw-1rem))] overflow-y-auto border-r border-neutral-200 bg-white px-4 py-5 transition-transform print:hidden lg:hidden',
              mobileNavOpen ? 'translate-x-0' : '-translate-x-full',
            )}
          >
            <div className="flex items-start justify-between gap-3">
              <OpenHouseBrand />
              <button
                type="button"
                className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-neutral-200 bg-white text-neutral-700 shadow-sm"
                aria-label="Close navigation"
                onClick={() => setMobileNavOpen(false)}
              >
                <IconClose className="h-5 w-5" />
              </button>
            </div>
            <div className="mt-6 flex flex-wrap gap-2">
              <RoleSwitcher role={role} setRole={setRole} />
            </div>
            <div className="mt-6 space-y-6">
              {navGroups.map((group) => (
                <div key={group.title}>
                  <p className="mb-2 px-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-neutral-500">
                    {group.title}
                  </p>
                  <nav className="space-y-1" aria-label={group.title}>
                    {group.items.map((item) => {
                      const active =
                        item.match === OPENHOMES_COMMUNITIES
                          ? pathname === OPENHOMES_COMMUNITIES || pathname.includes('/communities/')
                          : pathname === item.match
                      return (
                        <NavLink
                          key={item.label}
                          to={item.to}
                          className={cn(
                            'block rounded-2xl px-4 py-3 transition-colors',
                            active
                              ? 'bg-neutral-950 text-white'
                              : 'text-neutral-700 hover:bg-neutral-100 hover:text-neutral-950',
                          )}
                          onClick={() => setMobileNavOpen(false)}
                        >
                          <span className="block break-words text-sm font-medium">{item.label}</span>
                          <span
                            className={cn(
                              'mt-1 block text-pretty text-xs leading-relaxed',
                              active ? 'text-neutral-300' : 'text-neutral-500',
                            )}
                          >
                            {item.description}
                          </span>
                        </NavLink>
                      )
                    })}
                  </nav>
                </div>
              ))}
            </div>
          </aside>

          <main className="flex-1 px-3 py-4 sm:px-5 sm:py-6 lg:px-8 lg:py-8 print:px-0 print:py-0">
            <div className="mx-auto w-full max-w-[1320px]">
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}

function RoleSwitcher({
  role,
  setRole,
}: {
  role: OpenHouseRole
  setRole: (role: OpenHouseRole) => void
}) {
  const roles: { id: OpenHouseRole; label: string }[] = [
    { id: 'executive', label: 'Exec' },
    { id: 'operator', label: 'Operator' },
    { id: 'analyst', label: 'Analyst' },
  ]

  return (
    <div className="grid grid-cols-3 gap-1">
      {roles.map((item) => (
        <button
          key={item.id}
          type="button"
          onClick={() => setRole(item.id)}
          className={cn(
            'rounded-[16px] px-3 py-2 text-center text-xs font-semibold transition-[background-color,color,box-shadow,transform] duration-150',
            role === item.id
              ? 'bg-neutral-950 text-white shadow-sm'
              : 'text-neutral-600 hover:bg-white hover:text-neutral-900',
          )}
        >
          {item.label}
        </button>
      ))}
    </div>
  )
}

export function OpenHouseLayout() {
  return (
    <OpenHouseRoleProvider>
      <LayoutFrame />
    </OpenHouseRoleProvider>
  )
}
