import { Outlet } from 'react-router-dom'
import { AppSidebar } from './AppSidebar'
import { AppTopBar } from './AppTopBar'

export function AppLayout() {
  return (
    <div className="flex min-h-screen bg-slate-50">
      <AppSidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        <AppTopBar />
        <main className="flex-1 px-4 py-8 sm:px-8 lg:px-10">
          <div className="mx-auto max-w-6xl space-y-8">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  )
}
