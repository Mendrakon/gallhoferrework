import Image, { type StaticImageData } from "next/image";
import { Fragment } from "react";
import { Section } from "@/components/section";
import { TodoNote } from "@/components/todo-note";
import type { ServicePage } from "@/content/services";

// Klickbare Links aus im Fließtext stehenden URLs und E-Mail-Adressen (verbatim
// übernommen, z. B. der Honeywell-Link auf Smart Home oder die E-Mail im Impressum).
const linkClass =
  "font-medium text-brand underline underline-offset-2 hover:text-brand-dark [overflow-wrap:anywhere]";

function renderText(text: string) {
  return text.split(/(https?:\/\/[^\s]+|[^\s@]+@[^\s@]+\.[^\s@]+)/g).map((part, i) => {
    if (/^https?:\/\//.test(part)) {
      return (
        <a key={i} href={part} target="_blank" rel="noopener noreferrer" className={linkClass}>
          {part}
        </a>
      );
    }
    if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(part)) {
      return (
        <a key={i} href={`mailto:${part}`} className={linkClass}>
          {part}
        </a>
      );
    }
    return <Fragment key={i}>{part}</Fragment>;
  });
}

export function ServicePageBody({
  page,
  hero,
  heroAlt,
  gallery,
  children,
}: {
  page: ServicePage;
  hero?: StaticImageData;
  heroAlt?: string;
  gallery?: StaticImageData[];
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
      {gallery && gallery.length > 0 ? (
        <ul className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {gallery.map((img, i) => (
            <li key={i} className="border border-line bg-surface p-1">
              <Image src={img} alt="" className="h-28 w-full object-cover sm:h-32" />
            </li>
          ))}
        </ul>
      ) : null}
      {page.contentPending ? <TodoNote /> : null}
      {children}
    </Section>
  );
}
