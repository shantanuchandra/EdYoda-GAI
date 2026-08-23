/* eslint-disable no-undef -- the inherited Babel parser does not apply TypeScript scope analysis. */
const excludedLearningClaimPatterns = [
  {
    label: "commerce or payment claim",
    pattern: /\b(?:checkout|payment|pay now|buy now|(?:buy|purchase) (?:course )?access)\b/i,
  },
  { label: "enrollment claim", pattern: /\benroll?(?:ment|ed|ing)?\b/i },
  {
    label: "paid-course offer claim",
    pattern: /\b(?:(?:this|it|the (?:path|course|program|programme)) is (?:a )?(?:completed )?paid[ -]course|(?:completed )?paid[ -]course (?:access )?(?:is )?(?:available|complete|completed))\b/i,
  },
  { label: "login or account claim", pattern: /\b(?:log[ -]?in|sign[ -]?in|create (?:an? )?account|learner account)\b/i },
  { label: "credential claim", pattern: /\b(?:certificate|certification|certified)\b/i },
] as const;

export function findExcludedLearningClaim(visibleCopy: string): string | null {
  return excludedLearningClaimPatterns.find(({ pattern }) => pattern.test(visibleCopy))?.label ?? null;
}
