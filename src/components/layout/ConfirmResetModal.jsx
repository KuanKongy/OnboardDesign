import { useEffect, useRef } from 'react'

// In-app replacement for window.confirm on the demo reset — the native dialog
// looks different in every browser (and carries the browser's own chrome),
// which breaks the illusion during demos. This renders the same everywhere.
// Escape or clicking the backdrop cancels; focus starts on Cancel so a stray
// Enter can't wipe the data.
export default function ConfirmResetModal({ open, onConfirm, onCancel }) {
  const cancelRef = useRef(null)
  const confirmRef = useRef(null)

  useEffect(() => {
    if (!open) return
    cancelRef.current?.focus()
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onCancel()
      } else if (e.key === 'Tab') {
        // Two focusable buttons — keep Tab cycling between them
        e.preventDefault()
        const next =
          document.activeElement === cancelRef.current ? confirmRef.current : cancelRef.current
        next?.focus()
      }
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [open, onCancel])

  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4"
      onClick={onCancel}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="reset-modal-title"
        className="w-full max-w-sm rounded-xl bg-white p-5 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 id="reset-modal-title" className="text-base font-semibold text-gray-900">
          Reset all demo data?
        </h2>
        <p className="mt-2 text-sm text-gray-600">
          This clears completed tasks, checked steps, read mail, and the demo time.
        </p>
        <div className="mt-5 flex justify-end gap-2">
          <button
            ref={cancelRef}
            onClick={onCancel}
            className="cursor-pointer rounded-lg border border-gray-300 px-3.5 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            ref={confirmRef}
            onClick={onConfirm}
            className="cursor-pointer rounded-lg bg-red-600 px-3.5 py-2 text-sm font-medium text-white transition-colors hover:bg-red-700"
          >
            Reset data
          </button>
        </div>
      </div>
    </div>
  )
}
