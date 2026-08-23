/* eslint-disable no-unused-vars, no-undef -- the inherited Babel parser does not recognize imports used by JSX or TypeScript. */
import { ButtonLink } from "@/components/ui/button-link";

type EmptyStateProps = {
  title: string;
  description: string;
  actionHref?: string;
  actionLabel?: string;
};

export function EmptyState({
  title,
  description,
  actionHref = "/",
  actionLabel = "Return home",
}: EmptyStateProps) {
  return (
    <section aria-label={title} className="mt-12 max-w-[720px] rounded-card border border-line bg-surface p-8 sm:p-10">
      <h2 className="m-0 font-display text-[clamp(2rem,4vw,3rem)] font-medium tracking-[-0.025em] leading-[1.02]">
        {title}
      </h2>
      <p className="mt-4 mb-7 text-muted-ink">{description}</p>
      <ButtonLink href={actionHref}>{actionLabel}</ButtonLink>
    </section>
  );
}
