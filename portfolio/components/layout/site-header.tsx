"use client";

/* eslint-disable no-unused-vars, no-undef -- the inherited Babel parser does not recognize imports used by JSX. */
import Link from "next/link";
import { useEffect, useState } from "react";
import { Container } from "@/components/ui/container";
import { MobileNavigation } from "@/components/layout/mobile-navigation";
import { NavLink } from "@/components/layout/nav-link";
import { siteConfig } from "@/lib/site-config";

export function SiteHeader() {
  const [compact, setCompact] = useState(false);

  useEffect(() => {
    const updateHeader = () => setCompact(window.scrollY > 20);
    updateHeader();
    window.addEventListener("scroll", updateHeader, { passive: true });
    return () => window.removeEventListener("scroll", updateHeader);
  }, []);

  return (
    <header className="site-header" data-compact={compact ? "true" : "false"}>
      <Container className="site-header__inner">
        <Link aria-label={siteConfig.name} className="site-wordmark" href="/">
          <span aria-hidden="true">Shantanu</span>
        </Link>

        <nav aria-label="Primary" className="desktop-navigation">
          {siteConfig.navigation.map(([label, href]) => (
            <NavLink href={href} key={href} label={label} />
          ))}
        </nav>

        <Link className="site-header__contact" href="/contact">
          Get in touch <span aria-hidden="true">→</span>
        </Link>

        <MobileNavigation />
      </Container>
    </header>
  );
}
