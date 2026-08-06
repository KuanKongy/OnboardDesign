// All localStorage access goes through here so keys stay consistent and the
// study-session reset can clear everything in one call.

export const KEYS = {
  completed: 'arrival:v1:completed', // { [taskId]: isoTimestamp }
  readIssues: 'arrival:v1:readIssues', // string[] of issue ids
}

export function readJSON(key, fallback) {
  try {
    const raw = localStorage.getItem(key)
    return raw ? JSON.parse(raw) : fallback
  } catch {
    return fallback
  }
}

export function writeJSON(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch {
    // storage full/blocked — fine for a prototype
  }
}

/** Clear all prototype state between study participants. */
export function resetAll() {
  Object.values(KEYS).forEach((k) => localStorage.removeItem(k))
}
