import { chartPalette } from '@/pulse/styles/chartPalette'
import { pulseChartSubtitle, pulseChartTitle } from '@/pulse/ui/pulseTypography'

/**
 * 90-day sales forecast reference chart (static PNG in /public).
 */
export function NinetyDaySalesForecastChart() {
  return (
    <div className="overflow-hidden rounded-lg border border-neutral-200 bg-white shadow-sm">
      <div className="border-b border-neutral-100 px-4 py-3 sm:px-5 sm:py-4">
        <h3 className={pulseChartTitle}>90-Day Sales Forecast</h3>
        <p className={pulseChartSubtitle}>
          Rolling 90-day actuals vs forecast with confidence interval
        </p>
      </div>

      <div className="px-2 pb-2 pt-1 sm:px-4">
        <img
          src="/90-day-sales-forecast.png"
          alt="Monthly average sales: actual orange line, blue forecast with confidence band, current date marker"
          className="mx-auto block h-auto w-full max-w-[min(100%,56rem)] [image-rendering:auto]"
          decoding="async"
          fetchPriority="low"
        />

        <p className="sr-only">
          Chart spans April 2025 through June 2026. Orange line is the realized 90-day monthly average sales
          pace; it steps up after March but still sits under the implied monthly plan. Blue line is the forward
          pace with a shaded confidence band that improved modestly versus the prior month yet remains below
          target. A vertical marker denotes the report date.
        </p>

        <div className="flex flex-wrap gap-x-6 gap-y-2 border-t border-neutral-100 px-3 py-3 text-[11px] text-neutral-600 sm:px-4">
          <span className="inline-flex items-center gap-2">
            <span className="h-0.5 w-6 rounded-full" style={{ background: chartPalette.forecastAccent }} />
            Forecast (90-Day Monthly Avg)
          </span>
          <span className="inline-flex items-center gap-2">
            <span className="h-0.5 w-6 rounded-full" style={{ background: chartPalette.actualPrimary }} />
            Actual (90-Day Monthly Avg)
          </span>
          <span className="inline-flex items-center gap-2">
            <span
              className="inline-block h-3 w-px"
              style={{ background: chartPalette.target }}
            />
            Current Date
          </span>
        </div>
      </div>
    </div>
  )
}
