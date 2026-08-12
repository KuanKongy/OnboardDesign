import { useEffect, useState } from 'react'
import { KEYS, readJSON, writeJSON } from '../lib/storage'

/**
 * The demo's "canon time": which moment of the arrival timeline the
 * prototype is showing. 'week-1' = just landed (fresh/reset default, only
 * the first issue has arrived); 'week-2' = the second issue has arrived and
 * priorities have shifted. Persisted so it survives navigation and refresh.
 */
export function useCanonTime() {
  const [canonTime, setCanonTime] = useState(() => readJSON(KEYS.canonTime, 'week-1'))

  useEffect(() => {
    writeJSON(KEYS.canonTime, canonTime)
  }, [canonTime])

  return { canonTime, setCanonTime }
}
