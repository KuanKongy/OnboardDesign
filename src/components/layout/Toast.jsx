import { useToast } from '../../hooks/useToast'

// Single toast, bottom-center. role="status" so screen readers announce it.
// The wrapper ignores pointer events so it never blocks the page; the visible
// toast itself is interactive so an action (e.g. Undo) can be clicked.
export default function Toast() {
  const { toast, dismissToast } = useToast()

  return (
    <div
      role="status"
      aria-live="polite"
      className={`pointer-events-none fixed inset-x-0 bottom-6 z-50 flex justify-end px-4 transition-all duration-300 ${
        toast?.visible ? 'translate-y-0 opacity-100' : 'translate-y-3 opacity-0'
      }`}
    >
      {toast && (
        <div
          className={`flex max-w-md items-center gap-2.5 rounded-lg bg-gray-900 px-4 py-3 text-sm font-medium text-white shadow-lg ${
            toast.visible ? 'pointer-events-auto' : ''
          }`}
        >
          <svg
            className="h-4 w-4 shrink-0 text-ubc-sky"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M16.7 5.3a1 1 0 010 1.4l-8 8a1 1 0 01-1.4 0l-4-4a1 1 0 111.4-1.4L8 12.6l7.3-7.3a1 1 0 011.4 0z"
              clipRule="evenodd"
            />
          </svg>
          <span>{toast.message}</span>
          {/* Only while visible — the faded-out toast stays mounted for the
              exit transition, and its button must not stay clickable/tabbable */}
          {toast.action && toast.visible && (
            <button
              onClick={() => {
                toast.action.onClick()
                dismissToast()
              }}
              className="shrink-0 cursor-pointer rounded px-2 py-1 font-semibold text-ubc-sky transition-colors hover:bg-white/10"
            >
              {toast.action.label}
            </button>
          )}
        </div>
      )}
    </div>
  )
}
