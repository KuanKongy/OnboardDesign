// Newsletter issues are DERIVED from tasks.js — they reference task ids and
// never duplicate task text. The `changes` block is the update-over-time
// mechanism: what got added, what changed, and what is no longer needed.
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
 * @property {{added: {taskId: string, note: string}[],
 *             updated: {taskId: string, note: string}[],
 *             dropped: {taskId: string, reason: string}[]}} changes
 */

/** @type {Issue[]} */
export const ISSUES = [
  {
    id: 'week-1',
    number: 1,
    subject: 'Your first week at UBC: 4 things to do now',
    preheader: 'Compass Card, phone, SIN — the short list that unlocks everything else.',
    sentDate: 'Monday, Aug 31, 2026',
    sentDateShort: 'Aug 31',
    intro:
      "Welcome to Vancouver! There's a lot of noise in your inbox right now, so here is the only list you need this week. Four tasks unlock almost everything else — do them in this order. Everything below comes straight from your Arrival Tracker, which always has the current version with full steps and peer notes.",
    sections: {
      urgent: ['study-permit-check', 'compass-card', 'phone-plan', 'sin'],
      comingUp: ['imed-insurance-check', 'bank-account', 'msp-enrollment'],
    },
    changes: { added: [], updated: [], dropped: [] },
  },
  {
    id: 'week-2',
    number: 2,
    subject: 'Week 2: MSP is now urgent — and 2 things you can cross off',
    preheader: 'The 3-month MSP wait clock is running. Plus: campus SIN clinic hours changed.',
    sentDate: 'Monday, Sep 7, 2026',
    sentDateShort: 'Sep 7',
    intro:
      'You survived week one. This issue drops what most of you have finished, promotes what is now time-sensitive, and adds one new task. As always, the Tracker has the live version — if this email and the Tracker ever disagree, trust the Tracker.',
    sections: {
      urgent: ['msp-enrollment', 'sin'],
      comingUp: ['bank-account', 'bcid'],
    },
    changes: {
      added: [
        {
          taskId: 'bcid',
          note: 'Now that permits are checked and MSP applications are going in, it is time for local photo ID.',
        },
      ],
      updated: [
        {
          taskId: 'msp-enrollment',
          note: 'Promoted to urgent — your 3-month coverage wait only starts once you apply.',
        },
        {
          taskId: 'sin',
          note: "Service Canada's pop-up campus clinic moved to the Life Building, Tuesdays only.",
        },
      ],
      dropped: [
        {
          taskId: 'compass-card',
          reason: 'Most of you are tapping in already — your U-Pass now auto-renews monthly.',
        },
        {
          taskId: 'study-permit-check',
          reason: "The easy-fix window has passed. If you spotted an error, book ISA now — don't wait for the next issue.",
        },
      ],
    },
  },
]

export function getIssue(id) {
  return ISSUES.find((i) => i.id === id)
}
