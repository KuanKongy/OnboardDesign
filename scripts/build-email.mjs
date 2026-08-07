// Generates email-safe HTML files (email-export/*.html) from the SAME data
// modules the website renders from — the newsletter never drifts from the
// tracker. Run: npm run build:email
// Override the deployed URL if it changes:
//   TRACKER_URL="https://example.com/#/tracker" npm run build:email

import { mkdirSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { TASKS } from '../src/data/tasks.js'
import { ISSUES } from '../src/data/newsletters.js'

const TRACKER_URL = process.env.TRACKER_URL ?? 'https://onboard-design.vercel.app/#/tracker'

const C = {
  blue: '#002145',
  link: '#0055B7',
  sky: '#40B4E5',
  pale: '#97D4E9',
  mist: '#EAF6FC',
  text: '#1F2937',
  muted: '#6B7280',
  faint: '#9CA3AF',
  border: '#E5E7EB',
  bg: '#F4F5F7',
}
const FONT = 'Arial, Helvetica, sans-serif'

const getTask = (id) => TASKS.find((t) => t.id === id)
const esc = (s) =>
  s.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;')

function urgentRow(id, i) {
  const t = getTask(id)
  return `
    <tr>
      <td width="34" valign="top" style="padding:10px 0;">
        <table role="presentation" cellpadding="0" cellspacing="0"><tr>
          <td width="24" height="24" align="center" bgcolor="${C.blue}" style="border-radius:12px;color:#ffffff;font-family:${FONT};font-size:12px;font-weight:bold;">${i + 1}</td>
        </tr></table>
      </td>
      <td valign="top" style="padding:10px 0;border-bottom:1px solid ${C.border};font-family:${FONT};">
        <span style="font-size:15px;font-weight:bold;color:${C.text};">${esc(t.title)}</span><br>
        <span style="font-size:13px;color:${C.muted};">${esc(t.summary)}</span><br>
        <span style="font-size:12px;color:${C.faint};">${esc(t.deadlineWindow)} &middot; ${esc(t.estimatedTime)}</span>
      </td>
    </tr>`
}

function comingUpRow(id) {
  const t = getTask(id)
  return `
    <tr>
      <td width="34" valign="top" align="center" style="padding:8px 0;font-family:${FONT};font-size:14px;color:${C.sky};">&bull;</td>
      <td valign="top" style="padding:8px 0;border-bottom:1px solid ${C.border};font-family:${FONT};">
        <span style="font-size:14px;font-weight:bold;color:${C.text};">${esc(t.title)}</span><br>
        <span style="font-size:13px;color:${C.muted};">${esc(t.summary)}</span>
      </td>
    </tr>`
}

function badge(label, bg, color) {
  return `<span style="display:inline-block;padding:2px 8px;border-radius:10px;background:${bg};color:${color};font-family:${FONT};font-size:10px;font-weight:bold;text-transform:uppercase;letter-spacing:0.5px;">${label}</span>`
}

function changeRow(kind, taskId, note) {
  const t = getTask(taskId)
  const badges = {
    new: badge('New', '#DCFCE7', '#166534'),
    updated: badge('Updated', '#FEF3C7', '#92400E'),
    dropped: badge('Done with this', '#E5E7EB', '#4B5563'),
  }
  const title =
    kind === 'dropped'
      ? `<span style="text-decoration:line-through;color:${C.muted};font-weight:bold;">${esc(t.title)}.</span>`
      : `<span style="font-weight:bold;color:${C.text};">${esc(t.title)}.</span>`
  return `
    <tr>
      <td width="110" valign="top" style="padding:6px 0;">${badges[kind]}</td>
      <td valign="top" style="padding:6px 0;font-family:${FONT};font-size:13px;color:${kind === 'dropped' ? C.muted : C.text};">
        ${title} ${esc(note)}
      </td>
    </tr>`
}

function sectionHeading(text) {
  return `
    <tr><td style="padding:24px 0 6px 0;border-bottom:1px solid ${C.border};font-family:${FONT};font-size:13px;font-weight:bold;letter-spacing:1px;text-transform:uppercase;color:${C.blue};">${text}</td></tr>`
}

function renderIssue(issue) {
  const { added, updated, dropped } = issue.changes
  const hasChanges = added.length + updated.length + dropped.length > 0

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${esc(issue.subject)}</title>
</head>
<body style="margin:0;padding:0;background-color:${C.bg};">
  <!-- preheader (hidden preview text) -->
  <div style="display:none;max-height:0;overflow:hidden;font-size:1px;color:${C.bg};">${esc(issue.preheader)}</div>
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" bgcolor="${C.bg}">
    <tr><td align="center" style="padding:24px 12px;">
      <table role="presentation" width="600" cellpadding="0" cellspacing="0" bgcolor="#ffffff" style="max-width:600px;width:100%;border:1px solid ${C.border};border-radius:8px;">

        <!-- Masthead -->
        <tr><td bgcolor="${C.blue}" style="padding:22px 28px;border-radius:8px 8px 0 0;">
          <span style="font-family:${FONT};font-size:20px;font-weight:bold;letter-spacing:3px;color:#ffffff;">UBC</span>
          <span style="font-family:${FONT};font-size:16px;color:${C.pale};">&nbsp;|&nbsp;</span>
          <span style="font-family:${FONT};font-size:16px;color:#ffffff;">Arrival Guide</span><br>
          <span style="font-family:${FONT};font-size:13px;color:${C.pale};">Issue #${issue.number} &middot; ${esc(issue.sentDate)}</span>
        </td></tr>
        <tr><td height="4" bgcolor="${C.sky}" style="font-size:0;line-height:0;">&nbsp;</td></tr>

        <tr><td style="padding:22px 28px 28px 28px;">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0">

            <tr><td style="font-family:${FONT};font-size:14px;line-height:1.6;color:${C.text};">${esc(issue.intro)}</td></tr>

            ${sectionHeading('Do these now — in this order')}
            <tr><td>
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                ${issue.sections.urgent.map(urgentRow).join('')}
              </table>
            </td></tr>

            ${sectionHeading('Coming up')}
            <tr><td>
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                ${issue.sections.comingUp.map(comingUpRow).join('')}
              </table>
            </td></tr>

            ${
              hasChanges
                ? `${sectionHeading('What changed since last issue')}
            <tr><td style="padding-top:8px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                ${added.map((c) => changeRow('new', c.taskId, c.note)).join('')}
                ${updated.map((c) => changeRow('updated', c.taskId, c.note)).join('')}
                ${dropped.map((c) => changeRow('dropped', c.taskId, c.reason)).join('')}
              </table>
            </td></tr>`
                : ''
            }

            <!-- CTA -->
            <tr><td style="padding-top:28px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" bgcolor="${C.mist}" style="border-radius:8px;">
                <tr><td align="center" style="padding:22px 28px;">
                  <span style="font-family:${FONT};font-size:14px;color:${C.text};">Full steps, peer notes, and live updates for every task:</span><br><br>
                  <table role="presentation" cellpadding="0" cellspacing="0" align="center"><tr>
                    <td bgcolor="${C.blue}" style="border-radius:8px;">
                      <a href="${TRACKER_URL}" style="display:inline-block;padding:13px 26px;font-family:${FONT};font-size:15px;font-weight:bold;color:#ffffff;text-decoration:none;">Open your Arrival Tracker &rarr;</a>
                    </td>
                  </tr></table>
                </td></tr>
              </table>
            </td></tr>

          </table>
        </td></tr>

      </table>
    </td></tr>
  </table>
</body>
</html>
`
}

// Plain-text version — copy-paste straight into any email client.
function renderIssueText(issue) {
  const lines = []
  lines.push(`Subject: ${issue.subject}`)
  lines.push('')
  lines.push(`UBC Arrival Guide — Issue #${issue.number} · ${issue.sentDate}`)
  lines.push('')
  lines.push(issue.intro)
  lines.push('')
  lines.push('DO THESE NOW — IN THIS ORDER')
  issue.sections.urgent.forEach((id, i) => {
    const t = getTask(id)
    lines.push(`${i + 1}. ${t.title} (${t.deadlineWindow} · ${t.estimatedTime})`)
    lines.push(`   ${t.summary}`)
  })
  lines.push('')
  lines.push('COMING UP')
  issue.sections.comingUp.forEach((id) => {
    const t = getTask(id)
    lines.push(`- ${t.title} (${t.deadlineWindow})`)
  })
  const { added, updated, dropped } = issue.changes
  if (added.length + updated.length + dropped.length > 0) {
    lines.push('')
    lines.push('WHAT CHANGED SINCE LAST ISSUE')
    added.forEach((c) => lines.push(`[NEW] ${getTask(c.taskId).title} — ${c.note}`))
    updated.forEach((c) => lines.push(`[UPDATED] ${getTask(c.taskId).title} — ${c.note}`))
    dropped.forEach((c) => lines.push(`[DONE WITH THIS] ${getTask(c.taskId).title} — ${c.reason}`))
  }
  lines.push('')
  lines.push('Full steps, peer notes, and live updates for every task:')
  lines.push(`Open your Arrival Tracker: ${TRACKER_URL}`)
  lines.push('')
  return lines.join('\n')
}

const outDir = join(dirname(fileURLToPath(import.meta.url)), '..', 'email-export')
mkdirSync(outDir, { recursive: true })

for (const issue of ISSUES) {
  const html = renderIssue(issue)
  writeFileSync(join(outDir, `${issue.id}.html`), html)
  writeFileSync(join(outDir, `${issue.id}.txt`), renderIssueText(issue))
  const kb = (Buffer.byteLength(html) / 1024).toFixed(1)
  console.log(`✓ ${issue.id}.html (${kb} KB) + ${issue.id}.txt — "${issue.subject}"`)
}
console.log(`\nTracker URL used: ${TRACKER_URL}`)
console.log('Set TRACKER_URL env var and re-run if the deployed URL changes.')
