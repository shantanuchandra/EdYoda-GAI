/* eslint-disable no-unused-vars -- the inherited Babel parser does not recognize imports used by JSX. */
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { siteConfig } from "@/lib/site-config";
import styles from "@/components/home/home-portfolio.module.css";

export function ContactCallout() {
  return (
    <section aria-label="Start a conversation" className={styles.contactSection} data-home-closing>
      <Container className={styles.contactPanel}>
        <span aria-hidden="true" className={styles.contactSignal}>Signal</span>
        <h2 className={styles.contactTitle}>Make the next AI decision count.</h2>
        <p className={styles.contactText}>Useful products begin with a clear problem, a responsible system and a team committed to adoption.</p>
        <Link aria-label="Contact" className={styles.contactAction} href="/contact">
          Start a conversation <span aria-hidden="true">→</span>
        </Link>
        <div className={styles.contactDirect}>
          <a href={`mailto:${siteConfig.email}`}>Email</a>
          <span aria-hidden="true">·</span>
          <a href={siteConfig.linkedin}>LinkedIn</a>
        </div>
      </Container>
    </section>
  );
}
