import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

// Route changes (e.g. newsletter CTA → tracker) should land at the top of
// the new page, not inherit the previous page's scroll position.
export default function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}
