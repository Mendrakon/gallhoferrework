import { rechtsSeiten, rechtsSeiteBySlug } from "@/content/legal";

describe("Rechtsseiten", () => {
  it("führt genau Impressum, AGB, Datenschutz", () => {
    expect(rechtsSeiten.map((p) => p.slug).sort()).toEqual(["agb", "datenschutz", "impressum"]);
  });

  it("Seiten ohne übernommenen Bestandstext sind pending", () => {
    for (const page of rechtsSeiten) {
      if (page.paragraphs.length === 0) {
        expect(page.contentPending).toBe(true);
      } else {
        expect(page.contentPending).toBe(false);
      }
    }
  });

  it("rechtsSeiteBySlug wirft bei unbekanntem Slug", () => {
    expect(rechtsSeiteBySlug("impressum").title).toBe("Impressum");
    expect(() => rechtsSeiteBySlug("cookie-policy")).toThrow();
  });
});
