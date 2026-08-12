// Static Wizard-of-Oz content for the anonymous Q&A board.
// Askers appear only as numbers — the board must contain zero identity cues.
// `pinned: true` posts render in the "Common questions" FAQ section.

export const QA_POSTS = [
  {
    id: 'qa-1',
    askedBy: 'Student #31',
    date: 'Sep 2',
    taskId: 'study-permit-check',
    pinned: true,
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
    pinned: true,
    question:
      'Which bank is fastest if my landlord is already asking for rent by e-Transfer?',
    answer:
      'Any of the big five can open a student account same-day if you book the appointment online first. Bring passport + study permit + proof of enrolment, and ask them to enable e-Transfer before you leave the branch — it works immediately.',
    answeredBy: 'Peer Mentor',
  },
  {
    id: 'qa-11',
    askedBy: 'Student #17',
    date: 'Sep 3',
    taskId: 'bank-account',
    pinned: true,
    question: 'Which bank is actually the best for international students?',
    answer:
      "They're all decent — the big five offer nearly identical no-fee student accounts, so don't overthink the choice. Focus on the branch closest to where you live or to campus: RBC, TD, and CIBC are all close on campus. Pick the one you can walk to when something goes wrong.",
    answeredBy: 'Peer Mentor',
  },
  {
    id: 'qa-6',
    askedBy: 'Student #19',
    date: 'Sep 3',
    taskId: 'phone-plan',
    pinned: true,
    question:
      'Are the cheap carriers actually fine here, or should I pay for Rogers/Telus/Bell?',
    answer:
      'The budget brands run on the big networks — Fido on Rogers, Koodo on Telus — so on campus and around the city you will not notice a difference. The big three only really pay off if you travel to rural BC a lot or want in-store support. Start cheap; you can switch any time.',
    answeredBy: 'Peer Mentor',
  },
  {
    id: 'qa-7',
    askedBy: 'Student #05',
    date: 'Sep 8',
    taskId: 'sin',
    question: 'Where exactly is the campus SIN clinic and what do I need to bring?',
    answer:
      'Life Building (6138 Student Union Blvd), every Tuesday. Bring your passport and your original paper study permit — photos on your phone do not count. Go before 10am; the line builds fast.',
    answeredBy: 'Peer Mentor',
  },
  {
    id: 'qa-8',
    askedBy: 'Student #36',
    date: 'Sep 2',
    taskId: 'imed-insurance-check',
    pinned: true,
    question: 'I already have iMED — why am I also applying for MSP? Do I need both?',
    answer:
      "Yes, both, and that is on purpose. iMED is the temporary bridge that covers your first ~3 months; MSP is BC's permanent plan with a 3-month wait before it starts. Apply for MSP now and iMED covers the gap — the overlap is the design, not a mistake.",
    answeredBy: 'Peer Mentor',
  },
  {
    id: 'qa-9',
    askedBy: 'Student #12',
    date: 'Sep 7',
    taskId: 'msp-enrollment',
    question:
      "MSP asks for a BC address but I'm still in temporary housing — what do I put?",
    answer:
      'Use wherever you are sleeping right now — a residence address counts, and you can update it online later. Do not let the address question stall your application; the wait clock is the expensive part.',
    answeredBy: 'Peer Mentor',
  },
  {
    id: 'qa-10',
    askedBy: 'Student #24',
    date: 'Sep 8',
    taskId: 'bcid',
    question: "Can't I just keep using my passport as ID at bars and venues?",
    answer:
      'You can, until you lose it on a night out — replacing a passport takes weeks and you need it for everything. The BCID run to ICBC Point Grey (3778 W 10th Ave) is about 45 minutes door to door.',
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
