import { useItem } from '@/hooks/useItem'
import { Badge } from '@/components/ui/Badge'
import { ButtonLink } from '@/components/ui/Button'
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import { PageHeader } from '@/components/ui/PageHeader'

function formatDate(iso: string): string {
  return new Intl.DateTimeFormat(undefined, {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(new Date(iso))
}

export function ItemDetailPage() {
  const { item } = useItem()

  if (!item) {
    return (
      <>
        <PageHeader title="Item not found" description="This id is not in the current list." />
        <Card>
          <CardHeader>
            <CardTitle>Try another item</CardTitle>
            <CardDescription>
              Use the list to pick a record, or add entries in the items data module.
            </CardDescription>
          </CardHeader>
          <ButtonLink to="/items" variant="secondary" className="w-full justify-center sm:w-auto">
            Back to items
          </ButtonLink>
        </Card>
      </>
    )
  }

  return (
    <>
      <PageHeader
        title={item.title}
        description={item.summary}
        actions={
          <ButtonLink to="/items" variant="secondary" className="w-full justify-center sm:w-auto">
            ← All items
          </ButtonLink>
        }
      />

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Details</CardTitle>
            <CardDescription>Full description for this item.</CardDescription>
          </CardHeader>
          <p className="text-sm leading-relaxed text-slate-700">{item.description}</p>
          <div className="mt-6 flex flex-wrap gap-2">
            {item.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-lg bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700"
              >
                {tag}
              </span>
            ))}
          </div>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Meta</CardTitle>
            <CardDescription>Ownership and status.</CardDescription>
          </CardHeader>
          <dl className="space-y-4 text-sm">
            <div>
              <dt className="text-xs font-medium uppercase tracking-wide text-slate-500">Status</dt>
              <dd className="mt-1">
                <Badge status={item.status}>{item.status}</Badge>
              </dd>
            </div>
            <div>
              <dt className="text-xs font-medium uppercase tracking-wide text-slate-500">Owner</dt>
              <dd className="mt-1 font-medium text-slate-900">{item.owner}</dd>
            </div>
            <div>
              <dt className="text-xs font-medium uppercase tracking-wide text-slate-500">Updated</dt>
              <dd className="mt-1 text-slate-700">{formatDate(item.updatedAt)}</dd>
            </div>
            <div>
              <dt className="text-xs font-medium uppercase tracking-wide text-slate-500">Identifier</dt>
              <dd className="mt-1 font-mono text-xs text-slate-600">{item.id}</dd>
            </div>
          </dl>
          <p className="mt-6 text-xs text-slate-500">
            Next step when you add a backend: resolve <code className="rounded bg-slate-100 px-1">{':id'}</code> in the loader, then swap this card for a loading state and error handling.
          </p>
        </Card>
      </div>
    </>
  )
}
