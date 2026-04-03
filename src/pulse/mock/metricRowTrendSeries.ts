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

/** Mar 2025 – Feb 2026: Catalina firms late in the year on rate as paid mix grows; division average stays flatter because volume communities are not adding leads. */
export const WEB_TRAFFIC_TO_LEADS_TREND: MetricTrendMonthPoint[] = [
  { axisLabel: 'Mar 2025', tooltipTitle: 'March 2025', communityRate: 1.46, divisionAvgRate: 1.8, industryBenchmarkRate: 1.5 },
  { axisLabel: 'Apr 2025', tooltipTitle: 'April 2025', communityRate: 1.48, divisionAvgRate: 1.78, industryBenchmarkRate: 1.5 },
  { axisLabel: 'May 2025', tooltipTitle: 'May 2025', communityRate: 1.47, divisionAvgRate: 1.66, industryBenchmarkRate: 1.5 },
  { axisLabel: 'Jun 2025', tooltipTitle: 'June 2025', communityRate: 1.5, divisionAvgRate: 1.56, industryBenchmarkRate: 1.5 },
  { axisLabel: 'Jul 2025', tooltipTitle: 'July 2025', communityRate: 1.49, divisionAvgRate: 1.46, industryBenchmarkRate: 1.5 },
  { axisLabel: 'Aug 2025', tooltipTitle: 'August 2025', communityRate: 1.54, divisionAvgRate: 1.38, industryBenchmarkRate: 1.5 },
  { axisLabel: 'Sep 2025', tooltipTitle: 'September 2025', communityRate: 1.65, divisionAvgRate: 1.2, industryBenchmarkRate: 1.5 },
  { axisLabel: 'Oct 2025', tooltipTitle: 'October 2025', communityRate: 1.74, divisionAvgRate: 1.06, industryBenchmarkRate: 1.5 },
  { axisLabel: 'Nov 2025', tooltipTitle: 'November 2025', communityRate: 1.28, divisionAvgRate: 0.93, industryBenchmarkRate: 1.5 },
  { axisLabel: 'Dec 2025', tooltipTitle: 'December 2025', communityRate: 0.92, divisionAvgRate: 0.85, industryBenchmarkRate: 1.5 },
  { axisLabel: 'Jan 2026', tooltipTitle: 'January 2026', communityRate: 0.86, divisionAvgRate: 0.8, industryBenchmarkRate: 1.5 },
  { axisLabel: 'Feb 2026', tooltipTitle: 'February 2026', communityRate: 0.81, divisionAvgRate: 0.78, industryBenchmarkRate: 1.5 },
]
