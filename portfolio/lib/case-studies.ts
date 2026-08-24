/* eslint-disable no-unused-vars, no-undef -- the inherited Babel parser does not recognize TypeScript declarations. */
import { getPublicContent } from "@/lib/content/loader";
import type { ContentItem } from "@/lib/content/schema";

export type CaseStudyKind = "employer" | "product";
export type CaseStudyFilter = "all" | "employer" | "product" | "retail" | "financial-services" | "adtech" | "saas";

export type CaseStudySummary = {
  id: string;
  kind: CaseStudyKind;
  slug: string;
  href: `/work/${string}` | `/products/${string}`;
  title: string;
  description: string;
  company?: string;
  industry: string;
  outcome: { value: string; label: string };
  status?: "active" | "in-development" | "archived" | "case-study-only";
  externalUrl?: string;
};

function toSummary(item: ContentItem, kind: CaseStudyKind): CaseStudySummary {
  const metadata = item.metadata;
  const outcome = metadata.outcomes[0] ?? { value: "Evidence-led", label: "Operating context" };
  const href: CaseStudySummary["href"] = kind === "employer"
    ? `/work/${metadata.slug}`
    : `/products/${metadata.slug}`;

  return {
    id: `${kind}:${metadata.slug}`,
    kind,
    slug: metadata.slug,
    href,
    title: metadata.title,
    description: metadata.description,
    ...(kind === "employer" ? { company: metadata.company } : {}),
    industry: metadata.industry.join(" · "),
    outcome: { value: outcome.value, label: outcome.label },
    ...(kind === "product" ? { status: metadata.status, externalUrl: metadata.externalUrl } : {}),
  };
}

export async function getCaseStudySummaries(): Promise<readonly CaseStudySummary[]> {
  const [work, products] = await Promise.all([getPublicContent("work"), getPublicContent("products")]);
  const summaries = [
    ...work.map((item) => toSummary(item, "employer")),
    ...products.map((item) => toSummary(item, "product")),
  ];
  const ids = new Set<string>();

  for (const summary of summaries) {
    if (ids.has(summary.id)) throw new Error(`Duplicate Case Studies record: ${summary.id}`);
    ids.add(summary.id);
    if (summary.kind === "product" && summary.status === "case-study-only" && summary.externalUrl) {
      throw new Error(`Inactive product cannot expose an external URL: ${summary.id}`);
    }
  }

  return summaries;
}
