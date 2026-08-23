/* eslint-disable no-unused-vars -- the inherited Babel parser does not recognize imports used by JSX. */
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { slugifyHeading } from "@/lib/content/slugify-heading";

function textContent(children: ReactNode): string {
  if (typeof children === "string" || typeof children === "number") return String(children);
  if (Array.isArray(children)) return children.map(textContent).join("");
  return "";
}

function MdxHeading({ children, ...props }: ComponentPropsWithoutRef<"h2">) {
  return (
    <h2
      {...props}
      className="mt-14 mb-5 font-display text-[clamp(2rem,4vw,3.15rem)] font-medium tracking-[-0.025em] leading-[1.03]"
      id={slugifyHeading(textContent(children))}
    >
      {children}
    </h2>
  );
}

function MdxSubheading({ children, ...props }: ComponentPropsWithoutRef<"h3">) {
  return (
    <h3
      {...props}
      className="mt-10 mb-4 font-display text-[clamp(1.45rem,3vw,2rem)] font-semibold tracking-[-0.02em] leading-[1.08]"
      id={slugifyHeading(textContent(children))}
    >
      {children}
    </h3>
  );
}

function isExternalHttpLink(href: string | undefined): boolean {
  return Boolean(href && /^https?:\/\//i.test(href));
}

function MdxLink({ children, href, rel: _rel, target: _target, ...props }: ComponentPropsWithoutRef<"a">) {
  const opensNewTab = isExternalHttpLink(href);

  return (
    <a
      {...props}
      className="font-semibold text-teal-dark underline decoration-teal underline-offset-4 hover:text-teal"
      href={href}
      rel={opensNewTab ? "noreferrer noopener" : undefined}
      target={opensNewTab ? "_blank" : undefined}
    >
      {children}
      {opensNewTab ? <><span aria-hidden="true"> ↗</span><span className="sr-only"> (opens in a new tab)</span></> : null}
    </a>
  );
}

function MdxBlockquote(props: ComponentPropsWithoutRef<"blockquote">) {
  return <blockquote {...props} className="my-8 border-l-4 border-copper pl-5 font-display text-[1.35rem] leading-snug text-teal-dark" />;
}

function MdxPre(props: ComponentPropsWithoutRef<"pre">) {
  return <pre {...props} className="my-8 overflow-x-auto rounded-card bg-dark-section p-5 text-sm leading-6 text-on-dark" />;
}

function MdxCode(props: ComponentPropsWithoutRef<"code">) {
  return <code {...props} className="rounded bg-sand/40 px-1.5 py-0.5 font-mono text-[0.9em]" />;
}

function MdxTable(props: ComponentPropsWithoutRef<"table">) {
  return <div className="my-8 overflow-x-auto"><table {...props} className="w-full border-collapse text-left text-sm" /></div>;
}

export const mdxComponents = {
  h2: MdxHeading,
  h3: MdxSubheading,
  a: MdxLink,
  blockquote: MdxBlockquote,
  pre: MdxPre,
  code: MdxCode,
  table: MdxTable,
  th: (props: ComponentPropsWithoutRef<"th">) => <th {...props} className="border-b border-line p-3 font-bold" />,
  td: (props: ComponentPropsWithoutRef<"td">) => <td {...props} className="border-b border-line p-3 align-top" />,
};
