/* eslint-disable no-undef -- the inherited Babel parser does not recognize TypeScript type declarations. */
import type { PublicContent } from "@/lib/content/schema";

type StatusLabelProps = {
  status: PublicContent["status"];
};

const statusCopy = {
  active: "Active",
  "in-development": "In development",
  archived: "Archived",
  "case-study-only": "Case study only",
} as const;

export function StatusLabel({ status }: StatusLabelProps) {
  if (!status) return null;

  return (
    <span className="inline-flex rounded-full border border-teal/30 bg-teal/10 px-3 py-1 text-xs font-extrabold tracking-[0.08em] text-teal-dark uppercase">
      {statusCopy[status]}
    </span>
  );
}
