// Shared check-off control for tasks and their steps. A real <button> with
// role="checkbox" so keyboard and screen-reader behavior match the visuals.
// `children` (e.g. a step number) shows only while unchecked.
const SIZES = {
  task: { box: 'h-6 w-6', check: 'h-3.5 w-3.5' },
  step: { box: 'mt-0.5 h-5 w-5 text-[11px] font-bold', check: 'h-3 w-3' },
}

export default function Checkbox({ checked, animating, label, onToggle, size = 'task', children }) {
  const s = SIZES[size]
  return (
    <button
      role="checkbox"
      aria-checked={checked}
      aria-label={label}
      onClick={onToggle}
      className={`flex ${s.box} shrink-0 cursor-pointer items-center justify-center rounded-md border-2 transition-colors ${
        checked
          ? 'border-ubc-link bg-ubc-link text-white'
          : 'border-gray-300 bg-white text-gray-500 hover:border-ubc-link'
      }`}
    >
      {checked ? (
        <svg
          className={`${s.check} ${animating ? 'animate-check-pop' : ''}`}
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
      ) : (
        children
      )}
    </button>
  )
}
