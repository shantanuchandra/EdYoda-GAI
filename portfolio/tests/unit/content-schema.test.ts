/* eslint-disable no-undef -- the inherited Babel parser treats TypeScript's `as const` syntax as an identifier. */
import { describe, expect, it } from "vitest";
import { contentFrontmatterSchema } from "@/lib/content/schema";
import {
  validInsightFrontmatter,
  validLearningFrontmatter,
  validProductFrontmatter,
  validWorkFrontmatter,
} from "@/tests/fixtures/content";

describe("contentFrontmatterSchema", () => {
  it("requires an explicit public flag", () => {
    const { public: omitted, ...withoutPublic } = validWorkFrontmatter;
    expect(contentFrontmatterSchema.safeParse(withoutPublic).success).toBe(false);
  });

  it("requires confidentiality notes", () => {
    const { confidentialityNotes: omitted, ...withoutNotes } = validWorkFrontmatter;
    expect(contentFrontmatterSchema.safeParse(withoutNotes).success).toBe(false);
  });

  it("rejects unsupported content categories", () => {
    expect(contentFrontmatterSchema.safeParse({ ...validWorkFrontmatter, category: "course-marketplace" }).success).toBe(false);
  });

  it("rejects JavaScript external URLs", () => {
    expect(contentFrontmatterSchema.safeParse({ ...validProductFrontmatter, externalUrl: "javascript:alert(1)" }).success).toBe(false);
  });

  it("rejects data external URLs", () => {
    expect(contentFrontmatterSchema.safeParse({ ...validProductFrontmatter, externalUrl: "data:text/html,test" }).success).toBe(false);
  });

  it("accepts HTTPS external URLs", () => {
    expect(contentFrontmatterSchema.safeParse(validProductFrontmatter).success).toBe(true);
  });

  it.each([
    ["employer work", validWorkFrontmatter],
    ["independent product", validProductFrontmatter],
    ["learning path", validLearningFrontmatter],
    ["insight", validInsightFrontmatter],
  ])("accepts a complete %s record", (_label, fixture) => {
    expect(contentFrontmatterSchema.safeParse(fixture).success).toBe(true);
  });

  it.each(["company", "role", "period", "industry", "outcomes", "methods"] as const)(
    "requires employer-work %s",
    (field) => {
      const { [field]: omitted, ...record } = validWorkFrontmatter;
      expect(contentFrontmatterSchema.safeParse(record).success).toBe(false);
    },
  );

  it.each(["industry", "outcomes", "methods"] as const)("rejects empty employer-work %s", (field) => {
    expect(contentFrontmatterSchema.safeParse({ ...validWorkFrontmatter, [field]: [] }).success).toBe(false);
  });

  it.each(["status", "outcomes", "methods"] as const)("requires independent-product %s", (field) => {
    const { [field]: omitted, ...record } = validProductFrontmatter;
    expect(contentFrontmatterSchema.safeParse(record).success).toBe(false);
  });

  it.each(["outcomes", "methods"] as const)("rejects empty independent-product %s", (field) => {
    expect(contentFrontmatterSchema.safeParse({ ...validProductFrontmatter, [field]: [] }).success).toBe(false);
  });

  it("requires an external URL for an active independent product", () => {
    const { externalUrl: omitted, ...record } = validProductFrontmatter;
    expect(contentFrontmatterSchema.safeParse(record).success).toBe(false);
  });

  it("rejects an external URL for a case-study-only independent product", () => {
    expect(contentFrontmatterSchema.safeParse({
      ...validProductFrontmatter,
      status: "case-study-only",
    }).success).toBe(false);
  });

  it.each(["audience", "outcomes", "methods"] as const)("requires learning %s", (field) => {
    const { [field]: omitted, ...record } = validLearningFrontmatter;
    expect(contentFrontmatterSchema.safeParse(record).success).toBe(false);
  });

  it("requires a non-empty learning outcome", () => {
    expect(contentFrontmatterSchema.safeParse({ ...validLearningFrontmatter, outcomes: [] }).success).toBe(false);
  });

  it.each([3, 5])("requires exactly four learning modules, not %i", (moduleCount) => {
    expect(contentFrontmatterSchema.safeParse({
      ...validLearningFrontmatter,
      methods: Array.from({ length: moduleCount }, (_, index) => `Module ${index + 1}`),
    }).success).toBe(false);
  });

  it.each(["publishedAt", "updatedAt"] as const)("requires insight %s", (field) => {
    const { [field]: omitted, ...record } = validInsightFrontmatter;
    expect(contentFrontmatterSchema.safeParse(record).success).toBe(false);
  });
});
