import { Link } from 'react-router-dom'
import { mockActivity, mockStats } from '@/mock'
import { ButtonLink } from '@/components/ui/Button'
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import { PageHeader } from '@/components/ui/PageHeader'
import { StatTile } from '@/components/ui/StatTile'

export function DashboardPage() {
  return (
    <>
      <PageHeader
        title="Overview"
        description="Snapshot of how work is moving — all numbers are static mock data for storytelling."
        actions={
          <ButtonLink to="/items" variant="secondary" className="w-full justify-center sm:w-auto">
            View all items
          </ButtonLink>
        }
      />

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {mockStats.map((stat) => (
          <StatTile key={stat.id} stat={stat} />
        ))}
      </section>

      <section className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>What to highlight in demos</CardTitle>
            <CardDescription>
              Pair the stats above with the items list to show end-to-end navigation without backend
              dependencies.
            </CardDescription>
          </CardHeader>
          <ul className="mt-2 space-y-3 text-sm text-slate-600">
            <li className="flex gap-3">
              <span className="mt-0.5 h-5 w-5 shrink-0 rounded-full bg-indigo-100 text-center text-xs font-semibold leading-5 text-indigo-700">
                1
              </span>
              <span>
                Start on this page to set context, then jump into an item to show master–detail flows.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="mt-0.5 h-5 w-5 shrink-0 rounded-full bg-indigo-100 text-center text-xs font-semibold leading-5 text-indigo-700">
                2
              </span>
              <span>
                Use <Link className="font-medium text-indigo-700 underline-offset-2 hover:underline" to="/settings">settings</Link> to show form-driven interactions with local state only.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="mt-0.5 h-5 w-5 shrink-0 rounded-full bg-indigo-100 text-center text-xs font-semibold leading-5 text-indigo-700">
                3
              </span>
              <span>
                When you outgrow mocks, keep types and components — replace data loaders in one place.
              </span>
            </li>
          </ul>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent activity</CardTitle>
            <CardDescription>Mock audit trail for realism.</CardDescription>
          </CardHeader>
          <ul className="divide-y divide-slate-100">
            {mockActivity.map((event) => (
              <li key={event.id} className="flex gap-3 py-3 first:pt-0 last:pb-0">
                <span
                  className={
                    event.type === 'system'
                      ? 'mt-1 h-2 w-2 shrink-0 rounded-full bg-violet-400'
                      : 'mt-1 h-2 w-2 shrink-0 rounded-full bg-indigo-400'
                  }
                  aria-hidden
                />
                <div>
                  <p className="text-sm font-medium text-slate-900">{event.title}</p>
                  <p className="text-xs text-slate-500">{event.time}</p>
                </div>
              </li>
            ))}
          </ul>
        </Card>
      </section>
    </>
  )
}
