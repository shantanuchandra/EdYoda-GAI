"use client";

/* eslint-disable no-undef -- the inherited Babel parser does not recognize TypeScript declarations. */
import { useMemo, useState, type ReactNode } from "react";
import type { CaseStudyFilter } from "@/lib/case-studies";

type CaseStudyFiltersProps = {
  counts: { all: number; employer: number; product: number };
  children: ReactNode;
};

const filters: readonly { key: CaseStudyFilter; label: string; countKey: keyof CaseStudyFiltersProps["counts"] }[] = [
  { key: "all", label: "All", countKey: "all" },
  { key: "employer", label: "Employer transformations", countKey: "employer" },
  { key: "product", label: "Independent products", countKey: "product" },
];

export function CaseStudyFilters({ counts, children }: CaseStudyFiltersProps) {
  const [active, setActive] = useState<CaseStudyFilter>("all");
  const count = counts[active];
  const resultLabel = useMemo(() => `${count} case studies shown`, [count]);

  return (
    <div className="case-study-filters">
      <p className="case-study-filters__label">Browse by portfolio type</p>
      <div aria-label="Filter case studies" className="case-study-filters__controls" data-case-studies-filter-controls="true" role="group">
        {filters.map((filter) => (
          <button
            aria-pressed={active === filter.key}
            className="case-study-filters__control"
            key={filter.key}
            onClick={() => setActive(filter.key)}
            type="button"
          >
            {filter.label} <span className="ml-1 text-muted-ink">{counts[filter.countKey]}</span>
          </button>
        ))}
      </div>
      <p aria-live="polite" className="sr-only">{resultLabel}</p>
      <div className="case-study-filters__results" data-case-study-filter={active} data-case-study-results>
        {children}
      </div>
      <style>{`[data-case-study-filter="employer"] [data-case-study-kind="product"], [data-case-study-filter="product"] [data-case-study-kind="employer"] { display: none; }`}</style>
    </div>
  );
}
