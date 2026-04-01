import { ButtonLink } from '@/components/ui/Button'
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'

const highlights = [
  {
    title: 'Operational clarity',
    body: 'A single shell for demos: sidebar navigation, responsive top bar, and content max-width tuned for stakeholder reviews.',
  },
  {
    title: 'Mock-first workflow',
    body: 'Types and mock modules mirror how a real API would plug in later — swap `getMockItems` for `fetch` without rethinking components.',
  },
  {
    title: 'Extend in place',
    body: 'Add routes beside existing pages, drop UI primitives into `components/ui`, and keep feature folders shallow until complexity demands more.',
  },
]

export function HomePage() {
  return (
    <div className="min-h-[100dvh] min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-100/80 via-slate-50 to-slate-50">
      <header className="border-b border-slate-200/60 bg-white/70 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-8 sm:py-4">
          <div className="flex min-w-0 items-center gap-2">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-600 text-sm font-bold text-white shadow-sm shadow-indigo-500/30">
              OP
            </span>
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-slate-900">One Platform</p>
              <p className="text-xs text-slate-500">Frontend prototype</p>
            </div>
          </div>
          <div className="flex w-full min-w-0 flex-col gap-2 sm:w-auto sm:flex-row sm:flex-wrap sm:items-center sm:justify-end">
            <div className="flex flex-wrap items-center gap-2">
              <ButtonLink to="/pulse" variant="ghost" className="px-3 sm:px-4">
                <span className="sm:hidden">Pulse</span>
                <span className="hidden sm:inline">Community Pulse</span>
              </ButtonLink>
              <ButtonLink to="/items" variant="ghost" className="hidden md:inline-flex">
                View items
              </ButtonLink>
            </div>
            <ButtonLink to="/dashboard" className="w-full px-5 sm:w-auto sm:shrink-0">
              Open app
            </ButtonLink>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-10 sm:px-8 sm:py-16 md:py-20">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-wide text-indigo-600">Demo-ready</p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl sm:leading-tight md:text-5xl">
            Ship crisp product walkthroughs without a backend.
          </h1>
          <p className="mt-5 text-base leading-relaxed text-slate-600 sm:text-lg">
            This shell is intentionally small: React Router for navigation, Tailwind for a modern visual
            layer, and colocated mock data so you can iterate on UX before wiring services.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <ButtonLink to="/pulse" className="w-full justify-center px-6 py-2.5 text-base sm:w-auto">
              Open Community Pulse
            </ButtonLink>
            <ButtonLink
              to="/dashboard"
              variant="secondary"
              className="w-full justify-center px-6 py-2.5 text-base sm:w-auto"
            >
              Go to dashboard
            </ButtonLink>
            <ButtonLink
              to="/items"
              variant="secondary"
              className="w-full justify-center px-6 py-2.5 text-base sm:w-auto"
            >
              Browse items
            </ButtonLink>
          </div>
        </div>

        <div className="mt-12 grid gap-4 sm:gap-6 md:grid-cols-3">
          {highlights.map((card) => (
            <Card key={card.title} className="h-full border-slate-200/90 bg-white/90 p-4 sm:p-5">
              <CardHeader className="mb-0">
                <CardTitle>{card.title}</CardTitle>
                <CardDescription>{card.body}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </main>

      <footer className="border-t border-slate-200/80 bg-white/60 px-4 py-8 text-center text-xs leading-relaxed text-slate-500">
        Built for internal demos — replace mocks with API calls when you are ready.
      </footer>
    </div>
  )
}
