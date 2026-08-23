"use client";

/* eslint-disable no-undef -- the inherited Babel parser does not recognize DOM/TypeScript scope analysis. */

import { useEffect, useState } from "react";

type RoleTypewriterProps = {
  contexts: readonly string[];
  staticText: string;
};

export function RoleTypewriter({ contexts, staticText }: RoleTypewriterProps) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const reduced = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;
    if (reduced || contexts.length < 2) return undefined;
    const timer = window.setInterval(() => setIndex((current) => (current + 1) % contexts.length), 3200);
    return () => window.clearInterval(timer);
  }, [contexts.length]);

  return (
    <p className="signal-profile-card__role" aria-label={`${staticText}; ${contexts.join(", ")}`}>
      <span>{staticText}</span>
      <span aria-hidden="true" className="signal-profile-card__context">{contexts[index]}</span>
    </p>
  );
}
