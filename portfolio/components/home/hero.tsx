/* eslint-disable no-unused-vars -- the inherited Babel parser does not recognize imports used by JSX. */
import { ActionLink } from "@/components/ui/action-link";
import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";

export function Hero() {
  return (
    <section aria-labelledby="home-hero-title" className="pt-[clamp(56px,9vw,120px)] pb-[clamp(48px,7vw,88px)]">
      <Container className="grid gap-12 min-[900px]:grid-cols-[minmax(0,2.25fr)_minmax(250px,0.75fr)] min-[900px]:items-end min-[900px]:gap-[clamp(48px,7vw,96px)]">
        <div className="max-w-[920px]">
          <p className="m-0 text-xs font-extrabold tracking-[0.12em] text-teal uppercase">AI Transformation Leader</p>
          <h1 className="hero-heading mt-[18px] mb-0" id="home-hero-title">
            I turn complex AI opportunities into adopted, measurable and responsibly governed products.
          </h1>
          <p className="mt-7 mb-0 max-w-[54ch] text-[clamp(1.05rem,2vw,1.25rem)] text-muted-ink">
            Across retail, lending, AdTech, SaaS and enterprise software.
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-x-4 gap-y-3">
            <ButtonLink href="/work">Explore selected work</ButtonLink>
            <ButtonLink href="/contact" variant="secondary">Contact me</ButtonLink>
            <ActionLink href="/shantanu-chandra-resume.pdf">Download resume</ActionLink>
          </div>
        </div>

        <aside aria-label="Operating thesis" className="self-end border-t border-ink pt-4">
          <p className="mt-0 mb-[18px] text-xs font-bold tracking-[0.08em] text-muted-ink uppercase">
            Useful transformation has a sequence.
          </p>
          <ol className="m-0 grid p-0 [list-style:none]">
            <li className="grid grid-cols-[minmax(82px,0.7fr)_1.8fr] items-baseline gap-4 border-b border-line py-[13px]">
              <span className="font-display text-2xl font-semibold">Signal</span>
              <small className="text-[0.83rem] text-muted-ink">Choose the valuable problem.</small>
            </li>
            <li className="grid grid-cols-[minmax(82px,0.7fr)_1.8fr] items-baseline gap-4 border-b border-line py-[13px]">
              <span className="font-display text-2xl font-semibold">System</span>
              <small className="text-[0.83rem] text-muted-ink">Design the work and controls.</small>
            </li>
            <li className="grid grid-cols-[minmax(82px,0.7fr)_1.8fr] items-baseline gap-4 border-b border-line py-[13px]">
              <span className="font-display text-2xl font-semibold">Scale</span>
              <small className="text-[0.83rem] text-muted-ink">Earn adoption and measure change.</small>
            </li>
          </ol>
        </aside>
      </Container>
    </section>
  );
}
