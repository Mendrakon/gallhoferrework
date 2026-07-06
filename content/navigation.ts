export type World = "splash" | "privat" | "b2b";

export interface NavItem {
  label: string;
  href: string;
}

// Reihenfolge und Wording gemäß Live-Seite (Stand 2026-07-06) mit einer dokumentierten Ausnahme:
// Die Alt-Seite ist bei einem Label in sich inkonsistent (Nav: "Umwelt – & Energiemanagement",
// Teaser: "UMWELT & ENERGIEMANAGEMENT"). Wir folgen dem Auftraggeber-Dokument (Gallhofer-Rework.md):
// "Umwelt- & Energiemanagement". Freigabe durch den Betrieb: siehe TODO-BETRIEB.md.
export const mainNav: NavItem[] = [
  { label: "Willkommen", href: "/" },
  { label: "Hausverwaltung & Industrie", href: "/hausverwaltung-industrie" },
  { label: "Heizzentralen", href: "/heizzentralen" },
  { label: "Fernüberwachung", href: "/fernueberwachung" },
  { label: "Gebrechendienst", href: "/gebrechendienst" },
  { label: "Wartung", href: "/wartung" },
  { label: "Galerie", href: "/galerie" },
];

export const privatNav: NavItem[] = [
  { label: "Privatkunden", href: "/privatkunden" },
  { label: "Reparaturen", href: "/privatkunden/reparaturen" },
  { label: "Kessel & Thermentausch", href: "/privatkunden/kessel-thermentausch" },
  { label: "Smart Home", href: "/privatkunden/smart-home" },
  { label: "Umwelt- & Energiemanagement", href: "/privatkunden/umwelt-energiemanagement" },
  { label: "Renovierung & Neubau", href: "/privatkunden/renovierung-neubau" },
];

export function worldForPath(pathname: string): World {
  if (pathname === "/") return "splash";
  if (pathname === "/heizungsrechner" || pathname === "/privatkunden" || pathname.startsWith("/privatkunden/")) {
    return "privat";
  }
  return "b2b";
}

export function navForWorld(world: World): NavItem[] {
  return world === "privat" ? privatNav : mainNav;
}
