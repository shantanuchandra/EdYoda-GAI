/* eslint-disable no-unused-vars, no-undef -- the inherited Babel parser does not recognize imports used by JSX or TypeScript. */
import Link from "next/link";
import type { ContentItem } from "@/lib/content/schema";

type InsightCardProps = { item: ContentItem };

export function formatPublicationDate(date: string): string {
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "long",
    timeZone: "UTC",
    year: "numeric",
  }).format(new Date(`${date}T00:00:00Z`));
}

export function InsightCard({ item }: InsightCardProps) {
  const { metadata } = item;
  const href = `/insights/${metadata.slug}`;

  return (
    <article className="rounded-card border border-line bg-surface p-[clamp(24px,5vw,44px)]">
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs font-extrabold tracking-[0.1em] text-teal uppercase">
        <span>Insight</span>
        {metadata.publishedAt ? <time dateTime={metadata.publishedAt}>{formatPublicationDate(metadata.publishedAt)}</time> : null}
      </div>
      <h2 className="mt-6 mb-0 max-w-[900px] font-display text-[clamp(2rem,5vw,4rem)] font-medium tracking-[-0.03em] leading-[1.02]">
        <Link className="no-underline" href={href}>{metadata.title}</Link>
      </h2>
      <p className="reading-measure mt-5 mb-8 text-muted-ink">{metadata.description}</p>
      <Link className="inline-flex min-h-11 items-center text-sm font-bold text-teal-dark underline underline-offset-4" href={href}>
        Read insight <span aria-hidden="true" className="ml-2">→</span>
      </Link>
    </article>
  );
}
