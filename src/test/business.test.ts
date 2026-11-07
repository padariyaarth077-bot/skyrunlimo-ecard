import { describe, expect, it } from "vitest";

import { business } from "@/lib/business";

describe("SKYRUN LIMO business details", () => {
  it("uses the exact supplied phone numbers", () => {
    expect(business.primaryContact).toEqual({
      name: "Vrund Patel",
      phone: "+1 224-619-2024",
      phoneLink: "tel:+12246192024",
    });
    expect(business.secondaryContact).toEqual({
      name: "Nisharg Patel",
      phone: "+1 779-240-6371",
      phoneLink: "tel:+17792406371",
    });
  });

  it("uses the supplied email, website, and booking link", () => {
    expect(business.emailUrl).toBe("mailto:skyrunlimo2428@gmail.com");
    expect(business.websiteUrl).toBe("https://skyrunlimo.com/");
    expect(business.bookingUrl).toBe("https://skyrunlimo.com/book");
  });

  it("uses the exact supplied social profiles", () => {
    expect(business.instagramUrl).toBe("https://www.instagram.com/skyrun2428/");
    expect(business.facebookUrl).toBe("https://www.facebook.com/profile.php?id=61596174350461");
  });

  it("leaves the unconfirmed Google review link unset", () => {
    expect(business.googleReviewUrl).toBe("");
  });
});
