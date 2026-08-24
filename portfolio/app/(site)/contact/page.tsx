/* eslint-disable no-unused-vars -- the inherited Babel parser does not recognize imports used by JSX. */
import type { Metadata } from "next";
import Link from "next/link";
import { CopyEmail } from "@/components/contact/copy-email";
import { siteConfig } from "@/lib/site-config";
import { buildContentMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildContentMetadata({
  title: "Contact",
  description: "Contact Shantanu Chandra directly by email or LinkedIn about AI product leadership, transformation work, products and practical learning.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <section className="contact-page" data-contact-canvas>
      <div className="contact-page__canvas">
        <header className="contact-page__intro" data-contact-intro>
          <p>Contact</p>
          <h1>Start a direct conversation.</h1>
          <p>For AI product leadership, transformation work, independent building or practical learning, email is the simplest way to reach me. No form or account is required.</p>
        </header>

        <div className="contact-page__panels">
          <article className="contact-panel contact-panel--primary" data-contact-panel>
            <p className="contact-option__label">Email</p>
            <h2>Write to me directly</h2>
            <p className="contact-panel__lead">A concise note with the problem you are working through is the most useful place to start.</p>
            <CopyEmail email={siteConfig.email} />
            <p>Plain email link—copy it, open it in your preferred mail app, or use it from any device.</p>
          </article>

          <aside className="contact-panel contact-panel--details" data-contact-panel>
            <p className="contact-option__label">LinkedIn</p>
            <h2>Connect professionally</h2>
            <a href={siteConfig.linkedin}>linkedin.com/in/chandrashantanu</a>
            <p>Use LinkedIn for professional context, shared interests and a concise introduction.</p>
            <p className="contact-option__label">Resume</p>
            <h2>Choose the format that works</h2>
            <div className="contact-option__actions">
              <Link href="/resume">View HTML resume</Link>
              <Link href={siteConfig.resumePath} prefetch={false}>Download PDF resume</Link>
            </div>
            <p>The HTML version stays usable if the current PDF download is unavailable.</p>
          </aside>
        </div>
      </div>
    </section>
  );
}
