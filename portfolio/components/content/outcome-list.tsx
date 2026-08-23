/* eslint-disable no-undef -- the inherited Babel parser does not recognize TypeScript type declarations. */
import type { PublicContent } from "@/lib/content/schema";

type OutcomeListProps = { outcomes: PublicContent["outcomes"] };

export function OutcomeList({ outcomes }: OutcomeListProps) {
  if (outcomes.length === 0) return null;

  return (
    <ul className="m-0 grid list-none gap-3 p-0 sm:grid-cols-2" aria-label="Case-study outcomes">
      {outcomes.map((outcome) => (
        <li className="rounded-card border border-line bg-surface p-5" key={`${outcome.value}-${outcome.label}`}>
          <strong className="block font-display text-[clamp(1.7rem,3vw,2.4rem)] font-semibold leading-[1.05] text-copper">
            {outcome.value}
          </strong>
          <span className="mt-2 block text-sm font-bold text-ink">{outcome.label}</span>
          {outcome.qualifier ? <small className="mt-2 block text-xs leading-5 text-muted-ink italic">{outcome.qualifier}</small> : null}
        </li>
      ))}
    </ul>
  );
}
