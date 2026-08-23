/* eslint-disable no-unused-vars -- the inherited Babel parser does not recognize imports used by JSX. */
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { CareerRail } from "@/components/home/career-rail";
import { publicCareer } from "@/lib/resume-data";

export function CareerSnapshot() {
  return (
    <section aria-label="Career snapshot" className="pt-[var(--section-space)]">
      <Container className="grid gap-12">
        <SectionHeading
          description="A career shaped by operating complexity, customer behaviour and the discipline required to turn new technology into useful products."
          eyebrow="Career snapshot"
          title="Built across contexts, connected by product practice."
        />
        <CareerRail roles={publicCareer} />
      </Container>
    </section>
  );
}
