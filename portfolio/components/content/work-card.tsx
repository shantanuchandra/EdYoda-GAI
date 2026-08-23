/* eslint-disable no-unused-vars, no-undef -- the inherited Babel parser does not apply JSX/TypeScript scope analysis. */
import Link from "next/link";
import type { ContentItem } from "@/lib/content/schema";

type WorkCardProps = {
  item: ContentItem;
};

function publicCompanyName(company?: string): string {
  return company === "Builder" ? "Builder.ai" : (company ?? "Employer work");
}

export function WorkCard({ item }: WorkCardProps) {
  const { metadata } = item;
  const outcome = metadata.outcomes[0];
  const href = `/work/${metadata.slug}`;

  return (
    <article className="group flex h-full min-h-[360px] flex-col rounded-card border border-line bg-surface p-[clamp(24px,4vw,36px)] transition-[border-color,box-shadow,translate] duration-200 ease-[var(--ease-out)] hover:-translate-y-1 hover:border-teal hover:shadow-[0_18px_48px_rgb(16_37_34_/_9%)] focus-within:-translate-y-1 focus-within:border-teal focus-within:shadow-[0_18px_48px_rgb(16_37_34_/_9%)]">
      <div className="flex items-center justify-between gap-4 text-teal">
        <p className="m-0 text-xs font-extrabold tracking-[0.1em] uppercase">{publicCompanyName(metadata.company)}</p>
        <span aria-hidden="true">↗</span>
      </div>
      <h3 className="mt-7 mb-0 font-display text-[clamp(1.7rem,3vw,2.25rem)] leading-[1.05] font-semibold tracking-[-0.025em]">
        <Link className="no-underline" href={href}>{metadata.title}</Link>
      </h3>
      <p className="mt-[18px] mb-7 text-[0.94rem] text-muted-ink">{metadata.description}</p>
      {outcome ? (
        <p className="mt-auto mb-0 grid gap-[5px] border-t border-line pt-5">
          <strong className="font-display text-[1.65rem] leading-[1.1] text-copper">{outcome.value}</strong>
          <span className="text-xs text-muted-ink">{outcome.label}</span>
          {outcome.qualifier ? <small className="text-xs text-muted-ink italic">{outcome.qualifier}</small> : null}
        </p>
      ) : null}
      <Link className="mt-5 text-xs font-bold text-teal-dark underline underline-offset-4" href={href}>
        Read case study <span aria-hidden="true">→</span>
      </Link>
    </article>
  );
}
