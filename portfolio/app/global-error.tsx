"use client";

export default function GlobalError({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <html lang="en">
      <body>
        <main className="global-error">
          <p className="not-found-content__code">Error</p>
          <h1>The page could not be loaded.</h1>
          <p>Try loading it again. If the problem continues, return to the portfolio.</p>
          <div className="global-error__actions">
            <button className="button-link button-link--primary" onClick={reset} type="button">
              Try again
            </button>
            <a className="button-link button-link--secondary" href="/">
              Return home
            </a>
          </div>
        </main>
      </body>
    </html>
  );
}
