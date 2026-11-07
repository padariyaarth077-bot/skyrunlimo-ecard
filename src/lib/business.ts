export type Business = {
  name: string;
  tagline: string;
  serviceArea: string;
  description: string;
  primaryContact: { name: string; phone: string; phoneLink: string };
  secondaryContact: { name: string; phone: string; phoneLink: string };
  email: string;
  emailUrl: string;
  websiteUrl: string;
  bookingUrl: string;
  servicesUrl: string;
  fleetUrl: string;
  digitalCardUrl: string;
  googleReviewUrl: string;
  instagramUrl: string;
  facebookUrl: string;
};

export const business: Business = {
  name: "SKYRUN LIMO LLC",
  tagline: "Premium Chauffeur & Black Car Service",
  serviceArea: "Chicago, Illinois & Surrounding Suburbs",
  description:
    "Elevated transportation for airport transfers, business travel, and special occasions.",
  primaryContact: { name: "Vrund Patel", phone: "+1 224-619-2024", phoneLink: "tel:+12246192024" },
  secondaryContact: {
    name: "Nisharg Patel",
    phone: "+1 779-240-6371",
    phoneLink: "tel:+17792406371",
  },
  email: "skyrunlimo2428@gmail.com",
  emailUrl: "mailto:skyrunlimo2428@gmail.com",
  websiteUrl: "https://skyrunlimo.com/",
  bookingUrl: "https://skyrunlimo.com/book",
  servicesUrl: "https://skyrunlimo.com/services",
  fleetUrl: "https://skyrunlimo.com/fleet",
  digitalCardUrl: "https://connect.skyrunlimo.com/",
  googleReviewUrl: "",
  instagramUrl: "https://www.instagram.com/skyrun2428/",
  facebookUrl: "https://www.facebook.com/profile.php?id=61596174350461",
} as const;
