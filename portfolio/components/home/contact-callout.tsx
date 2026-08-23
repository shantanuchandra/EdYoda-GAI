/* eslint-disable no-unused-vars -- the inherited Babel parser does not recognize imports used by JSX. */
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { siteConfig } from "@/lib/site-config";
import styles from "@/components/home/home-portfolio.module.css";

export function ContactCallout() {
  return (
    <section aria-label="Start a conversation" className={styles.contactSection}>
      <Container className={styles.contactPanel}>
        <div>
          <p className={styles.eyebrow}>Start a conversation</p>
          <h2 className={styles.contactTitle}>Make the next AI decision count.</h2>
          <p className={styles.contactText}>I am interested in useful products, difficult operating problems and teams that care about adoption.</p>
        </div>
        <div className={styles.contactActions}>
          <a href={`mailto:${siteConfig.email}`}>Email</a>
          <a href={siteConfig.linkedin}>LinkedIn</a>
          <Link href="/contact">Contact</Link>
        </div>
      </Container>
    </section>
  );
}
