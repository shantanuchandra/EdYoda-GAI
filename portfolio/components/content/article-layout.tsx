/* eslint-disable no-unused-vars, no-undef -- the inherited Babel parser does not recognize imports used by JSX or TypeScript. */
import type { ReactNode } from "react";
import { Breadcrumbs } from "@/components/content/breadcrumbs";
import { formatPublicationDate } from "@/components/content/insight-card";
import { TableOfContents } from "@/components/content/table-of-contents";
import type { ContentItem } from "@/lib/content/schema";

type ArticleLayoutProps = {
  children: ReactNode;
  item: ContentItem;
};

export function ArticleLayout({ children, item }: ArticleLayoutProps) {
  const { metadata } = item;

  return (
    <article className="pb-[var(--section-space)]">
      <header className="border-b border-line bg-surface py-10 sm:py-14">
        <div className="container">
          <Breadcrumbs items={[{ label: "Insights", href: "/insights" }, { label: metadata.title }]} />
          <div className="mt-10 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs font-extrabold tracking-[0.12em] text-teal uppercase">
            <span>Insight</span>
            <span>By Shantanu Chandra</span>
            {metadata.publishedAt ? <time dateTime={metadata.publishedAt}>{formatPublicationDate(metadata.publishedAt)}</time> : null}
          </div>
          <h1 className="mt-3 mb-0 max-w-[1100px] font-display text-[clamp(3rem,7vw,6rem)] font-medium tracking-[-0.04em] leading-[0.96]">
            {metadata.title}
          </h1>
          <p className="reading-measure mt-6 mb-0 text-[1.08rem] text-muted-ink">{metadata.description}</p>
        </div>
      </header>

      <div className="container mt-10 grid gap-10 lg:mt-14 lg:grid-cols-[minmax(0,1fr)_280px] lg:items-start">
        <aside className="lg:col-start-2 lg:row-start-1 lg:sticky lg:top-[calc(var(--header-height)+24px)]">
          <TableOfContents headings={item.headings} />
        </aside>
        <div className="article-layout__body reading-measure min-w-0 text-[1.05rem] leading-8 lg:col-start-1 lg:row-start-1">
          {children}
        </div>
      </div>
    </article>
  );
}
