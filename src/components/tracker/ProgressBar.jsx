// Animated progress bar — feedback that completing tasks moves you forward.
export default function ProgressBar({ doneCount, total, percent }) {
  return (
    <div>
      <div className="mb-1.5 flex items-baseline justify-between">
        <span className="text-sm font-semibold text-ubc-blue">Your arrival progress</span>
        <span className="text-sm text-gray-600">
          {doneCount} of {total} done
        </span>
      </div>
      <div
        className="h-2.5 w-full overflow-hidden rounded-full bg-gray-200"
        role="progressbar"
        aria-valuenow={doneCount}
        aria-valuemin={0}
        aria-valuemax={total}
        aria-label={`${doneCount} of ${total} tasks done`}
      >
        <div
          className="h-full rounded-full bg-ubc-sky transition-all duration-500 ease-out"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  )
}
