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

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: reduceMotion ? 0 : 12 }}
      transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
      viewport={{ once: true }}
      whileInView={{ opacity: 1, y: 0 }}
    >
      {children}
    </motion.div>
  );
}
