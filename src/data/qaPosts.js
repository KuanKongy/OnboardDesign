// Static Wizard-of-Oz content for the anonymous Q&A board.
// Askers appear only as numbers — the board must contain zero identity cues.

export const QA_POSTS = [
  {
    id: 'qa-1',
    askedBy: 'Student #31',
    date: 'Sep 2',
    taskId: 'study-permit-check',
    question:
      "My study permit says 'may not engage in off-campus employment' but I thought students can work up to 24 hours a week?",
    answer:
      'This comes up a lot — if you are in a full-time degree program you are probably eligible, and that condition may simply be printed in error. Book an International Student Advising appointment; they will confirm your eligibility and help you request a free amendment.',
    answeredBy: 'Peer Mentor',
  },
  {
    id: 'qa-2',
    askedBy: 'Student #27',
    date: 'Sep 1',
    taskId: 'compass-card',
    question: 'Do I need to show ID or my student card to buy a Compass Card?',
    answer:
      'No — you can buy one from any station machine with no ID at all. You only need your CWL login later, when you link the U-Pass to the card online.',
    answeredBy: 'Peer Mentor',
  },
  {
    id: 'qa-3',
    askedBy: 'Student #14',
    date: 'Sep 1',
    taskId: 'bank-account',
    question:
      'Which bank is fastest if my landlord is already asking for rent by e-Transfer?',
    answer:
      'Any of the big five can open a student account same-day if you book the appointment online first. Bring passport + study permit + proof of enrolment, and ask them to enable e-Transfer before you leave the branch — it works immediately.',
    answeredBy: 'Peer Mentor',
  },
  {
    id: 'qa-4',
    askedBy: 'Student #08',
    date: 'Aug 31',
    taskId: null,
    question: 'Is it weird to go to orientation events alone?',
    answer:
      'Honestly, almost everyone is alone in the first week — that is the whole point of the events. The big ones are easier in a group, but the small faculty meetups are actually better for meeting people solo.',
    answeredBy: 'Peer Mentor',
  },
  {
    id: 'qa-5',
    askedBy: 'Student #22',
    date: 'Aug 31',
    taskId: null,
    question: 'How do people afford groceries near campus? Everything is so expensive.',
    answer:
      'Take the 84 or the R4 to No Frills or Superstore — roughly half the price of the on-campus stores. Costco needs a membership, so split one with roommates. The AMS Food Bank also exists for tight months, and nobody judges.',
    answeredBy: 'Peer Mentor',
  },
]
