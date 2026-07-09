import { fireEvent, render, screen } from "@testing-library/react";
import PrivatkundenPage from "@/app/privatkunden/page";
import PrivatLeistungPage, { generateMetadata, generateStaticParams } from "@/app/privatkunden/[slug]/page";
import HeizungsrechnerPage from "@/app/heizungsrechner/page";
import { privatLeistungen } from "@/content/services";

describe("Privat-Übersicht", () => {
  it("listet alle 5 Leistungen als verlinkte Bildkacheln", () => {
    const { container } = render(<PrivatkundenPage />);
    for (const p of privatLeistungen) {
      expect(screen.getByRole("link", { name: p.title })).toHaveAttribute(
        "href",
        `/privatkunden/${p.slug}`
      );
    }
    expect(container.querySelectorAll("img")).toHaveLength(5);
  });
});

describe("Leistungs-Detailroute", () => {
  it("generiert exakt die 5 Slugs aus den Content-Daten", () => {
    expect(generateStaticParams().map((p) => p.slug).sort()).toEqual(
      privatLeistungen.map((p) => p.slug).sort()
    );
  });
});

describe("Heizungsrechner", () => {
  it("zeigt Titel und TodoNote (Logik ungeklärt)", () => {
    render(<HeizungsrechnerPage />);
    expect(screen.getByRole("heading", { level: 1, name: "Heizungsrechner" })).toBeInTheDocument();
    expect(screen.getByRole("note")).toBeInTheDocument();
  });
});

describe("Leistungs-Detailseite", () => {
  it("rendert bekannte Slugs mit Titel als h1, Hero-Bild und Galerie", async () => {
    const { container } = render(
      await PrivatLeistungPage({ params: Promise.resolve({ slug: "smart-home" }) })
    );
    expect(screen.getByRole("heading", { level: 1, name: "Smart Home" })).toBeInTheDocument();
    expect(container.querySelectorAll("img").length).toBeGreaterThanOrEqual(1);
    // Smart-Home-Detailseite zeigt die 5 Original-Galeriebilder unter dem Text.
    expect(container.querySelectorAll("ul li img")).toHaveLength(5);
  });

  it("Galerie öffnet per Klick die Großansicht (Dialog) und schließt wieder", async () => {
    const { container } = render(
      await PrivatLeistungPage({ params: Promise.resolve({ slug: "smart-home" }) })
    );
    const thumbs = container.querySelectorAll("ul li button");
    expect(thumbs).toHaveLength(5);
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    fireEvent.click(thumbs[0]);
    expect(screen.getByRole("dialog")).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Schließen" }));
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("wirft notFound für unbekannte Slugs", async () => {
    await expect(PrivatLeistungPage({ params: Promise.resolve({ slug: "gibts-nicht" }) })).rejects.toThrow();
  });

  it("generateMetadata liefert den Seitentitel", async () => {
    const meta = await generateMetadata({ params: Promise.resolve({ slug: "smart-home" }) });
    expect(meta.title).toBe("Smart Home");
  });
});
