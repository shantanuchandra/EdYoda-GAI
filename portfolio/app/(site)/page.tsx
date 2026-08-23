/* eslint-disable no-unused-vars -- the inherited Babel parser does not recognize imports used by JSX. */
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
import { getPublicContent } from "@/lib/content/loader";

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
    </>
  );
}
