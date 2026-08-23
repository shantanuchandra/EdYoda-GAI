/* eslint-disable no-unused-vars -- the inherited Babel parser does not recognize imports used by JSX. */
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SignalProfileCard } from "@/components/home/signal-profile-card";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import styles from "@/components/home/home-portfolio.module.css";

export function Hero() {
  return (
    <section aria-labelledby="home-hero-title" className={styles.hero}>
      <Container className={styles.heroGrid}>
        <div className={styles.heroCopy}>
          <h1 className={styles.heroTitle} id="home-hero-title">
            Shantanu Chandra
          </h1>
          <span aria-hidden="true" className={styles.heroRule} />
          <h2 className={styles.heroLead}>
            <strong>AI Transformation Leader</strong>{" "}
            <span>across industries</span>
            <span aria-hidden="true" className={styles.heroCaret} />
          </h2>
          <div className={styles.heroActions}>
            <Button asChild className={styles.heroAction}>
              <Link href="/resume">View Resume <ArrowRight aria-hidden="true" /></Link>
            </Button>
            <Button asChild className={`${styles.heroAction} ${styles.heroActionSecondary}`} variant="secondary">
              <Link href="/case-studies">Explore Case Studies <ArrowRight aria-hidden="true" /></Link>
            </Button>
          </div>
        </div>

        <SignalProfileCard />
        <span aria-hidden="true" className={styles.scrollCue}>⌄</span>
      </Container>
    </section>
  );
}
