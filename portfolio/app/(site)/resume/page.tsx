/* eslint-disable no-unused-vars -- the inherited Babel parser does not recognize imports used by JSX. */
import Link from "next/link";
import { ResumeDocument } from "@/components/content/resume-document";
import { Container } from "@/components/ui/container";
import { siteConfig } from "@/lib/site-config";

export default function ResumePage() {
  return (
    <section className="resume-page">
      <Container>
        <nav aria-label="Resume actions" className="resume-actions">
          <Link href="/contact">Contact Shantanu</Link>
          <Link href={siteConfig.resumePath}>Download PDF resume</Link>
        </nav>
        <ResumeDocument />
      </Container>
    </section>
  );
}
