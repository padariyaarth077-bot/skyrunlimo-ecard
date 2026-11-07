import { business } from "@/lib/business";

function escapeVCardValue(value: string): string {
  return value
    .replaceAll("\\", "\\\\")
    .replaceAll(";", "\\;")
    .replaceAll(",", "\\,")
    .replaceAll("\n", "\\n");
}

export function buildBusinessVCard(): string {
  const contacts = [business.primaryContact, business.secondaryContact];
  const entries = contacts.map((contact) =>
    [
      "BEGIN:VCARD",
      "VERSION:3.0",
      `N:${escapeVCardValue(contact.name.split(" ").slice(-1)[0] ?? "")};${escapeVCardValue(contact.name.split(" ").slice(0, -1).join(" "))};;;`,
      `FN:${escapeVCardValue(contact.name)}`,
      `ORG:${escapeVCardValue(business.name)}`,
      `TEL;TYPE=WORK,VOICE:${escapeVCardValue(contact.phone)}`,
      `EMAIL;TYPE=WORK:${escapeVCardValue(business.email)}`,
      `URL:${escapeVCardValue(business.websiteUrl)}`,
      `ADR;TYPE=WORK:;;${escapeVCardValue(business.serviceArea)};;;;`,
      "END:VCARD",
    ].join("\r\n"),
  );

  return `${entries.join("\r\n")}\r\n`;
}
