import { contact, isFilled, site } from "@/config/site";

/**
 * JSON-LD Pharmacy/LocalBusiness. Só emite campos com dados reais
 * (nada de placeholder). Preencha contact.schema em src/config/site.ts.
 */
export function buildLocalBusinessSchema(): Record<string, unknown> {
  const s = contact.schema;
  const data: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": ["Pharmacy", "LocalBusiness"],
    name: site.name,
    description: site.description,
    areaServed: { "@type": "AdministrativeArea", name: "Campinas" },
  };
  if (site.urlIsConfigured) data.url = site.url;
  if (isFilled(contact.phone)) data.telephone = contact.phone;
  if (isFilled(contact.email)) data.email = contact.email;
  if (isFilled(s.streetAddress) && isFilled(s.city) && isFilled(s.postalCode)) {
    data.address = {
      "@type": "PostalAddress",
      streetAddress: s.streetAddress,
      addressLocality: s.city,
      addressRegion: "SP",
      postalCode: s.postalCode,
      addressCountry: "BR",
    };
  }
  if (contact.latitude !== null && contact.longitude !== null) {
    data.geo = { "@type": "GeoCoordinates", latitude: contact.latitude, longitude: contact.longitude };
  }
  if (s.openingHours?.length) data.openingHours = s.openingHours;
  return data;
}
