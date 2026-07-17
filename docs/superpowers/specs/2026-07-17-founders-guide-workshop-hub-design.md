# Founder's Guide to Agents — Workshop Hub Design

## Purpose

Publish the complete Saturday workshop as one Vercel-hosted website for ten early-stage founders. The site must support two different moments: a presenter delivering the live 10am–2pm session and founders returning to the material after the session. It must also provide the facilitator’s operational material at a stable, publicly reachable route that is intentionally omitted from the founder-facing navigation.

## Information architecture

The existing pre-read remains the entry point. Four routes live in the same static Vercel project:

| Route | Audience | Job |
|---|---|---|
| `/` | Founders | Existing pre-read and Hermes setup checkpoint. |
| `/presenter` | Founders, during the room session | Full-screen presenter deck that teaches the mental model and guides the shared build. |
| `/handbook` | Founders and facilitator | Deep reference: mental model, both build recipes, safe troubleshooting, fallback investor data, and a clearly separated facilitator-operations chapter. |
| `/runbook` | Facilitator | Minute-by-minute operating guide, spoken lines, checks, contingencies, and pre-session dry run. It is public by URL but never linked from the founder-facing navigation. |

## Content rules

- Canonical content comes from `00_Source_of_Truth.md`, `01_Facilitator_Script.md`, `02_Learner_Workbook.md`, and `03_Hermes_Build_Recipes.md`.
- Preserve the locked four-hour flow: framing, Repo/Product Digest build, 15-minute break, Investor Qualification + Outreach build, generalisation, close.
- Teach the agent-vs-prompt test as live data + external action + trigger/proactivity.
- Preserve human control: Gmail actions create drafts only; founders approve and send.
- Present commands and recipe language as workshop guidance; surface the existing dry-run caveat where it matters rather than claiming every integration is already proven.
- Do not add credentials, keys, internal folders, or new factual claims.

## Visual and interaction design

- **Presenter:** dark, dense, screen-first slide deck. Large conceptual diagrams, visible timer/progress, keyboard navigation, and a simple slide selector. This is founder-facing: no facilitator-only instructions appear in slide copy.
- **Handbook:** light, full-width editorial reference. Anchor navigation, progressive disclosure for troubleshooting and fallback lists, copyable prompts, and printable content.
- **Runbook:** high-signal operational interface. Time blocks, “say / do / watch” cards, readiness checks, and contingency accordions. Its navigation does not appear on the pre-read, presenter, or handbook.
- All artifacts use the existing Hermes visual vocabulary: paper/ink and electric-blue accents for founder reading; purposeful SVG diagrams and motion; reduced-motion support; keyboard-visible focus.

## Data and implementation approach

- Use self-contained static HTML, CSS, and browser JavaScript: no build step and no client-side credentials.
- Create separate HTML source pages and route them using `vercel.json` rewrites.
- Shared visual tokens and small inline SVGs are duplicated deliberately to keep each artifact portable and independently printable.
- Store only local, non-sensitive worksheet/checklist state in the browser where it improves the experience.

## Verification

1. Parse each inline script with Node.
2. Confirm each HTML page contains no unfinished template tokens.
3. Confirm each public founder route returns HTTP 200 and that `/runbook` is not linked in the founder navigation.
4. Verify the deployed presenter route includes the locked session beats and the handbook includes both recipes, the fallback investor list, and facilitator operations.

