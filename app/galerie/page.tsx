import { Gallery } from "@/components/gallery";
import { Section } from "@/components/section";
import { TodoNote } from "@/components/todo-note";
import { galerieImages } from "@/content/galerie";
import { buildMetadata } from "@/lib/meta";

export const metadata = buildMetadata("/galerie");

export default function GaleriePage() {
  return (
    <Section title="Galerie">
      {galerieImages.length === 0 ? (
        <TodoNote>
          Galerie-Bilder aus dem Bestand übernehmen bzw. vom Betrieb in guter Auflösung liefern lassen.
        </TodoNote>
      ) : (
        <>
          <Gallery images={galerieImages} altPrefix="Galerie" />
          <div className="mt-6">
            <TodoNote>Aussagekräftige Bildbeschreibungen (Alt-Texte) vom Betrieb ergänzen lassen.</TodoNote>
          </div>
        </>
      )}
    </Section>
  );
}
