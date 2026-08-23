/* eslint-disable no-unused-vars -- the inherited Babel parser does not recognize imports used by JSX. */
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { siteConfig } from "@/lib/site-config";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <Container className="site-footer__grid">
        <div>
          <Link className="site-footer__brand" href="/">
            {siteConfig.name}
          </Link>
          <p>{siteConfig.descriptor}</p>
        </div>

        <nav aria-label="Footer" className="site-footer__navigation">
          {siteConfig.navigation.map(([label, href]) => (
            <Link href={href} key={href}>
              {label}
            </Link>
          ))}
          {siteConfig.footerNavigation.map(([label, href]) => (
            <Link href={href} key={href}>
              {label}
            </Link>
          ))}
        </nav>

        <div className="site-footer__utility">
          <a href={`mailto:${siteConfig.email}`}>Email</a>
          <a href={siteConfig.linkedin}>LinkedIn</a>
          <Link href={siteConfig.resumePath} prefetch={false}>Download resume</Link>
        </div>

        <p className="site-footer__note">Building useful AI products through signal, system and scale.</p>
      </Container>
    </footer>
  );
}
