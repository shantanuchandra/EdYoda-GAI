/* eslint-disable no-unused-vars -- the inherited Babel parser does not recognize imports used by JSX. */
import { Container } from "@/components/ui/container";
import { CareerRail } from "@/components/home/career-rail";
import { homepageCareer } from "@/lib/resume-data";
import styles from "@/components/home/home-portfolio.module.css";

export function CareerSnapshot() {
  return (
    <section aria-label="Career snapshot" className={styles.careerSection} id="career-snapshot">
      <Container>
        <header className={styles.careerHeading}>
          <h2 id="career-heading">Companies I&apos;ve worked with</h2>
        </header>
        <CareerRail roles={homepageCareer} />
      </Container>
    </section>
  );
}
