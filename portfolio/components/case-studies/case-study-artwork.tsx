/* eslint-disable no-unused-vars, no-undef -- the inherited Babel parser does not recognize imports used by JSX or TypeScript const assertions. */
import Image from "next/image";
import type { CaseStudyKind } from "@/lib/case-studies";

const companyLogo = {
  Builder: "/images/companies/builder-ai.png",
  Hakuhodo: "/images/companies/hakuhodo.png",
  IIFL: "/images/companies/iifl-home-loans.png",
  Lenskart: "/images/companies/lenskart.png",
} as const;

export function CaseStudyArtwork({ company, kind, industry }: { company?: string; kind: CaseStudyKind; industry: string }) {
  const logo = company ? companyLogo[company as keyof typeof companyLogo] : undefined;

  return (
    <div aria-hidden={logo ? undefined : true} className={`case-study-artwork case-study-artwork--${kind}`} data-case-study-media>
      {logo ? <Image alt={company ?? ""} fill priority={false} sizes="(max-width: 767px) 100vw, (max-width: 1199px) 50vw, 33vw" src={logo} /> : (
        <>
          <span className="case-study-artwork__signal">Signal</span>
          <span className="case-study-artwork__system">System</span>
          <span className="case-study-artwork__scale">Scale</span>
          <span className="case-study-artwork__industry">{industry.split(" · ")[0]}</span>
        </>
      )}
    </div>
  );
}
