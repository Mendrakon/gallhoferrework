"use client";

import Image, { type StaticImageData } from "next/image";
import { useCallback, useEffect, useState } from "react";

function Chevron({ dir }: { dir: "left" | "right" }) {
  return (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polyline points={dir === "left" ? "15 6 9 12 15 18" : "9 6 15 12 9 18"} />
    </svg>
  );
}

export function Gallery({ images, altPrefix }: { images: StaticImageData[]; altPrefix: string }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const isOpen = openIndex !== null;

  const close = useCallback(() => setOpenIndex(null), []);
  const step = useCallback(
    (delta: number) =>
      setOpenIndex((i) => (i === null ? i : (i + delta + images.length) % images.length)),
    [images.length]
  );

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      else if (e.key === "ArrowRight") step(1);
      else if (e.key === "ArrowLeft") step(-1);
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [isOpen, close, step]);

  return (
    <>
      <ul className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
        {images.map((img, i) => (
          <li key={i}>
            <button
              type="button"
              onClick={() => setOpenIndex(i)}
              aria-label={`${altPrefix} – Bild ${i + 1} vergrößern`}
              className="block w-full cursor-zoom-in border border-line bg-surface p-1 transition hover:border-brand"
            >
              <Image src={img} alt="" className="h-28 w-full object-cover sm:h-32" />
            </button>
          </li>
        ))}
      </ul>

      {isOpen ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`${altPrefix} – Großansicht`}
          onClick={close}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
        >
          <button
            type="button"
            onClick={close}
            aria-label="Schließen"
            className="absolute right-3 top-3 rounded p-2 text-white/80 hover:text-white"
          >
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
              <line x1="6" y1="6" x2="18" y2="18" />
              <line x1="6" y1="18" x2="18" y2="6" />
            </svg>
          </button>

          {images.length > 1 ? (
            <>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  step(-1);
                }}
                aria-label="Vorheriges Bild"
                className="absolute left-3 top-1/2 -translate-y-1/2 rounded p-2 text-white/80 hover:text-white"
              >
                <Chevron dir="left" />
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  step(1);
                }}
                aria-label="Nächstes Bild"
                className="absolute right-3 top-1/2 -translate-y-1/2 rounded p-2 text-white/80 hover:text-white"
              >
                <Chevron dir="right" />
              </button>
            </>
          ) : null}

          <Image
            src={images[openIndex]}
            alt={`${altPrefix} – Bild ${openIndex + 1}`}
            onClick={(e) => e.stopPropagation()}
            sizes="90vw"
            className="h-auto max-h-[85vh] w-auto max-w-[90vw] object-contain"
          />
        </div>
      ) : null}
    </>
  );
}
