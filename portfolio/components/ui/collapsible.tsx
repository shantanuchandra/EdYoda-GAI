"use client";

/* eslint-disable no-unused-vars, no-undef -- the inherited Babel parser does not apply JSX/TypeScript scope analysis. */

import * as Collapsible from "@radix-ui/react-collapsible";
import { ChevronDown } from "lucide-react";
import type { ReactNode } from "react";

type EvidenceCollapsibleProps = {
  label: string;
  children: ReactNode;
  defaultOpen?: boolean;
};

export function EvidenceCollapsible({ label, children, defaultOpen = false }: EvidenceCollapsibleProps) {
  return (
    <Collapsible.Root defaultOpen={defaultOpen}>
      <Collapsible.Trigger className="inline-flex min-h-11 items-center gap-2 rounded-full border border-ink px-4 font-bold focus-visible:outline-3 focus-visible:outline-offset-3">
        {label}
        <ChevronDown aria-hidden="true" size={18} strokeWidth={2.5} />
      </Collapsible.Trigger>
      <Collapsible.Content>
        <div className="pt-4">{children}</div>
      </Collapsible.Content>
    </Collapsible.Root>
  );
}
