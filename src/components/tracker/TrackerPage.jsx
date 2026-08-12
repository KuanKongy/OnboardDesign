import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { TASKS } from '../../data/tasks'
import { groupTasks, getNextUp, resolveTasks, GROUP_LABELS } from '../../lib/urgency'
import { useTaskProgress } from '../../hooks/useTaskProgress'
import { useCanonTime } from '../../hooks/useCanonTime'
import { useToast } from '../../hooks/useToast'
import PadlockIcon from '../layout/PadlockIcon'
import ProgressBar from './ProgressBar'
import FilterTabs from './FilterTabs'
import TaskGroup from './TaskGroup'
import TaskCard from './TaskCard'

export default function TrackerPage() {
  const { completedMap, toggle, doneCount, total, percent } = useTaskProgress()
  const { canonTime } = useCanonTime()
  const { showToast } = useToast()

  const [filter, setFilter] = useState('all')
  const [expandedId, setExpandedId] = useState(null)
  const [finishingId, setFinishingId] = useState(null)
  const [nextUpId, setNextUpId] = useState(null)
  const timersRef = useRef([])

  // Effective priorities for the demo's canon time — the tracker always
  // agrees with the latest issue that has "arrived".
  const tasks = resolveTasks(TASKS, canonTime)
  const groups = groupTasks(tasks, completedMap)
  const nextUp = getNextUp(tasks, completedMap, finishingId)

  const handleToggleExpand = (id) => setExpandedId((cur) => (cur === id ? null : id))

  const handleToggleDone = (task) => {
    if (completedMap[task.id]) {
      // Un-completing from the Done group: immediate, no ceremony
      toggle(task.id)
      return
    }
    if (finishingId) return // one completion animation at a time

    // Show the check + strikethrough first, THEN reflow into Done —
    // the result of the action stays visible before the card moves.
    setFinishingId(task.id)
    setExpandedId((cur) => (cur === task.id ? null : cur))
    const t = setTimeout(() => {
      toggle(task.id)
      setFinishingId(null)
      const next = getNextUp(tasks, completedMap, task.id)
      if (next) {
        showToast(`${task.title} — done ✓  Next up: ${next.title}`)
        setNextUpId(next.id)
        const t2 = setTimeout(() => setNextUpId(null), 2300)
        timersRef.current.push(t2)
      } else {
        showToast(`${task.title} — done ✓  That's everything on your list!`)
      }
    }, 550)
    timersRef.current.push(t)
  }

  const counts = {
    all: total,
    urgent: groups.doNow.length,
    done: groups.done.length,
  }

  const cardProps = (task) => ({
    task,
    isDone: Boolean(completedMap[task.id]),
    isFinishing: finishingId === task.id,
    isExpanded: expandedId === task.id,
    isNextUp: nextUpId === task.id,
    completedAt: completedMap[task.id],
    onToggleExpand: handleToggleExpand,
    onToggleDone: handleToggleDone,
  })

  return (
    <div>
      <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
        <h1 className="text-xl font-bold text-ubc-blue">Your arrival tasks</h1>
        <p className="mt-0.5 mb-4 text-sm text-gray-600">
          Everything you need for your first weeks, in priority order — steps, peer notes, and
          sources included.
        </p>
        <ProgressBar doneCount={doneCount} total={total} percent={percent} />
        {nextUp && (
          <p className="mt-3 text-sm text-gray-700">
            <span className="font-semibold text-ubc-blue">Next up:</span> {nextUp.title}{' '}
            <span className="text-gray-500">({nextUp.deadlineWindow})</span>
          </p>
        )}
        <p className="mt-2 text-xs text-gray-400">
          Only you check things off — nothing here is tracked automatically.
        </p>
      </div>

      <div className="mt-5">
        <FilterTabs active={filter} counts={counts} onChange={setFilter} />
      </div>

      <Link
        to="/ask"
        className="mt-4 flex items-center gap-2.5 rounded-xl border border-ubc-pale bg-ubc-mist px-4 py-3 text-sm text-gray-700 transition-colors hover:border-ubc-link"
      >
        <PadlockIcon className="h-4 w-4 shrink-0 text-ubc-link" />
        <span>
          <span className="font-semibold text-ubc-blue">Stuck on something? Ask anonymously</span>{' '}
          — no name, no account, no post history. Ever.
        </span>
      </Link>

      {(filter === 'all' || filter === 'urgent') && (
        <TaskGroup
          title={GROUP_LABELS.doNow}
          count={groups.doNow.length}
          emptyMessage="No urgent tasks left — nice work. Check ‘Coming up’ for what's next."
        >
          {groups.doNow.map((task) => (
            <TaskCard key={task.id} {...cardProps(task)} />
          ))}
        </TaskGroup>
      )}

      {filter === 'all' && (
        <TaskGroup title={GROUP_LABELS.comingUp} count={groups.comingUp.length}>
          {groups.comingUp.map((task) => (
            <TaskCard key={task.id} {...cardProps(task)} />
          ))}
        </TaskGroup>
      )}

      {(filter === 'all' || filter === 'done') && (
        <TaskGroup
          title={GROUP_LABELS.done}
          count={groups.done.length}
          emptyMessage="Nothing checked off yet — tasks you complete will land here."
        >
          {groups.done.map((task) => (
            <TaskCard key={task.id} {...cardProps(task)} />
          ))}
        </TaskGroup>
      )}
    </div>
  )
}
