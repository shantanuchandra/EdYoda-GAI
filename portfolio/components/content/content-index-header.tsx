/* eslint-disable no-undef -- the inherited Babel parser does not recognize TypeScript type declarations. */
import type { ReactNode } from "react";

type ContentIndexHeaderProps = {
  eyebrow: string;
  title: ReactNode;
  description: ReactNode;
};

export function ContentIndexHeader({ eyebrow, title, description }: ContentIndexHeaderProps) {
  return (
    <header className="max-w-[760px]">
      <p className="m-0 text-xs font-extrabold tracking-[0.12em] text-teal uppercase">{eyebrow}</p>
      <h1 className="mt-3 mb-0 font-display text-[clamp(3rem,7vw,5.5rem)] font-medium tracking-[-0.035em] leading-[0.98]">
        {title}
      </h1>
      <p className="reading-measure mt-6 mb-0 text-muted-ink">{description}</p>
    </header>
  );
}
