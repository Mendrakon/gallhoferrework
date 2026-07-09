import { ServicePageBody } from "@/components/service-page-body";
import { rechtsSeiteBySlug } from "@/content/legal";
import { buildMetadata } from "@/lib/meta";

export const metadata = buildMetadata("/impressum");

export default function ImpressumPage() {
  return <ServicePageBody page={rechtsSeiteBySlug("impressum")} />;
}
