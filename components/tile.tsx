import Image, { type StaticImageData } from "next/image";
import Link from "next/link";

export function Tile({
  href,
  title,
  image,
  alt,
}: {
  href: string;
  title: string;
  image: StaticImageData | string;
  alt: string;
}) {
  return (
    <Link href={href} className="group block border border-line bg-surface">
      <span className="block overflow-hidden">
        <Image
          src={image}
          alt={alt}
          className="h-56 w-full object-cover transition-transform duration-300 group-hover:scale-[1.03] sm:h-72"
        />
      </span>
      <span className="block px-4 py-3 text-center text-lg font-semibold tracking-wide text-brand group-hover:text-brand-dark">
        {title}
      </span>
    </Link>
  );
}
