/* eslint-disable no-unused-vars, no-undef -- the inherited Babel parser does not apply JSX/TypeScript scope analysis. */
import type { ContentItem } from "@/lib/content/schema";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import styles from "@/components/home/home-portfolio.module.css";

type FeaturedWorkProps = { items: ContentItem[] };

function publicCompanyName(company?: string): string {
  return company === "Builder" ? "Builder.ai" : (company ?? "Employer work");
}

export function FeaturedWork({ items }: FeaturedWorkProps) {
  return (
    <section aria-label="Selected employer work" className={styles.section}>
      <Container>
        <div className={styles.sectionTop}>
          <div>
            <p className={styles.eyebrow}>Selected work</p>
            <h2 className={styles.sectionTitle}>Evidence before theatre.</h2>
          </div>
          <div>
            <p className={styles.sectionDescription}>Four transformation stories where product judgment, operating design and adoption moved together.</p>
            <Link className={styles.sectionLink} href="/case-studies#employer-transformations">View all case studies →</Link>
          </div>
        </div>
        <div className={styles.workGrid}>
          {items.map(({ metadata }) => {
            const href = `/work/${metadata.slug}`;
            const outcome = metadata.outcomes[0];
            return (
              <article className={styles.workCard} key={metadata.slug}>
                <div className={styles.workMeta}>
                  <p>{publicCompanyName(metadata.company)}</p>
                  <span>{metadata.industry.join(" / ")}</span>
                </div>
                <h3 className={styles.workTitle}><Link href={href}>{metadata.title}</Link></h3>
                <p className={styles.workDescription}>{metadata.description}</p>
                <div className={styles.workBottom}>
                  {outcome ? (
                    <div className={styles.workOutcome}>
                      <strong>{outcome.value}</strong>
                      <span>{outcome.label}</span>
                    </div>
                  ) : <span />}
                  <Link className={`${styles.workAction} inline-flex min-h-11 items-center`} href={href}>
                    Read case study <span aria-hidden="true">→</span>
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
