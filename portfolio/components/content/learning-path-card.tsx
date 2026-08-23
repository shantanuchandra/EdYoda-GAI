/* eslint-disable no-unused-vars, no-undef -- the inherited Babel parser does not apply JSX/TypeScript scope analysis. */
import Link from "next/link";
import type { ContentItem } from "@/lib/content/schema";

type LearningPathCardProps = {
  headingLevel: 2 | 3;
  item: ContentItem;
};

const headingClassName = "mt-7 mb-0 font-display text-[clamp(1.7rem,3vw,2.25rem)] leading-[1.05] font-semibold tracking-[-0.025em]";

export function LearningPathCard({ headingLevel, item }: LearningPathCardProps) {
  const { metadata } = item;
  const href = `/learning/${metadata.slug}`;
  const outcome = metadata.outcomes[0];
  const titleLink = <Link className="no-underline" href={href}>{metadata.title}</Link>;

  return (
    <article className="group flex h-full min-h-[480px] flex-col rounded-card border border-line bg-surface p-[clamp(24px,4vw,34px)] transition-[border-color,box-shadow,translate] duration-200 ease-[var(--ease-out)] hover:-translate-y-1 hover:border-teal hover:shadow-[0_18px_48px_rgb(16_37_34_/_9%)] focus-within:-translate-y-1 focus-within:border-teal focus-within:shadow-[0_18px_48px_rgb(16_37_34_/_9%)]">
      <p className="m-0 text-[0.68rem] font-extrabold tracking-[0.1em] text-teal uppercase">Audience</p>
      <p className="mt-2 mb-0 text-sm font-bold text-teal-dark">{metadata.audience}</p>
      {headingLevel === 2 ? (
        <h2 className={headingClassName}>{titleLink}</h2>
      ) : (
        <h3 className={headingClassName}>{titleLink}</h3>
      )}
      {outcome ? (
        <div className="mt-6 border-l-2 border-sand pl-4">
          <p className="m-0 text-[0.68rem] font-extrabold tracking-[0.1em] text-teal uppercase">Outcome</p>
          <p className="mt-2 mb-0 text-sm leading-6 text-ink">{outcome.label}</p>
        </div>
      ) : null}
      <p className="mt-7 mb-0 text-[0.68rem] font-extrabold tracking-[0.1em] text-teal uppercase">Launch modules</p>
      <ul aria-label={`${metadata.title} launch modules`} className="mt-3 mb-7 grid gap-2 p-0 [list-style:none]">
        {metadata.methods.map((method) => (
          <li className="border-l-2 border-sand pl-2 text-xs leading-5 text-muted-ink" key={method}>{method}</li>
        ))}
      </ul>
      <Link className="mt-auto inline-flex min-h-11 items-center text-xs font-bold text-teal-dark underline underline-offset-4" href={href}>
        Explore path <span aria-hidden="true">→</span>
      </Link>
    </article>
  );
}
