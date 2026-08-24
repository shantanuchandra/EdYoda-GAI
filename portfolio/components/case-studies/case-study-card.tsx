/* eslint-disable no-unused-vars -- the inherited Babel parser does not recognize imports used by JSX. */
import Link from "next/link";
import { CaseStudyArtwork } from "@/components/case-studies/case-study-artwork";
import { StatusLabel } from "@/components/ui/status-label";
import type { CaseStudySummary } from "@/lib/case-studies";

export function CaseStudyCard({ item }: { item: CaseStudySummary }) {
  const isProduct = item.kind === "product";
  const tags = item.industry.split(" · ").slice(0, 2);
  return (
    <article
      className="case-study-card"
      data-case-study-card
      data-case-study-kind={item.kind}
      data-case-study-tags={tags.map((tag) => tag.toLowerCase().replaceAll(" ", "-")).join(" ")}
    >
      <div className="case-study-card__wash" aria-hidden="true" />
      <div className="case-study-card__body">
        <CaseStudyArtwork company={item.company} industry={item.industry} kind={item.kind} slug={item.slug} />
        <header className="case-study-card__header">
          <div className="case-study-card__tags">
            {tags.map((tag) => <span key={tag}>{tag}</span>)}
            {isProduct && item.status ? <StatusLabel status={item.status} /> : null}
          </div>
          <h3>
            <Link href={item.href}>{item.title}</Link>
          </h3>
          <p>{item.company ?? "Independent product"}</p>
        </header>
        <div className="case-study-card__content">
          <p>{item.description}</p>
        </div>
        <footer className="case-study-card__footer">
          <div>
            <strong>{item.outcome.value}</strong>
            <span>{item.outcome.label}</span>
          </div>
          <Link href={item.href}>
            {isProduct ? "View product" : "Read case study"} <span aria-hidden="true">→</span>
          </Link>
        </footer>
      </div>
    </article>
  );
}
