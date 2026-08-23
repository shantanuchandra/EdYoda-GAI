"use client";

/* eslint-disable no-undef, no-unused-vars -- the inherited Babel parser does not recognize DOM/TypeScript scope analysis or imports used by JSX. */
import { Pause, Play } from "lucide-react";
import { animate, motion, useMotionValue, useReducedMotion, wrap } from "motion/react";
import { useEffect, useMemo, useRef, useState } from "react";
import type { CareerRole } from "@/lib/resume-data";
import styles from "@/components/home/home-portfolio.module.css";

type CareerRailProps = { roles: readonly CareerRole[] };

type CareerCard = CareerRole & { key: string; periodOverride?: string };

const earlierCareer: CareerCard = {
  company: "Earlier career",
  title: "Product, growth and operating foundations",
  start: "before-2019",
  end: "before-2019",
  periodLabel: "Before 2019",
  periodOverride: "Before 2019",
  focus: "Customer-facing and commercial work that shaped the operating discipline behind today’s product leadership.",
  key: "earlier-career",
};

function displayCompany(company: string) {
  if (company === "IIFL Home Loans") return "IIFL";
  if (company === "AGL (Hakuhodo)") return "AGL";
  return company;
}

function numericPeriod({ start, end, periodOverride }: CareerCard) {
  if (periodOverride) return periodOverride;
  const format = (value: string) => {
    if (value === "present") return "Present";
    const [year, month] = value.split("-");
    return `${month}/${year}`;
  };
  return `${format(start)} – ${format(end)}`;
}

function CareerCardContent({ card, clone = false }: { card: CareerCard; clone?: boolean }) {
  const company = displayCompany(card.company);
  const content = (
    <article className={styles.careerCard} data-career-card={clone ? undefined : "true"}>
      <div className={styles.careerWordmark} aria-hidden="true">
        <span>{company}</span>
      </div>
      <p className={styles.careerCompany}>{company}</p>
      <p className={styles.careerPeriod}>{numericPeriod(card)}</p>
      <h3 className={styles.careerRole}>{card.title}</h3>
      <p className={styles.careerFocus}>{card.focus}</p>
    </article>
  );

  return clone
    ? <div className={styles.careerItem}>{content}</div>
    : <li className={styles.careerItem}>{content}</li>;
}

export function CareerRail({ roles }: CareerRailProps) {
  const cards = useMemo<CareerCard[]>(() => [
    ...roles
      .map((role) => ({ ...role, key: `${role.company}-${role.start}` }))
      .sort((left, right) => right.start.localeCompare(left.start)),
    earlierCareer,
  ], [roles]);
  const primaryGroupRef = useRef<HTMLOListElement>(null);
  const x = useMotionValue(0);
  const shouldReduceMotion = useReducedMotion();
  const [cycleWidth, setCycleWidth] = useState(0);
  const [manualPaused, setManualPaused] = useState(false);
  const [interacting, setInteracting] = useState(false);
  const motionDisabled = Boolean(shouldReduceMotion);
  const motionPaused = motionDisabled || manualPaused || interacting;

  useEffect(() => {
    const group = primaryGroupRef.current;
    if (!group) return;
    const measure = () => setCycleWidth(group.getBoundingClientRect().width + 24);
    measure();
    if (typeof ResizeObserver === "undefined") return;
    const observer = new ResizeObserver(measure);
    observer.observe(group);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (motionPaused || cycleWidth <= 0) return;
    let cancelled = false;
    let controls: ReturnType<typeof animate> | undefined;

    const run = () => {
      if (cancelled) return;
      let current = wrap(-cycleWidth, 0, x.get());
      if (Math.abs(current + cycleWidth) < 1) current = 0;
      x.set(current);
      const remaining = cycleWidth + current;
      controls = animate(x, -cycleWidth, {
        duration: Math.max(remaining / 100, 0.1),
        ease: "linear",
      });
      controls.then(() => {
        if (cancelled) return;
        x.set(0);
        run();
      });
    };

    run();
    return () => {
      cancelled = true;
      controls?.stop();
    };
  }, [cycleWidth, motionPaused, x]);

  function moveByCard(direction: number) {
    if (cycleWidth <= 0) return;
    x.set(wrap(-cycleWidth, 0, x.get() + direction * 324));
  }

  return (
    <div className={styles.careerRail}>
      <p className="sr-only" id="career-rail-instructions">
        Use the left and right arrow keys or drag to explore the career timeline.
      </p>
      <div
        aria-describedby="career-rail-instructions"
        aria-label="Career timeline carousel"
        className={styles.careerViewport}
        data-career-viewport
        onBlur={() => setInteracting(false)}
        onFocus={() => setInteracting(true)}
        onKeyDown={(event) => {
          if (event.key === "ArrowRight") {
            event.preventDefault();
            moveByCard(-1);
          }
          if (event.key === "ArrowLeft") {
            event.preventDefault();
            moveByCard(1);
          }
        }}
        onMouseEnter={() => setInteracting(true)}
        onMouseLeave={() => setInteracting(false)}
        tabIndex={0}
      >
        <motion.div
          className={styles.careerTrack}
          data-career-track
          drag={motionDisabled ? false : "x"}
          dragConstraints={{ left: -cycleWidth, right: 0 }}
          dragElastic={0.04}
          dragMomentum={false}
          onDragEnd={() => setInteracting(false)}
          onDragStart={() => setInteracting(true)}
          style={{ x }}
        >
          <ol aria-label="Career timeline" className={styles.careerGroup} ref={primaryGroupRef}>
            {cards.map((card) => <CareerCardContent card={card} key={card.key} />)}
          </ol>
          <div aria-hidden="true" className={styles.careerGroup}>
            {cards.map((card) => <CareerCardContent card={card} clone key={`clone-${card.key}`} />)}
          </div>
        </motion.div>
      </div>
      <div className={styles.careerMotionControls}>
        <span aria-hidden="true" className={styles.careerMotionRule} />
        <button
          aria-label={motionDisabled ? "Career motion is disabled" : manualPaused ? "Resume career motion" : "Pause career motion"}
          className={styles.careerMotionButton}
          disabled={motionDisabled}
          onClick={() => setManualPaused((paused) => !paused)}
          type="button"
        >
          {manualPaused ? <Play aria-hidden="true" /> : <Pause aria-hidden="true" />}
        </button>
      </div>
    </div>
  );
}
