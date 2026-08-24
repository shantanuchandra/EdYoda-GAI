/* eslint-disable no-unused-vars, no-undef -- the inherited Babel parser does not apply JSX/TypeScript scope analysis. */
import Link from "next/link";
import type { ContentItem } from "@/lib/content/schema";

type LearningPathCardProps = {
  headingLevel: 2 | 3;
  item: ContentItem;
};

const headingClassName = "learning-path-card__title";

export function LearningPathCard({ headingLevel, item }: LearningPathCardProps) {
  const { metadata } = item;
  const href = `/learning/${metadata.slug}`;
  const outcome = metadata.outcomes[0];
  const titleLink = <Link className="no-underline" href={href}>{metadata.title}</Link>;
  const subject = metadata.industry[1] ?? "AI Courses";

  return (
    <article className="learning-path-card" data-learning-path-card>
      <div aria-hidden="true" className="learning-path-card__media" data-learning-card-media>
        <span className="learning-path-card__media-label">{subject}</span>
        <span className="learning-path-card__media-index">01—04</span>
        <span className="learning-path-card__media-orbit learning-path-card__media-orbit--one" />
        <span className="learning-path-card__media-orbit learning-path-card__media-orbit--two" />
        <span className="learning-path-card__media-line learning-path-card__media-line--one" />
        <span className="learning-path-card__media-line learning-path-card__media-line--two" />
      </div>
      <p className="learning-path-card__eyebrow">Audience</p>
      <p className="learning-path-card__audience">{metadata.audience}</p>
      {headingLevel === 2 ? (
        <h2 className={headingClassName}>{titleLink}</h2>
      ) : (
        <h3 className={headingClassName}>{titleLink}</h3>
      )}
      {outcome ? (
        <div className="learning-path-card__outcome">
          <p>Outcome</p>
          <p>{outcome.label}</p>
        </div>
      ) : null}
      <p className="learning-path-card__modules-label">Launch modules</p>
      <ul aria-label={`${metadata.title} launch modules`} className="learning-path-card__modules">
        {metadata.methods.map((method) => (
          <li key={method}>{method}</li>
        ))}
      </ul>
      <Link className="learning-path-card__action inline-flex min-h-11 items-center" href={href}>
        Explore path <span aria-hidden="true">→</span>
      </Link>
    </article>
  );
}
