/* eslint-disable no-unused-vars, no-undef -- the inherited Babel parser does not recognize imports used by JSX or TypeScript. */
import type { ReactNode } from "react";
import Link from "next/link";
import { Breadcrumbs } from "@/components/content/breadcrumbs";
import { OutcomeList } from "@/components/content/outcome-list";
import { TableOfContents } from "@/components/content/table-of-contents";
import type { ContentItem } from "@/lib/content/schema";

type CaseStudyLayoutProps = {
  children: ReactNode;
  item: ContentItem;
  nextItem?: ContentItem;
};

function publicCompanyName(company?: string): string {
  return company === "Builder" ? "Builder.ai" : (company ?? "Employer work");
}

export function CaseStudyLayout({ children, item, nextItem }: CaseStudyLayoutProps) {
  const { metadata } = item;
  const company = publicCompanyName(metadata.company);

  return (
    <article className="detail-page case-study-layout" data-case-study-layout data-portfolio-template>
      <header className="detail-page__header case-study-layout__header border-b border-line bg-surface py-10 sm:py-14" data-case-study-header>
        <div className="container">
          <Breadcrumbs items={[{ label: "Work", href: "/work" }, { label: company }]} />
          <div className="case-study-layout__brief" data-case-study-brief>
            <div className="case-study-layout__brief-copy">
              <p className="case-study-layout__eyebrow mt-10 mb-0 text-xs font-extrabold tracking-[0.12em] text-teal uppercase">Employer transformation case study</p>
              <h1 className="case-study-layout__title mt-3 mb-0 max-w-[1000px] font-display text-[clamp(3rem,7vw,6rem)] font-medium tracking-[-0.04em] leading-[0.96]">
                {metadata.title}
              </h1>
              <p className="case-study-layout__description reading-measure mt-6 mb-0 text-[1.08rem] text-muted-ink">{metadata.description}</p>
            </div>
            <aside className="case-study-layout__brief-panel" data-case-study-brief-panel aria-label={`${company} case-study evidence`}>
              <p className="case-study-layout__brief-label">Case file</p>
              <p className="case-study-layout__brief-company">{company}</p>
              <dl className="case-study-layout__meta" data-case-study-meta>
                <div><dt>Company</dt><dd>{company}</dd></div>
                <div><dt>Industry</dt><dd>{metadata.industry.join(" · ")}</dd></div>
                {metadata.role ? <div><dt>Role</dt><dd>{metadata.role}</dd></div> : null}
                {metadata.period ? <div><dt>Period</dt><dd>{metadata.period}</dd></div> : null}
              </dl>
              <div className="case-study-layout__brief-evidence" data-case-study-brief-evidence>
                <p>Evidence snapshot</p>
                <div>
                  {metadata.outcomes.slice(0, 2).map((outcome) => (
                    <div key={`${outcome.value}-${outcome.label}`}>
                      <strong>{outcome.value}</strong>
                      <span>{outcome.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </aside>
          </div>
        </div>
      </header>

      <div className="container case-study-layout__content mt-10 grid gap-10 lg:mt-14 lg:grid-cols-[minmax(0,1fr)_280px] lg:items-start">
        <aside className="case-study-layout__toc lg:col-start-2 lg:row-start-1 lg:sticky lg:top-[calc(var(--header-height)+24px)]">
          <TableOfContents headings={item.headings} />
        </aside>
        <div className="min-w-0 lg:col-start-1 lg:row-start-1">
          <section aria-labelledby="case-study-outcomes">
            <h2 id="case-study-outcomes" className="case-study-layout__section-title m-0 font-display text-[clamp(2rem,4vw,3rem)] font-medium tracking-[-0.025em] leading-[1.02]">Outcomes</h2>
            <div className="case-study-layout__evidence mt-5" data-case-study-evidence><OutcomeList ariaLabel="Case-study outcomes" outcomes={metadata.outcomes} /></div>
          </section>
          <section aria-labelledby="case-study-methods" className="mt-10 border-t border-line pt-8">
            <h2 id="case-study-methods" className="case-study-layout__section-title m-0 font-display text-[clamp(2rem,4vw,3rem)] font-medium tracking-[-0.025em] leading-[1.02]">Methods used</h2>
            <ul className="case-study-layout__methods mt-5 flex list-none flex-wrap gap-2 p-0">
              {metadata.methods.map((method) => <li className="rounded-full border border-line bg-surface px-3 py-1.5 text-sm font-semibold text-teal-dark" key={method}>{method}</li>)}
            </ul>
          </section>
          <div className="reading-measure case-study__body case-study-layout__body mt-14 text-[1.05rem] leading-8">{children}</div>
          {nextItem ? (
            <nav aria-label="Next case study" className="case-study-layout__next mt-14 border-t border-line pt-8">
              <p className="m-0 text-xs font-extrabold tracking-[0.1em] text-teal uppercase">Continue reading</p>
              <Link className="mt-3 inline-block font-display text-[clamp(1.8rem,4vw,3rem)] font-medium tracking-[-0.025em] leading-[1.02] text-teal-dark underline decoration-teal underline-offset-8" href={`/work/${nextItem.metadata.slug}`}>
                Next case study: {nextItem.metadata.title} <span aria-hidden="true">→</span>
              </Link>
            </nav>
          ) : null}
        </div>
      </div>
    </article>
  );
}
