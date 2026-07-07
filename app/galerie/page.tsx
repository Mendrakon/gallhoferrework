import Image from "next/image";
import { Section } from "@/components/section";
import { TodoNote } from "@/components/todo-note";
import { galerieBilder } from "@/content/galerie";
import { buildMetadata } from "@/lib/meta";

export const metadata = buildMetadata("/galerie");

export default function GaleriePage() {
  return (
    <Section title="Galerie">
      {galerieBilder.length === 0 ? (
        <TodoNote>Galerie-Bilder aus dem Bestand übernehmen bzw. vom Betrieb in guter Auflösung liefern lassen.</TodoNote>
      ) : (
        <>
          <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3">
            {galerieBilder.map((file, i) => (
              <li key={file}>
                <Image
                  src={`/galerie/${file}`}
                  alt={`Galerie Gallhofer Haustechnik – Bild ${i + 1}`}
                  width={600}
                  height={400}
                  className="h-40 w-full object-cover sm:h-56"
                />
              </li>
            ))}
          </ul>
          <div className="mt-6">
            <TodoNote>Aussagekräftige Bildbeschreibungen (Alt-Texte) vom Betrieb ergänzen lassen.</TodoNote>
          </div>
        </>
      )}
    </Section>
  );
}
