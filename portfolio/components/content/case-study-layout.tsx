/* eslint-disable no-unused-vars, no-undef -- the inherited Babel parser does not recognize imports used by JSX or TypeScript. */
import type { ReactNode } from "react";
import Link from "next/link";
import { BarChart3, FileText, Layers3 } from "lucide-react";
import { CaseStudyArtwork } from "@/components/case-studies/case-study-artwork";
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
          <section aria-labelledby="case-study-title" className="case-study-layout__cover" data-case-study-cover>
            <div className="case-study-layout__cover-media">
              <CaseStudyArtwork
                company={metadata.company}
                industry={metadata.industry.join(" · ")}
                kind="employer"
                slug={metadata.slug}
              />
            </div>
            <div className="case-study-layout__cover-copy">
              <div className="case-study-layout__cover-tags" data-case-study-cover-tags>
                {metadata.industry.map((industry) => <span key={industry}>{industry}</span>)}
              </div>
              <p className="case-study-layout__eyebrow">Employer transformation case study</p>
              <h1 className="case-study-layout__title" id="case-study-title">
                {metadata.title}
              </h1>
              <p className="case-study-layout__description">{metadata.description}</p>
              <nav aria-label="Case study shortcuts" className="case-study-layout__cover-actions" data-case-study-cover-actions>
                <Link href="#case-study-outcomes"><BarChart3 aria-hidden="true" size={15} strokeWidth={1.8} /><span>Outcomes</span></Link>
                <Link href="#case-study-methods"><Layers3 aria-hidden="true" size={15} strokeWidth={1.8} /><span>Methods</span></Link>
                <Link href="#context"><FileText aria-hidden="true" size={15} strokeWidth={1.8} /><span>Full story</span></Link>
              </nav>
            </div>
            <dl className="case-study-layout__facts" data-case-study-facts data-case-study-meta>
              <div><dt>Company</dt><dd>{company}</dd></div>
              <div><dt>Industry</dt><dd>{metadata.industry.join(" · ")}</dd></div>
              {metadata.role ? <div><dt>Role</dt><dd>{metadata.role}</dd></div> : null}
              {metadata.period ? <div><dt>Period</dt><dd>{metadata.period}</dd></div> : null}
            </dl>
          </section>
        </div>
      </header>

      <div className="container case-study-layout__content mt-10 grid gap-10 lg:mt-14 lg:grid-cols-[minmax(0,1fr)_280px] lg:items-start">
        <aside className="case-study-layout__toc lg:col-start-2 lg:row-start-1 lg:sticky lg:top-[calc(var(--header-height)+24px)]">
          <TableOfContents headings={item.headings} />
        </aside>
        <div className="min-w-0 lg:col-start-1 lg:row-start-1">
          <section aria-labelledby="case-study-outcomes" className="case-study-layout__outcomes-section">
            <h2 id="case-study-outcomes" className="case-study-layout__section-title m-0 font-display text-[clamp(2rem,4vw,3rem)] font-medium tracking-[-0.025em] leading-[1.02]">Outcomes</h2>
            <div className="case-study-layout__evidence mt-5" data-case-study-evidence><OutcomeList ariaLabel="Case-study outcomes" outcomes={metadata.outcomes} /></div>
          </section>
          <section aria-labelledby="case-study-methods" className="case-study-layout__methods-section mt-10 border-t border-line pt-8">
            <h2 id="case-study-methods" className="case-study-layout__section-title m-0 font-display text-[clamp(2rem,4vw,3rem)] font-medium tracking-[-0.025em] leading-[1.02]">Methods used</h2>
            <ul className="case-study-layout__methods mt-5 flex list-none flex-wrap gap-2 p-0">
              {metadata.methods.map((method) => <li className="rounded-full border border-line bg-surface px-3 py-1.5 text-sm font-semibold text-teal-dark" key={method}>{method}</li>)}
            </ul>
          </section>
          <div className="case-study-layout__story" data-case-study-story>
            <div className="reading-measure case-study__body case-study-layout__body text-[1.05rem] leading-8">{children}</div>
          </div>
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
