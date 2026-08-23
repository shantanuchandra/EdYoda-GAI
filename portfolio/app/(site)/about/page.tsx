/* eslint-disable no-unused-vars -- the inherited Babel parser does not recognize imports used by JSX. */
import type { Metadata } from "next";
import { CareerTimeline } from "@/components/content/career-timeline";
import { ContentIndexHeader } from "@/components/content/content-index-header";
import { Container } from "@/components/ui/container";
import { ButtonLink } from "@/components/ui/button-link";
import { JsonLd } from "@/components/seo/json-ld";
import { buildContentMetadata } from "@/lib/metadata";
import { buildPersonJsonLd } from "@/lib/structured-data";

const description = "A first-person career story spanning product, software, operations and five years building and launching AI products.";

export const metadata: Metadata = buildContentMetadata({
  title: "About",
  description,
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
      <section className="py-[var(--section-space)]">
        <Container>
          <ContentIndexHeader
            eyebrow="About"
            title="I build the operating system around useful AI."
            description="Across 12+ years in product, software and operations—including five years building and launching AI products—I have learned that a model matters only when the surrounding workflow earns adoption and trust."
          />

          <div className="about-story">
            <div className="about-story__narrative">
              <p>
                My path began with software and data foundations, moved through customer-facing operations and product leadership, and then into AI product scale. That sequence still shapes how I work: understand the operating reality, make the product decision explicit, and build the controls and feedback loops that help a team improve it.
              </p>
              <p>
                At Builder.ai, AGL and IIFL Home Loans, my scope expanded from conversational products to commerce operations and enterprise transformation. At IIFL, I managed six product managers and led 25 engineers and data scientists across three squads while working on lending journeys and an enterprise AI assistant.
              </p>
              <p>
                Today I combine AI product leadership with independent products and practical instruction in generative AI and no-code agents. The through-line is the same: signal, system and scale—find a worthwhile problem, design responsible operating mechanics, and make adoption measurable.
              </p>
            </div>

            <aside className="about-story__context" aria-labelledby="about-industries-title">
              <p className="about-story__label" id="about-industries-title">Industry experience</p>
              <ul aria-label="Industry experience">
                {[
                  "Retail",
                  "Lending",
                  "AdTech",
                  "SaaS",
                  "Enterprise software",
                ].map((industry) => <li key={industry}>{industry}</li>)}
              </ul>
            </aside>
          </div>
        </Container>
      </section>

      <section className="about-career" aria-labelledby="about-career-title">
        <Container>
          <div className="about-career__heading">
            <p>Career chronology</p>
            <h2 id="about-career-title">Foundations, product leadership, AI scale and transformation.</h2>
          </div>
          <CareerTimeline />
        </Container>
      </section>

      <section className="pt-[var(--section-space)]">
        <Container className="about-conversion">
          <div>
            <p>Continue the conversation</p>
            <h2>Explore the evidence or get in touch directly.</h2>
          </div>
          <div className="about-conversion__actions">
            <ButtonLink href="/work">Explore selected work</ButtonLink>
            <ButtonLink href="/contact" variant="secondary">Contact me</ButtonLink>
          </div>
        </Container>
      </section>
      <JsonLd data={buildPersonJsonLd({ path: "/about", pageName: "About Shantanu Chandra", description })} />
    </>
  );
}
