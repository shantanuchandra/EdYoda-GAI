/* eslint-disable no-unused-vars, no-undef -- the inherited Babel parser does not recognize imports used by JSX or TypeScript. */
import Link from "next/link";

type BreadcrumbItem = { label: string; href?: string };
type BreadcrumbsProps = { items: BreadcrumbItem[] };

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb" className="text-sm text-muted-ink">
      <ol className="m-0 flex list-none flex-wrap items-center gap-x-2 gap-y-1 p-0">
        {items.map((item, index) => (
          <li className="flex items-center gap-2" key={`${item.label}-${index}`}>
            {index > 0 ? <span aria-hidden="true">/</span> : null}
            {item.href ? (
              <Link className="font-semibold text-teal-dark underline underline-offset-4" href={item.href}>
                {item.label}
              </Link>
            ) : (
              <span aria-current="page">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
