import { useEffect } from 'react'
import { Outlet, useSearchParams } from 'react-router-dom'
import UbcHeader from './UbcHeader'
import Toast from './Toast'
import ScrollToTop from './ScrollToTop'
import { resetAll } from '../../lib/storage'

export default function PageShell() {
  const [searchParams] = useSearchParams()

  // Invisible researcher affordance: opening /#/tracker?reset=1 clears all
  // participant state between sessions. Nothing in the UI exposes it.
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
      <Toast />
    </div>
  )
}
