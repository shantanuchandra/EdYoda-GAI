/* eslint-disable no-unused-vars -- the inherited Babel parser does not recognize imports used by JSX. */
import type { Metadata } from "next";
import { CaseStudyCard } from "@/components/case-studies/case-study-card";
import { CaseStudyFilters } from "@/components/case-studies/case-study-filters";
import { ContentIndexHeader } from "@/components/content/content-index-header";
import { Container } from "@/components/ui/container";
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
    <section className="py-[var(--section-space)]">
      <Container>
        <ContentIndexHeader
          eyebrow="Case studies"
          title="Evidence from transformation work and independent builds."
          description="Browse the product decisions, operating systems and measurable outcomes behind Shantanu Chandra's work across industries."
        />
        <div className="mt-14 grid gap-14">
          <section id="employer-transformations" aria-labelledby="employer-transformations-title">
            <h2 className="font-display text-3xl font-medium" id="employer-transformations-title">Employer transformations</h2>
            <p className="mt-3 max-w-[58ch] text-muted-ink">Four employer case studies, with their operating context intact.</p>
          </section>
          <section id="independent-products" aria-labelledby="independent-products-title">
            <h2 className="font-display text-3xl font-medium" id="independent-products-title">Independent products</h2>
            <p className="mt-3 max-w-[58ch] text-muted-ink">Independent product stories grounded in a public problem and honest status.</p>
          </section>
          <CaseStudyFilters counts={{ all: items.length, employer: employerItems.length, product: productItems.length }}>
            {items.map((item) => <CaseStudyCard item={item} key={item.id} />)}
          </CaseStudyFilters>
        </div>
      </Container>
    </section>
  );
}
