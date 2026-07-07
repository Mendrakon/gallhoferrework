import { render, screen } from "@testing-library/react";
import PrivatkundenPage from "@/app/privatkunden/page";
import { generateStaticParams } from "@/app/privatkunden/[slug]/page";
import HeizungsrechnerPage from "@/app/heizungsrechner/page";
import { privatLeistungen } from "@/content/services";

describe("Privat-Übersicht", () => {
  it("listet alle 5 Leistungen als Links", () => {
    render(<PrivatkundenPage />);
    for (const p of privatLeistungen) {
      expect(screen.getByRole("link", { name: p.title })).toHaveAttribute(
        "href",
        `/privatkunden/${p.slug}`
      );
    }
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
