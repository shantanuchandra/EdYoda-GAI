/* eslint-disable no-unused-vars -- the inherited Babel parser does not recognize imports used by JSX. */
import type { Metadata } from "next";
import { Capabilities } from "@/components/home/capabilities";
import { CareerSnapshot } from "@/components/home/career-snapshot";
import { ContactCallout } from "@/components/home/contact-callout";
import { Hero } from "@/components/home/hero";
import { JsonLd } from "@/components/seo/json-ld";
import { buildContentMetadata } from "@/lib/metadata";
import { buildPersonJsonLd } from "@/lib/structured-data";
import styles from "@/components/home/home-portfolio.module.css";

const description = "Shantanu Chandra leads AI product strategy, operating-model redesign and governed delivery across retail, lending, AdTech, SaaS and enterprise software.";

export const metadata: Metadata = buildContentMetadata({
  title: "Shantanu Chandra | AI Transformation Leader",
  description,
  path: "/",
  absoluteTitle: true,
});

export default async function HomePage() {
  return (
    <>
      <div className={styles.home}>
        <Hero />
        <CareerSnapshot />
        <Capabilities />
        <ContactCallout />
      </div>
      <JsonLd data={buildPersonJsonLd({
        path: "/",
        pageName: "Shantanu Chandra — AI Transformation Leader",
        description,
      })} />
    </>
  );
}
