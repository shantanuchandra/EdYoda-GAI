/* eslint-disable no-undef -- the inherited Babel parser does not model the Node.js test runtime. */
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { extractText } from "unpdf";
import { expect, it } from "vitest";

it("keeps the downloadable public resume to two substantive pages without excluded employer labels", async () => {
  const pdf = await readFile(join(process.cwd(), "public", "shantanu-chandra-resume.pdf"));
  const result = await extractText(new Uint8Array(pdf), { mergePages: false });

  expect(result.totalPages).toBe(2);
  expect(result.text.join("\n")).toContain("Hakuhodo");
  expect(result.text.join("\n")).not.toMatch(/Covalent|\bAGL\b/);
  result.text.forEach((pageText) => expect(pageText.trim().length).toBeGreaterThan(300));
});
