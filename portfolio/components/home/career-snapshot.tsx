/* eslint-disable no-unused-vars, no-undef -- the inherited Babel parser does not apply JSX/TypeScript scope analysis. */
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";

const career = [
  ["Lenskart", "AI product leadership for retail journeys"],
  ["IIFL", "Product leadership for digital lending and applied AI"],
  ["AGL", "AdTech product leadership and automation"],
  ["Builder.ai", "Conversational AI and SaaS product leadership"],
  ["Earlier career", "Product, growth and operating foundations"],
] as const;

export function CareerSnapshot() {
  return (
    <section aria-label="Career snapshot" className="pt-[var(--section-space)]">
      <Container className="grid gap-12 min-[900px]:grid-cols-[minmax(0,1fr)_minmax(440px,0.9fr)] min-[900px]:gap-[clamp(64px,10vw,140px)]">
        <SectionHeading
          description="A career shaped by operating complexity, customer behaviour and the discipline required to turn new technology into useful products."
          eyebrow="Career snapshot"
          title="Built across contexts, connected by product practice."
        />
        <ol className="m-0 border-t border-ink p-0 [list-style:none]">
          {career.map(([company, focus]) => (
            <li className="grid gap-x-5 gap-y-1 border-b border-line py-[17px] md:grid-cols-[minmax(150px,0.65fr)_1.35fr] md:items-baseline" key={company}>
              <strong className="font-display text-[1.35rem] font-semibold">{company}</strong>
              <span className="text-[0.82rem] text-muted-ink">{focus}</span>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
