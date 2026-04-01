import type { MetricTableSection } from '@/pulse/types'
import { IconChevronDown, IconInfo } from '@/pulse/components/icons'
import { cn } from '@/lib/cn'

type MetricsTableProps = {
  section: MetricTableSection
}

export function MetricsTable({ section }: MetricsTableProps) {
  return (
    <div
      className={cn(
        'overflow-hidden rounded-xl border border-neutral-200/90 bg-white',
        'shadow-[0_1px_2px_rgba(0,0,0,0.04),0_4px_16px_rgba(0,0,0,0.04)]',
      )}
    >
      {section.title ? (
        <div className="border-b border-neutral-200/90 px-4 py-3 sm:px-5">
          <h3 className="text-sm font-semibold leading-snug text-neutral-950">{section.title}</h3>
        </div>
      ) : null}
      <div className="-mx-1 overflow-x-auto overscroll-x-contain px-1 sm:mx-0 sm:px-0 sm:overscroll-auto">
        <table className="min-w-[1100px] w-full border-collapse text-[13px] sm:text-sm">
          <thead>
            <tr className="border-b border-neutral-200 bg-neutral-50/90 text-left text-sm font-medium text-neutral-600">
              <th className="px-4 py-3">Metric</th>
              <th className="px-4 py-3 text-center">
                <span className="inline-flex items-center justify-center gap-1">
                  Community Counts
                  <IconInfo className="text-neutral-400" />
                </span>
              </th>
              <th className="px-4 py-3 text-center">
                <span className="inline-flex items-center justify-center gap-1">
                  Community Rate
                  <IconInfo className="text-neutral-400" />
                </span>
              </th>
              <th className="px-4 py-3 text-center">
                <span className="inline-flex items-center justify-center gap-1">
                  Benchmark Rate
                  <IconInfo className="text-neutral-400" />
                </span>
              </th>
              <th className="px-4 py-3 text-center">Performance</th>
              <th className="px-4 py-3 text-center">
                <span className="inline-flex items-center justify-center gap-1">
                  % Change
                  <IconInfo className="text-neutral-400" />
                </span>
              </th>
              <th className="px-4 py-3" aria-hidden />
            </tr>
          </thead>
          <tbody>
            {section.rows.map((row, idx) =>
              row.kind === 'placeholder' ? (
                <tr key={`${row.metric}-${idx}`} className="border-b border-neutral-100 bg-neutral-50/60 last:border-b-0">
                  <td colSpan={7} className="px-4 py-6 text-center text-sm italic text-neutral-500">
                    Data coming soon
                  </td>
                </tr>
              ) : (
                <tr
                  key={`${row.metric}-${idx}`}
                  className={cn(
                    'border-b border-neutral-100 last:border-b-0',
                    idx % 2 === 1 && 'bg-neutral-50/40',
                  )}
                >
                  <td className="px-4 py-3 font-semibold text-neutral-950">{row.metric}</td>
                  <td className="px-4 py-3 text-center text-neutral-900">
                    <div className="flex flex-col items-center gap-1 text-xs">
                      <span className="text-neutral-500">{row.countsLabel}</span>
                      <span className="text-sm font-semibold tabular-nums text-neutral-900">{row.countsFrom}</span>
                      <span className="text-neutral-400" aria-hidden>
                        →
                      </span>
                      <span className="text-neutral-500">{row.countsToLabel}</span>
                      <span className="text-sm font-semibold tabular-nums text-neutral-900">{row.countsTo}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-center tabular-nums text-neutral-900">{row.communityRate}</td>
                  <td className="px-4 py-3 text-center tabular-nums text-neutral-900">{row.benchmarkRate}</td>
                  <td
                    className={cn(
                      'px-4 py-3 text-center text-sm font-semibold tabular-nums',
                      row.performanceTone === 'positive' ? 'text-emerald-600' : 'text-red-600',
                    )}
                  >
                    {row.performance}
                  </td>
                  <td className="px-4 py-3 text-center">
                    <span
                      className={cn(
                        'inline-flex items-center justify-center gap-1 text-sm font-semibold tabular-nums',
                        row.changeTone === 'positive' ? 'text-emerald-600' : 'text-red-600',
                      )}
                    >
                      <span>{row.changeUp ? '↑' : '↓'}</span>
                      {row.change}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <button
                      type="button"
                      className="inline-flex items-center gap-1 rounded-full bg-sky-100 px-3 py-1 text-xs font-semibold text-sky-900 hover:bg-sky-200"
                    >
                      Trends
                      <IconChevronDown className="h-3.5 w-3.5" />
                    </button>
                  </td>
                </tr>
              ),
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
