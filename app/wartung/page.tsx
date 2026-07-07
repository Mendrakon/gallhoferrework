import { ServicePageBody } from "@/components/service-page-body";
import { b2bSeiteBySlug } from "@/content/services";
import { buildMetadata } from "@/lib/meta";

export const metadata = buildMetadata("/wartung");

export default function WartungPage() {
  return <ServicePageBody page={b2bSeiteBySlug("wartung")} />;
}
