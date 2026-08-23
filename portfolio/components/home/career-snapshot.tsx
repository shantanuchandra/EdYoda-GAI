/* eslint-disable no-unused-vars -- the inherited Babel parser does not recognize imports used by JSX. */
import { Container } from "@/components/ui/container";
import Link from "next/link";
import { CareerRail } from "@/components/home/career-rail";
import { publicCareer } from "@/lib/resume-data";
import styles from "@/components/home/home-portfolio.module.css";

export function CareerSnapshot() {
  return (
    <section aria-label="Career snapshot" className={styles.section}>
      <Container>
        <div className={styles.careerHeader}>
          <div>
            <p className={styles.eyebrow}>Career signal</p>
            <h2 className={styles.sectionTitle}>Built across industries. One product practice.</h2>
          </div>
          <Link className={styles.careerLink} href="/resume">Read the full resume →</Link>
        </div>
        <div className={styles.careerBody}>
          <CareerRail roles={publicCareer} />
        </div>
      </Container>
    </section>
  );
}
