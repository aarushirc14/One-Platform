import { DivisionPerformanceReport } from '@/pulse/components/division-performance/DivisionPerformanceReport'

export function DivisionPerformancePage() {
  return (
    <div className="min-h-full w-full px-4 py-5 sm:px-6 sm:py-7 lg:px-10">
      <div className="mx-auto w-full max-w-[1180px]">
        <DivisionPerformanceReport />
      </div>
    </div>
  )
}
