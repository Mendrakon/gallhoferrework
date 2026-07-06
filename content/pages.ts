export interface PageMeta {
  route: string;
  title: string;
  description: string;
}

export const pagesMeta: PageMeta[] = [
  {
    route: "/",
    title: "Wählen Sie Ihren Bereich!",
    description:
      "Gallhofer Haustechnik in Wien und Forchtenstein: Leistungen für Privatkunden sowie Hausverwaltung & Industrie. Büro: 01/749 14 56.",
  },
  {
    route: "/privatkunden",
    title: "Privatkunden",
    description:
      "Überblick über die Privatkunden-Leistungen der Gallhofer Haustechnik: Reparaturen, Kessel & Thermentausch, Smart Home, Umwelt- & Energiemanagement, Renovierung & Neubau.",
  },
  {
    route: "/privatkunden/reparaturen",
    title: "Reparaturen",
    description: "Reparaturen für Privatkunden — Gallhofer Haustechnik, Wien und Forchtenstein.",
  },
  {
    route: "/privatkunden/kessel-thermentausch",
    title: "Kessel & Thermentausch",
    description: "Kessel- und Thermentausch für Privatkunden — Gallhofer Haustechnik.",
  },
  {
    route: "/privatkunden/smart-home",
    title: "Smart Home",
    description: "Smart-Home-Leistungen für Privatkunden der Gallhofer Haustechnik.",
  },
  {
    route: "/privatkunden/umwelt-energiemanagement",
    title: "Umwelt- & Energiemanagement",
    description: "Umwelt- und Energiemanagement für Privatkunden der Gallhofer Haustechnik.",
  },
  {
    route: "/privatkunden/renovierung-neubau",
    title: "Renovierung & Neubau",
    description: "Renovierung & Neubau — Leistungen der Gallhofer Haustechnik für Privatkunden.",
  },
  {
    route: "/heizungsrechner",
    title: "Heizungsrechner",
    description: "Der Heizungsrechner der Gallhofer Haustechnik.",
  },
  {
    route: "/hausverwaltung-industrie",
    title: "Hausverwaltung & Industrie",
    description: "Leistungen der Gallhofer Haustechnik für Hausverwaltungen und Industrie.",
  },
  {
    route: "/heizzentralen",
    title: "Heizzentralen",
    description: "Heizzentralen — Leistungen der Gallhofer Haustechnik für Hausverwaltung & Industrie.",
  },
  {
    route: "/fernueberwachung",
    title: "Fernüberwachung",
    description: "Fernüberwachung — Leistungen der Gallhofer Haustechnik für Hausverwaltung und Industrie.",
  },
  {
    route: "/gebrechendienst",
    title: "Gebrechendienst",
    description:
      "Gebrechendienst der Gallhofer Haustechnik: Abflussverstopfung, Leitungsgebrechen, Leckortung, Gasleitung, Störungen in Heizungsanlagen. Büro: 01/749 14 56.",
  },
  {
    route: "/wartung",
    title: "Wartung",
    description: "Wartung — Leistungen der Gallhofer Haustechnik für Hausverwaltungen und Industriekunden.",
  },
  {
    route: "/galerie",
    title: "Galerie",
    description: "Galerie der Gallhofer Haustechnik.",
  },
  {
    route: "/impressum",
    title: "Impressum",
    description: "Impressum der Gallhofer Haustechnik.",
  },
  {
    route: "/agb",
    title: "AGB",
    description: "Allgemeine Geschäftsbedingungen der Gallhofer Haustechnik.",
  },
  {
    route: "/datenschutz",
    title: "Datenschutz",
    description: "Datenschutzerklärung der Gallhofer Haustechnik.",
  },
];

export const allRoutes = pagesMeta.map((p) => p.route);

export function metaFor(route: string): PageMeta {
  const found = pagesMeta.find((p) => p.route === route);
  if (!found) throw new Error(`Keine Metadaten für Route: ${route}`);
  return found;
}
