/* eslint-disable no-unused-vars -- the inherited Babel parser does not recognize TypeScript type-only imports. */
import type { Heading } from "@/lib/content/schema";

function slugifyHeading(label: string): string {
  return label
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function extractHeadings(body: string): Heading[] {
  const occurrences = new Map<string, number>();
  const headings: Heading[] = [];

  for (const match of body.matchAll(/^(#{2,3})\s+(.+?)\s*#*\s*$/gm)) {
    const depth = match[1].length as 2 | 3;
    const label = match[2].trim();
    const baseId = slugifyHeading(label);

    if (!baseId) {
      continue;
    }

    const occurrence = (occurrences.get(baseId) ?? 0) + 1;
    occurrences.set(baseId, occurrence);
    headings.push({ depth, id: occurrence === 1 ? baseId : `${baseId}-${occurrence}`, label });
  }

  return headings;
}
