/** Division / community KPI — period sales vs target */
export const INFO_KPI_SALES_VS_TARGET =
  'This metric shows the comparison between actual sales and the target sales.'

/** Division / community KPI — year to date */
export const INFO_KPI_SALES_VS_TARGET_YTD =
  'This metric shows the year-to-date sales performance compared to the YTD sales target.'

/**
 * Sales impact (e.g. communities table mode toggle) — general wording.
 * Funnel cards use {@link INFO_FUNNEL_SALES_IMPACT} for the footer info control.
 */
export const INFO_SALES_IMPACT =
  'Sales Impact is the estimated amount of sales gained or lost based on the stage performance for that community compared to the selected target.'

/** Funnel card footer — Sales Impact info (per stage column). */
export const INFO_FUNNEL_SALES_IMPACT =
  'The estimated sales gained or lost due to the amount of web traffic in this community, compared to the estimated amount needed to reach the planned sales based on the selected target.'

/** Metrics table — column headers */
export const INFO_METRICS_COMMUNITY_COUNTS =
  'The number of recorded values for the first and second stages of this conversion rate metric during the current period for the community.'

export const INFO_METRICS_COMMUNITY_RATE =
  'The conversion rate during the current period for the community.'

export const INFO_METRICS_TARGET_RATE =
  'The conversion rate during the current period for the target.'

/** Performance and % Change share the same definition (per product copy). */
export const INFO_METRICS_PERFORMANCE_VS_TARGET_PERIOD =
  'The performance of the community compared to the target during the current period.'

export const INFO_METRICS_PERFORMANCE = INFO_METRICS_PERFORMANCE_VS_TARGET_PERIOD

export const INFO_METRICS_PCT_CHANGE = INFO_METRICS_PERFORMANCE_VS_TARGET_PERIOD

// --- Overall funnel segment titles → tooltip (exact product strings; helpers only where patterns repeat)

const funnelConversionVsTarget = (metricName: string) =>
  `The ${metricName} conversion rate for this community, compared to the ${metricName} conversion rate of selected target.`

const funnelCountVsEstimated = (label: string, thing: string) =>
  `The number of ${label} for this community, compared to the estimated ${thing} needed to reach the planned sales based on the selected target.`

const FUNNEL_SEGMENT_TOOLTIPS: Record<string, string> = {
  'Web Traffic':
    'Total web traffic for this community, compared to the estimated traffic needed to reach the planned sales, based on the selected traffic-to-sale rate target.',
  'Web Traffic per Sale':
    'The amount of web traffic needed to generate one sale for this community, compared to the estimated traffic per sale needed to reach the planned sales based on the selected target.',
  Leads: funnelCountVsEstimated('Leads', 'number'),
  'Web Traffic to Lead': funnelConversionVsTarget('Web Traffic to Lead'),
  'First Visits':
    'The number of First Visits for this community, compared to the estimated number needed to reach the planned sales based on the selected benchmark targets.',
  'Lead to First Visit': funnelConversionVsTarget('Lead to First Visit'),
  'Total Sales': funnelCountVsEstimated('Total Sales', 'number'),
  'First Visit to Sale': funnelConversionVsTarget('First Visit to Sale'),
}

export function funnelSegmentTooltip(segmentTitle: string): string {
  return FUNNEL_SEGMENT_TOOLTIPS[segmentTitle] ?? segmentTitle
}
