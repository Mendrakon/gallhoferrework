import Link from "next/link";
import { LocationCard } from "@/components/location-card";
import { locations } from "@/content/locations";

const legalLinks = [
  { label: "Impressum", href: "/impressum" },
  { label: "AGB", href: "/agb" },
  { label: "Datenschutz", href: "/datenschutz" },
];

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-line bg-surface">
      <div className="mx-auto grid w-full max-w-5xl gap-8 px-4 py-10 sm:grid-cols-2">
        {locations.map((loc) => (
          <LocationCard key={loc.name} location={loc} />
        ))}
      </div>
      <div className="border-t border-line">
        <nav
          aria-label="Rechtliches"
          className="mx-auto flex w-full max-w-5xl flex-wrap gap-x-6 gap-y-2 px-4 py-4 text-sm"
        >
          {legalLinks.map((l) => (
            <Link key={l.href} href={l.href} className="text-muted hover:text-text">
              {l.label}
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  );
}
