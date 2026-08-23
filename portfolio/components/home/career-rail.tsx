"use client";

/* eslint-disable no-undef, no-unused-vars -- the inherited Babel parser does not recognize DOM/TypeScript scope analysis or imports used by JSX. */
import { Pause, Play } from "lucide-react";
import { animate, motion, useMotionValue, useReducedMotion, wrap } from "motion/react";
import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import type { CareerRole } from "@/lib/resume-data";
import styles from "@/components/home/home-portfolio.module.css";

type CareerRailProps = { roles: readonly CareerRole[] };

type CareerCard = {
  company: string;
  end: string;
  focus: string;
  key: string;
  logoSrc: string;
  roles: readonly CareerRole[];
  start: string;
  periodLabel?: string;
};

const companyProfiles: Readonly<Record<string, { company: string; logoSrc: string }>> = {
  Lenskart: { company: "Lenskart.com", logoSrc: "/images/companies/lenskart.png" },
  "IIFL Home Loans": { company: "IIFL Home Loans", logoSrc: "/images/companies/iifl-home-loans.png" },
  Hakuhodo: { company: "Hakuhodo", logoSrc: "/images/companies/hakuhodo.png" },
  "Builder.ai": { company: "Builder.ai", logoSrc: "/images/companies/builder-ai.png" },
  NUiO: { company: "NUiO", logoSrc: "/images/companies/nuio.png" },
  Pantheon: { company: "Pantheon", logoSrc: "/images/companies/pantheon.png" },
  Cummins: { company: "Cummins", logoSrc: "/images/companies/cummins.png" },
  "Toshiba Softwares": { company: "Toshiba", logoSrc: "/images/companies/toshiba.png" },
  POWERGRID: { company: "POWERGRID", logoSrc: "/images/companies/powergrid.svg" },
  "Telerik (now Progress Software)": {
    company: "Telerik (now Progress Software)",
    logoSrc: "/images/companies/progress-software.png",
  },
};

function numericPeriod({ start, end, periodLabel }: CareerCard) {
  if (!start && !end && periodLabel) return periodLabel;
  const format = (value: string) => {
    if (value === "present") return "Present";
    const [year, month] = value.split("-");
    return `${month}/${year}`;
  };
  return `${format(start)} – ${format(end)}`;
}

function employerCards(roles: readonly CareerRole[]): CareerCard[] {
  const groups = new Map<string, CareerRole[]>();

  roles.forEach((role) => {
    if (!companyProfiles[role.company]) return;
    groups.set(role.company, [...(groups.get(role.company) ?? []), role]);
  });

  return Array.from(groups.entries())
    .map(([sourceCompany, companyRoles]) => {
      const orderedRoles = companyRoles.sort((left, right) => right.start.localeCompare(left.start));
      const profile = companyProfiles[sourceCompany];
      return {
        company: profile.company,
        end: orderedRoles.reduce((latest, role) => role.end.localeCompare(latest) > 0 ? role.end : latest, orderedRoles[0].end),
        focus: orderedRoles[0].focus,
        key: sourceCompany,
        logoSrc: profile.logoSrc,
        periodLabel: orderedRoles.every((role) => !role.start && !role.end) ? orderedRoles[0].periodLabel : undefined,
        roles: orderedRoles,
        start: orderedRoles.reduce((earliest, role) => role.start.localeCompare(earliest) < 0 ? role.start : earliest, orderedRoles[0].start),
      };
    })
    .sort((left, right) => right.end.localeCompare(left.end));
}

function CareerCardContent({ card, clone = false }: { card: CareerCard; clone?: boolean }) {
  const [currentRole, ...previousRoles] = card.roles;
  const content = (
    <article className={styles.careerCard} data-career-card={clone ? undefined : "true"}>
      <div className={styles.careerWordmark} aria-hidden="true">
        <Image
          alt=""
          className={styles.careerLogo}
          data-career-logo
          height={64}
          src={card.logoSrc}
          unoptimized
          width={112}
        />
      </div>
      <p className={styles.careerCompany}>{card.company}</p>
      <p className={styles.careerPeriod}>{numericPeriod(card)}</p>
      <h3 className={styles.careerRole}>{currentRole.title}</h3>
      {previousRoles.map((role) => (
        <p className={styles.careerPreviousRole} key={`${role.title}-${role.start}`}>{role.title}</p>
      ))}
      {previousRoles.length === 0 ? <p className={styles.careerFocus}>{card.focus}</p> : null}
    </article>
  );

  return clone
    ? <div className={styles.careerItem}>{content}</div>
    : <li className={styles.careerItem}>{content}</li>;
}

export function CareerRail({ roles }: CareerRailProps) {
  const cards = useMemo<CareerCard[]>(() => employerCards(roles), [roles]);
  const primaryGroupRef = useRef<HTMLOListElement>(null);
  const dragOriginRef = useRef<{ clientX: number; pointerId: number; x: number } | null>(null);
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

  function beginDrag(event: React.PointerEvent<HTMLDivElement>) {
    if (motionDisabled || cycleWidth <= 0) return;
    dragOriginRef.current = { clientX: event.clientX, pointerId: event.pointerId, x: x.get() };
    event.currentTarget.setPointerCapture(event.pointerId);
    setInteracting(true);
  }

  function continueDrag(event: React.PointerEvent<HTMLDivElement>) {
    const origin = dragOriginRef.current;
    if (!origin || origin.pointerId !== event.pointerId) return;
    x.set(Math.min(0, Math.max(-cycleWidth, origin.x + event.clientX - origin.clientX)));
  }

  function endDrag(event: React.PointerEvent<HTMLDivElement>) {
    const origin = dragOriginRef.current;
    if (!origin || origin.pointerId !== event.pointerId) return;
    dragOriginRef.current = null;
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
    setInteracting(false);
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
        onPointerCancel={endDrag}
        onPointerDown={beginDrag}
        onPointerMove={continueDrag}
        onPointerUp={endDrag}
        tabIndex={0}
      >
        <motion.div
          className={styles.careerTrack}
          data-career-track
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
