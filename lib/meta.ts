import type { Metadata } from "next";
import { metaFor } from "@/content/pages";

export function buildMetadata(route: string): Metadata {
  const m = metaFor(route);
  return {
    title: m.title,
    description: m.description,
    alternates: { canonical: route },
    openGraph: {
      title: m.title,
      description: m.description,
      url: route,
      siteName: "Gallhofer Haustechnik",
      images: [{ url: "/logo-gallhofer-5.png" }],
      locale: "de_AT",
      type: "website",
    },
  };
}
