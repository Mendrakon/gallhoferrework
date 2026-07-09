import Image, { type StaticImageData } from "next/image";
import Link from "next/link";

export function Tile({
  href,
  title,
  image,
  alt,
  labelPosition = "above",
}: {
  href: string;
  title: string;
  image: StaticImageData;
  alt: string;
  labelPosition?: "above" | "below";
}) {
  const label = (
    <span className="block px-4 py-3 text-center text-lg font-semibold tracking-wide text-brand group-hover:text-brand-dark">
      {title}
    </span>
  );
  const picture = (
    <span className="block overflow-hidden">
      <Image
        src={image}
        alt={alt}
        className="h-56 w-full object-cover transition-transform duration-300 group-hover:scale-[1.03] sm:h-72"
      />
    </span>
  );
  return (
    // Splash (index.php): Label über dem Bild. Leistungs-Übersichten: Label unter dem Bild.
    <Link href={href} className="group block border border-line bg-surface">
      {labelPosition === "above" ? (
        <>
          {label}
          {picture}
        </>
      ) : (
        <>
          {picture}
          {label}
        </>
      )}
    </Link>
  );
}
