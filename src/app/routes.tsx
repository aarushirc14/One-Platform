import { Navigate, Route, Routes } from 'react-router-dom'
import { AppLayout } from '@/app/layout/AppLayout'
import {
  OPENHOMES_DIVISION_BASE,
  OPENHOMES_PULSE_ENTRY,
} from '@/pulse/constants/routes'
import { PulseLayout } from '@/pulse/layout/PulseLayout'
import { CommunityPulsePage } from '@/pulse/pages/CommunityPulsePage'
import { DivisionPerformancePage } from '@/pulse/pages/DivisionPerformancePage'
import { DivisionPulsePage } from '@/pulse/pages/DivisionPulsePage'
import { ForecastDriversPage } from '@/pulse/pages/ForecastDriversPage'
import { LatestDownloadsPage } from '@/pulse/pages/LatestDownloadsPage'
import { DashboardPage } from '@/pages/DashboardPage'
import { HomePage } from '@/pages/HomePage'
import { ItemDetailPage } from '@/pages/ItemDetailPage'
import { ItemsPage } from '@/pages/ItemsPage'
import { SettingsPage } from '@/pages/SettingsPage'

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to={OPENHOMES_PULSE_ENTRY} replace />} />
      <Route path="/landing" element={<HomePage />} />
      <Route path={OPENHOMES_DIVISION_BASE} element={<PulseLayout />}>
        <Route index element={<Navigate to="division-performance" replace />} />
        <Route path="division-performance" element={<DivisionPerformancePage />} />
        <Route path="forecast-drivers" element={<ForecastDriversPage />} />
        <Route path="community-triage" element={<DivisionPulsePage />} />
        <Route path="community-triage/:communityId" element={<CommunityPulsePage />} />
        <Route path="downloads" element={<LatestDownloadsPage />} />
      </Route>
      <Route element={<AppLayout />}>
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/items" element={<ItemsPage />} />
        <Route path="/items/:id" element={<ItemDetailPage />} />
        <Route path="/settings" element={<SettingsPage />} />
      </Route>
      <Route path="*" element={<Navigate to={OPENHOMES_PULSE_ENTRY} replace />} />
    </Routes>
  )
}
