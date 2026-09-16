# CPSC 344 — Project Milestone 4: Final Report + Prototype

**Information Access for International Students at UBC**
Group C-G2: DANAS
Aurora (Xubai) Cheng, Ayush Srihari, Doa Binte Rashid, Dinh Nam Khanh Le, Swapnil Dubey

Version: v1.0
Submission Date: August 13, 2026

---

## Table of Contents

- [Design Decision Log](#design-decision-log)
- [Introduction](#introduction)
- [Conceptual Model Iterations](#conceptual-model-iterations)
- [Prototype Methods and Evaluation](#prototype-methods-and-evaluation)
- [Analysis](#analysis)
- [Visualizations](#visualizations)
- [Recommendations and Process Critique](#recommendations-and-process-critique)

---

## Design Decision Log

| Decision | What changed? | Why did it change? | Evidence or feedback used |
|---|---|---|---|
| Reordered tasks by urgency | Tasks now ordered by dated deadlines ("First 1-2 days") instead of relying on urgency tags | Urgency tags went unnoticed, so the ordering itself now communicates what to do first | Usability study: dated ordering read as urgent, tags were missed; TA feedback |
| Added detail to tasks | Each task gained expanded steps, time estimates, sources, and last-updated dates | Participants left the design to search elsewhere when steps lacked enough detail to act on | Usability study: self-sufficiency scored lowest (Figure 1); participants did outside research |
| Repositioned key information | Details moved into task cards and the anonymous Q&A entry made prominent | Users could not locate key information or the Q&A path where they expected it | Usability study: almost half of participants missed the Q&A button; TA feedback |
| Prototype enhancement | Linking of Email newsletter to the arrival tracker | Participants needed an easy transition from the newsletter overview to more detailed, actionable information in the tracker. | Usability study feedback |

---

## Introduction

Newly arrived international students at UBC need to complete unfamiliar, time-sensitive arrival tasks, but the information needed to do so is scattered across UBC webpages, government websites, emails, and informal peer sources. Our need is to help students understand what to do first, how to complete it, and where to find trustworthy guidance without repeatedly searching across multiple sources or publicly exposing themselves when seeking peer advice.

Our two central tasks are to navigate actionable logistics by following one prioritized path without stitching together multiple sources, and to access relevant peer experience without having to post publicly. These tasks informed four design requirements: R1 Self-Sufficiency, completing a task without leaving the design; R2 Prioritization, knowing what to do first; R3 Confidence, trusting the information enough to act on it; and R4 Low Exposure, reaching peer advice without being publicly identified. R1 and R2 became our primary requirements, while R4 was treated as a binary design constraint.

Our final design is the UBC Arrival Guide, a weekly newsletter email paired with an interactive task tracker. The newsletter provides a small, ordered set of time-sensitive tasks, while the tracker provides detailed steps, progress tracking, source information, peer experiences, and anonymous Q&A on demand. The two components work together: the newsletter reduces initial information overload and establishes priority, while the tracker provides the depth required when a student is ready to act.

---

## Conceptual Model Iterations

### Initial Model: Separate Design Approaches

During Shark Tank, our concepts were initially presented as separate alternatives. DA1, the Interactive Task Tracker, gave students a searchable place to view and complete arrival tasks, while DA2, the Physical Newsletter, provided a curated and ordered overview of information.

Initial conceptual model:
> Student → Newsletter OR Task Tracker → Arrival Information

Shark Tank feedback highlighted that neither approach fully addressed our requirements alone. The newsletter helped reduce information overload and establish priority, but offered limited depth and personalization. The tracker gave students detailed, on-demand guidance but risked presenting too much information at once. Feedback therefore encouraged us to combine the approaches rather than select one.

### Iteration: A Two-Component System

We reframed the two concepts as complementary stages of the same experience. The newsletter became the sequencing and prioritization layer, showing students what required attention that week, while the tracker became the action layer, allowing a student to expand a task, follow detailed steps, view peer experiences, and track completion.

Iterated model:
> Newsletter: What should I do? → Tracker: How do I do it?

Prototyping also introduced trust and peer-support cues into the flow. UBC branding, sources, and dates helped distinguish institutional guidance, while peer notes provided lived experience and anonymous Q&A supported low-exposure access to additional advice.

### Evaluation and Final Model

Evaluation showed that combining the components was not enough; the handoff between them had to be obvious. Four out of ten participants struggled to move from the email to the tracker because the link was positioned too far down. Testing also showed that dated task ordering communicated urgency more effectively than on-screen urgency tags, which often went unnoticed. Anonymous peer access successfully avoided identifying participants, but almost half the participant did not discover the entry point. These findings led us to increase the visibility of the tracker handoff, strengthen task ordering and information visibility, and make the anonymous peer pathway easier to find.

Final conceptual model:
> Prioritized weekly overview → Detailed task guidance → Task completion → Low-exposure peer support

The final model therefore separates orientation from action without separating the experience. The newsletter answers "What should I focus on now?", while the tracker answers "How do I actually do it?" and provides additional peer support when needed.

---

## Prototype Methods and Evaluation

### Research Questions

Each question ties to our M3 design requirements.

- **RQ1:** To what extent can a newly arrived international student identify the highest-priority arrival task and complete it without consulting sources outside the design, across both prototype components? (R1 Self-Sufficiency, R2 Prioritization; Central Task 1)
- **RQ2:** How confident do users feel acting on the information the design presents, and what cues shape that confidence? (R3 Confidence; our 3.4/5 M2 baseline)
- **RQ3:** Can users reach peer advice relevant to a specific arrival task without publicly posting or identifying themselves at either entry point, and does that access feel low-exposure to them? (R4 Low Exposure, our pass/fail constraint; Central Task 2)

### Prototyping Approach

Our prototype is a two-part design: our two Shark Tank concepts merged into one system after feedback that neither met all four requirements alone (see Design Decision Log, Section 2). Part one, from DA2, is a weekly newsletter delivered as an email in a simulated inbox: the prioritization layer ("what should I do now?", R2). Part two, from DA1, is the arrival tracker: the action layer holding steps, sources, peer notes, progress tracking, and anonymous Q&A ("how do I actually do it?", R1, R3, R4). Because the value is the pairing, we evaluated both parts and their handoff as one continuous medium-fidelity flow, deployed at a live URL: RQ1 requires real links, steps, and persistent checkboxes, so staying inside the design is a genuine choice.

### Evaluation Methods and Triangulation

We paired two methods so each question has two independent data sources (Table 1). A think-aloud walkthrough, coded on a structured sheet, captured what participants could do; a Qualtrics questionnaire (5-point Likert plus open responses) and short debrief interview captured confidence, trust, and felt exposure, which observation cannot.

**Table 1: Research questions mapped to data and requirements.**

| RQ | Main data | Supporting data | Requirement |
|---|---|---|---|
| RQ1 | Observed priority picks, outside-source attempts, assists | Likert self-sufficiency, prioritization | R1, R2 |
| RQ2 | Likert confidence, verify-elsewhere; open responses on cues | Observed hesitation, attention to trust cues | R3 |
| RQ3 | Observed pass/fail reaching peer advice unidentified | Likert comfort, debrief comments | R4 |

### Participants

We ran ten one-on-one sessions, two per team member, recruited via class, workshops, and Slack DMs: UBC international students or recent grads who had been through arrival themselves and could judge realism. None was a true first-time arrival, so each role-played one from a scenario handout (limitation flagged in Analysis).

### Procedure and Tasks

Each 30-minute session followed one protocol: introduction and signed consent (3 min); newsletter (7 min), where participants read the week's email, identified the most urgent task, explained how they would start it, and followed its link into the tracker; tracker (10 min): locate a task, open its steps and peer note, check it off, and find where to ask peers a question anonymously; questionnaire and debrief (10 min). Participants thought aloud; the researcher stepped in only after a long stall, logging each nudge as an assist.

### Data Collected

From observation: correct identification of the highest-priority task, completion inside the prototype versus looking elsewhere, navigation errors, hesitation, assists, checkbox and expansion use, and whether the anonymous path was reached without any identifying step. From the questionnaire and debrief: confidence acting on the information, trustworthiness, currency, urge to verify elsewhere, comfort with the peer path, and open responses on cues and desired improvements.

### Changes from the Evaluation Plan

Two changes from Checkpoint B: the newsletter became an on-screen email rather than a printed handout — the handoff is part of RQ1, so the link had to be clickable; email is also the final design's channel. We added the debrief because open follow-ups were needed to trace confidence cues (RQ2). Everything else ran as planned.

### Prototype Fidelity

Fully functional: dated priority ordering ("First 1-2 days") with this-week and coming-up groups, click-to-expand steps, checkboxes whose state persists into a progress bar, and the newsletter-to-tracker link. These must be real because RQ1 measures behavior: an order can only be misread if it exists, and self-sufficiency only fails if leaving is a real option (Design Decision Log). Simulated: the mail client around the newsletter, so the issue arrives realistically without a live email system. Simplified: a single static newsletter issue and team-written peer quotes labeled peer-verified; testing whether a peer voice changes confidence does not need a real community. Wizard-of-Oz: anonymous Q&A opened a static board of pre-written questions and answers; posting and search were unbuilt, since RQ3 needed only discoverability and felt exposure. Out of scope: real email delivery, ongoing content maintenance, real peer content.

Polish went only where the RQs needed it: UBC branding, official links, attribution, and last-updated dates, because every earlier study named institutional identity the top trust cue (R3, RQ2); and realistic task and peer text, because urgency and credibility cannot be judged from placeholders (R2, R3). The rest stayed deliberately rough so polish would not sway participants (TA feedback, Design Decision Log).

### Why This Plan Was Appropriate

The methods match the goals: R1 and R2 are behavioral, so we watched task performance; R3 is subjective, so Likert ratings compared against the M2 baseline; R4 is pass/fail, verified at both entry points. Triangulation (Table 1) keeps any claim from resting on one source. The prototype met its objective: both parts and their handoff were tested end to end, yielding findings on all three questions that drove the final iteration.

---

## Analysis

### RQ1: Priority identification and self-sufficiency

**Claim:** Most participants identified relevant tasks but could not distinguish urgency from the ordering alone; self-sufficiency was hindered by the newsletter-to-tracker handoff feeling unintuitive to some, and inconsistencies in parallel information.

**Evidence:** Likert scale data showed task prioritization and self-sufficiency scored the lowest in the study (Figure 1), with many participants still choosing to do additional research on their own. 4 participants correctly identified the most urgent task without needing to be prompted. The newsletter-to-tracker navigation also created difficulties: 4 participants were unable to navigate to the tracker from the newsletter without a nudge in the right direction.

**Confidence:** Medium. Findings are consistent but limited by Wizard-of-Oz content.

**Limitations:** Participants were not genuine first-time students. These findings motivate Recommendations 1 and 2.

### RQ2: Confidence and trust cues

**Claim:** Users reported high confidence in the information, driven primarily by UBC branding and peer-verified quotes, but a persistent verification-seeking tendency and concerns about AI-generated text indicate that confidence did not fully translate into willingness to act without checking elsewhere.

**Evidence:** Feeling confident to act on the given information averaged 4.5/5, but "before acting on this I would want to check elsewhere" averaged 3/5, indicating some residual distrust. Qualitatively, UBC branding and official links made the steps feel accurate, and peer-verified quotes also felt reassuring. However, internal inconsistency in information and possibility of AI-generated text was flagged as credibility concerns.

**Confidence:** High. Quantitative and qualitative data aligned.

**Limitations:** Long-term confidence in the platform cannot be gauged from one session. These findings motivate Recommendations 3 and 4.

### RQ3: Anonymous peer access

**Claim:** Users found the anonymous Q&A useful and reassuring, but discoverability and lack of a search function was a common barrier.

**Evidence:** Almost half of all participants missed the Q&A button initially. When found, comfort was generally high and qualitatively, users stated that it felt like a more trustworthy version of Reddit. A search feature was the most frequently requested improvement (Figure 2).

**Confidence:** Medium. Trust was high but the entry point and anonymity raised concern.

**Limitations:** All peer content was Wizard-of-Oz; could be inaccurate or unhelpful information in reality. These findings motivate Recommendations 2 and 3.

---

## Visualizations

### Figure 1: Post-Session Likert Scores

Questions about general feelings towards the newsletter and tracker just used.

> *Chart available in the [original report document](https://docs.google.com/document/d/1V6gv_M48JAbPD4u5Qx4krDUh2ClHQBvJkZEbsWAtrkU/edit?tab=t.qq60yfu2m929).*

### Figure 2: Requested Improvements

Most frequently requested improvements, taken from interviews and Qualtrics open responses.

> *Chart available in the [original report document](https://docs.google.com/document/d/1V6gv_M48JAbPD4u5Qx4krDUh2ClHQBvJkZEbsWAtrkU/edit?tab=t.qq60yfu2m929).*

---

## Recommendations and Process Critique

### Design Recommendations

1. **Fix the newsletter-to-tracker link (RQ1).** Four participants could not get from the newsletter to the tracker on their own, because the link sat at the bottom of the email under all the tasks. We later added a second link near the top, but only on issues with a "what changed" section, so the first issue a student receives still has the failing layout. Every issue should have a link near the top, and each task in the email should link to that task in the tracker rather than the home page.

2. **Test the changes we made after the study (RQ1-RQ3).** After testing we changed the deadline badges, added search to the Q&A board, and put an anonymous question link on each task. Each responds to something we saw, but none have been tested. A 15-minute follow-up with 5 participants covering only two steps — reaching the tracker from the newsletter, and finding the Q&A — would show whether they help. Success would be completing both without an assist, against the 4-of-10 and near-half failure rates we recorded.

3. **Work out where the peer content comes from (RQ2, RQ3).** Participants liked the peer notes and called the Q&A a more trustworthy Reddit, but that content was written by our team and nothing sits behind the "verified" label. A real version needs a way for students to submit answers, a rule for who checks them, and moderation. This would also replace the AI-written text participants said felt less credible.

4. **Look into arrival dates before designing further (RQ1, R2).** Our deadlines are written relative to arrival, like "first 1-2 days," but the newsletter goes out on a fixed schedule. A student arriving partway through the cycle gets an order based on someone else's arrival date. Personalizing the send would mean storing an arrival date and completion state against each subscriber. Right now the Q&A is anonymous because nothing is stored server-side at all; once that profile exists, anonymity depends on policy rather than architecture. Before building this we would want to know whether students will supply an arrival date, and whether keeping it in local storage gets us the ordering benefit without the profile.

### Process Critique

Treating the newsletter and tracker as two parts of one process, rather than picking one, was the best decision we made. Keeping most of the interface rough after the TA's feedback mattered more than we expected: because so little was polished, the AI-written text stood out to participants as a trust problem instead of blending in.

Our main mistake was in how we wrote our research questions. We wrote one per design requirement, so although we watched for problems at the newsletter-to-tracker step, we never made it a question in its own right. It had no success criterion and no questionnaire item, so the clearest failure in our study was reported inside RQ1 rather than as a finding of its own. It is probably also part of why prioritization and self-sufficiency scored low (Figure 1), though the newsletter's ordering had its own problem: only 4 participants identified the most urgent task unprompted.

If we kept going, we would test the handoff with paper sketches before building it, write a research question about how the two components connect, and freeze the prototype once testing begins so that later changes get their own round of testing.
