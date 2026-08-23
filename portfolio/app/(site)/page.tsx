/* eslint-disable no-unused-vars -- the inherited Babel parser does not recognize imports used by JSX. */
import type { Metadata } from "next";
import { Capabilities } from "@/components/home/capabilities";
import { CareerSnapshot } from "@/components/home/career-snapshot";
import { ContactCallout } from "@/components/home/contact-callout";
import { FeaturedWork } from "@/components/home/featured-work";
import { Hero } from "@/components/home/hero";
import { ImpactStrip } from "@/components/home/impact-strip";
import { IndustryIndex } from "@/components/home/industry-index";
import { LearningPreview } from "@/components/home/learning-preview";
import { Principles } from "@/components/home/principles";
import { ProductsPreview } from "@/components/home/products-preview";
import { JsonLd } from "@/components/seo/json-ld";
import { getPublicContent } from "@/lib/content/loader";
import { buildContentMetadata } from "@/lib/metadata";
import { buildPersonJsonLd } from "@/lib/structured-data";

const description = "Shantanu Chandra turns complex AI opportunities into adopted, measurable and responsibly governed products across five industries.";

export const metadata: Metadata = buildContentMetadata({
  title: "Shantanu Chandra | AI Transformation Leader",
  description,
  path: "/",
  absoluteTitle: true,
});

export default async function HomePage() {
  const [work, products, learning] = await Promise.all([
    getPublicContent("work"),
    getPublicContent("products"),
    getPublicContent("learning"),
  ]);

  return (
    <>
      <Hero />
      <ImpactStrip />
      <FeaturedWork items={work} />
      <Capabilities />
      <IndustryIndex />
      <ProductsPreview items={products} />
      <LearningPreview items={learning} />
      <Principles />
      <CareerSnapshot />
      <ContactCallout />
      <JsonLd data={buildPersonJsonLd({
        path: "/",
        pageName: "Shantanu Chandra — AI Transformation Leader",
        description,
      })} />
    </>
  );
}
