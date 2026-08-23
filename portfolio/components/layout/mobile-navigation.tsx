"use client";

/* eslint-disable no-unused-vars, no-undef -- the inherited Babel parser does not apply TypeScript/DOM scope analysis. */
import { useEffect, useRef, useState } from "react";
import { siteConfig } from "@/lib/site-config";
import { NavLink } from "@/components/layout/nav-link";

const focusableSelector = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';
const desktopMediaQuery = "(min-width: 900px)";

export function MobileNavigation() {
  const [isOpen, setIsOpen] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const closeMenu = () => {
    setIsOpen(false);
    triggerRef.current?.focus();
  };

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  useEffect(() => {
    const desktopViewport = window.matchMedia(desktopMediaQuery);
    const handleBreakpointChange = (event: MediaQueryListEvent) => {
      if (!event.matches || !isOpen) return;

      setIsOpen(false);
      const visibleDesktopTarget = document.querySelector<HTMLElement>(".site-wordmark");
      (visibleDesktopTarget ?? triggerRef.current)?.focus();
    };

    desktopViewport.addEventListener("change", handleBreakpointChange);
    return () => desktopViewport.removeEventListener("change", handleBreakpointChange);
  }, [isOpen]);

  const handleDialogKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Escape") {
      event.preventDefault();
      closeMenu();
      return;
    }

    if (event.key !== "Tab") return;

    const focusable = Array.from(dialogRef.current?.querySelectorAll<HTMLElement>(focusableSelector) ?? []);
    const first = focusable.at(0);
    const last = focusable.at(-1);

    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last?.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first?.focus();
    }
  };

  return (
    <div className="mobile-navigation">
      <button
        ref={triggerRef}
        aria-controls="mobile-navigation-dialog"
        aria-expanded={isOpen}
        aria-label="Open menu"
        className="mobile-navigation__trigger"
        onClick={() => setIsOpen(true)}
        style={{ minHeight: 44, minWidth: 44 }}
        type="button"
      >
        <span aria-hidden="true" className="mobile-navigation__menu-icon">
          <span />
          <span />
        </span>
      </button>

      {isOpen ? (
        <div className="mobile-navigation__overlay">
          <div
            ref={dialogRef}
            aria-label="Site navigation"
            aria-modal="true"
            className="mobile-navigation__dialog"
            id="mobile-navigation-dialog"
            onKeyDown={handleDialogKeyDown}
            role="dialog"
          >
            <div className="mobile-navigation__topline">
              <p>Navigate</p>
              <button
                ref={closeRef}
                aria-label="Close menu"
                className="mobile-navigation__close"
                onClick={closeMenu}
                type="button"
              >
                <span aria-hidden="true">×</span>
              </button>
            </div>
            <nav aria-label="Mobile primary" className="mobile-navigation__links">
              {siteConfig.navigation.map(([label, href]) => (
                <NavLink href={href} key={href} label={label} onNavigate={closeMenu} />
              ))}
            </nav>
          </div>
        </div>
      ) : null}
    </div>
  );
}
