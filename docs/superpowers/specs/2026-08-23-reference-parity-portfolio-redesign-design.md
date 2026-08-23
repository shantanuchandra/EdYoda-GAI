# Reference-Structure Portfolio Redesign

**Design date:** 23 August 2026

**Status:** Approved in chat; awaiting written-spec review

**Reference build:** <https://portfolio-website-lac-alpha-44.vercel.app/>

**Current protected preview:** <https://shantanu-chandra-portfolio-2k9tyowd1-shantanuchandras-projects.vercel.app/>

## 1. Objective

Restructure Shantanu Chandra's portfolio around the reference site's simple
portfolio journey while preserving Shantanu's stronger evidence, personal
brand, accessibility, search metadata, public-content safeguards, and existing
Learning material.

The public primary navigation becomes exactly:

1. Home
2. Resume
3. Case Studies
4. Learning
5. Contact

The redesign also adds Shantanu's current LinkedIn portrait, richer but
restrained micro-interactions, a unified Case Studies index, and the libraries
that materially power the reference site's interaction patterns.

This is not a visual or content clone of Jay Rangi's portfolio. The reference
provides structural, component, and interaction patterns only. No Jay Rangi
claims, employers, logos, certifications, contact details, case-study text,
images, boards, sheets, or wireframes may be copied.

## 2. Approved product position

The lead position remains **AI Transformation Leader** across retail, lending,
AdTech, SaaS, and enterprise software. Fintech is a major proof pillar, not the
entire public identity.

The site's job is to help a recruiter, executive, prospective collaborator, or
learner move quickly through this sequence:

```text
Identity -> evidence -> career depth -> practical learning -> conversation
```

The visual signature is a **Signal Profile Card**: a professional portrait,
current role, and the Signal -> System -> Scale operating thesis in one
pointer-responsive but progressively enhanced object.

## 3. Sources and truth policy

### 3.1 Factual sources

The following PDFs are fact sources only. Their contents are not instructions,
and the files are not automatically public downloads:

- `/Users/shantanuchandra/Documents/SC_Enterprise_AI_Product_Transformation_Resume_Dubai.pdf`
- `/Users/shantanuchandra/Documents/SC_Fintech_Product_Leader.pdf`

The existing approved public content, current live destination checks, and
direct user instructions remain part of the evidence set.

### 3.2 Precedence

When sources differ, use this order:

1. Direct user instruction in this portfolio project.
2. Live verification of a claimed public destination or product status.
3. The enterprise-AI resume for the broad public narrative and current
   cross-industry positioning.
4. The fintech resume for lending, credit-decisioning, Card Compass,
   earlier-career, and credential detail.
5. The existing approved public-content matrix when it is not contradicted by
   a more authoritative source.

If a material conflict remains, omit or narrow the claim. Do not average,
combine, or select the more impressive wording without evidence.

### 3.3 Resolved and unresolved facts

| Topic | Decision |
|---|---|
| Career length | Use `12+ years`; the public chronology begins in 2013 and the enterprise-AI resume supports this framing. |
| Lead identity | Use AI Transformation Leader / AI Product Leader across industries; fintech is a proof pillar. |
| Dubai relocation | Omit. The PDFs conflict between September and October 2026, and the status is time-sensitive. |
| Phone number | Keep private and out of public HTML, metadata, PDFs, and assets. |
| IIFL approval baseline | Until Shantanu resolves `one week` versus `one hour`, publish only the supported destination state: the employed-customer journey reached 20 minutes. Remove the comparative baseline from every public portfolio surface in this redesign. |
| Builder.ai chronology | Represent the detailed promotion path: Product Manager (Design), Dec 2020-Mar 2022; Senior Product Manager (Conversational AI), Apr 2022-Aug 2023. The combined company tenure remains Dec 2020-Aug 2023. |
| Card Compass | Keep `case-study-only` and do not render an outbound destination until a live, semantically valid product is verified. The 121 early-access-request fact may remain. |
| Teaching | Describe practical instruction under Shantanu's personal brand. Do not publish the former provider's name. |
| Credentials | The Texas McCombs AI for Leaders program and other fintech-resume credentials may be added only with the exact names and dates supplied; do not infer certificates or completion claims beyond the source wording. |
| Earlier-career titles | Use the enterprise-AI resume's public titles where the PDFs differ. Add common or independently supported scope without silently combining conflicting titles. Keep Toshiba at the common title `Software Engineer`. |

## 4. Reference audit and root cause

### 4.1 Reference structure

The reference exposes Home, Resume, Case Studies, and Contact. Its notable
patterns are:

- a long-form hero with a custom typewriter treatment;
- a pointer-driven, tilted profile card;
- a draggable employer rail;
- image-led, filterable case-study cards;
- internal case-study detail pages;
- collapsible supporting sections;
- embedded external wireframes, boards, and sheets;
- animated buttons, icons, copy-email feedback, and route progress;
- a contact form backed by `/api/contact`; and
- Vercel Web Analytics and Speed Insights.

The reference has no Learning area. Learning is an intentional Shantanu-owned
addition.

### 4.2 Observable reference libraries

The shipped reference bundles confirm:

- Next.js App Router and React;
- `next/image`;
- Tailwind CSS 4.1.3;
- Framer Motion;
- Lucide React;
- Radix Slot and Radix Collapsible;
- Class Variance Authority;
- `clsx` and `tailwind-merge`;
- Vercel Web Analytics SDK 1.5.0; and
- Vercel Speed Insights SDK 1.2.0.

The reference does not use GSAP, Lenis, Three.js, or a third-party typewriter
library. Its typewriter, profile tilt, and draggable rail are custom React and
Framer Motion components.

Reference versions are evidence of capability, not a downgrade target. The
portfolio keeps its newer compatible Next.js, React, Tailwind, and Motion
versions. Newly required packages must use exact, currently compatible pins
chosen during implementation planning.

### 4.3 Root cause

The current portfolio was built against an outcome-first contract: establish
Shantanu's identity, prove work, expose a resume, offer contact routes, and add
Products, Learning, Insights, and About. The contract explicitly allowed
structural and visual redesign rather than literal reference parity.

Consequently:

- the primary navigation expanded to six content categories and omitted a
  visible Home and Resume tab;
- Work and Products became separate indexes instead of one Case Studies area;
- portrait, profile-card, carousel, filters, and richer motion were deliberately
  omitted or reduced;
- Motion was installed but intentionally used in only two small reveal regions;
- Lucide, Radix, CVA, `clsx`, and `tailwind-merge` were never required;
- analytics and Speed Insights were documented as optional; and
- automated checks enforced accessibility, factual integrity, and route quality,
  but not the reference's tab model or component behaviors.

This is an acceptance-criteria mismatch, not a broken deployment or routing
bug. The fix is a deliberate information-architecture and interaction-system
revision with new regression contracts.

## 5. Information architecture

### 5.1 Primary navigation

The desktop navigation, mobile navigation, and their accessible names render
the same five entries in the same order:

| Label | Destination | Purpose |
|---|---|---|
| Home | `/` | Identity, profile, impact, selected evidence, About summary, and Insights pathway |
| Resume | `/resume` | Canonical semantic public resume and PDF action |
| Case Studies | `/case-studies` | Unified employer-work and independent-product library |
| Learning | `/learning` | Existing three learning paths, unchanged |
| Contact | `/contact` | Direct email, LinkedIn, and resume actions |

The wordmark continues to link to Home. The header must not add Products,
Insights, About, or Work as extra primary items.

### 5.2 Secondary destinations

- `/about` remains a public, indexable secondary route reachable from Home and
  the footer.
- `/insights` and its detail route remain public and reachable from Home and the
  footer.
- Work and Product detail routes remain public and canonical.
- Products and Work may appear as Case Studies filters or content labels, not
  primary navigation entries.

### 5.3 Route migration

| Current route | New behavior |
|---|---|
| `/work` | Permanent redirect to `/case-studies#employer-transformations`. |
| `/products` | Permanent redirect to `/case-studies#independent-products`. |
| `/work/[slug]` | Remains operational and canonical unless a later migration plan proves a no-loss canonical move. |
| `/products/[slug]` | Remains operational and canonical unless a later migration plan proves a no-loss canonical move. |
| `/about` | Remains operational and secondary. |
| `/insights` and `/insights/[slug]` | Remain operational and secondary. |
| `/learning` and `/learning/[slug]` | Remain operational with existing content unchanged. |

The two Case Studies groups expose those stable fragment IDs in server HTML.
Redirects must avoid loops and be covered by the internal-link checker. Sitemap
and canonical output must exclude redirecting index routes once the new Case
Studies index is public.

## 6. Page designs

### 6.1 Home

Desktop composition:

```text
+------------------------------------------------------------------+
| Home | Resume | Case Studies | Learning | Contact                 |
+------------------------------------------------------------------+
| AI Transformation thesis          | Signal Profile Card          |
| Cross-industry qualifier           | portrait + current role      |
| Explore case studies / Contact     | Signal -> System -> Scale    |
+------------------------------------------------------------------+
| Quantified impact rail                                           |
+------------------------------------------------------------------+
| Draggable career evidence rail                                  |
+------------------------------------------------------------------+
| Selected case studies                                            |
+------------------------------------------------------------------+
| Capabilities | About pathway | Insights pathway                  |
+------------------------------------------------------------------+
| Conversion                                                         |
+------------------------------------------------------------------+
```

Mobile composition stacks the thesis, primary actions, and Signal Profile Card
before impact evidence. No horizontal page overflow is permitted. Horizontal
rails use an explicitly contained scroll region rather than enlarging the page.

Home incorporates enough of the current About narrative to answer who Shantanu
is, how he works, and where his experience comes from. It does not duplicate the
entire career chronology.

### 6.2 Signal Profile Card

The card contains:

- locally stored LinkedIn portrait;
- Shantanu Chandra;
- AI Transformation Leader;
- latest public role: AI Product Lead at Lenskart;
- a concise Signal -> System -> Scale sequence; and
- a link or action leading to Resume or About.

The portrait discovered on LinkedIn is a small profile asset. It must be
displayed at a size appropriate to its native quality and must not be enlarged
into a soft full-bleed photograph. Use `next/image`, a stable local filename,
explicit dimensions, and alt text `Shantanu Chandra`.

The card may tilt by at most four degrees around either axis on a fine pointer.
It resets on pointer leave. Touch, keyboard-only, reduced-motion, and no-JavaScript
experiences render a stable card with identical information.

### 6.3 Resume

The HTML Resume is the canonical public resume. It combines verified facts from
both source PDFs under the approved cross-industry positioning.

It includes:

- public contact links without phone or relocation;
- summary and core expertise;
- Lenskart, IIFL, AGL, Builder.ai, and earlier career;
- Builder.ai promotion chronology;
- independent products;
- education and supported credentials;
- practical instruction without the removed provider brand; and
- methods and tools.

The public generated PDF must be regenerated from the revised HTML Resume rather
than publishing either attached source PDF. Existing PDF safety, render, link,
margin, text, and download checks remain mandatory.

### 6.4 Case Studies

`/case-studies` loads all public employer-work and independent-product records
through their existing allowlisted loaders, normalizes them into a presentation
view model, and preserves manifest order within each category.

Filters:

- All
- Employer transformations
- Independent products
- additional industry filters only if they reduce effort and have at least two
  matching records

All items exist in the server-rendered HTML. With JavaScript disabled, filters
degrade to an all-items view. Client filtering must not be the only way to reach
content.

Each card includes original brand artwork, content type, industry, title,
description, a primary outcome, and a clear action. Employer logos are not
required and must not be scraped from the reference. Artwork should express
the true operating pattern of the case study using the Signal/System/Scale
visual language, not generic gradient decoration.

Cards link to the existing category detail routes. Inactive product destinations
remain non-links. Wasabi Travels remains the only currently approved active
external product destination.

### 6.5 Case-study details

Existing evidence-led detail pages remain the source of truth. They gain shared
interaction primitives where useful:

- reading progress;
- anchored table of contents;
- optional Radix Collapsible sections for supporting detail on smaller screens;
- contextual previous/next or related-study navigation; and
- artifact actions only for real, Shantanu-owned, live destinations.

No fake wireframes, placeholder demos, embedded spreadsheets, or Jay Rangi
artifacts may be added to match the reference visually.

### 6.6 Learning

The Learning index and its three current detail pages retain their existing:

- titles;
- descriptions;
- audiences;
- outcomes;
- four module labels per path;
- body copy;
- structured data behavior; and
- public-claim exclusions.

Only the shared shell, focus states, card micro-interactions, and typography
integration may change in this redesign. New course content, commercial claims,
accounts, enrollment, certification, and demos are outside this specification.

### 6.7 Contact

The Contact page retains direct email, LinkedIn, HTML Resume, and PDF actions.
It adds a copy-email control with visible success feedback and a no-JavaScript
mailto fallback.

The reference contact form is not copied. A form would require a provisioned
messaging integration, spam controls, error handling, privacy language, and a
delivery promise. That is a separate product decision.

## 7. Visual system

The existing brand remains intact:

| Token | Value |
|---|---|
| Canvas | `#F4F1EA` |
| Surface | `#FCFBF7` |
| Ink | `#151A18` |
| Muted ink | `#5B6561` |
| Teal | `#0E5A55` |
| Dark teal | `#102522` |
| Sand | `#D9C6A2` |
| Display type | Newsreader |
| Body/interface type | Manrope |

The reference's Inter-only black-and-white styling is not copied. Its structural
clarity and motion patterns are adapted to Shantanu's editorial teal system.

The Signal Profile Card is the single bold visual risk. Other surfaces remain
quiet, evidence-led, and precise.

## 8. Interaction system

### 8.1 Motion tokens

Use one approved easing curve, `cubic-bezier(0.16, 1, 0.3, 1)`, and three timing
bands:

- fast feedback: 120-160 ms;
- standard transitions: 180-220 ms; and
- orchestrated entry or rail settling: 280-360 ms.

Avoid continuous ambient animation, spring overshoot that moves content beyond
its container, and decorative delays that slow task completion.

### 8.2 Shared interactions

- **Navigation:** animated underline or current-page marker, with equivalent
  visible focus.
- **Buttons:** small lift on hover, immediate pressed return, and arrow travel of
  no more than four pixels.
- **Cards:** border, shadow, and up to four-pixel lift; no large parallax.
- **Typewriter:** a custom client treatment for short rotating role contexts.
  The complete proposition remains visible in server HTML and assistive text.
- **Reading progress:** a thin route-aware progress indicator for long pages.
- **Career rail:** drag, scroll snap, arrow controls, touch scrolling, and
  keyboard-operable controls. Do not duplicate semantic content solely to fake
  an infinite loop.
- **Filters:** selected state, count feedback, keyboard operation, and visible
  all-items fallback.
- **Timeline:** marker or rule emphasis when a role enters the viewport; content
  itself never depends on entry animation.
- **Copy email:** live-region confirmation without replacing the mailto link.
- **Collapsible evidence:** Radix keyboard and ARIA behavior, with important
  outcomes never hidden by default on desktop.

### 8.3 Progressive enhancement

Server-rendered HTML must represent the final visible state. Do not serialize
`opacity: 0`, offscreen transforms, or collapsed essential content as the only
initial state.

`prefers-reduced-motion: reduce` must disable typewriter changes, tilt, drag
settling animation, progress interpolation, reveal translations, and opacity
fades. Color, border, and focus feedback may remain immediate.

## 9. Component and dependency boundaries

Keep Server Components as the default. Add small client boundaries only where
state or pointer/viewport input is required.

Expected units:

- `SignalProfileCard`: portrait, pointer tilt, static reduced-motion fallback;
- `RoleTypewriter`: decorative rotating context with stable accessible text;
- `ReadingProgress`: route/scroll progress;
- `CareerRail`: drag, controls, scroll snap, and focus behavior;
- `CaseStudyFilters`: presentation-only filtering over server-provided records;
- `CopyEmail`: clipboard enhancement with mailto fallback; and
- shared `Button`, `Badge`, and `Collapsible` primitives.

The current `Reveal` contract remains: no-JavaScript visibility, reduced-motion
final state, and modest normal-motion translation. Do not turn every section
into a client component.

Add only packages that are used by an approved component:

- `lucide-react`;
- `@radix-ui/react-slot`;
- `@radix-ui/react-collapsible`;
- `class-variance-authority`;
- `clsx`;
- `tailwind-merge`;
- `@vercel/analytics`; and
- `@vercel/speed-insights`.

Do not add GSAP, Lenis, Three.js, a typewriter package, a carousel package, or a
full copied component library.

## 10. Telemetry

Render Vercel Analytics and Speed Insights only in deployed Vercel environments.
They must not block rendering or navigation. No contact form or free-text input
is included in this scope.

Before a production promotion, confirm that both Vercel project features are
enabled, document their data behavior, and decide whether a public privacy note
is required for the intended audience and jurisdiction. A package import alone
is not proof that the platform feature is active.

Preview deployment may verify script loading and page functionality, but this
specification does not authorize production promotion.

## 11. Accessibility and semantics

The redesign must retain or improve the current quality floor:

- one H1 per public HTML route;
- logical heading order;
- skip link and labeled primary/footer navigation;
- 44-by-44-pixel minimum interactive targets where practical;
- visible focus on every interactive element;
- no link-wrapped buttons or invalid nested interactive elements;
- keyboard-operable mobile navigation, filters, rail controls, and collapsibles;
- meaningful portrait and case-study image alternatives;
- no information conveyed only through color, motion, or hover;
- no serious or critical axe violations;
- no hidden content when JavaScript is disabled; and
- motion-free final states under reduced motion.

The reference's server-rendered `opacity: 0` content, lack of a verified
reduced-motion implementation, and link-wrapped-button semantics are patterns
to correct rather than reproduce.

## 12. Search, metadata, and links

- Add `/case-studies` to the sitemap and metadata inventory.
- Remove redirect-only `/work` and `/products` indexes from sitemap output once
  redirects are active.
- Preserve canonical detail URLs unless a tested migration explicitly changes
  them.
- Update Home, Resume, and Case Studies titles/descriptions to the revised
  structure.
- Update Person/ProfilePage image data when the local portrait exists.
- Keep employer and product structured data truthful and category-aware.
- Preserve the generated 1200-by-630 OG image unless an approved portrait-led
  social design replaces it.
- Internal link checks must follow redirects and confirm every sitemap route,
  PDF, image, and active external product destination.

## 13. Error and fallback behavior

- Missing portrait asset: render the existing `SC` monogram and stable card
  dimensions.
- Image load failure: preserve readable card content and avoid layout collapse.
- JavaScript disabled: show all case studies, stable profile card, complete
  proposition, all navigation, and mailto contact.
- Motion disabled: render immediate final states.
- Unknown detail slug: branded 404 and no partial content.
- Inactive external destination: omit the link and show a truthful status label.
- Clipboard unavailable: keep the email link and show no false success state.
- Analytics script blocked: no user-visible error and no application failure.

## 14. Test strategy

Implementation follows test-driven development. Add failing contracts before
changing production behavior.

### 14.1 Unit and content contracts

- exact five-item primary navigation and order;
- absence of Work, Products, Insights, and About from primary navigation;
- unified Case Studies index contains all four employer records and both product
  records exactly once;
- filter view model preserves source identity and destinations;
- redirect and canonical rules are non-circular;
- Learning source files and rendered visible content remain unchanged;
- portrait has a stable local path, dimensions, and alt text;
- new library primitives expose the approved variants and semantics;
- Builder.ai chronology is split accurately;
- conflicting relocation and IIFL comparative-baseline claims are absent;
- former provider branding and phone remain forbidden in public output; and
- Card Compass remains case-study-only without an external URL.

### 14.2 Browser contracts

Run Chromium, Firefox, and WebKit checks for:

- all five tabs on desktop and mobile;
- active navigation and mobile focus management;
- Home profile card and portrait;
- fine-pointer tilt positive control and stable touch behavior;
- exact reduced-motion final state;
- no-JavaScript visibility;
- career rail arrow, drag, touch, and keyboard paths;
- Case Studies filter behavior and all-items fallback;
- every employer and product card destination;
- collapsible keyboard behavior;
- copy-email feedback and mailto fallback;
- preserved Learning index and three detail routes;
- semantic Resume and regenerated PDF activation;
- one H1, skip-link behavior, axe, prohibited copy, and metadata;
- zero horizontal overflow at 320, 390, 768, 1024, and 1440 pixels; and
- image load, unknown-slug, and inactive-destination fallbacks.

### 14.3 Performance and live verification

- Production build and all existing validators must pass.
- Lighthouse budgets remain at least 0.90 performance and 1.00 accessibility,
  SEO, and best practices on the audited environment.
- Record lab LCP, CLS, and TBT as diagnostics, not field data.
- Verify the protected Preview in the in-app browser at mobile and desktop
  widths.
- Confirm telemetry requests do not block content.
- Re-run live internal-link, PDF, metadata, sitemap, robots, OG image, active
  product, and prohibited-copy checks.

## 15. Deployment boundary

Deployment is Preview-only to the isolated
`shantanuchandras-projects/shantanu-chandra-portfolio` project.

Use an explicit preview target. Do not run an ambiguous default deployment
command. Do not promote to production, assign a custom domain, modify existing
protection, or delete prior deployments without separate user authority.

The implementation handoff must report:

- exact source commit;
- Preview deployment ID and URL;
- target and readiness state;
- full local verification results;
- protected live-route results;
- library and telemetry status; and
- any unresolved factual or platform limitation.

## 16. Acceptance criteria

The redesign is complete only when all of the following are true:

1. Primary navigation is exactly Home, Resume, Case Studies, Learning, Contact.
2. Home includes the locally stored LinkedIn portrait and Signal Profile Card.
3. All existing employer Work and Product content is discoverable through the
   unified Case Studies index.
4. Existing detail URLs remain valid or have tested, no-loss redirects.
5. Existing Learning visible content remains unchanged.
6. The semantic Resume reconciles both source PDFs under the approved truth
   policy, and its regenerated PDF passes visual and textual verification.
7. Approved reference libraries are installed only where used; unneeded motion
   and carousel packages are absent.
8. Micro-interactions are consistent, keyboard accessible, touch-safe,
   no-JavaScript-safe, and motion-free under reduced motion.
9. No Jay Rangi content or artifacts, former provider branding, phone number,
   unsupported relocation claim, or unverified destination is public.
10. Sitemap, canonical, structured-data, link, metadata, accessibility,
    responsive, and performance gates pass.
11. A new protected Vercel Preview is Ready and verified in the in-app browser.
12. No production or custom-domain mutation occurs.

## 17. Non-goals

- Copying the reference site's visual identity or personal content.
- Publishing the attached source resumes verbatim.
- Adding a contact-form backend.
- Adding Learning demos, accounts, enrollment, certification, or commerce.
- Scraping or publishing employer logos.
- Creating fake case-study artifacts.
- Adding a dark-mode toggle.
- Adding GSAP, Lenis, Three.js, or a third-party carousel/typewriter package.
- Production promotion or custom-domain work.
