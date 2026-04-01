import { Outlet } from 'react-router-dom'
import { PulseSidebar } from '@/pulse/layout/PulseSidebar'

export function PulseLayout() {
  return (
    <div className="pulse-root flex min-h-screen bg-[#f9fafb] font-[Inter,ui-sans-serif,system-ui,sans-serif] text-neutral-900">
      <PulseSidebar />
      <div className="min-w-0 flex-1 overflow-auto">
        <Outlet />
      </div>
    </div>
  )
}
