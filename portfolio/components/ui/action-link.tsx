/* eslint-disable no-unused-vars, no-undef -- the inherited Babel parser does not apply JSX/TypeScript scope analysis. */
import Link, { type LinkProps } from "next/link";
import type { AnchorHTMLAttributes, ReactNode } from "react";

type ActionLinkProps = LinkProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof LinkProps> & {
    children: ReactNode;
  };

export function ActionLink({ children, className = "", ...props }: ActionLinkProps) {
  return (
    <Link className={["action-link", className].filter(Boolean).join(" ")} {...props}>
      <span>{children}</span>
      <span aria-hidden="true">↗</span>
    </Link>
  );
}
