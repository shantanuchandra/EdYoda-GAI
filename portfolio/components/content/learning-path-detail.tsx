/* eslint-disable no-unused-vars, no-undef -- the inherited Babel parser does not recognize imports used by JSX or TypeScript. */
import type { ReactNode } from "react";
import { Breadcrumbs } from "@/components/content/breadcrumbs";
import type { ContentItem } from "@/lib/content/schema";

type LearningPathDetailProps = {
  children: ReactNode;
  item: ContentItem;
};

export function LearningPathDetail({ children, item }: LearningPathDetailProps) {
  const { metadata } = item;
  const outcome = metadata.outcomes[0];

  return (
    <article className="pb-[var(--section-space)]">
      <header className="border-b border-line bg-surface py-10 sm:py-14">
        <div className="container">
          <Breadcrumbs items={[{ label: "Learning", href: "/learning" }, { label: metadata.title }]} />
          <p className="mt-10 mb-0 text-xs font-extrabold tracking-[0.12em] text-teal uppercase">Shantanu Chandra Learning Lab</p>
          <h1 className="mt-3 mb-0 max-w-[1000px] font-display text-[clamp(3rem,7vw,6rem)] font-medium tracking-[-0.04em] leading-[0.96]">
            {metadata.title}
          </h1>
          <p className="reading-measure mt-6 mb-0 text-[1.08rem] text-muted-ink">{metadata.description}</p>
          <dl className="mt-9 grid max-w-[1000px] gap-6 border-t border-line pt-6 md:grid-cols-2">
            <div>
              <dt className="text-xs font-extrabold tracking-[0.1em] text-teal uppercase">Audience</dt>
              <dd className="mt-2 ml-0 font-semibold">{metadata.audience}</dd>
            </div>
            {outcome ? (
              <div>
                <dt className="text-xs font-extrabold tracking-[0.1em] text-teal uppercase">Outcome</dt>
                <dd className="mt-2 ml-0 font-semibold">{outcome.label}</dd>
              </div>
            ) : null}
          </dl>
        </div>
      </header>

      <div className="container mt-10 max-w-[900px] lg:mt-14">
        <div className="reading-measure learning-path-detail__body text-[1.05rem] leading-8">{children}</div>
      </div>
    </article>
  );
}
