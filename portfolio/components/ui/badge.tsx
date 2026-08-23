/* eslint-disable no-undef -- the inherited Babel parser does not apply JSX/TypeScript scope analysis. */
import { cva, type VariantProps } from "class-variance-authority";
import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-3 py-1 text-xs font-extrabold tracking-[0.08em] uppercase",
  {
    variants: {
      variant: {
        default: "border-teal/30 bg-teal/10 text-teal-dark",
        accent: "border-copper/30 bg-copper text-white",
      },
    },
    defaultVariants: { variant: "default" },
  },
);

type BadgeProps = HTMLAttributes<HTMLSpanElement> & VariantProps<typeof badgeVariants>;

export function Badge({ className, variant, ...props }: BadgeProps) {
  return <span className={cn(badgeVariants({ variant }), className)} {...props} />;
}
