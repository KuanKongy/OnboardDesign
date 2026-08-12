// Pure helpers for sorting, grouping and labelling tasks by urgency.
// Imported by scripts/build-email.mjs as well as the React app — keep this
// module dependency-free (no JSX, no app imports) so the Node email script
// can import it directly.

export const URGENCY_META = {
  urgent: { label: 'This week', badgeClass: 'bg-red-50 text-red-700 border-red-200' },
  soon: { label: 'This month', badgeClass: 'bg-amber-50 text-amber-800 border-amber-200' },
  later: { label: 'Later', badgeClass: 'bg-gray-100 text-gray-600 border-gray-200' },
}

// One vocabulary for every surface: the tracker groups, the in-app newsletter
// and the exported emails all read their headings and badge labels from here,
// so the two surfaces can never disagree about what things are called.
export const GROUP_LABELS = {
  doNow: 'Do this week',
  comingUp: 'Coming up',
  done: 'Done',
}

export const SECTION_HEADINGS = {
  urgent: 'Do this week — in this order',
  comingUp: 'Coming up',
  changes: 'What changed this week',
}

export const CHANGE_LABELS = { new: 'New', updated: 'Updated', dropped: 'Off the list' }

export const DROPPED_CLARIFIER =
  "'Off the list' just means we stop reminding you — anything you haven't finished stays in your tracker."

/**
 * Resolve each task's effective urgency/rank for the selected demo moment.
 * 'week-1' uses the baseline fields as written; 'week-2' applies the task's
 * `week2` override so the tracker always agrees with the latest issue.
 */
export function resolveTasks(tasks, canonTime) {
  if (canonTime !== 'week-2') return tasks
  return tasks.map((t) => (t.week2 ? { ...t, ...t.week2 } : t))
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
