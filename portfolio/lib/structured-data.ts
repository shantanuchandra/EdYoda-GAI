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
  const isCompleteCourse = Boolean(audience && outcomes[0]?.label && methods.length === 4);

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
    hasPart: methods.map((name) => ({ "@type": "CreativeWork", name })),
  };
}
