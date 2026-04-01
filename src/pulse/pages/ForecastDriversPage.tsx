import { divisionName } from '@/pulse/mock/division'

export function ForecastDriversPage() {
  return (
    <div className="min-h-full w-full px-4 py-5 sm:px-6 sm:py-7 lg:px-10">
      <div className="mx-auto w-full max-w-[1180px]">
        <header className="border-b border-neutral-200 pb-5 sm:pb-6">
          <p className="text-xs font-semibold uppercase tracking-wide text-neutral-500">{divisionName}</p>
          <h1 className="mt-1 text-4xl font-bold tracking-tight text-neutral-950 sm:text-[2.5rem] sm:leading-tight">
            Forecast Drivers
          </h1>
          <p className="mt-2 max-w-2xl text-sm text-neutral-600">
            Prototype placeholder — connect forecast inputs and driver logic when the backend is ready.
          </p>
        </header>
      </div>
    </div>
  )
}
