import { divisionName } from '@/pulse/mock/division'
import { usePulseDataValidUntilLabel } from '@/pulse/hooks/usePulseDataValidUntilLabel'
import { IconDownload, IconPdfDoc, IconSpreadsheet } from '@/pulse/components/icons'

const downloadBtnClass =
  'inline-flex h-11 w-44 shrink-0 items-center justify-center gap-2 rounded-lg bg-neutral-900 px-4 text-sm font-semibold text-white transition-colors hover:bg-neutral-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-900'

const divisionExports = [
  { id: 'tuscon', label: divisionName },
  { id: 'chandler', label: 'Chandler' },
  { id: 'scottsdale', label: 'Scottsdale' },
] as const

export function LatestDownloadsPage() {
  const dataValidUntilLabel = usePulseDataValidUntilLabel()

  return (
    <div className="min-h-full w-full px-4 py-5 sm:px-6 sm:py-7 lg:px-10">
      <div className="mx-auto w-full max-w-[720px]">
        <header className="border-b border-neutral-200 pb-5 sm:pb-6">
          <h1 className="text-3xl font-bold tracking-tight text-neutral-950 sm:text-[2rem] sm:leading-tight">
            Latest Downloads
          </h1>
          <p className="mt-2 max-w-xl text-sm leading-relaxed text-neutral-600">
            Export community triage workbooks and division performance reports.
          </p>
          <p className="mt-2 text-sm italic text-neutral-600">Data snapshot: {dataValidUntilLabel}</p>
        </header>

        <ul className="mt-6 list-none space-y-4 p-0" role="list">
          {divisionExports.map((div) => (
            <li key={div.id}>
              <article className="overflow-hidden rounded-xl border border-neutral-200/90 bg-white shadow-sm">
                <div className="border-b border-neutral-200/80 bg-neutral-50/90 px-4 py-3 sm:px-5">
                  <h2 className="text-base font-semibold text-neutral-900">{div.label}</h2>
                </div>
                <div className="divide-y divide-neutral-100">
                  <div className="flex flex-col gap-2 px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-5 sm:py-3.5">
                    <div className="flex min-w-0 items-start gap-3">
                      <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200/80">
                        <IconSpreadsheet className="h-[18px] w-[18px]" />
                      </span>
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-neutral-900">Community Triage</p>
                        <p className="mt-1 font-mono text-[11px] text-neutral-400">
                          {div.label.replace(/\s+/g, '_')}_Community_Triage.xlsx
                        </p>
                      </div>
                    </div>
                    <button type="button" className={downloadBtnClass}>
                      <IconDownload className="h-4 w-4 shrink-0" />
                      Download Excel
                    </button>
                  </div>
                  <div className="flex flex-col gap-2 px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-5 sm:py-3.5">
                    <div className="flex min-w-0 items-start gap-3">
                      <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-red-50 text-red-700 ring-1 ring-red-200/80">
                        <IconPdfDoc className="h-[18px] w-[18px]" />
                      </span>
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-neutral-900">Division Performance</p>
                        <p className="mt-1 font-mono text-[11px] text-neutral-400">
                          {div.label.replace(/\s+/g, '_')}_Division_Performance.pdf
                        </p>
                      </div>
                    </div>
                    <button type="button" className={downloadBtnClass}>
                      <IconDownload className="h-4 w-4 shrink-0" />
                      Download PDF
                    </button>
                  </div>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
