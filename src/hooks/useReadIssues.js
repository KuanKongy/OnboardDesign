import { useCallback, useEffect, useState } from 'react'
import { KEYS, readJSON, writeJSON } from '../lib/storage'

/**
 * Which newsletter issues have been opened. Owned by InboxShell and shared
 * with the inbox pages via outlet context so the sidebar's unread badge and
 * the list's bold state update the moment a message is opened. Persisted to
 * localStorage so it survives refresh mid-study.
 */
export function useReadIssues() {
  const [readIssues, setReadIssues] = useState(() => readJSON(KEYS.readIssues, []))

  useEffect(() => {
    writeJSON(KEYS.readIssues, readIssues)
  }, [readIssues])

  const markRead = useCallback(
    (id) => setReadIssues((cur) => (cur.includes(id) ? cur : [...cur, id])),
    []
  )

  return { readIssues, markRead }
}
