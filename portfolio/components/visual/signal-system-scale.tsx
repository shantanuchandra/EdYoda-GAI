/* eslint-disable no-unused-vars -- the inherited Babel parser does not recognize imports used by JSX. */
import { Reveal } from "@/components/ui/reveal";

export function SignalSystemScale() {
  return (
    <Reveal>
      <figure aria-labelledby="signal-system-scale-caption" className="m-0">
        <ol className="m-0 grid border-t border-[rgb(200_211_206_/_45%)] p-0 [list-style:none]">
          <li className="grid grid-cols-[38px_1fr] gap-x-3 gap-y-1.5 border-b border-[rgb(200_211_206_/_45%)] py-5">
            <span className="row-span-2 text-xs font-extrabold tracking-[0.08em] text-sand">01</span>
            <strong className="font-display text-[1.75rem] leading-none font-semibold">Signal</strong>
            <p className="m-0 text-[0.8rem] text-on-dark-muted">Find the decision or workflow worth changing.</p>
          </li>
          <li className="grid grid-cols-[38px_1fr] gap-x-3 gap-y-1.5 border-b border-[rgb(200_211_206_/_45%)] py-5">
            <span className="row-span-2 text-xs font-extrabold tracking-[0.08em] text-sand">02</span>
            <strong className="font-display text-[1.75rem] leading-none font-semibold">System</strong>
            <p className="m-0 text-[0.8rem] text-on-dark-muted">Join data, tools, controls and human judgment.</p>
          </li>
          <li className="grid grid-cols-[38px_1fr] gap-x-3 gap-y-1.5 border-b border-[rgb(200_211_206_/_45%)] py-5">
            <span className="row-span-2 text-xs font-extrabold tracking-[0.08em] text-sand">03</span>
            <strong className="font-display text-[1.75rem] leading-none font-semibold">Scale</strong>
            <p className="m-0 text-[0.8rem] text-on-dark-muted">Design for adoption, iteration and measurable value.</p>
          </li>
        </ol>
        <figcaption className="sr-only" id="signal-system-scale-caption">
          Signal identifies the valuable problem, System makes the workflow reliable and responsible, and Scale turns adoption into measurable change.
        </figcaption>
      </figure>
    </Reveal>
  );
}
