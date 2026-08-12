import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { QA_POSTS } from '../../data/qaPosts'
import { getTask } from '../../data/tasks'
import { useToast } from '../../hooks/useToast'
import PadlockIcon from '../layout/PadlockIcon'

// Wizard-of-Oz anonymous Q&A board doubling as an FAQ. R4 is binary: there
// must be NO step anywhere on this page that names or identifies the asker.
// Nothing typed here is stored.

// Short chip labels — full task titles are too long for filter chips
const CHIP_LABELS = {
  'study-permit-check': 'Study permit',
  'compass-card': 'Compass Card',
  'phone-plan': 'Phone plan',
  sin: 'SIN',
  'bank-account': 'Banking',
  'imed-insurance-check': 'iMED',
  'msp-enrollment': 'MSP',
  bcid: 'BCID',
}

function VerifiedLine({ answeredBy }) {
  return (
    <p className="mt-1.5 flex items-center gap-1 text-xs font-medium text-ubc-link">
      <svg className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
        <path
          fillRule="evenodd"
          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.7-9.3a1 1 0 00-1.4-1.4L9 10.6 7.7 9.3a1 1 0 00-1.4 1.4l2 2a1 1 0 001.4 0l4-4z"
          clipRule="evenodd"
        />
      </svg>
      Verified answer · {answeredBy}
    </p>
  )
}

export default function AskPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [draft, setDraft] = useState('')
  const [query, setQuery] = useState('')
  const [openId, setOpenId] = useState(null)
  const { showToast } = useToast()

  const topicTask = getTask(searchParams.get('task'))
  const selectTopic = (taskId) => setSearchParams(taskId ? { task: taskId } : {})

  // Topic chips: every task that has at least one post
  const chipTaskIds = [...new Set(QA_POSTS.map((p) => p.taskId).filter(Boolean))]

  const q = query.trim().toLowerCase()
  const matches = (post) => {
    if (topicTask && post.taskId !== topicTask.id) return false
    if (!q) return true
    return post.question.toLowerCase().includes(q) || post.answer.toLowerCase().includes(q)
  }
  const common = QA_POSTS.filter((p) => p.pinned && matches(p))
  const recent = QA_POSTS.filter((p) => !p.pinned && matches(p))

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!draft.trim()) return
    setDraft('')
    showToast('Posted anonymously ✓  Verified answers usually arrive within 24 hours.')
  }

  const chipClass = (active) =>
    `cursor-pointer rounded-full border px-3 py-1 text-xs font-medium transition-colors ${
      active
        ? 'border-ubc-blue bg-ubc-blue text-white'
        : 'border-gray-300 bg-white text-gray-600 hover:border-ubc-link hover:text-ubc-link'
    }`

  return (
    <div>
      <div className="rounded-xl border border-ubc-pale bg-ubc-mist p-4">
        <h1 className="flex items-center gap-2 text-xl font-bold text-ubc-blue">
          <PadlockIcon className="h-5 w-5" />
          Ask anonymously
        </h1>
        <p className="mt-1 text-sm text-gray-700">
          No account, no name, no email. Questions appear only as a number. “Verified” means a
          UBC peer mentor checked the answer against official sources before it went up.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="mt-4 rounded-xl border border-gray-200 bg-white p-4 shadow-sm"
      >
        {topicTask && (
          <p className="mb-2 flex items-center gap-2 text-sm text-gray-600">
            Asking about:
            <span className="inline-flex items-center gap-1.5 rounded-full bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-700">
              {topicTask.title}
              <button
                type="button"
                aria-label="Remove topic"
                onClick={() => selectTopic(null)}
                className="cursor-pointer text-gray-400 hover:text-gray-700"
              >
                ✕
              </button>
            </span>
          </p>
        )}
        <label htmlFor="question" className="sr-only">
          Your question
        </label>
        <textarea
          id="question"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          rows={3}
          placeholder="Ask anything — nothing you type here is linked to you."
          className="w-full resize-y rounded-lg border border-gray-300 px-3 py-2 text-sm placeholder-gray-400 focus:border-ubc-link"
        />
        <div className="mt-2 flex items-center justify-between">
          <span className="text-xs text-gray-400">Posted as an anonymous number</span>
          <button
            type="submit"
            disabled={!draft.trim()}
            className="cursor-pointer rounded-lg bg-ubc-blue px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-ubc-link disabled:cursor-not-allowed disabled:opacity-40"
          >
            Post anonymously
          </button>
        </div>
      </form>

      {/* Find an existing answer before asking: search + topic filter */}
      <div className="mt-6">
        <label htmlFor="qa-search" className="sr-only">
          Search questions
        </label>
        <input
          id="qa-search"
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search questions and answers…"
          className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm placeholder-gray-400 focus:border-ubc-link"
        />
        <div className="mt-2.5 flex flex-wrap items-center gap-1.5">
          <button onClick={() => selectTopic(null)} className={chipClass(!topicTask)}>
            All topics
          </button>
          {chipTaskIds.map((id) => (
            <button
              key={id}
              onClick={() => selectTopic(topicTask?.id === id ? null : id)}
              className={chipClass(topicTask?.id === id)}
            >
              {CHIP_LABELS[id] ?? getTask(id).title}
            </button>
          ))}
        </div>
      </div>

      {common.length > 0 && (
        <>
          <h2 className="mt-6 mb-2 text-xs font-bold tracking-wider text-gray-500 uppercase">
            Common questions
          </h2>
          <ul className="space-y-2">
            {common.map((post) => {
              const open = openId === post.id
              return (
                <li key={post.id} className="rounded-xl border border-gray-200 bg-white shadow-sm">
                  <button
                    onClick={() => setOpenId(open ? null : post.id)}
                    aria-expanded={open}
                    className="flex w-full cursor-pointer items-center justify-between gap-3 px-4 py-3 text-left"
                  >
                    <span className="text-sm font-medium text-gray-900">{post.question}</span>
                    <svg
                      className={`h-4 w-4 shrink-0 text-gray-400 transition-transform duration-200 ${
                        open ? 'rotate-180' : ''
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
                  {open && (
                    <div className="border-t border-gray-100 px-4 py-3">
                      <p className="text-sm text-gray-700">{post.answer}</p>
                      <VerifiedLine answeredBy={post.answeredBy} />
                    </div>
                  )}
                </li>
              )
            })}
          </ul>
        </>
      )}

      <h2 className="mt-6 mb-2 text-xs font-bold tracking-wider text-gray-500 uppercase">
        Recent questions
      </h2>
      {recent.length === 0 ? (
        <p className="rounded-xl border border-gray-200 bg-white p-4 text-sm text-gray-500">
          No questions match — ask yours above and a peer mentor will answer within a day.
        </p>
      ) : (
        <ul className="space-y-3">
          {recent.map((post) => {
            const relatedTask = getTask(post.taskId)
            return (
              <li key={post.id} className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
                <p className="flex flex-wrap items-center gap-2 text-xs text-gray-500">
                  <span className="rounded-full bg-gray-100 px-2 py-0.5 font-medium text-gray-700">
                    {post.askedBy}
                  </span>
                  {post.date}
                  {relatedTask && (
                    <span className="rounded-full bg-gray-100 px-2 py-0.5 text-[11px] text-gray-600">
                      {relatedTask.title}
                    </span>
                  )}
                </p>
                <p className="mt-2 font-medium text-gray-900">{post.question}</p>
                {/* The answer reads as a reply in a thread, not a headline */}
                <div className="mt-3 ml-3 border-l-2 border-ubc-pale pl-3">
                  <p className="text-sm text-gray-700">{post.answer}</p>
                  <VerifiedLine answeredBy={post.answeredBy} />
                </div>
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}
