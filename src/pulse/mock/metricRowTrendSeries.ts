/** Monthly points for Web Traffic → Total Leads trend chart (% values, not decimals of 1). */
export type MetricTrendMonthPoint = {
  /** Short label on the X-axis, e.g. "Mar 2025". */
  axisLabel: string
  /** Full month for tooltip header, e.g. "March 2025". */
  tooltipTitle: string
  communityRate: number
  divisionAvgRate: number
  /** Industry benchmark — flat reference line (typically 1.5%). */
  industryBenchmarkRate: number
}

/** Twelve months Mar 2025 – Feb 2026 (illustrative curves aligned to product reference). */
export const WEB_TRAFFIC_TO_LEADS_TREND: MetricTrendMonthPoint[] = [
  { axisLabel: 'Mar 2025', tooltipTitle: 'March 2025', communityRate: 1.51, divisionAvgRate: 1.88, industryBenchmarkRate: 1.5 },
  { axisLabel: 'Apr 2025', tooltipTitle: 'April 2025', communityRate: 1.52, divisionAvgRate: 1.87, industryBenchmarkRate: 1.5 },
  { axisLabel: 'May 2025', tooltipTitle: 'May 2025', communityRate: 1.51, divisionAvgRate: 1.75, industryBenchmarkRate: 1.5 },
  { axisLabel: 'Jun 2025', tooltipTitle: 'June 2025', communityRate: 1.53, divisionAvgRate: 1.65, industryBenchmarkRate: 1.5 },
  { axisLabel: 'Jul 2025', tooltipTitle: 'July 2025', communityRate: 1.52, divisionAvgRate: 1.55, industryBenchmarkRate: 1.5 },
  { axisLabel: 'Aug 2025', tooltipTitle: 'August 2025', communityRate: 1.58, divisionAvgRate: 1.48, industryBenchmarkRate: 1.5 },
  { axisLabel: 'Sep 2025', tooltipTitle: 'September 2025', communityRate: 1.72, divisionAvgRate: 1.28, industryBenchmarkRate: 1.5 },
  { axisLabel: 'Oct 2025', tooltipTitle: 'October 2025', communityRate: 1.85, divisionAvgRate: 1.12, industryBenchmarkRate: 1.5 },
  { axisLabel: 'Nov 2025', tooltipTitle: 'November 2025', communityRate: 1.38, divisionAvgRate: 0.98, industryBenchmarkRate: 1.5 },
  { axisLabel: 'Dec 2025', tooltipTitle: 'December 2025', communityRate: 1.0, divisionAvgRate: 0.9, industryBenchmarkRate: 1.5 },
  { axisLabel: 'Jan 2026', tooltipTitle: 'January 2026', communityRate: 1.0, divisionAvgRate: 0.85, industryBenchmarkRate: 1.5 },
  { axisLabel: 'Feb 2026', tooltipTitle: 'February 2026', communityRate: 1.3, divisionAvgRate: 0.92, industryBenchmarkRate: 1.5 },
]
