import { cn } from '@/lib/cn'
import { pulseKpiCardOverline, pulseMarkerLabel, pulseStatusBadge } from '@/pulse/ui/pulseTypography'

export type RollupKpiTone = 'on_track' | 'needs_attention'

export type DivisionPerformanceRollupKpiCardProps = {
  title: string
  tone: RollupKpiTone
  badge: string
  currentValue: string
  midPhrase: string
  targetValue: string
  targetWord: string
  detailLine?: string | null
  /** Width of the progress fill as % of the track (current vs target narrative). */
  fillPct: number
  /** Horizontal position of the target marker line, % from left. */
  markerPct: number
  markerLabel: string
}

export function DivisionPerformanceRollupKpiCard({
  title,
  tone,
  badge,
  currentValue,
  midPhrase,
  targetValue,
  targetWord,
  detailLine,
  fillPct,
  markerPct,
  markerLabel,
}: DivisionPerformanceRollupKpiCardProps) {
  const onTrack = tone === 'on_track'

  return (
    <div className="flex h-full flex-col overflow-hidden rounded-lg border border-neutral-200 bg-white shadow-sm">
      <div className={cn('h-0.5 w-full shrink-0', onTrack ? 'bg-emerald-500' : 'bg-red-500')} aria-hidden />
      <div className="flex flex-1 flex-col p-6">
        <div>
          <div className="flex items-start justify-between gap-3">
            <h3 className={pulseKpiCardOverline}>{title}</h3>
            <span
              className={cn(
                pulseStatusBadge,
                'shrink-0 rounded-full px-2.5 py-0.5',
                onTrack ? 'bg-emerald-500/15 text-emerald-700' : 'bg-red-500/15 text-red-600',
              )}
            >
              {badge}
            </span>
          </div>

          <p className="mt-4 flex flex-wrap items-baseline gap-x-0">
            <span className="text-3xl font-bold tabular-nums tracking-tight text-neutral-900">
              {currentValue}
            </span>
            <span className="text-sm font-normal text-neutral-500">{midPhrase}</span>
            <span className="text-xl font-bold tabular-nums tracking-tight text-neutral-900">
              {targetValue}
            </span>
            <span className="text-sm font-normal text-neutral-500"> {targetWord}</span>
          </p>
          {detailLine ? <p className="mt-1 text-xs text-neutral-500">{detailLine}</p> : null}
        </div>

        <div className="mt-auto pt-6">
          <div className="relative h-2.5 w-full overflow-visible rounded-full bg-slate-200">
            <div
              className={cn(
                'h-full rounded-full',
                onTrack ? 'bg-emerald-500' : 'bg-red-500',
              )}
              style={{ width: `${Math.min(100, Math.max(0, fillPct))}%` }}
            />
            <div
              className="pointer-events-none absolute top-1/2 z-10 h-4 w-px -translate-y-1/2 bg-neutral-400"
              style={{ left: `${markerPct}%`, marginLeft: '-0.5px' }}
              aria-hidden
            />
          </div>
          <div className="relative mt-2 h-4">
            <span
              className={pulseMarkerLabel}
              style={{ left: `${markerPct}%`, transform: 'translateX(-50%)' }}
            >
              {markerLabel}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
