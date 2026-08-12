// Newsletter issues are DERIVED from tasks.js — they reference task ids and
// never duplicate task text. The `changes` block is the update-over-time
// mechanism: an ORDERED array (most urgent first — the delivered order IS the
// priority order, same rule as the task sections).
// Keep this module dependency-free so scripts/build-email.mjs can import it.

/**
 * @typedef {Object} Issue
 * @property {string} id
 * @property {number} number            issue number for display
 * @property {string} subject
 * @property {string} preheader         inbox preview text
 * @property {string} sentDate          display date
 * @property {string} sentDateShort     inbox list date
 * @property {string} intro
 * @property {{urgent: string[], comingUp: string[]}} sections   ordered task ids
 * @property {{type: 'new'|'updated'|'dropped', taskId: string, note: string}[]} changes
 *           ordered by urgency, not by change type
 */

/** @type {Issue[]} */
export const ISSUES = [
  {
    id: 'week-1',
    number: 1,
    subject: 'Your first week at UBC: 5 things, in order',
    preheader: 'Permit check, SIN, bank, phone, Compass — the order saves you backtracking.',
    sentDate: 'Monday, Aug 31, 2026',
    sentDateShort: 'Aug 31',
    intro:
      "Welcome to Vancouver. Your inbox is probably chaos right now, so here's the short list: five things this week, in the order that saves you repeat trips. The permit check goes first because your SIN application and your bank account both need a correct permit. Moving faster than one week? Go ahead — the full list is already in your tracker.",
    sections: {
      urgent: ['study-permit-check', 'sin', 'bank-account', 'phone-plan', 'compass-card'],
      comingUp: ['imed-insurance-check', 'msp-enrollment'],
    },
    changes: [],
  },
  {
    id: 'week-2',
    number: 2,
    subject: 'Week 2: MSP is now urgent — and 2 things are off your list',
    preheader: 'The 3-month MSP wait only starts when you apply. Plus: the campus SIN clinic moved.',
    sentDate: 'Monday, Sep 7, 2026',
    sentDateShort: 'Sep 7',
    intro:
      "One thing matters most this week: apply for MSP if you haven't. The 3-month wait for coverage only starts once you apply. Also, the campus SIN clinic moved. Details below — and your tracker always has the current list.",
    sections: {
      urgent: ['msp-enrollment', 'sin'],
      comingUp: ['bank-account', 'bcid'],
    },
    changes: [
      {
        type: 'updated',
        taskId: 'msp-enrollment',
        note: 'Now urgent. The wait clock does not start until you apply, and the application is 20 minutes online.',
      },
      {
        type: 'updated',
        taskId: 'sin',
        note: 'The campus clinic moved to the Life Building and now runs every Tuesday.',
      },
      {
        type: 'new',
        taskId: 'bcid',
        note: 'No rush — within your first 2 months. Once your MSP application is in, you can get local photo ID and leave your passport at home.',
      },
      {
        type: 'dropped',
        taskId: 'compass-card',
        note: 'Most of you are tapping in already, and your U-Pass now renews monthly on its own.',
      },
      {
        type: 'dropped',
        taskId: 'study-permit-check',
        note: "If you checked it and it was fine, you're done. If you found an error, book International Student Advising now instead of waiting.",
      },
    ],
  },
]

export function getIssue(id) {
  return ISSUES.find((i) => i.id === id)
}

/** Issues that have "arrived" at the demo's canon time (week-1 hides issue 2). */
export function getVisibleIssues(canonTime) {
  return canonTime === 'week-2' ? ISSUES : ISSUES.slice(0, 1)
}
