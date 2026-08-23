/* eslint-disable no-unused-vars, no-undef -- the inherited Babel parser does not apply JSX/TypeScript scope analysis. */
import type { ContentItem } from "@/lib/content/schema";
import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/ui/container";
import styles from "@/components/home/home-portfolio.module.css";

type FeaturedWorkProps = { items: ContentItem[] };

function publicCompanyName(company?: string): string {
  return company === "Builder" ? "Builder.ai" : (company ?? "Employer work");
}

const companyAssets: Readonly<Record<string, string>> = {
  Lenskart: "/images/companies/lenskart.png",
  IIFL: "/images/companies/iifl-home-loans.png",
  Hakuhodo: "/images/companies/hakuhodo.png",
  "Builder.ai": "/images/companies/builder-ai.png",
};

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
            const company = publicCompanyName(metadata.company);
            return (
              <article className={styles.workCard} data-featured-work-card key={metadata.slug}>
                <div aria-hidden="true" className={styles.workMedia} data-featured-work-media>
                  <span className={styles.workMediaHalo} />
                  <Image
                    alt=""
                    className={styles.workLogo}
                    height={120}
                    src={companyAssets[company]}
                    unoptimized
                    width={220}
                  />
                </div>
                <div className={styles.workContent}>
                  <div className={styles.workTags} data-featured-work-tags>
                    {metadata.industry.slice(0, 2).map((industry) => <span key={industry}>{industry}</span>)}
                  </div>
                  <h3 className={styles.workTitle}><Link href={href}>{metadata.title}</Link></h3>
                  <p className={styles.workCompany}>{company}</p>
                  <p className={styles.workDescription}>{metadata.description}</p>
                  {outcome ? (
                    <p className={styles.workOutcome}>
                      <strong>{outcome.value}</strong>
                      <span>{outcome.label}</span>
                    </p>
                  ) : null}
                </div>
                <div className={styles.workFooter} data-featured-work-footer>
                  <ul aria-label={`${company} case-study methods`}>
                    {metadata.methods.slice(0, 3).map((method) => <li key={method}>{method}</li>)}
                  </ul>
                  <Link aria-label="Read case study" className={`${styles.workAction} inline-flex min-h-11 items-center`} href={href}>
                    <span aria-hidden="true">→</span>
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
