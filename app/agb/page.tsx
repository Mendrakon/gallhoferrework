import { ServicePageBody } from "@/components/service-page-body";
import { rechtsSeiteBySlug } from "@/content/legal";
import { buildMetadata } from "@/lib/meta";

export const metadata = buildMetadata("/agb");

export default function AgbPage() {
  return <ServicePageBody page={rechtsSeiteBySlug("agb")} />;
}
