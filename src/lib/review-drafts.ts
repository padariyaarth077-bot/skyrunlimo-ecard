// Builds editable review drafts from only the details the reviewer entered on this device.
// Every sentence is closed by the template, so a fact that already ends in a period must be
// trimmed first — otherwise the drafts read "spotless.." .
export function buildReviewDrafts(rating: number, facts: string[]): string[] {
  const ratingFact = rating ? `I rated my experience ${rating} out of 5.` : "";
  const fact = facts.join("; ").replace(/\.\s*$/, "");

  return [
    [ratingFact, fact ? `What stood out to me: ${fact}.` : ""],
    [fact ? `My review mentioned ${fact}.` : "", ratingFact],
    [ratingFact, fact ? `I would like to share this about my ride: ${fact}.` : ""],
    [fact ? `During my trip, I noticed ${fact}.` : "", ratingFact],
    [ratingFact, fact ? `My own experience included ${fact}.` : ""],
  ].map((parts) => parts.filter(Boolean).join(" "));
}
