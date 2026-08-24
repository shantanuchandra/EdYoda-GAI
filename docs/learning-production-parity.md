# Learning production parity audit

Audit date: 24 August 2026

## Baseline and scope

The comparison baseline is the last production build of the original course hub: Vercel deployment `dpl_A5XvTBM1KpNT7QLQzruKAsnZfCX2`, built from commit `75dba0de8d5143d81814a3f5c63d9126b8811702` of the `ed-yoda-gai` project.

“Content intact” means every learner-facing destination linked by that production course hub, together with the recursively referenced assets required to render those destinations. It does not mean unlinked repository drafts or internal source files.

## Content and destination parity

| Learning path | Production groups | Portfolio groups | Production material links | Portfolio material links | Individual portfolio route | Result |
|---|---:|---:|---:|---:|---|---|
| Applied AI for non-technical professionals | 8 | 8 | 27 | 27 | `/learning/applied-ai-non-technical` | Complete |
| AI product transformation | 9 | 9 | 18 | 18 | `/learning/ai-product-transformation` | Complete |
| Practical agents for founders | 3 | 3 | 6 | 6 | `/learning/practical-agents-founders` | Complete |
| **Total** | **20** | **20** | **51** | **51** | **3 detail routes** | **Complete** |

The migrated material library contains 92 files (5.7 MB), including 53 HTML documents and the images, Markdown, and supporting files reached by those documents. All 51 production material endpoints are served below `/learning-materials/` on the portfolio origin, so a learner is not redirected to the retired or protected course deployment.

## Learner journey and link checks

| Journey | Expected destination or behavior | Verified result |
|---|---|---|
| Learning index → Applied AI | `/learning/applied-ai-non-technical` | Connected |
| Learning index → AI product transformation | `/learning/ai-product-transformation` | Connected |
| Learning index → Practical agents | `/learning/practical-agents-founders` | Connected |
| Applied AI → Lumiere Bakery demo | `/learning-materials/lumiere-app/index.html` | Connected and interactive |
| Applied AI → Lumiere build guide | `/learning-materials/lumiere-app/guide.html` | Connected |
| Applied AI curriculum | 8 expandable groups and 27 material links | Complete |
| AI product curriculum | 9 expandable groups and 18 material links | Complete |
| Practical agents curriculum | 3 expandable groups and 6 material links | Complete |
| All portfolio internal destinations | 73 unique destinations | Resolved |

## Production gaps found and corrected

| Gap found during audit | Root cause | Correction |
|---|---|---|
| Detail pages exposed only four overview modules | The portfolio carried the short MDX overview, not the production hub’s full curriculum manifests | Added the complete 20-group, 51-link production curriculum while retaining the existing audience, outcome, launch modules, and teaching copy |
| Production materials depended on a protected retired deployment | The original links pointed outside the portfolio | Migrated all linked learner artifacts and their rendering dependencies to same-origin portfolio paths |
| Lumiere demo failed in the browser | The static demo called n8n cross-origin; after CORS was removed from the path, the old n8n workspace itself returned `404 — No workspace here` | Added a same-origin server boundary and retained the complete deterministic course agent as a transparent fallback; the demo now answers without console errors and does not show a lead form unless the remote workflow actually succeeds |
| Closed curriculum rows still displayed their links | Author CSS overrode the browser’s native closed-`details` rendering | Restored closed-state hiding while keeping native keyboard and screen-reader behavior |
| One apostrophe-bearing path failed the link gate | The generated HTML encoded the apostrophe as `&#x27;`, which the link decoder did not handle | Added hex-apostrophe decoding before link resolution |
| Imported workbook contained a stale malformed domain | A mechanical brand replacement changed an old external URL into an invalid hostname | Replaced it with the valid Applied AI route and re-scanned the public library |

## Integrity notes

- The approved Learning index design and its existing copy were not changed.
- Existing Learning detail copy remains present; the production curriculum is additive.
- Visible retired-brand references were changed to “Shantanu Chandra Learning Lab”; lesson substance and linked learner content were preserved.
- No commerce, enrolment, account, or certification claims were added.
- All material links open in a separate tab and remain reachable without relying on the protected legacy deployment.
