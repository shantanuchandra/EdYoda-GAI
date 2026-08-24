/* eslint-disable no-unused-vars -- the inherited Babel parser does not recognize imports used by JSX. */
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, BriefcaseBusiness, Download, FileText } from "lucide-react";
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
          <h1>Get in touch</h1>
          <p>Have an AI product or transformation problem worth working through? Start with a concise note.</p>
        </header>

        <div className="contact-page__panels">
          <article className="contact-panel contact-panel--primary" data-contact-panel>
            <p className="contact-option__label">Start a conversation</p>
            <h2>Send the useful first note</h2>
            <p className="contact-panel__lead">The strongest introductions give just enough signal to make the first conversation useful.</p>

            <div className="contact-prompts" aria-label="What to include in your note">
              <div className="contact-prompt" data-contact-prompt>
                <span aria-hidden="true">01</span>
                <div><strong>Context</strong><p>What is changing, who is affected, and why it matters now.</p></div>
              </div>
              <div className="contact-prompt" data-contact-prompt>
                <span aria-hidden="true">02</span>
                <div><strong>Constraint</strong><p>What has made the problem difficult to solve so far.</p></div>
              </div>
              <div className="contact-prompt" data-contact-prompt>
                <span aria-hidden="true">03</span>
                <div><strong>Outcome</strong><p>What a useful first conversation should help clarify.</p></div>
              </div>
            </div>

            <div className="contact-panel__primary-action" data-contact-primary-action>
              <CopyEmail email={siteConfig.email} />
              <p>Open your mail app or copy the address for later.</p>
            </div>
          </article>

          <aside className="contact-panel contact-panel--details" data-contact-panel>
            <p className="contact-option__label">Contact details</p>
            <h2>Choose the most useful route</h2>

            <nav className="contact-routes" aria-label="Contact routes">
              <a aria-label="linkedin.com/in/chandrashantanu" data-contact-action href={siteConfig.linkedin}>
                <span className="contact-route__icon" aria-hidden="true"><BriefcaseBusiness /></span>
                <span><strong>linkedin.com/in/chandrashantanu</strong><small>Connect with professional context</small></span>
                <ArrowUpRight aria-hidden="true" />
              </a>
              <Link aria-label="View HTML resume" data-contact-action href="/resume">
                <span className="contact-route__icon" aria-hidden="true"><FileText /></span>
                <span><strong>View HTML resume</strong><small>Read the complete experience profile</small></span>
                <ArrowUpRight aria-hidden="true" />
              </Link>
              <Link aria-label="Download PDF resume" data-contact-action href={siteConfig.resumePath} prefetch={false}>
                <span className="contact-route__icon" aria-hidden="true"><Download /></span>
                <span><strong>Download PDF resume</strong><small>Keep a print-ready copy</small></span>
                <ArrowUpRight aria-hidden="true" />
              </Link>
            </nav>

            <div className="contact-topics">
              <p className="contact-option__label">Typical conversations</p>
              <div aria-label="Conversation topics">
                <span>AI product leadership</span>
                <span>Enterprise transformation</span>
                <span>Applied AI education</span>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
