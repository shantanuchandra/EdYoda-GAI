/* eslint-disable no-unused-vars, no-undef -- the inherited Babel parser does not apply JSX/TypeScript scope analysis. */
import { ImpactMetric } from "@/components/content/impact-metric";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";

export const impactMetrics = [
  { value: "200 stores", label: "Hindi and English voice-guided eye test at Lenskart" },
  { value: "20 minutes", label: "Employed-customer onboarding and approval at IIFL" },
  { value: "70% less manual work", label: "Campaign operations across five commerce platforms at AGL" },
  { value: "50 → 25,000", label: "Monthly completed onboardings in six months at Builder.ai" },
] as const;

export function ImpactStrip() {
  return (
    <section aria-label="Impact highlights" className="border-y border-line bg-surface">
      <Container>
        <Reveal>
          <ul className="m-0 grid p-0 [list-style:none] md:grid-cols-2 lg:grid-cols-4">
            {impactMetrics.map((metric) => <ImpactMetric {...metric} key={metric.value} />)}
          </ul>
        </Reveal>
      </Container>
    </section>
  );
}
