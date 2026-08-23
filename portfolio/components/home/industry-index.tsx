/* eslint-disable no-unused-vars, no-undef -- the inherited Babel parser does not apply JSX/TypeScript scope analysis. */
import Link from "next/link";
import { Container } from "@/components/ui/container";

const industries = [
  { label: "Retail", detail: "Voice-guided eye tests and responsible store AI", href: "/work/lenskart-ai-retail" },
  { label: "Lending", detail: "Onboarding, approval and field-sales support", href: "/work/iifl-digital-lending" },
  { label: "AdTech", detail: "Campaign automation and operating scale", href: "/work/agl-adtech-operations" },
  { label: "SaaS", detail: "Conversational AI and customer-success adoption", href: "/work/builder-conversational-ai" },
  { label: "Enterprise software", detail: "Leadership across complex product systems", href: "/about" },
] as const;

export function IndustryIndex() {
  return (
    <section aria-labelledby="industry-index-title" className="mt-[var(--section-space)] border-y border-line bg-surface py-14">
      <Container>
        <div>
          <p className="m-0 text-xs font-extrabold tracking-[0.12em] text-teal uppercase">Industry index</p>
          <h2 className="mt-3 mb-9 max-w-[620px] font-display text-[clamp(2rem,4vw,3.6rem)] leading-none font-medium tracking-[-0.03em]" id="industry-index-title">
            Five contexts. One operating discipline.
          </h2>
        </div>
        <div className="border-t border-ink">
          {industries.map((industry) => (
            <Link className="group grid grid-cols-[1fr_auto] gap-x-4 gap-y-1.5 border-b border-line py-[18px] no-underline md:grid-cols-[minmax(190px,0.8fr)_2fr_auto] md:items-center" href={industry.href} key={industry.label}>
              <strong className="font-display text-[1.35rem] font-semibold">{industry.label}</strong>
              <span className="col-start-1 text-[0.82rem] text-muted-ink md:col-start-2 md:row-start-1">{industry.detail}</span>
              <span aria-hidden="true" className="col-start-2 row-span-2 row-start-1 self-center text-teal transition-transform duration-200 ease-[var(--ease-out)] group-hover:translate-x-1 group-focus-visible:translate-x-1 md:col-start-3 md:row-span-1">→</span>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
