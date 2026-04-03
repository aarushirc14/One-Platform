import { DivisionPerformanceReport } from '@/pulse/components/division-performance/DivisionPerformanceReport'

export function DivisionPerformancePage() {
  return (
    <div className="w-full px-3 pb-5 pt-1.5 sm:px-6 sm:py-7 lg:min-h-full lg:px-10">
      <div className="mx-auto w-full max-w-[1180px]">
        <DivisionPerformanceReport />
      </div>
    </div>
  )
}
