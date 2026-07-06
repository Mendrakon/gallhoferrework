import { locations } from "@/content/locations";
import { allRoutes, metaFor, pagesMeta } from "@/content/pages";
import {
  b2bSeiten,
  b2bSeiteBySlug,
  gebrechendienstLeistungen,
  privatLeistungen,
  privatUebersicht,
} from "@/content/services";

const ROUTES = [
  "/",
  "/privatkunden",
  "/privatkunden/reparaturen",
  "/privatkunden/kessel-thermentausch",
  "/privatkunden/smart-home",
  "/privatkunden/umwelt-energiemanagement",
  "/privatkunden/renovierung-neubau",
  "/heizungsrechner",
  "/hausverwaltung-industrie",
  "/heizzentralen",
  "/fernueberwachung",
  "/gebrechendienst",
  "/wartung",
  "/galerie",
  "/impressum",
  "/agb",
  "/datenschutz",
];

describe("locations", () => {
  it("führt beide Standorte mit der belegten Büronummer", () => {
    expect(locations).toHaveLength(2);
    expect(locations.map((l) => l.postalCode).sort()).toEqual(["1040", "7212"]);
    for (const loc of locations) {
      expect(loc.phone).toBe("01/749 14 56");
      expect(loc.phoneHref).toBe("tel:+4317491456");
      expect(loc.street.length).toBeGreaterThan(3);
    }
  });
});

describe("pagesMeta", () => {
  it("deckt exakt die Routes aus der Spec ab", () => {
    expect([...allRoutes].sort()).toEqual([...ROUTES].sort());
  });

  it("hat pro Seite eigenen Title und eigene Description", () => {
    expect(new Set(pagesMeta.map((p) => p.title)).size).toBe(pagesMeta.length);
    expect(new Set(pagesMeta.map((p) => p.description)).size).toBe(pagesMeta.length);
    for (const p of pagesMeta) {
      expect(p.description.length).toBeGreaterThanOrEqual(20);
      expect(p.description.length).toBeLessThanOrEqual(170);
    }
  });

  it("metaFor wirft bei unbekannter Route", () => {
    expect(() => metaFor("/gibts-nicht")).toThrow();
  });
});

describe("services", () => {
  it("Gebrechendienst hat die 5 belegten Leistungen", () => {
    expect(gebrechendienstLeistungen.map((s) => s.title)).toEqual([
      "Abflussverstopfung",
      "Leitungsgebrechen",
      "Leckortung",
      "Gasleitung",
      "Störungen in Heizungsanlagen",
    ]);
    for (const s of gebrechendienstLeistungen) {
      expect(s.body.length).toBeGreaterThan(20);
    }
  });

  it("jede Privat-Leistung hat eine Route", () => {
    for (const p of privatLeistungen) {
      expect(ROUTES).toContain(`/privatkunden/${p.slug}`);
    }
    expect(privatLeistungen).toHaveLength(5);
  });

  it("Seiten ohne übernommenen Text sind als pending markiert", () => {
    for (const page of [privatUebersicht, ...privatLeistungen, ...b2bSeiten]) {
      if (page.paragraphs.length === 0) {
        expect(page.contentPending).toBe(true);
      } else {
        expect(page.contentPending).toBe(false);
      }
    }
  });

  it("b2bSeiteBySlug liefert bekannte Slugs und wirft sonst", () => {
    expect(b2bSeiteBySlug("heizzentralen").title).toBe("Heizzentralen");
    expect(() => b2bSeiteBySlug("nope")).toThrow();
  });
});
