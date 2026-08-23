/* eslint-disable no-undef -- the inherited Babel parser treats TypeScript's `as const` syntax as an identifier. */
export const validWorkFrontmatter = {
  slug: "verified-work",
  title: "Verified employer transformation",
  description: "A verified employer transformation with a measurable outcome and explicit public-release controls.",
  category: "employer-work",
  company: "Example employer",
  industry: ["Enterprise software"],
  role: "Product leader",
  period: "Jan 2025–Present",
  outcomes: [{ value: "2×", label: "Verified improvement" }],
  methods: ["Product discovery"],
  featured: false,
  public: true,
  confidentialityNotes: "Synthetic unit-test record with no employer-confidential details.",
  seo: {
    title: "Verified employer transformation case study",
    description: "A synthetic test record used to verify the portfolio content schema and explicit public-release requirements.",
  },
} as const;

export const validProductFrontmatter = {
  slug: "verified-product",
  title: "Verified independent product",
  description: "A verified independent product with measurable evidence and an honest operating status.",
  category: "independent-product",
  industry: ["Consumer Product"],
  status: "active",
  outcomes: [{ value: "100", label: "Verified users" }],
  methods: ["Product discovery"],
  featured: false,
  externalUrl: "https://example.com/product",
  public: true,
  confidentialityNotes: "Synthetic unit-test record with no employer involvement or confidential details.",
  seo: {
    title: "Verified independent product story",
    description: "A synthetic test record used to verify independent-product publishing requirements and public-release controls.",
  },
} as const;

export const validLearningFrontmatter = {
  slug: "verified-learning-path",
  title: "Verified practical learning path",
  description: "A verified practical learning path with a clear audience, outcome, and four launch modules.",
  category: "learning",
  industry: ["Learning"],
  status: "active",
  audience: "Product leaders",
  outcomes: [{ value: "Practical outcome", label: "Apply the framework to one operating workflow" }],
  methods: ["Opportunity framing", "System design", "Evaluation", "Adoption planning"],
  featured: false,
  public: true,
  confidentialityNotes: "Synthetic unit-test learning record with no commerce or credential claims.",
  seo: {
    title: "Verified practical learning path",
    description: "A synthetic test record used to verify Learning Lab publishing requirements and public-release controls.",
  },
} as const;

export const validInsightFrontmatter = {
  slug: "verified-insight",
  title: "Verified practical product insight",
  description: "A verified practical insight with explicit publication and update dates for public readers.",
  category: "insight",
  industry: ["Product Strategy"],
  outcomes: [{ value: "Signal → System → Scale", label: "A practical product framework" }],
  methods: ["Opportunity framing"],
  featured: false,
  publishedAt: "2026-08-23",
  updatedAt: "2026-08-23",
  public: true,
  confidentialityNotes: "Synthetic unit-test insight with no employer-confidential details.",
  seo: {
    title: "Verified practical product insight",
    description: "A synthetic test record used to verify insight publication dates and explicit public-release controls.",
  },
} as const;
