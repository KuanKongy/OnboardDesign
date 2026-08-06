import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { QA_POSTS } from '../../data/qaPosts'
import { getTask } from '../../data/tasks'
import { useToast } from '../../hooks/useToast'

// Wizard-of-Oz anonymous Q&A board. R4 is binary: there must be NO step
// anywhere on this page that names or identifies the asker. Nothing typed
// here is stored.
export default function AskPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [draft, setDraft] = useState('')
  const { showToast } = useToast()

  const topicTask = getTask(searchParams.get('task'))

  // Posts about the topic the user came from float to the top
  const posts = topicTask
    ? [...QA_POSTS].sort((a, b) => (b.taskId === topicTask.id) - (a.taskId === topicTask.id))
    : QA_POSTS

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!draft.trim()) return
    setDraft('')
    showToast('Posted anonymously ✓  Verified answers usually arrive within 24 hours.')
  }

  return (
    <div>
      <div className="rounded-xl border border-ubc-pale bg-ubc-mist p-4">
        <h1 className="flex items-center gap-2 text-xl font-bold text-ubc-blue">
          <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path
              fillRule="evenodd"
              d="M10 2a4 4 0 00-4 4v2H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-1V6a4 4 0 00-4-4zm2 6V6a2 2 0 10-4 0v2h4z"
              clipRule="evenodd"
            />
          </svg>
          Ask anonymously
        </h1>
        <p className="mt-1 text-sm text-gray-700">
          No account, no name, no email. Questions appear only as a number, and peer mentors
          verify every answer before it is posted.
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
                onClick={() => setSearchParams({})}
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

      <h2 className="mt-6 mb-2 text-xs font-bold tracking-wider text-gray-500 uppercase">
        Recent questions
      </h2>
      <ul className="space-y-3">
        {posts.map((post) => {
          const relatedTask = getTask(post.taskId)
          return (
            <li key={post.id} className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
              <p className="text-xs text-gray-500">
                {post.askedBy} · {post.date}
                {relatedTask && (
                  <span className="ml-2 rounded-full bg-gray-100 px-2 py-0.5 text-[11px] text-gray-600">
                    {relatedTask.title}
                  </span>
                )}
              </p>
              <p className="mt-1.5 font-medium text-gray-900">{post.question}</p>
              <div className="mt-3 rounded-lg bg-gray-50 px-3 py-2.5">
                <p className="text-sm text-gray-700">{post.answer}</p>
                <p className="mt-1.5 flex items-center gap-1 text-xs font-medium text-ubc-link">
                  <svg className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.7-9.3a1 1 0 00-1.4-1.4L9 10.6 7.7 9.3a1 1 0 00-1.4 1.4l2 2a1 1 0 001.4 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Verified answer · {post.answeredBy}
                </p>
              </div>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
