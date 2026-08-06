// SINGLE SOURCE OF TRUTH for arrival tasks.
// The tracker, the in-app newsletter views, and scripts/build-email.mjs all
// render from this module. Keep it dependency-free (no JSX, no app imports)
// so the Node email script can import it directly.

/**
 * @typedef {Object} Task
 * @property {string} id
 * @property {string} title
 * @property {string} summary            one-liner used in newsletter rows
 * @property {'urgent'|'soon'|'later'} urgency   current truth shown in the tracker
 * @property {number} urgencyRank        explicit priority tiebreak (1 = do first)
 * @property {string} deadlineWindow     e.g. "First 3 days"
 * @property {number[]} relevantWeeks    which newsletter issues the task appears in
 * @property {string} estimatedTime
 * @property {{text: string, detail?: string, link?: {label: string, url: string}}[]} steps
 * @property {{quote: string, author: string, program: string, verifiedDate: string}} peerNote
 * @property {{name: string, url: string, lastUpdated: string}} source
 */

/** @type {Task[]} */
export const TASKS = [
  {
    id: 'study-permit-check',
    title: 'Double-check your study permit',
    summary:
      'Make sure the permit you received at the border is correct — errors are much easier to fix now.',
    urgency: 'urgent',
    urgencyRank: 1,
    deadlineWindow: 'First 1–2 days',
    relevantWeeks: [1],
    estimatedTime: '~10 min',
    steps: [
      {
        text: 'Find the paper study permit you were given at the border.',
        detail: 'It is a full-page document, not the visa sticker inside your passport.',
      },
      {
        text: 'Check that your name, date of birth, and passport number match your passport exactly.',
      },
      {
        text: 'Check the expiry date and the conditions printed at the bottom.',
        detail:
          "It should say you may work on/off campus if you're eligible, and list UBC's DLI number (O19330231062).",
      },
      {
        text: 'If anything is wrong, contact International Student Advising right away.',
        detail: 'Corrections are far simpler in your first weeks than months later.',
        link: {
          label: 'Book an ISA appointment',
          url: 'https://students.ubc.ca/about-student-services/international-student-advising',
        },
      },
      {
        text: 'Save a photo of the permit to your phone and to cloud storage.',
      },
    ],
    peerNote: {
      quote:
        "Mine had my birthday wrong and I didn't notice for a month — fixing it meant mailing my permit away for weeks. Check it the day you land, it takes five minutes.",
      author: 'Mateo',
      program: '2nd-year Engineering',
      verifiedDate: 'Aug 2026',
    },
    source: {
      name: 'UBC International Student Guide',
      url: 'https://students.ubc.ca/international-student-guide',
      lastUpdated: 'Aug 12, 2026',
    },
  },
  {
    id: 'compass-card',
    title: 'Get a Compass Card and link your U-Pass',
    summary:
      'Your transit card for buses, SkyTrain and SeaBus — your student U-Pass loads onto it.',
    urgency: 'urgent',
    urgencyRank: 2,
    deadlineWindow: 'First 3 days',
    relevantWeeks: [1],
    estimatedTime: '~30 min + travel',
    steps: [
      {
        text: 'Buy a Compass Card ($6 refundable deposit) at any SkyTrain station machine or London Drugs.',
        detail: 'The machine at the UBC Exchange bus loop works too — pay by card or cash.',
      },
      {
        text: 'Create a Compass account and register your card.',
        detail: 'Registering protects your balance if you lose the card.',
        link: { label: 'compasscard.ca', url: 'https://www.compasscard.ca' },
      },
      {
        text: 'Once you are registered in courses, link your U-Pass using your CWL login.',
        detail:
          'The U-Pass gives you unlimited transit and is already included in your student fees.',
        link: { label: 'upassbc.translink.ca', url: 'https://upassbc.translink.ca' },
      },
      {
        text: 'Load $10–20 of stored value for trips before your U-Pass activates on the 1st of the month.',
      },
      {
        text: 'Tap in when boarding buses; tap in and out at SkyTrain fare gates.',
      },
    ],
    peerNote: {
      quote:
        "I waited a week thinking I needed my student card first — you don't. Buy the Compass Card on day one, then link the U-Pass when it activates. Groceries got so much easier once I could get off campus.",
      author: 'Anh',
      program: '1st-year Arts',
      verifiedDate: 'Aug 2026',
    },
    source: {
      name: 'TransLink — Compass Card',
      url: 'https://www.compasscard.ca',
      lastUpdated: 'Aug 18, 2026',
    },
  },
  {
    id: 'phone-plan',
    title: 'Set up a Canadian phone number',
    summary:
      'A local number is needed for banking, your SIN, deliveries, and almost every sign-up form.',
    urgency: 'urgent',
    urgencyRank: 3,
    deadlineWindow: 'First 3 days',
    relevantWeeks: [1],
    estimatedTime: '~45 min',
    steps: [
      {
        text: 'Decide whether to keep your own phone (bring-your-own-device) or get a new one on a plan.',
      },
      {
        text: 'Compare student and BYOD plans — Fido, Koodo, Freedom and Public Mobile are popular with students.',
        detail:
          'Freedom and Public Mobile are usually cheapest (~$25–35/month); all four have solid coverage on campus.',
      },
      {
        text: 'Visit a carrier store with your passport and study permit.',
        detail:
          'Wesbrook Village has stores near campus. Most carriers accept a passport if you have no Canadian credit history — ask for prepaid if a postpaid plan is refused.',
      },
      {
        text: 'Get a SIM or eSIM and confirm your Canadian number works before leaving the store.',
      },
      {
        text: 'Keep your home SIM active on WhatsApp for family — dual SIM/eSIM makes this easy.',
      },
    ],
    peerNote: {
      quote:
        "Don't sign a two-year contract at the airport kiosk — plans in the city are half the price. I use Public Mobile, $29 for 30GB, and it's been fine everywhere I've needed it.",
      author: 'Zainab',
      program: '3rd-year Sciences',
      verifiedDate: 'Aug 2026',
    },
    source: {
      name: 'UBC International Student Guide',
      url: 'https://students.ubc.ca/international-student-guide',
      lastUpdated: 'Aug 12, 2026',
    },
  },
  {
    id: 'sin',
    title: 'Apply for a Social Insurance Number (SIN)',
    summary:
      'You need a SIN before you can be paid for any job in Canada — it is free and takes one visit.',
    urgency: 'urgent',
    urgencyRank: 4,
    deadlineWindow: 'First 2 weeks',
    relevantWeeks: [1, 2],
    estimatedTime: '~1 hour + travel',
    steps: [
      {
        text: "Check that your study permit says you 'may accept employment' on or off campus.",
        detail:
          "If it doesn't and you believe you're eligible, ask International Student Advising before applying.",
      },
      {
        text: 'Apply online through Service Canada, or go in person for same-day service.',
        link: {
          label: 'Service Canada — SIN',
          url: 'https://www.canada.ca/en/employment-social-development/services/sin.html',
        },
      },
      {
        text: 'For in-person: bring your passport and your original study permit to a Service Canada Centre.',
        detail:
          'The downtown office (Sinclair Centre, 757 W Hastings St) is about 40 minutes from campus by bus.',
      },
      {
        text: 'You receive your 9-digit SIN on paper the same day — no card is mailed.',
      },
      {
        text: 'Never share your SIN by email or text; employers and banks collect it through secure forms.',
      },
    ],
    peerNote: {
      quote:
        "I went at 8:30am right when Service Canada opened and was done in 20 minutes — Fridays are packed. You don't need a job lined up; get it early so you're ready when campus jobs post in September.",
      author: 'Daniel',
      program: '4th-year Kinesiology',
      verifiedDate: 'Aug 2026',
    },
    source: {
      name: 'Service Canada',
      url: 'https://www.canada.ca/en/employment-social-development/services/sin.html',
      lastUpdated: 'Aug 5, 2026',
    },
  },
  {
    id: 'bank-account',
    title: 'Open a Canadian bank account',
    summary:
      'A no-fee student account lets you pay rent, get paid, and stop paying foreign card fees.',
    urgency: 'soon',
    urgencyRank: 5,
    deadlineWindow: 'First 2–3 weeks',
    relevantWeeks: [1, 2],
    estimatedTime: '~1 hour',
    steps: [
      {
        text: 'Pick a bank — RBC, TD, CIBC, Scotiabank and BMO all offer newcomer student accounts with no monthly fee.',
        detail:
          'RBC and TD have branches a short bus ride from campus; several banks table on campus during orientation.',
      },
      {
        text: "Book an appointment online for a 'newcomer / student account' — walk-ins can wait a long time.",
      },
      {
        text: 'Bring your passport, study permit, and proof of enrolment from the SSC.',
        detail: 'Some banks also want a local address — a residence contract works.',
      },
      {
        text: 'Set up your debit card, online banking, and Interac e-Transfer at the appointment.',
        detail:
          'e-Transfer is how roommates, landlords, and buy-and-sell payments work in Canada.',
      },
      {
        text: 'Ask about a student or secured credit card to start building Canadian credit history.',
      },
    ],
    peerNote: {
      quote:
        'Ask them to waive the international transfer fee for your first tuition payment — mine did when I asked, and it saved me $45. And set up e-Transfer immediately; everyone here splits bills with it.',
      author: 'Priya',
      program: '2nd-year Commerce',
      verifiedDate: 'Aug 2026',
    },
    source: {
      name: 'UBC International Student Guide',
      url: 'https://students.ubc.ca/international-student-guide',
      lastUpdated: 'Aug 12, 2026',
    },
  },
  {
    id: 'imed-insurance-check',
    title: 'Confirm your iMED temporary health coverage',
    summary:
      'You are auto-enrolled in iMED for your first ~3 months — make sure you can show proof at a clinic.',
    urgency: 'soon',
    urgencyRank: 6,
    deadlineWindow: 'First 2 weeks',
    relevantWeeks: [1],
    estimatedTime: '~15 min',
    steps: [
      {
        text: 'iMED covers new international students while you wait for BC MSP — enrolment happens automatically with your tuition.',
      },
      {
        text: 'Download your iMED proof-of-coverage card.',
        detail: 'Log in with your student number and save the PDF to your phone.',
        link: { label: 'guard.me/ubc', url: 'https://www.guard.me/ubc' },
      },
      {
        text: 'Read what is covered before you need it — doctor visits and emergencies yes; dental and routine eye exams no.',
      },
      {
        text: 'If you need care, UBC Student Health Service and the campus urgent care clinic both accept iMED.',
      },
    ],
    peerNote: {
      quote:
        'I sprained my ankle in week two and had no idea what insurance I had. Urgent care sorted it under iMED with zero paperwork because I had the card saved on my phone. Download it before you need it.',
      author: 'Louis',
      program: '1st-year Forestry',
      verifiedDate: 'Aug 2026',
    },
    source: {
      name: 'UBC International Student Guide — iMED',
      url: 'https://students.ubc.ca/health/health-insurance',
      lastUpdated: 'Aug 12, 2026',
    },
  },
  {
    id: 'msp-enrollment',
    title: 'Apply for BC MSP health insurance',
    summary:
      "BC's public health plan. Apply in your first week — coverage only starts after a ~3-month wait.",
    urgency: 'soon',
    urgencyRank: 7,
    deadlineWindow: 'Apply in month 1',
    relevantWeeks: [1, 2],
    estimatedTime: '~30 min',
    steps: [
      {
        text: 'Apply online as soon as you have a BC address — the wait period runs from arrival, but processing takes weeks.',
        link: {
          label: 'Apply for MSP (gov.bc.ca)',
          url: 'https://www2.gov.bc.ca/gov/content/health/health-drug-coverage/msp/bc-residents/eligibility-and-enrolment/how-to-enrol',
        },
      },
      {
        text: 'Have photos of your passport, study permit, and proof of your BC address ready to upload.',
      },
      {
        text: 'The international student health fee ($75/month) is billed to your student account automatically once MSP starts.',
      },
      {
        text: 'You will get a BC Services Card in the mail when approved — that is your proof of MSP coverage.',
      },
      {
        text: "iMED covers you during the wait, so don't panic — but don't delay applying either.",
      },
    ],
    peerNote: {
      quote:
        'I forgot about MSP until reading week and then had a month with no coverage after iMED ended. The application is 20 minutes online — do it while you are standing in a first-week lineup for something else.',
      author: 'Sofia',
      program: '2nd-year Arts',
      verifiedDate: 'Aug 2026',
    },
    source: {
      name: 'Government of BC — MSP',
      url: 'https://www2.gov.bc.ca/gov/content/health/health-drug-coverage/msp',
      lastUpdated: 'Jul 29, 2026',
    },
  },
  {
    id: 'bcid',
    title: 'Get a BC Services Card or BCID (photo ID)',
    summary: 'Local photo ID means you can leave your passport safely at home.',
    urgency: 'later',
    urgencyRank: 8,
    deadlineWindow: 'First 2 months',
    relevantWeeks: [2],
    estimatedTime: '~45 min + travel',
    steps: [
      {
        text: 'Once your MSP application is in, you can get a BC Services Card with photo — it doubles as your health card and ID.',
      },
      {
        text: 'Walk in or book at an ICBC driver licensing office with your passport and study permit.',
        detail: 'Closest to campus: Point Grey (3778 W 10th Ave).',
        link: {
          label: 'ICBC — get photo ID',
          url: 'https://www.icbc.com/driver-licensing/getting-licensed/Pages/Get-a-BCID.aspx',
        },
      },
      {
        text: 'If you drive: your home licence works for up to 90 days, then you must switch to a BC licence.',
      },
      {
        text: 'The card arrives by mail in 2–3 weeks — carry the interim paper meanwhile.',
      },
    ],
    peerNote: {
      quote:
        "Bars and venues here often don't accept foreign ID cards, only passports — and you really don't want to lose your passport on a night out. The BCID was worth the trip to ICBC alone.",
      author: 'Yuki',
      program: '3rd-year Media Studies',
      verifiedDate: 'Aug 2026',
    },
    source: {
      name: 'ICBC — BC Services Card & BCID',
      url: 'https://www.icbc.com',
      lastUpdated: 'Aug 1, 2026',
    },
  },
]

/** Look up a task by id (used by newsletter views and the email script). */
export function getTask(id) {
  return TASKS.find((t) => t.id === id)
}
