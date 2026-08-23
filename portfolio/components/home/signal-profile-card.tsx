"use client";

/* eslint-disable no-unused-vars, no-undef -- the inherited Babel parser does not recognize JSX/DOM scope analysis. */
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, type PointerEvent } from "react";
import { RoleTypewriter } from "@/components/home/role-typewriter";

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
      aria-label="AI transformation operating system"
      className="signal-profile-card"
      onPointerLeave={resetTilt}
      onPointerMove={handlePointerMove}
      style={{ transform }}
    >
      <div className="signal-profile-card__topline">
        <span>Transformation console</span>
        <span aria-hidden="true">Live</span>
      </div>
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
          <RoleTypewriter contexts={["retail AI", "lending systems", "AdTech operations", "SaaS products"]} staticText="AI Transformation Leader" />
        </div>
      </div>
      <p className="signal-profile-card__current">AI Product Lead at Lenskart</p>
      <ol className="signal-profile-card__sequence" aria-label="Operating thesis">
        <li><strong>Signal</strong><span>Choose the valuable problem.</span></li>
        <li><strong>System</strong><span>Design the work and controls.</span></li>
        <li><strong>Scale</strong><span>Earn adoption and measure change.</span></li>
      </ol>
      <div className="signal-profile-card__actions">
        <Link href="/resume">Read resume <span aria-hidden="true">→</span></Link>
        <Link href="/about">More context <span aria-hidden="true">→</span></Link>
      </div>
    </aside>
  );
}
