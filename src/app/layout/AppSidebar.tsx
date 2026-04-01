import { NavLink } from 'react-router-dom'
import { cn } from '@/lib/cn'

const nav = [
  { to: '/dashboard', label: 'Dashboard' },
  { to: '/items', label: 'Items' },
  { to: '/settings', label: 'Settings' },
]

export function AppSidebar() {
  return (
    <aside className="hidden w-60 shrink-0 flex-col border-r border-slate-800/60 bg-slate-950 text-slate-200 lg:flex">
      <div className="flex h-16 items-center gap-2 border-b border-slate-800 px-5">
        <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-500 text-sm font-bold text-white">
          OP
        </span>
        <div>
          <p className="text-sm font-semibold text-white">One Platform</p>
          <p className="text-xs text-slate-400">Prototype</p>
        </div>
      </div>
      <nav className="flex flex-1 flex-col gap-1 p-3" aria-label="Primary">
        {nav.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              cn(
                'rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                isActive
                  ? 'bg-white/10 text-white'
                  : 'text-slate-300 hover:bg-white/5 hover:text-white',
              )
            }
          >
            {item.label}
          </NavLink>
        ))}
      </nav>
      <div className="border-t border-slate-800 p-4">
        <NavLink
          to="/"
          className="text-xs font-medium text-slate-400 underline-offset-4 hover:text-white hover:underline"
        >
          ← Back to landing
        </NavLink>
      </div>
    </aside>
  )
}
