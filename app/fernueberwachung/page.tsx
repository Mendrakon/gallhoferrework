import { ServicePageBody } from "@/components/service-page-body";
import { b2bSeiteBySlug } from "@/content/services";
import { buildMetadata } from "@/lib/meta";

export const metadata = buildMetadata("/fernueberwachung");

export default function FernueberwachungPage() {
  return <ServicePageBody page={b2bSeiteBySlug("fernueberwachung")} />;
}
