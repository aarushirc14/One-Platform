/** Tuscon division shell — all Community Pulse routes live under this path. */
export const OPENHOMES_DIVISION_BASE = '/openhomes/tuscon'

export const OPENHOMES_DIVISION_PERFORMANCE = `${OPENHOMES_DIVISION_BASE}/division-performance`

export const OPENHOMES_FORECAST_DRIVERS = `${OPENHOMES_DIVISION_BASE}/forecast-drivers`

/** Community triage grid and KPIs (default app entry). */
export const OPENHOMES_COMMUNITY_TRIAGE = `${OPENHOMES_DIVISION_BASE}/community-triage`

/** Community detail under triage. */
export function openhomesCommunityPath(communityId: string) {
  return `${OPENHOMES_DIVISION_BASE}/community-triage/${communityId}`
}

export const OPENHOMES_DOWNLOADS = `${OPENHOMES_DIVISION_BASE}/downloads`

/** Default redirect target for `/` and unknown routes. */
export const OPENHOMES_PULSE_ENTRY = OPENHOMES_COMMUNITY_TRIAGE
