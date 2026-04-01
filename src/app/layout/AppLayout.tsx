import { Outlet } from 'react-router-dom'
import { AppSidebar } from './AppSidebar'
import { AppTopBar } from './AppTopBar'

export function AppLayout() {
  return (
    <div className="flex min-h-screen bg-slate-50">
      <AppSidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        <AppTopBar />
        <main className="flex-1 px-3 py-6 pb-10 sm:px-4 sm:py-8">
          <div className="w-full space-y-6 sm:space-y-8">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  )
}
