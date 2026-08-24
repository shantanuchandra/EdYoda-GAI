/* eslint-disable no-unused-vars, no-undef -- the inherited Babel parser does not recognize imports used by JSX or TypeScript. */
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import type { ReactNode } from "react";
import { Breadcrumbs } from "@/components/content/breadcrumbs";
import { LearningCurriculum } from "@/components/content/learning-curriculum";
import type { ContentItem } from "@/lib/content/schema";
import { getLearningProgram } from "@/lib/learning-programs";

type LearningPathDetailProps = {
  children: ReactNode;
  item: ContentItem;
};

const learningPaths = [
  { slug: "applied-ai-non-technical", title: "Applied AI for non-technical professionals" },
  { slug: "ai-product-transformation", title: "AI product transformation" },
  { slug: "practical-agents-founders", title: "Practical agents for founders" },
] as const;

export function LearningPathDetail({ children, item }: LearningPathDetailProps) {
  const { metadata } = item;
  const outcome = metadata.outcomes[0];
  const pathIndex = Math.max(0, learningPaths.findIndex(({ slug }) => slug === metadata.slug));
  const nextPath = learningPaths[(pathIndex + 1) % learningPaths.length];
  const subject = metadata.industry[1] ?? "Learning Lab";
  const pathNumber = String(pathIndex + 1).padStart(2, "0");
  const program = getLearningProgram(metadata.slug);

  return (
    <article className="learning-detail" data-learning-detail data-portfolio-template>
      <header className="learning-detail__hero">
        <div className="learning-detail__canvas" data-learning-detail-canvas>
          <Breadcrumbs items={[{ label: "Learning", href: "/learning" }, { label: metadata.title }]} />

          <div className="learning-detail__hero-grid">
            <div className="learning-detail__hero-copy">
              <p className="learning-detail__eyebrow">Shantanu Chandra Learning Lab</p>
              <h1>{metadata.title}</h1>
              <p className="learning-detail__description">{metadata.description}</p>
            </div>

            <div aria-hidden="true" className="learning-detail__visual" data-learning-detail-visual>
              <span className="learning-detail__visual-label">{subject}</span>
              <span className="learning-detail__visual-index">Path {pathNumber} / 03</span>
              <span className="learning-detail__visual-orbit learning-detail__visual-orbit--one" />
              <span className="learning-detail__visual-orbit learning-detail__visual-orbit--two" />
              <span className="learning-detail__visual-line" />
              <div className="learning-detail__visual-nodes">
                {metadata.methods.map((method, index) => (
                  <span className={`learning-detail__visual-node learning-detail__visual-node--${index + 1}`} key={method}>
                    {String(index + 1).padStart(2, "0")}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <dl className="learning-detail__meta">
            <div>
              <dt>Audience</dt>
              <dd>{metadata.audience}</dd>
            </div>
            {outcome ? (
              <div>
                <dt>Outcome</dt>
                <dd>{outcome.label}</dd>
              </div>
            ) : null}
          </dl>
        </div>
      </header>

      <section className="learning-detail__content">
        <div className="learning-detail__body learning-path-detail__body" data-learning-detail-body>{children}</div>
      </section>

      {program ? <LearningCurriculum program={program} title={metadata.title} /> : null}

      <nav aria-label="Learning path navigation" className="learning-detail__navigation" data-learning-path-navigation>
        <Link className="learning-detail__navigation-card" href="/learning">
          <span>Learning Lab</span>
          <strong><ArrowLeft aria-hidden="true" size={18} strokeWidth={1.8} /> All learning paths</strong>
        </Link>
        <Link aria-label={`Next learning path: ${nextPath.title}`} className="learning-detail__navigation-card learning-detail__navigation-card--next" href={`/learning/${nextPath.slug}`}>
          <span>Next learning path</span>
          <strong>{nextPath.title} <ArrowRight aria-hidden="true" size={18} strokeWidth={1.8} /></strong>
        </Link>
      </nav>
    </article>
  );
}
