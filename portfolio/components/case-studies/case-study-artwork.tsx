/* eslint-disable no-unused-vars, no-undef -- the inherited Babel parser does not recognize imports used by JSX or TypeScript const assertions. */
import Image from "next/image";
import { ProductBrandMark } from "@/components/content/product-brand-mark";
import type { CaseStudyKind } from "@/lib/case-studies";

const companyLogo = {
  Builder: "/images/companies/builder-ai.png",
  Hakuhodo: "/images/companies/hakuhodo.png",
  IIFL: "/images/companies/iifl-home-loans.png",
  Lenskart: "/images/companies/lenskart.png",
} as const;

export function CaseStudyArtwork({ company, kind, industry, slug }: { company?: string; kind: CaseStudyKind; industry: string; slug: string }) {
  const logo = company ? companyLogo[company as keyof typeof companyLogo] : undefined;
  const productBrand = kind === "product" ? <ProductBrandMark slug={slug} /> : null;

  return (
    <div aria-hidden={logo || productBrand ? undefined : true} className={`case-study-artwork case-study-artwork--${kind} ${productBrand ? `case-study-artwork--${slug}` : ""}`.trim()} data-case-study-media>
      {logo ? <Image alt={company ?? ""} fill priority={false} sizes="(max-width: 767px) 100vw, (max-width: 1199px) 50vw, 33vw" src={logo} /> : (
        productBrand ?? <>
          <span className="case-study-artwork__signal">Signal</span>
          <span className="case-study-artwork__system">System</span>
          <span className="case-study-artwork__scale">Scale</span>
          <span className="case-study-artwork__industry">{industry.split(" · ")[0]}</span>
        </>
      )}
    </div>
  );
}
