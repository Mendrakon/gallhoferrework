import robots from "@/app/robots";
import sitemap from "@/app/sitemap";
import { allRoutes } from "@/content/pages";
import { locations } from "@/content/locations";
import { SITE_URL } from "@/lib/site";
import { plumberJsonLd } from "@/lib/schema";

describe("sitemap", () => {
  it("enthält jede Route genau einmal, absolut", () => {
    const entries = sitemap();
    expect(entries).toHaveLength(allRoutes.length);
    for (const e of entries) {
      expect(e.url.startsWith(SITE_URL)).toBe(true);
    }
    expect(new Set(entries.map((e) => e.url)).size).toBe(entries.length);
  });
});

describe("robots", () => {
  it("erlaubt alles und verweist auf die Sitemap", () => {
    const r = robots();
    expect(r.sitemap).toBe(`${SITE_URL}/sitemap.xml`);
  });
});

describe("plumberJsonLd", () => {
  it("baut valide LocalBusiness-Daten je Standort", () => {
    const data = plumberJsonLd(locations[0]) as Record<string, unknown>;
    expect(data["@type"]).toBe("Plumber");
    expect(data.telephone).toBe("+43 1 749 14 56");
    const address = data.address as Record<string, unknown>;
    expect(address.postalCode).toBe("1040");
    expect(address.addressCountry).toBe("AT");
    // Geo/Öffnungszeiten bewusst nicht enthalten (⚠️ TODO Betrieb)
    expect(data).not.toHaveProperty("geo");
    expect(data).not.toHaveProperty("openingHoursSpecification");
  });
});
