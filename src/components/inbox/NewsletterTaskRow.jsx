// One task inside a newsletter issue. Delivered order = priority order (R2).
// If the reader already completed the task in the tracker, the row reflects
// it — the newsletter is generated from the same data.
export default function NewsletterTaskRow({ task, index, done }) {
  return (
    <div className="flex gap-3 py-2.5">
      {typeof index === 'number' ? (
        <span
          aria-hidden="true"
          className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-ubc-blue text-xs font-bold text-white"
        >
          {index + 1}
        </span>
      ) : (
        <span aria-hidden="true" className="mt-2 ml-2 h-1.5 w-1.5 shrink-0 rounded-full bg-ubc-sky" />
      )}
      <div className="min-w-0">
        <p className={`font-semibold ${done ? 'text-gray-400 line-through' : 'text-gray-900'}`}>
          {task.title}
          {done && (
            <span className="ml-2 align-middle text-xs font-medium text-green-700 no-underline">
              ✓ already done
            </span>
          )}
        </p>
        {!done && (
          <>
            <p className="mt-0.5 text-sm text-gray-600">{task.summary}</p>
            <p className="mt-0.5 text-xs text-gray-400">
              {task.deadlineWindow} · {task.estimatedTime}
            </p>
          </>
        )}
      </div>
    </div>
  )
}
