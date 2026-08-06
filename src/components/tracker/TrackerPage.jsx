import { useRef, useState } from 'react'
import { TASKS } from '../../data/tasks'
import { groupTasks, getNextUp } from '../../lib/urgency'
import { useTaskProgress } from '../../hooks/useTaskProgress'
import { useToast } from '../../hooks/useToast'
import ProgressBar from './ProgressBar'
import FilterTabs from './FilterTabs'
import TaskGroup from './TaskGroup'
import TaskCard from './TaskCard'

export default function TrackerPage() {
  const { completedMap, toggle, doneCount, total, percent } = useTaskProgress()
  const { showToast } = useToast()

  const [filter, setFilter] = useState('all')
  const [expandedId, setExpandedId] = useState(null)
  const [finishingId, setFinishingId] = useState(null)
  const [nextUpId, setNextUpId] = useState(null)
  const timersRef = useRef([])

  const groups = groupTasks(TASKS, completedMap)
  const nextUp = getNextUp(TASKS, completedMap, finishingId)

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
      const next = getNextUp(TASKS, completedMap, task.id)
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
            <span className="text-gray-500">({nextUp.deadlineWindow.toLowerCase()})</span>
          </p>
        )}
      </div>

      <div className="mt-5">
        <FilterTabs active={filter} counts={counts} onChange={setFilter} />
      </div>

      {(filter === 'all' || filter === 'urgent') && (
        <TaskGroup
          title="Do this week"
          count={groups.doNow.length}
          emptyMessage="No urgent tasks left — nice work. Check ‘Coming up’ for what's next."
        >
          {groups.doNow.map((task) => (
            <TaskCard key={task.id} {...cardProps(task)} />
          ))}
        </TaskGroup>
      )}

      {filter === 'all' && (
        <TaskGroup title="Coming up" count={groups.comingUp.length}>
          {groups.comingUp.map((task) => (
            <TaskCard key={task.id} {...cardProps(task)} />
          ))}
        </TaskGroup>
      )}

      {(filter === 'all' || filter === 'done') && (
        <TaskGroup
          title="Done"
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
