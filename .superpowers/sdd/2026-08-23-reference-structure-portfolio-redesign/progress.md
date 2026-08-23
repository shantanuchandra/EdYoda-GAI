# SDD ledger — plan: docs/superpowers/plans/2026-08-23-reference-structure-portfolio-redesign.md

Baseline: `4744df2`; clean linked worktree `codex/shantanu-portfolio`.
Baseline verification: `PLAYWRIGHT_PORT=3222 pnpm verify` exit 0 — lint, typecheck, 109/109 unit, content 10/10, public scan 73 text + 1 PDF, build 24 outputs, E2E 117/117 across Chromium/Firefox/WebKit.

## Preflight consistency scan

### Task self-consistency

| Task | Production/files against tests and commands | Finding |
|---|---|---|
| 1 | Package pins, `cn`, Button/Badge/Collapsible, CSS tokens against primitive tests, install policy, typecheck, lint | Consistent. Exact registry pins were resolved before planning. |
| 2 | Five navigation entries, Case Studies shell, two 308 redirects, sitemap and link behavior against shell/migration/navigation/build tests | Consistent. Canonical route inventory falls from 18 to 17 by replacing two indexes with one. |
| 3 | Central career data and two MDX corrections against content, Work, Resume, About, and public-copy tests | Consistent. Source conflict is narrowed rather than guessed. |
| 4 | Six normalized records and SSR filter presentation against unit/browser tests | Consistent. Filter state never owns content reachability. |
| 5 | Local portrait, profile tilt, role text, and Hero integration against unit/no-JS/reduced/touch/browser contracts | Consistent. Signed LinkedIn URL cannot be committed. |
| 6 | One semantic career list with native scrolling and bounded enhancement against unit/browser contracts | Consistent. No clone-based infinite rail. |
| 7 | Home reading order and secondary-route reachability against Home/Reveal/browser contracts | Consistent. Learning uses existing loader/components. |
| 8 | Reading progress, Collapsible TOC/support, and category-local related links against unit/browser/detail tests | Consistent. Outcomes remain outside collapsed regions. |
| 9 | Clipboard enhancement plus independent mailto against unit/browser conversion tests | Consistent. Clipboard failure cannot claim success. |
| 10 | Revised metadata/JSON-LD/sitemap and Vercel-only SDK rendering against unit/browser/build output | Consistent. SDK presence is not treated as platform enablement proof. |
| 11 | Learning source-derived lock and semantic Resume PDF generation against unit/browser/artifact inspection | Consistent. PDF operation marker is single-use at first generation. |
| 12 | Canonical inventory, progressive enhancement, all-browser, link, audit, responsive and cleanup gates | Consistent. Workers remain sequential and budgets unchanged. |
| 13 | Two audit tables, exact Preview deploy, internal-browser live verification, and source/deployment SHA parity | Consistent. No production/domain/protection mutation. |

### Shared files and interfaces

| Producer task | Consumer task | Shared surface | Finding |
|---|---|---|---|
| 1 | 4, 5, 8, 9 | Button/Badge/Collapsible/`cn` primitives | Compatible: later tasks consume variants and semantics established in Task 1. |
| 1 | 4, 5, 6, 7 | `globals.css` tokens | Compatible: later tasks add component styles without changing approved palette/motion bounds. |
| 2 | 4, 10 | `/case-studies` page | Compatible: Task 2 creates the truthful server shell; Task 4 fills it; Task 10 adds metadata. |
| 2 | 10, 12 | sitemap and route inventory | Compatible: Task 2 establishes 17 canonical routes; Tasks 10/12 validate metadata and browser coverage. |
| 2 | 13 | redirects and Primary/footer navigation | Compatible: the parity audit and live verification consume the exact five-tab/secondary-route split. |
| 3 | 4 | Work/Product loader inputs | Compatible: normalized Case Studies consumes corrected allowlisted records. |
| 3 | 6, 11 | `CareerRole`, timeline, semantic Resume | Compatible: Task 6 consumes centralized roles; Task 11 renders and exports the same facts. |
| 3 | 7 | narrowed IIFL/Home impact evidence | Compatible: Task 7 must use only the corrected destination-state claim. |
| 4 | 7 | `CaseStudySummary` | Compatible: Home selected evidence reuses the normalized server model. |
| 4 | 10, 12, 13 | Case Studies route and filters | Compatible: metadata, accessibility, and live audit validate rather than redefine the route. |
| 5 | 7, 10, 12, 13 | Home portrait/profile component | Compatible: Home composition, Person JSON-LD, browser gates, and live checks consume the same local asset. |
| 5 | 7 | Home page/Hero tests | Compatible: Task 7 extends the approved Hero rather than restoring the old thesis aside. |
| 6 | 7, 12, 13 | Career rail | Compatible: Task 7 places it; later tasks exercise all input modes live. |
| 7 | 10, 12, 13 | Home composition | Compatible: later work changes metadata and verifies behavior without reordering content. |
| 8 | 10, 12, 13 | Long detail routes | Compatible: canonical URLs/structured data remain unchanged and later gates cover them. |
| 9 | 11, 12, 13 | Contact and conversion test surface | Compatible: PDF/Resume links and mailto fallback remain intact while copy feedback is additive. |
| 10 | 12, 13 | metadata, sitemap, telemetry | Compatible: local raw-output assertions precede protected-live observation. |
| 11 | 12, 13 | Learning lock and regenerated PDF | Compatible: all-browser and live checks treat both as immutable release artifacts. |
| 12 | 13 | release gates/evidence | Compatible: only a clean locally verified commit may be deployed. |

Preflight result: no task contradiction or rubric conflict found. No ruling required before Task 1.

Task 1: fix round 1/5 (2 evidence findings addressed; no tracked fix required; commit `28ac68c`). pnpm 11.0.5 reports an absent `ignoredBuilds` field as “no node_modules”, while `.modules.yaml` shows `pendingBuilds: []`, only the two approved `allowBuilds` entries, and `pnpm approve-builds --all` reports no packages awaiting approval. Original RED output was appended verbatim to the implementer report. The implementation review found no code-quality issues; controller accepted the verification evidence after the user selected inline execution.
Task 1: complete (commits `4744df2..28ac68c`, review clean after controller verification).
Task 2: complete (commit `4667741`, focused 16/16, typecheck, lint, build, and diff-check green).
Task 3: complete (commit `11a5ec3`, focused 47/47, content/public validators, typecheck, lint, build, and diff-check green; IIFL baseline narrowed to 20 minutes and Builder chronology split).
Task 4: complete (commit `78727a4`, focused 2/2, content/public validators, typecheck, lint, build, and diff-check green; six SSR cards, accessible filters, and truthful destinations).
Task 5: complete (uncommitted controller work; focused profile/home tests 7/7, typecheck, lint, content/public validators, and production build green; local LinkedIn portrait, accessible Signal/System/Scale card, reduced-motion-safe context rotation, tilt microinteraction, and `/case-studies` Hero CTA).
Task 6: complete (controller work; centralized `publicCareer` drives a semantic horizontally scrollable career rail with native overflow, keyboard-focusable 44px controls, no clones, and an Earlier career summary; focused Home/About tests 8/8, typecheck, lint, and build green).
Task 8: complete (controller work; added a progressive reading-progress indicator with reduced-motion-safe behavior; existing static TOCs remain fully available without JavaScript).
Task 9: complete (controller work; added clipboard enhancement with truthful mailto fallback and updated Contact; focused metadata/content tests 30/30, typecheck, lint, validators, and build green).
Task 7: complete (controller work; Home now routes employer/product preview actions to the unified Case Studies anchors while retaining existing Learning content and detail links; full unit/build gates green).
Task 12: complete — exact final all-browser gate passes 117/117 sequentially across Chromium, Firefox, and WebKit; axe 0 serious/critical, metadata, navigation, product/work, Learning, reduced motion, responsive, PDF prefetch/activation, and public-copy checks are green.
Task 13: complete — tabular comparison audit updated; explicit Preview deployment `dpl_FnUcXvHYyKtGyPrtq8JSWVsodD2z` is READY at the protected URL in the audit; live authenticated sitemap/robots/Home checks pass; no production/domain/alias/protection mutation.
Visual RCA follow-up: the first redesign was too long and visually mismatched to the reference. Home is now streamlined to Hero → proof → employer case studies → capabilities → career → contact; the visual system uses a white canvas, centered desktop navigation, balanced profile card, compact system typography, and corrected aliases. Full unit/build gates are green; browser accessibility is green and mobile width is overflow-free at 390px.
Task 12: fix round 1 — stale metadata/product E2E fixtures still described the retired `/work` and `/products` indexes, and the new career rail needed keyboard focus for axe's scrollable-region rule. Updated fixtures, added `tabIndex=0` to the rail, corrected undefined profile color variables, and verified metadata/product/accessibility Chromium checks green.
Task 12: fix round 2 — full all-browser run exposed the final stale Work-index fixture; it now targets `/case-studies`, filters Employer transformations, and asserts the four visible employer cards. Targeted all-browser work-route suite passes 6/6; previous 114/117 run had only this fixture failure.
Task 13: fix round 1 — live protected Preview exposed a broken sitemap/robots absolute host because the project production alias currently returns 404. `getSiteUrl()` now selects `VERCEL_URL` in Preview and retains the stable production URL outside Preview; unit/build gates green before redeploy.
Visual RCA final fix — browser comparison against the reference found the earlier home cascade still restoring serif hero typography and the 320px hero retaining a min-content overflow. Commit `e4efd1b` adds a final screen-only home contract, mobile type scaling, `minmax(0, 1fr)` hero tracks, and updates the reduced-motion selector to the streamlined one-boundary Home. Focused responsive/reduced-motion Chromium checks pass 8/8; 117 unit tests, typecheck, lint, validators, and build pass. Protected Preview `dpl_4MVoxvqw4djP1S6Utq43dJMtPVz8` is READY at `https://shantanu-chandra-portfolio-pf1g8r02m-shantanuchandras-projects.vercel.app` with live Home markers, 17-route sitemap, and Preview protection intact.
Visual RCA rebuild — the second iteration still inherited a 96px reference scale, exceeded 5,100px at 1440, and was being overridden by obsolete Home rules in `globals.css`. Commit `6aa5db7` replaces Home with a scoped transformation-leadership system: concise thesis, Transformation console, compact evidence band, four-case desktop scan, Signal/System/Scale operating system, tighter career rail, and dark conversation panel. The 1440 page measures 4,126px against a tested 4,200px budget. Exact `PLAYWRIGHT_PORT=3282 pnpm verify` is green: 117/117 unit and 123/123 browser tests across Chromium, Firefox, and WebKit; all 17 routes are overflow-free at five widths. Protected Preview `dpl_GgsdoBwPVgwwgyxKqAXFMVuDaoYL` is READY at `https://shantanu-chandra-portfolio-lv42lnwiu-shantanuchandras-projects.vercel.app`; authenticated live HTML and the internal browser confirm the new visual markers. No production, promote, alias, domain, or protection mutation was run.
Fold 1 motion parity RCA — compiled-reference and live-timeline inspection found a 300ms shell entrance; 500ms title/rule/lead/action entrances at 300/400/500/600ms delays; a 700ms card scale at 700ms; 500ms-delayed 100ms typing/50ms deletion with 1.5s holds; global-pointer ±6deg card tilt with 100ms linear following; an 800ms CTA sheen; a 1.5s scroll-cue loop; a 20px compact-header threshold; and a 200ms mobile overlay. The first implementation reproduced the timings but revealed three fundamentals defects under review: hydration could flash final content before hiding it, the CTA sheen escaped the button bounds, and the no-JavaScript scroll cue was inert. The corrected implementation uses a pre-paint HTML enhancement flag with CSS-gated entrances, keeps complete static SSR/no-JavaScript and reduced-motion states, clips the sheen, makes the cue a native anchor, and retains dialog focus/body lock until exit completes. RED contracts reproduced all three defects; focused all-browser motion/reduced-motion checks pass 18/18, settled reference-bound geometry checks pass at 1440×900 and 390×844, and exact `PLAYWRIGHT_PORT=3244 pnpm verify` passes 117/117 unit plus 132/132 browser checks across Chromium, Firefox, and WebKit with 0 overflow failures across all 17 routes at five widths.
Fold 1 color refinement — final audit found that the approved composition remained visually anonymous because active navigation, rule, CTAs, portrait frame, card panels, and skill chips were still neutral black/grey. The approved Executive Jade system now uses porcelain `#fbfcfb`, boardroom ink `#0b1714`, jade `#0f6b5d`, signal mint `#b7e4d5`, fog `#e7efeb`, and slate `#53635d`; the profile card is a deep green-black system panel rather than generic charcoal. A behavioral palette contract catches grayscale regression and enforces AA contrast for primary/secondary actions and skill chips. RED reproduced the neutral controls and grey mobile disc; GREEN passes in all three engines. The original motion and geometry contracts remain unchanged and green. Exact `PLAYWRIGHT_PORT=3249 pnpm verify` passes lint, typecheck, 117/117 unit tests, content/public validation, production build, and 135/135 browser checks; axe reports 0 serious/critical violations across 17 routes and responsive coverage reports 0 overflow failures across all five widths and three engines.
