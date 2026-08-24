"use client";

/* eslint-disable no-undef -- the inherited Babel parser does not recognize TypeScript declarations. */
import { useMemo, useState, type ReactNode } from "react";
import type { CaseStudyFilter, CaseStudySummary } from "@/lib/case-studies";

type CaseStudyFiltersProps = {
  items: readonly CaseStudySummary[];
  children: ReactNode;
};

const filters: readonly { key: CaseStudyFilter; label: string }[] = [
  { key: "all", label: "All" },
  { key: "employer", label: "Employer transformations" },
  { key: "retail", label: "Retail" },
  { key: "financial-services", label: "Financial services" },
  { key: "adtech", label: "AdTech" },
  { key: "saas", label: "SaaS" },
  { key: "product", label: "Independent products" },
];

function matchesFilter(item: CaseStudySummary, filter: CaseStudyFilter) {
  if (filter === "all") return true;
  if (filter === "employer") return item.kind === "employer";
  if (filter === "product") return item.kind === "product";
  return item.industry.toLowerCase().split(" · ").some((tag) => tag.replaceAll(" ", "-") === filter);
}

export function CaseStudyFilters({ items, children }: CaseStudyFiltersProps) {
  const [active, setActive] = useState<CaseStudyFilter>("all");
  const counts = useMemo(() => Object.fromEntries(
    filters.map((filter) => [filter.key, items.filter((item) => matchesFilter(item, filter.key)).length]),
  ) as Record<CaseStudyFilter, number>, [items]);
  const count = counts[active];
  const resultLabel = useMemo(() => `${count} case studies shown`, [count]);

  return (
    <div className="case-study-filters">
      <div aria-label="Filter case studies" className="case-study-filters__desktop" data-case-studies-filter-controls="true" role="group">
        <p className="case-study-filters__label">Filter by portfolio focus</p>
        <div className="case-study-filters__controls">
          {filters.map((filter) => (
            <button
              aria-pressed={active === filter.key}
              className="case-study-filters__control"
              key={filter.key}
              onClick={() => setActive(filter.key)}
              type="button"
            >
              {filter.label} <span>{counts[filter.key]}</span>
            </button>
          ))}
        </div>
      </div>
      <label className="case-study-filters__mobile">
        <span>Filter case studies</span>
        <select aria-label="Filter case studies" onChange={(event) => setActive(event.target.value as CaseStudyFilter)} value={active}>
          {filters.map((filter) => <option key={filter.key} value={filter.key}>{filter.label} ({counts[filter.key]})</option>)}
        </select>
      </label>
      <p aria-live="polite" className="sr-only">{resultLabel}</p>
      <div className="case-study-filters__results" data-case-study-filter={active} data-case-study-results>
        {children}
      </div>
      <style>{`
        [data-case-study-filter="product"] [data-case-study-kind="employer"],
        [data-case-study-filter="employer"] [data-case-study-kind="product"],
        [data-case-study-filter="retail"] [data-case-study-card]:not([data-case-study-tags~="retail"]),
        [data-case-study-filter="financial-services"] [data-case-study-card]:not([data-case-study-tags~="financial-services"]),
        [data-case-study-filter="adtech"] [data-case-study-card]:not([data-case-study-tags~="adtech"]),
        [data-case-study-filter="saas"] [data-case-study-card]:not([data-case-study-tags~="saas"]) { display: none; }
      `}</style>
    </div>
  );
}
