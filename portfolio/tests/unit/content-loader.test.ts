import { expect, it } from "vitest";
import { assertSafeMdx } from "@/lib/content/loader";
import { extractHeadings } from "@/lib/content/slugify-heading";

it("blocks executable or imported MDX", () => {
  expect(() => assertSafeMdx('import Secret from "../../secret"')).toThrow("MDX imports and exports are not allowed");
  expect(() => assertSafeMdx('<script>alert("x")</script>')).toThrow("Executable MDX is not allowed");
});

it("blocks JavaScript URLs in Markdown links", () => {
  expect(() => assertSafeMdx('[unsafe](javascript:alert("x"))')).toThrow("JavaScript URLs are not allowed in MDX");
});

it("extracts stable table-of-contents headings", () => {
  expect(extractHeadings("## Context\n\n## Signal, system & scale")).toEqual([
    { depth: 2, id: "context", label: "Context" },
    { depth: 2, id: "signal-system-scale", label: "Signal, system & scale" },
  ]);
});
