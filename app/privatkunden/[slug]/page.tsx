import type { StaticImageData } from "next/image";
import { notFound } from "next/navigation";
import { ServicePageBody } from "@/components/service-page-body";
import { galleryBySlug } from "@/content/galleries";
import { privatLeistungen, privatLeistungBySlug } from "@/content/services";
import { buildMetadata } from "@/lib/meta";
import heroReparaturen from "@/public/leistungen/hero-reparaturen.jpg";
import heroKessel from "@/public/leistungen/hero-kessel-thermentausch.jpg";
import heroSmart from "@/public/leistungen/hero-smart-home.jpg";
import heroUmwelt from "@/public/leistungen/hero-umwelt-energiemanagement.jpg";
import heroNeubau from "@/public/leistungen/hero-renovierung-neubau.jpg";

const heroBySlug: Record<string, StaticImageData> = {
  reparaturen: heroReparaturen,
  "kessel-thermentausch": heroKessel,
  "smart-home": heroSmart,
  "umwelt-energiemanagement": heroUmwelt,
  "renovierung-neubau": heroNeubau,
};

export const dynamicParams = false;

export function generateStaticParams() {
  return privatLeistungen.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return buildMetadata(`/privatkunden/${slug}`);
}

export default async function PrivatLeistungPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = privatLeistungBySlug(slug);
  if (!page) notFound();
  return (
    <ServicePageBody
      page={page}
      hero={heroBySlug[slug]}
      heroAlt={`${page.title} – Gallhofer Haustechnik`}
      gallery={galleryBySlug[slug]}
    />
  );
}
