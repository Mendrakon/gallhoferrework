import { render, screen } from "@testing-library/react";
import Home from "@/app/page";

describe("Startseite", () => {
  it("hat die Original-Headline als h1", () => {
    render(<Home />);
    expect(screen.getByRole("heading", { level: 1, name: "Wählen Sie Ihren Bereich!" })).toBeInTheDocument();
  });

  it("verlinkt beide Bereichs-Kacheln und den Heizungsrechner", () => {
    render(<Home />);
    expect(screen.getByRole("link", { name: /PRIVATKUNDEN/ })).toHaveAttribute("href", "/privatkunden");
    expect(screen.getByRole("link", { name: /HAUSVERWALTUNG & INDUSTRIE/ })).toHaveAttribute(
      "href",
      "/hausverwaltung-industrie"
    );
    expect(screen.getByRole("link", { name: "Heizungsrechner" })).toHaveAttribute("href", "/heizungsrechner");
  });

  // Der Standort-Block steht global im Footer (SiteFooter), nicht mehr zusätzlich im
  // Splash-Body — sonst erschien er auf der Startseite doppelt. Footer-Test: base-components.
});
