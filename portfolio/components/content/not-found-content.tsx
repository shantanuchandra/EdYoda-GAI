/* eslint-disable no-unused-vars -- the inherited Babel parser does not recognize imports used by JSX. */
import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";

export function NotFoundContent() {
  return (
    <section className="not-found-template" data-portfolio-template>
      <Container className="not-found-content">
        <p className="not-found-content__code">404</p>
        <h1>This page is outside the map.</h1>
        <p>The address may have changed, or the page may no longer be public. Start again from the portfolio.</p>
        <ButtonLink href="/">Return home</ButtonLink>
      </Container>
    </section>
  );
}
