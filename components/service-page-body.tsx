import { Section } from "@/components/section";
import { TodoNote } from "@/components/todo-note";
import type { ServicePage } from "@/content/services";

export function ServicePageBody({ page, children }: { page: ServicePage; children?: React.ReactNode }) {
  return (
    <Section title={page.title}>
      {page.paragraphs.map((text) => (
        <p key={text} className="mb-4 max-w-prose leading-relaxed">
          {text}
        </p>
      ))}
      {page.contentPending ? <TodoNote /> : null}
      {children}
    </Section>
  );
}
