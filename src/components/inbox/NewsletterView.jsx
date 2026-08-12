import { useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { getIssue } from '../../data/newsletters'
import { getTask } from '../../data/tasks'
import { KEYS, readJSON, writeJSON } from '../../lib/storage'
import { SECTION_HEADINGS, DROPPED_CLARIFIER } from '../../lib/urgency'
import { useTaskProgress } from '../../hooks/useTaskProgress'
import NewsletterTaskRow from './NewsletterTaskRow'
import ChangeBadge from './ChangeBadge'

function SectionHeading({ children }) {
  return (
    <h2 className="mt-6 mb-1 border-b border-gray-200 pb-1.5 text-sm font-bold tracking-wider text-ubc-blue uppercase">
      {children}
    </h2>
  )
}

export default function NewsletterView() {
  const { issueId } = useParams()
  const navigate = useNavigate()
  const issue = getIssue(issueId)
  const { completedMap } = useTaskProgress()

  // Opening the message marks it read (inbox bold state clears)
  useEffect(() => {
    if (!issue) return
    const read = readJSON(KEYS.readIssues, [])
    if (!read.includes(issue.id)) writeJSON(KEYS.readIssues, [...read, issue.id])
  }, [issue])

  if (!issue) {
    return (
      <div className="p-8 text-center text-gray-500">
        Message not found. <Link to="/inbox" className="text-ubc-link underline">Back to inbox</Link>
      </div>
    )
  }

  const hasChanges = issue.changes.length > 0
  const hasDropped = issue.changes.some((c) => c.type === 'dropped')

  return (
    <div>
      {/* Message header bar */}
      <div className="border-b border-gray-200 bg-white px-4 py-3">
        <button
          onClick={() => navigate('/inbox')}
          className="mb-2 flex cursor-pointer items-center gap-1.5 text-sm font-medium text-gray-500 hover:text-gray-800"
        >
          <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path
              fillRule="evenodd"
              d="M12.7 15.7a1 1 0 01-1.4 0l-5-5a1 1 0 010-1.4l5-5a1 1 0 111.4 1.4L8.4 10l4.3 4.3a1 1 0 010 1.4z"
              clipRule="evenodd"
            />
          </svg>
          Back to inbox
        </button>
        <h1 className="text-lg font-bold text-gray-900">{issue.subject}</h1>
        <p className="mt-1 text-sm text-gray-500">
          <span className="font-medium text-gray-700">UBC Arrival Guide</span>{' '}
          &lt;arrival-guide@ubc.ca&gt; · to you@student.ubc.ca · {issue.sentDate}
        </p>
      </div>

      {/* Email body */}
      <div className="px-2 py-6 sm:px-4">
        <div className="mx-auto max-w-[600px] overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
          {/* Masthead */}
          <div className="bg-ubc-blue px-6 py-5 text-white">
            <p className="flex items-baseline gap-2">
              <span className="text-lg font-extrabold tracking-widest">UBC</span>
              <span aria-hidden="true" className="h-4 w-px self-center bg-ubc-sky" />
              <span className="font-medium tracking-wide">Arrival Guide</span>
            </p>
            <p className="mt-1 text-sm text-ubc-pale">
              Issue #{issue.number} · {issue.sentDate}
            </p>
          </div>
          <div className="h-1 bg-ubc-sky" />

          <div className="px-6 py-5">
            <p className="text-sm leading-relaxed text-gray-700">{issue.intro}</p>

            {/* Update issues lead with the delta: tracker link + what changed
                sit above the fold, ordered by urgency (not change type). */}
            {hasChanges && (
              <>
                <p className="mt-4">
                  <Link
                    to="/tracker"
                    className="inline-block rounded-lg bg-ubc-blue px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-ubc-link"
                  >
                    Open your Arrival Tracker →
                  </Link>
                </p>

                <SectionHeading>{SECTION_HEADINGS.changes}</SectionHeading>
                <div className="space-y-3 pt-1">
                  {issue.changes.map(({ type, taskId, note }) => (
                    <div key={taskId} className="flex items-start gap-2.5">
                      <ChangeBadge type={type} />
                      <p
                        className={`text-sm ${type === 'dropped' ? 'text-gray-500' : 'text-gray-700'}`}
                      >
                        <span
                          className={`font-semibold ${type === 'dropped' ? 'line-through' : ''}`}
                        >
                          {getTask(taskId).title}.
                        </span>{' '}
                        {note}
                      </p>
                    </div>
                  ))}
                  {hasDropped && <p className="text-xs text-gray-400">{DROPPED_CLARIFIER}</p>}
                </div>
              </>
            )}

            <SectionHeading>{SECTION_HEADINGS.urgent}</SectionHeading>
            <div className="divide-y divide-gray-100">
              {issue.sections.urgent.map((id, i) => (
                <NewsletterTaskRow
                  key={id}
                  task={getTask(id)}
                  index={i}
                  done={Boolean(completedMap[id])}
                />
              ))}
            </div>

            <SectionHeading>{SECTION_HEADINGS.comingUp}</SectionHeading>
            <div className="divide-y divide-gray-100">
              {issue.sections.comingUp.map((id) => (
                <NewsletterTaskRow key={id} task={getTask(id)} done={Boolean(completedMap[id])} />
              ))}
            </div>

            {/* CTA — the study path from newsletter into the tracker */}
            <div className="mt-7 rounded-lg bg-ubc-mist px-5 py-5 text-center">
              <p className="text-sm font-medium text-gray-700">
                Full steps, peer notes, and live updates for every task:
              </p>
              <Link
                to="/tracker"
                className="mt-3 inline-block rounded-lg bg-ubc-blue px-6 py-3 font-semibold text-white transition-colors hover:bg-ubc-link"
              >
                Open your Arrival Tracker →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
