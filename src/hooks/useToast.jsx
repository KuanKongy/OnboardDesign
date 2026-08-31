import { createContext, useCallback, useContext, useRef, useState } from 'react'

const ToastContext = createContext(null)

export function ToastProvider({ children }) {
  const [toast, setToast] = useState(null) // { message, action?, visible }
  const timerRef = useRef(null)

  // Optional `action`: { label, onClick } — e.g. Undo after completing a task.
  // Toasts with an action stay up a little longer so there is time to click.
  const showToast = useCallback((message, action = null) => {
    clearTimeout(timerRef.current)
    setToast({ message, action, visible: true })
    timerRef.current = setTimeout(
      () => setToast((t) => (t ? { ...t, visible: false } : null)),
      action ? 5000 : 3500
    )
  }, [])

  const dismissToast = useCallback(() => {
    clearTimeout(timerRef.current)
    setToast((t) => (t ? { ...t, visible: false } : null))
  }, [])

  return (
    <ToastContext.Provider value={{ toast, showToast, dismissToast }}>
      {children}
    </ToastContext.Provider>
  )
}

export function useToast() {
  const ctx = useContext(ToastContext)
  if (!ctx) throw new Error('useToast must be used inside ToastProvider')
  return ctx
}
