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

  it("zeigt den Standort-Block", () => {
    render(<Home />);
    expect(screen.getByText(/Viktorgasse 20/)).toBeInTheDocument();
    expect(screen.getByText(/Schloßbergstraße 20/)).toBeInTheDocument();
  });
});
