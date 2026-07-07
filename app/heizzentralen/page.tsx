import { ServicePageBody } from "@/components/service-page-body";
import { b2bSeiteBySlug } from "@/content/services";
import { buildMetadata } from "@/lib/meta";
import hero from "@/public/leistungen/heizzentralen.jpg";

export const metadata = buildMetadata("/heizzentralen");

export default function HeizzentralenPage() {
  return (
    <ServicePageBody
      page={b2bSeiteBySlug("heizzentralen")}
      hero={hero}
      heroAlt="Heizzentralen – Gallhofer Haustechnik"
    />
  );
}
