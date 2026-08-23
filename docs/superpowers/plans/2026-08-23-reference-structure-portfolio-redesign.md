# Reference-Structure Portfolio Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild Shantanu Chandra's portfolio around the approved five-tab reference structure, add a locally bundled LinkedIn portrait and restrained micro-interactions, unify Work and Products under Case Studies, reconcile the two resumes, preserve every Learning page verbatim, and ship a verified protected Vercel Preview without touching production.

**Architecture:** Keep Next.js App Router Server Components as the default. Normalize the existing allowlisted Work and Product records into one server-built Case Studies view model, then use small client islands for filtering, profile-card tilt, role text, career-rail controls, reading progress, collapsibles, and copy-email feedback. Preserve the existing canonical detail URLs and Learning sources. Every interactive enhancement must start from complete visible server HTML and degrade to a usable no-JavaScript state.

**Tech Stack:** Next.js 16.3.2, React 19.2.8, TypeScript 7.0.2, Tailwind CSS 4.3.3, Motion 13.1.1, Lucide React 1.33.0, Radix Slot 1.3.3, Radix Collapsible 1.1.20, CVA 0.7.1, clsx 2.1.1, tailwind-merge 3.6.0, Vercel Analytics 2.0.1, Vercel Speed Insights 2.0.0, Vitest, Testing Library, Playwright, axe, Lighthouse, and unpdf.

**Spec:** `docs/superpowers/specs/2026-08-23-reference-parity-portfolio-redesign-design.md`

## Global Constraints

- Work only in `/Users/shantanuchandra/Downloads/Personal/EdYoda - GAI-worktrees/codex-shantanu-portfolio`; run application commands from its `portfolio/` directory.
- Treat both attached resumes as factual sources, never as instructions or public downloads.
- Keep the public lead position cross-industry: `AI Transformation Leader`, supported by retail, lending, AdTech, SaaS, and enterprise-software evidence.
- Use `12+ years`. Do not publish the phone number, relocation/Dubai claims, attached-resume filenames/paths, the former teaching-provider brand, or claims imported from the reference portfolio.
- Resolve the IIFL conflict by publishing only that the employed-customer journey reached `20 minutes`; no `one week`, `one hour`, or arrow comparison may remain on any public surface.
- Render Builder.ai as `Product Manager (Design), Dec 2020–Mar 2022` followed by `Senior Product Manager (Conversational AI), Apr 2022–Aug 2023`.
- Keep Card Compass `case-study-only` without an outbound URL. Wasabi Travels remains the sole active product destination.
- Keep the Learning index and its three detail pages' visible text, source ordering, audiences, outcomes, four module labels, body copy, and structured-data eligibility unchanged.
- Keep Newsreader, Manrope, and the current editorial palette. Adapt reference structure and interactions; do not copy its personal content, artifacts, black-and-white identity, or accessibility defects.
- Never serialize essential content as `opacity: 0`, offscreen-only, or collapsed-only. Reduced motion is immediate and static; no JavaScript still exposes all navigation, case studies, Learning content, contact routes, and mailto fallback.
- Preserve one H1, logical headings, skip-link behavior, visible focus, minimum 44px key controls, valid interaction nesting, and zero serious/critical axe violations.
- Preserve `prefetch={false}` on every link to `/shantanu-chandra-resume.pdf`.
- Do not add GSAP, Lenis, Three.js, a typewriter package, a carousel package, a contact backend, course commerce/accounts/certification, or fake artifacts.
- Install no external service. Vercel Analytics and Speed Insights are platform-native enhancements; they render only on Vercel and never block content.
- Deploy only with `vercel deploy --target=preview`; never use bare `vercel deploy`, `--prod`, promote, alias, domain, protection, or deletion commands.
- Follow red-green-refactor for every behavior change. Commit only after the focused test and proportional verification pass.

## File and Ownership Map

| Area | Files created or changed |
|---|---|
| Dependencies and UI foundation | `portfolio/package.json`, `portfolio/pnpm-lock.yaml`, `portfolio/lib/utils.ts`, `portfolio/components/ui/button.tsx`, `portfolio/components/ui/badge.tsx`, `portfolio/components/ui/collapsible.tsx`, `portfolio/app/globals.css`, focused unit tests |
| Information architecture | `portfolio/lib/site-config.ts`, `portfolio/app/(site)/case-studies/page.tsx`, `portfolio/app/(site)/work/page.tsx`, `portfolio/app/(site)/products/page.tsx`, `portfolio/app/sitemap.ts`, shell and route tests |
| Content truth | Work MDX, resume/timeline components, `portfolio/lib/resume-data.ts`, content/public-copy tests |
| Case Studies | `portfolio/lib/case-studies.ts`, `portfolio/components/case-studies/*`, index page and tests |
| Portrait and Home | `portfolio/public/images/shantanu-chandra-linkedin.jpg`, `portfolio/components/home/signal-profile-card.tsx`, `role-typewriter.tsx`, Home composition/components and tests |
| Career rail and motion | `portfolio/components/home/career-rail.tsx`, shared interaction styling, motion/browser tests |
| Long-page enhancements | `portfolio/components/ui/reading-progress.tsx`, `portfolio/components/content/evidence-collapsible.tsx`, Work/Product/Insight layouts, related navigation and tests |
| Contact | `portfolio/components/contact/copy-email.tsx`, Contact page and tests |
| Metadata and telemetry | root layout, metadata/structured-data helpers, sitemap/robots tests |
| Resume PDF | semantic Resume data/rendering, generated PDF, PDF tests and inspection report |
| Release evidence | browser suites, link/audit tooling, `docs/original-build-coverage-audit.md`, task report, protected Preview |

---

### Task 1: Pin the approved reference-library foundation

**Files:**
- Modify: `portfolio/package.json`
- Modify: `portfolio/pnpm-lock.yaml`
- Create: `portfolio/lib/utils.ts`
- Create: `portfolio/components/ui/button.tsx`
- Create: `portfolio/components/ui/badge.tsx`
- Create: `portfolio/components/ui/collapsible.tsx`
- Create: `portfolio/tests/unit/ui-primitives.test.tsx`
- Modify: `portfolio/app/globals.css`

**Interfaces:**

```ts
export function cn(...inputs: ClassValue[]): string;

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>
  & VariantProps<typeof buttonVariants>
  & { asChild?: boolean };

type BadgeProps = React.HTMLAttributes<HTMLSpanElement>
  & VariantProps<typeof badgeVariants>;

type EvidenceCollapsibleProps = {
  label: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
};
```

- [ ] Add a failing `ui-primitives.test.tsx` contract that imports all three primitives, renders the Slot-backed `Button` as a link, verifies a 44px minimum class, verifies Badge variants, and opens/closes the Radix Collapsible by keyboard.

Run:

```bash
pnpm vitest run tests/unit/ui-primitives.test.tsx
```

Expected: RED because the modules do not exist.

- [ ] Install the exact current compatible packages, preserving all existing versions:

```bash
pnpm add -E lucide-react@1.33.0 @radix-ui/react-slot@1.3.3 @radix-ui/react-collapsible@1.1.20 class-variance-authority@0.7.1 clsx@2.1.1 tailwind-merge@3.6.0 @vercel/analytics@2.0.1 @vercel/speed-insights@2.0.0
```

- [ ] Implement `cn` with `twMerge(clsx(inputs))`, a CVA-driven Button with `primary`, `secondary`, and `quiet` variants, a semantic Badge, and an accessible Radix Collapsible using Lucide `ChevronDown`.

Core implementation shape:

```tsx
const buttonVariants = cva(
  "inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-5 font-bold transition-[transform,background-color,color,border-color,box-shadow] duration-150 focus-visible:outline-3 focus-visible:outline-offset-3 active:translate-y-0",
  { variants: { variant: { primary: "bg-dark-teal text-white hover:-translate-y-0.5", secondary: "border border-ink bg-transparent hover:-translate-y-0.5", quiet: "px-3" } }, defaultVariants: { variant: "primary" } },
);

const Comp = asChild ? Slot : "button";
return <Comp className={cn(buttonVariants({ variant }), className)} {...props} />;
```

- [ ] Add shared motion variables to `globals.css` without changing brand tokens:

```css
:root {
  --ease-out-expo: cubic-bezier(0.16, 1, 0.3, 1);
  --motion-fast: 150ms;
  --motion-standard: 200ms;
  --motion-settle: 320ms;
}

@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    scroll-behavior: auto !important;
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

- [ ] Re-run focused tests and install-policy checks.

```bash
pnpm vitest run tests/unit/ui-primitives.test.tsx
pnpm ignored-builds
pnpm typecheck
pnpm lint
```

Expected: GREEN; `pnpm ignored-builds` reports no ignored build scripts.

- [ ] Commit.

```bash
git add portfolio/package.json portfolio/pnpm-lock.yaml portfolio/lib/utils.ts portfolio/components/ui/button.tsx portfolio/components/ui/badge.tsx portfolio/components/ui/collapsible.tsx portfolio/tests/unit/ui-primitives.test.tsx portfolio/app/globals.css
git commit -m "feat: add portfolio interaction primitives"
```

---

### Task 2: Replace the primary tabs and introduce the route migration

**Files:**
- Modify: `portfolio/lib/site-config.ts`
- Create: `portfolio/app/(site)/case-studies/page.tsx`
- Modify: `portfolio/app/(site)/work/page.tsx`
- Modify: `portfolio/app/(site)/products/page.tsx`
- Modify: `portfolio/app/sitemap.ts`
- Modify: `portfolio/components/layout/site-footer.tsx`
- Modify: `portfolio/tests/unit/site-shell.test.tsx`
- Create: `portfolio/tests/unit/route-migration.test.ts`
- Modify: `portfolio/tests/e2e/navigation.spec.ts`
- Modify: `portfolio/scripts/check-links.ts`

**Interface:**

```ts
navigation: readonly [
  readonly ["Home", "/"],
  readonly ["Resume", "/resume"],
  readonly ["Case Studies", "/case-studies"],
  readonly ["Learning", "/learning"],
  readonly ["Contact", "/contact"],
];
```

- [ ] Change unit and browser contracts first: assert the exact five labels and order on desktop/mobile; assert Work, Products, Insights, and About are absent from Primary navigation; assert `/case-studies` is in the sitemap and `/work`/`/products` indexes are not.

- [ ] Add route tests that call each redirecting page and expect `permanentRedirect` with the exact fragment destination. Mock `next/navigation` so RED is deterministic.

```ts
expect(permanentRedirect).toHaveBeenCalledWith("/case-studies#employer-transformations");
expect(permanentRedirect).toHaveBeenCalledWith("/case-studies#independent-products");
```

Run:

```bash
pnpm vitest run tests/unit/site-shell.test.tsx tests/unit/route-migration.test.ts
```

Expected: RED against the six-item navigation and current index pages.

- [ ] Update `siteConfig.navigation` to the exact approved five-tuple. Keep About and Insights in a separate `footerNavigation` constant.

- [ ] Create a server-rendered `/case-studies` shell with one H1 and both stable fragment headings. Content is filled in Task 4, but the initial page must already expose honest navigation copy.

```tsx
<section id="employer-transformations" aria-labelledby="employer-transformations-title">...</section>
<section id="independent-products" aria-labelledby="independent-products-title">...</section>
```

- [ ] Replace Work and Products index bodies with server redirects:

```tsx
import { permanentRedirect } from "next/navigation";
export default function WorkIndexRedirect() {
  permanentRedirect("/case-studies#employer-transformations");
}
```

- [ ] Update the sitemap static paths to `['/', '/resume', '/case-studies', '/learning', '/contact', '/insights', '/about']`; preserve all Work/Product/Learning/Insight detail entries.

- [ ] Make `check-links.ts` accept 307/308 internal redirects, follow them, reject loops, and validate any location fragment against a matching server-rendered `id`.

- [ ] Run focused and route-level checks.

```bash
pnpm vitest run tests/unit/site-shell.test.tsx tests/unit/route-migration.test.ts
pnpm playwright test tests/e2e/navigation.spec.ts --project=chromium --workers=1
pnpm build
```

Expected: GREEN; `/case-studies` builds, the two old indexes return permanent redirects, and detail routes remain static.

- [ ] Commit.

```bash
git add portfolio/lib/site-config.ts portfolio/app/'(site)'/case-studies/page.tsx portfolio/app/'(site)'/work/page.tsx portfolio/app/'(site)'/products/page.tsx portfolio/app/sitemap.ts portfolio/components/layout/site-footer.tsx portfolio/tests/unit/site-shell.test.tsx portfolio/tests/unit/route-migration.test.ts portfolio/tests/e2e/navigation.spec.ts portfolio/scripts/check-links.ts
git commit -m "feat: adopt five-tab portfolio navigation"
```

---

### Task 3: Reconcile the public career truth once

**Files:**
- Create: `portfolio/lib/resume-data.ts`
- Modify: `portfolio/content/work/iifl-digital-lending.mdx`
- Modify: `portfolio/content/work/builder-conversational-ai.mdx`
- Modify: `portfolio/components/content/career-timeline.tsx`
- Modify: `portfolio/components/content/resume-document.tsx`
- Modify: `portfolio/app/(site)/about/page.tsx`
- Modify: `portfolio/tests/unit/content-schema.test.ts`
- Modify: `portfolio/tests/unit/work-pages.test.tsx`
- Modify: `portfolio/tests/unit/about-contact-resume.test.tsx`
- Modify: `portfolio/tests/unit/public-copy.test.ts`

**Interface:**

```ts
export type CareerRole = {
  company: string;
  title: string;
  start: string;
  end: string;
  periodLabel: string;
  focus: string;
};

export const publicCareer: readonly CareerRole[];
export const builderRoles: readonly [CareerRole, CareerRole];
```

- [ ] Write RED contracts that require `12+ years`, both Builder role periods in order, and an IIFL `20 minutes` destination statement while rejecting `/1 week|one week|1 hour|one hour/i` across rendered Work, About, Resume, and MDX source.

- [ ] Add explicit public-copy exclusions for `Dubai`, relocation wording, the private phone, attached PDF filenames/absolute paths, and the removed provider brand. Continue constructing sensitive banned literals in tests/scanner fragments so the scanner does not flag itself.

- [ ] Centralize the stable chronology in `resume-data.ts` and render it from Career Timeline and Resume rather than maintaining competing role strings.

Builder entries must be exactly:

```ts
[
  { company: "Builder.ai", title: "Product Manager (Design)", start: "2020-12", end: "2022-03", periodLabel: "Dec 2020–Mar 2022", focus: "Product design systems and customer problem framing." },
  { company: "Builder.ai", title: "Senior Product Manager (Conversational AI)", start: "2022-04", end: "2023-08", periodLabel: "Apr 2022–Aug 2023", focus: "Conversational product scale, evaluation standards and customer adoption." },
]
```

- [ ] Rewrite IIFL metadata and body to say the employed-customer journey `reached 20 minutes`; do not state a prior duration or use a before/after arrow.

- [ ] Update Builder MDX to describe the promotion rather than applying the senior title to the full company tenure.

- [ ] Run the truth gates.

```bash
pnpm vitest run tests/unit/content-schema.test.ts tests/unit/work-pages.test.tsx tests/unit/about-contact-resume.test.tsx tests/unit/public-copy.test.ts
pnpm validate:content
pnpm validate:public
```

Expected: GREEN; all ten allowlisted records validate, and public source contains no conflicting baseline or private/removed claims.

- [ ] Commit.

```bash
git add portfolio/lib/resume-data.ts portfolio/content/work/iifl-digital-lending.mdx portfolio/content/work/builder-conversational-ai.mdx portfolio/components/content/career-timeline.tsx portfolio/components/content/resume-document.tsx portfolio/app/'(site)'/about/page.tsx portfolio/tests/unit/content-schema.test.ts portfolio/tests/unit/work-pages.test.tsx portfolio/tests/unit/about-contact-resume.test.tsx portfolio/tests/unit/public-copy.test.ts
git commit -m "fix: reconcile public career evidence"
```

---

### Task 4: Build the unified, filterable Case Studies index

**Files:**
- Create: `portfolio/lib/case-studies.ts`
- Create: `portfolio/components/case-studies/case-study-artwork.tsx`
- Create: `portfolio/components/case-studies/case-study-card.tsx`
- Create: `portfolio/components/case-studies/case-study-filters.tsx`
- Modify: `portfolio/app/(site)/case-studies/page.tsx`
- Create: `portfolio/tests/unit/case-studies.test.tsx`
- Create: `portfolio/tests/e2e/case-studies.spec.ts`
- Modify: `portfolio/app/globals.css`

**Interfaces:**

```ts
export type CaseStudyKind = "employer" | "product";
export type CaseStudyFilter = "all" | "employer" | "product";

export type CaseStudySummary = {
  id: string;
  kind: CaseStudyKind;
  slug: string;
  href: `/work/${string}` | `/products/${string}`;
  title: string;
  description: string;
  industry: string;
  outcome: string;
  status?: "active" | "case-study-only";
  externalUrl?: string;
};

export async function getCaseStudySummaries(): Promise<readonly CaseStudySummary[]>;
```

- [ ] Add RED unit tests requiring all four Work and both Product records exactly once, manifest order inside each category, the two group anchor IDs, truthful status labels, Card Compass without any external destination, and Wasabi as the sole external product URL.

- [ ] Add RED browser tests requiring six visible cards in no-JavaScript mode, All/Employer/Independent controls, count feedback, keyboard activation, and valid detail destinations.

- [ ] Implement `getCaseStudySummaries()` with `Promise.all([getPublicContent('work'), getPublicContent('products')])`. Reject duplicate IDs and invalid category/destination combinations before rendering.

- [ ] Render all six cards in server HTML. Give each card `data-case-study-kind`; the client filter may toggle `hidden`, but it must not fetch or reconstruct content.

```tsx
<CaseStudyFilters counts={{ all: 6, employer: 4, product: 2 }}>
  {items.map((item) => <CaseStudyCard item={item} key={item.id} />)}
</CaseStudyFilters>
```

- [ ] Build original abstract artwork from the existing Signal/System/Scale geometry. Use meaningful `aria-label` or decorative `aria-hidden` according to whether the adjacent card text already names the same information. Do not scrape logos or reference assets.

- [ ] Make filters native buttons with `aria-pressed`, minimum 44px height, visible focus, and a polite result-count live region. Under reduced motion, card state changes are instant.

- [ ] Verify.

```bash
pnpm vitest run tests/unit/case-studies.test.tsx
pnpm playwright test tests/e2e/case-studies.spec.ts --project=chromium --workers=1
pnpm typecheck
pnpm lint
```

Expected: GREEN; six SSR items, correct filtering, correct links, no Card Compass external CTA.

- [ ] Commit.

```bash
git add portfolio/lib/case-studies.ts portfolio/components/case-studies portfolio/app/'(site)'/case-studies/page.tsx portfolio/tests/unit/case-studies.test.tsx portfolio/tests/e2e/case-studies.spec.ts portfolio/app/globals.css
git commit -m "feat: unify case studies with accessible filters"
```

---

### Task 5: Bundle the verified portrait and build the Signal Profile Card

**Files:**
- Create: `portfolio/public/images/shantanu-chandra-linkedin.jpg`
- Create: `portfolio/components/home/signal-profile-card.tsx`
- Create: `portfolio/components/home/role-typewriter.tsx`
- Modify: `portfolio/components/home/hero.tsx`
- Modify: `portfolio/app/(site)/page.tsx`
- Modify: `portfolio/tests/unit/homepage.test.tsx`
- Create: `portfolio/tests/e2e/profile-card.spec.ts`
- Modify: `portfolio/app/globals.css`

**Interfaces:**

```ts
type SignalProfileCardProps = {
  portraitSrc?: string;
};

type RoleTypewriterProps = {
  contexts: readonly string[];
  staticText: string;
};
```

- [ ] Add RED unit tests for a local `/images/shantanu-chandra-linkedin.jpg` source, explicit width/height, alt `Shantanu Chandra`, name, `AI Transformation Leader`, `AI Product Lead at Lenskart`, Signal/System/Scale, and Resume/About destination.

- [ ] Add RED Playwright tests for stable SSR/no-JavaScript content, max four-degree fine-pointer tilt, reset on pointer leave, no tilt under touch/reduced motion, and a stable fallback when the image request is aborted.

- [ ] Use the in-app browser while authenticated to revisit Shantanu's LinkedIn profile, identify the current `img[alt="Shantanu Chandra"]` asset, and bundle that exact current profile image locally. Do not record or commit the temporary signed LinkedIn URL, cookies, or browser export metadata. Inspect the local file with `sips -g pixelWidth -g pixelHeight`; render it no larger than its supported small-profile quality.

- [ ] Implement the card as a client island with `initial={false}` and CSS custom properties for tilt. Clamp each axis to `[-4, 4]` and reset on leave/blur. Keep the card's entire semantic content in initial HTML.

```tsx
const rotateX = clamp(((0.5 - y) * 8), -4, 4);
const rotateY = clamp(((x - 0.5) * 8), -4, 4);
```

- [ ] Implement the role treatment without a library. Render `staticText` as normal SSR text and `aria-hidden` rotating contexts only after hydration. When reduced motion is active, render the first context without timers.

- [ ] Replace the Hero's old operating-thesis aside with the Signal Profile Card; change the primary CTA to `/case-studies`; retain Contact and PDF actions.

- [ ] Verify the portrait is committed, decodable, locally served, and not an external hotlink.

```bash
pnpm vitest run tests/unit/homepage.test.tsx
pnpm playwright test tests/e2e/profile-card.spec.ts --project=chromium --workers=1
sips -g pixelWidth -g pixelHeight public/images/shantanu-chandra-linkedin.jpg
rg -n "media\.licdn|licdn\.com/.+profile" app components public tests
```

Expected: GREEN; `rg` returns no committed signed/hotlink URL.

- [ ] Commit.

```bash
git add portfolio/public/images/shantanu-chandra-linkedin.jpg portfolio/components/home/signal-profile-card.tsx portfolio/components/home/role-typewriter.tsx portfolio/components/home/hero.tsx portfolio/app/'(site)'/page.tsx portfolio/tests/unit/homepage.test.tsx portfolio/tests/e2e/profile-card.spec.ts portfolio/app/globals.css
git commit -m "feat: add signal profile card"
```

---

### Task 6: Turn career evidence into an accessible interaction rail

**Files:**
- Create: `portfolio/components/home/career-rail.tsx`
- Modify: `portfolio/components/home/career-snapshot.tsx`
- Modify: `portfolio/components/content/career-timeline.tsx`
- Create: `portfolio/tests/unit/career-rail.test.tsx`
- Create: `portfolio/tests/e2e/career-rail.spec.ts`
- Modify: `portfolio/app/globals.css`

**Interface:**

```ts
type CareerRailProps = {
  entries: readonly CareerRole[];
  label?: string;
};
```

- [ ] Add RED tests requiring one ordered semantic list, all career entries once, previous/next buttons with disabled boundary states, and no cloned items.

- [ ] Add browser tests for arrow click, `ArrowLeft`/`ArrowRight`, contained touch/pointer dragging, scroll snap, `scrollWidth` containment, and immediate reduced-motion settling.

- [ ] Implement the rail using native horizontal overflow plus Motion drag assistance only for fine pointers. Keep scrolling functional without JavaScript. Controls call `scrollTo` for the next card boundary and update status from `scroll` events.

```tsx
<ol ref={railRef} aria-label="Career evidence" className="career-rail" tabIndex={0}>
  {entries.map((entry) => <li className="career-rail__item" key={`${entry.company}-${entry.start}`}>...</li>)}
</ol>
```

- [ ] Preserve the full chronological timeline on About/Resume; the Home rail is a selected evidence view, not a replacement for canonical chronology.

- [ ] Add timeline rule/marker emphasis using IntersectionObserver while leaving every role visible before observation. Disable the emphasis transition under reduced motion.

- [ ] Verify at 320px and keyboard-only.

```bash
pnpm vitest run tests/unit/career-rail.test.tsx tests/unit/about-contact-resume.test.tsx
pnpm playwright test tests/e2e/career-rail.spec.ts --project=chromium --workers=1
```

Expected: GREEN; the page itself has no horizontal overflow while the named rail scrolls internally.

- [ ] Commit.

```bash
git add portfolio/components/home/career-rail.tsx portfolio/components/home/career-snapshot.tsx portfolio/components/content/career-timeline.tsx portfolio/tests/unit/career-rail.test.tsx portfolio/tests/e2e/career-rail.spec.ts portfolio/app/globals.css
git commit -m "feat: add accessible career evidence rail"
```

---

### Task 7: Recompose Home without losing secondary content

**Files:**
- Modify: `portfolio/app/(site)/page.tsx`
- Modify: `portfolio/components/home/featured-work.tsx`
- Modify: `portfolio/components/home/products-preview.tsx`
- Modify: `portfolio/components/home/capabilities.tsx`
- Modify: `portfolio/components/home/learning-preview.tsx`
- Modify: `portfolio/components/home/contact-callout.tsx`
- Create: `portfolio/components/home/about-insights-pathways.tsx`
- Modify: `portfolio/tests/unit/homepage.test.tsx`
- Create: `portfolio/tests/e2e/home-journey.spec.ts`
- Modify: `portfolio/app/globals.css`

- [ ] Change the Home contract first. Require this reading order: thesis/profile, impact, career rail, selected Case Studies, capabilities, About/Insights pathways, Learning preview, conversion. Require `/case-studies`, `/about`, `/insights`, `/learning`, `/contact`, and `/resume` to remain reachable.

- [ ] Remove duplicate separate Work/Product preview sections and replace them with one selected Case Studies section using the normalized summaries from Task 4. Do not duplicate a record to satisfy layout.

- [ ] Keep the existing quantified impact evidence, but remove the disputed IIFL baseline. Preserve the current Learning cards and text by rendering the same loader results through existing components.

- [ ] Add restrained shared micro-interactions: buttons lift at most 2px, arrows travel at most 4px, cards lift at most 4px, and current-page underline animates within 200ms. Focus styles must be at least as visible as hover styles.

- [ ] Use `Reveal` only for deliberate sections; preserve its `initial={false}` SSR-final contract. Do not wrap every section in Motion.

- [ ] Run Home journey checks in JavaScript-on, no-JavaScript, and reduced-motion modes.

```bash
pnpm vitest run tests/unit/homepage.test.tsx tests/unit/reveal.test.tsx
pnpm playwright test tests/e2e/home-journey.spec.ts tests/e2e/reduced-motion.spec.ts --project=chromium --workers=1
```

Expected: GREEN; every secondary route remains visible outside Primary navigation, and all Home content is SSR-visible.

- [ ] Commit.

```bash
git add portfolio/app/'(site)'/page.tsx portfolio/components/home portfolio/tests/unit/homepage.test.tsx portfolio/tests/e2e/home-journey.spec.ts portfolio/app/globals.css
git commit -m "feat: restructure the portfolio home journey"
```

---

### Task 8: Enhance long-form reading and case-study navigation

**Files:**
- Create: `portfolio/components/ui/reading-progress.tsx`
- Create: `portfolio/components/content/evidence-collapsible.tsx`
- Create: `portfolio/components/content/related-content-navigation.tsx`
- Modify: `portfolio/components/content/case-study-layout.tsx`
- Modify: `portfolio/components/content/product-detail.tsx`
- Modify: `portfolio/components/content/article-layout.tsx`
- Modify: `portfolio/components/content/table-of-contents.tsx`
- Modify: `portfolio/app/(site)/work/[slug]/page.tsx`
- Modify: `portfolio/app/(site)/products/[slug]/page.tsx`
- Create: `portfolio/tests/unit/long-form-enhancements.test.tsx`
- Create: `portfolio/tests/e2e/long-form-enhancements.spec.ts`

**Interfaces:**

```ts
type ReadingProgressProps = { label?: string };
type RelatedContentNavigationProps = {
  previous?: { href: string; label: string };
  next?: { href: string; label: string };
};
```

- [ ] Add RED tests for a decorative progressbar with a textual accessible name, valid previous/next links inside each content category, a keyboard-operable small-screen TOC Collapsible, and all important outcomes visible by default.

- [ ] Implement Reading Progress from document scroll metrics. Render width `100%` only as a client-updated transform after hydration; use `scaleX(0)` with `transform-origin:left`, never hide content. Under reduced motion, update without interpolation.

- [ ] Use the Radix primitive for supporting-detail/TOC collapsing on small screens. Keep the desktop TOC open and keep outcomes outside collapsed panels.

- [ ] Calculate previous and next items on the server from manifest order; do not mix Work and Product canonical paths inside the detail sequence.

- [ ] Verify unknown slugs remain branded 404s and inactive product destinations remain omitted.

```bash
pnpm vitest run tests/unit/long-form-enhancements.test.tsx tests/unit/work-pages.test.tsx tests/unit/product-pages.test.tsx
pnpm playwright test tests/e2e/long-form-enhancements.spec.ts tests/e2e/work.spec.ts tests/e2e/product.spec.ts --project=chromium --workers=1
```

Expected: GREEN; reading enhancements never gate text and canonical detail routes are unchanged.

- [ ] Commit.

```bash
git add portfolio/components/ui/reading-progress.tsx portfolio/components/content/evidence-collapsible.tsx portfolio/components/content/related-content-navigation.tsx portfolio/components/content/case-study-layout.tsx portfolio/components/content/product-detail.tsx portfolio/components/content/article-layout.tsx portfolio/components/content/table-of-contents.tsx portfolio/app/'(site)'/work/'[slug]'/page.tsx portfolio/app/'(site)'/products/'[slug]'/page.tsx portfolio/tests/unit/long-form-enhancements.test.tsx portfolio/tests/e2e/long-form-enhancements.spec.ts
git commit -m "feat: enhance long-form case study reading"
```

---

### Task 9: Add copy-email feedback while retaining direct contact

**Files:**
- Create: `portfolio/components/contact/copy-email.tsx`
- Modify: `portfolio/app/(site)/contact/page.tsx`
- Modify: `portfolio/tests/unit/about-contact-resume.test.tsx`
- Modify: `portfolio/tests/e2e/conversion.spec.ts`

**Interface:**

```ts
type CopyEmailProps = {
  email: string;
};
```

- [ ] Add RED tests requiring the mailto link to exist independently of the copy button, success feedback in a polite live region, no false success when clipboard rejects, and no form.

- [ ] Implement `CopyEmail` as a small client enhancement. Use Lucide `Copy`/`Check`, restore the label after 2 seconds, clear timers on unmount, and catch clipboard errors without hiding or altering the mailto link.

- [ ] Add no-JavaScript browser coverage that finds and follows `mailto:shantanu.msp@gmail.com`; JavaScript coverage stubs clipboard and observes `Email copied`.

```bash
pnpm vitest run tests/unit/about-contact-resume.test.tsx
pnpm playwright test tests/e2e/conversion.spec.ts --project=chromium --workers=1
```

Expected: GREEN; direct email, LinkedIn, HTML Resume, and PDF actions all remain.

- [ ] Commit.

```bash
git add portfolio/components/contact/copy-email.tsx portfolio/app/'(site)'/contact/page.tsx portfolio/tests/unit/about-contact-resume.test.tsx portfolio/tests/e2e/conversion.spec.ts
git commit -m "feat: add resilient copy email feedback"
```

---

### Task 10: Update metadata, structured data, and Vercel telemetry

**Files:**
- Modify: `portfolio/app/layout.tsx`
- Modify: `portfolio/app/(site)/page.tsx`
- Modify: `portfolio/app/(site)/resume/page.tsx`
- Modify: `portfolio/app/(site)/case-studies/page.tsx`
- Modify: `portfolio/lib/metadata.ts`
- Modify: `portfolio/lib/structured-data.ts`
- Modify: `portfolio/app/sitemap.ts`
- Modify: `portfolio/tests/unit/metadata.test.ts`
- Modify: `portfolio/tests/unit/structured-data.test.ts`
- Modify: `portfolio/tests/e2e/metadata.spec.ts`

- [ ] Add RED metadata tests for Home/Resume/Case Studies self-canonicals and revised titles, `/case-studies` sitemap membership, redirect-index exclusion, and Person/ProfilePage `image` resolving to the local portrait URL.

- [ ] Add a telemetry unit test that renders neither SDK off Vercel and both SDKs when `process.env.VERCEL === '1'`. Mock packages; do not rely on network requests in unit tests.

- [ ] Update metadata and structured data without changing truthful Work/Product/Article/Course category behavior.

- [ ] Render platform SDKs after application content only in a Vercel environment:

```tsx
const isVercel = process.env.VERCEL === "1";
return <html><body>{children}{isVercel ? <><Analytics /><SpeedInsights /></> : null}</body></html>;
```

- [ ] Run raw-output checks so canonicals, portrait URL, JSON-LD, sitemap, and robots are in initial build output. Treat package rendering as wiring, not proof that project-level collection is enabled.

```bash
pnpm vitest run tests/unit/metadata.test.ts tests/unit/structured-data.test.ts
pnpm playwright test tests/e2e/metadata.spec.ts --project=chromium --workers=1
pnpm build
```

Expected: GREEN; 17 public canonical detail/content routes remain discoverable after replacing two index routes with one.

- [ ] Commit.

```bash
git add portfolio/app/layout.tsx portfolio/app/'(site)'/page.tsx portfolio/app/'(site)'/resume/page.tsx portfolio/app/'(site)'/case-studies/page.tsx portfolio/lib/metadata.ts portfolio/lib/structured-data.ts portfolio/app/sitemap.ts portfolio/tests/unit/metadata.test.ts portfolio/tests/unit/structured-data.test.ts portfolio/tests/e2e/metadata.spec.ts
git commit -m "feat: align portfolio metadata and telemetry"
```

---

### Task 11: Preserve Learning exactly and regenerate the public Resume PDF

**Files:**
- Create: `portfolio/tests/unit/learning-content-lock.test.tsx`
- Modify: `portfolio/tests/e2e/learning-insights.spec.ts`
- Modify: `portfolio/components/content/resume-document.tsx`
- Modify: `portfolio/public/shantanu-chandra-resume.pdf`
- Modify: `portfolio/tests/e2e/resume-pdf.spec.ts`
- Create or update: `.superpowers/sdd/2026-08-23-shantanu-personal-brand-portfolio/reference-redesign-resume-report.md`

- [ ] Before touching Learning rendering, snapshot the approved source-derived visible contract in a test: three exact slugs, titles, descriptions, audiences, outcomes, four ordered module labels each, body section headings/text hashes, and structured-data eligibility. The test reads loader output rather than duplicating implementation internals.

- [ ] Run the Learning lock before and after shared styling changes.

```bash
pnpm vitest run tests/unit/learning-content-lock.test.tsx tests/unit/learning.test.tsx
pnpm playwright test tests/e2e/learning-insights.spec.ts --project=chromium --workers=1
```

Expected before final changes: GREEN. If it fails after shared-shell work, restore the changed Learning text/order rather than updating the lock unless the approved spec explicitly requires it.

- [ ] Add Resume RED assertions for both Builder roles/periods, `12+ years`, supported education/credentials, products, methods, and the narrowed IIFL statement. Reassert absence of private/removed/conflicted facts.

- [ ] Start a fresh isolated production server from a clean build for PDF generation.

```bash
pnpm build
PORT=3423 pnpm start
```

- [ ] Immediately before the first PDF authoring/generation command, invoke the PDF skill's artifact-operation marker exactly once for one edited PDF. Do not invoke it during retries. Then generate from the semantic Resume:

```bash
pnpm render:resume -- http://127.0.0.1:3423
```

- [ ] Inspect the generated artifact with `pdfinfo`, `pdftotext`, and `pdfinfo -url`. Render every page to PNG at 150 DPI and inspect every image for clipping, overlap, broken glyphs, blank pages, stranded headings, inconsistent margins, and page-transition defects. Confirm A4, 12mm margins, expected mailto/LinkedIn annotations, `%PDF`, and no private/removed/conflicted strings.

- [ ] Verify browser download behavior and that no rendered PDF link creates a background RSC prefetch request.

```bash
pnpm playwright test tests/e2e/resume-pdf.spec.ts tests/e2e/conversion.spec.ts --project=chromium --workers=1
pnpm validate:public
```

Expected: GREEN; generated PDF is byte-served as `application/pdf`, all public links work, and no source resume is published.

- [ ] Record page count, dimensions, byte size, SHA-256, visual inspection result, text scan, and link scan in the resume report; remove all temporary PNG/text inspection files.

- [ ] Commit.

```bash
git add portfolio/tests/unit/learning-content-lock.test.tsx portfolio/tests/e2e/learning-insights.spec.ts portfolio/components/content/resume-document.tsx portfolio/public/shantanu-chandra-resume.pdf portfolio/tests/e2e/resume-pdf.spec.ts .superpowers/sdd/2026-08-23-shantanu-personal-brand-portfolio/reference-redesign-resume-report.md
git commit -m "feat: publish reconciled portfolio resume"
```

---

### Task 12: Close all-browser, accessibility, responsive, and performance gates

**Files:**
- Modify: `portfolio/tests/e2e/accessibility.spec.ts`
- Modify: `portfolio/tests/e2e/responsive.spec.ts`
- Modify: `portfolio/tests/e2e/reduced-motion.spec.ts`
- Modify: `portfolio/tests/e2e/public-copy.spec.ts`
- Modify: `portfolio/tests/e2e/route-inventory.ts`
- Modify: `portfolio/playwright.config.ts` only if a deterministic new route requires configuration, never to weaken retries/timeouts/assertions
- Modify: `portfolio/scripts/check-lighthouse.ts` only if route selection must change, never to lower budgets

- [ ] Extend route inventory from sitemap and assert it contains `/case-studies`, all four Work details, both Product details, all four Learning routes, both Insight routes, About, Contact, Resume, and Home; assert `/work` and `/products` indexes are absent from the canonical inventory but separately return 308.

- [ ] Extend reduced-motion/no-JavaScript coverage to the profile tilt, role text, filters, career rail, reading progress, Reveal, timeline emphasis, collapsible, and copy-email fallback. For normal-motion positive controls, inspect actual Web Animations and require the approved easing/timing/translation bounds.

- [ ] Run the full local gate from an unused isolated port with sequential browser workers.

```bash
PLAYWRIGHT_PORT=3223 pnpm verify
```

Expected: GREEN for lint, typecheck, all unit tests, content/public validators, production build, and Chromium/Firefox/WebKit E2E with zero retries required.

- [ ] Run the link gate against a fresh production server. Confirm redirect fragments, all sitemap routes, local portrait, PDF, OG image, mailto/LinkedIn syntax, Wasabi semantic destination, and absence of Card Compass external URL.

```bash
# Terminal A
pnpm build && pnpm start --port 3224

# Terminal B
pnpm check:links -- http://127.0.0.1:3224
```

- [ ] Run Lighthouse on Home and Case Studies without lowering budgets.

```bash
PORTFOLIO_AUDIT_URL=http://127.0.0.1:3224 pnpm audit
pnpm audit:check
PORTFOLIO_AUDIT_URL=http://127.0.0.1:3224/case-studies pnpm audit
pnpm audit:check
```

Expected: performance at least 0.90; accessibility, SEO, and best practices 1.00. Record LCP/CLS/TBT as lab diagnostics and do not claim INP or field CWV.

- [ ] Capture and inspect Home, Case Studies, Learning, Resume, and Contact at 390×844 and 1440×900. Programmatically assert no page overflow at 320, 390, 768, 1024, and 1440 across every sitemap route and all three browsers.

- [ ] Remove `.lighthouse`, `test-results`, screenshots, browser cookie files, and server logs; preserve only committed reports and the generated public PDF.

- [ ] Commit test/gate changes.

```bash
git add portfolio/tests portfolio/scripts/check-lighthouse.ts portfolio/playwright.config.ts
git commit -m "test: verify reference-structure portfolio redesign"
```

---

### Task 13: Update the tabular parity audit and verify a protected Preview live

**Files:**
- Modify: `docs/original-build-coverage-audit.md`
- Create: `.superpowers/sdd/2026-08-23-shantanu-personal-brand-portfolio/reference-redesign-report.md`
- Modify: `portfolio/README.md`

- [ ] Update `docs/original-build-coverage-audit.md` with a final table whose rows cover every reference tab/behavior, current implementation route/component, status (`Matched`, `Adapted`, `Preserved`, or `Intentionally excluded`), verification evidence, and rationale. Include separate rows for all three Learning details and their unchanged-content lock.

- [ ] Add a second table mapping every original portfolio route/content record to its final discoverability path. Explicitly show all four employer cases, both products, three Learning pages, one Insight, About, Contact, semantic Resume, PDF, redirects, sitemap inclusion, and active demo/external-destination status.

- [ ] Run the plan self-review before deployment:

```bash
git diff --check
rg -n "TBD|TODO|handle appropriately|similar to|one week|one hour|Dubai|relocat" docs/superpowers/plans/2026-08-23-reference-structure-portfolio-redesign.md portfolio/app portfolio/components portfolio/content portfolio/public --glob '!*.pdf'
git status --short
```

Expected: no incomplete instruction text or prohibited public claim; intentional plan prose describing banned terms may appear only in this plan and must be reviewed manually.

- [ ] Commit the audit/report preparation before deployment.

```bash
git add docs/original-build-coverage-audit.md portfolio/README.md .superpowers/sdd/2026-08-23-shantanu-personal-brand-portfolio/reference-redesign-report.md
git commit -m "docs: confirm portfolio redesign parity"
```

- [ ] Confirm the linked Vercel target is exactly `shantanuchandras-projects/shantanu-chandra-portfolio`, `.vercel/` is ignored/untracked, the worktree is clean, and HEAD is the commit to deploy.

- [ ] Deploy a Preview with the explicit target only:

```bash
vercel deploy --target=preview --yes --scope shantanuchandras-projects
```

Expected: deployment target `preview`, status `Ready`; no production/custom-domain/protection mutation.

- [ ] Use the in-app browser against the new protected Preview. Verify authenticated app content rather than the SSO interstitial, at mobile and desktop widths:
  - exact five Primary tabs and mobile keyboard/focus behavior;
  - Home portrait, stable fallback, role text, profile tilt, impact, rail, selected evidence, About/Insights/Learning paths, and conversion;
  - Case Studies six cards, filters, both anchors, all six internal detail links, Wasabi live demo, and Card Compass non-link state;
  - exact Learning index plus all three detail routes and unchanged visible content;
  - Resume HTML/PDF, Contact copy-email and mailto fallback;
  - metadata/JSON-LD, sitemap, robots, OG 1200×630 PNG, no prohibited copy, no overflow, and no serious/critical axe issues;
  - Analytics/Speed Insights requests may fail closed under preview protection/ad blocking, but must not affect rendering or navigation.

- [ ] Keep unauthenticated Preview protection intact. Do not create, rotate, or delete protection bypasses unless separate authority is granted.

- [ ] Append the exact HEAD SHA, deployment ID/URL, target/readiness, local gate counts, live route/asset counts, Lighthouse results, telemetry observation, and limitations to the report. If report content changes, commit it and create a new explicit Preview so the reported source SHA equals the deployed SHA.

- [ ] Finish with a clean worktree and report the protected Preview URL. Do not promote it.

---

## Plan Self-Review

- [x] Spec coverage: all seventeen approved design sections map to executable tasks, including the five-tab IA, route redirects, portrait, unified Case Studies, preserved Learning, reconciled Resume/PDF, micro-interactions, accessibility, metadata, telemetry, gates, audit table, and preview-only boundary.
- [x] Completeness scan: every step names a concrete file, command, assertion, or output; there are no abbreviated implementation references to another task in place of required behavior.
- [x] Type and naming consistency: `CaseStudyKind`, `CaseStudyFilter`, `CaseStudySummary`, `CareerRole`, `SignalProfileCardProps`, `RoleTypewriterProps`, `ReadingProgressProps`, and `CopyEmailProps` have one spelling and one ownership point.
- [x] Route consistency: Primary navigation uses `/case-studies`; `/work` and `/products` indexes redirect; detail routes stay canonical; sitemap and browser route inventory use the same rule.
- [x] Safety consistency: Learning text is locked before shared changes; all PDF links retain prefetch suppression; source PDFs remain private; Preview deployment is explicit; no production/domain/protection action is included.
- [x] Verification consistency: each production change begins with a failing focused contract and ends with focused GREEN, while Tasks 12–13 provide full local, three-browser, artifact, performance, and protected-live evidence.
