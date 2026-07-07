import { notFound } from "next/navigation";
import { ServicePageBody } from "@/components/service-page-body";
import { privatLeistungen, privatLeistungBySlug } from "@/content/services";
import { buildMetadata } from "@/lib/meta";

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
  return <ServicePageBody page={page} />;
}
