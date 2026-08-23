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
    <article className="pb-[var(--section-space)]">
      <header className="border-b border-line bg-surface py-10 sm:py-14">
        <div className="container">
          <Breadcrumbs items={[{ label: "Work", href: "/work" }, { label: company }]} />
          <p className="mt-10 mb-0 text-xs font-extrabold tracking-[0.12em] text-teal uppercase">Employer transformation case study</p>
          <h1 className="mt-3 mb-0 max-w-[1000px] font-display text-[clamp(3rem,7vw,6rem)] font-medium tracking-[-0.04em] leading-[0.96]">
            {metadata.title}
          </h1>
          <p className="reading-measure mt-6 mb-0 text-[1.08rem] text-muted-ink">{metadata.description}</p>
          <dl className="mt-9 grid max-w-[900px] gap-5 border-t border-line pt-6 sm:grid-cols-2 lg:grid-cols-4">
            <div><dt className="text-xs font-extrabold tracking-[0.1em] text-teal uppercase">Company</dt><dd className="mt-1 ml-0 font-semibold">{company}</dd></div>
            <div><dt className="text-xs font-extrabold tracking-[0.1em] text-teal uppercase">Industry</dt><dd className="mt-1 ml-0 font-semibold">{metadata.industry.join(" · ")}</dd></div>
            {metadata.role ? <div><dt className="text-xs font-extrabold tracking-[0.1em] text-teal uppercase">Role</dt><dd className="mt-1 ml-0 font-semibold">{metadata.role}</dd></div> : null}
            {metadata.period ? <div><dt className="text-xs font-extrabold tracking-[0.1em] text-teal uppercase">Period</dt><dd className="mt-1 ml-0 font-semibold">{metadata.period}</dd></div> : null}
          </dl>
        </div>
      </header>

      <div className="container mt-10 grid gap-10 lg:mt-14 lg:grid-cols-[minmax(0,1fr)_280px] lg:items-start">
        <aside className="lg:col-start-2 lg:row-start-1 lg:sticky lg:top-[calc(var(--header-height)+24px)]">
          <TableOfContents headings={item.headings} />
        </aside>
        <div className="min-w-0 lg:col-start-1 lg:row-start-1">
          <section aria-labelledby="case-study-outcomes">
            <h2 id="case-study-outcomes" className="m-0 font-display text-[clamp(2rem,4vw,3rem)] font-medium tracking-[-0.025em] leading-[1.02]">Outcomes</h2>
            <div className="mt-5"><OutcomeList outcomes={metadata.outcomes} /></div>
          </section>
          <section aria-labelledby="case-study-methods" className="mt-10 border-t border-line pt-8">
            <h2 id="case-study-methods" className="m-0 font-display text-[clamp(2rem,4vw,3rem)] font-medium tracking-[-0.025em] leading-[1.02]">Methods used</h2>
            <ul className="mt-5 flex list-none flex-wrap gap-2 p-0">
              {metadata.methods.map((method) => <li className="rounded-full border border-line bg-surface px-3 py-1.5 text-sm font-semibold text-teal-dark" key={method}>{method}</li>)}
            </ul>
          </section>
          <div className="reading-measure case-study__body mt-14 text-[1.05rem] leading-8">{children}</div>
          {nextItem ? (
            <nav aria-label="Next case study" className="mt-14 border-t border-line pt-8">
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
