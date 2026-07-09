import { Section } from "@/components/section";
import { Tile } from "@/components/tile";
import { buildMetadata } from "@/lib/meta";
import heizzentralenImg from "@/public/leistungen/heizzentralen.jpg";
import fernueberwachungImg from "@/public/leistungen/fernueberwachung.jpg";
import gebrechendienstImg from "@/public/leistungen/gebrechendienst.jpg";
import wartungImg from "@/public/leistungen/wartung.jpg";

export const metadata = buildMetadata("/hausverwaltung-industrie");

// Reihenfolge und Kachelbilder wie auf der Original-Übersicht hausverwaltung-industrie.php.
const tiles = [
  { href: "/heizzentralen", title: "Heizzentralen", image: heizzentralenImg },
  { href: "/fernueberwachung", title: "Fernüberwachung", image: fernueberwachungImg },
  { href: "/gebrechendienst", title: "Gebrechendienst", image: gebrechendienstImg },
  { href: "/wartung", title: "Wartung", image: wartungImg },
];

export default function HausverwaltungIndustriePage() {
  return (
    <Section title="Hausverwaltung & Industrie">
      <div className="grid gap-6 sm:grid-cols-2">
        {tiles.map((t) => (
          <Tile key={t.href} href={t.href} title={t.title} image={t.image} alt="" labelPosition="below" />
        ))}
      </div>
    </Section>
  );
}
