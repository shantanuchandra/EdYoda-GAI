/* eslint-disable no-unused-vars -- the inherited Babel parser does not recognize imports used by JSX. */
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { siteConfig } from "@/lib/site-config";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <Container className="site-footer__grid">
        <div className="site-footer__identity">
          <Link className="site-footer__brand" href="/">
            Shantanu
          </Link>
          <p>AI transformation leadership across product, operating model and adoption.</p>
        </div>

        <nav aria-label="Footer" className="site-footer__navigation">
          <h2>Quick links</h2>
          {siteConfig.navigation.map(([label, href]) => (
            <Link href={href} key={href}>
              <span aria-hidden="true">{href === "/" ? "⌂" : "□"}</span>{label}
            </Link>
          ))}
          {siteConfig.footerNavigation.map(([label, href]) => (
            <Link href={href} key={href}>
              <span aria-hidden="true">□</span>{label}
            </Link>
          ))}
        </nav>

        <div className="site-footer__utility">
          <h2>Connect</h2>
          <a href={siteConfig.linkedin}><span aria-hidden="true">in</span>LinkedIn</a>
          <a aria-label="Email Shantanu Chandra" href={`mailto:${siteConfig.email}`}><span aria-hidden="true">✉</span>{siteConfig.email}</a>
          <Link href={siteConfig.resumePath} prefetch={false}><span aria-hidden="true">↓</span>Download resume</Link>
        </div>

        <div className="site-footer__baseline">
          <p>© 2026 Shantanu Chandra. All rights reserved.</p>
          <p>Building useful AI products through Signal, System and Scale.</p>
        </div>
      </Container>
    </footer>
  );
}
