import Link from "next/link";
import { ServicePageBody } from "@/components/service-page-body";
import { mainNav } from "@/content/navigation";
import { b2bSeiteBySlug } from "@/content/services";
import { buildMetadata } from "@/lib/meta";

export const metadata = buildMetadata("/hausverwaltung-industrie");

const weitere = mainNav.filter((i) => i.href !== "/" && i.href !== "/hausverwaltung-industrie");

export default function HausverwaltungIndustriePage() {
  return (
    <ServicePageBody page={b2bSeiteBySlug("hausverwaltung-industrie")}>
      <ul className="mt-6 grid gap-3 sm:grid-cols-2">
        {weitere.map((i) => (
          <li key={i.href}>
            <Link
              href={i.href}
              className="block border border-line bg-surface px-4 py-3 text-brand hover:border-brand"
            >
              {i.label}
            </Link>
          </li>
        ))}
      </ul>
    </ServicePageBody>
  );
}
