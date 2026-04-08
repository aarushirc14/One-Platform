import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { cn } from '@/lib/cn'
import type {
  DriverCredibility,
  OpenHouseRole,
  OutlookTone,
  PriorityTone,
  StageTone,
  StatusMetric,
} from '@/openhouse/types'

export function SurfaceCard({
  className,
  children,
}: {
  className?: string
  children: ReactNode
}) {
  return (
    <section
      className={cn(
        'rounded-[24px] border border-neutral-200/80 bg-white shadow-[0_1px_2px_rgba(0,0,0,0.04),0_16px_40px_rgba(0,0,0,0.04)]',
        className,
      )}
    >
      {children}
    </section>
  )
}

export function PageHeader({
  eyebrow,
  title,
  description,
  actions,
}: {
  eyebrow?: string
  title: string
  description: string
  actions?: ReactNode
}) {
  return (
    <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between lg:gap-6">
      <div className="min-w-0 flex-1">
        {eyebrow ? (
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-neutral-500">{eyebrow}</p>
        ) : null}
        <h1 className="mt-2 max-w-4xl text-balance break-words text-3xl font-semibold tracking-tight text-neutral-950 sm:text-4xl lg:text-[2.65rem]">
          {title}
        </h1>
        <p className="mt-3 max-w-3xl text-pretty text-sm leading-relaxed text-neutral-600 sm:text-[15px]">
          {description}
        </p>
      </div>
      {actions ? <div className="flex w-full flex-wrap items-center gap-2 lg:w-auto lg:justify-end">{actions}</div> : null}
    </div>
  )
}

export function SectionHeading({
  overline,
  title,
  description,
}: {
  overline?: string
  title: string
  description?: string
}) {
  return (
    <div className="min-w-0">
      {overline ? (
        <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-neutral-500">{overline}</p>
      ) : null}
      <h2 className="mt-1 text-balance break-words text-xl font-semibold tracking-tight text-neutral-950 sm:text-[1.35rem]">
        {title}
      </h2>
      {description ? (
        <p className="mt-2 max-w-3xl text-pretty text-sm leading-relaxed text-neutral-600">{description}</p>
      ) : null}
    </div>
  )
}

export function StatusMetricCard({ metric }: { metric: StatusMetric }) {
  return (
    <SurfaceCard className="min-w-0 p-4 sm:p-5">
      <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-neutral-500">{metric.label}</p>
      <p
        className={cn(
          'mt-3 break-words text-[1.65rem] font-semibold tracking-tight sm:text-2xl',
          metric.tone === 'positive' && 'text-emerald-700',
          metric.tone === 'negative' && 'text-red-700',
          (!metric.tone || metric.tone === 'neutral') && 'text-neutral-950',
        )}
      >
        {metric.value}
      </p>
      <p className="mt-2 text-sm leading-relaxed text-neutral-600">{metric.detail}</p>
    </SurfaceCard>
  )
}

export function ToneBadge({
  tone,
  children,
}: {
  tone: OutlookTone | PriorityTone | StageTone | DriverCredibility
  children: ReactNode
}) {
  const className =
    tone === 'strong' || tone === 'opportunity' || tone === 'high'
      ? 'border-emerald-200 bg-emerald-50 text-emerald-800'
      : tone === 'on-track'
        ? 'border-sky-200 bg-sky-50 text-sky-800'
        : tone === 'at-risk' || tone === 'watch' || tone === 'medium'
          ? 'border-amber-200 bg-amber-50 text-amber-900'
          : 'border-red-200 bg-red-50 text-red-800'

  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full border px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.14em]',
        className,
      )}
    >
      {children}
    </span>
  )
}

export function StatePanel({
  title,
  description,
  tone = 'neutral',
  action,
}: {
  title: string
  description: string
  tone?: 'neutral' | 'error' | 'loading'
  action?: ReactNode
}) {
  return (
    <SurfaceCard
      className={cn(
        'p-6 sm:p-7',
        tone === 'error' && 'border-red-200 bg-red-50/70',
        tone === 'loading' && 'border-sky-200 bg-sky-50/70',
      )}
    >
      <h2 className="text-lg font-semibold tracking-tight text-neutral-950">{title}</h2>
      <p className="mt-2 max-w-2xl text-sm leading-relaxed text-neutral-600">{description}</p>
      {action ? <div className="mt-4">{action}</div> : null}
    </SurfaceCard>
  )
}

export function RoleLabel({ role }: { role: OpenHouseRole }) {
  const label =
    role === 'executive'
      ? 'Executive lens'
      : role === 'operator'
        ? 'Operator lens'
        : 'Analyst lens'
  const accentClass =
    role === 'executive'
      ? 'bg-[#e57b30]'
      : role === 'operator'
        ? 'bg-[#139a9a]'
        : 'bg-violet-500'

  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-white/90 px-3 py-1.5 text-xs font-semibold text-neutral-700 shadow-sm">
      <span className={cn('h-2 w-2 rounded-full', accentClass)} aria-hidden />
      {label}
    </span>
  )
}

type WorkflowStep = {
  id: string
  title: string
  detail: string
  to?: string
  cta?: string
}

export function QuickAccessLinks({
  steps,
}: {
  steps: WorkflowStep[]
}) {
  const links = steps.filter((step) => step.to && step.cta)
  if (links.length === 0) return null

  return (
    <div className="flex flex-wrap gap-2">
      {links.map((step) => (
        <Link
          key={step.id}
          to={step.to!}
          className="inline-flex rounded-full border border-neutral-200 bg-white px-3 py-1.5 text-xs font-semibold text-neutral-900 shadow-sm transition-colors hover:bg-neutral-100"
        >
          {step.cta}
        </Link>
      ))}
    </div>
  )
}

export type { WorkflowStep }
