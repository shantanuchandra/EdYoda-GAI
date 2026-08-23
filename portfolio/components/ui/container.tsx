/* eslint-disable no-unused-vars, no-undef -- the inherited Babel parser does not apply JSX/TypeScript scope analysis. */
import type { ComponentPropsWithoutRef, ElementType } from "react";

type ContainerProps = ComponentPropsWithoutRef<"div"> & {
  as?: Extract<ElementType, "article" | "div" | "section">;
};

export function Container({ as: Component = "div", className = "", ...props }: ContainerProps) {
  return <Component className={["container", className].filter(Boolean).join(" ")} {...props} />;
}
