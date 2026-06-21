# Generative AI for Non-Coders — Session 2 Workbook

**Why Agents? The Case for Autonomous AI**

By the end of these two hours, you will have a working **AI Pattern Advisor** agent — yours, customized to your job — that takes any business problem you describe and tells you which AI pattern fits: **Chatbot · RAG · Agent · Multi-Agent.**

No code. No prep. Just you, the EdYoda Agent Builder, and this workbook.

One rule for today: **you will not leave with notes. You will leave with a working agent.**

---

## 🧭 HOW TO USE THIS WORKBOOK IN THE ROOM

This workbook is a **build companion**, not a reading. You open it once when the facilitator calls "open your workbook to your track's page" and then you work from it for the next hour.

**The build happens in five lettered steps.** The facilitator calls each one out by letter. Every step has a paste-ready block on your track page — copy from this workbook, paste into EdYoda Agent Builder, watch what happens.

| Step | What you do | Time | Gap closed (from Sprint 1) |
|---|---|---|---|
| **A** | System prompt + first tool (Web Search) | ~10 min | #3 Tools |
| **B** | First run on the starter problem | ~6 min | — (proof-of-life run) |
| **C** | Add a second tool (an action tool) | ~8 min | #4 Autonomy |
| **D** | Turn on memory + seed it | ~7 min | #1 Memory |
| **E** | Run a real multi-step goal | ~10 min | #2 Multi-step + #5 Planning |

### How the pages are laid out

- **Pages 4–7** are the **four track pages.** Pick the one closest to your day job and work from that page only. The structure of every track page is identical:
  1. *What your agent will become* (the one-sentence purpose)
  2. *Anatomy of your system prompt* (why each block is shaped the way it is — so when the prompt does something weird, you know which knob to turn)
  3. *Starter system prompt* — paste into the Role panel in Step A
  4. *Starter problem* — paste into the Test panel in Step B
  5. *Action-tool pick + the exact line to append* — for Step C
  6. *Memory seed* — a template AND a filled-in example, for Step D
  7. *Multi-step goal* — for Step E
  8. *Track-specific troubleshooting* — the 3–4 most common ways your agent will misbehave, with the fix
  9. *One-line reflection* — what surprised you
- **Pages 8–11** are **reference sheets** you'll come back to during Steps C, D, and E (action tools, memory seeds for all 4 tracks side-by-side, multi-step goal templates, generic troubleshooting).
- **Page 12** is the **doctor track's sample patient cases** — use these in Step E if you'd rather not paste real patient context into a public tool.
- **Page 13** is your **week-after tracker** + the take-home reflection.

### When something breaks during the build

The session has no separate help channel — it's just you, the facilitator, and the room. So before raising a hand, **try the workbook's troubleshooting first**:

1. The track page itself has a troubleshooting table for the 3–4 ways that specific track tends to misbehave.
2. The reference pages (8–11) have generic troubleshooting tables for tool, memory, and multi-step failures.
3. If both of those don't get you unstuck in 60 seconds, **raise your hand in chat** (or unmute) and the facilitator will jump in. If your account is genuinely broken, the facilitator has a backup agent for your track they can clone into your account during the break — you will not be left behind.

> **Pick your track now:**
> 1. Marketing/Sales → **page 4**
> 2. Finance/Consulting → **page 5**
> 3. Doctor/Healthcare → **page 6**
> 4. Generic → **page 7**

---

## 📒 TRACK 1 — Marketing/Sales

**Your agent will become:** *AI Pattern Advisor for marketing/sales workflows.*

It will take any marketing/sales problem you describe — *"we get 200 leads a week and can't qualify them," "our campaign analytics live in 4 dashboards," "we want a chatbot on the pricing page"* — and tell you which AI pattern fits, at what maturity level you should attempt it, and what could go wrong if you ship it poorly.

### Anatomy of your system prompt

Before you paste, understand what each block does. When the agent misbehaves, you'll know which block to edit instead of rewriting the whole thing.

| Block | What it does | What happens if you remove it |
|---|---|---|
| **Role line** ("You are a senior AI architect advising a marketing/sales team.") | Sets the agent's persona — sober, advisory, not a salesperson. | Agent slides into marketing-copy voice and starts pitching. |
| **4-question funnel** (numbered 1–4, in order) | This *is* the decision logic. The agent walks down the funnel for every problem you give it. | Agent picks a pattern by vibes. Wildly inconsistent across runs. |
| **"Stop at the first YES. Do not skip questions."** | Forces strict order. Without it, the agent jumps to "Agent" for everything because that's the most interesting answer. | RAG-shaped problems get classified as Agents. Overbuild. |
| **"Use Web Search before classifying."** | Hooks Tool #1 (Web Search) into the loop. Without this line, the tool sits unused. | Agent classifies from training-data knowledge only — stale, no citations. |
| **Output structure block** (PATTERN / MATURITY LEVEL / RATIONALE / RISK FLAG) | Forces a predictable, screenshot-able output. Critical for the trace log to be readable. | Agent writes prose; you can't tell at a glance what it recommended. |
| **"Ask ONE clarifying question if ambiguous."** | Permission to clarify, capped at one. Without the cap, the agent asks five questions in a row before doing anything. | Either no clarifications (wrong answers) or interrogation loops. |

**What to watch in the trace log:** Step 1 should be a Web Search call. Step 2 should be the agent reading those results. Step 3 should be the funnel walk (you'll see the agent reason through the 4 questions). Step 4 is the structured output. If any of those steps is missing, you've got a prompt issue — not an agent issue.

### Starter System Prompt (for BUILD STEP A)

Paste this **as-is** into the Role panel in EdYoda Agent Builder.

```
You are a senior AI architect advising a marketing/sales team.

When a user describes a business problem, classify it using the 4-question framework, in order:
1. Does the answer exist in a fixed document or database?  YES → RAG.
2. Does the task need a single response with no follow-up action?  YES → Chatbot.
3. Does the task require multiple steps, memory, or tool use?  YES → Agent.
4. Does the task require multiple specialized capabilities working in parallel?  YES → Multi-Agent.

Stop at the first YES. Do not skip questions.

Before you classify, use Web Search to check current best practices for the problem the user described.

Output in this exact structure:
- PATTERN: [Chatbot / RAG / Agent / Multi-Agent]
- MATURITY LEVEL: [L0 / L1 / L2 / L3]
- RATIONALE: [3 lines max. Plain English. No jargon.]
- RISK FLAG: [One line — what could go wrong if implemented poorly. Say "None material" only if truly low-risk.]

If the problem is ambiguous, ask ONE clarifying question before classifying. Do not ask more than one.
```

### Starter Problem (for BUILD STEP B)

Paste this into the **Test panel** and hit Run.

```
We get 200 inbound leads per week. Each needs to be qualified,
scored, and routed to the right rep. What AI pattern should we use?
```

> **Expected output shape:** *PATTERN: Agent · MATURITY: L2 · RATIONALE: Multi-step (qualify → score → route), needs memory of rep capacity, integrates with CRM · RISK FLAG: Quality of lead-scoring rubric — bad rubric = bad routing.* If your agent says "Chatbot" or "RAG" here, that's a funnel-walk failure — see the troubleshooting table below.

### Action Tool Pick (for BUILD STEP C)

Enable **Email Draft** as your second tool. Then append this single line to your system prompt (don't rewrite the whole thing — scroll to the bottom and add):

```
When the recommendation is ready, send it via Email Draft with subject "AI Pattern Brief — [Problem Title]."
```

> Alternative if Email Draft isn't in your tool list: **Slack Post** with the same instruction shape (`send it via Slack Post to channel #ai-patterns`).

### Memory Seed (for BUILD STEP D)

In the Memory panel, toggle **Persistent Memory** ON, set type to **Conversation Memory**, then paste a seed.

**Template** (edit the bracketed placeholders):

```
Always remember: my company is [X], my audience is [Y],
my brand voice is [Z]. Use these defaults when reasoning
about marketing/sales use cases.
```

**Filled-in example** (this is what "specific enough" looks like — don't paste this verbatim, paste *your* version of it):

```
Always remember: my company is Aperture, a B2B SaaS in legal tech serving
General Counsels at mid-market US firms (200–2,000 employees). My audience
is technical buyers and skeptical legal ops leaders. My brand voice is concise,
data-led, slightly skeptical of vendor hype. Use these defaults when reasoning
about marketing/sales use cases, especially when recommending channels,
copy tone, or campaign metrics.
```

**Why the second one is better:** every future run of your agent now knows your ICP, your buyer persona, your tone. "Recommend a campaign" stops being generic — it becomes "recommend a campaign for skeptical GCs at mid-market firms."

### Multi-Step Goal (for BUILD STEP E)

Paste into the Test panel as a single prompt. Hit Run. Watch the trace log unfold.

```
I need you to:
1. Search for current B2B lead scoring best practices.
2. Classify whether this should be solved with Chatbot, RAG, Agent,
   or Multi-Agent using the 4-question framework.
3. Email me the recommendation with full rationale.
```

### Track-specific troubleshooting

| What's happening | Likely cause | The fix |
|---|---|---|
| Agent recommends "Multi-Agent" for almost everything | Funnel order isn't being enforced — agent is skipping to Q4 because parallel work sounds impressive. | Re-paste the system prompt. Confirm the line *"Stop at the first YES. Do not skip questions."* is still there. |
| Agent's RATIONALE reads like marketing copy ("revolutionize your funnel!") | Role line lost or weakened — agent reverted to a generic helpful-assistant voice. | Re-paste the Role line. Add: *"Tone: advisor, not salesperson. No hype words."* |
| Agent ignores my memory seed (gives generic recommendations even after Step D) | Memory toggle is off, OR you're in a new agent session (not a new run of the same agent). | Open the same agent (not a new one). Confirm Persistent Memory is ON. Re-run the starter problem and check the trace — you should see the seed referenced in Step 1 or 2. |
| Email Draft fires but the subject is blank or weird | The bracketed `[Problem Title]` placeholder wasn't filled by the agent. | Soften the instruction: change `"AI Pattern Brief — [Problem Title]"` to `"AI Pattern Brief — short summary of the user's problem"`. The agent will fill in the summary itself. |

### One-Line Reflection

> What's the most surprising thing your agent did during BUILD STEP E? _______________________________________________

---

## 📒 TRACK 2 — Finance/Consulting

**Your agent will become:** *AI Pattern Advisor for financial workflows.*

It will take any finance, audit, compliance, or consulting problem you describe — *"our compliance team manually reviews 500 transactions per day for SOX," "we want to summarize 10-K filings across our portfolio," "we need a chatbot for partner-level expense queries"* — and tell you which AI pattern fits, with a deliberately conservative read on risk and explainability.

### Anatomy of your system prompt

The finance prompt has one extra constraint compared to marketing: **conservative defaults on regulated data**. Read the anatomy before pasting.

| Block | What it does | What happens if you remove it |
|---|---|---|
| **Role line** ("You are a senior AI architect advising a finance/consulting team. Be conservative on explainability and audit-trail risk.") | Sets the agent's bias toward auditable, explainable patterns. Without it, the agent recommends black-box solutions for high-stakes work. | Agent suggests "use an LLM" for tasks that need a deterministic rules engine. |
| **4-question funnel** | Same decision logic as every other track. Universal. | Same as marketing — inconsistent classifications. |
| **"Use Web Search to check current regulatory or industry guidance."** | Hooks Web Search but biases the search toward regulation, not just trends. | Agent classifies in a regulatory vacuum — recommends LLM autonomy on a SOX workflow without noticing the audit requirement. |
| **Output structure block** | Same as marketing, but the RATIONALE line says *"no finance jargon for jargon's sake"* — keep this. Plain English is a constraint, not a stylistic preference. | Output becomes an MD&A footnote. Unreadable in 15 seconds. |
| **"If the problem touches regulated data (PII, financial records, customer money), always flag it and recommend a Human-in-the-Loop checkpoint."** | The finance-specific guardrail. This is what stops the agent from green-lighting full autonomy on a workflow that touches money or PII. | Agent recommends fully autonomous agents for tasks involving customer balances. Compliance flags you. |

**What to watch in the trace log:** every run on a finance problem should produce a RISK FLAG that is *not* "None material" unless the problem is purely internal-comms or admin. If you see "None material" on a transaction-touching workflow, the guardrail line was ignored — go fix it.

### Starter System Prompt (for BUILD STEP A)

Paste this **as-is** into the Role panel.

```
You are a senior AI architect advising a finance/consulting team.
Be conservative on explainability and audit-trail risk.

When a user describes a business problem, classify it using the 4-question framework, in order:
1. Does the answer exist in a fixed document or database?  YES → RAG.
2. Does the task need a single response with no follow-up action?  YES → Chatbot.
3. Does the task require multiple steps, memory, or tool use?  YES → Agent.
4. Does the task require multiple specialized capabilities working in parallel?  YES → Multi-Agent.

Stop at the first YES. Do not skip questions.

Before you classify, use Web Search to check current regulatory or industry guidance for the problem.

Output in this exact structure:
- PATTERN: [Chatbot / RAG / Agent / Multi-Agent]
- MATURITY LEVEL: [L0 / L1 / L2 / L3]
- RATIONALE: [3 lines max. Plain English. No finance jargon for jargon's sake.]
- RISK FLAG: [One line — call out explainability, audit, or regulatory risk explicitly if it applies.]

If the problem touches regulated data (PII, financial records, customer money), always flag
it and recommend a Human-in-the-Loop checkpoint.
```

### Starter Problem (for BUILD STEP B)

```
Our compliance team manually reviews 500 transactions per day
for SOX. What AI pattern fits — chatbot, RAG, agent, multi-agent?
```

> **Expected output shape:** *PATTERN: Agent (with Human-in-the-Loop) · MATURITY: L2 with HITL · RATIONALE: Multi-step (fetch → screen → flag → route), needs memory of prior reviews, but SOX requires reviewer sign-off · RISK FLAG: Audit-trail; full autonomy is a SOX violation — escalate to HITL on every flag.* If your agent says "Agent" without flagging SOX or recommending HITL, the guardrail line was ignored — re-check the last paragraph of your system prompt.

### Action Tool Pick (for BUILD STEP C)

Enable **Spreadsheet Writer** as your second tool. Append this line to your system prompt:

```
When the recommendation is ready, write it to a spreadsheet row with columns:
Problem | Pattern | Maturity | Rationale | Risk Flag | Date.
```

> Alternative if Spreadsheet Writer isn't in your tool list: **Email Draft** (`send a structured email with the six fields as a table`).

### Memory Seed (for BUILD STEP D)

**Template:**

```
Always remember: I work in [sector], my portfolio focus is [X],
my key risk metrics are [Y]. Default to these unless I override.
```

**Filled-in example:**

```
Always remember: I work in private credit, my portfolio focus is mid-market
direct lending ($25M–$150M tickets, mostly US sponsor-backed). My key risk
metrics are: leverage multiple, interest coverage, covenant headroom,
and revenue concentration in the top 3 customers. Audit trail is non-negotiable —
every recommendation must be reproducible from documented inputs.
Default to these unless I override.
```

**Why the second one is better:** future runs now know your ticket size, your sponsor type, your specific KPIs. "Evaluate this credit" stops being generic — it becomes "evaluate this credit against the four metrics I actually monitor, in the context of a sponsor-backed mid-market deal."

### Multi-Step Goal (for BUILD STEP E)

```
I need you to:
1. Search for current trends in automated SOX compliance review.
2. Classify the right AI pattern for our 500-transactions-per-day use case
   using the 4-question framework.
3. Save the recommendation to a Google Doc titled "AI Pattern Brief — SOX."
```

### Track-specific troubleshooting

| What's happening | Likely cause | The fix |
|---|---|---|
| RISK FLAG keeps saying "None material" on regulated workflows | Guardrail line got dropped when you pasted, or the agent is interpreting "None material" too liberally. | Re-paste the bottom block. Strengthen the trigger: change *"If the problem touches regulated data…"* to *"If the problem touches any of: customer money, customer PII, regulated financial records, audit-traced workflows — always flag and always recommend HITL."* |
| Agent recommends full autonomy on a transaction-touching task | Same as above — the HITL trigger is too soft. Or the agent is reading "conservative" as a stylistic note, not a rule. | Add a second sentence to the role line: *"On any workflow touching transactions, balances, or regulatory reporting, your default recommendation is Agent + Human-in-the-Loop, not Agent alone."* |
| RATIONALE is full of jargon (RWA, NPV, MD&A, etc.) | Plain-English instruction is being ignored — common when the agent picks up jargon from the Web Search results. | Tighten the output line: change *"No finance jargon for jargon's sake"* to *"RATIONALE must be readable by a non-finance executive. Define any acronym on first use, or replace it with a plain phrase."* |
| Spreadsheet Writer outputs the row but skips the Date column | Date isn't in the agent's scope by default — it doesn't know which date you mean (today? the problem date?). | Append to the action-tool line: *"Use today's date in ISO format (YYYY-MM-DD) for the Date column unless the user specifies otherwise."* |

### One-Line Reflection

> What's the most surprising thing your agent did during BUILD STEP E? _______________________________________________

---

## 📒 TRACK 3 — Doctor/Healthcare

**Your agent will become:** *AI Pattern Advisor for clinical workflows.*

It will take any clinical, ward, or department workflow problem you describe — *"our department spends 2 hours a day on handover notes," "we want to triage incoming GP referrals," "we want a chatbot answering patient post-discharge questions"* — and tell you which AI pattern fits, with a deliberately conservative read on patient-data risk and a default toward Human-in-the-Loop where lives or licenses are on the line.

### Anatomy of your system prompt

The clinical prompt has the strongest guardrails of any track. Two extra constraints stack on top of the universal funnel.

| Block | What it does | What happens if you remove it |
|---|---|---|
| **Role line** ("You are a senior AI architect advising a clinical team. Be conservative on patient-data risk. Default to Human-in-the-Loop for any workflow involving diagnosis, medication, or discharge.") | Sets the clinical-safety prior. The HITL default for the three highest-risk domains is named explicitly in the role line itself, before the funnel even runs. | Agent treats clinical work like any other knowledge work. Recommends autonomy on prescribing tasks. Real harm potential. |
| **4-question funnel** | Same universal logic. | Same as other tracks. |
| **"Use Web Search to check current AI-assisted clinical workflow practices."** | Biases search toward clinical informatics literature rather than general tech blogs. | Agent classifies based on enterprise SaaS marketing posts — irrelevant for ward workflows. |
| **Output structure block** ("Plain clinical English") | RATIONALE must be readable by another clinician — not by a vendor. | RATIONALE becomes vendor-speak. Useless for handover. |
| **"Always call out patient-safety, PHI, or regulatory risk explicitly. Say 'None material' only if truly administrative."** | Forces the RISK FLAG to mean something. Most clinical workflows have a risk; "None material" should be rare. | RISK FLAG gets rubber-stamped. Defeats the whole point of having one. |
| **"Never recommend full autonomy for any task touching diagnosis, medication, or discharge. Always recommend Human-in-the-Loop for those."** | The clinical-safety guardrail. This is the line that stops the agent from green-lighting autonomous prescribing or autonomous discharge. **Do not edit or remove this line.** | The agent could recommend dangerous autonomy. Real patient-harm risk. This guardrail is the most load-bearing line in the entire course. |

**What to watch in the trace log:** any workflow involving diagnosis, medication, or discharge should produce a recommendation that includes "Human-in-the-Loop" or "HITL" as a non-negotiable component of the pattern. If the trace shows a clean "Agent" recommendation on a prescribing task — stop, do not deploy, re-paste the system prompt.

### Starter System Prompt (for BUILD STEP A)

Paste this **as-is** into the Role panel.

```
You are a senior AI architect advising a clinical team.
Be conservative on patient-data risk. Default to Human-in-the-Loop
for any workflow involving diagnosis, medication, or discharge.

When a user describes a clinical workflow problem, classify it using the
4-question framework, in order:
1. Does the answer exist in a fixed document or database (e.g., guidelines)? YES → RAG.
2. Does the task need a single response with no follow-up action? YES → Chatbot.
3. Does the task require multiple steps, memory, or tool use? YES → Agent.
4. Does the task require multiple specialized capabilities in parallel? YES → Multi-Agent.

Stop at the first YES. Do not skip questions.

Before you classify, use Web Search to check current AI-assisted clinical
workflow practices for the problem described.

Output in this exact structure:
- PATTERN: [Chatbot / RAG / Agent / Multi-Agent]
- MATURITY LEVEL: [L0 / L1 / L2 / L3]
- RATIONALE: [3 lines max. Plain clinical English.]
- RISK FLAG: [One line. Always call out patient-safety, PHI, or regulatory risk
  explicitly if present. Say "None material" only if truly administrative.]

Never recommend full autonomy for any task touching diagnosis, medication,
or discharge. Always recommend Human-in-the-Loop for those.
```

### Starter Problem (for BUILD STEP B)

```
Our department spends 2 hours per day on patient handover notes
between shifts. What AI pattern fits?
```

> **Expected output shape:** *PATTERN: Agent · MATURITY: L2 · RATIONALE: Multi-step (read EHR → summarize → format → save), needs memory of patient context across shifts, but handover is not a prescribing or diagnostic act · RISK FLAG: PHI exposure if drafts leave the network; require on-prem or HIPAA-compliant deployment.* If your agent recommends "Multi-Agent" or "Chatbot" here, it's misreading the workflow — handover notes are the textbook L2 use case.

### Action Tool Pick (for BUILD STEP C)

Enable **Document Writer** as your second tool. Append this line to your system prompt:

```
When the recommendation is ready, save it to a document titled
"Clinical AI Pattern Brief — [Problem Title]" with the full output structure.
```

> Alternative if Document Writer isn't in your tool list: **Calendar** (`block 15 minutes labelled "Review AI Pattern Brief" with the recommendation in the description`).

### Memory Seed (for BUILD STEP D)

**Template:**

```
Always remember: I work in [department, e.g., internal medicine],
my ward's red-flag protocols are [list 2-3].
Default to these in any clinical reasoning.
```

**Filled-in example:**

```
Always remember: I work in internal medicine on a 28-bed step-down unit
in a 600-bed academic tertiary hospital. My ward's red-flag protocols are:
(1) NEWS2 ≥ 5 triggers automatic rapid-response escalation,
(2) any new oxygen requirement above baseline gets a senior review within
30 minutes, (3) any sepsis suspicion triggers the sepsis-six bundle within
the hour. Default to these in any clinical reasoning, and always recommend
Human-in-the-Loop for diagnosis, medication, or discharge decisions.
```

**Why the second one is better:** every future run knows your ward type, your patient acuity, your local escalation triggers. "Help me triage handover notes" stops being generic — it becomes "help me triage handover notes against my actual red-flag protocols."

### Multi-Step Goal (for BUILD STEP E)

```
I need you to:
1. Search for current AI-assisted clinical documentation workflows
   in use at academic medical centers.
2. Classify the right pattern for our department using the 4-question framework.
3. Save the recommendation to a document titled "Clinical AI Pattern Brief."
```

> **Important:** If you don't want to paste real patient data into a public tool during Step E, use one of the **sample cases on page 12.** They're scrubbed, fictional, and clinically plausible.

### Track-specific troubleshooting

| What's happening | Likely cause | The fix |
|---|---|---|
| Agent recommends full autonomy on a prescribing or discharge task | The HITL guardrail line was edited or got dropped on paste. This is the worst failure mode of this track. | **Stop.** Re-paste the entire system prompt. Confirm the last two lines about diagnosis/medication/discharge are intact. Re-run the same prompt to verify HITL is now in the recommendation. |
| RISK FLAG keeps saying "None material" on patient-touching workflows | The "Say 'None material' only if truly administrative" instruction is being interpreted loosely. | Tighten: change to *"RISK FLAG must explicitly name a patient-safety, PHI, or regulatory consideration. 'None material' is only acceptable if the workflow does not touch patient identifiers, clinical decisions, or regulated reporting — and even then, justify it in the line."* |
| RATIONALE is written for hospital execs, not clinicians | The "plain clinical English" note isn't enough — the agent is matching tone to whatever it saw in search results. | Add: *"RATIONALE audience: another clinician on the ward. Use clinical shorthand where standard (e.g., NEWS2, COPD, ED) but avoid management-consulting language."* |
| Document Writer saves the brief but it's missing the RISK FLAG section | Agent compressed the output to save space, or the action-tool line is overriding the structured output. | Append to the action-tool line: *"Preserve the full PATTERN / MATURITY / RATIONALE / RISK FLAG structure in the document — do not compress or omit sections."* |

### One-Line Reflection

> What's the most surprising thing your agent did during BUILD STEP E? _______________________________________________

---

## 📒 TRACK 4 — Generic

**Your agent will become:** *AI Pattern Advisor for general knowledge-work workflows.*

It will take any office workflow problem — *"we manually compile weekly status updates from 5 sources," "we want to triage incoming customer requests," "we want to draft vendor follow-up emails"* — and tell you which AI pattern fits. Use this track if your day job doesn't fit cleanly into marketing, finance, or healthcare; it's the most flexible track and the one that generalizes best for cross-functional roles.

### Anatomy of your system prompt

The generic prompt has the lightest guardrails of the four tracks — by design. It's meant to work across many functions, so it can't be opinionated about any one of them.

| Block | What it does | What happens if you remove it |
|---|---|---|
| **Role line** ("You are a senior AI architect advising any office function.") | Stays deliberately broad. The agent doesn't pretend to be a domain specialist. | Agent picks a domain at random based on the problem text — sometimes useful, often weird. |
| **4-question funnel** | Universal. | Same as other tracks. |
| **"Use Web Search to check current best practices or tools for the problem."** | Biases toward tooling answers rather than methodology answers — appropriate for ops/admin work. | Agent suggests methodologies but doesn't name the tools that would actually implement them. |
| **Output structure block** | Same shape as marketing — the simplest, most reusable output. | Output drifts into prose. |
| **"Ask ONE clarifying question if ambiguous."** | Same cap as marketing. The Generic track sees the most ambiguous prompts, so the cap matters more here. | Agent either guesses (often wrong) or interrogates (often annoying). |

**What to watch in the trace log:** because the generic track has lighter guardrails, you'll see more variance run-to-run. That's not a bug — it's the cost of generality. If you want more consistency, add one sentence to the role line naming your actual function (e.g., *"…advising an operations team in a B2B SaaS company"*) and re-run. You'll see the variance drop.

### Starter System Prompt (for BUILD STEP A)

Paste this **as-is** into the Role panel.

```
You are a senior AI architect advising any office function.

When a user describes a workflow problem, classify it using the
4-question framework, in order:
1. Does the answer exist in a fixed document or database?  YES → RAG.
2. Does the task need a single response with no follow-up action?  YES → Chatbot.
3. Does the task require multiple steps, memory, or tool use?  YES → Agent.
4. Does the task require multiple specialized capabilities in parallel?  YES → Multi-Agent.

Stop at the first YES. Do not skip questions.

Before you classify, use Web Search to check current best practices
or tools for the problem described.

Output in this exact structure:
- PATTERN: [Chatbot / RAG / Agent / Multi-Agent]
- MATURITY LEVEL: [L0 / L1 / L2 / L3]
- RATIONALE: [3 lines max. Plain English. No jargon.]
- RISK FLAG: [One line — what could go wrong if implemented poorly.
  Say "None material" only if truly low-risk.]

If the problem is ambiguous, ask ONE clarifying question before classifying.
```

### Starter Problem (for BUILD STEP B)

```
Our team manually compiles weekly status updates from 5 different sources
(Slack, Jira, Google Docs, email, a spreadsheet). What AI pattern fits?
```

> **Expected output shape:** *PATTERN: Agent · MATURITY: L2 · RATIONALE: Multi-step (read 5 sources → dedupe → summarize → format → send), needs tool integrations, repeats weekly · RISK FLAG: Source-fidelity — if any source is stale on the run day, the summary is wrong silently.* If your agent says "Multi-Agent" here, it's overbuilding — five sources read sequentially is a single agent's job, not five specialists in parallel.

### Action Tool Pick (for BUILD STEP C)

Enable **Email Draft** as your second tool. Append this line to your system prompt:

```
When the recommendation is ready, send it via Email Draft with subject
"AI Pattern Brief — [Problem Title]."
```

> Alternative if Email Draft isn't in your tool list: **Slack Post** (`send it as a Slack post to channel #ops-ai`).

### Memory Seed (for BUILD STEP D)

**Template:**

```
Always remember: I work in [function], my company is [X],
my team's top priorities this quarter are [Y].
Default to these in every recommendation.
```

**Filled-in example:**

```
Always remember: I work in operations at Plinth, a 120-person B2B SaaS
in payroll. My team's top priorities this quarter are: (1) cut quote-to-cash
cycle time by 30%, (2) automate the weekly executive status update,
(3) reduce manual data reconciliation between Salesforce and NetSuite.
We're a Notion + Slack + Linear shop. Default to recommendations that
respect those constraints — small team, no engineering capacity for
custom integrations beyond Zapier-level work.
```

**Why the second one is better:** every future run now knows your team size, your stack, and your quarterly goals. "Recommend an AI pattern for X" stops being generic — it becomes "recommend an AI pattern that this specific team can actually ship within their constraints."

### Multi-Step Goal (for BUILD STEP E)

```
I need you to:
1. Search for AI workflow automation in [my function].
2. Classify the right pattern using the 4-question framework.
3. Email the recommendation to me with subject "AI Pattern Brief."
```

### Track-specific troubleshooting

| What's happening | Likely cause | The fix |
|---|---|---|
| Recommendations are very generic ("use an AI agent to streamline your workflow") | The role line is too broad — the agent has nothing to anchor to. | Add one sentence to the role line naming your function: *"…advising an operations team in a B2B SaaS company of ~100 people."* You'll see specificity jump immediately. |
| Agent picks "RAG" for almost everything that involves any document | Q1 of the funnel is being interpreted too liberally — *"answer exists in a document"* is being read as *"a document exists somewhere related to this problem."* | Tighten Q1: change to *"Is this purely an information-retrieval task where the answer is fully contained in an existing document, with no follow-up action needed? YES → RAG."* The two clauses (fully contained + no follow-up) stop the overreach. |
| RISK FLAG defaults to "None material" too often | Generic track has the loosest risk language, so agents go conservative-by-omission. | Append to the output block: *"RISK FLAG must name at least one specific failure mode (e.g., 'silent data staleness', 'tool quota exhaustion', 'permissions sprawl'). 'None material' requires explicit justification in the same line."* |
| Email Draft fires but the body is just the structured output, no narrative | The action-tool line says "send via Email Draft" but doesn't specify body shape. | Append: *"Email body should open with a one-sentence summary of the recommendation, then the structured output, then a one-line next step the reader can take today."* |

### One-Line Reflection

> What's the most surprising thing your agent did during BUILD STEP E? _______________________________________________

---

## 🛠 ACTION TOOL MENU (for BUILD STEP C)

In Step A you enabled exactly **one** tool — Web Search. That gave your agent **eyes.** In Step C you give it **hands** — a tool that actually does something in the world.

Pick from your track's row. Each track has a primary recommendation and an alternative if the primary isn't available in your EdYoda Agent Builder tool list.

| Track | Primary action tool | Alternative |
|---|---|---|
| **Marketing/Sales** | Email Draft | Slack Post |
| **Finance/Consulting** | Spreadsheet Writer | Email Draft |
| **Doctor/Healthcare** | Document Writer | Calendar |
| **Generic** | Email Draft | Slack Post |

> ⚠️ **The single most common Step C mistake:** after you enable the tool, you **must** update your system prompt to mention it. The tool being available is not enough — the agent uses the system prompt to decide **when** to fire each tool. If you skip the prompt update, the agent will ignore the new tool and you'll think it's broken.
>
> Each track page above has the **exact line to append** — copy it verbatim, don't rewrite the system prompt from scratch.

**Sanity check after Step C:**

- [ ] Tool is enabled in the Tools panel.
- [ ] The system prompt mentions the tool by name (scroll to the bottom of your Role panel and confirm).
- [ ] You re-ran the starter problem from Step B.
- [ ] The trace log shows the action tool being called at the end.

If the trace log doesn't show the action tool firing, the most common cause is the system prompt update — go back and check.

---

## 🧠 MEMORY SEEDS REFERENCE (for BUILD STEP D)

In Step D you flip on **Persistent Memory** and give your agent a starting context — a "seed" — so it doesn't relearn who you are on every run.

**All 4 templates, in one place.** Use the one matching your track. Edit the bracketed placeholders to your real context before pasting — vague seeds make vague outputs. The track pages above show a fully filled-in example for each one; refer back if you're not sure how specific is specific enough.

**Marketing/Sales:**
```
Always remember: my company is [X], my audience is [Y],
my brand voice is [Z]. Use these defaults when reasoning
about marketing/sales use cases.
```

**Finance/Consulting:**
```
Always remember: I work in [sector], my portfolio focus is [X],
my key risk metrics are [Y]. Default to these unless I override.
```

**Doctor/Healthcare:**
```
Always remember: I work in [department, e.g., internal medicine],
my ward's red-flag protocols are [list 2-3].
Default to these in any clinical reasoning.
```

**Generic:**
```
Always remember: I work in [function], my company is [X],
my team's top priorities this quarter are [Y].
Default to these in every recommendation.
```

> **Why specific seeds matter:** Compare *"My company is a SaaS company"* vs. *"My company is a B2B SaaS in legal tech serving GCs at mid-market firms, brand voice is concise and skeptical."* The second one gives every future run real grip. The first one is decoration. The track pages have fully-worked examples — read yours before you write your own.

**Sanity check after Step D:**

- [ ] Persistent Memory is toggled ON.
- [ ] Memory type is set to **Conversation Memory** (remembers prior runs).
- [ ] You ran the agent on a NEW business problem and watched it use your seeded context.
- [ ] You ran a SECOND new problem and watched it remember the first one.

If the agent still says *"I don't remember our previous conversation,"* you're probably in a **new agent**, not a new run of the **same agent**. Re-open the same agent — don't create a new one.

---

## 🎯 MULTI-STEP GOAL TEMPLATES (for BUILD STEP E)

This is the climax of the build. One prompt. Three steps. The agent has to plan it, execute it, and finish it without you typing the next instruction.

### The generic template (steal this shape)

```
I need you to:
1. [research or read something — use Web Search]
2. [classify it using the 4-question framework]
3. [save or send the recommendation — use your action tool]
```

### Worked examples (one per track — these match the track pages above)

**Marketing/Sales:**
```
I need you to:
1. Search for current B2B lead scoring best practices.
2. Classify whether this should be solved with Chatbot, RAG, Agent,
   or Multi-Agent using the 4-question framework.
3. Email me the recommendation with full rationale.
```

**Finance/Consulting:**
```
I need you to:
1. Search for current trends in automated SOX compliance review.
2. Classify the right AI pattern for our 500-transactions-per-day use case.
3. Save the recommendation to a Google Doc titled "AI Pattern Brief — SOX."
```

**Doctor/Healthcare:**
```
I need you to:
1. Search for current AI-assisted clinical documentation workflows.
2. Classify the right pattern for our department.
3. Save the recommendation to a document titled "Clinical AI Pattern Brief."
```

**Generic:**
```
I need you to:
1. Search for AI workflow automation in [my function].
2. Classify the right pattern using the 4-question framework.
3. Email the recommendation to me with subject "AI Pattern Brief."
```

### Generic troubleshooting — when your multi-step run fails

This table is for failures that aren't track-specific. For track-specific failures, see the troubleshooting table on your track page.

| Symptom | Likely cause | The fix |
|---|---|---|
| Skipped Step 1 entirely (no search) | Web Search not enabled, or system prompt doesn't tell it to search first | Re-check the Tools panel. Add the explicit instruction: *"Always use Web Search before classifying."* |
| Skipped Step 3 (didn't use action tool) | System prompt doesn't mention the action tool | Append the action-tool line from your track page. Don't rewrite the whole prompt. |
| Hallucinated a source / made up a stat | Prompt is too open-ended | Tighten the instruction: *"Cite the URL of any source you reference. If no source is found, say so."* |
| Stuck in a loop — called the same tool 5+ times | Instruction is too explicit; agent thinks it failed and keeps retrying | Simplify the instruction: say *"when ready, send via Email"* — don't tell it how, just what. |
| Output is wrong format | The Output structure block in your system prompt got dropped | Re-paste the system prompt from your track page. The output block is load-bearing. |
| Agent asks for permission before every step | "Bounded autonomy" got over-bounded — somewhere you added a checkpoint line that's now too aggressive | Remove the checkpoint line. Re-run. If you genuinely need approvals, add them back per-step, not per-agent. |

> **When in doubt:** simpler prompt, fewer instructions, one fix at a time. Don't change three things and re-run — you won't know which one helped.

---

## 🩺 SAMPLE PATIENT CASE NOTES — Doctor Track Only

If you don't want to paste real patient data into a public tool during BUILD STEP E (good instinct), use one of these scrubbed sample cases instead. They are fictional, varied, and clinically plausible.

### Case A — Post-op handover

```
Patient: 62yo M, POD#1 s/p elective laparoscopic cholecystectomy.
Vitals stable overnight, T 37.4, BP 128/78, HR 84, SpO2 97% on RA.
Pain 3/10 on PCA morphine. Tolerating sips. Mild nausea, ondansetron PRN.
JP drain output 40 mL serosanguinous. Ambulating with assistance.
Plan: advance diet, D/C PCA in AM, discharge home if tolerating PO and pain controlled.
```

### Case B — ED admit

```
Patient: 78yo F, brought by family for acute confusion x 24h.
PMH: HTN, T2DM, mild cognitive impairment at baseline.
Vitals: T 38.6, BP 102/64, HR 110, RR 22, SpO2 94% on RA.
UA cloudy, +leuks, +nitrites. WBC 14.2. Lactate 2.1.
Likely urosepsis. Started IV ceftriaxone, IV fluids, sepsis bundle initiated.
Admit to medical floor with telemetry. Repeat labs in 6h.
```

### Case C — COPD exacerbation

```
Patient: 67yo M with severe COPD (GOLD stage 3), 50 pack-year history.
Presents with 3-day worsening dyspnea, productive cough yellow sputum, low-grade fever.
On home O2 2L NC. Today SpO2 88% on 2L, increased to 4L NC, sat to 93%.
Started on prednisone 40mg PO daily x 5d, azithromycin 500mg day 1 then 250mg x 4d,
duonebs q4h. CXR: hyperinflation, no focal infiltrate. No acute decompensation.
Plan: admit for 48h obs, wean O2 as tolerated, pulmonary consult.
```

Use any of these as the "problem" you ask your AI Pattern Advisor to classify — e.g., *"Should our handover-note workflow for cases like this be a Chatbot, RAG, Agent, or Multi-Agent system?"*

---

## 📊 YOUR WEEK-AFTER TRACKER

This week, run your AI Pattern Advisor **5 times** on real business problems from your work. Log each one here. We'll come back to this in Session 3.

| # | Business problem you classified | Pattern the agent picked | Was it right? (Yes / Partial / No) | Time saved vs. doing it yourself | What you'd change in the prompt |
|---|---|---|---|---|---|
| 1 | | | | | |
| 2 | | | | | |
| 3 | | | | | |
| 4 | | | | | |
| 5 | | | | | |

### End-of-week reflection (Friday, 5 minutes)

1. **Which task was the biggest time saver?** _______________________________________________

2. **Which task surprised you — either because the agent nailed it or because it was wrong in an interesting way?** _______________________________________________

3. **Which task is NOT an agent task?** (Should be a chatbot, a RAG system, or kept human?) _______________________________________________

> The third question is the most important one. The discipline of saying *"this is NOT an agent problem"* is what separates teams that ship from teams that get stuck.

---

## 📩 TAKE-HOME (reply to today's class email by Friday)

Two sentences each. Your facilitator reads every reply.

1. **ONE business problem at your job** that you'll classify with your AI Pattern Advisor this month. Tell me the problem in one sentence, and what pattern you think it'll come back as in the second.

2. **ONE workflow you WON'T automate with an agent** — because it's a chatbot job, a RAG job, or because it's too sensitive for an agent today. One sentence on the workflow, one on why it stays manual (or stays a simpler pattern).

> Why both questions matter: the first one builds the habit of using your agent. The second one builds the discipline of knowing when **not** to. Both are the work.

---

## 📌 LINGERING QUESTIONS

Anything we didn't get to in the live Q&A: reply to today's class email. Answered by tomorrow morning. The biggest ones become opening callbacks in Session 3.

---

## 🔮 WHAT'S NEXT — SESSION 3: PROMPT ENGINEERING

Today you built an agent. Next time, we make sure it does what you actually meant.

**Session 3 — Prompt Engineering & Context Engineering for Agents** is where the language you give your agents gets precise enough to make them reliable. You'll take the AI Pattern Advisor you built today and learn how to harden the system prompt so it stops making the small, annoying mistakes you'll spot over your 5 runs this week. (Six more sessions ahead of this in the arc — RAG, agent architecture, the EdYoda Agent Builder deep-build, n8n workflows, and a business-cases capstone. We're in week 2 of the journey.)

Bring your tracker. Bring your favorite run, your weirdest run, and your worst run. We'll fix all three.

---

*See you for Session 3 — Prompt Engineering. Go build.*
