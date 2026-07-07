import Link from "next/link";
import industrieBild from "@/public/industrie.jpg";
import privatkundenBild from "@/public/privatkunden.jpg";
import { LocationCard } from "@/components/location-card";
import { Section } from "@/components/section";
import { Tile } from "@/components/tile";
import { locations } from "@/content/locations";
import { buildMetadata } from "@/lib/meta";

export const metadata = buildMetadata("/");

export default function Home() {
  return (
    <>
      <Section title="Wählen Sie Ihren Bereich!">
        <div className="grid gap-6 sm:grid-cols-2">
          <Tile
            href="/privatkunden"
            title="PRIVATKUNDEN"
            image={privatkundenBild}
            alt="Privatkunden – Gallhofer Haustechnik"
          />
          <Tile
            href="/hausverwaltung-industrie"
            title="HAUSVERWALTUNG & INDUSTRIE"
            image={industrieBild}
            alt="Hausverwaltung & Industrie – Gallhofer Haustechnik"
          />
        </div>
        <p className="mt-6 text-center">
          <Link href="/heizungsrechner" className="text-brand underline hover:text-brand-dark">
            Heizungsrechner
          </Link>
        </p>
      </Section>
      <Section>
        <div className="grid gap-8 sm:grid-cols-2">
          {locations.map((loc) => (
            <LocationCard key={loc.name} location={loc} />
          ))}
        </div>
      </Section>
    </>
  );
}
