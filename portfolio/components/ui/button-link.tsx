/* eslint-disable no-unused-vars, no-undef -- the inherited Babel parser does not apply JSX/TypeScript scope analysis. */
import Link, { type LinkProps } from "next/link";
import type { AnchorHTMLAttributes, ReactNode } from "react";

type ButtonLinkProps = LinkProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof LinkProps> & {
    children: ReactNode;
    variant?: "primary" | "secondary";
  };

export function ButtonLink({ children, className = "", variant = "primary", ...props }: ButtonLinkProps) {
  return (
    <Link className={["button-link", `button-link--${variant}`, className].filter(Boolean).join(" ")} {...props}>
      {children}
    </Link>
  );
}
