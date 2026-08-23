/* eslint-disable no-undef -- the inherited Babel parser does not recognize TypeScript type declarations. */
import type { Heading } from "@/lib/content/schema";

type TableOfContentsProps = { headings: Heading[] };

export function TableOfContents({ headings }: TableOfContentsProps) {
  if (headings.length === 0) return null;

  return (
    <nav aria-label="On this page" className="rounded-card border border-line bg-surface p-5">
      <p className="m-0 text-xs font-extrabold tracking-[0.1em] text-teal uppercase">On this page</p>
      <ol className="mt-4 mb-0 grid list-none gap-3 p-0 text-sm">
        {headings.map((heading) => (
          <li className={heading.depth === 3 ? "pl-4" : ""} key={heading.id}>
            <a className="text-teal-dark underline decoration-line underline-offset-4 hover:decoration-teal" href={`#${heading.id}`}>
              {heading.label}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
