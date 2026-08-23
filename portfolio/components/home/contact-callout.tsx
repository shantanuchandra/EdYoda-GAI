/* eslint-disable no-unused-vars -- the inherited Babel parser does not recognize imports used by JSX. */
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { siteConfig } from "@/lib/site-config";

export function ContactCallout() {
  return (
    <section aria-label="Start a conversation" className="mt-[var(--section-space)]">
      <Container className="grid gap-9 rounded-card bg-sand p-[clamp(28px,6vw,64px)] min-[900px]:grid-cols-[minmax(0,1fr)_auto] min-[900px]:items-end">
        <div>
          <p className="m-0 text-xs font-extrabold tracking-[0.12em] text-teal uppercase">Start a conversation</p>
          <h2 className="mt-3 mb-[18px] max-w-[750px] font-display text-[clamp(2.3rem,5vw,4.5rem)] leading-none font-medium tracking-[-0.03em]">
            Working through a consequential AI product decision?
          </h2>
          <p className="m-0 max-w-[62ch] text-teal-dark">I am always interested in useful products, difficult operating problems and teams that care about adoption.</p>
        </div>
        <div className="flex flex-wrap gap-x-6 gap-y-2">
          <a className="inline-flex min-h-11 items-center font-extrabold text-teal-dark underline decoration-2 underline-offset-[5px]" href={`mailto:${siteConfig.email}`}>Email</a>
          <a className="inline-flex min-h-11 items-center font-extrabold text-teal-dark underline decoration-2 underline-offset-[5px]" href={siteConfig.linkedin}>LinkedIn</a>
          <Link className="inline-flex min-h-11 items-center font-extrabold text-teal-dark underline decoration-2 underline-offset-[5px]" href="/contact">Contact</Link>
        </div>
      </Container>
    </section>
  );
}
