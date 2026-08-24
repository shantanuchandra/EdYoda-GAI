/* eslint-disable no-unused-vars -- the inherited Babel parser does not recognize imports used by JSX. */
import type { Metadata } from "next";
import { CaseStudyCard } from "@/components/case-studies/case-study-card";
import { CaseStudyFilters } from "@/components/case-studies/case-study-filters";
import { getCaseStudySummaries } from "@/lib/case-studies";
import { buildContentMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildContentMetadata({
  title: "Case Studies",
  description: "Employer transformations and independent product case studies from Shantanu Chandra, organized around signal, system and scale.",
  path: "/case-studies",
});

export default async function CaseStudiesPage() {
  const items = await getCaseStudySummaries();
  const employerItems = items.filter((item) => item.kind === "employer");
  const productItems = items.filter((item) => item.kind === "product");

  return (
    <section className="case-studies-page" data-case-studies-canvas>
      <div className="case-studies-page__canvas">
        <header className="case-studies-intro" data-case-studies-intro data-testid="case-studies-intro">
          <h1>Case Studies</h1>
          <p>Explore transformation work and independent builds through the systems, decisions and outcomes behind them.</p>
          <span className="sr-only" id="employer-transformations">Employer transformations</span>
          <span className="sr-only" id="independent-products">Independent products</span>
        </header>
        <div className="case-studies-page__content">
          <CaseStudyFilters items={items}>
            {items.map((item) => <CaseStudyCard item={item} key={item.id} />)}
          </CaseStudyFilters>
        </div>
      </div>
    </section>
  );
}
