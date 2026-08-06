import { Outlet } from 'react-router-dom'
import Toast from '../layout/Toast'
import ScrollToTop from '../layout/ScrollToTop'

// Deliberately generic email-client chrome (not a Gmail clone) — the study
// participant should read this as "my email app", nothing more.
export default function InboxShell() {
  return (
    <div className="flex min-h-screen flex-col bg-gray-100">
      <ScrollToTop />
      <div className="flex items-center gap-3 border-b border-gray-300 bg-white px-4 py-2.5">
        <svg className="h-6 w-6 text-gray-500" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M3 5a2 2 0 00-2 2v10a2 2 0 002 2h18a2 2 0 002-2V7a2 2 0 00-2-2H3zm18 2v.4l-9 5.6-9-5.6V7h18zM3 9.7l8.5 5.3a1 1 0 001 0L21 9.7V17H3V9.7z" />
        </svg>
        <span className="text-lg font-semibold text-gray-700">Mail</span>
        <div className="ml-4 hidden flex-1 items-center rounded-lg bg-gray-100 px-3 py-1.5 text-sm text-gray-400 sm:flex">
          Search mail
        </div>
      </div>
      <div className="flex flex-1">
        <aside className="hidden w-44 shrink-0 border-r border-gray-200 bg-white px-3 py-4 sm:block">
          <div className="mb-4 rounded-full bg-ubc-mist px-4 py-2 text-center text-sm font-medium text-ubc-blue">
            Compose
          </div>
          <nav className="space-y-1 text-sm text-gray-600">
            <div className="flex items-center justify-between rounded-lg bg-gray-100 px-3 py-1.5 font-semibold text-gray-900">
              Inbox <span className="text-xs">2</span>
            </div>
            <div className="px-3 py-1.5">Starred</div>
            <div className="px-3 py-1.5">Sent</div>
            <div className="px-3 py-1.5">Drafts</div>
          </nav>
        </aside>
        <main className="min-w-0 flex-1">
          <Outlet />
        </main>
      </div>
      <Toast />
    </div>
  )
}
