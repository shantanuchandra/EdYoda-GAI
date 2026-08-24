/* eslint-disable no-unused-vars -- the inherited Babel parser does not recognize imports used by JSX. */
import Link from "next/link";
import { BarChart3, FileText, Layers3 } from "lucide-react";
import { CaseStudyArtwork } from "@/components/case-studies/case-study-artwork";
import { StatusLabel } from "@/components/ui/status-label";
import type { CaseStudySummary } from "@/lib/case-studies";

export function CaseStudyCard({ item }: { item: CaseStudySummary }) {
  const isProduct = item.kind === "product";
  const tags = item.tags.slice(0, 2);
  const anchors = isProduct
    ? { evidence: "product-outcomes", methods: "product-methods" }
    : { evidence: "case-study-outcomes", methods: "case-study-methods" };
  const actions = [
    { href: item.href, label: isProduct ? "View product" : "Read case study", icon: FileText },
    { href: `${item.href}#${anchors.evidence}`, label: isProduct ? "Evidence" : "Outcomes", icon: BarChart3 },
    { href: `${item.href}#${anchors.methods}`, label: isProduct ? "Build notes" : "Methods", icon: Layers3 },
  ];
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
          {actions.map(({ href, icon: Icon, label }, index) => (
            <span className="case-study-card__footer-action-group" key={label}>
              {index > 0 ? <span aria-hidden="true" className="case-study-card__footer-separator">|</span> : null}
              <Link data-case-study-card-action href={href}>
                <Icon aria-hidden="true" focusable="false" size={15} strokeWidth={1.8} />
                <span>{label}</span>
              </Link>
            </span>
          ))}
        </footer>
      </div>
    </article>
  );
}
