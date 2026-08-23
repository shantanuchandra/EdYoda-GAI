/* eslint-disable no-unused-vars, no-undef -- the inherited Babel parser does not recognize TypeScript type-only imports or runtime globals. */
import type { MetadataRoute } from "next";
import { getPublicContent } from "@/lib/content/loader";
import type { ContentKind } from "@/lib/content/schema";
import { getSiteUrl } from "@/lib/site-config";

const staticPaths = ["/", "/work", "/products", "/learning", "/insights", "/about", "/contact", "/resume"];
const contentKinds: ContentKind[] = ["work", "products", "learning", "insights"];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const publicContent = await Promise.all(contentKinds.map(async (kind) => ({
    kind,
    items: await getPublicContent(kind),
  })));

  return [
    ...staticPaths.map((path) => ({ url: new URL(path, getSiteUrl()).toString() })),
    ...publicContent.flatMap(({ kind, items }) => items.map(({ metadata }) => ({
      url: new URL(`/${kind}/${metadata.slug}`, getSiteUrl()).toString(),
      ...(metadata.updatedAt || metadata.publishedAt
        ? { lastModified: metadata.updatedAt ?? metadata.publishedAt }
        : {}),
    }))),
  ];
}
