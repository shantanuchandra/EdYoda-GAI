"use client";

/* eslint-disable no-unused-vars, no-undef -- the inherited Babel parser does not recognize imports used by JSX. */
import Link from "next/link";
import { ArrowRight, ChevronDown } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";
import { SignalProfileCard } from "@/components/home/signal-profile-card";
import { HeroTypewriter } from "@/components/home/hero-typewriter";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import styles from "@/components/home/home-portfolio.module.css";

export function Hero() {
  const reducedMotion = useReducedMotion();
  const [showScrollCue, setShowScrollCue] = useState(true);

  useEffect(() => {
    const handleScroll = () => setShowScrollCue(window.scrollY < 100);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      aria-labelledby="home-hero-title"
      className={styles.hero}
      data-hero-motion="shell"
    >
      <Container className={styles.heroGrid}>
        <div className={styles.heroCopy}>
          <h1
            className={styles.heroTitle}
            data-hero-motion="title"
            id="home-hero-title"
          >
            Shantanu Chandra
          </h1>
          <span
            aria-hidden="true"
            className={styles.heroRule}
            data-hero-motion="rule"
          />
          <h2
            aria-label="AI Transformation Leader across industries"
            className={styles.heroLead}
            data-hero-motion="lead"
          >
            <strong aria-hidden="true">AI Transformation Leader</strong>{" "}
            <HeroTypewriter reducedMotion={Boolean(reducedMotion)} />
          </h2>
          <div
            className={styles.heroActions}
            data-hero-motion="actions"
          >
            <Button asChild className={styles.heroAction}>
              <Link href="/resume">
                <span>View Resume</span>
                <ArrowRight aria-hidden="true" />
                <span aria-hidden="true" className={styles.heroActionShine} data-button-shine />
              </Link>
            </Button>
            <Button asChild className={`${styles.heroAction} ${styles.heroActionSecondary}`} variant="secondary">
              <Link href="/case-studies">
                <span>Explore Case Studies</span>
                <ArrowRight aria-hidden="true" />
                <span aria-hidden="true" className={styles.heroActionShine} data-button-shine />
              </Link>
            </Button>
          </div>
        </div>

        <SignalProfileCard />

        {reducedMotion ? (
          showScrollCue ? (
            <a
              aria-label="Scroll to impact highlights"
              className={styles.scrollCue}
              data-hero-scroll-cue
              href="#impact-highlights"
            >
              <ChevronDown aria-hidden="true" />
            </a>
          ) : null
        ) : (
          <AnimatePresence>
            {showScrollCue ? (
              <motion.a
                aria-label="Scroll to impact highlights"
                className={styles.scrollCue}
                data-hero-scroll-cue
                exit={{ opacity: 0, y: 10 }}
                href="#impact-highlights"
                initial={false}
                transition={{ duration: 0.4, ease: "easeInOut" }}
              >
                <motion.span
                  animate={{ y: [0, 5, 0] }}
                  aria-hidden="true"
                  transition={{ duration: 1.5, ease: "easeInOut", repeat: Number.POSITIVE_INFINITY }}
                >
                  <ChevronDown />
                </motion.span>
              </motion.a>
            ) : null}
          </AnimatePresence>
        )}
      </Container>
    </section>
  );
}
