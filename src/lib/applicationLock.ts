// Per-device lock so the same browser doesn't submit the application twice.
// Convenience only: the real duplicate check lives in the Apps Script backend.
const STORAGE_KEY = 'tg_application_v1'

export interface ApplicationLock {
  email: string
  date: string
}

export function getApplicationLock(): ApplicationLock | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw)
    return parsed && typeof parsed === 'object' ? parsed : null
  } catch {
    return null
  }
}

export function setApplicationLock(email: string): void {
  try {
    const value: ApplicationLock = { email, date: new Date().toISOString() }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(value))
  } catch {
    // Storage unavailable (private mode, blocked cookies...): the form keeps working without the lock.
  }
}
