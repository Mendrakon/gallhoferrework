import { allRoutes } from "@/content/pages";
import nextConfig, { phpRedirects } from "@/next.config";

describe("301-Redirects", () => {
  it("deckt alle bekannten alten .php-URLs ab", () => {
    const bySource = Object.fromEntries(phpRedirects.map((r) => [r.source, r.destination]));
    expect(bySource["/index.php"]).toBe("/");
    expect(bySource["/privatkunden.php"]).toBe("/privatkunden");
    expect(bySource["/privatkunden-reparaturen.php"]).toBe("/privatkunden/reparaturen");
    expect(bySource["/privatkunden-kessel-thermentausch.php"]).toBe("/privatkunden/kessel-thermentausch");
    expect(bySource["/privatkunden-smart-home.php"]).toBe("/privatkunden/smart-home");
    expect(bySource["/privatkunden-umwelt-energiemanagement.php"]).toBe("/privatkunden/umwelt-energiemanagement");
    expect(bySource["/renovierung-und-neubau.php"]).toBe("/privatkunden/renovierung-neubau");
    expect(bySource["/hausverwaltung-industrie.php"]).toBe("/hausverwaltung-industrie");
    expect(bySource["/heizzentralen.php"]).toBe("/heizzentralen");
    expect(bySource["/fernueberwachung.php"]).toBe("/fernueberwachung");
    expect(bySource["/gebrechendienst.php"]).toBe("/gebrechendienst");
    expect(bySource["/wartung.php"]).toBe("/wartung");
    expect(bySource["/galerie.php"]).toBe("/galerie");
    expect(bySource["/impressum.php"]).toBe("/impressum");
    expect(bySource["/agb.php"]).toBe("/agb");
    expect(bySource["/datenschutz.php"]).toBe("/datenschutz");
    expect(bySource["/heizungsrechner.php"]).toBe("/heizungsrechner");
    expect(phpRedirects).toHaveLength(17);
  });

  it("jede Source ist .php, jede Destination eine echte Route", () => {
    for (const r of phpRedirects) {
      expect(r.source.endsWith(".php")).toBe(true);
      expect(allRoutes).toContain(r.destination);
    }
  });

  it("redirects() emittiert für jede Regel statusCode 301", async () => {
    const rules = await nextConfig.redirects!();
    expect(rules).toHaveLength(phpRedirects.length);
    for (const r of rules) {
      expect(r.statusCode).toBe(301);
      expect(r.permanent).toBeUndefined();
    }
  });
});
