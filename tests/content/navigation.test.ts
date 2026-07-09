import { mainNav, navForWorld, privatNav, worldForPath } from "@/content/navigation";

describe("worldForPath", () => {
  it("ordnet die Pfade der richtigen Welt zu", () => {
    expect(worldForPath("/")).toBe("splash");
    expect(worldForPath("/privatkunden")).toBe("privat");
    expect(worldForPath("/privatkunden/smart-home")).toBe("privat");
    expect(worldForPath("/heizungsrechner")).toBe("privat");
    expect(worldForPath("/heizzentralen")).toBe("b2b");
    expect(worldForPath("/galerie")).toBe("b2b");
    expect(worldForPath("/impressum")).toBe("b2b");
  });
});

describe("Menüs", () => {
  it("Hauptmenü hat die 7 Original-Punkte in Original-Reihenfolge", () => {
    expect(mainNav.map((i) => i.label)).toEqual([
      "Willkommen",
      "Hausverwaltung & Industrie",
      "Heizzentralen",
      "Fernüberwachung",
      "Gebrechendienst",
      "Wartung",
      "Galerie",
    ]);
  });

  it("Privat-Menü führt Übersicht + 5 Leistungen exakt", () => {
    expect(privatNav).toEqual([
      { label: "Privatkunden", href: "/privatkunden" },
      { label: "Reparaturen", href: "/privatkunden/reparaturen" },
      { label: "Kessel & Thermentausch", href: "/privatkunden/kessel-thermentausch" },
      { label: "Smart Home", href: "/privatkunden/smart-home" },
      { label: "Umwelt- & Energiemanagement", href: "/privatkunden/umwelt-energiemanagement" },
      { label: "Renovierung & Neubau", href: "/privatkunden/renovierung-neubau" },
    ]);
  });

  it("navForWorld liefert Splash und B2B das Hauptmenü, Privat das Privat-Menü", () => {
    expect(navForWorld("splash")).toBe(mainNav);
    expect(navForWorld("b2b")).toBe(mainNav);
    expect(navForWorld("privat")).toBe(privatNav);
  });
});
