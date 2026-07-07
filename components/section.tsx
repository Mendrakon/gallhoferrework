import Image, { type StaticImageData } from "next/image";

export function Section({
  title,
  hero,
  heroAlt,
  children,
}: {
  title?: string;
  hero?: StaticImageData;
  heroAlt?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mx-auto w-full max-w-5xl px-4 py-10">
      {hero ? (
        <Image
          src={hero}
          alt={heroAlt ?? ""}
          sizes="(max-width: 1024px) 100vw, 1024px"
          priority
          className="mb-6 h-auto w-full rounded"
        />
      ) : null}
      {title ? <h1 className="mb-6 text-2xl font-semibold text-text">{title}</h1> : null}
      {children}
    </section>
  );
}
