"use client";

/* eslint-disable no-unused-vars, no-undef -- the inherited Babel parser does not apply TypeScript/DOM scope analysis. */
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { siteConfig } from "@/lib/site-config";
import { NavLink } from "@/components/layout/nav-link";

const focusableSelector = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';
const desktopMediaQuery = "(min-width: 900px)";

export function MobileNavigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const reducedMotion = useReducedMotion();
  const closeRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const restoreFocusRef = useRef<HTMLElement | null>(null);

  const closeMenu = () => {
    restoreFocusRef.current = triggerRef.current;
    setIsExiting(true);
    setIsOpen(false);
  };

  useEffect(() => {
    if (!isOpen && !isExiting) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen, isExiting]);

  useEffect(() => {
    const desktopViewport = window.matchMedia(desktopMediaQuery);
    const handleBreakpointChange = (event: MediaQueryListEvent) => {
      if (!event.matches || !isOpen) return;

      const visibleDesktopTarget = document.querySelector<HTMLElement>(".site-wordmark");
      restoreFocusRef.current = visibleDesktopTarget ?? triggerRef.current;
      setIsExiting(true);
      setIsOpen(false);
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

      <AnimatePresence
        onExitComplete={() => {
          setIsExiting(false);
          restoreFocusRef.current?.focus();
          restoreFocusRef.current = null;
        }}
      >
        {isOpen ? (
          <motion.div
            animate={{ opacity: 1, y: 0 }}
            className="mobile-navigation__overlay"
            exit={reducedMotion ? undefined : { opacity: 0, y: -20 }}
            initial={reducedMotion ? false : { opacity: 0, y: -20 }}
            transition={{ duration: reducedMotion ? 0 : 0.2, ease: "easeOut" }}
          >
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
                  onClick={() => closeMenu()}
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
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
