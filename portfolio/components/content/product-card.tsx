/* eslint-disable no-unused-vars, no-undef -- the inherited Babel parser does not apply JSX/TypeScript scope analysis. */
import Link from "next/link";
import type { ContentItem } from "@/lib/content/schema";

type ProductCardProps = {
  item: ContentItem;
};

export function ProductCard({ item }: ProductCardProps) {
  const { metadata } = item;
  const outcome = metadata.outcomes[0];
  const href = metadata.externalUrl ?? `/products/${metadata.slug}`;

  return (
    <Link className="group block text-inherit no-underline" href={href}>
      <article className="flex h-full min-h-[390px] flex-col rounded-card border border-line bg-surface p-[clamp(24px,4vw,34px)] transition-[border-color,box-shadow,translate] duration-200 ease-[var(--ease-out)] group-hover:-translate-y-1 group-hover:border-teal group-hover:shadow-[0_18px_48px_rgb(16_37_34_/_9%)] group-focus-visible:-translate-y-1 group-focus-visible:border-teal group-focus-visible:shadow-[0_18px_48px_rgb(16_37_34_/_9%)]">
        <p className="m-0 text-xs font-extrabold tracking-[0.1em] text-teal uppercase">Independent product</p>
        <h3 className="mt-7 mb-0 font-display text-[clamp(1.7rem,3vw,2.25rem)] leading-[1.05] font-semibold tracking-[-0.025em]">
          {metadata.title}
        </h3>
        <p className="mt-[18px] mb-6 text-[0.9rem] text-muted-ink">{metadata.description}</p>
        {outcome ? (
          <p className="mt-auto mb-6 grid gap-[3px] border-t border-line pt-5">
            <strong className="font-display text-[1.6rem] text-copper">{outcome.value}</strong>
            <span className="text-xs text-muted-ink">{outcome.label}</span>
          </p>
        ) : null}
        <span className="mt-auto text-xs font-bold text-teal-dark underline underline-offset-4">
          Visit product <span aria-hidden="true">↗</span>
        </span>
      </article>
    </Link>
  );
}
