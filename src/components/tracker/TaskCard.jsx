import { Link } from 'react-router-dom'
import { URGENCY_META, OVERDUE_META } from '../../lib/urgency'
import AskIcon from '../layout/AskIcon'
import TaskSteps from './TaskSteps'
import PeerNote from './PeerNote'
import SourceAttribution from './SourceAttribution'

function Checkbox({ checked, animating, label, onToggle }) {
  return (
    <button
      role="checkbox"
      aria-checked={checked}
      aria-label={label}
      onClick={onToggle}
      className={`flex h-6 w-6 shrink-0 cursor-pointer items-center justify-center rounded-md border-2 transition-colors ${
        checked
          ? 'border-ubc-link bg-ubc-link text-white'
          : 'border-gray-300 bg-white hover:border-ubc-link'
      }`}
    >
      {checked && (
        <svg
          className={`h-3.5 w-3.5 ${animating ? 'animate-check-pop' : ''}`}
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
      )}
    </button>
  )
}

export default function TaskCard({
  task,
  isDone,
  isFinishing,
  isExpanded,
  isNextUp,
  completedAt,
  onToggleExpand,
  onToggleDone,
}) {
  const checked = isDone || isFinishing
  const meta = task.overdue ? OVERDUE_META : URGENCY_META[task.urgency]
  const bodyId = `task-body-${task.id}`

  const doneDate = completedAt
    ? new Date(completedAt).toLocaleDateString('en-CA', { month: 'short', day: 'numeric' })
    : null

  return (
    <li
      className={`rounded-xl border border-gray-200 bg-white shadow-sm transition-opacity ${
        isFinishing ? 'opacity-70' : ''
      } ${isNextUp ? 'animate-next-up' : ''}`}
    >
      <div className="flex items-center gap-3 py-3 pr-2 pl-4">
        <Checkbox
          checked={checked}
          animating={isFinishing}
          label={`Mark "${task.title}" as ${checked ? 'not done' : 'done'}`}
          onToggle={() => onToggleDone(task)}
        />
        <button
          onClick={() => onToggleExpand(task.id)}
          aria-expanded={isExpanded}
          aria-controls={bodyId}
          className="flex flex-1 cursor-pointer items-center gap-3 rounded-lg py-0.5 pr-2 text-left hover:bg-gray-50"
        >
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <span
                className={`font-semibold text-gray-900 ${checked ? 'text-gray-400 line-through' : ''}`}
              >
                {task.title}
              </span>
              {!isDone && (
                <span
                  className={`rounded-full border px-2 py-0.5 text-[11px] font-bold tracking-wide uppercase ${meta.badgeClass}`}
                >
                  {task.overdue ? OVERDUE_META.label : task.deadlineWindow}
                </span>
              )}
              {isNextUp && (
                <span className="rounded-full bg-ubc-sky px-2 py-0.5 text-[11px] font-bold tracking-wide text-ubc-blue uppercase">
                  Next up
                </span>
              )}
            </div>
            <p className="mt-0.5 text-sm text-gray-500">
              {isDone
                ? `Done ${doneDate}`
                : task.overdue
                  ? `${task.estimatedTime} · was due: ${task.deadlineWindow.toLowerCase()}`
                  : task.estimatedTime}
            </p>
          </div>
          <svg
            className={`h-5 w-5 shrink-0 text-gray-400 transition-transform duration-300 ${
              isExpanded ? 'rotate-180' : ''
            }`}
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M5.3 7.3a1 1 0 011.4 0L10 10.6l3.3-3.3a1 1 0 111.4 1.4l-4 4a1 1 0 01-1.4 0l-4-4a1 1 0 010-1.4z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>

      {/* Smooth expand/collapse without measuring heights */}
      <div
        id={bodyId}
        className={`grid transition-[grid-template-rows] duration-300 ease-out ${
          isExpanded ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
        }`}
      >
        <div className="overflow-hidden">
          <div className="space-y-4 border-t border-gray-100 px-4 pt-4 pb-4">
            <TaskSteps steps={task.steps} />
            <PeerNote note={task.peerNote} />
            <div className="flex flex-wrap items-center justify-between gap-2 border-t border-gray-100 pt-3">
              <SourceAttribution source={task.source} />
              <Link
                to={`/ask?task=${task.id}`}
                className="inline-flex items-center gap-1.5 text-sm font-medium text-ubc-link hover:underline"
              >
                <AskIcon className="h-4 w-4" />
                Ask a question anonymously
              </Link>
            </div>
          </div>
        </div>
      </div>
    </li>
  )
}
