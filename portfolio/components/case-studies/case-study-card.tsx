/* eslint-disable no-unused-vars -- the inherited Babel parser does not recognize imports used by JSX. */
import Link from "next/link";
import { CaseStudyArtwork } from "@/components/case-studies/case-study-artwork";
import { StatusLabel } from "@/components/ui/status-label";
import type { CaseStudySummary } from "@/lib/case-studies";

export function CaseStudyCard({ item }: { item: CaseStudySummary }) {
  const isProduct = item.kind === "product";
  return (
    <article
      className="case-study-card group flex h-full min-h-[390px] flex-col rounded-card border border-line bg-surface p-[clamp(20px,3vw,30px)] transition-[border-color,box-shadow,translate] duration-200 ease-[var(--ease-out-expo)] hover:-translate-y-1 hover:border-teal hover:shadow-[0_18px_48px_rgb(16_37_34_/_9%)] focus-within:-translate-y-1 focus-within:border-teal"
      data-case-study-kind={item.kind}
    >
      <CaseStudyArtwork industry={item.industry} kind={item.kind} />
      <div className="mt-5 flex items-start justify-between gap-3">
        <p className="m-0 text-xs font-extrabold tracking-[0.1em] text-teal uppercase">{isProduct ? "Independent product" : item.industry}</p>
        {isProduct && item.status ? <StatusLabel status={item.status} /> : null}
      </div>
      <h3 className="mt-3 mb-0 font-display text-[clamp(1.6rem,3vw,2.2rem)] leading-[1.05] font-semibold tracking-[-0.025em]">
        <Link className="no-underline" href={item.href}>{item.title}</Link>
      </h3>
      <p className="mt-3 mb-5 text-[0.94rem] text-muted-ink">{item.description}</p>
      <div className="mt-auto grid gap-1 border-t border-line pt-4">
        <strong className="font-display text-[1.55rem] leading-[1.1] text-copper">{item.outcome.value}</strong>
        <span className="text-xs text-muted-ink">{item.outcome.label}</span>
      </div>
      <Link className="mt-5 inline-flex min-h-11 items-center gap-1 text-xs font-bold text-teal-dark underline underline-offset-4" href={item.href}>
        {isProduct ? "View product" : "Read case study"} <span aria-hidden="true">→</span>
      </Link>
    </article>
  );
}
