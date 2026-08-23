/* eslint-disable no-unused-vars -- the inherited Babel parser does not apply JSX/TypeScript scope analysis. */
import { SpecializationCards } from "@/components/home/specialization-cards";
import { Container } from "@/components/ui/container";
import styles from "@/components/home/home-portfolio.module.css";

export function Capabilities() {
  return (
    <section aria-labelledby="specialization-title" className={styles.specializationSection}>
      <Container className={styles.specializationInner}>
        <header className={styles.specializationHeader}>
          <h2 className={styles.specializationTitle} id="specialization-title">
            Areas of <span>Specialization</span>
          </h2>
          <p className={styles.specializationIntro} data-specialization-intro>
            I connect product strategy, system design and adoption to turn AI opportunities into measurable operating change.
          </p>
        </header>
        <SpecializationCards />
      </Container>
    </section>
  );
}
