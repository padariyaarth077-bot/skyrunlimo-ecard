# SKYRUN LIMO Digital Visiting Card

## Goal
Replace the current corporate-style landing page with a compact, mobile-first business profile that follows the supplied midnight-navy and metallic-gold brief.

## Work
- Reorganize the home page into a centered, narrow digital-card experience with the unchanged official crest, clear identity, and immediate contact actions.
- Update the central business configuration with only the exact phone numbers, email, website, booking link, social links, and service area from the brief; leave the unprovided Google review link unavailable.
- Build a compact eight-action contact grid, short About section, six-service icon grid, verified links to official services/fleet pages, social actions, contact list, review area, QR/share controls, and unobtrusive mobile actions.
- Implement a downloadable vCard containing both named contacts, company, phones, email, website, and Chicago location; preserve the existing local review-draft workflow.
- Apply the brief’s navy/gold visual tokens and remove the large website-style sections, navigation, and fleet imagery.

## Technical notes
- Keep contact/action URLs centralized in `src/lib/business.ts`; do not add a database or server feature.
- Keep all controls accessible and use the project’s existing Button/Dialog patterns.
- Add concrete tests for supplied contact details and vCard formatting, then verify the page at the requested mobile, tablet, and desktop widths.
- Do not set social-preview image metadata for a bundled logo; only use an absolute image URL if the page actually uses one.
