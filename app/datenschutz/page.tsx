import { ServicePageBody } from "@/components/service-page-body";
import { rechtsSeiteBySlug } from "@/content/legal";
import { buildMetadata } from "@/lib/meta";

export const metadata = buildMetadata("/datenschutz");

export default function DatenschutzPage() {
  return <ServicePageBody page={rechtsSeiteBySlug("datenschutz")} />;
}
