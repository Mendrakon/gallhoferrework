import { existsSync } from "node:fs";
import path from "node:path";
import { render, screen } from "@testing-library/react";
import GebrechendienstPage from "@/app/gebrechendienst/page";
import UebersichtPage from "@/app/hausverwaltung-industrie/page";
import GaleriePage from "@/app/galerie/page";
import HeizzentralenPage from "@/app/heizzentralen/page";
import FernueberwachungPage from "@/app/fernueberwachung/page";
import WartungPage from "@/app/wartung/page";
import { galerieBilder } from "@/content/galerie";
import { gebrechendienstLeistungen } from "@/content/services";

describe("Gebrechendienst", () => {
  it("führt alle 5 belegten Leistungen mit Text auf", () => {
    render(<GebrechendienstPage />);
    for (const s of gebrechendienstLeistungen) {
      expect(screen.getByText(s.title)).toBeInTheDocument();
    }
    expect(screen.getByRole("heading", { level: 1, name: "Gebrechendienst" })).toBeInTheDocument();
  });

  it("weist auf die ungeklärte Notdienst-Nummer hin (TodoNote)", () => {
    render(<GebrechendienstPage />);
    expect(screen.getByRole("note")).toHaveTextContent(/Notdienst/);
  });
});

describe("B2B-Übersicht", () => {
  it("verlinkt die weiteren B2B-Seiten", () => {
    render(<UebersichtPage />);
    for (const label of ["Heizzentralen", "Fernüberwachung", "Gebrechendienst", "Wartung", "Galerie"]) {
      expect(screen.getByRole("link", { name: label })).toBeInTheDocument();
    }
  });
});

describe("Galerie-Daten", () => {
  it("jeder Eintrag in galerieBilder existiert als Datei", () => {
    for (const file of galerieBilder) {
      expect(existsSync(path.join(process.cwd(), "public", "galerie", file))).toBe(true);
    }
  });
});

describe("B2B-Leaf-Seiten rendern mit h1", () => {
  it("Heizzentralen hat eine h1", () => {
    render(<HeizzentralenPage />);
    expect(screen.getByRole("heading", { level: 1, name: "Heizzentralen" })).toBeInTheDocument();
  });
  it("Fernüberwachung hat eine h1", () => {
    render(<FernueberwachungPage />);
    expect(screen.getByRole("heading", { level: 1, name: "Fernüberwachung" })).toBeInTheDocument();
  });
  it("Wartung hat eine h1", () => {
    render(<WartungPage />);
    expect(screen.getByRole("heading", { level: 1, name: "Wartung" })).toBeInTheDocument();
  });
  it("Galerie hat eine h1", () => {
    render(<GaleriePage />);
    expect(screen.getByRole("heading", { level: 1, name: "Galerie" })).toBeInTheDocument();
  });
});

describe("B2B-Übersicht verlinkt nicht auf sich selbst", () => {
  it("zeigt weder Willkommen noch den Selbst-Link als Link", () => {
    render(<UebersichtPage />);
    expect(screen.queryByRole("link", { name: "Willkommen" })).not.toBeInTheDocument();
    expect(screen.queryByRole("link", { name: "Hausverwaltung & Industrie" })).not.toBeInTheDocument();
  });
});
