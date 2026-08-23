import { render, screen } from "@testing-library/react";
import { createElement, type ReactNode } from "react";
import { vi } from "vitest";
import { Reveal } from "@/components/ui/reveal";

const motionState = vi.hoisted(() => ({ reducedMotion: false }));

vi.mock("motion/react", () => ({
  motion: {
    div: ({ animate, children, initial, transition, viewport, whileInView, ...props }: {
      animate?: { opacity?: number; y?: number };
      children: ReactNode;
      initial: { opacity: number; y: number };
      transition: { duration: number; ease: number[] };
      viewport?: { once?: boolean };
      whileInView?: { opacity?: number; y?: number };
    }) => createElement("div", {
      ...props,
      "data-animate-y": animate?.y,
      "data-duration": transition.duration,
      "data-ease": transition.ease.join(","),
      "data-initial-y": initial.y,
      "data-once": viewport?.once,
      "data-while-in-view-y": whileInView?.y,
    }, children),
  },
  useReducedMotion: () => motionState.reducedMotion,
}));

it("reveals once with the approved timing, easing and translation", () => {
  motionState.reducedMotion = false;
  render(<Reveal><span>Proof</span></Reveal>);

  const reveal = screen.getByText("Proof").parentElement;
  expect(reveal).toHaveAttribute("data-duration", "0.2");
  expect(reveal).toHaveAttribute("data-ease", "0.16,1,0.3,1");
  expect(reveal).toHaveAttribute("data-initial-y", "12");
  expect(reveal).toHaveAttribute("data-once", "true");
  expect(reveal).toHaveAttribute("data-while-in-view-y", "0");
});

it("disables translation when reduced motion is requested", () => {
  motionState.reducedMotion = true;
  render(<Reveal><span>Proof</span></Reveal>);

  expect(screen.getByText("Proof").parentElement).toHaveAttribute("data-initial-y", "0");
});
