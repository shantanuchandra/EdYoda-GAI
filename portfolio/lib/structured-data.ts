/* eslint-disable no-unused-vars, no-undef -- the inherited Babel parser does not recognize TypeScript declarations or runtime globals. */
import type { ContentItem, ContentKind } from "@/lib/content/schema";
import { getSiteUrl, siteConfig } from "@/lib/site-config";
import { socialImagePath } from "@/lib/metadata";

type JsonLd = Record<string, unknown>;

const routePrefix: Record<ContentKind, string> = {
  work: "/work",
  products: "/products",
  learning: "/learning",
  insights: "/insights",
};

function absoluteUrl(path: string): string {
  return new URL(path, getSiteUrl()).toString();
}

function personReference(): JsonLd {
  return {
    "@id": absoluteUrl("/#person"),
    "@type": "Person",
    name: siteConfig.name,
  };
}

function getVisibleLearningModules(body: string): string[] {
  const lines = body.split(/\r?\n/);
  const visibleLines: string[] = [];
  let fence: { marker: "`" | "~"; length: number } | null = null;

  for (const line of lines) {
    if (fence) {
      const closingFence = line.match(/^ {0,3}(`{3,}|~{3,})[ \t]*$/);
      if (closingFence && closingFence[1][0] === fence.marker && closingFence[1].length >= fence.length) {
        fence = null;
      }
      continue;
    }

    const openingFence = line.match(/^ {0,3}(`{3,}|~{3,})/);
    if (openingFence) {
      fence = {
        marker: openingFence[1][0] as "`" | "~",
        length: openingFence[1].length,
      };
      continue;
    }

    if (/^(?: {4}|\t)/.test(line)) continue;
    visibleLines.push(line);
  }

  const sectionStart = visibleLines.findIndex((line) => /^##[ \t]+Launch modules[ \t]*$/.test(line));

  if (sectionStart < 0) return [];

  const modules: string[] = [];
  for (const line of visibleLines.slice(sectionStart + 1)) {
    if (/^ {0,3}#{1,6}(?:[ \t]+|$)/.test(line)) break;

    const listItem = line.match(/^[-*+][ \t]+(.+)$/);
    if (listItem) modules.push(listItem[1].trim());
  }

  return modules;
}

export function buildPersonJsonLd({
  path,
  pageName,
  description,
}: {
  path: "/" | "/about";
  pageName: string;
  description: string;
}): JsonLd {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": absoluteUrl("/#person"),
        name: siteConfig.name,
        jobTitle: siteConfig.descriptor,
        url: absoluteUrl("/"),
        sameAs: [siteConfig.linkedin],
      },
      {
        "@type": "ProfilePage",
        "@id": absoluteUrl(`${path}#profile-page`),
        name: pageName,
        description,
        url: absoluteUrl(path),
        mainEntity: { "@id": absoluteUrl("/#person") },
      },
    ],
  };
}

export function buildCreativeWorkJsonLd(item: ContentItem, kind: "work" | "products" | "learning"): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: item.metadata.title,
    description: item.metadata.description,
    url: absoluteUrl(`${routePrefix[kind]}/${item.metadata.slug}`),
    author: personReference(),
  };
}

export function buildArticleJsonLd(item: ContentItem): JsonLd {
  if (!item.metadata.publishedAt) {
    throw new Error(`Article ${item.metadata.slug} requires a publishedAt date`);
  }

  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: item.metadata.title,
    description: item.metadata.description,
    datePublished: item.metadata.publishedAt,
    author: personReference(),
    image: absoluteUrl(socialImagePath),
    mainEntityOfPage: absoluteUrl(`/insights/${item.metadata.slug}`),
  };
}

export function buildLearningJsonLd(item: ContentItem): JsonLd {
  const { audience, outcomes, methods } = item.metadata;
  const visibleModules = getVisibleLearningModules(item.body);
  const modulesMatch = visibleModules.length === 4
    && methods.length === 4
    && visibleModules.every((module, index) => module === methods[index]);
  const isCompleteCourse = Boolean(audience && outcomes[0]?.label && modulesMatch);

  if (!isCompleteCourse) {
    return buildCreativeWorkJsonLd(item, "learning");
  }

  return {
    "@context": "https://schema.org",
    "@type": "Course",
    name: item.metadata.title,
    description: item.metadata.description,
    url: absoluteUrl(`/learning/${item.metadata.slug}`),
    provider: personReference(),
    audience: { "@type": "Audience", audienceType: audience },
    teaches: outcomes[0].label,
    hasPart: visibleModules.map((name) => ({ "@type": "CreativeWork", name })),
  };
}
