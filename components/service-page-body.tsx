import type { StaticImageData } from "next/image";
import { Section } from "@/components/section";
import { TodoNote } from "@/components/todo-note";
import type { ServicePage } from "@/content/services";

export function ServicePageBody({
  page,
  hero,
  heroAlt,
  children,
}: {
  page: ServicePage;
  hero?: StaticImageData;
  heroAlt?: string;
  children?: React.ReactNode;
}) {
  return (
    <Section title={page.title} hero={hero} heroAlt={heroAlt}>
      {page.paragraphs.map((text, i) => (
        <p key={i} className="mb-4 max-w-prose leading-relaxed">
          {text}
        </p>
      ))}
      {page.contentPending ? <TodoNote /> : null}
      {children}
    </Section>
  );
}
