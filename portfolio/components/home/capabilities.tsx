/* eslint-disable no-unused-vars, no-undef -- the inherited Babel parser does not apply JSX/TypeScript scope analysis. */
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";

const capabilities = [
  "AI product strategy and portfolio prioritization",
  "workflow and operating-model redesign",
  "product discovery and adoption",
  "RAG, agentic systems and evaluation design",
  "human review and responsible deployment",
  "cross-functional product and engineering leadership",
  "measurement, iteration and scale",
] as const;

export function Capabilities() {
  return (
    <section className="pt-[var(--section-space)]">
      <Container className="grid gap-12 min-[900px]:grid-cols-[minmax(0,1fr)_minmax(440px,0.9fr)] min-[900px]:gap-[clamp(64px,10vw,140px)]">
        <SectionHeading
          description="I connect product judgment, operating design, technical delivery and adoption rather than treating AI as a model-only decision."
          eyebrow="Capabilities"
          title="The work around the model is the product."
        />
        <ul className="m-0 p-0 [list-style:none] [counter-reset:capability]">
          {capabilities.map((capability) => (
            <li className="grid grid-cols-[34px_1fr] gap-4 border-t border-line py-4 text-[clamp(1rem,2vw,1.15rem)] font-semibold [counter-increment:capability] before:text-xs before:font-extrabold before:tracking-[0.06em] before:text-teal before:content-[counter(capability,decimal-leading-zero)]" key={capability}>
              {capability}
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
