/* eslint-disable no-unused-vars, no-undef -- the inherited Babel parser does not apply JSX/TypeScript scope analysis. */
import type { ReactNode } from "react";

type SectionHeadingProps = {
  as?: "h1" | "h2" | "h3";
  className?: string;
  description?: ReactNode;
  eyebrow?: string;
  title: ReactNode;
};

export function SectionHeading({
  as: Heading = "h2",
  className = "",
  description,
  eyebrow,
  title,
}: SectionHeadingProps) {
  return (
    <div className={["section-heading", className].filter(Boolean).join(" ")}>
      {eyebrow ? <p className="section-heading__eyebrow">{eyebrow}</p> : null}
      <Heading className="section-heading__title">{title}</Heading>
      {description ? <p className="section-heading__description">{description}</p> : null}
    </div>
  );
}
