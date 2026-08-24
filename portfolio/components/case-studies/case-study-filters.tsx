"use client";

/* eslint-disable no-undef -- the inherited Babel parser does not recognize TypeScript declarations. */
import { useMemo, useState, type CSSProperties, type ReactNode } from "react";
import type { CaseStudyFilter, CaseStudySummary } from "@/lib/case-studies";

type CaseStudyFiltersProps = {
  items: readonly CaseStudySummary[];
  children: ReactNode;
};

const filters: readonly { key: CaseStudyFilter; label: string }[] = [
  { key: "employer", label: "Employer transformations" },
  { key: "retail", label: "Retail" },
  { key: "applied-ai", label: "Applied AI" },
  { key: "financial-services", label: "Financial services" },
  { key: "adtech", label: "AdTech" },
  { key: "retail-media", label: "Retail media" },
  { key: "saas", label: "SaaS" },
  { key: "conversational-ai", label: "Conversational AI" },
  { key: "travel", label: "Travel" },
  { key: "consumer-product", label: "Consumer product" },
  { key: "personal-finance", label: "Personal finance" },
  { key: "product", label: "Independent products" },
];

const mobileFilters = [{ key: "all", label: "All case studies" } as const, ...filters];

function matchesFilter(item: CaseStudySummary, filter: CaseStudyFilter) {
  if (filter === "all") return true;
  if (filter === "employer") return item.kind === "employer";
  if (filter === "product") return item.kind === "product";
  return item.tags.some((tag) => tag.toLowerCase().replaceAll(" ", "-") === filter);
}

export function CaseStudyFilters({ items, children }: CaseStudyFiltersProps) {
  const [active, setActive] = useState<CaseStudyFilter>("all");
  const resultLabel = useMemo(() => `${items.filter((item) => matchesFilter(item, active)).length} case studies shown`, [active, items]);

  return (
    <div className="case-study-filters">
      <div aria-label="Filter case studies" className="case-study-filters__desktop" data-case-studies-filter-controls="true" role="group">
        <div className="case-study-filters__controls">
          {filters.map((filter, index) => (
            <button
              aria-pressed={active === filter.key}
              className="case-study-filters__control"
              key={filter.key}
              onClick={() => setActive(active === filter.key ? "all" : filter.key)}
              style={{ "--tag-index": index } as CSSProperties}
              type="button"
            >
              {filter.label}
            </button>
          ))}
        </div>
      </div>
      <label className="case-study-filters__mobile">
        <span>Filter case studies</span>
        <select aria-label="Filter case studies" onChange={(event) => setActive(event.target.value as CaseStudyFilter)} value={active}>
          {mobileFilters.map((filter) => <option key={filter.key} value={filter.key}>{filter.label}</option>)}
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
        [data-case-study-filter="applied-ai"] [data-case-study-card]:not([data-case-study-tags~="applied-ai"]),
        [data-case-study-filter="financial-services"] [data-case-study-card]:not([data-case-study-tags~="financial-services"]),
        [data-case-study-filter="adtech"] [data-case-study-card]:not([data-case-study-tags~="adtech"]),
        [data-case-study-filter="retail-media"] [data-case-study-card]:not([data-case-study-tags~="retail-media"]),
        [data-case-study-filter="saas"] [data-case-study-card]:not([data-case-study-tags~="saas"]),
        [data-case-study-filter="conversational-ai"] [data-case-study-card]:not([data-case-study-tags~="conversational-ai"]),
        [data-case-study-filter="travel"] [data-case-study-card]:not([data-case-study-tags~="travel"]),
        [data-case-study-filter="consumer-product"] [data-case-study-card]:not([data-case-study-tags~="consumer-product"]),
        [data-case-study-filter="personal-finance"] [data-case-study-card]:not([data-case-study-tags~="personal-finance"]) { display: none; }
      `}</style>
    </div>
  );
}
