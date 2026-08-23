/* eslint-disable no-unused-vars -- the inherited Babel parser does not recognize imports used by JSX. */
import type { CaseStudyKind } from "@/lib/case-studies";

export function CaseStudyArtwork({ kind, industry }: { kind: CaseStudyKind; industry: string }) {
  return (
    <div aria-hidden="true" className={`case-study-artwork case-study-artwork--${kind}`}>
      <span className="case-study-artwork__signal">Signal</span>
      <span className="case-study-artwork__system">System</span>
      <span className="case-study-artwork__scale">Scale</span>
      <span className="case-study-artwork__industry">{industry.split(" · ")[0]}</span>
    </div>
  );
}
