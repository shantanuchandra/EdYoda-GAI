"use client";

/* eslint-disable no-unused-vars, no-undef -- the inherited Babel parser does not apply JSX/TypeScript scope analysis. */
import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  className?: string;
};

export function Reveal({ children, className }: RevealProps) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return (
      <div className={className} data-reveal style={{ opacity: 1, transform: "none" }}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      className={className}
      data-reveal
      initial={false}
      transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
      viewport={{ once: true }}
      whileInView={{ opacity: [0.98, 1], y: [12, 0] }}
    >
      {children}
    </motion.div>
  );
}
