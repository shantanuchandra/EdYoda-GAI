"use client";

/* eslint-disable no-unused-vars, no-undef -- the inherited Babel parser does not recognize JSX/DOM scope analysis. */
import Image from "next/image";
import { useEffect, useState, type PointerEvent } from "react";

type SignalProfileCardProps = {
  portraitSrc?: string;
};

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

export function SignalProfileCard({ portraitSrc = "/images/shantanu-chandra-linkedin.jpg" }: SignalProfileCardProps) {
  const [transform, setTransform] = useState("perspective(900px) rotateX(0deg) rotateY(0deg)");
  const [imageFailed, setImageFailed] = useState(false);
  const [canTilt, setCanTilt] = useState(false);

  useEffect(() => {
    const pointer = window.matchMedia?.("(pointer: fine)").matches ?? false;
    const reduced = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;
    setCanTilt(pointer && !reduced);
  }, []);

  function handlePointerMove(event: PointerEvent<HTMLElement>) {
    if (!canTilt) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width;
    const y = (event.clientY - bounds.top) / bounds.height;
    const rotateX = clamp((0.5 - y) * 8, -4, 4);
    const rotateY = clamp((x - 0.5) * 8, -4, 4);
    setTransform(`perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`);
  }

  function resetTilt() {
    setTransform("perspective(900px) rotateX(0deg) rotateY(0deg)");
  }

  return (
    <aside
      aria-label="Professional profile"
      className="signal-profile-card"
      onPointerLeave={resetTilt}
      onPointerMove={handlePointerMove}
      style={{ transform }}
    >
      <p className="signal-profile-card__role">AI Transformation Leader</p>
      <div className="signal-profile-card__identity">
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
        <div>
          <p className="signal-profile-card__name">Shantanu Chandra</p>
          <p className="signal-profile-card__descriptor">Enterprise AI · Product · Transformation</p>
        </div>
      </div>
      <div className="signal-profile-card__current">
        <p>Latest role</p>
        <strong>AI Product Lead at Lenskart</strong>
        <span>November 2025 — Present</span>
        <span>Selecting, launching and governing AI products for retail journeys and operations.</span>
      </div>
      <ul className="signal-profile-card__skills" aria-label="Key skills">
        <li>AI Product Strategy</li>
        <li>Operating Models</li>
        <li>Responsible AI</li>
        <li>Product Adoption</li>
      </ul>
    </aside>
  );
}
