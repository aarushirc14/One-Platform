import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import type { OpenHouseRole } from '@/openhouse/types'

type OpenHouseRoleContextValue = {
  role: OpenHouseRole
  setRole: (role: OpenHouseRole) => void
}

const STORAGE_KEY = 'openhouse-role'

const OpenHouseRoleContext = createContext<OpenHouseRoleContextValue | null>(null)

export function OpenHouseRoleProvider({ children }: { children: ReactNode }) {
  const [role, setRole] = useState<OpenHouseRole>(() => {
    if (typeof window === 'undefined') return 'executive'
    const stored = window.localStorage.getItem(STORAGE_KEY)
    return stored === 'executive' || stored === 'operator' || stored === 'analyst'
      ? stored
      : 'executive'
  })

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, role)
  }, [role])

  const value = useMemo(() => ({ role, setRole }), [role])

  return <OpenHouseRoleContext.Provider value={value}>{children}</OpenHouseRoleContext.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components -- hook is intentionally paired with the provider
export function useOpenHouseRole() {
  const context = useContext(OpenHouseRoleContext)
  if (!context) {
    throw new Error('useOpenHouseRole must be used within OpenHouseRoleProvider')
  }
  return context
}
