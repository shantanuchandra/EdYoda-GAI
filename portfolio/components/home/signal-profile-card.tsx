"use client";

/* eslint-disable no-unused-vars, no-undef -- the inherited Babel parser does not recognize JSX/DOM scope analysis. */
import Image from "next/image";
import { Award, Briefcase } from "lucide-react";
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "motion/react";
import { useState, type PointerEvent } from "react";

type SignalProfileCardProps = {
  portraitSrc?: string;
};

export function SignalProfileCard({ portraitSrc = "/images/shantanu-chandra-linkedin.jpg" }: SignalProfileCardProps) {
  const [imageFailed, setImageFailed] = useState(false);
  const reducedMotion = useReducedMotion();
  const pointerX = useMotionValue(0.5);
  const pointerY = useMotionValue(0.5);
  const rotateX = useSpring(useTransform(pointerY, [0, 1], [6, -6]), { stiffness: 320, damping: 32 });
  const rotateY = useSpring(useTransform(pointerX, [0, 1], [-6, 6]), { stiffness: 320, damping: 32 });
  const sheenX = useTransform(pointerX, [0, 1], ["-115%", "115%"]);

  function handlePointerMove(event: PointerEvent<HTMLElement>) {
    if (reducedMotion) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    pointerX.set((event.clientX - bounds.left) / bounds.width);
    pointerY.set((event.clientY - bounds.top) / bounds.height);
  }

  function resetTilt() {
    pointerX.set(0.5);
    pointerY.set(0.5);
  }

  return (
    <motion.aside
      aria-label="Professional profile"
      className="signal-profile-card"
      onPointerLeave={resetTilt}
      onPointerMove={handlePointerMove}
      style={reducedMotion ? undefined : { rotateX, rotateY, rotateZ: -1, transformPerspective: 1000 }}
    >
      <motion.span aria-hidden="true" className="signal-profile-card__sheen" style={reducedMotion ? undefined : { x: sheenX }} />
      <div className="signal-profile-card__identity">
        <div>
          <p className="signal-profile-card__role">AI Transformation Leader</p>
          <p className="signal-profile-card__name">Shantanu Chandra</p>
        </div>
        {imageFailed ? (
          <span aria-label="Shantanu Chandra" className="signal-profile-card__monogram" role="img">SC</span>
        ) : (
          <Image
            alt="Shantanu Chandra"
            className="signal-profile-card__portrait"
            height={100}
            onError={() => setImageFailed(true)}
            src={portraitSrc}
            width={100}
          />
        )}
      </div>
      <div className="signal-profile-card__section">
        <p className="signal-profile-card__section-title"><Briefcase aria-hidden="true" />Latest Role</p>
        <div className="signal-profile-card__current">
          <strong>AI Product Lead</strong>
          <span className="signal-profile-card__company">Lenskart</span>
          <span>November 2025 — Present</span>
          <span>Selecting, launching and governing AI products for retail journeys and operations.</span>
        </div>
      </div>
      <div className="signal-profile-card__section signal-profile-card__section--skills">
        <p className="signal-profile-card__section-title"><Award aria-hidden="true" />Key Skills</p>
        <ul className="signal-profile-card__skills" aria-label="Key skills">
          <li>AI Product Strategy</li>
          <li>Operating Models</li>
          <li>Responsible AI</li>
          <li>Product Adoption</li>
        </ul>
      </div>
    </motion.aside>
  );
}
