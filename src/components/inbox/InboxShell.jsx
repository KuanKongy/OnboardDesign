import { Link, Outlet } from 'react-router-dom'
import Toast from '../layout/Toast'
import ScrollToTop from '../layout/ScrollToTop'
import { getVisibleIssues } from '../../data/newsletters'
import { resetAll } from '../../lib/storage'
import { useCanonTime } from '../../hooks/useCanonTime'

// Deliberately generic email-client chrome (not a Gmail clone) — the reader
// should read this as "my email app", nothing more. The top bar also carries
// the demo controls: which moment of the arrival timeline is showing
// ("canon time"), and a full state reset between demo participants.
export default function InboxShell() {
  const { canonTime, setCanonTime } = useCanonTime()
  const inboxCount = getVisibleIssues(canonTime).length

  const handleReset = () => {
    resetAll()
    window.location.hash = '#/tracker'
    window.location.reload()
  }

  const timeButton = (value, label, title) => (
    <button
      onClick={() => setCanonTime(value)}
      title={title}
      aria-pressed={canonTime === value}
      className={`cursor-pointer rounded-md px-2 py-1 text-xs font-medium transition-colors ${
        canonTime === value ? 'bg-ubc-blue text-white' : 'text-gray-500 hover:bg-gray-100'
      }`}
    >
      {label}
    </button>
  )

  return (
    <div className="flex min-h-screen flex-col bg-gray-100">
      <ScrollToTop />
      <div className="flex items-center gap-3 border-b border-gray-300 bg-white px-4 py-2.5">
        <svg className="h-6 w-6 shrink-0 text-gray-500" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M3 5a2 2 0 00-2 2v10a2 2 0 002 2h18a2 2 0 002-2V7a2 2 0 00-2-2H3zm18 2v.4l-9 5.6-9-5.6V7h18zM3 9.7l8.5 5.3a1 1 0 001 0L21 9.7V17H3V9.7z" />
        </svg>
        <span className="text-lg font-semibold text-gray-700">Mail</span>
        <div className="ml-4 hidden flex-1 items-center rounded-lg bg-gray-100 px-3 py-1.5 text-sm text-gray-400 sm:flex">
          Search mail
        </div>
        <div className="ml-auto flex shrink-0 items-center gap-3">
          <Link
            to="/tracker"
            className="whitespace-nowrap text-sm font-medium text-ubc-link hover:underline"
          >
            ← Back to Arrival Guide
          </Link>
          <div
            role="group"
            aria-label="Demo time"
            className="flex items-center gap-1 rounded-lg border border-gray-200 p-0.5"
          >
            <span className="hidden pl-1.5 text-xs text-gray-400 md:inline">Demo time:</span>
            {timeButton('week-1', 'Week 1', 'Early in week 1 — only the first issue has arrived')}
            {timeButton(
              'week-2',
              'Week 2',
              'Late in week 2 — both issues have arrived and priorities updated'
            )}
          </div>
          <button
            onClick={handleReset}
            title="Clear all demo data: completed tasks, read mail, and demo time"
            className="cursor-pointer text-xs whitespace-nowrap text-gray-400 underline hover:text-gray-600"
          >
            Reset demo
          </button>
        </div>
      </div>
      <div className="flex flex-1">
        <aside className="hidden w-44 shrink-0 border-r border-gray-200 bg-white px-3 py-4 sm:block">
          <div className="mb-4 rounded-full bg-ubc-mist px-4 py-2 text-center text-sm font-medium text-ubc-blue">
            Compose
          </div>
          <nav className="space-y-1 text-sm text-gray-600">
            <div className="flex items-center justify-between rounded-lg bg-gray-100 px-3 py-1.5 font-semibold text-gray-900">
              Inbox <span className="text-xs">{inboxCount}</span>
            </div>
            <div className="px-3 py-1.5">Starred</div>
            <div className="px-3 py-1.5">Sent</div>
            <div className="px-3 py-1.5">Drafts</div>
          </nav>
        </aside>
        <main className="min-w-0 flex-1">
          <Outlet context={{ canonTime }} />
        </main>
      </div>
      <Toast />
    </div>
  )
}
