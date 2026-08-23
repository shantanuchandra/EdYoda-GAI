"use client";

/* eslint-disable no-unused-vars, no-undef -- the inherited Babel parser does not recognize JSX/DOM scope analysis. */
import Image from "next/image";
import { Award, Briefcase } from "lucide-react";
import { animate, motion, useMotionValue, useReducedMotion, useTransform } from "motion/react";
import { useEffect, useRef, useState } from "react";

type SignalProfileCardProps = { portraitSrc?: string };

export function SignalProfileCard({ portraitSrc = "/images/shantanu-chandra-linkedin.jpg" }: SignalProfileCardProps) {
  const [imageFailed, setImageFailed] = useState(false);
  const cardRef = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();
  const rotateX = useMotionValue(2);
  const rotateY = useMotionValue(-1);
  const sheen = useMotionValue(0);
  const sheenX = useTransform(sheen, (value) => `${value}%`);

  function updatePointer(clientX: number, clientY: number, bounds: DOMRect) {
    if (reducedMotion) return;
    const centerX = bounds.left + bounds.width / 2;
    const centerY = bounds.top + bounds.height / 2;
    const nextRotateX = ((clientY - centerY) / (bounds.height / 2)) * 6;
    const nextRotateY = -6 * ((clientX - centerX) / (bounds.width / 2));
    const nextSheen = ((clientX - bounds.left) / bounds.width) * 100;

    requestAnimationFrame(() => {
      animate(rotateX, nextRotateX, { duration: 0.1, ease: "linear" });
      animate(rotateY, nextRotateY, { duration: 0.1, ease: "linear" });
      animate(sheen, nextSheen, { duration: 0.1, ease: "linear" });
    });
  }

  useEffect(() => {
    if (reducedMotion) return;
    const card = cardRef.current;
    if (!card) return;

    const followPointer = (event: globalThis.PointerEvent) => {
      updatePointer(event.clientX, event.clientY, card.getBoundingClientRect());
    };

    window.addEventListener("pointermove", followPointer, { passive: true });
    return () => window.removeEventListener("pointermove", followPointer);
  }, [reducedMotion, rotateX, rotateY, sheen]);

  return (
    <motion.aside
      aria-label="Professional profile"
      className="signal-profile-card"
      data-hero-motion="card"
      ref={cardRef}
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
