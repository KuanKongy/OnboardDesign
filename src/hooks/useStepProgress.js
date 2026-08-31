import { useEffect, useState } from 'react'
import { KEYS, readJSON, writeJSON } from '../lib/storage'

/** Stable storage key for one step of one task. */
export const stepKey = (taskId, index) => `${taskId}:${index}`

/**
 * Per-step check-off state for the tracker, persisted to localStorage so it
 * survives refresh mid-study. Steps are independent of task completion —
 * only the user checks things off, never the app.
 */
export function useStepProgress() {
  const [stepMap, setStepMap] = useState(() => readJSON(KEYS.steps, {}))

  useEffect(() => {
    writeJSON(KEYS.steps, stepMap)
  }, [stepMap])

  const toggleStep = (key) =>
    setStepMap((m) => {
      const next = { ...m }
      if (next[key]) delete next[key]
      else next[key] = new Date().toISOString()
      return next
    })

  return { stepMap, toggleStep }
}
