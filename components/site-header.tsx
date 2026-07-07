"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import logoDesktop from "@/public/logo-gallhofer-5.png";
import logoMobile from "@/public/mob_logo.png";
import { navForWorld, worldForPath } from "@/content/navigation";

export function SiteHeader() {
  const pathname = usePathname() ?? "/";
  const items = navForWorld(worldForPath(pathname));
  const [open, setOpen] = useState(false);

  return (
    <header className="border-b border-line bg-bg">
      <div className="mx-auto flex w-full max-w-5xl items-center justify-between px-4 py-4 sm:justify-center">
        <Link href="/" aria-label="Gallhofer Haustechnik – zur Startseite" onClick={() => setOpen(false)}>
          <Image src={logoDesktop} alt="Gallhofer Haustechnik" priority className="hidden h-12 w-auto sm:block" />
          <Image src={logoMobile} alt="Gallhofer Haustechnik" priority className="h-10 w-auto sm:hidden" />
        </Link>
        <button
          type="button"
          className="rounded border border-line p-2 text-text sm:hidden"
          aria-label="Menü"
          aria-expanded={open}
          aria-controls="site-nav"
          onClick={() => setOpen((v) => !v)}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            aria-hidden="true"
          >
            {open ? (
              <>
                <line x1="6" y1="6" x2="18" y2="18" />
                <line x1="6" y1="18" x2="18" y2="6" />
              </>
            ) : (
              <>
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </>
            )}
          </svg>
        </button>
      </div>
      <nav
        id="site-nav"
        aria-label="Hauptnavigation"
        className={`${open ? "block" : "hidden"} border-t border-line sm:block`}
      >
        <ul className="mx-auto flex w-full max-w-5xl flex-col px-4 py-2 sm:flex-row sm:justify-center sm:gap-6">
          {items.map((item) => {
            const active = pathname === item.href;
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  aria-current={active ? "page" : undefined}
                  className={`block py-2 text-sm ${
                    active ? "font-semibold text-brand" : "text-text hover:text-brand"
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
}
