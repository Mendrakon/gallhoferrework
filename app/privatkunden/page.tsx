import Link from "next/link";
import { ServicePageBody } from "@/components/service-page-body";
import { privatLeistungen, privatUebersicht } from "@/content/services";
import { buildMetadata } from "@/lib/meta";

export const metadata = buildMetadata("/privatkunden");

export default function PrivatkundenPage() {
  return (
    <ServicePageBody page={privatUebersicht}>
      <ul className="mt-6 grid gap-3 sm:grid-cols-2">
        {privatLeistungen.map((p) => (
          <li key={p.slug}>
            <Link
              href={`/privatkunden/${p.slug}`}
              className="block border border-line bg-surface px-4 py-3 text-brand hover:border-brand"
            >
              {p.title}
            </Link>
          </li>
        ))}
      </ul>
    </ServicePageBody>
  );
}
