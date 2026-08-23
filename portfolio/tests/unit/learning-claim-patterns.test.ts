import { describe, expect, it } from "vitest";
import { findExcludedLearningClaim } from "@/tests/e2e/learning-claim-patterns";

describe("Learning visible-copy claim exclusions", () => {
  it.each([
    ["Enroll today", "enrollment claim"],
    ["Enrol today", "enrollment claim"],
    ["Enrollment is open", "enrollment claim"],
    ["Enrolment is open", "enrollment claim"],
    ["This is a completed paid course", "paid-course offer claim"],
    ["Buy access", "commerce or payment claim"],
  ])("rejects %j", (visibleCopy, expectedClaim) => {
    expect(findExcludedLearningClaim(visibleCopy)).toBe(expectedClaim);
  });

  it.each([
    "The case study discusses market access constraints.",
    "The module compares paid media with organic distribution.",
    "Course design starts with audience needs and a practical outcome.",
  ])("allows legitimate educational prose: %j", (visibleCopy) => {
    expect(findExcludedLearningClaim(visibleCopy)).toBeNull();
  });
});
