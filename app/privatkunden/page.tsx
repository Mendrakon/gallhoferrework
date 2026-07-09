import type { StaticImageData } from "next/image";
import { Section } from "@/components/section";
import { Tile } from "@/components/tile";
import { privatLeistungen } from "@/content/services";
import { buildMetadata } from "@/lib/meta";
import tileReparaturen from "@/public/leistungen/tile-reparaturen.jpg";
import tileKessel from "@/public/leistungen/tile-kessel-thermentausch.jpg";
import tileSmart from "@/public/leistungen/tile-smart-home.jpg";
import tileUmwelt from "@/public/leistungen/tile-umwelt-energiemanagement.jpg";
import tileNeubau from "@/public/leistungen/tile-renovierung-neubau.jpg";

export const metadata = buildMetadata("/privatkunden");

const tileBySlug: Record<string, StaticImageData> = {
  reparaturen: tileReparaturen,
  "kessel-thermentausch": tileKessel,
  "smart-home": tileSmart,
  "umwelt-energiemanagement": tileUmwelt,
  "renovierung-neubau": tileNeubau,
};

export default function PrivatkundenPage() {
  return (
    <Section title="Privatkunden">
      <div className="grid gap-6 sm:grid-cols-2">
        {privatLeistungen.map((p) => (
          <Tile
            key={p.slug}
            href={`/privatkunden/${p.slug}`}
            title={p.title}
            image={tileBySlug[p.slug]}
            alt=""
            labelPosition="below"
          />
        ))}
      </div>
    </Section>
  );
}
