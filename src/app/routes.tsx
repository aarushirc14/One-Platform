import { Navigate, Route, Routes } from 'react-router-dom'
import {
  OPENHOMES_BRIEFING,
  OPENHOMES_DIVISION_BASE,
  OPENHOMES_DRIVERS,
  OPENHOMES_OVERVIEW,
  OPENHOMES_PULSE_ENTRY,
  OPENHOMES_PRIORITIES,
} from '@/pulse/constants/routes'
import { OpenHouseLayout } from '@/openhouse/layout/OpenHouseLayout'
import { CommunityWorkspacePage } from '@/openhouse/pages/CommunityWorkspacePage'
import { CommunitiesPage } from '@/openhouse/pages/CommunitiesPage'
import { DriverIntelligencePage } from '@/openhouse/pages/DriverIntelligencePage'
import { ExecutiveBriefingPage } from '@/openhouse/pages/ExecutiveBriefingPage'
import { ExecutiveOverviewPage } from '@/openhouse/pages/ExecutiveOverviewPage'
import { PriorityQueuePage } from '@/openhouse/pages/PriorityQueuePage'

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to={OPENHOMES_PULSE_ENTRY} replace />} />
      <Route path="/landing" element={<Navigate to={OPENHOMES_PULSE_ENTRY} replace />} />
      <Route path={OPENHOMES_DIVISION_BASE} element={<OpenHouseLayout />}>
        <Route index element={<Navigate to="overview" replace />} />
        <Route path="overview" element={<ExecutiveOverviewPage />} />
        <Route path="priorities" element={<PriorityQueuePage />} />
        <Route path="communities" element={<CommunitiesPage />} />
        <Route path="communities/:communityId" element={<CommunityWorkspacePage />} />
        <Route path="drivers" element={<DriverIntelligencePage />} />
        <Route path="briefing" element={<ExecutiveBriefingPage />} />

        <Route path="division-performance" element={<Navigate to={OPENHOMES_OVERVIEW} replace />} />
        <Route path="forecast-drivers" element={<Navigate to={OPENHOMES_DRIVERS} replace />} />
        <Route path="community-triage" element={<Navigate to={OPENHOMES_PRIORITIES} replace />} />
        <Route path="community-triage/:communityId" element={<CommunityWorkspacePage />} />
        <Route path="downloads" element={<Navigate to={OPENHOMES_BRIEFING} replace />} />
      </Route>
      <Route path="/dashboard" element={<Navigate to={OPENHOMES_OVERVIEW} replace />} />
      <Route path="/items" element={<Navigate to={OPENHOMES_PRIORITIES} replace />} />
      <Route path="/items/:id" element={<Navigate to={OPENHOMES_PRIORITIES} replace />} />
      <Route path="/settings" element={<Navigate to={OPENHOMES_BRIEFING} replace />} />
      <Route path="*" element={<Navigate to={OPENHOMES_PULSE_ENTRY} replace />} />
    </Routes>
  )
}
