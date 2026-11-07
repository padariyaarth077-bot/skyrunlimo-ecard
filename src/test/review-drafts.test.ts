import { describe, expect, it } from "vitest";

import { buildReviewDrafts } from "@/lib/review-drafts";

describe("review drafts", () => {
  it("never leaves a doubled period when a note already ends with one", () => {
    const drafts = buildReviewDrafts(5, ["Driver professionalism", "The SUV was spotless."]);

    expect(drafts).toHaveLength(5);
    for (const draft of drafts) {
      expect(draft).not.toMatch(/\.\./);
    }
  });

  it("keeps the rating and every detail the reviewer entered", () => {
    const drafts = buildReviewDrafts(5, ["Pickup experience", "Driver was early"]);

    expect(drafts.every((draft) => draft.includes("5 out of 5"))).toBe(true);
    expect(drafts.some((draft) => draft.includes("Pickup experience"))).toBe(true);
    expect(drafts.some((draft) => draft.includes("Driver was early"))).toBe(true);
  });

  it("carries the rating alone when no details were entered", () => {
    expect(buildReviewDrafts(4, [])).toEqual([
      "I rated my experience 4 out of 5.",
      "I rated my experience 4 out of 5.",
      "I rated my experience 4 out of 5.",
      "I rated my experience 4 out of 5.",
      "I rated my experience 4 out of 5.",
    ]);
  });

  it("carries the details alone when no rating was given", () => {
    const drafts = buildReviewDrafts(0, ["Airport transportation"]);

    expect(drafts.every((draft) => !draft.includes("out of 5"))).toBe(true);
    expect(drafts.every((draft) => draft.includes("Airport transportation"))).toBe(true);
  });
});
