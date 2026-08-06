import { createHashRouter, Navigate, RouterProvider } from 'react-router-dom'
import { ToastProvider } from './hooks/useToast'
import PageShell from './components/layout/PageShell'
import InboxShell from './components/inbox/InboxShell'
import TrackerPage from './components/tracker/TrackerPage'
import AskPage from './components/ask/AskPage'
import InboxPage from './components/inbox/InboxPage'
import NewsletterView from './components/inbox/NewsletterView'

// Hash routing so the email CTA can deep-link (…/#/tracker) and the built
// site works on any static host without server config.
const router = createHashRouter([
  {
    element: <PageShell />,
    children: [
      { path: '/', element: <Navigate to="/tracker" replace /> },
      { path: '/tracker', element: <TrackerPage /> },
      { path: '/ask', element: <AskPage /> },
    ],
  },
  {
    element: <InboxShell />,
    children: [
      { path: '/inbox', element: <InboxPage /> },
      { path: '/inbox/:issueId', element: <NewsletterView /> },
    ],
  },
])

export default function App() {
  return (
    <ToastProvider>
      <RouterProvider router={router} />
    </ToastProvider>
  )
}
