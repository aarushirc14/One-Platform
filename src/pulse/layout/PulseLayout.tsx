import { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import { IconMenu } from '@/pulse/components/icons'
import { PulseFiltersProvider } from '@/pulse/context/PulseFiltersContext'
import { PulseSidebar } from '@/pulse/layout/PulseSidebar'
import { cn } from '@/lib/cn'

export function PulseLayout() {
  const [mobileNavOpen, setMobileNavOpen] = useState(false)

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setMobileNavOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  useEffect(() => {
    if (!mobileNavOpen) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [mobileNavOpen])

  const closeNav = () => setMobileNavOpen(false)

  return (
    <div className="pulse-root flex min-h-[100dvh] min-h-screen flex-col overflow-x-hidden bg-neutral-100 text-neutral-900 lg:min-h-screen lg:flex-row">
      <header className="sticky top-0 z-20 border-b border-neutral-200 bg-white/95 backdrop-blur-sm lg:hidden">
        <div className="flex h-11 items-center gap-3 px-3 sm:h-14 sm:px-4">
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-neutral-200 bg-white text-neutral-800 shadow-sm transition-colors hover:bg-neutral-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-900"
            aria-expanded={mobileNavOpen}
            aria-controls="pulse-nav"
            onClick={() => setMobileNavOpen(true)}
          >
            <IconMenu className="h-5 w-5" />
            <span className="sr-only">Open navigation</span>
          </button>
          <span className="min-w-0 flex-1 truncate text-sm font-semibold text-neutral-900">
            OpenPredict
          </span>
        </div>
      </header>

      {mobileNavOpen ? (
        <button
          type="button"
          className="fixed inset-0 z-30 bg-neutral-900/40 backdrop-blur-[1px] lg:hidden"
          aria-label="Close navigation"
          onClick={closeNav}
        />
      ) : null}

      <PulseSidebar
        id="pulse-nav"
        className={cn(
          'fixed left-0 top-0 z-40 w-[min(280px,calc(100vw-2rem))] max-w-[100vw] -translate-x-full shadow-xl transition-transform duration-200 ease-out',
          'lg:static lg:z-0 lg:w-60 lg:translate-x-0 lg:border-r lg:shadow-none',
          mobileNavOpen && 'translate-x-0',
        )}
        onNavigate={closeNav}
      />

      <div className="flex min-h-0 w-full min-w-0 flex-col lg:flex-1">
        <PulseFiltersProvider>
          <Outlet />
        </PulseFiltersProvider>
      </div>
    </div>
  )
}
