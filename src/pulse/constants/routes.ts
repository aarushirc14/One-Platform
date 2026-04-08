/** Legacy Tucson shell path retained for compatibility with existing links. */
export const OPENHOMES_DIVISION_BASE = '/openhomes/tuscon'

export const OPENHOMES_OVERVIEW = `${OPENHOMES_DIVISION_BASE}/overview`

export const OPENHOMES_PRIORITIES = `${OPENHOMES_DIVISION_BASE}/priorities`

export const OPENHOMES_DRIVERS = `${OPENHOMES_DIVISION_BASE}/drivers`

export const OPENHOMES_BRIEFING = `${OPENHOMES_DIVISION_BASE}/briefing`

export const OPENHOMES_COMMUNITIES_BASE = `${OPENHOMES_DIVISION_BASE}/communities`
export const OPENHOMES_COMMUNITIES = OPENHOMES_COMMUNITIES_BASE

export function openhomesCommunityPath(communityId: string) {
  return `${OPENHOMES_COMMUNITIES_BASE}/${communityId}`
}

/** Backwards-compatible aliases for the older product structure. */
export const OPENHOMES_DIVISION_PERFORMANCE = OPENHOMES_OVERVIEW
export const OPENHOMES_COMMUNITY_TRIAGE = OPENHOMES_PRIORITIES
export const OPENHOMES_FORECAST_DRIVERS = OPENHOMES_DRIVERS
export const OPENHOMES_DOWNLOADS = OPENHOMES_BRIEFING

/** Default redirect target for `/` and unknown routes. */
export const OPENHOMES_PULSE_ENTRY = OPENHOMES_OVERVIEW
