/* eslint-disable no-unused-vars, no-undef -- the inherited Babel parser does not apply JSX/TypeScript scope analysis. */
import Link from "next/link";
import type { ContentItem } from "@/lib/content/schema";

type LearningPathCardProps = {
  item: ContentItem;
};

export function LearningPathCard({ item }: LearningPathCardProps) {
  const { metadata } = item;
  const href = `/learning/${metadata.slug}`;

  return (
    <article className="group flex h-full min-h-[390px] flex-col rounded-card border border-line bg-surface p-[clamp(24px,4vw,34px)] transition-[border-color,box-shadow,translate] duration-200 ease-[var(--ease-out)] hover:-translate-y-1 hover:border-teal hover:shadow-[0_18px_48px_rgb(16_37_34_/_9%)] focus-within:-translate-y-1 focus-within:border-teal focus-within:shadow-[0_18px_48px_rgb(16_37_34_/_9%)]">
      <p className="m-0 text-xs font-extrabold tracking-[0.1em] text-teal uppercase">For {metadata.audience}</p>
      <h3 className="mt-7 mb-0 font-display text-[clamp(1.7rem,3vw,2.25rem)] leading-[1.05] font-semibold tracking-[-0.025em]">
        <Link className="no-underline" href={href}>{metadata.title}</Link>
      </h3>
      <p className="mt-[18px] mb-6 text-[0.9rem] text-muted-ink">{metadata.description}</p>
      <ul aria-label={`${metadata.title} methods`} className="mt-auto mb-7 flex flex-wrap gap-2 p-0 [list-style:none]">
        {metadata.methods.slice(0, 3).map((method) => (
          <li className="rounded-full border border-line px-[9px] py-1 text-[0.68rem] text-muted-ink" key={method}>{method}</li>
        ))}
      </ul>
      <Link className="mt-auto text-xs font-bold text-teal-dark underline underline-offset-4" href={href}>
        Explore path <span aria-hidden="true">→</span>
      </Link>
    </article>
  );
}
