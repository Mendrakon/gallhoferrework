import type { NextConfig } from "next";

// Alle bekannten URLs der alten WordPress-Seite → neue Routes.
// heizungsrechner.php ist unbestätigt, der Redirect aber harmlos.
export const phpRedirects: { source: string; destination: string }[] = [
  { source: "/index.php", destination: "/" },
  { source: "/privatkunden.php", destination: "/privatkunden" },
  { source: "/privatkunden-reparaturen.php", destination: "/privatkunden/reparaturen" },
  { source: "/privatkunden-kessel-thermentausch.php", destination: "/privatkunden/kessel-thermentausch" },
  { source: "/privatkunden-smart-home.php", destination: "/privatkunden/smart-home" },
  { source: "/privatkunden-umwelt-energiemanagement.php", destination: "/privatkunden/umwelt-energiemanagement" },
  { source: "/renovierung-und-neubau.php", destination: "/privatkunden/renovierung-neubau" },
  { source: "/hausverwaltung-industrie.php", destination: "/hausverwaltung-industrie" },
  { source: "/heizzentralen.php", destination: "/heizzentralen" },
  { source: "/fernueberwachung.php", destination: "/fernueberwachung" },
  { source: "/gebrechendienst.php", destination: "/gebrechendienst" },
  { source: "/wartung.php", destination: "/wartung" },
  { source: "/galerie.php", destination: "/galerie" },
  { source: "/impressum.php", destination: "/impressum" },
  { source: "/agb.php", destination: "/agb" },
  { source: "/datenschutz.php", destination: "/datenschutz" },
  { source: "/heizungsrechner.php", destination: "/heizungsrechner" },
];

const nextConfig: NextConfig = {
  async redirects() {
    return phpRedirects.map((r) => ({ ...r, statusCode: 301 as const }));
  },
};

export default nextConfig;
