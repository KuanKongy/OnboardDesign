import { createContext, useCallback, useContext, useRef, useState } from 'react'

const ToastContext = createContext(null)

export function ToastProvider({ children }) {
  const [toast, setToast] = useState(null) // { message, visible }
  const timerRef = useRef(null)

  const showToast = useCallback((message) => {
    clearTimeout(timerRef.current)
    setToast({ message, visible: true })
    timerRef.current = setTimeout(() => {
      setToast((t) => (t ? { ...t, visible: false } : null))
    }, 3500)
  }, [])

  return (
    <ToastContext.Provider value={{ toast, showToast }}>
      {children}
    </ToastContext.Provider>
  )
}

export function useToast() {
  const ctx = useContext(ToastContext)
  if (!ctx) throw new Error('useToast must be used inside ToastProvider')
  return ctx
}
