import type { StaticImageData } from "next/image";
import { Fragment } from "react";
import { Section } from "@/components/section";
import { TodoNote } from "@/components/todo-note";
import type { ServicePage } from "@/content/services";

// Klickbare Links aus im Fließtext stehenden URLs (verbatim übernommen, z. B. der
// Honeywell-Evohome-Link auf der Smart-Home-Seite).
function renderText(text: string) {
  return text.split(/(https?:\/\/[^\s]+)/g).map((part, i) =>
    /^https?:\/\//.test(part) ? (
      <a
        key={i}
        href={part}
        target="_blank"
        rel="noopener noreferrer"
        className="font-medium text-brand underline underline-offset-2 hover:text-brand-dark [overflow-wrap:anywhere]"
      >
        {part}
      </a>
    ) : (
      <Fragment key={i}>{part}</Fragment>
    )
  );
}

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
      <div className="max-w-3xl space-y-4 leading-relaxed">
        {page.blocks.map((block, i) =>
          block.type === "heading" ? (
            <h2 key={i} className="pt-4 text-xl font-semibold text-brand">
              {block.text}
            </h2>
          ) : (
            <p key={i}>{renderText(block.text)}</p>
          )
        )}
      </div>
      {page.contentPending ? <TodoNote /> : null}
      {children}
    </Section>
  );
}
