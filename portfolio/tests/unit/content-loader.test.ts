import { expect, it } from "vitest";
import { assertSafeMdx, compileContent } from "@/lib/content/loader";
import { contentFrontmatterSchema } from "@/lib/content/schema";
import { extractHeadings } from "@/lib/content/slugify-heading";
import { validWorkFrontmatter } from "@/tests/fixtures/content";

it("blocks executable or imported MDX", () => {
  expect(() => assertSafeMdx('import Secret from "../../secret"')).toThrow("MDX imports and exports are not allowed");
  expect(() => assertSafeMdx('<script>alert("x")</script>')).toThrow("Executable MDX is not allowed");
});

it("blocks JavaScript URLs in Markdown links", () => {
  expect(() => assertSafeMdx('[unsafe](javascript:alert("x"))')).toThrow("JavaScript URLs are not allowed in MDX");
});

it("blocks expression-valued JSX URLs", () => {
  expect(() => assertSafeMdx('<a href={"javascript:alert(1)"}>unsafe</a>')).toThrow("MDX URL expressions are not allowed");
});

it("blocks JavaScript URLs in angle-bracket Markdown destinations", () => {
  expect(() => assertSafeMdx("[unsafe](<javascript:alert(1)>)")).toThrow("JavaScript URLs are not allowed in MDX");
});

it("does not compile private content", async () => {
  await expect(
    compileContent({
      metadata: contentFrontmatterSchema.parse({ ...validWorkFrontmatter, public: false }),
      body: "## Private draft",
      headings: [],
    }),
  ).rejects.toThrow("Only public content can be compiled");
});

it("extracts stable table-of-contents headings", () => {
  expect(extractHeadings("## Context\n\n## Signal, system & scale")).toEqual([
    { depth: 2, id: "context", label: "Context" },
    { depth: 2, id: "signal-system-scale", label: "Signal, system & scale" },
  ]);
});
