import type { Location } from "@/content/locations";
import { SITE_URL } from "@/lib/site";

// Geo-Koordinaten und Öffnungszeiten bewusst ausgespart — ⚠️ TODO Betrieb (siehe TODO-BETRIEB.md)
export function plumberJsonLd(loc: Location): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "Plumber",
    name: "Gallhofer Haustechnik",
    telephone: "+43 1 749 14 56",
    url: SITE_URL,
    address: {
      "@type": "PostalAddress",
      streetAddress: loc.note ? `${loc.street}, ${loc.note}` : loc.street,
      postalCode: loc.postalCode,
      addressLocality: loc.city,
      addressCountry: "AT",
    },
  };
}
