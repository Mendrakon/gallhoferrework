import { fireEvent, render, screen } from "@testing-library/react";

const nav = vi.hoisted(() => ({ path: "/" }));
vi.mock("next/navigation", () => ({ usePathname: () => nav.path }));

import { SiteHeader } from "@/components/site-header";

describe("SiteHeader", () => {
  it("zeigt auf B2B-Seiten das Hauptmenü", () => {
    nav.path = "/heizzentralen";
    render(<SiteHeader />);
    expect(screen.getByRole("link", { name: "Gebrechendienst" })).toBeInTheDocument();
    expect(screen.queryByRole("link", { name: "Smart Home" })).not.toBeInTheDocument();
  });

  it("zeigt in der Privat-Welt das Privat-Menü", () => {
    nav.path = "/privatkunden/smart-home";
    render(<SiteHeader />);
    expect(screen.getByRole("link", { name: "Smart Home" })).toBeInTheDocument();
    expect(screen.queryByRole("link", { name: "Heizzentralen" })).not.toBeInTheDocument();
  });

  it("markiert den aktiven Menüpunkt", () => {
    nav.path = "/wartung";
    render(<SiteHeader />);
    expect(screen.getByRole("link", { name: "Wartung" })).toHaveAttribute("aria-current", "page");
  });

  it("Burger-Button steuert das Menü (aria-expanded)", () => {
    nav.path = "/";
    render(<SiteHeader />);
    const btn = screen.getByRole("button", { name: "Menü" });
    expect(btn).toHaveAttribute("aria-expanded", "false");
    fireEvent.click(btn);
    expect(btn).toHaveAttribute("aria-expanded", "true");
  });
});
