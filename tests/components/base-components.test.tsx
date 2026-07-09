import { render, screen } from "@testing-library/react";
import { LocationCard } from "@/components/location-card";
import { ServicePageBody } from "@/components/service-page-body";
import { SiteFooter } from "@/components/site-footer";
import { Tile } from "@/components/tile";
import { TodoNote } from "@/components/todo-note";
import { locations } from "@/content/locations";

describe("TodoNote", () => {
  it("markiert fehlenden Inhalt sichtbar", () => {
    render(<TodoNote>Öffnungszeiten fehlen.</TodoNote>);
    expect(screen.getByRole("note")).toHaveTextContent("Inhalt folgt");
    expect(screen.getByRole("note")).toHaveTextContent("Öffnungszeiten fehlen.");
  });
});

describe("Tile", () => {
  it("verlinkt Bild + Titel auf den Bereich", () => {
    const stubImage = { src: "/privatkunden.jpg", width: 800, height: 533 };
    render(<Tile href="/privatkunden" title="PRIVATKUNDEN" image={stubImage} alt="Privatkunden" />);
    expect(screen.getByRole("link", { name: /PRIVATKUNDEN/ })).toHaveAttribute("href", "/privatkunden");
    expect(screen.getByAltText("Privatkunden")).toBeInTheDocument();
  });
});

describe("LocationCard", () => {
  it("zeigt Adresse und klickbare Büronummer", () => {
    render(<LocationCard location={locations[0]} />);
    expect(screen.getByText(/Viktorgasse 20/)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "01/749 14 56" })).toHaveAttribute("href", "tel:+4317491456");
  });
});

describe("ServicePageBody", () => {
  it("rendert Absätze ohne TodoNote, wenn Inhalt vorhanden", () => {
    render(
      <ServicePageBody
        page={{
          slug: "x",
          title: "Testseite",
          blocks: [{ type: "paragraph", text: "Erster Absatz." }],
          contentPending: false,
        }}
      />
    );
    expect(screen.getByRole("heading", { level: 1, name: "Testseite" })).toBeInTheDocument();
    expect(screen.getByText("Erster Absatz.")).toBeInTheDocument();
    expect(screen.queryByRole("note")).not.toBeInTheDocument();
  });

  it("zeigt TodoNote bei pending", () => {
    render(<ServicePageBody page={{ slug: "x", title: "Leer", blocks: [], contentPending: true }} />);
    expect(screen.getByRole("note")).toBeInTheDocument();
  });
});

describe("SiteFooter", () => {
  it("führt beide Standorte und die Rechts-Links", () => {
    render(<SiteFooter />);
    expect(screen.getByText(/1040 Wien/)).toBeInTheDocument();
    expect(screen.getByText(/7212 Forchtenstein/)).toBeInTheDocument();
    for (const label of ["Impressum", "AGB", "Datenschutz"]) {
      expect(screen.getByRole("link", { name: label })).toBeInTheDocument();
    }
  });
});
