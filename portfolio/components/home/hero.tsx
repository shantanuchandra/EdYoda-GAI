/* eslint-disable no-unused-vars -- the inherited Babel parser does not recognize imports used by JSX. */
import { ButtonLink } from "@/components/ui/button-link";
import { SignalProfileCard } from "@/components/home/signal-profile-card";
import { Container } from "@/components/ui/container";
import styles from "@/components/home/home-portfolio.module.css";

export function Hero() {
  return (
    <section aria-labelledby="home-hero-title" className={styles.hero}>
      <Container className={styles.heroGrid}>
        <div className={styles.heroCopy}>
          <h1 className={styles.heroTitle} id="home-hero-title">
            Shantanu Chandra
          </h1>
          <p className={styles.heroLead}>
            AI Transformation Leader turning complex opportunities into useful, governed products across industries.
          </p>
          <div className={styles.heroActions}>
            <ButtonLink href="/resume">View Resume</ButtonLink>
            <ButtonLink href="/case-studies" variant="secondary">Explore Case Studies</ButtonLink>
          </div>
        </div>

        <SignalProfileCard />
        <span aria-hidden="true" className={styles.scrollCue}>⌄</span>
      </Container>
    </section>
  );
}
