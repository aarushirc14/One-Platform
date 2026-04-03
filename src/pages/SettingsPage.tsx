import { useMemo, useState } from 'react'
import type { UserPreferences } from '@/types'
import { Button } from '@/components/ui/Button'
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import { Input } from '@/components/ui/Input'
import { PageHeader } from '@/components/ui/PageHeader'

const defaultPreferences: UserPreferences = {
  emailDigest: true,
  compactTables: false,
  workspaceName: 'Northwind Labs',
}

const storageKey = 'one-platform:preferences:v1'

function loadPreferences(): UserPreferences {
  try {
    const raw = localStorage.getItem(storageKey)
    if (!raw) return defaultPreferences
    const parsed = JSON.parse(raw) as Partial<UserPreferences>
    return { ...defaultPreferences, ...parsed }
  } catch {
    return defaultPreferences
  }
}

function savePreferences(next: UserPreferences) {
  localStorage.setItem(storageKey, JSON.stringify(next))
}

export function SettingsPage() {
  const initial = useMemo(() => loadPreferences(), [])
  const [prefs, setPrefs] = useState<UserPreferences>(initial)
  const [savedAt, setSavedAt] = useState<number | null>(null)

  function commit(next: UserPreferences) {
    savePreferences(next)
    setPrefs(next)
    setSavedAt(Date.now())
  }

  return (
    <>
      <PageHeader
        title="Settings"
        description="Preferences persist in localStorage for this browser — no account required."
      />

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Workspace</CardTitle>
            <CardDescription>Shown in the shell header until tenant context is connected.</CardDescription>
          </CardHeader>
          <label className="block text-sm font-medium text-slate-700" htmlFor="workspace-name">
            Display name
          </label>
          <Input
            id="workspace-name"
            className="mt-2"
            value={prefs.workspaceName}
            onChange={(e) => commit({ ...prefs, workspaceName: e.target.value })}
            autoComplete="off"
          />
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Interface</CardTitle>
            <CardDescription>Toggle demo flags — state stays on this device.</CardDescription>
          </CardHeader>
          <div className="space-y-4">
            <ToggleRow
              id="email-digest"
              label="Weekly email digest"
              description="Stored locally only; no email is sent."
              checked={prefs.emailDigest}
              onChange={(emailDigest) => commit({ ...prefs, emailDigest })}
            />
            <ToggleRow
              id="compact-tables"
              label="Compact tables"
              description="Reserve for future dense list layouts."
              checked={prefs.compactTables}
              onChange={(compactTables) => commit({ ...prefs, compactTables })}
            />
          </div>
        </Card>
      </div>

      <Card className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-medium text-slate-900">Reset to defaults</p>
          <p className="text-sm text-slate-600">Clears saved preferences for this app in localStorage.</p>
        </div>
        <Button
          type="button"
          variant="secondary"
          onClick={() => {
            localStorage.removeItem(storageKey)
            commit(defaultPreferences)
          }}
        >
          Reset
        </Button>
      </Card>

      <p className="text-xs text-slate-500" role="status" aria-live="polite">
        {savedAt
          ? `Preferences saved (${new Intl.DateTimeFormat(undefined, {
              timeStyle: 'short',
            }).format(new Date(savedAt))}).`
          : 'Changes save when you edit this page.'}
      </p>
    </>
  )
}

type ToggleRowProps = {
  id: string
  label: string
  description: string
  checked: boolean
  onChange: (next: boolean) => void
}

function ToggleRow({ id, label, description, checked, onChange }: ToggleRowProps) {
  return (
    <div className="flex items-start justify-between gap-4 rounded-xl border border-slate-100 bg-slate-50/80 px-4 py-3">
      <div>
        <p className="text-sm font-medium text-slate-900">{label}</p>
        <p className="text-xs text-slate-600">{description}</p>
      </div>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        id={id}
        onClick={() => onChange(!checked)}
        className={
          checked
            ? 'relative inline-flex h-7 w-12 shrink-0 items-center rounded-full bg-indigo-600 transition-colors'
            : 'relative inline-flex h-7 w-12 shrink-0 items-center rounded-full bg-slate-300 transition-colors'
        }
      >
        <span
          className={
            checked
              ? 'inline-block h-5 w-5 translate-x-6 rounded-full bg-white shadow transition-transform'
              : 'inline-block h-5 w-5 translate-x-1 rounded-full bg-white shadow transition-transform'
          }
        />
        <span className="sr-only">{label}</span>
      </button>
    </div>
  )
}
