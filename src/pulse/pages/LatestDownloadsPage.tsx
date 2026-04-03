import { useMemo } from 'react'
import { divisionName } from '@/pulse/data/division'
import { useLocalCalendarDayKey } from '@/pulse/hooks/useLocalCalendarDayKey'
import { formatLatestDownloadsDataUpTo, latestDownloadsPdfDateKey } from '@/pulse/lib/pulseDatePeriods'
import { PulsePageHeading } from '@/pulse/components/PulsePageHeading'
import { IconDownload, IconPdfDoc } from '@/pulse/components/icons'
import { pulseDataValidUntil } from '@/pulse/ui/pulseTypography'
import { cn } from '@/lib/cn'

const downloadBtnClass =
  'inline-flex h-11 w-44 shrink-0 items-center justify-center gap-2 rounded-lg bg-neutral-900 px-4 text-sm font-semibold text-white transition-colors hover:bg-neutral-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-900'

const divisionExports = [
  { id: 'tuscon', label: divisionName },
  { id: 'chandler', label: 'Chandler' },
  { id: 'scottsdale', label: 'Scottsdale' },
] as const

export function LatestDownloadsPage() {
  const dayKey = useLocalCalendarDayKey()
  const { dataValidUntilLabel, pdfDateKey } = useMemo(() => {
    const ref = new Date()
    return {
      dataValidUntilLabel: formatLatestDownloadsDataUpTo(ref),
      pdfDateKey: latestDownloadsPdfDateKey(ref),
    }
  }, [dayKey])

  return (
    <div className="w-full px-3 pb-5 pt-1.5 sm:px-6 sm:py-7 lg:min-h-full lg:px-10">
      <div className="mx-auto w-full max-w-[720px]">
        <header className="border-b border-neutral-200 pb-5 sm:pb-6">
          <PulsePageHeading title="Latest Downloads" />
          <p className="mt-2 max-w-xl text-sm leading-relaxed text-neutral-600">
            Export division performance reports.
          </p>
          <p className={cn('mt-2', pulseDataValidUntil)}>
            Data Up To: {dataValidUntilLabel}
          </p>
        </header>

        <ul className="mt-6 list-none space-y-4 p-0" role="list">
          {divisionExports.map((div) => (
            <li key={div.id}>
              <article className="overflow-hidden rounded-xl border border-neutral-200/90 bg-white shadow-sm">
                <div className="border-b border-neutral-200/80 bg-neutral-50/90 px-4 py-3 sm:px-5">
                  <h2 className="text-base font-semibold text-neutral-900">{div.label}</h2>
                </div>
                <div className="flex flex-col gap-2 px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-5 sm:py-3.5">
                  <div className="flex min-w-0 items-start gap-3">
                    <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-red-50 text-red-700 ring-1 ring-red-200/80">
                      <IconPdfDoc className="h-[18px] w-[18px]" />
                    </span>
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-neutral-900">Division Performance</p>
                      <p className="mt-1 font-mono text-[11px] text-neutral-400">
                        {div.label.replace(/\s+/g, '_')}_Division_Performance_{pdfDateKey}.pdf
                      </p>
                    </div>
                  </div>
                  <button type="button" className={downloadBtnClass}>
                    <IconDownload className="h-4 w-4 shrink-0" />
                    Download PDF
                  </button>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
