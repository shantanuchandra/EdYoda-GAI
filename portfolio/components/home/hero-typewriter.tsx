"use client";

/* eslint-disable no-unused-vars, no-undef -- the inherited Babel parser does not apply TypeScript/DOM scope analysis. */
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import styles from "@/components/home/home-portfolio.module.css";

const phrases = [
  "across industries",
  "through product",
  "from signal to scale",
  "with responsible AI",
] as const;

type HeroTypewriterProps = {
  reducedMotion: boolean;
};

export function HeroTypewriter({ reducedMotion }: HeroTypewriterProps) {
  const [displayedText, setDisplayedText] = useState<string>(phrases[0]);
  const [typingReady, setTypingReady] = useState(false);

  useEffect(() => {
    if (reducedMotion) {
      setDisplayedText(phrases[0]);
      setTypingReady(true);
      return;
    }

    let active = true;
    let timer: ReturnType<typeof setTimeout> | undefined;
    let phraseIndex = 0;

    const schedule = (callback: () => void, delay: number) => {
      timer = setTimeout(() => active && callback(), delay);
    };

    let currentText = "";

    function deleteCharacter() {
      if (currentText.length > 0) {
        currentText = currentText.slice(0, -1);
        setDisplayedText(currentText);
        schedule(deleteCharacter, 50);
        return;
      }

      phraseIndex = (phraseIndex + 1) % phrases.length;
      schedule(typeCharacter, 1_500);
    }

    function typeCharacter() {
      const phrase = phrases[phraseIndex];
      if (currentText.length < phrase.length) {
        currentText = phrase.slice(0, currentText.length + 1);
        setDisplayedText(currentText);
        schedule(typeCharacter, 100);
        return;
      }

      schedule(deleteCharacter, 1_500);
    }

    setDisplayedText(currentText);
    setTypingReady(true);
    schedule(typeCharacter, 500);

    return () => {
      active = false;
      if (timer) clearTimeout(timer);
    };
  }, [reducedMotion]);

  return (
    <span aria-hidden="true" className={styles.heroTypedLine} data-typing-ready={typingReady}>
      <span aria-hidden="true" data-hero-typewriter>{displayedText}</span>
      {reducedMotion ? (
        <span aria-hidden="true" className={styles.heroCaret} />
      ) : (
        <motion.span
          animate={{ opacity: [0, 1, 0] }}
          aria-hidden="true"
          className={styles.heroCaret}
          transition={{ duration: 1, ease: "linear", repeat: Number.POSITIVE_INFINITY }}
        />
      )}
    </span>
  );
}
