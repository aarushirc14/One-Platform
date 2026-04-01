import { Navigate, Route, Routes } from 'react-router-dom'
import { AppLayout } from '@/app/layout/AppLayout'
import { PulseLayout } from '@/pulse/layout/PulseLayout'
import { CommunityPulsePage } from '@/pulse/pages/CommunityPulsePage'
import { DivisionPulsePage } from '@/pulse/pages/DivisionPulsePage'
import { DashboardPage } from '@/pages/DashboardPage'
import { HomePage } from '@/pages/HomePage'
import { ItemDetailPage } from '@/pages/ItemDetailPage'
import { ItemsPage } from '@/pages/ItemsPage'
import { SettingsPage } from '@/pages/SettingsPage'

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/pulse" element={<PulseLayout />}>
        <Route index element={<DivisionPulsePage />} />
        <Route path="community/:communityId" element={<CommunityPulsePage />} />
      </Route>
      <Route element={<AppLayout />}>
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/items" element={<ItemsPage />} />
        <Route path="/items/:id" element={<ItemDetailPage />} />
        <Route path="/settings" element={<SettingsPage />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
