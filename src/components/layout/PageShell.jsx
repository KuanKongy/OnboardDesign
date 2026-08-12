import { useEffect } from 'react'
import { Outlet, useSearchParams } from 'react-router-dom'
import UbcHeader from './UbcHeader'
import Toast from './Toast'
import ScrollToTop from './ScrollToTop'
import { resetAll } from '../../lib/storage'

export default function PageShell() {
  const [searchParams] = useSearchParams()

  const handleReset = () => {
    resetAll()
    window.location.hash = '#/tracker'
    window.location.reload()
  }

  // URL affordance kept for convenience: /#/tracker?reset=1 also clears all
  // demo state (same as the footer button).
  useEffect(() => {
    if (searchParams.get('reset') === '1') {
      resetAll()
      window.location.hash = '#/tracker'
      window.location.reload()
    }
  }, [searchParams])

  return (
    <div className="flex min-h-screen flex-col">
      <ScrollToTop />
      <UbcHeader />
      <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-6">
        <Outlet />
      </main>
      <footer className="pb-5 text-center">
        <button
          onClick={handleReset}
          title="Clear all demo data: completed tasks, read mail, and demo time"
          className="cursor-pointer text-xs text-gray-400 underline hover:text-gray-600"
        >
          Demo: Reset all data
        </button>
      </footer>
      <Toast />
    </div>
  )
}
