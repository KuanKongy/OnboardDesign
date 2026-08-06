// Pure helpers for sorting, grouping and labelling tasks by urgency.

export const URGENCY_META = {
  urgent: { label: 'Urgent', badgeClass: 'bg-red-50 text-red-700 border-red-200' },
  soon: { label: 'This month', badgeClass: 'bg-amber-50 text-amber-800 border-amber-200' },
  later: { label: 'Later', badgeClass: 'bg-gray-100 text-gray-600 border-gray-200' },
}

export function sortByPriority(tasks) {
  return [...tasks].sort((a, b) => a.urgencyRank - b.urgencyRank)
}

/**
 * Group tasks for the tracker: "Do this week" (urgent), "Coming up"
 * (soon + later), and "Done" (completed, most recent first).
 */
export function groupTasks(tasks, completedMap) {
  const sorted = sortByPriority(tasks)
  return {
    doNow: sorted.filter((t) => t.urgency === 'urgent' && !completedMap[t.id]),
    comingUp: sorted.filter((t) => t.urgency !== 'urgent' && !completedMap[t.id]),
    done: sorted
      .filter((t) => completedMap[t.id])
      .sort((a, b) => (completedMap[b.id] > completedMap[a.id] ? 1 : -1)),
  }
}

/** The highest-priority task not yet completed (optionally excluding one id). */
export function getNextUp(tasks, completedMap, excludeId = null) {
  return sortByPriority(tasks).find((t) => !completedMap[t.id] && t.id !== excludeId) ?? null
}
