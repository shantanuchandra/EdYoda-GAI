/* eslint-disable no-unused-vars -- the inherited Babel parser does not recognize TypeScript type-only imports. */
import { readFile } from "node:fs/promises";
import process from "node:process";
import path from "node:path";
import { cache } from "react";
import matter from "gray-matter";
import { contentManifest } from "@/content/manifest";
import {
  contentFrontmatterSchema,
  type ContentItem,
  type ContentKind,
  type PublicContent,
} from "@/lib/content/schema";
import { extractHeadings } from "@/lib/content/slugify-heading";

const categoryByKind: Record<ContentKind, PublicContent["category"]> = {
  work: "employer-work",
  products: "independent-product",
  learning: "learning",
  insights: "insight",
};

function contentDirectory(): string {
  return path.resolve(process.cwd(), "content");
}

function resolveManifestPath(manifestPath: string): string {
  const root = contentDirectory();
  const resolved = path.resolve(root, manifestPath);
  const relative = path.relative(root, resolved);

  if (
    path.isAbsolute(manifestPath) ||
    !manifestPath.endsWith(".mdx") ||
    relative === "" ||
    relative.startsWith(`..${path.sep}`) ||
    path.isAbsolute(relative)
  ) {
    throw new Error(`Unsafe content manifest path: ${manifestPath}`);
  }

  return resolved;
}

export function assertSafeMdx(body: string): void {
  if (/^\s*(?:import|export)\s/m.test(body)) {
    throw new Error("MDX imports and exports are not allowed");
  }

  if (/<\s*script\b/i.test(body) || /\son[a-z][a-z0-9:-]*\s*=/i.test(body)) {
    throw new Error("Executable MDX is not allowed");
  }

  if (/(?:\b(?:href|src)\s*=\s*(?:["']\s*)?|\]\(\s*)javascript\s*:/i.test(body)) {
    throw new Error("JavaScript URLs are not allowed in MDX");
  }
}

async function readContentItem(kind: ContentKind, manifestPath: string): Promise<ContentItem> {
  const filePath = resolveManifestPath(manifestPath);
  const source = await readFile(filePath, "utf8");
  const parsed = matter(source);
  assertSafeMdx(parsed.content);

  const metadata = contentFrontmatterSchema.parse(parsed.data);
  if (metadata.category !== categoryByKind[kind]) {
    throw new Error(`Content category does not match the ${kind} manifest bucket: ${manifestPath}`);
  }

  return { metadata, body: parsed.content, headings: extractHeadings(parsed.content) };
}

const readAllContent = cache(async (): Promise<Map<ContentKind, ContentItem[]>> => {
  const itemsByKind = new Map<ContentKind, ContentItem[]>();
  const slugs = new Set<string>();

  for (const kind of Object.keys(contentManifest) as ContentKind[]) {
    const items = await Promise.all(contentManifest[kind].map((manifestPath) => readContentItem(kind, manifestPath)));

    for (const item of items) {
      if (slugs.has(item.metadata.slug)) {
        throw new Error(`Duplicate content slug in manifest: ${item.metadata.slug}`);
      }
      slugs.add(item.metadata.slug);
    }

    itemsByKind.set(kind, items);
  }

  return itemsByKind;
});

export async function getPublicContent(kind: ContentKind): Promise<ContentItem[]> {
  return (await readAllContent()).get(kind)?.filter((item) => item.metadata.public === true) ?? [];
}

export async function getContentBySlug(kind: ContentKind, slug: string): Promise<ContentItem | null> {
  return (await getPublicContent(kind)).find((item) => item.metadata.slug === slug) ?? null;
}

export async function getPublicSlugs(kind: ContentKind): Promise<string[]> {
  return (await getPublicContent(kind)).map((item) => item.metadata.slug);
}

export async function compileContent(item: ContentItem): Promise<React.ReactNode> {
  assertSafeMdx(item.body);
  const { compileMDX } = await import("next-mdx-remote/rsc");
  const { content } = await compileMDX({ source: item.body, options: { parseFrontmatter: false } });
  return content;
}

export async function validateAllContent(): Promise<{ files: number; publicFiles: number }> {
  const itemsByKind = await readAllContent();
  const items = [...itemsByKind.values()].flat();

  return {
    files: items.length,
    publicFiles: items.filter((item) => item.metadata.public === true).length,
  };
}
