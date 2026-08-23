/* eslint-disable no-unused-vars -- the inherited Babel parser does not recognize imports used by JSX. */
import { Container } from "@/components/ui/container";
import { SignalSystemScale } from "@/components/visual/signal-system-scale";

export function Principles() {
  return (
    <section aria-labelledby="principles-title" className="mt-[var(--section-space)] bg-dark-section py-[clamp(64px,9vw,112px)] text-on-dark">
      <Container className="grid gap-14 min-[900px]:grid-cols-[minmax(0,1fr)_minmax(420px,0.85fr)] min-[900px]:items-center min-[900px]:gap-[clamp(72px,10vw,136px)]">
        <div>
          <p className="m-0 text-xs font-extrabold tracking-[0.12em] text-sand uppercase">Operating principle</p>
          <h2 className="mt-4 mb-6 max-w-[580px] font-display text-[clamp(3rem,7vw,5.5rem)] leading-[0.94] font-medium tracking-[-0.035em]" id="principles-title">
            Signal. System. Scale.
          </h2>
          <p className="m-0 max-w-[50ch] text-on-dark-muted">
            The useful unit of AI transformation is not a demo. It is a changed workflow that people trust, adopt and can improve.
          </p>
        </div>
        <SignalSystemScale />
      </Container>
    </section>
  );
}
