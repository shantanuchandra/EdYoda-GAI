import { render, screen } from "@testing-library/react";
import { createElement, type ReactNode } from "react";
import { vi } from "vitest";
import { Reveal } from "@/components/ui/reveal";

const motionState = vi.hoisted(() => ({ reducedMotion: false }));

vi.mock("motion/react", () => ({
  motion: {
    div: ({ animate, children, initial, transition, viewport, whileInView, ...props }: {
      animate?: { opacity?: number | number[]; y?: number | number[] };
      children: ReactNode;
      initial: false | { opacity: number; y: number };
      transition?: { duration?: number; ease?: number[] };
      viewport?: { once?: boolean };
      whileInView?: { opacity?: number | number[]; y?: number | number[] };
    }) => createElement("div", {
      ...props,
      "data-animate-y": Array.isArray(animate?.y) ? animate.y.join(",") : animate?.y,
      "data-duration": transition?.duration,
      "data-ease": transition?.ease?.join(","),
      "data-initial": initial === false ? "false" : "configured",
      "data-once": viewport?.once,
      "data-while-in-view-opacity": Array.isArray(whileInView?.opacity) ? whileInView.opacity.join(",") : whileInView?.opacity,
      "data-while-in-view-y": Array.isArray(whileInView?.y) ? whileInView.y.join(",") : whileInView?.y,
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
  expect(reveal).toHaveAttribute("data-initial", "false");
  expect(reveal).toHaveAttribute("data-once", "true");
  expect(reveal).toHaveAttribute("data-while-in-view-opacity", "0.98,1");
  expect(reveal).toHaveAttribute("data-while-in-view-y", "12,0");
});

it("renders the final state without a Motion transition when reduced motion is requested", () => {
  motionState.reducedMotion = true;
  render(<Reveal><span>Proof</span></Reveal>);

  const reveal = screen.getByText("Proof").parentElement;
  expect(reveal).toHaveStyle({ opacity: "1", transform: "none" });
  expect(reveal?.getAttribute("data-duration") ?? "0").toBe("0");
});
