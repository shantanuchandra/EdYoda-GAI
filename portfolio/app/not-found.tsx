/* eslint-disable no-unused-vars -- the inherited Babel parser does not recognize imports used by JSX. */
import { NotFoundContent } from "@/components/content/not-found-content";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";

export default function NotFound() {
  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to main content
      </a>
      <SiteHeader />
      <main id="main-content" tabIndex={-1}>
        <NotFoundContent />
      </main>
      <SiteFooter />
    </>
  );
}
