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
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-100/80 via-slate-50 to-slate-50">
      <header className="border-b border-slate-200/60 bg-white/70 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-8">
          <div className="flex items-center gap-2">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600 text-sm font-bold text-white shadow-sm shadow-indigo-500/30">
              OP
            </span>
            <div>
              <p className="text-sm font-semibold text-slate-900">One Platform</p>
              <p className="text-xs text-slate-500">Frontend prototype</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <ButtonLink to="/pulse" variant="ghost" className="hidden sm:inline-flex">
              Community Pulse
            </ButtonLink>
            <ButtonLink to="/items" variant="ghost" className="hidden md:inline-flex">
              View items
            </ButtonLink>
            <ButtonLink to="/dashboard" className="px-5">
              Open app
            </ButtonLink>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-16 sm:px-8 sm:py-20">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-wide text-indigo-600">Demo-ready</p>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl">
            Ship crisp product walkthroughs without a backend.
          </h1>
          <p className="mt-5 text-lg text-slate-600">
            This shell is intentionally small: React Router for navigation, Tailwind for a modern visual
            layer, and colocated mock data so you can iterate on UX before wiring services.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink to="/pulse" className="px-6 py-2.5 text-base">
              Open Community Pulse
            </ButtonLink>
            <ButtonLink to="/dashboard" variant="secondary" className="px-6 py-2.5 text-base">
              Go to dashboard
            </ButtonLink>
            <ButtonLink to="/items" variant="secondary" className="px-6 py-2.5 text-base">
              Browse items
            </ButtonLink>
          </div>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {highlights.map((card) => (
            <Card key={card.title} className="h-full border-slate-200/90 bg-white/90 p-5">
              <CardHeader className="mb-0">
                <CardTitle>{card.title}</CardTitle>
                <CardDescription>{card.body}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </main>

      <footer className="border-t border-slate-200/80 bg-white/60 py-8 text-center text-xs text-slate-500">
        Built for internal demos — replace mocks with API calls when you are ready.
      </footer>
    </div>
  )
}
