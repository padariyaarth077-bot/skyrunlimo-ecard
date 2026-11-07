import { describe, expect, it } from "vitest";

import { buildBusinessVCard } from "@/lib/vcard";

describe("SKYRUN LIMO vCard download", () => {
  it("includes separate primary and secondary contacts with their exact phone numbers", () => {
    const vcard = buildBusinessVCard();

    expect(vcard).toContain(
      "FN:Vrund Patel\r\nORG:SKYRUN LIMO LLC\r\nTEL;TYPE=WORK,VOICE:+1 224-619-2024",
    );
    expect(vcard).toContain(
      "FN:Nisharg Patel\r\nORG:SKYRUN LIMO LLC\r\nTEL;TYPE=WORK,VOICE:+1 779-240-6371",
    );
    expect(vcard.match(/BEGIN:VCARD/g)).toHaveLength(2);
    expect(vcard.match(/END:VCARD/g)).toHaveLength(2);
  });

  it("includes the supplied email, website, and Chicago service location", () => {
    const vcard = buildBusinessVCard();

    expect(vcard).toContain("EMAIL;TYPE=WORK:skyrunlimo2428@gmail.com");
    expect(vcard).toContain("URL:https://skyrunlimo.com/");
    expect(vcard).toContain("ADR;TYPE=WORK:;;Chicago\\, Illinois & Surrounding Suburbs;;;;");
    expect(vcard).toMatch(/\r\nEND:VCARD\r\n/);
  });
});
