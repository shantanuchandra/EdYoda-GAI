"use client";

/* eslint-disable no-undef -- the inherited Babel parser does not recognize DOM/TypeScript scope analysis. */
import { useRef } from "react";
import type { CareerRole } from "@/lib/resume-data";

type CareerRailProps = { roles: readonly CareerRole[] };

export function CareerRail({ roles }: CareerRailProps) {
  const railRef = useRef<HTMLOListElement>(null);

  function move(direction: number) {
    railRef.current?.scrollBy({ left: direction * 320, behavior: "smooth" });
  }

  return (
    <div className="career-rail">
      <div className="career-rail__controls" aria-label="Career timeline controls">
        <button className="career-rail__control" type="button" onClick={() => move(-1)} aria-label="Scroll career timeline left">←</button>
        <button className="career-rail__control" type="button" onClick={() => move(1)} aria-label="Scroll career timeline right">→</button>
      </div>
      <ol ref={railRef} aria-label="Career timeline" className="career-rail__list" tabIndex={0}>
        {roles.map((role) => (
          <li className="career-rail__item" key={`${role.company}-${role.start}`}>
            <p className="career-rail__period">{role.periodLabel}</p>
            <strong>{role.company === "IIFL Home Loans" ? "IIFL" : role.company === "AGL (Hakuhodo)" ? "AGL" : role.company === "Builder.ai" && role.start === "2022-04" ? "Builder.ai · Conversational AI" : role.company}</strong>
            <span>{role.title}</span>
            <p>{role.focus}</p>
          </li>
        ))}
        <li className="career-rail__item" key="earlier-career">
          <p className="career-rail__period">Before 2019</p>
          <strong>Earlier career</strong>
          <span>Product, growth and operating foundations</span>
          <p>Software, support and customer-facing work that shaped the operating discipline behind today&apos;s product leadership.</p>
        </li>
      </ol>
    </div>
  );
}
