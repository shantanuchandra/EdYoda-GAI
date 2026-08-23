/* eslint-disable no-unused-vars -- the inherited Babel parser does not recognize imports used by JSX. */
import { ActionLink } from "@/components/ui/action-link";
import { ButtonLink } from "@/components/ui/button-link";
import { SignalProfileCard } from "@/components/home/signal-profile-card";
import { Container } from "@/components/ui/container";
import styles from "@/components/home/home-portfolio.module.css";

export function Hero() {
  return (
    <section aria-labelledby="home-hero-title" className={styles.hero}>
      <Container className={styles.heroGrid}>
        <div className={styles.heroCopy}>
          <p className={styles.eyebrow}>AI Transformation Leader</p>
          <h1 className={styles.heroTitle} id="home-hero-title">
            I make enterprise AI <em>useful — and used.</em>
          </h1>
          <p className={styles.heroLead}>
            I lead AI product strategy, operating-model redesign and governed delivery across retail, lending, AdTech, SaaS and enterprise software.
          </p>
          <div className={styles.heroActions}>
            <ButtonLink href="/case-studies">Explore case studies</ButtonLink>
            <ButtonLink href="/contact" variant="secondary">Contact me</ButtonLink>
            <ActionLink href="/shantanu-chandra-resume.pdf" prefetch={false}>Download resume</ActionLink>
          </div>
          <ul className={styles.heroFacts} aria-label="Leadership context">
            <li>Current: AI Product Lead at Lenskart</li>
            <li>Retail · Lending · AdTech · SaaS · Enterprise</li>
          </ul>
        </div>

        <SignalProfileCard />
      </Container>
    </section>
  );
}
