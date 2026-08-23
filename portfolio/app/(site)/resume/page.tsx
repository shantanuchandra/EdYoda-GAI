/* eslint-disable no-unused-vars -- the inherited Babel parser does not recognize imports used by JSX. */
import type { Metadata } from "next";
import Link from "next/link";
import { ResumeDocument } from "@/components/content/resume-document";
import { Container } from "@/components/ui/container";
import { siteConfig } from "@/lib/site-config";
import { buildContentMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildContentMetadata({
  title: "Resume",
  description: "Read Shantanu Chandra’s public resume covering AI product leadership, enterprise transformation, independent products, education and methods.",
  path: "/resume",
});

export default function ResumePage() {
  return (
    <section className="resume-page">
      <Container>
        <nav aria-label="Resume actions" className="resume-actions">
          <Link href="/contact">Contact Shantanu</Link>
          <Link href={siteConfig.resumePath} prefetch={false}>Download PDF resume</Link>
        </nav>
        <ResumeDocument />
      </Container>
    </section>
  );
}
