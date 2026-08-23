# Original Build Coverage Audit

**Audit date:** 23 August 2026  
**Reference build:** <https://portfolio-website-lac-alpha-44.vercel.app/>  
**Shantanu preview:** protected Preview deployment is refreshed only after the final verified commit; local verification below uses `http://localhost:3244`.
**Compared source commit:** `0ed56f3` (current redesign worktree before final release gates)

## Executive conclusion

The new Shantanu Chandra portfolio contains every **transferable core portfolio outcome** found in the reference build: a clear personal proposition, career evidence, case studies, capabilities, contact paths, an HTML resume, and a downloadable PDF resume.

It is **not a literal feature-for-feature clone**, and should not be described as one. The reference site belongs to Jay Rangi, so its personal data, employer claims, certifications, case-study artifacts, portrait, logos, and response-time promise were deliberately not copied. Several interactions were also intentionally replaced:

- the contact form is replaced by direct email and LinkedIn links, with no form backend or account requirement;
- tag filtering is replaced by a small, curated Work index with industry and method metadata;
- six reference case-study cards with third-party wireframes are replaced by four evidence-led employer stories with dedicated detail pages;
- decorative portrait/logo/carousel treatments are replaced by Shantanu's proof-first editorial identity;
- Vercel Analytics and Speed Insights from the reference build are not currently installed.

**Verdict:** core portfolio parity is confirmed; literal component parity is not. The omissions are documented below as intentional, optional, or future production work.

## Audit method and boundaries

| Evidence source | What was checked | Result |
|---|---|---|
| Reference homepage and navigation | Public HTML, headings, navigation, CTAs, career/specialization sections, footer links | HTTP 200; four primary routes discovered |
| Reference `/resume` | HTML resume, experience, education, professional skills, certifications, PDF action | HTTP 200; PDF HTTP 200 with `application/pdf` |
| Reference `/case-studies` | Six cards, tags/filter UI, summaries, image covers, external wireframe/board/sheet links | HTTP 200 |
| Reference `/contact` | Message form, email, LinkedIn, copy-email interaction, response-time statement | HTTP 200 |
| Reference technical endpoints | `/sitemap.xml` and `/robots.txt` | Both HTTP 404 |
| Current route source | `portfolio/app/sitemap.ts` and `portfolio/content/manifest.ts` | 18 public HTML routes from eight indexes/static pages and ten allowlisted detail records |
| Current exact-HEAD release gate | `PLAYWRIGHT_PORT=3015 pnpm verify` | Lint, typecheck, 109 unit tests, build, and 117 three-browser tests passed |
| Current protected Vercel preview | Authenticated smoke test of affected routes/assets | Preview/READY; source commit matches `64a4932`; SSO protection retained |

The current preview is protected by Vercel SSO. Unauthenticated requests receive a 302 and `noindex`; current-site assertions below use the exact source tree, full release gate, and authenticated preview checks.

## Route and information-architecture mapping

| Reference route or asset | Reference purpose | Current equivalent | Coverage | Notes |
|---|---|---|---|---|
| `/` | Identity, proposition, career, capabilities, employer logos, conversion CTAs | `/` | **Enhanced** | Adds quantified impact, employer evidence, independent products, Learning Lab, and operating principles |
| `/resume` | HTML career timeline, education, skills, certifications | `/resume` | **Present** | Includes public-safe career history, education, practical instruction, methods, and tools |
| `/resume/Jay_Rangi_Resume.pdf` | Downloadable PDF resume | `/shantanu-chandra-resume.pdf` | **Enhanced** | Two-page generated A4 PDF plus a semantic HTML fallback |
| `/case-studies` | Six case-study cards and tag filters | `/work` | **Present with intentional redesign** | Four employer transformation stories; industry/method metadata replaces interactive filtering |
| Case-study card interaction | Card content plus external wireframes/boards/sheets | Four `/work/[slug]` pages | **Enhanced** | Each story has a dedicated narrative, outcomes, methods, responsible controls, and table of contents |
| `/contact` | Contact form, email, LinkedIn, response-time promise | `/contact` | **Equivalent outcome** | Direct mailto and LinkedIn actions; intentionally no form backend or unsupported response-time promise |
| Header/footer navigation | Home, resume, case studies, contact | Global header/footer | **Present** | Adds Products, Learning, Insights, and About; Resume remains reachable from Home, Contact, and footer |
| No reference sitemap/robots | No discoverable XML/text endpoints | `/sitemap.xml`, `/robots.txt` | **Enhanced** | Current site exposes 18 public URLs and an absolute sitemap declaration |
| Reference favicon/basic metadata | Title, description, icon | Per-route metadata, icon, canonical, OG image, JSON-LD | **Enhanced** | Current site adds route-specific search/social metadata and structured data |

## Visible capability comparison

| Capability | Reference build | Current build | Status | Confirmation |
|---|---|---|---|---|
| Personal identity and role | Jay Rangi, Product Manager | Shantanu Chandra, AI Transformation Leader | **Present** | Homepage hero and site-wide descriptor |
| Clear primary proposition | Product management and AI specialization | Signal → System → Scale transformation proposition | **Enhanced** | More differentiated and evidence-led |
| Primary work CTA | Explore Case Studies | Explore selected work | **Present** | Links to `/work` |
| Resume CTA | View/Download Resume | HTML resume and PDF download | **Enhanced** | Available on Home, Contact, Resume, and footer |
| Contact CTA | Get in Touch | Contact, email, LinkedIn | **Present** | Direct, JavaScript-independent actions |
| Responsive navigation | Desktop navigation and mobile menu | Desktop navigation and accessible mobile dialog | **Enhanced** | Enter/Escape, focus containment, focus restoration, skip link |
| Career snapshot | Employer cards/timeline on Home | Career snapshot on Home; full timeline on About/Resume | **Present** | Eight public career entries in full resume/timeline |
| Company/employer proof | Company logos and role cards | Four employer case studies plus career history | **Enhanced** | Replaces logo theatre with outcomes and operating context |
| Specialization/capabilities | Four specialization cards | Seven numbered AI transformation capabilities | **Present** | Strategy, workflow, discovery, RAG/agents, human review, leadership, measurement |
| Case-study index | Six cards | Four employer-work cards | **Present** | Current stories are CV-grounded and confidentiality-aware |
| Case-study metadata | Company, summary, tags | Company, industry, role, period, methods, outcomes | **Enhanced** | Category-specific content schema prevents incomplete publication |
| Case-study detail | Card-driven interaction/external artifacts | Dedicated static detail route per story | **Enhanced** | Narrative, outcomes, methods, controls, TOC, metadata |
| Case-study tag filtering | Interactive filter chips | No interactive filter | **Intentionally omitted** | Four curated stories do not justify a client-side filter; metadata remains visible |
| External wireframes/boards/sheets | Jay-specific artifacts for six reference studies | Not copied | **Intentionally omitted** | They are not Shantanu's evidence and must not be represented as such |
| Portrait/identity card | Headshot and decorative 3D profile card | Editorial type-led identity and operating thesis | **Intentional redesign** | Avoids copying another person's visual identity |
| Employer-logo carousel | Company marks on Home | Textual career snapshot and evidence cards | **Intentional redesign** | No unlicensed logo dependency; evidence remains accessible as text |
| HTML resume | Experience, education, skills, certifications | Career experience, education, practical instruction, methods/tools | **Present** | Public-safe, printable, usable without PDF/JavaScript |
| Downloadable PDF resume | Static PDF | Generated and verified two-page A4 PDF | **Enhanced** | Content scan, links, margins, render, and download behavior are tested |
| Education | Education section | MBA and engineering degree | **Present** | Based on Shantanu's source resume |
| Skills/methods | Technical, product, AI, industry groupings | Applied AI, data/infrastructure, product methods and homepage capabilities | **Present** | Reorganized around current positioning |
| Certification catalogue | Twelve Jay-specific certifications | No copied certification grid | **Intentionally omitted** | The supplied Shantanu source resume does not support copying those credentials |
| Contact form | Name/email/subject/message form | No form | **Replaced** | Direct email is explicit; no backend, spam surface, consent copy, or false delivery promise |
| Copy-email interaction | Clipboard-style email control | Mailto email link | **Equivalent outcome** | One action opens the visitor's email client; no clipboard-only dependency |
| LinkedIn | External profile link | Shantanu's LinkedIn link | **Present** | Exact public URL is validated site-wide |
| Response-time promise | “24–48 hours” | No response-time claim | **Intentionally omitted** | Avoids an unsupported service-level promise |
| Decorative page motion | Page entrance, hover motion, progress bar | Two progressive reveal regions and restrained hover/focus states | **Present with restraint** | Server content stays visible; reduced motion is immediate and animation-free |
| Dark-theme infrastructure | Theme provider/CSS present; no verified public toggle | Fixed accessible brand palette | **Not carried over** | Not required for functional parity; can be added only if it serves the brand |
| Analytics and Speed Insights | Vercel Analytics and Speed Insights components present | Not installed | **Optional production gap** | Consider only with explicit production/measurement and privacy decisions |
| Search metadata | Basic site title and description | Unique titles, descriptions, canonicals, social metadata | **Enhanced** | Validated across all public routes |
| Structured data | Not found in inspected reference HTML | Person/ProfilePage, CreativeWork, Article, guarded Course data | **New** | Truthful category-aware JSON-LD |
| Social preview | No purposeful reference OG endpoint confirmed | 1200×630 generated OG image | **New** | PNG dimensions and content are tested |
| Branded 404 | Generic Next.js 404 in reference HTML | Branded unknown-route and unknown-slug handling | **Enhanced** | Public and non-public slugs fail closed |
| Accessibility gates | No comparable launch-gate evidence | Keyboard, axe, reduced motion, no-JS, touch target, heading-order tests | **New** | 117 checks pass across Chromium, Firefox, and WebKit |

## New capabilities beyond the reference

| Current area | Public routes | What it adds |
|---|---:|---|
| Employer Work | 5 | Index plus Lenskart, IIFL, AGL, and Builder.ai detail stories |
| Independent Products | 3 | Product index, Wasabi Travels active product, Card Compass case-study-only record |
| Learning Lab | 4 | Three practical learning paths with exact four-module launch outlines |
| Insights | 2 | Insight index and dated Signal → System → Scale article |
| About | 1 | Leadership thesis, industries, principles, and career timeline |
| Contact | 1 | Direct email, LinkedIn, HTML resume, and PDF routes |
| Resume | 1 HTML + 1 PDF | Printable semantic resume and downloadable A4 artifact |
| Search/social infrastructure | Sitemap, robots, OG image | Crawl inventory, crawler policy, and social sharing asset |

## Items not confirmed as literal parity

| Item | Classification | Recommendation |
|---|---|---|
| Contact form submission/backend | Intentional replacement | Keep direct email unless a real, privacy-reviewed delivery integration is requested |
| Case-study tag filtering | Intentional omission | Revisit only when the Work library grows enough for filtering to reduce effort |
| Reference wireframes, Whimsical boards, and Sheets | Must not copy | Add only Shantanu-owned artifacts with permission and evidence |
| Portrait, logos, and 3D identity card | Visual redesign | Add a professional portrait later only if it strengthens the chosen personal brand |
| Reference certification catalogue | Must not copy | Add verified Shantanu credentials only when source evidence is supplied |
| Vercel Analytics/Speed Insights | Optional production gap | Decide alongside production approval, measurement goals, and privacy expectations |
| Dark theme | Optional visual feature | Add only if user need or brand direction justifies the extra state and QA surface |

## Final confirmation

| Question | Answer |
|---|---|
| Does the new site contain the reference site's core portfolio journey? | **Yes** — identity → evidence/work → resume → contact is fully present. |
| Does every reference component exist one-for-one? | **No** — form, filters, Jay-specific artifacts, portrait/logo treatments, certifications, and telemetry are not literal copies. |
| Are the missing visible outcomes blocking a professional portfolio launch? | **No** — each essential outcome has a safer or stronger current equivalent. |
| Is any omitted capability worth considering before production? | **Only optionally** — analytics/Speed Insights and, if genuinely needed, a real contact-form integration. |
| Does the current site materially exceed the reference? | **Yes** — 18 public routes, dedicated evidence pages, products, Learning Lab, Insights, About, structured data, sitemap/robots/OG, branded errors, and audited accessibility. |

## Current redesign verification addendum

| Check | Result | Evidence |
|---|---|---|
| Primary tabs | **Confirmed** | Home, Resume, Case Studies, Learning, Contact appear in that order in the browser at 390px and desktop widths. About/Insights remain secondary routes. |
| LinkedIn profile image | **Confirmed** | Local portrait is bundled at `portfolio/public/images/shantanu-chandra-linkedin.jpg`; Home renders it with alt text and a monogram fallback. No signed LinkedIn URL is committed. |
| Career evidence | **Confirmed** | Builder promotion path is split into the two approved roles; IIFL public claim is narrowed to 20 minutes; the career rail is driven from `lib/resume-data.ts`. |
| Case Studies | **Confirmed** | `/case-studies` contains six server-rendered records: four employer transformations and two independent products. `/work` and `/products` remain permanent redirects to the grouped view. |
| Learning index and details | **Confirmed** | `/learning` plus all three approved slugs return 200 with one H1 and connected index cards. Existing Learning copy remains source-preserved. |
| Connected product demos | **Confirmed with guardrails** | Wasabi Travels is the sole active external destination; Card Compass is deliberately case-study-only with no outbound URL. Employer/product detail pages retain their canonical internal routes. |
| Responsive behavior | **Confirmed locally** | Home at 390px reports `scrollWidth === innerWidth`; portrait is present; all five primary tab labels are present. Full release gates remain required before Preview refresh. |
| Micro-interactions | **Confirmed** | Signal profile tilt (pointer fine only), reduced-motion-safe role context rotation, career rail controls, reading progress, copy-email feedback, hover/focus transitions, and existing progressive reveals. All preserve server HTML fallbacks. |

### Course route matrix

| Learning path | Index link | Detail route | HTTP | Individual page | Connected demo |
|---|---|---|---:|---|---|
| Applied AI for non-technical professionals | `/learning` | `/learning/applied-ai-non-technical` | 200 | Yes | Learning content/modules; no commercial checkout claim |
| AI product transformation | `/learning` | `/learning/ai-product-transformation` | 200 | Yes | Learning content/modules; no account/certification claim |
| Practical agents for founders | `/learning` | `/learning/practical-agents-founders` | 200 | Yes | Learning content/modules; no commercial checkout claim |

“Demo” means a connected, navigable learning detail route. The site does not
invent course commerce, accounts, certificates, or payment flows.
