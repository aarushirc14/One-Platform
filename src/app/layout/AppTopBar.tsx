import { Link, useLocation } from 'react-router-dom'
import { cn } from '@/lib/cn'

const titles: Record<string, string> = {
  '/dashboard': 'Dashboard',
  '/items': 'Items',
  '/settings': 'Settings',
}

export function AppTopBar() {
  const { pathname } = useLocation()
  const title =
    titles[pathname] ??
    (pathname.startsWith('/items/') ? 'Item details' : 'Workspace')

  return (
    <header className="sticky top-0 z-10 border-b border-slate-200/80 bg-white/80 pt-[env(safe-area-inset-top,0px)] backdrop-blur-md">
      <div className="flex h-16 items-center justify-between gap-3 px-3 sm:gap-4 sm:px-4">
        <div className="flex min-w-0 items-center gap-2">
          <Link
            to="/landing"
            className="shrink-0 text-sm font-semibold text-slate-900 lg:hidden"
            aria-label="Landing"
          >
            One Platform
          </Link>
          <span className="hidden text-slate-300 sm:inline lg:hidden" aria-hidden>
            /
          </span>
          <h2 className="min-w-0 truncate text-sm font-semibold text-slate-900 sm:text-base">
            {title}
          </h2>
        </div>
        <div className="flex items-center gap-3">
          <span className="hidden rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600 sm:inline">
            Demo build
          </span>
          <div
            className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-violet-500 text-xs font-semibold text-white shadow-sm"
            aria-hidden
          >
            AE
          </div>
        </div>
      </div>
      <MobileNav />
    </header>
  )
}

function MobileNav() {
  const { pathname } = useLocation()
  const links = [
    { to: '/dashboard', label: 'Dashboard' },
    { to: '/items', label: 'Items' },
    { to: '/settings', label: 'Settings' },
  ]
  return (
    <nav
      className="flex gap-1 border-t border-slate-100 px-2 py-2 pb-[max(0.5rem,env(safe-area-inset-bottom,0px))] lg:hidden"
      aria-label="Mobile sections"
    >
      {links.map((link) => {
        const active =
          pathname === link.to || (link.to === '/items' && pathname.startsWith('/items'))
        return (
          <Link
            key={link.to}
            to={link.to}
            className={cn(
              'flex min-h-11 flex-1 items-center justify-center rounded-lg px-1 py-2 text-center text-xs font-medium',
              active ? 'bg-slate-900 text-white' : 'text-slate-600 hover:bg-slate-100',
            )}
          >
            {link.label}
          </Link>
        )
      })}
    </nav>
  )
}
