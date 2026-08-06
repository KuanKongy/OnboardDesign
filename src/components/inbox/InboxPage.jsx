import { useNavigate } from 'react-router-dom'
import { ISSUES } from '../../data/newsletters'
import { KEYS, readJSON } from '../../lib/storage'

export default function InboxPage() {
  const navigate = useNavigate()
  const readIssues = readJSON(KEYS.readIssues, [])

  // Newest first, like a real inbox
  const messages = [...ISSUES].reverse()

  return (
    <div>
      <ul className="divide-y divide-gray-200 bg-white">
        {messages.map((issue) => {
          const unread = !readIssues.includes(issue.id)
          return (
            <li key={issue.id}>
              <button
                onClick={() => navigate(`/inbox/${issue.id}`)}
                className="flex w-full cursor-pointer items-baseline gap-3 px-4 py-3.5 text-left transition-colors hover:bg-ubc-mist/60"
              >
                {unread && (
                  <span
                    className="h-2 w-2 shrink-0 translate-y-[-1px] self-center rounded-full bg-ubc-link"
                    aria-label="Unread"
                  />
                )}
                <span
                  className={`w-36 shrink-0 truncate text-sm ${
                    unread ? 'font-bold text-gray-900' : 'text-gray-600'
                  }`}
                >
                  UBC Arrival Guide
                </span>
                <span className="min-w-0 flex-1 truncate text-sm">
                  <span className={unread ? 'font-bold text-gray-900' : 'text-gray-700'}>
                    {issue.subject}
                  </span>
                  <span className="ml-2 hidden text-gray-400 sm:inline">— {issue.preheader}</span>
                </span>
                <span
                  className={`shrink-0 text-xs ${
                    unread ? 'font-bold text-gray-900' : 'text-gray-400'
                  }`}
                >
                  {issue.sentDateShort}
                </span>
              </button>
            </li>
          )
        })}
      </ul>
      <p className="px-4 py-3 text-center text-xs text-gray-400">
        No more mail — you're all caught up.
      </p>
    </div>
  )
}
