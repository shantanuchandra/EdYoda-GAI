"use client";

/* eslint-disable no-unused-vars, no-undef -- the inherited Babel parser does not apply JSX/TypeScript scope analysis. */
import { Building2, Network, Target, TrendingUp, type LucideIcon } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";
import styles from "@/components/home/home-portfolio.module.css";

type Specialization = {
  title: string;
  description: string;
  icon: LucideIcon;
};

const specializations: readonly Specialization[] = [
  {
    title: "Signal",
    description: "AI product strategy and portfolio prioritization, grounded in workflow and operating-model redesign.",
    icon: Target,
  },
  {
    title: "System",
    description: "Product discovery and adoption; RAG, agentic systems and evaluation design, plus human review and responsible deployment.",
    icon: Network,
  },
  {
    title: "Scale",
    description: "Scaling depends on cross-functional product and engineering leadership, measurement, iteration and scale.",
    icon: TrendingUp,
  },
  {
    title: "Across industries",
    description: "Retail, lending, AdTech, SaaS and enterprise software form the cross-industry AI transformation record.",
    icon: Building2,
  },
];

const easeOutExpo = [0.16, 1, 0.3, 1] as const;

export function SpecializationCards() {
  const reduceMotion = useReducedMotion();
  const [ready, setReady] = useState(false);

  useEffect(() => setReady(true), []);

  return (
    <div
      className={styles.specializationGrid}
      data-specialization-grid
      data-specialization-ready={ready}
    >
      {specializations.map(({ title, description, icon: Icon }, index) => (
        <motion.article
          className={styles.specializationCard}
          data-specialization-card
          initial={false}
          key={title}
          viewport={{ amount: 0.18, once: true }}
          whileHover={reduceMotion ? undefined : {
            y: -12,
            transition: { delay: 0, duration: 0.3, ease: easeOutExpo },
          }}
          whileInView={reduceMotion ? undefined : {
            opacity: [0.72, 1],
            y: [50, 0],
            transition: {
              delay: index * 0.15,
              duration: 0.8,
              ease: easeOutExpo,
            },
          }}
        >
          <span aria-hidden="true" className={styles.specializationIcon}>
            <Icon aria-hidden="true" focusable="false" size={26} strokeWidth={1.8} />
          </span>
          <h3 className={styles.specializationCardTitle}>{title}</h3>
          <p className={styles.specializationCardDescription}>{description}</p>
        </motion.article>
      ))}
    </div>
  );
}
