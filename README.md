# UBC Arrival Guide

**Live site:** <https://onboard-design.vercel.app>

## About This Project

This is a CPSC 344 (Introduction to HCI) design study investigating **information access for newly arrived international students at UBC**. The core problem: arrival tasks are time-sensitive and unfamiliar, but the information needed to complete them is scattered across UBC webpages, government sites, emails, and informal peer sources. Students don't know what to do first, can't find trustworthy step-by-step guidance in one place, and risk exposing themselves publicly when seeking peer advice.

The prototype is a two-component system — a **weekly email newsletter** paired with an **interactive arrival task tracker** — evaluated through a 10-participant usability study with think-aloud walkthroughs and Likert questionnaires.

**Read the full final report:** [`doc/milestone-4-final-report.md`](doc/milestone-4-final-report.md)

## The Design

- **Arrival Tracker (website)** — the source of truth. Prioritized arrival tasks with consolidated step-by-step instructions, verified peer notes, completion tracking, and an anonymous Q&A entry point.
- **Email newsletter** — generated *from* the tracker's data. A periodic digest of the current truth: what's urgent now, what changed, what's no longer needed, linking back into the tracker.

### Design Requirements

| Req | Name | Description |
|---|---|---|
| R1 | Self-Sufficiency | Complete a task without leaving the design |
| R2 | Prioritization | Know what to do first |
| R3 | Confidence | Trust the information enough to act on it |
| R4 | Low Exposure | Reach peer advice without being publicly identified |

### Key Findings (10-participant usability study)

- **Confidence was high** (4.5/5), driven by UBC branding and peer-verified quotes
- **Priority identification was harder** — only 4/10 participants identified the most urgent task unprompted
- **Newsletter-to-tracker handoff broke** for 4/10 participants (link buried too far down)
- **Q&A discoverability** — almost half of participants missed the anonymous Q&A button initially
- **AI-written text stood out** as a trust concern because the rest was deliberately rough

## Run it

```bash
npm install
npm run dev
```

| URL | View |
| --- | --- |
| `/#/tracker` | Arrival Tracker (default page) |
| `/#/inbox` | Simulated email inbox with both newsletter issues |
| `/#/inbox/week-1`, `/#/inbox/week-2` | Individual issues |
| `/#/ask` | Anonymous Q&A board |
| `/#/tracker?reset=1` | **Researcher-only:** clears all participant state between sessions |

## Main Interaction Flow

Inbox → open Week 1 issue → top task is #1 in the "Do these now" list → "Open your Arrival Tracker" → tracker shows the same priorities → expand a task → follow steps → check off → toast names the next priority and the progress bar advances → "Ask a question anonymously" from the task card (or header) → Q&A board. Week 2's issue then demonstrates the update mechanism: promoted, new, and dropped tasks, with tasks the user already completed struck through.

## Functional vs. Simulated vs. Out of Scope

| Part | Status | Notes |
| --- | --- | --- |
| Task priority ordering, grouping, filters | **Functional** | Driven by `src/data/tasks.js` |
| Task expansion with steps, peer note, source/date | **Functional** | All content in place per task |
| Completion checkboxes, progress bar, next-up cue | **Functional** | State persists via localStorage |
| Newsletter issues (in-app) reflecting live completion state | **Functional** | Reads the same stored state as the tracker |
| Email delivery | **Simplified** | Issues are rendered to real Gmail-safe HTML (`npm run build:email`) and sent manually |
| Inbox chrome (sidebar, search, compose) | **Simulated** | Static frame so the newsletter is read in a realistic context |
| Anonymous Q&A board | **Wizard-of-Oz** | Pre-written verified answers; posting shows confirmation but stores nothing |
| Peer notes | **Simplified** | Realistic filler quotes; no real submission/verification pipeline |
| Accounts, backend, notifications, content management | **Out of scope** | A real system would personalize sent emails server-side |

## Sending the Newsletter as a Real Email

`npm run build:email` renders each issue from the same data modules as the site into `email-export/`:

- `week-1.html` / `week-2.html` — table-based, inline-styled HTML. Open in a browser, Select All → Copy → paste into a Gmail compose window (formatting carries over), add the subject line, send.
- `week-1.txt` / `week-2.txt` — plain-text versions with the subject line at the top, for copy-paste anywhere.

The CTA link points to the live site (`https://onboard-design.vercel.app/#/tracker`) by default. If the deployed URL ever changes, regenerate with:

```bash
TRACKER_URL="https://your-site.example/#/tracker" npm run build:email
```

## Where Things Live

- `src/data/tasks.js` — **single source of truth**: the 8 arrival tasks; edit here and the tracker, in-app newsletter, and exported emails all update
- `src/data/newsletters.js` — issue definitions: ordered task ids + added/updated/dropped annotations
- `src/data/qaPosts.js` — Q&A board content
- `src/components/tracker|inbox|ask|layout/` — views
- `scripts/build-email.mjs` — email HTML/text generator (imports the data modules directly; keep them free of JSX/app imports)
- `doc/milestone-4-final-report.md` — the full CPSC 344 Milestone 4 final report
- `public/` — brand assets. `favicon.svg` is a paper plane (the newsletter) pointing north, with a column of tracker circles beside it (one open "next" step above two done ones); `favicon-32.png` and `apple-touch-icon.png` are PNG renders of it. `og-image.svg` is the source for `og-image.png`, the social preview (most platforms don't accept SVG), so re-render the PNG at 1200×630 after editing the SVG. Icons are linked with `./` paths so each deploy (localhost, a GitHub Pages subpath, Vercel) shows this repo's own icon.
- `design/` — earlier brand versions kept for reference (not shipped), e.g. the horizontal paper-plane favicon, the larger north-pointing plane (`favicon-north-plane.svg`), and the A-sized plane with the paler right wing (`favicon-a-sized-plane.svg`).

## How to Edit Things

**Task content** (titles, summaries, steps, peer notes, sources, urgency): edit the task's object in `src/data/tasks.js`. The tracker updates instantly under `npm run dev`; re-run `npm run build:email` to refresh the email files. Priority order = `urgencyRank` (1 is first); which group a task sits in = `urgency` (`'urgent'` → "Do this week", `'soon'`/`'later'` → "Coming up").

**Newsletter content** (subject, intro, which tasks appear and in what order, what's new/updated/dropped): edit `src/data/newsletters.js`. `sections.urgent` and `sections.comingUp` are arrays of task ids — the array order is the delivered priority order. `changes.added/updated/dropped` drive the "What changed" section in issue 2. Task titles/summaries are never written here; they're pulled from `tasks.js` by id.

**Email look & feel** (colors, spacing, layout of the sent email): edit the template strings in `scripts/build-email.mjs`, then re-run `npm run build:email`.

**Tracker / inbox look & feel**: edit the components in `src/components/tracker/` and `src/components/inbox/` (Tailwind classes inline). Palette tokens live in `src/index.css` under `@theme`.

**Q&A board posts**: edit `src/data/qaPosts.js`.
