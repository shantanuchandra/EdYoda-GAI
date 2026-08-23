import { describe, expect, it } from "vitest";
import { contentFrontmatterSchema } from "@/lib/content/schema";
import { validWorkFrontmatter } from "@/tests/fixtures/content";

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
});
