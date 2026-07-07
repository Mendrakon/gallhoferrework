import { existsSync } from "node:fs";
import path from "node:path";
import { render, screen } from "@testing-library/react";
import GebrechendienstPage from "@/app/gebrechendienst/page";
import UebersichtPage from "@/app/hausverwaltung-industrie/page";
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
