import type { NextConfig } from "next";

// Alle bekannten URLs der alten WordPress-Seite → neue Routes.
// heizungsrechner.php ist unbestätigt, der Redirect aber harmlos.
export const phpRedirects: { source: string; destination: string }[] = [
  { source: "/index.php", destination: "/" },
  { source: "/privatkunden.php", destination: "/privatkunden" },
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
