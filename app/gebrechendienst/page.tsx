import { Section } from "@/components/section";
import { TodoNote } from "@/components/todo-note";
import { locations } from "@/content/locations";
import { gebrechendienstLeistungen } from "@/content/services";
import { buildMetadata } from "@/lib/meta";

export const metadata = buildMetadata("/gebrechendienst");

export default function GebrechendienstPage() {
  return (
    <Section title="Gebrechendienst">
      <dl className="space-y-6">
        {gebrechendienstLeistungen.map((s) => (
          <div key={s.title}>
            <dt className="font-semibold text-text">{s.title}</dt>
            <dd className="mt-1 max-w-prose leading-relaxed">{s.body}</dd>
          </div>
        ))}
      </dl>
      <div className="mt-8">
        <TodoNote>
          Separate Notdienst-Nummer bzw. 24h-Verfügbarkeit ist vom Betrieb zu klären — bis dahin gilt: Büro{" "}
          <a href={locations[0].phoneHref} className="text-brand hover:text-brand-dark">
            {locations[0].phone}
          </a>
          .
        </TodoNote>
      </div>
    </Section>
  );
}
