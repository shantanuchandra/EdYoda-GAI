"use client";

/* eslint-disable no-unused-vars, no-undef -- the inherited Babel parser does not apply JSX/TypeScript scope analysis. */
import Link from "next/link";
import { usePathname } from "next/navigation";

type NavLinkProps = {
  className?: string;
  href: string;
  label: string;
  onNavigate?: () => void;
};

export function NavLink({ className = "", href, label, onNavigate }: NavLinkProps) {
  const pathname = usePathname();
  const isCurrent = pathname === href || (href !== "/" && pathname.startsWith(`${href}/`));

  return (
    <Link
      aria-current={isCurrent ? "page" : undefined}
      className={["nav-link", className].filter(Boolean).join(" ")}
      href={href}
      onClick={onNavigate}
    >
      {label}
    </Link>
  );
}
