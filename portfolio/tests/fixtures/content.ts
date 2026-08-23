/* eslint-disable no-undef -- the inherited Babel parser treats TypeScript's `as const` syntax as an identifier. */
export const validWorkFrontmatter = {
  slug: "verified-work",
  title: "Verified employer transformation",
  description: "A verified employer transformation with a measurable outcome and explicit public-release controls.",
  category: "employer-work",
  company: "Example employer",
  industry: ["Enterprise software"],
  role: "Product leader",
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
