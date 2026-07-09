import { Section } from "@/components/section";
import { TodoNote } from "@/components/todo-note";
import { buildMetadata } from "@/lib/meta";

export const metadata = buildMetadata("/heizungsrechner");

export default function HeizungsrechnerPage() {
  return (
    <Section title="Heizungsrechner">
      <TodoNote>
        Der bestehende Heizungsrechner wird übernommen, sobald der Betrieb die Rechenlogik geklärt hat
        (siehe TODO-BETRIEB.md).
      </TodoNote>
    </Section>
  );
}
