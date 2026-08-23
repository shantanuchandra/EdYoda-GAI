# Shantanu Chandra Personal Brand Portfolio — Design Specification

## Document status

- **Status:** Approved design, ready for implementation planning
- **Date:** 23 August 2026
- **Owner and public brand:** Shantanu Chandra
- **Primary source:** `SC_Enterprise_AI_Product_Transformation_Resume_Dubai.pdf`
- **Reference reviewed:** `https://portfolio-website-lac-alpha-44.vercel.app/`
- **Launch learning brand:** Shantanu Chandra Learning Lab

## 1. Purpose

Build a personal portfolio website that establishes Shantanu Chandra as an AI Transformation Leader with cross-industry experience. The website must help executive recruiters, founders, operators, prospective collaborators, and learners quickly understand:

1. who Shantanu is;
2. which business transformations he has led;
3. how he turns AI opportunities into adopted, measurable, responsibly governed products;
4. which independent products and learning materials he is building; and
5. how to contact him or download his resume.

This is a new public identity, not a redesign of the former educational website. EdYoda must not appear in public page copy, site titles, navigation, metadata, downloadable assets, or visual identity. The supplied resume is an internal fact source and is not copied directly into the public site. Teaching experience may be described generically when relevant, without using the EdYoda name or brand.

## 2. Product outcome

Within 10–15 seconds, a first-time visitor should understand that Shantanu is an enterprise AI product and transformation leader whose work spans retail, lending, AdTech, SaaS, and enterprise software.

The primary visitor journey is:

```text
Positioning → quantified proof → relevant case study → leadership approach → contact or resume
```

The secondary journey is:

```text
Positioning → independent products or learning → deeper content → follow or contact
```

The learning platform supports the personal brand. It must demonstrate applied expertise without making the homepage look like a course marketplace.

## 3. Audience and conversion priorities

### 3.1 Primary audiences

| Audience | What they need to establish | Desired action |
|---|---|---|
| Executive recruiters and hiring leaders | Scope, seniority, industries, leadership, measurable outcomes | View a case study, download the resume, or contact Shantanu |
| Founders and enterprise operators | Ability to move from AI opportunity to operational adoption | Review work or products and start a conversation |
| Product and AI leaders | Practical product judgment, governance, delivery, and scale | Read a case study or insight and connect |

### 3.2 Secondary audience

Learners and emerging AI builders should be able to discover structured, practical learning material through the Learning section, while still understanding that the site belongs to an active transformation leader and builder.

### 3.3 Conversion hierarchy

1. **Primary:** Contact Shantanu.
2. **Secondary:** Explore selected work.
3. **Tertiary:** Download the resume, view independent products, or explore learning material.

## 4. Brand positioning and messaging

### 4.1 Brand architecture

- **Master brand:** Shantanu Chandra
- **Professional descriptor:** AI Transformation Leader
- **Learning property:** Shantanu Chandra Learning Lab
- **Independent products:** Presented as work built by Shantanu, not as separate competing brands in the main navigation

### 4.2 Homepage hero copy

**Eyebrow:** AI Transformation Leader

**Headline:**

> I turn complex AI opportunities into adopted, measurable and responsibly governed products.

**Supporting line:**

> Across retail, lending, AdTech, SaaS and enterprise software.

- **Primary action:** Explore selected work
- **Secondary action:** Contact me
- **Utility action:** Download resume

Version 1 omits relocation and availability claims from the hero. The Contact or About page may state a current location or relocation status only after Shantanu verifies the wording immediately before launch.

### 4.3 Voice principles

- Write in the first person.
- Lead with evidence before adjectives.
- Prefer clear business language over AI jargon.
- Pair product outcomes with the operating context that made them difficult.
- State Shantanu’s role and team scope precisely.
- Separate public facts from interpretation.
- Avoid superlatives such as “top 1%,” unsupported market leadership claims, and generic phrases such as “AI visionary.”
- Do not imply sole ownership of outcomes delivered by a team or employer.

### 4.4 Core narrative

The site should consistently show a repeatable transformation pattern:

```text
Signal → System → Scale
```

- **Signal:** Find the business problem, user friction, or operational constraint worth solving.
- **System:** Design the product, workflow, data path, evaluation method, and human controls.
- **Scale:** Drive adoption, measure outcomes, govern risk, and improve the system in production.

This is the signature visual and narrative motif across the homepage, capability sections, and case studies.

## 5. Content truth and evidence rules

### 5.1 Canonical source

Career claims and metrics originate from the supplied resume. Before publication, every claim must be checked against that source and approved public wording. Employer-confidential detail must not be inferred or exposed.

### 5.2 Approved proof points for launch

The homepage impact strip may use these four concise metrics with contextual labels:

| Metric | Public context |
|---|---|
| **200 stores** | Hindi and English voice-guided eye-test experience deployed across Lenskart stores |
| **1 week → 20 minutes** | Employed-customer approval journey at IIFL |
| **70% less manual work** | Manual campaign work across five commerce platforms at AGL |
| **50 → 25,000** | Monthly completed onboardings in six months at Builder.ai |

Supporting case-study content may also use verified facts from the resume, including:

- across 1,000 controlled and 1,000 live-store tests, 95% of voice-guided eye-test results matched a licensed optometrist’s prescription within the accepted industry tolerance, with an optometrist approving every final prescription;
- a three-times-faster on-device rule engine;
- recruiter evaluation time reduced from eight weeks to one week across 300 candidates;
- a RAG assistant used by 2,000 sales users, resolving 80% of roughly 100 weekly questions at the cited confidence threshold;
- campaign onboarding reduced from months to one week, 50% adoption, and ROAS increasing from 1.3× to 1.7×;
- 12,500 users buying at least one month of service in month six of the conversational AI product rollout;
- more than 75% reduction in testing time at Pantheon;
- WasabiTravels with more than 2,000 curated places; and
- CardCompass with 121 early-access users.

The final wording must preserve qualifiers, populations, comparison periods, and confidence thresholds whenever those details materially affect interpretation.

### 5.3 Content classification

Every work item must carry one of these public classifications:

- **Employer work** — a clearly attributed professional engagement;
- **Independent product** — a product Shantanu built independently;
- **Learning material** — educational content authored by Shantanu; or
- **Insight** — an article or viewpoint.

Employer, independent, and educational work must never be visually or verbally blended in a way that obscures ownership or context.

### 5.4 Confidentiality gate

Each content record must include `public: true | false` and `confidentialityNotes`. Only records explicitly marked `public: true` may be rendered or included in generated routes, search indexes, sitemaps, social metadata, or feeds. Missing `public` values must fail validation rather than default to public.

## 6. Information architecture

### 6.1 Primary navigation

The persistent navigation is:

1. Work
2. Products
3. Learning
4. Insights
5. About
6. Contact

The brand mark is the text “Shantanu Chandra” and links to the homepage. “Resume” is available as a visible utility action but is not required as a seventh primary navigation item.

### 6.2 Route model

| Route | Purpose |
|---|---|
| `/` | Portfolio overview and primary conversion page |
| `/work` | Index of public employer case studies |
| `/work/[case]` | One evidence-led transformation case study |
| `/products` | Index of independent products and applied AI builds |
| `/products/[product]` | Product story, status, evidence, and external link where applicable |
| `/learning` | Shantanu Chandra Learning Lab overview and learning paths |
| `/learning/[path]` | One structured learning path or resource collection |
| `/insights` | Articles and practical viewpoints |
| `/insights/[article]` | One article |
| `/about` | Leadership story, principles, cross-industry experience, and career chronology |
| `/contact` | Direct contact options and availability context |
| `/resume` | Branded HTML resume with a prominent PDF download |

The route indexes must have useful launch content. Empty sections should not appear in the primary navigation until at least one public entry exists.

### 6.3 Homepage sequence

1. Global header
2. Hero and calls to action
3. Quantified impact strip
4. Featured work
5. Transformation capabilities
6. Industry experience
7. Independent products
8. Shantanu Chandra Learning Lab
9. Operating principles and “Signal → System → Scale”
10. Career snapshot
11. Contact callout
12. Footer

## 7. Page and section design

### 7.1 Global header

- Text wordmark on the left.
- Primary navigation on desktop.
- Clear “Contact” action.
- Compact accessible menu on small screens.
- The header is sticky with a solid canvas background and bottom border: 64 pixels high on small screens and 72 pixels high from the desktop breakpoint. Anchored sections include the matching scroll offset.
- Current route is communicated visually and with `aria-current`.

### 7.2 Hero

The hero must prioritize positioning and proof over decoration. It contains the exact launch copy from section 4.2, two prominent actions, and the resume utility action. Use a current professional portrait only after Shantanu approves the source image. Until then, ship a complete typography-led hero with the “Signal → System → Scale” diagram; do not use a stock portrait or placeholder silhouette.

No animated typewriter, rotating title, decorative AI brain, robot, autoplay video, or continuously moving background is permitted.

### 7.3 Impact strip

Display the four launch metrics as large, scannable proof points. Each number must include a short context label; standalone numbers are not sufficient. On narrow screens the strip becomes a one- or two-column list without horizontal scrolling.

### 7.4 Featured work

Launch with four featured employer stories:

1. Lenskart — AI-assisted retail and store operations;
2. IIFL — lending journeys and enterprise AI assistance;
3. AGL — AI-enabled AdTech operations; and
4. Builder.ai — conversational AI product scale.

Each card contains:

- company and industry;
- short transformation statement;
- Shantanu’s role;
- one or two outcomes;
- relevant methods or capabilities; and
- a clear “Read case study” link.

Use the case-study title and explicit “Read case study” text as links. Do not wrap the entire card in an additional link. Critical information must not be hidden behind hover.

### 7.5 Capabilities

Capabilities are framed as transformation responsibilities, not a software keyword cloud:

- AI product strategy and portfolio prioritization;
- workflow and operating-model redesign;
- product discovery and adoption;
- RAG, agentic systems, and evaluation design;
- human review, governance, and responsible deployment;
- cross-functional product and engineering leadership; and
- measurement, iteration, and scale.

### 7.6 Industries

Show retail, lending, AdTech, SaaS, and enterprise software as contextual experience. Each industry label should link to or identify relevant work. Avoid claiming equal depth in every sector where the resume does not support it.

### 7.7 Independent products

Launch with:

- **WasabiTravels** — curated travel discovery with more than 2,000 places;
- **CardCompass** — credit-card discovery with 121 early-access users; and
- a flexible **Applied AI Builds** collection for public experiments that have sufficient evidence and explanation.

Products must show status such as active, in development, archived, or case study only. Dead or unavailable external links must be replaced with a case-study destination and an honest status label.

### 7.8 Learning

The learning section is branded “Shantanu Chandra Learning Lab” and launches with three pathways:

1. Applied AI for non-technical professionals;
2. AI product transformation for product leaders; and
3. Practical agents for founders and operators.

Each pathway describes the audience, learning outcome, format, and available material. Existing materials may be migrated only through an explicit public allowlist and must be rewritten to match Shantanu’s personal brand. Repository folder names or historical EdYoda visual branding must never leak into the public interface.

### 7.9 About and career

The About page combines a concise first-person story with a chronological career view. It emphasizes the evolution from software and product roles into enterprise AI leadership, plus independent building and teaching. It includes leadership scale only where verified, such as managing six product managers and leading 25 engineers and data scientists across three squads in the relevant IIFL context.

### 7.10 Contact

Version 1 uses direct, dependable contact methods:

- email link;
- LinkedIn link; and
- resume download.

No database, contact-form backend, CRM, scheduling product, or email service is required for version 1. If a form or external integration is added later, it requires a separate privacy, spam-protection, failure-state, and data-retention design.

## 8. Case-study content model

Every employer case study follows the same proof-led sequence:

1. **Context** — organization, industry, user or operating environment;
2. **Opportunity** — the business or user problem;
3. **Role** — Shantanu’s accountability, collaborators, and boundaries;
4. **Approach** — product choices, workflow, and delivery method;
5. **Governance** — evaluation, human review, controls, and risk decisions;
6. **Adoption** — how the product entered real workflows;
7. **Outcome** — quantified results with appropriate qualifiers;
8. **Lessons** — transferable product and transformation judgment.

Case studies must not become chronological project diaries. They should make the decision logic and operating change understandable to a senior reader in approximately three to five minutes.

### 8.1 Case-study metadata

```ts
type WorkCaseStudy = {
  slug: string;
  title: string;
  description: string;
  company: string;
  industry: string[];
  role: string;
  period?: string;
  outcomes: Array<{
    value: string;
    label: string;
    qualifier?: string;
  }>;
  methods: string[];
  featured: boolean;
  public: boolean;
  confidentialityNotes: string;
  heroImage?: ImageReference;
  seo: SeoMetadata;
};
```

### 8.2 Shared content metadata

Products, learning paths, and insights use typed schemas with these common fields:

```ts
type PublicContent = {
  slug: string;
  title: string;
  description: string;
  category: "employer-work" | "independent-product" | "learning" | "insight";
  industries?: string[];
  outcomes?: Outcome[];
  methods?: string[];
  publishedAt?: string;
  updatedAt?: string;
  public: boolean;
  confidentialityNotes: string;
  image?: ImageReference;
  seo: SeoMetadata;
};
```

The build must validate required fields, unique slugs, allowed categories, public status, image references, and metadata lengths.

## 9. Visual identity

### 9.1 Direction

The visual language is calm, editorial, precise, and enterprise-first. It should feel like an experienced operator’s portfolio, not a generic SaaS landing page or an AI-generated template.

### 9.2 Color system

Use this light-first launch palette:

| Semantic token | Value | Primary use |
|---|---:|---|
| `canvas` | `#F4F1EA` | Page background |
| `surface` | `#FCFBF7` | Cards and inset content |
| `ink` | `#151A18` | Primary text |
| `muted-ink` | `#5B6561` | Secondary text |
| `teal` | `#0E5A55` | Primary actions, links, data emphasis |
| `teal-dark` | `#083F3B` | Hover/active actions and dark accents |
| `sand` | `#D9C6A2` | Soft highlights and diagrams |
| `copper` | `#9A5134` | Small decorative or data accents only |
| `line` | `#CDD2CC` | Borders and separators |
| `dark-section` | `#102522` | Selected narrative sections |
| `on-dark` | `#F7F3EA` | Primary content on dark sections |
| `on-dark-muted` | `#C8D3CE` | Secondary content on dark sections |

`copper` is not used for normal-size text. All token pairings, including hover, focus, disabled, and dark-section states, must pass WCAG 2.2 AA contrast checks in their actual sizes. Color is never the only carrier of meaning.

### 9.3 Typography

- Use **Newsreader** for display headings and short editorial statements.
- Use **Manrope** for body copy, navigation, metrics, labels, and controls.
- Load both through the Next.js font system so production serves the font assets locally.
- Body copy starts at 17 pixels with approximately 1.65 line height; long-form text uses a maximum measure of 68 characters.
- The homepage `h1` uses responsive sizing from 48 pixels on small screens to 84 pixels on wide screens, with restrained negative tracking and no all-caps treatment.
- Avoid condensed display type, all-caps paragraphs, and low-contrast oversized copy.

### 9.4 Shape, spacing, and elevation

- Use a 4-pixel base spacing scale with primary section gaps of 80–128 pixels on desktop and 56–80 pixels on small screens.
- Use 12-pixel radii for cards and 999-pixel radii only for small labels or pills.
- Buttons use 10-pixel radii rather than fully rounded capsule shapes.
- Prefer borders and tonal surface changes over shadows. When elevation is required for an open mobile menu, use one soft shadow with low opacity.
- Focus rings use a 3-pixel high-contrast outline with a 2-pixel offset.

### 9.5 Layout

- Use an asymmetric 12-column desktop grid.
- Preserve generous whitespace and clear section rhythm.
- Let metrics and decision diagrams provide visual emphasis.
- On mobile, collapse to a coherent single-column reading order rather than preserving desktop asymmetry.
- Use dark sections sparingly to mark a narrative transition, not on every band.

### 9.6 Imagery

Priority order:

1. a current, professional portrait;
2. approved product screenshots or contextual imagery;
3. simplified original diagrams; and
4. restrained abstract texture when no documentary asset exists.

Do not fabricate employer product interfaces or imply access to confidential systems. If an approved screenshot is unavailable, use a clearly illustrative workflow diagram rather than a fake UI.

### 9.7 Motion

Motion supports orientation and hierarchy only:

- short entrance transitions for major sections;
- subtle metric or diagram progression when visible;
- restrained hover and focus feedback; and
- no essential information gated by animation.

Respect `prefers-reduced-motion`, avoid layout-shifting entrance effects, and do not use marquees, parallax-heavy scenes, flip cards, or perpetual animation.

Transitions run for 160–220 milliseconds with standard ease-out timing. Section entrances may use opacity and no more than 12 pixels of vertical translation, execute once, and become immediate under reduced-motion preferences.

## 10. Reusable interface components

The implementation must establish these reusable components:

- `SiteHeader` and `MobileNavigation`;
- `SiteFooter`;
- `Hero`;
- `ActionLink` and `ButtonLink`;
- `ImpactMetric` and `ImpactStrip`;
- `WorkCard` and `WorkGrid`;
- `ProductCard`;
- `LearningPathCard`;
- `InsightCard`;
- `CapabilityList`;
- `IndustryIndex`;
- `SignalSystemScaleDiagram` with a semantic text alternative;
- `CareerTimeline`;
- `CaseStudyHeader` and `CaseStudySection`;
- `OutcomeList`;
- `Breadcrumbs`;
- `TableOfContents` for long-form pages;
- `EmptyState` for unpublished index categories;
- `NotFoundContent`; and
- metadata and structured-data helpers.

Components remain server-rendered by default. Add a client boundary only where interaction requires browser state, specifically the mobile menu and purposeful in-view motion.

## 11. Technical architecture

### 11.1 Application boundary

Create the new public application inside a dedicated `portfolio/` directory. This isolates the personal brand from the existing repository’s educational source material and prevents accidental publication of unrelated files.

```text
portfolio/
├── app/
│   ├── (site)/
│   ├── work/
│   ├── products/
│   ├── learning/
│   ├── insights/
│   ├── about/
│   ├── contact/
│   ├── resume/
│   ├── not-found.tsx
│   ├── layout.tsx
│   ├── sitemap.ts
│   └── robots.ts
├── components/
├── content/
│   ├── work/
│   ├── products/
│   ├── learning/
│   └── insights/
├── lib/
│   ├── content/
│   ├── metadata/
│   └── validation/
├── public/
├── styles/
├── tests/
└── vercel.ts
```

The Vercel project root must be configured to `portfolio/`; the repository root must not be deployed as the public site.

### 11.2 Stack

- Next.js App Router;
- TypeScript with strict checking;
- Tailwind CSS driven by semantic design tokens;
- accessible headless primitives only where native HTML is insufficient;
- MDX for case studies, learning paths, and insights;
- Next.js Image and Font systems;
- minimal Motion usage for purposeful transitions; and
- Vercel using the default Node.js Fluid Compute runtime where runtime work is needed.

Most routes should be statically generated. Version 1 needs no database, authentication, CMS, or custom API.

### 11.3 Data flow

```text
Allowlisted MDX/content records
        ↓
Typed schema validation
        ↓
Filter public === true
        ↓
Static route generation and page rendering
        ↓
Metadata, sitemap, JSON-LD, and internal indexes
```

Validation runs before route generation. A record with invalid metadata, a missing referenced asset, an unknown category, a duplicate slug, or an absent public flag must fail the build with a file-specific error.

### 11.4 Vercel configuration

Use `vercel.ts` with `@vercel/config` only for configuration that is not already expressed by the Next.js project. Version 1 should keep configuration minimal. No Edge runtime declaration should be added; use the default Node.js/Fluid Compute behavior.

Before development or deployment, update the local Vercel CLI from 58.9.4 to the current release with one of:

```bash
npm i -g vercel@latest
pnpm add -g vercel@latest
```

### 11.5 Content import boundary

Existing learning material is not automatically part of the site. Migration requires an explicit manifest that maps each approved source file to a public content record. Directory crawling must not publish arbitrary repository content. Files not listed in the manifest are excluded from builds, search, sitemaps, and metadata.

## 12. Accessibility and responsive behavior

The launch target is WCAG 2.2 AA.

Required behaviors:

- semantic landmarks and heading order;
- a visible-on-focus skip link;
- complete keyboard navigation;
- strong visible focus indicators;
- no hover-only content or controls;
- touch targets of at least 44×44 CSS pixels where applicable;
- minimum 4.5:1 contrast for normal text and compliant contrast for large text and UI components;
- meaningful alternative text for informative imagery and empty alt text for decoration;
- labels and accessible names for every control;
- reduced-motion support; and
- links whose purpose is clear outside color alone.

Test at representative widths including 320, 390, 768, 1024, and 1440 pixels. Content must remain usable under text zoom and should not introduce unintended horizontal scrolling.

## 13. Performance requirements

Launch performance targets at the 75th percentile are:

- Largest Contentful Paint below 2.5 seconds;
- Cumulative Layout Shift below 0.1; and
- Interaction to Next Paint below 200 milliseconds.

Implementation rules:

- ship progressive semantic HTML;
- keep client JavaScript limited to genuine interaction;
- reserve image dimensions and serve responsive formats;
- preload only the critical font assets;
- self-host fonts;
- avoid autoplay media and continuous animation;
- lazy-load below-the-fold media; and
- keep third-party scripts out of the critical path.

## 14. Search, social, and structured data

Every public route requires:

- a unique title and meta description;
- a canonical URL;
- Open Graph and social-preview metadata;
- a purposeful share image or an approved site-wide fallback;
- inclusion in the generated sitemap when indexable; and
- correct robots behavior.

Use JSON-LD only when page content supports it:

- `Person` and `ProfilePage` for the personal brand and About page;
- `Article` for insights;
- `CreativeWork` or a more specific supported type for case studies and products; and
- `Course` only for a learning path that actually meets the course definition.

Structured data must not add claims, ratings, organizations, or credentials that are absent from visible content.

## 15. Error and empty states

- Unknown dynamic slugs render the branded 404 page.
- A missing content asset or invalid record fails the build rather than silently rendering a broken card.
- Index pages hide categories with no public entries and provide a useful empty state if reached directly.
- External product links are checked before launch; unavailable destinations are labeled honestly or removed.
- Resume download failure must leave the HTML resume usable.
- Contact links must remain plain, copyable, and functional without JavaScript.

## 16. Privacy and security

- Publish no private email beyond the address deliberately selected for public contact.
- Do not publish phone numbers, home addresses, private documents, source CV paths, credentials, analytics secrets, or repository internals.
- Sanitize or strictly control MDX components; do not execute arbitrary embedded scripts.
- Use dependency and build checks before deployment.
- Do not add tracking beyond an explicitly approved, privacy-conscious analytics configuration.
- No learner accounts, form submissions, or personal-data storage exist in version 1.

## 17. Verification plan

### 17.1 Automated checks

1. Type checking and linting pass.
2. Production build succeeds from `portfolio/`.
3. Content schema validation passes for every published item.
4. Missing public flags, assets, metadata, and duplicate slugs fail the build.
5. Internal-link and approved external-link checks pass.
6. Route tests cover every index, published dynamic route, `/resume`, and the branded 404.
7. Automated accessibility tests report no serious or critical violations on representative pages.
8. Sitemap, robots rules, canonical URLs, and structured data are validated.

### 17.2 Manual checks

1. Verify every public fact against the supplied resume and approved case-study wording.
2. Verify that EdYoda is absent throughout public navigation, metadata, social images, page copy, and downloadable assets.
3. Complete keyboard-only navigation on desktop and mobile-menu layouts.
4. Inspect at 320, 390, 768, 1024, and 1440 pixels.
5. Test reduced motion, text zoom, and focus visibility.
6. Confirm contact, LinkedIn, resume viewing, and PDF download.
7. Review employer content for confidentiality and appropriate attribution.
8. Run Lighthouse or equivalent checks against a production-mode build and the Vercel preview.
9. Review the social preview for the homepage and one item from each public content type.

## 18. Launch acceptance criteria

The portfolio is ready to launch when:

- the homepage communicates the agreed positioning in 10–15 seconds;
- four contextualized impact metrics are visible without requiring hover;
- all four featured employer stories are published with approved public content;
- visitors can reach a relevant case study in one interaction from the homepage;
- employer work, independent products, learning, and insights are unmistakably differentiated;
- the resume and contact actions are easy to find on desktop and mobile;
- Shantanu Chandra Learning Lab is discoverable without dominating the professional identity;
- no EdYoda name or branding appears in the public build;
- all published claims are verified and appropriately qualified;
- accessibility, responsive, content, metadata, and production-build checks pass; and
- the Vercel preview is reviewed before production promotion.

## 19. Explicit version-one exclusions

Version 1 does not include:

- authentication or learner accounts;
- a database or CMS;
- paid courses or checkout;
- contact-form storage or CRM integration;
- AI chat or personalized recommendations;
- community features;
- automated migration of all existing educational content;
- fabricated employer screenshots; or
- a separate EdYoda-branded experience.

These exclusions keep the first release focused on credibility, proof, and direct relationship-building. Any later addition should preserve the personal-brand hierarchy and pass a separate design review.
