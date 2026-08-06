import { useEffect, useState } from 'react'
import { KEYS, readJSON, writeJSON } from '../lib/storage'
import { TASKS } from '../data/tasks'

/**
 * Completion state shared by the tracker and the newsletter views,
 * persisted to localStorage so it survives refresh mid-study.
 */
export function useTaskProgress() {
  const [completedMap, setCompletedMap] = useState(() => readJSON(KEYS.completed, {}))

  useEffect(() => {
    writeJSON(KEYS.completed, completedMap)
  }, [completedMap])

  const toggle = (id) =>
    setCompletedMap((m) => {
      const next = { ...m }
      if (next[id]) delete next[id]
      else next[id] = new Date().toISOString()
      return next
    })

  const doneCount = Object.keys(completedMap).length
  const total = TASKS.length

  return {
    completedMap,
    toggle,
    doneCount,
    total,
    percent: total === 0 ? 0 : Math.round((doneCount / total) * 100),
  }
}
