/* eslint-disable no-unused-vars, no-undef -- the inherited Babel parser does not recognize imports used by JSX or TypeScript. */
import type { ReactNode } from "react";
import { Breadcrumbs } from "@/components/content/breadcrumbs";
import { OutcomeList } from "@/components/content/outcome-list";
import { StatusLabel } from "@/components/ui/status-label";
import type { ContentItem } from "@/lib/content/schema";

type ProductDetailProps = {
  children: ReactNode;
  item: ContentItem;
};

export function ProductDetail({ children, item }: ProductDetailProps) {
  const { metadata } = item;

  return (
    <article className="pb-[var(--section-space)]">
      <header className="border-b border-line bg-surface py-10 sm:py-14">
        <div className="container">
          <Breadcrumbs items={[{ label: "Products", href: "/products" }, { label: metadata.title }]} />
          <p className="mt-10 mb-0 text-xs font-extrabold tracking-[0.12em] text-teal uppercase">Independent product</p>
          <h1 className="mt-3 mb-0 max-w-[1000px] font-display text-[clamp(3rem,7vw,6rem)] font-medium tracking-[-0.04em] leading-[0.96]">
            {metadata.title}
          </h1>
          <div className="mt-6 flex flex-wrap items-center gap-4">
            <StatusLabel status={metadata.status} />
            {metadata.externalUrl ? (
              <a
                className="button-link button-link--primary"
                href={metadata.externalUrl}
                rel="noreferrer"
                target="_blank"
              >
                Visit {metadata.title} <span aria-hidden="true">↗</span><span className="sr-only"> (opens in a new tab)</span>
              </a>
            ) : null}
          </div>
          <p className="reading-measure mt-6 mb-0 text-[1.08rem] text-muted-ink">{metadata.description}</p>
        </div>
      </header>

      <div className="container mt-10 max-w-[900px] lg:mt-14">
        <section aria-labelledby="product-outcomes">
          <h2 id="product-outcomes" className="m-0 font-display text-[clamp(2rem,4vw,3rem)] font-medium tracking-[-0.025em] leading-[1.02]">Verified evidence</h2>
          <div className="mt-5"><OutcomeList ariaLabel="Product evidence" outcomes={metadata.outcomes} /></div>
        </section>
        <section aria-labelledby="product-methods" className="mt-10 border-t border-line pt-8">
          <h2 id="product-methods" className="m-0 font-display text-[clamp(2rem,4vw,3rem)] font-medium tracking-[-0.025em] leading-[1.02]">What I am building</h2>
          <ul className="mt-5 flex list-none flex-wrap gap-2 p-0">
            {metadata.methods.map((method) => <li className="rounded-full border border-line bg-surface px-3 py-1.5 text-sm font-semibold text-teal-dark" key={method}>{method}</li>)}
          </ul>
        </section>
        <div className="reading-measure product-detail__body mt-14 text-[1.05rem] leading-8">{children}</div>
      </div>
    </article>
  );
}
