# Gallhofer Haustechnik Website — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Die bestehende WordPress-Seite gallhofer-haustechnik.at als originalgetreue, sichere Next.js-Seite neu bauen — alle 17 Routes, Zwei-Welten-Navigation, 301-Redirects, SEO-Gerüst; fehlende Inhalte sichtbar als ⚠️-Platzhalter.

**Architecture:** Statisch gerendertes Next.js (App Router) auf Vercel. Ein zentraler Client-Header leitet die „Welt" (Splash/Privat/B2B) aus dem Pfad ab. Alle Inhalte liegen als typisierte Daten in `content/`, alle Farben/Fonts als CSS-Variablen-Tokens; Seiten sind dünne Server Components darüber.

**Tech Stack:** Next.js 15 (App Router, TypeScript), Tailwind CSS v4, next/font (self-hosted), next/image, Vitest + React Testing Library, ESLint (flat config).

**Spec:** `docs/superpowers/specs/2026-07-06-gallhofer-website-design.md`

## Global Constraints

- **Originalgetreu:** Kein Redesign. Bei visuellen Zweifeln ist die Live-Seite https://www.gallhofer-haustechnik.at maßgeblich. Leitfrage: „Würde ein Stammkunde den Unterschied bemerken?"
- **Nichts erfinden:** Fehlende Inhalte (Texte, Nummern, Öffnungszeiten, Rechtstexte) niemals formulieren → `<TodoNote>`-Platzhalter. Belegte Quellen: Spec + Live-Seite.
- **Kein Alt-Markup:** Von der Live-Seite nur Text (verbatim, absatzweise) und Bilddateien übernehmen — niemals HTML kopieren (SEO-Spam-Risiko, §7 Spec).
- **Tokens only:** Keine hartkodierten Hex-Farben in Komponenten/Seiten — nur Token-Utilities (`bg-bg`, `text-brand`, `border-line`, …) aus `app/globals.css`.
- **Server Components default;** `"use client"` nur im Header (Burger-Menü).
- **Inhalte als Daten:** Nav, Standorte, Leistungen, Metadaten in `content/*.ts` — nicht im JSX verstreut.
- **Bilder nur über `next/image`** (liefert WebP/Lazy-Load automatisch).
- **Kein Kontaktformular** (Entscheidung Auftraggeber). Kein Analytics. Kein Feature-Bloat.
- **Sichtbare Texte auf Deutsch;** `lang="de-AT"`.
- **Shell-Kommandos = Git Bash** (Bash-Tool), nicht PowerShell. Node ≥ 22 ist vorhanden.
- **Domain-Konstante:** `SITE_URL = "https://www.gallhofer-haustechnik.at"` aus `lib/site.ts` — nirgends duplizieren.
- Nach jedem Task: Tests grün + Commit.

---

### Task 1: Token-Report & Original-Assets von der Live-Seite

Erst messen, dann bauen (§4 Spec): Farben/Schrift aus dem Live-CSS extrahieren und als Report festhalten; Bild-Assets herunterladen.

**Files:**
- Create: `docs/superpowers/research/gallhofer-tokens.md`
- Create: `public/logo-gallhofer-5.png`, `public/mob_logo.png`, `public/privatkunden.jpg`, `public/industrie.jpg`
- Create: `app/icon.png`, `app/apple-icon.png`

**Interfaces:**
- Consumes: —
- Produces: Token-Report (Hex-Werte für `--brand`, `--muted`, `--line`; Font-Familie) — Task 2 setzt diese Werte in `app/globals.css` und `app/layout.tsx` ein. Bilddateien unter exakt den o. g. Pfaden — Tasks 6/7 importieren sie statisch.

- [ ] **Step 1: Live-HTML und alle CSS-Dateien laden**

```bash
mkdir -p .tmp-extract public app docs/superpowers/research
BASE="https://www.gallhofer-haustechnik.at"
curl -sL "$BASE/index.php" -o .tmp-extract/home.html

grep -Eo '(href|src)="[^"]*\.css[^"]*"' .tmp-extract/home.html \
  | sed -E 's/^(href|src)="//; s/"$//' | sort -u > .tmp-extract/css-urls.txt
cat .tmp-extract/css-urls.txt

i=0
while read -r u; do
  case "$u" in http*) full="$u" ;; /*) full="$BASE$u" ;; *) full="$BASE/$u" ;; esac
  i=$((i+1)); curl -sL "$full" -o ".tmp-extract/style-$i.css"
done < .tmp-extract/css-urls.txt
ls -la .tmp-extract/
```

Erwartet: mindestens 1 CSS-Datei (Elementor legt meist `wp-content/uploads/elementor/css/…` + Theme-CSS an). Wenn `css-urls.txt` leer ist: Styles stecken inline in `home.html` — dann Schritt 2 direkt auf `home.html` anwenden.

- [ ] **Step 2: Farb- und Font-Kandidaten extrahieren**

```bash
cat .tmp-extract/*.css .tmp-extract/home.html 2>/dev/null \
  | grep -Eo 'e-global-color[a-z0-9_-]*\s*:\s*[^;)]+|#[0-9a-fA-F]{6}\b' \
  | sort | uniq -c | sort -rn | head -40

cat .tmp-extract/*.css .tmp-extract/home.html 2>/dev/null \
  | grep -Eio 'font-family\s*:[^;}]+' | sort | uniq -c | sort -rn | head -20

# Linkfarbe gezielt suchen
grep -hEo 'a[^{]*\{[^}]*color\s*:[^;}]+' .tmp-extract/*.css 2>/dev/null | head -10
```

Auswertungsregeln (mechanisch):
- `--brand` = der am häufigsten in Links/Überschriften/`e-global-color-primary` verwendete **Nicht-Neutral-Wert** (Neutral = #fff/#f2f2f2/#000/#32373c-Bereich).
- Font = die meistreferenzierte `font-family` (Elementor-Default ist oft Roboto). Nur die erste konkrete Familie zählt, nicht Fallbacks.
- Gegenprobe Brand-Farbe: `public/logo-gallhofer-5.png` (nach Step 3) im Bildbetrachter öffnen — Logofarbe muss zum Brand-Kandidaten passen.

- [ ] **Step 3: Assets herunterladen und verifizieren**

```bash
curl -sL "$BASE/wp-content/uploads/2018/06/logo-gallhofer-5.png" -o public/logo-gallhofer-5.png
curl -sL "$BASE/wp-content/uploads/2018/06/mob_logo.png" -o public/mob_logo.png
curl -sL "$BASE/wp-content/uploads/2018/09/privatkunden.jpg" -o public/privatkunden.jpg
curl -sL "$BASE/wp-content/uploads/2018/08/industrie.jpg" -o public/industrie.jpg
curl -sL "$BASE/wp-content/uploads/2024/10/cropped-icons8-heizung-64-1-32x32.png" -o app/icon.png
curl -sL "$BASE/wp-content/uploads/2024/10/cropped-icons8-heizung-64-1-180x180.png" -o app/apple-icon.png
file public/logo-gallhofer-5.png public/mob_logo.png public/privatkunden.jpg public/industrie.jpg app/icon.png app/apple-icon.png
ls -la public app
```

Erwartet: `file` meldet für alle sechs Dateien `PNG image data` bzw. `JPEG image data` (NICHT `HTML document` — das wäre eine Fehlerseite), jede Datei > 1 KB.

- [ ] **Step 4: Token-Report schreiben**

`docs/superpowers/research/gallhofer-tokens.md` nach exakt diesem Skelett anlegen und mit den Funden aus Step 2 befüllen:

```markdown
# Token-Report Gallhofer Haustechnik (Quelle: Live-Seite, Stand 2026-07-06)

| Token     | Wert      | Beleg (Datei + Selektor/Variable)        |
| --------- | --------- | ---------------------------------------- |
| --brand   | #______   | z. B. style-2.css, e-global-color-primary |
| --muted   | #______   | … oder „Fallback #666666 (nicht belegt)"  |
| --line    | #______   | … oder „Fallback #e5e5e5 (nicht belegt)"  |
| --text    | #32373c   | home.html (verifiziert in Session)        |
| --bg      | #ffffff   | home.html (verifiziert in Session)        |
| --surface | #f2f2f2   | home.html (verifiziert in Session)        |

**Font:** ______ (Beleg: ______) → next/font-Import: `______`
**Accent-Zweitfarbe:** vorhanden? ja/nein — Wert/Beleg: ______
**Logo-Gegenprobe:** Brand-Farbe passt zum Logo? ja/nein
**Angewendete Fallbacks:** ______
```

Fallback-Regeln, falls ein Wert nicht belegbar ist (Spec §Design-Tokens):
- `--muted` → `#666666`, `--line` → `#e5e5e5` (neutrale Grauwerte, von Spec gedeckt).
- `--brand` → `#32373c` **und** Eintrag im Report unter „Angewendete Fallbacks" + später in `TODO-BETRIEB.md` („Markenfarbe nicht extrahierbar — Corporate-Farbwert nennen"). Brand-Farbe niemals raten.
- Font nicht belegbar → `Roboto` (Elementor-Default) + Fallback-Eintrag.

- [ ] **Step 5: Aufräumen und committen**

```bash
rm -rf .tmp-extract
git add public app docs/superpowers/research
git commit -m "feat: Token-Report und Original-Assets von der Live-Seite"
```

---

### Task 2: Next.js-Grundgerüst mit Tokens, Fonts, Test-Setup

Manuelles Scaffold (kein `create-next-app` — das Verzeichnis ist nicht leer). Am Ende: Build grün, Vitest lauffähig.

**Files:**
- Create: `package.json`, `tsconfig.json`, `next.config.ts`, `postcss.config.mjs`, `eslint.config.mjs`, `.gitignore`, `vitest.config.ts`, `tests/setup.ts`
- Create: `lib/site.ts`, `app/globals.css`, `app/layout.tsx`, `app/page.tsx`

**Interfaces:**
- Consumes: Token-Report aus Task 1 (`docs/superpowers/research/gallhofer-tokens.md`).
- Produces: `SITE_URL: string` aus `lib/site.ts`; Token-Utilities `bg-bg`, `text-text`, `text-muted`, `bg-surface`, `border-line`, `text-brand`, `text-brand-dark`, `font-sans`; Alias `@/*` → Repo-Root; Testkommando `npm run test` (Vitest, jsdom, RTL, next/image global gemockt, statische Bild-Importe gestubbt).

- [ ] **Step 1: package.json und Konfigdateien schreiben**

`package.json`:

```json
{
  "name": "gallhofer-haustechnik",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "eslint .",
    "test": "vitest run",
    "test:watch": "vitest"
  }
}
```

`tsconfig.json`:

```json
{
  "compilerOptions": {
    "target": "ES2017",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [{ "name": "next" }],
    "paths": { "@/*": ["./*"] },
    "types": ["vitest/globals", "@testing-library/jest-dom"]
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

`next.config.ts` (Redirects folgen in Task 11):

```ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {};

export default nextConfig;
```

`postcss.config.mjs`:

```js
export default { plugins: { "@tailwindcss/postcss": {} } };
```

`eslint.config.mjs`:

```js
import { FlatCompat } from "@eslint/eslintrc";

const compat = new FlatCompat({ baseDirectory: import.meta.dirname });

export default [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  { ignores: [".next/**", "node_modules/**", "next-env.d.ts"] },
];
```

`.gitignore`:

```
node_modules/
.next/
out/
*.tsbuildinfo
next-env.d.ts
.vercel
```

- [ ] **Step 2: Dependencies installieren**

```bash
npm install next@15 react@19 react-dom@19
npm install -D typescript @types/node @types/react @types/react-dom \
  tailwindcss @tailwindcss/postcss postcss \
  eslint eslint-config-next @eslint/eslintrc \
  vitest @vitejs/plugin-react jsdom \
  @testing-library/react @testing-library/jest-dom
```

Erwartet: beide Kommandos enden ohne `ERESOLVE`-Fehler; `package.json` enthält danach `dependencies` + `devDependencies`.

- [ ] **Step 3: Tokens, Site-Konstante, Layout, Platzhalter-Startseite**

`lib/site.ts`:

```ts
export const SITE_URL = "https://www.gallhofer-haustechnik.at";
```

`app/globals.css` — die Platzhalter `__BRAND__`, `__MUTED__`, `__LINE__` durch die Werte aus dem Token-Report (Task 1) ersetzen; die drei Neutralwerte sind bereits verifiziert:

```css
@import "tailwindcss";

:root {
  --brand: __BRAND__;
  --brand-dark: color-mix(in srgb, var(--brand) 82%, #000);
  --text: #32373c;
  --muted: __MUTED__;
  --bg: #ffffff;
  --surface: #f2f2f2;
  --line: __LINE__;
}

@theme inline {
  --color-brand: var(--brand);
  --color-brand-dark: var(--brand-dark);
  --color-text: var(--text);
  --color-muted: var(--muted);
  --color-bg: var(--bg);
  --color-surface: var(--surface);
  --color-line: var(--line);
  --font-sans: var(--font-body), system-ui, sans-serif;
}

body {
  background: var(--bg);
  color: var(--text);
}
```

Hat der Token-Report eine Accent-Zweitfarbe belegt, zusätzlich `--accent: <Wert>;` in `:root` und `--color-accent: var(--accent);` in `@theme inline` ergänzen — sonst weglassen.

`app/layout.tsx` — Font-Import gemäß Token-Report; steht dort eine andere Familie als Roboto, den `next/font/google`-Import entsprechend austauschen (gleiche Struktur, gleiche `variable`):

```tsx
import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import { SITE_URL } from "@/lib/site";
import "./globals.css";

// Schriftfamilie laut docs/superpowers/research/gallhofer-tokens.md
const body = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Gallhofer Haustechnik",
    template: "%s – Gallhofer Haustechnik",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de-AT" className={body.variable}>
      <body className="flex min-h-screen flex-col bg-bg font-sans text-text">
        {children}
      </body>
    </html>
  );
}
```

`app/page.tsx` (Platzhalter, wird in Task 7 ersetzt):

```tsx
export default function Home() {
  return <h1>Gallhofer Haustechnik</h1>;
}
```

- [ ] **Step 4: Vitest-Setup**

`vitest.config.ts`:

```ts
import path from "node:path";
import react from "@vitejs/plugin-react";
import { defineConfig, type Plugin } from "vitest/config";

// Statische Bild-Importe (import logo from "@/public/…") in Tests stubben
function stubStaticAssets(): Plugin {
  return {
    name: "stub-static-assets",
    load(id) {
      if (/\.(png|jpe?g|webp|gif|svg)$/i.test(id)) {
        return `export default { src: ${JSON.stringify("/" + path.basename(id))}, width: 100, height: 100 };`;
      }
    },
  };
}

export default defineConfig({
  plugins: [react(), stubStaticAssets()],
  resolve: { alias: { "@": path.resolve(__dirname, ".") } },
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./tests/setup.ts"],
    passWithNoTests: true,
  },
});
```

`tests/setup.ts`:

```ts
import "@testing-library/jest-dom/vitest";
import React from "react";
import { vi } from "vitest";

// next/image → einfaches <img>, damit Komponenten ohne Next-Runtime testbar sind
vi.mock("next/image", () => ({
  default: (props: Record<string, unknown> & { src: unknown; alt: string }) => {
    const { src, alt, priority: _priority, fill: _fill, ...rest } = props;
    const resolved =
      typeof src === "object" && src !== null && "src" in src
        ? (src as { src: string }).src
        : String(src);
    return React.createElement("img", { ...rest, src: resolved, alt });
  },
}));
```

- [ ] **Step 5: Build, Lint und Test-Runner verifizieren**

```bash
npm run build
npm run lint
npm run test
```

Erwartet: Build endet mit `✓ Compiled successfully` und Routen-Tabelle (Route `/`); Lint ohne Fehler; Vitest meldet „No test files found" und Exit 0 (`passWithNoTests`).

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "feat: Next.js-Grundgeruest mit Design-Tokens, Font- und Test-Setup"
```

---

### Task 3: Navigations-Datenschicht (Zwei-Welten-Logik)

**Files:**
- Create: `content/navigation.ts`
- Test: `tests/content/navigation.test.ts`

**Interfaces:**
- Consumes: —
- Produces: `type World = "splash" | "privat" | "b2b"`; `interface NavItem { label: string; href: string }`; `const mainNav: NavItem[]` (7 Einträge, beginnt mit „Willkommen"); `const privatNav: NavItem[]`; `worldForPath(pathname: string): World`; `navForWorld(world: World): NavItem[]`. Task 6 (Header) konsumiert alle vier Exporte.

- [ ] **Step 1: Privat-Menü der Live-Seite gegenprüfen**

```bash
BASE="https://www.gallhofer-haustechnik.at"
curl -sL "$BASE/privatkunden.php" | grep -Eo '<a [^>]*>[^<]{2,60}</a>' | sed -E 's/<[^>]+>//g' | sort -u | head -30
```

Die Ausgabe zeigt die Link-Labels der Privat-Welt. Weichen sie von den Spec-Labels ab (Reparaturen, Kessel & Thermentausch, Smart Home, Umwelt- & Energiemanagement, Renovierung & Neubau), gelten die **Live-Labels verbatim** — dann in Step 2 (Testdaten) und Step 4 (Implementierung) exakt diese verwenden.

- [ ] **Step 2: Failing Test schreiben**

`tests/content/navigation.test.ts`:

```ts
import { mainNav, navForWorld, privatNav, worldForPath } from "@/content/navigation";

describe("worldForPath", () => {
  it("ordnet die Pfade der richtigen Welt zu", () => {
    expect(worldForPath("/")).toBe("splash");
    expect(worldForPath("/privatkunden")).toBe("privat");
    expect(worldForPath("/privatkunden/smart-home")).toBe("privat");
    expect(worldForPath("/heizungsrechner")).toBe("privat");
    expect(worldForPath("/heizzentralen")).toBe("b2b");
    expect(worldForPath("/galerie")).toBe("b2b");
    expect(worldForPath("/impressum")).toBe("b2b");
  });
});

describe("Menüs", () => {
  it("Hauptmenü hat die 7 Original-Punkte in Original-Reihenfolge", () => {
    expect(mainNav.map((i) => i.label)).toEqual([
      "Willkommen",
      "Hausverwaltung & Industrie",
      "Heizzentralen",
      "Fernüberwachung",
      "Gebrechendienst",
      "Wartung",
      "Galerie",
    ]);
  });

  it("Privat-Menü führt Übersicht + 5 Leistungen", () => {
    expect(privatNav[0]).toEqual({ label: "Privatkunden", href: "/privatkunden" });
    expect(privatNav.map((i) => i.label)).toContain("Smart Home");
    expect(privatNav).toHaveLength(6);
  });

  it("navForWorld liefert Splash und B2B das Hauptmenü, Privat das Privat-Menü", () => {
    expect(navForWorld("splash")).toBe(mainNav);
    expect(navForWorld("b2b")).toBe(mainNav);
    expect(navForWorld("privat")).toBe(privatNav);
  });
});
```

- [ ] **Step 3: Test rot sehen**

Run: `npm run test -- tests/content/navigation.test.ts`
Erwartet: FAIL — `Cannot find module '@/content/navigation'`.

- [ ] **Step 4: Implementieren**

`content/navigation.ts`:

```ts
export type World = "splash" | "privat" | "b2b";

export interface NavItem {
  label: string;
  href: string;
}

// Reihenfolge und Wording exakt wie auf der Live-Seite (Stand 2026-07-06)
export const mainNav: NavItem[] = [
  { label: "Willkommen", href: "/" },
  { label: "Hausverwaltung & Industrie", href: "/hausverwaltung-industrie" },
  { label: "Heizzentralen", href: "/heizzentralen" },
  { label: "Fernüberwachung", href: "/fernueberwachung" },
  { label: "Gebrechendienst", href: "/gebrechendienst" },
  { label: "Wartung", href: "/wartung" },
  { label: "Galerie", href: "/galerie" },
];

export const privatNav: NavItem[] = [
  { label: "Privatkunden", href: "/privatkunden" },
  { label: "Reparaturen", href: "/privatkunden/reparaturen" },
  { label: "Kessel & Thermentausch", href: "/privatkunden/kessel-thermentausch" },
  { label: "Smart Home", href: "/privatkunden/smart-home" },
  { label: "Umwelt- & Energiemanagement", href: "/privatkunden/umwelt-energiemanagement" },
  { label: "Renovierung & Neubau", href: "/privatkunden/renovierung-neubau" },
];

export function worldForPath(pathname: string): World {
  if (pathname === "/") return "splash";
  if (pathname === "/heizungsrechner" || pathname === "/privatkunden" || pathname.startsWith("/privatkunden/")) {
    return "privat";
  }
  return "b2b";
}

export function navForWorld(world: World): NavItem[] {
  return world === "privat" ? privatNav : mainNav;
}
```

- [ ] **Step 5: Test grün sehen**

Run: `npm run test -- tests/content/navigation.test.ts`
Erwartet: PASS (3 Tests).

- [ ] **Step 6: Commit**

```bash
git add content/navigation.ts tests/content/navigation.test.ts
git commit -m "feat: Zwei-Welten-Navigationsdaten mit worldForPath"
```

---

### Task 4: Content-Datenschicht (Standorte, Metadaten, Leistungen) + Metadata-Helper

**Files:**
- Create: `content/locations.ts`, `content/pages.ts`, `content/services.ts`, `lib/meta.ts`
- Test: `tests/content/content.test.ts`

**Interfaces:**
- Consumes: `SITE_URL` (Task 2, nur indirekt via Layout-`metadataBase`).
- Produces:
  - `interface Location { name: string; postalCode: string; city: string; street: string; note?: string; phone: string; phoneHref: string }`; `const locations: Location[]` (genau 2).
  - `interface PageMeta { route: string; title: string; description: string }`; `const pagesMeta: PageMeta[]` (17); `const allRoutes: string[]`; `metaFor(route: string): PageMeta` (wirft bei unbekannter Route).
  - `interface ServiceItem { title: string; body: string }`; `const gebrechendienstLeistungen: ServiceItem[]` (5).
  - `interface ServicePage { slug: string; title: string; paragraphs: string[]; contentPending: boolean }`; `const privatUebersicht: ServicePage`; `const privatLeistungen: ServicePage[]` (5); `privatLeistungBySlug(slug: string): ServicePage | undefined`; `const b2bSeiten: ServicePage[]` (4); `b2bSeiteBySlug(slug: string): ServicePage` (wirft bei unbekanntem Slug).
  - `buildMetadata(route: string): Metadata` aus `lib/meta.ts` — jede Seite ab Task 7 nutzt das für `export const metadata`.

- [ ] **Step 1: Originaltexte der Live-Seiten sichern**

```bash
mkdir -p .tmp-extract
BASE="https://www.gallhofer-haustechnik.at"
for p in privatkunden hausverwaltung-industrie heizzentralen fernueberwachung wartung; do
  curl -sL "$BASE/$p.php" -o ".tmp-extract/$p.html"
done
ls -la .tmp-extract/
```

Danach je Datei den Fließtext lesen (Elementor-Text steht in `<p>`-Tags innerhalb `elementor-widget-text-editor`-Containern), z. B.:

```bash
for p in privatkunden hausverwaltung-industrie heizzentralen fernueberwachung wartung; do
  echo "=== $p ==="
  grep -Eo '<p[^>]*>[^<]{20,}</p>' ".tmp-extract/$p.html" | sed -E 's/<[^>]+>//g' | head -12
done
```

Übernahmeregeln (mechanisch):
- Sauberer deutscher Fließtext zum Thema → **verbatim, absatzweise** als `paragraphs`-Einträge übernehmen, `contentPending: false`.
- Leer, nur Menü-/Footer-Reste oder SEO-Spam (themenfremde Keywords/Links) → `paragraphs: []`, `contentPending: true`. Im Zweifel: pending. Kein HTML übernehmen, keine Umformulierungen.

- [ ] **Step 2: Failing Test schreiben**

`tests/content/content.test.ts`:

```ts
import { locations } from "@/content/locations";
import { allRoutes, metaFor, pagesMeta } from "@/content/pages";
import {
  b2bSeiten,
  b2bSeiteBySlug,
  gebrechendienstLeistungen,
  privatLeistungen,
  privatUebersicht,
} from "@/content/services";

const ROUTES = [
  "/",
  "/privatkunden",
  "/privatkunden/reparaturen",
  "/privatkunden/kessel-thermentausch",
  "/privatkunden/smart-home",
  "/privatkunden/umwelt-energiemanagement",
  "/privatkunden/renovierung-neubau",
  "/heizungsrechner",
  "/hausverwaltung-industrie",
  "/heizzentralen",
  "/fernueberwachung",
  "/gebrechendienst",
  "/wartung",
  "/galerie",
  "/impressum",
  "/agb",
  "/datenschutz",
];

describe("locations", () => {
  it("führt beide Standorte mit der belegten Büronummer", () => {
    expect(locations).toHaveLength(2);
    expect(locations.map((l) => l.postalCode).sort()).toEqual(["1040", "7212"]);
    for (const loc of locations) {
      expect(loc.phone).toBe("01/749 14 56");
      expect(loc.phoneHref).toBe("tel:+4317491456");
      expect(loc.street.length).toBeGreaterThan(3);
    }
  });
});

describe("pagesMeta", () => {
  it("deckt exakt die Routes aus der Spec ab", () => {
    expect(allRoutes.sort()).toEqual([...ROUTES].sort());
  });

  it("hat pro Seite eigenen Title und eigene Description", () => {
    expect(new Set(pagesMeta.map((p) => p.title)).size).toBe(pagesMeta.length);
    expect(new Set(pagesMeta.map((p) => p.description)).size).toBe(pagesMeta.length);
    for (const p of pagesMeta) {
      expect(p.description.length).toBeGreaterThanOrEqual(20);
      expect(p.description.length).toBeLessThanOrEqual(170);
    }
  });

  it("metaFor wirft bei unbekannter Route", () => {
    expect(() => metaFor("/gibts-nicht")).toThrow();
  });
});

describe("services", () => {
  it("Gebrechendienst hat die 5 belegten Leistungen", () => {
    expect(gebrechendienstLeistungen.map((s) => s.title)).toEqual([
      "Abflussverstopfung",
      "Leitungsgebrechen",
      "Leckortung",
      "Gasleitung",
      "Störungen in Heizungsanlagen",
    ]);
    for (const s of gebrechendienstLeistungen) {
      expect(s.body.length).toBeGreaterThan(20);
    }
  });

  it("jede Privat-Leistung hat eine Route", () => {
    for (const p of privatLeistungen) {
      expect(ROUTES).toContain(`/privatkunden/${p.slug}`);
    }
    expect(privatLeistungen).toHaveLength(5);
  });

  it("Seiten ohne übernommenen Text sind als pending markiert", () => {
    for (const page of [privatUebersicht, ...privatLeistungen, ...b2bSeiten]) {
      if (page.paragraphs.length === 0) {
        expect(page.contentPending).toBe(true);
      } else {
        expect(page.contentPending).toBe(false);
      }
    }
  });

  it("b2bSeiteBySlug liefert bekannte Slugs und wirft sonst", () => {
    expect(b2bSeiteBySlug("heizzentralen").title).toBe("Heizzentralen");
    expect(() => b2bSeiteBySlug("nope")).toThrow();
  });
});
```

- [ ] **Step 3: Test rot sehen**

Run: `npm run test -- tests/content/content.test.ts`
Erwartet: FAIL — `Cannot find module '@/content/locations'`.

- [ ] **Step 4: Implementieren**

`content/locations.ts` (Werte verbatim aus der Spec; vor Livegang gegenprüfen):

```ts
export interface Location {
  name: string;
  postalCode: string;
  city: string;
  street: string;
  note?: string;
  phone: string;
  phoneHref: string;
}

export const locations: Location[] = [
  {
    name: "Lager/Büro und Hauptstandort",
    postalCode: "1040",
    city: "Wien",
    street: "Viktorgasse 20",
    note: "Stiege 1, Top 2 Souterrain (im Hof rechts)",
    phone: "01/749 14 56",
    phoneHref: "tel:+4317491456",
  },
  {
    name: "Büro und Zweigstelle",
    postalCode: "7212",
    city: "Forchtenstein",
    street: "Schloßbergstraße 20",
    phone: "01/749 14 56",
    phoneHref: "tel:+4317491456",
  },
];
```

`content/pages.ts` (Descriptions rein beschreibend — keine erfundenen Claims):

```ts
export interface PageMeta {
  route: string;
  title: string;
  description: string;
}

export const pagesMeta: PageMeta[] = [
  {
    route: "/",
    title: "Wählen Sie Ihren Bereich!",
    description:
      "Gallhofer Haustechnik in Wien und Forchtenstein: Leistungen für Privatkunden sowie Hausverwaltung & Industrie. Büro: 01/749 14 56.",
  },
  {
    route: "/privatkunden",
    title: "Privatkunden",
    description:
      "Überblick über die Privatkunden-Leistungen der Gallhofer Haustechnik: Reparaturen, Kessel & Thermentausch, Smart Home, Umwelt- & Energiemanagement, Renovierung & Neubau.",
  },
  {
    route: "/privatkunden/reparaturen",
    title: "Reparaturen",
    description: "Reparaturen für Privatkunden — Gallhofer Haustechnik, Wien und Forchtenstein.",
  },
  {
    route: "/privatkunden/kessel-thermentausch",
    title: "Kessel & Thermentausch",
    description: "Kessel- und Thermentausch für Privatkunden — Gallhofer Haustechnik.",
  },
  {
    route: "/privatkunden/smart-home",
    title: "Smart Home",
    description: "Smart-Home-Leistungen für Privatkunden der Gallhofer Haustechnik.",
  },
  {
    route: "/privatkunden/umwelt-energiemanagement",
    title: "Umwelt- & Energiemanagement",
    description: "Umwelt- und Energiemanagement für Privatkunden der Gallhofer Haustechnik.",
  },
  {
    route: "/privatkunden/renovierung-neubau",
    title: "Renovierung & Neubau",
    description: "Renovierung & Neubau — Leistungen der Gallhofer Haustechnik für Privatkunden.",
  },
  {
    route: "/heizungsrechner",
    title: "Heizungsrechner",
    description: "Der Heizungsrechner der Gallhofer Haustechnik.",
  },
  {
    route: "/hausverwaltung-industrie",
    title: "Hausverwaltung & Industrie",
    description: "Leistungen der Gallhofer Haustechnik für Hausverwaltungen und Industrie.",
  },
  {
    route: "/heizzentralen",
    title: "Heizzentralen",
    description: "Heizzentralen — Leistungen der Gallhofer Haustechnik für Hausverwaltung & Industrie.",
  },
  {
    route: "/fernueberwachung",
    title: "Fernüberwachung",
    description: "Fernüberwachung — Leistungen der Gallhofer Haustechnik für Hausverwaltung und Industrie.",
  },
  {
    route: "/gebrechendienst",
    title: "Gebrechendienst",
    description:
      "Gebrechendienst der Gallhofer Haustechnik: Abflussverstopfung, Leitungsgebrechen, Leckortung, Gasleitung, Störungen in Heizungsanlagen. Büro: 01/749 14 56.",
  },
  {
    route: "/wartung",
    title: "Wartung",
    description: "Wartung — Leistungen der Gallhofer Haustechnik für Hausverwaltungen und Industriekunden.",
  },
  {
    route: "/galerie",
    title: "Galerie",
    description: "Galerie der Gallhofer Haustechnik.",
  },
  {
    route: "/impressum",
    title: "Impressum",
    description: "Impressum der Gallhofer Haustechnik.",
  },
  {
    route: "/agb",
    title: "AGB",
    description: "Allgemeine Geschäftsbedingungen der Gallhofer Haustechnik.",
  },
  {
    route: "/datenschutz",
    title: "Datenschutz",
    description: "Datenschutzerklärung der Gallhofer Haustechnik.",
  },
];

export const allRoutes = pagesMeta.map((p) => p.route);

export function metaFor(route: string): PageMeta {
  const found = pagesMeta.find((p) => p.route === route);
  if (!found) throw new Error(`Keine Metadaten für Route: ${route}`);
  return found;
}
```

`content/services.ts` — Gebrechendienst-Texte verbatim aus der Spec. Für die `paragraphs` der übrigen Seiten die in Step 1 extrahierten Live-Texte einsetzen (Übernahmeregeln aus Step 1 beachten); das Gerüst unten zeigt den Pending-Zustand:

```ts
export interface ServiceItem {
  title: string;
  body: string;
}

export interface ServicePage {
  slug: string;
  title: string;
  paragraphs: string[];
  contentPending: boolean;
}

export const gebrechendienstLeistungen: ServiceItem[] = [
  {
    title: "Abflussverstopfung",
    body: "Vom Bad- über den WC- bis zum Terrassenabfluss – Behebung mit kompaktem Spezialwerkzeug.",
  },
  {
    title: "Leitungsgebrechen",
    body: "Wasser-, Heizungs- und Abflussleitungen: Der Schaden wird inklusive Folgeschäden dokumentiert (vorher/nachher), Neben- und Folgeschäden werden mitbehoben. Auf Wunsch erfolgt die Abwicklung direkt über die Versicherung.",
  },
  {
    title: "Leckortung",
    body: "Jede Art von Leckortung im Rahmen der Gebrechenssuche.",
  },
  {
    title: "Gasleitung",
    body: "Leckagen werden fachgerecht behoben – wahlweise ohne viel Stemmarbeit mittels flüssigem Dichtmittel.",
  },
  {
    title: "Störungen in Heizungsanlagen",
    body: "Langjährige Erfahrung auch bei alten Gebäuden und Systemen sowie komplexer Heizungshydraulik.",
  },
];

// paragraphs: Originaltexte aus Task 4 Step 1 (verbatim, absatzweise).
// Nicht sauber extrahierbar → [] + contentPending: true. Niemals Texte erfinden.
export const privatUebersicht: ServicePage = {
  slug: "privatkunden",
  title: "Privatkunden",
  paragraphs: [],
  contentPending: true,
};

export const privatLeistungen: ServicePage[] = [
  { slug: "reparaturen", title: "Reparaturen", paragraphs: [], contentPending: true },
  { slug: "kessel-thermentausch", title: "Kessel & Thermentausch", paragraphs: [], contentPending: true },
  { slug: "smart-home", title: "Smart Home", paragraphs: [], contentPending: true },
  { slug: "umwelt-energiemanagement", title: "Umwelt- & Energiemanagement", paragraphs: [], contentPending: true },
  { slug: "renovierung-neubau", title: "Renovierung & Neubau", paragraphs: [], contentPending: true },
];

export const b2bSeiten: ServicePage[] = [
  { slug: "hausverwaltung-industrie", title: "Hausverwaltung & Industrie", paragraphs: [], contentPending: true },
  { slug: "heizzentralen", title: "Heizzentralen", paragraphs: [], contentPending: true },
  { slug: "fernueberwachung", title: "Fernüberwachung", paragraphs: [], contentPending: true },
  { slug: "wartung", title: "Wartung", paragraphs: [], contentPending: true },
];

export function privatLeistungBySlug(slug: string): ServicePage | undefined {
  return privatLeistungen.find((p) => p.slug === slug);
}

export function b2bSeiteBySlug(slug: string): ServicePage {
  const found = b2bSeiten.find((p) => p.slug === slug);
  if (!found) throw new Error(`Unbekannte B2B-Seite: ${slug}`);
  return found;
}
```

`lib/meta.ts`:

```ts
import type { Metadata } from "next";
import { metaFor } from "@/content/pages";

export function buildMetadata(route: string): Metadata {
  const m = metaFor(route);
  return {
    title: m.title,
    description: m.description,
    alternates: { canonical: route },
    openGraph: {
      title: m.title,
      description: m.description,
      url: route,
      siteName: "Gallhofer Haustechnik",
      images: [{ url: "/logo-gallhofer-5.png" }],
      locale: "de_AT",
      type: "website",
    },
  };
}
```

- [ ] **Step 5: Test grün sehen, aufräumen**

Run: `npm run test -- tests/content/content.test.ts`
Erwartet: PASS (8 Tests).

```bash
rm -rf .tmp-extract
```

- [ ] **Step 6: Commit**

```bash
git add content lib/meta.ts tests/content/content.test.ts
git commit -m "feat: Content-Datenschicht (Standorte, Seiten-Metadaten, Leistungen)"
```

---

### Task 5: Basis-Komponenten (TodoNote, Section, Tile, LocationCard, ServicePageBody, SiteFooter)

**Files:**
- Create: `components/todo-note.tsx`, `components/section.tsx`, `components/tile.tsx`, `components/location-card.tsx`, `components/service-page-body.tsx`, `components/site-footer.tsx`
- Test: `tests/components/base-components.test.tsx`

**Interfaces:**
- Consumes: `Location`, `locations` (Task 4); `ServicePage` (Task 4).
- Produces:
  - `TodoNote({ children }: { children?: React.ReactNode })` — Platzhalter-Box „⚠️ Inhalt folgt…".
  - `Section({ title, children }: { title?: string; children: React.ReactNode })` — `title` rendert die **einzige** `h1` der Seite.
  - `Tile({ href, title, image, alt }: { href: string; title: string; image: StaticImageData | string; alt: string })`.
  - `LocationCard({ location }: { location: Location })`.
  - `ServicePageBody({ page, children }: { page: ServicePage; children?: React.ReactNode })`.
  - `SiteFooter()` — Standorte + Rechts-Links, wird in Task 6 ins Layout eingehängt.

- [ ] **Step 1: Failing Test schreiben**

`tests/components/base-components.test.tsx`:

```tsx
import { render, screen } from "@testing-library/react";
import { LocationCard } from "@/components/location-card";
import { ServicePageBody } from "@/components/service-page-body";
import { SiteFooter } from "@/components/site-footer";
import { Tile } from "@/components/tile";
import { TodoNote } from "@/components/todo-note";
import { locations } from "@/content/locations";

describe("TodoNote", () => {
  it("markiert fehlenden Inhalt sichtbar", () => {
    render(<TodoNote>Öffnungszeiten fehlen.</TodoNote>);
    expect(screen.getByRole("note")).toHaveTextContent("Inhalt folgt");
    expect(screen.getByRole("note")).toHaveTextContent("Öffnungszeiten fehlen.");
  });
});

describe("Tile", () => {
  it("verlinkt Bild + Titel auf den Bereich", () => {
    render(<Tile href="/privatkunden" title="PRIVATKUNDEN" image="/privatkunden.jpg" alt="Privatkunden" />);
    expect(screen.getByRole("link", { name: /PRIVATKUNDEN/ })).toHaveAttribute("href", "/privatkunden");
    expect(screen.getByAltText("Privatkunden")).toBeInTheDocument();
  });
});

describe("LocationCard", () => {
  it("zeigt Adresse und klickbare Büronummer", () => {
    render(<LocationCard location={locations[0]} />);
    expect(screen.getByText(/Viktorgasse 20/)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "01/749 14 56" })).toHaveAttribute("href", "tel:+4317491456");
  });
});

describe("ServicePageBody", () => {
  it("rendert Absätze ohne TodoNote, wenn Inhalt vorhanden", () => {
    render(
      <ServicePageBody
        page={{ slug: "x", title: "Testseite", paragraphs: ["Erster Absatz."], contentPending: false }}
      />
    );
    expect(screen.getByRole("heading", { level: 1, name: "Testseite" })).toBeInTheDocument();
    expect(screen.getByText("Erster Absatz.")).toBeInTheDocument();
    expect(screen.queryByRole("note")).not.toBeInTheDocument();
  });

  it("zeigt TodoNote bei pending", () => {
    render(<ServicePageBody page={{ slug: "x", title: "Leer", paragraphs: [], contentPending: true }} />);
    expect(screen.getByRole("note")).toBeInTheDocument();
  });
});

describe("SiteFooter", () => {
  it("führt beide Standorte und die Rechts-Links", () => {
    render(<SiteFooter />);
    expect(screen.getByText(/1040 Wien/)).toBeInTheDocument();
    expect(screen.getByText(/7212 Forchtenstein/)).toBeInTheDocument();
    for (const label of ["Impressum", "AGB", "Datenschutz"]) {
      expect(screen.getByRole("link", { name: label })).toBeInTheDocument();
    }
  });
});
```

- [ ] **Step 2: Test rot sehen**

Run: `npm run test -- tests/components/base-components.test.tsx`
Erwartet: FAIL — `Cannot find module '@/components/todo-note'`.

- [ ] **Step 3: Komponenten implementieren**

`components/todo-note.tsx`:

```tsx
export function TodoNote({ children }: { children?: React.ReactNode }) {
  return (
    <aside role="note" className="border border-line bg-surface px-4 py-3 text-sm text-muted">
      <strong className="font-medium text-text">⚠️ Inhalt folgt — wird vom Betrieb geliefert.</strong>
      {children ? <div className="mt-1">{children}</div> : null}
    </aside>
  );
}
```

`components/section.tsx`:

```tsx
export function Section({ title, children }: { title?: string; children: React.ReactNode }) {
  return (
    <section className="mx-auto w-full max-w-5xl px-4 py-10">
      {title ? <h1 className="mb-6 text-2xl font-semibold text-text">{title}</h1> : null}
      {children}
    </section>
  );
}
```

`components/tile.tsx` — Label standardmäßig **unter** dem Bild (klassischer Original-Look); der Feinabgleich mit der Live-Seite passiert in Task 7:

```tsx
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
```

`components/location-card.tsx`:

```tsx
import type { Location } from "@/content/locations";

export function LocationCard({ location }: { location: Location }) {
  return (
    <address className="text-sm not-italic leading-relaxed">
      <strong className="font-medium">{location.name}:</strong>
      <br />
      {location.postalCode} {location.city}
      <br />
      {location.street}
      {location.note ? ` ${location.note}` : ""}
      <br />
      Büro:{" "}
      <a href={location.phoneHref} className="text-brand hover:text-brand-dark">
        {location.phone}
      </a>
    </address>
  );
}
```

`components/service-page-body.tsx`:

```tsx
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
```

`components/site-footer.tsx`:

```tsx
import Link from "next/link";
import { LocationCard } from "@/components/location-card";
import { locations } from "@/content/locations";

const legalLinks = [
  { label: "Impressum", href: "/impressum" },
  { label: "AGB", href: "/agb" },
  { label: "Datenschutz", href: "/datenschutz" },
];

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-line bg-surface">
      <div className="mx-auto grid w-full max-w-5xl gap-8 px-4 py-10 sm:grid-cols-2">
        {locations.map((loc) => (
          <LocationCard key={loc.name} location={loc} />
        ))}
      </div>
      <div className="border-t border-line">
        <nav
          aria-label="Rechtliches"
          className="mx-auto flex w-full max-w-5xl flex-wrap gap-x-6 gap-y-2 px-4 py-4 text-sm"
        >
          {legalLinks.map((l) => (
            <Link key={l.href} href={l.href} className="text-muted hover:text-text">
              {l.label}
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  );
}
```

- [ ] **Step 4: Test grün sehen**

Run: `npm run test -- tests/components/base-components.test.tsx`
Erwartet: PASS (7 Tests).

- [ ] **Step 5: Commit**

```bash
git add components tests/components/base-components.test.tsx
git commit -m "feat: Basis-Komponenten inkl. TodoNote-Platzhalterkonvention"
```

---

### Task 6: SiteHeader (Zwei-Welten-Menü + Burger) und Layout-Einbau

**Files:**
- Create: `components/site-header.tsx`
- Modify: `app/layout.tsx` (Header/Footer einhängen)
- Test: `tests/components/site-header.test.tsx`

**Interfaces:**
- Consumes: `navForWorld`, `worldForPath` (Task 3); `SiteFooter` (Task 5); Logos aus `public/` (Task 1).
- Produces: `SiteHeader()` (Client Component). Layout rendert ab jetzt auf jeder Seite Header + Footer.

- [ ] **Step 1: Failing Test schreiben**

`tests/components/site-header.test.tsx`:

```tsx
import { fireEvent, render, screen } from "@testing-library/react";

const nav = vi.hoisted(() => ({ path: "/" }));
vi.mock("next/navigation", () => ({ usePathname: () => nav.path }));

import { SiteHeader } from "@/components/site-header";

describe("SiteHeader", () => {
  it("zeigt auf B2B-Seiten das Hauptmenü", () => {
    nav.path = "/heizzentralen";
    render(<SiteHeader />);
    expect(screen.getByRole("link", { name: "Gebrechendienst" })).toBeInTheDocument();
    expect(screen.queryByRole("link", { name: "Smart Home" })).not.toBeInTheDocument();
  });

  it("zeigt in der Privat-Welt das Privat-Menü", () => {
    nav.path = "/privatkunden/smart-home";
    render(<SiteHeader />);
    expect(screen.getByRole("link", { name: "Smart Home" })).toBeInTheDocument();
    expect(screen.queryByRole("link", { name: "Heizzentralen" })).not.toBeInTheDocument();
  });

  it("markiert den aktiven Menüpunkt", () => {
    nav.path = "/wartung";
    render(<SiteHeader />);
    expect(screen.getByRole("link", { name: "Wartung" })).toHaveAttribute("aria-current", "page");
  });

  it("Burger-Button steuert das Menü (aria-expanded)", () => {
    nav.path = "/";
    render(<SiteHeader />);
    const btn = screen.getByRole("button", { name: "Menü" });
    expect(btn).toHaveAttribute("aria-expanded", "false");
    fireEvent.click(btn);
    expect(btn).toHaveAttribute("aria-expanded", "true");
  });
});
```

- [ ] **Step 2: Test rot sehen**

Run: `npm run test -- tests/components/site-header.test.tsx`
Erwartet: FAIL — `Cannot find module '@/components/site-header'`.

- [ ] **Step 3: Header implementieren**

`components/site-header.tsx`:

```tsx
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
      <div className="mx-auto flex w-full max-w-5xl items-center justify-between px-4 py-4">
        <Link href="/" aria-label="Gallhofer Haustechnik – zur Startseite" onClick={() => setOpen(false)}>
          <Image src={logoDesktop} alt="Gallhofer Haustechnik" priority className="hidden h-12 w-auto sm:block" />
          <Image src={logoMobile} alt="Gallhofer Haustechnik" priority className="h-10 w-auto sm:hidden" />
        </Link>
        <button
          type="button"
          className="border border-line px-3 py-2 text-sm sm:hidden"
          aria-expanded={open}
          aria-controls="site-nav"
          onClick={() => setOpen((v) => !v)}
        >
          Menü
        </button>
      </div>
      <nav
        id="site-nav"
        aria-label="Hauptnavigation"
        className={`${open ? "block" : "hidden"} border-t border-line sm:block`}
      >
        <ul className="mx-auto flex w-full max-w-5xl flex-col px-4 py-2 sm:flex-row sm:gap-6">
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
```

- [ ] **Step 4: Layout um Header/Footer erweitern**

In `app/layout.tsx` die Imports ergänzen und den `<body>`-Inhalt ersetzen — die Datei sieht danach so aus (Font-Import bleibt wie in Task 2 gesetzt):

```tsx
import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { SITE_URL } from "@/lib/site";
import "./globals.css";

// Schriftfamilie laut docs/superpowers/research/gallhofer-tokens.md
const body = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Gallhofer Haustechnik",
    template: "%s – Gallhofer Haustechnik",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de-AT" className={body.variable}>
      <body className="flex min-h-screen flex-col bg-bg font-sans text-text">
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
```

- [ ] **Step 5: Tests + Build grün sehen**

```bash
npm run test
npm run build
```

Erwartet: alle Tests PASS; Build `✓ Compiled successfully`.

- [ ] **Step 6: Commit**

```bash
git add components/site-header.tsx app/layout.tsx tests/components/site-header.test.tsx
git commit -m "feat: Zwei-Welten-Header mit Burger-Menue, Layout mit Header/Footer"
```

---

### Task 7: Splash-Startseite + 404-Seite

**Files:**
- Modify: `app/page.tsx` (Platzhalter aus Task 2 vollständig ersetzen)
- Create: `app/not-found.tsx`
- Test: `tests/pages/home.test.tsx`

**Interfaces:**
- Consumes: `Tile`, `Section`, `LocationCard` (Task 5); `locations` (Task 4); `buildMetadata` (Task 4); Kachelbilder aus `public/` (Task 1).
- Produces: fertige Startseite gemäß Spec-Aufbau (Headline → zwei Kacheln → Heizungsrechner-Link → Standort-Block).

- [ ] **Step 1: Failing Test schreiben**

`tests/pages/home.test.tsx`:

```tsx
import { render, screen } from "@testing-library/react";
import Home from "@/app/page";

describe("Startseite", () => {
  it("hat die Original-Headline als h1", () => {
    render(<Home />);
    expect(screen.getByRole("heading", { level: 1, name: "Wählen Sie Ihren Bereich!" })).toBeInTheDocument();
  });

  it("verlinkt beide Bereichs-Kacheln und den Heizungsrechner", () => {
    render(<Home />);
    expect(screen.getByRole("link", { name: /PRIVATKUNDEN/ })).toHaveAttribute("href", "/privatkunden");
    expect(screen.getByRole("link", { name: /HAUSVERWALTUNG & INDUSTRIE/ })).toHaveAttribute(
      "href",
      "/hausverwaltung-industrie"
    );
    expect(screen.getByRole("link", { name: "Heizungsrechner" })).toHaveAttribute("href", "/heizungsrechner");
  });

  it("zeigt den Standort-Block", () => {
    render(<Home />);
    expect(screen.getByText(/Viktorgasse 20/)).toBeInTheDocument();
    expect(screen.getByText(/Schloßbergstraße 20/)).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Test rot sehen**

Run: `npm run test -- tests/pages/home.test.tsx`
Erwartet: FAIL — Platzhalter-Seite hat weder Headline noch Kacheln.

- [ ] **Step 3: Startseite implementieren**

`app/page.tsx` (komplett ersetzen):

```tsx
import Link from "next/link";
import industrieBild from "@/public/industrie.jpg";
import privatkundenBild from "@/public/privatkunden.jpg";
import { LocationCard } from "@/components/location-card";
import { Section } from "@/components/section";
import { Tile } from "@/components/tile";
import { locations } from "@/content/locations";
import { buildMetadata } from "@/lib/meta";

export const metadata = buildMetadata("/");

export default function Home() {
  return (
    <>
      <Section title="Wählen Sie Ihren Bereich!">
        <div className="grid gap-6 sm:grid-cols-2">
          <Tile
            href="/privatkunden"
            title="PRIVATKUNDEN"
            image={privatkundenBild}
            alt="Privatkunden – Gallhofer Haustechnik"
          />
          <Tile
            href="/hausverwaltung-industrie"
            title="HAUSVERWALTUNG & INDUSTRIE"
            image={industrieBild}
            alt="Hausverwaltung & Industrie – Gallhofer Haustechnik"
          />
        </div>
        <p className="mt-6 text-center">
          <Link href="/heizungsrechner" className="text-brand underline hover:text-brand-dark">
            Heizungsrechner
          </Link>
        </p>
      </Section>
      <Section>
        <div className="grid gap-8 sm:grid-cols-2">
          {locations.map((loc) => (
            <LocationCard key={loc.name} location={loc} />
          ))}
        </div>
      </Section>
    </>
  );
}
```

`app/not-found.tsx`:

```tsx
import Link from "next/link";
import { Section } from "@/components/section";

export default function NotFound() {
  return (
    <Section title="Seite nicht gefunden">
      <p className="mb-4">Diese Seite existiert nicht (mehr).</p>
      <Link href="/" className="text-brand underline hover:text-brand-dark">
        Zur Startseite
      </Link>
    </Section>
  );
}
```

- [ ] **Step 4: Test grün sehen**

Run: `npm run test -- tests/pages/home.test.tsx`
Erwartet: PASS (3 Tests).

- [ ] **Step 5: Visueller Abgleich mit dem Original**

```bash
npm run dev
```

http://localhost:3000 neben https://www.gallhofer-haustechnik.at/index.php stellen und abgleichen: Logo-Größe, Menüzeile unter dem Header, Headline-Position, Kachel-Anordnung (Label über/unter dem Bild? — an Original anpassen, ggf. in `components/tile.tsx` das Label-`<span>` vor das Bild ziehen), Standort-Block, Footer. Nur angleichen, nicht verschönern. Dev-Server danach stoppen.

- [ ] **Step 6: Commit**

```bash
git add app/page.tsx app/not-found.tsx tests/pages/home.test.tsx components/tile.tsx
git commit -m "feat: Splash-Startseite originalgetreu + 404-Seite"
```

---

### Task 8: Privat-Welt (Übersicht, 5 Leistungsseiten, Heizungsrechner)

**Files:**
- Create: `app/privatkunden/page.tsx`, `app/privatkunden/[slug]/page.tsx`, `app/heizungsrechner/page.tsx`
- Test: `tests/pages/privat.test.tsx`

**Interfaces:**
- Consumes: `ServicePageBody`, `Section`, `TodoNote` (Task 5); `privatUebersicht`, `privatLeistungen`, `privatLeistungBySlug` (Task 4); `buildMetadata` (Task 4).
- Produces: Routes `/privatkunden`, `/privatkunden/<slug>` (5 statische Slugs, unbekannte → 404), `/heizungsrechner`.

- [ ] **Step 1: Failing Test schreiben**

`tests/pages/privat.test.tsx`:

```tsx
import { render, screen } from "@testing-library/react";
import PrivatkundenPage from "@/app/privatkunden/page";
import { generateStaticParams } from "@/app/privatkunden/[slug]/page";
import HeizungsrechnerPage from "@/app/heizungsrechner/page";
import { privatLeistungen } from "@/content/services";

describe("Privat-Übersicht", () => {
  it("listet alle 5 Leistungen als Links", () => {
    render(<PrivatkundenPage />);
    for (const p of privatLeistungen) {
      expect(screen.getByRole("link", { name: p.title })).toHaveAttribute(
        "href",
        `/privatkunden/${p.slug}`
      );
    }
  });
});

describe("Leistungs-Detailroute", () => {
  it("generiert exakt die 5 Slugs aus den Content-Daten", () => {
    expect(generateStaticParams().map((p) => p.slug).sort()).toEqual(
      privatLeistungen.map((p) => p.slug).sort()
    );
  });
});

describe("Heizungsrechner", () => {
  it("zeigt Titel und TodoNote (Logik ungeklärt)", () => {
    render(<HeizungsrechnerPage />);
    expect(screen.getByRole("heading", { level: 1, name: "Heizungsrechner" })).toBeInTheDocument();
    expect(screen.getByRole("note")).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Test rot sehen**

Run: `npm run test -- tests/pages/privat.test.tsx`
Erwartet: FAIL — `Cannot find module '@/app/privatkunden/page'`.

- [ ] **Step 3: Seiten implementieren**

`app/privatkunden/page.tsx`:

```tsx
import Link from "next/link";
import { ServicePageBody } from "@/components/service-page-body";
import { privatLeistungen, privatUebersicht } from "@/content/services";
import { buildMetadata } from "@/lib/meta";

export const metadata = buildMetadata("/privatkunden");

export default function PrivatkundenPage() {
  return (
    <ServicePageBody page={privatUebersicht}>
      <ul className="mt-6 grid gap-3 sm:grid-cols-2">
        {privatLeistungen.map((p) => (
          <li key={p.slug}>
            <Link
              href={`/privatkunden/${p.slug}`}
              className="block border border-line bg-surface px-4 py-3 text-brand hover:border-brand"
            >
              {p.title}
            </Link>
          </li>
        ))}
      </ul>
    </ServicePageBody>
  );
}
```

`app/privatkunden/[slug]/page.tsx` (Next 15: `params` ist ein Promise):

```tsx
import { notFound } from "next/navigation";
import { ServicePageBody } from "@/components/service-page-body";
import { privatLeistungen, privatLeistungBySlug } from "@/content/services";
import { buildMetadata } from "@/lib/meta";

export const dynamicParams = false;

export function generateStaticParams() {
  return privatLeistungen.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return buildMetadata(`/privatkunden/${slug}`);
}

export default async function PrivatLeistungPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = privatLeistungBySlug(slug);
  if (!page) notFound();
  return <ServicePageBody page={page} />;
}
```

`app/heizungsrechner/page.tsx`:

```tsx
import { Section } from "@/components/section";
import { TodoNote } from "@/components/todo-note";
import { buildMetadata } from "@/lib/meta";

export const metadata = buildMetadata("/heizungsrechner");

export default function HeizungsrechnerPage() {
  return (
    <Section title="Heizungsrechner">
      <TodoNote>
        Der bestehende Heizungsrechner wird übernommen, sobald der Betrieb die Rechenlogik geklärt hat
        (siehe TODO-BETRIEB.md).
      </TodoNote>
    </Section>
  );
}
```

- [ ] **Step 4: Tests + Build grün sehen**

```bash
npm run test -- tests/pages/privat.test.tsx
npm run build
```

Erwartet: PASS (3 Tests); Build listet `/privatkunden/[slug]` mit 5 statischen Pfaden.

- [ ] **Step 5: Commit**

```bash
git add app/privatkunden app/heizungsrechner tests/pages/privat.test.tsx
git commit -m "feat: Privat-Welt mit Uebersicht, Leistungsseiten und Heizungsrechner-Platzhalter"
```

---

### Task 9: B2B-Welt (Übersicht, Heizzentralen, Fernüberwachung, Gebrechendienst, Wartung) + Galerie

**Files:**
- Create: `app/hausverwaltung-industrie/page.tsx`, `app/heizzentralen/page.tsx`, `app/fernueberwachung/page.tsx`, `app/wartung/page.tsx`, `app/gebrechendienst/page.tsx`, `app/galerie/page.tsx`, `content/galerie.ts`
- Create (bei Erfolg der Extraktion): `public/galerie/*.jpg`
- Test: `tests/pages/b2b.test.tsx`

**Interfaces:**
- Consumes: `ServicePageBody`, `Section`, `TodoNote` (Task 5); `b2bSeiteBySlug`, `gebrechendienstLeistungen` (Task 4); `mainNav` (Task 3); `locations` (Task 4); `buildMetadata` (Task 4).
- Produces: die 6 B2B-Routes; `const galerieBilder: string[]` aus `content/galerie.ts` (Dateinamen relativ zu `public/galerie/`).

- [ ] **Step 1: Galerie-Bilder von der Live-Seite ziehen**

```bash
mkdir -p public/galerie .tmp-extract
BASE="https://www.gallhofer-haustechnik.at"
curl -sL "$BASE/galerie.php" -o .tmp-extract/galerie.html
grep -Eo 'wp-content/uploads/[^"'"'"' ]+\.(jpe?g|png)' .tmp-extract/galerie.html | sort -u > .tmp-extract/alle.txt
# Originale bevorzugen (ohne -300x200-Thumbnail-Suffix); wenn leer, alle nehmen
grep -Ev -- '-[0-9]+x[0-9]+\.' .tmp-extract/alle.txt > .tmp-extract/imgs.txt || cp .tmp-extract/alle.txt .tmp-extract/imgs.txt
wc -l .tmp-extract/imgs.txt

n=0
while read -r u; do
  n=$((n+1))
  ext="${u##*.}"
  curl -sL "$BASE/$u" -o "public/galerie/bild-$n.$ext"
done < <(head -24 .tmp-extract/imgs.txt)
ls -la public/galerie/ && file public/galerie/* | head -5
rm -rf .tmp-extract
```

Erwartet: JPEG/PNG-Dateien in `public/galerie/`. Wenn **keine** Bilder extrahierbar sind: `public/galerie/` leer lassen, `galerieBilder` bleibt `[]` (Seite zeigt dann TodoNote).

- [ ] **Step 2: Failing Test schreiben**

`tests/pages/b2b.test.tsx`:

```tsx
import { existsSync } from "node:fs";
import path from "node:path";
import { render, screen } from "@testing-library/react";
import GebrechendienstPage from "@/app/gebrechendienst/page";
import UebersichtPage from "@/app/hausverwaltung-industrie/page";
import { galerieBilder } from "@/content/galerie";
import { gebrechendienstLeistungen } from "@/content/services";

describe("Gebrechendienst", () => {
  it("führt alle 5 belegten Leistungen mit Text auf", () => {
    render(<GebrechendienstPage />);
    for (const s of gebrechendienstLeistungen) {
      expect(screen.getByText(s.title)).toBeInTheDocument();
    }
    expect(screen.getByRole("heading", { level: 1, name: "Gebrechendienst" })).toBeInTheDocument();
  });

  it("weist auf die ungeklärte Notdienst-Nummer hin (TodoNote)", () => {
    render(<GebrechendienstPage />);
    expect(screen.getByRole("note")).toHaveTextContent(/Notdienst/);
  });
});

describe("B2B-Übersicht", () => {
  it("verlinkt die weiteren B2B-Seiten", () => {
    render(<UebersichtPage />);
    for (const label of ["Heizzentralen", "Fernüberwachung", "Gebrechendienst", "Wartung", "Galerie"]) {
      expect(screen.getByRole("link", { name: label })).toBeInTheDocument();
    }
  });
});

describe("Galerie-Daten", () => {
  it("jeder Eintrag in galerieBilder existiert als Datei", () => {
    for (const file of galerieBilder) {
      expect(existsSync(path.join(process.cwd(), "public", "galerie", file))).toBe(true);
    }
  });
});
```

- [ ] **Step 3: Test rot sehen**

Run: `npm run test -- tests/pages/b2b.test.tsx`
Erwartet: FAIL — `Cannot find module '@/app/gebrechendienst/page'`.

- [ ] **Step 4: Seiten implementieren**

`content/galerie.ts` — Array mit den in Step 1 tatsächlich geladenen Dateinamen befüllen (`ls public/galerie/`); keine geladen → leer lassen:

```ts
// Dateinamen relativ zu public/galerie/ — nur tatsächlich vorhandene Dateien eintragen.
export const galerieBilder: string[] = [
  // "bild-1.jpg",
];
```

`app/gebrechendienst/page.tsx`:

```tsx
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
```

`app/hausverwaltung-industrie/page.tsx`:

```tsx
import Link from "next/link";
import { ServicePageBody } from "@/components/service-page-body";
import { mainNav } from "@/content/navigation";
import { b2bSeiteBySlug } from "@/content/services";
import { buildMetadata } from "@/lib/meta";

export const metadata = buildMetadata("/hausverwaltung-industrie");

const weitere = mainNav.filter((i) => i.href !== "/" && i.href !== "/hausverwaltung-industrie");

export default function HausverwaltungIndustriePage() {
  return (
    <ServicePageBody page={b2bSeiteBySlug("hausverwaltung-industrie")}>
      <ul className="mt-6 grid gap-3 sm:grid-cols-2">
        {weitere.map((i) => (
          <li key={i.href}>
            <Link
              href={i.href}
              className="block border border-line bg-surface px-4 py-3 text-brand hover:border-brand"
            >
              {i.label}
            </Link>
          </li>
        ))}
      </ul>
    </ServicePageBody>
  );
}
```

`app/heizzentralen/page.tsx`:

```tsx
import { ServicePageBody } from "@/components/service-page-body";
import { b2bSeiteBySlug } from "@/content/services";
import { buildMetadata } from "@/lib/meta";

export const metadata = buildMetadata("/heizzentralen");

export default function HeizzentralenPage() {
  return <ServicePageBody page={b2bSeiteBySlug("heizzentralen")} />;
}
```

`app/fernueberwachung/page.tsx`:

```tsx
import { ServicePageBody } from "@/components/service-page-body";
import { b2bSeiteBySlug } from "@/content/services";
import { buildMetadata } from "@/lib/meta";

export const metadata = buildMetadata("/fernueberwachung");

export default function FernueberwachungPage() {
  return <ServicePageBody page={b2bSeiteBySlug("fernueberwachung")} />;
}
```

`app/wartung/page.tsx`:

```tsx
import { ServicePageBody } from "@/components/service-page-body";
import { b2bSeiteBySlug } from "@/content/services";
import { buildMetadata } from "@/lib/meta";

export const metadata = buildMetadata("/wartung");

export default function WartungPage() {
  return <ServicePageBody page={b2bSeiteBySlug("wartung")} />;
}
```

`app/galerie/page.tsx`:

```tsx
import Image from "next/image";
import { Section } from "@/components/section";
import { TodoNote } from "@/components/todo-note";
import { galerieBilder } from "@/content/galerie";
import { buildMetadata } from "@/lib/meta";

export const metadata = buildMetadata("/galerie");

export default function GaleriePage() {
  return (
    <Section title="Galerie">
      {galerieBilder.length === 0 ? (
        <TodoNote>Galerie-Bilder aus dem Bestand übernehmen bzw. vom Betrieb in guter Auflösung liefern lassen.</TodoNote>
      ) : (
        <>
          <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3">
            {galerieBilder.map((file, i) => (
              <li key={file}>
                <Image
                  src={`/galerie/${file}`}
                  alt={`Galerie Gallhofer Haustechnik – Bild ${i + 1}`}
                  width={600}
                  height={400}
                  className="h-40 w-full object-cover sm:h-56"
                />
              </li>
            ))}
          </ul>
          <div className="mt-6">
            <TodoNote>Aussagekräftige Bildbeschreibungen (Alt-Texte) vom Betrieb ergänzen lassen.</TodoNote>
          </div>
        </>
      )}
    </Section>
  );
}
```

- [ ] **Step 5: Tests + Build grün sehen**

```bash
npm run test -- tests/pages/b2b.test.tsx
npm run build
```

Erwartet: PASS (4 Tests); Build listet alle B2B-Routes.

- [ ] **Step 6: Commit**

```bash
git add app/hausverwaltung-industrie app/heizzentralen app/fernueberwachung app/wartung \
  app/gebrechendienst app/galerie content/galerie.ts public/galerie tests/pages/b2b.test.tsx
git commit -m "feat: B2B-Welt und Galerie"
```

---

### Task 10: Rechtsseiten (Impressum, AGB, Datenschutz)

**Files:**
- Create: `content/legal.ts`, `app/impressum/page.tsx`, `app/agb/page.tsx`, `app/datenschutz/page.tsx`
- Test: `tests/content/legal.test.ts`

**Interfaces:**
- Consumes: `ServicePage` (Task 4); `ServicePageBody` (Task 5); `buildMetadata` (Task 4).
- Produces: `const rechtsSeiten: ServicePage[]` (3); `rechtsSeiteBySlug(slug: string): ServicePage` (wirft bei unbekanntem Slug); Routes `/impressum`, `/agb`, `/datenschutz`.

- [ ] **Step 1: Bestands-Rechtstexte der Live-Seite sichern**

```bash
mkdir -p .tmp-extract
BASE="https://www.gallhofer-haustechnik.at"
for p in impressum agb datenschutz; do
  curl -sL "$BASE/$p.php" -o ".tmp-extract/$p.html"
  echo "=== $p ==="
  grep -Eo '<p[^>]*>[^<]{20,}</p>' ".tmp-extract/$p.html" | sed -E 's/<[^>]+>//g' | head -8
done
```

Übernahmeregel: Nur wenn der Text offensichtlich ein sauberer Bestands-Rechtstext ist (Firmenname, Adresse, juristische Standardformulierungen, **kein** SEO-Spam), verbatim absatzweise übernehmen (`contentPending: false`). Sonst pending lassen. Rechtstexte niemals selbst formulieren.

- [ ] **Step 2: Failing Test schreiben**

`tests/content/legal.test.ts`:

```ts
import { rechtsSeiten, rechtsSeiteBySlug } from "@/content/legal";

describe("Rechtsseiten", () => {
  it("führt genau Impressum, AGB, Datenschutz", () => {
    expect(rechtsSeiten.map((p) => p.slug).sort()).toEqual(["agb", "datenschutz", "impressum"]);
  });

  it("Seiten ohne übernommenen Bestandstext sind pending", () => {
    for (const page of rechtsSeiten) {
      if (page.paragraphs.length === 0) {
        expect(page.contentPending).toBe(true);
      } else {
        expect(page.contentPending).toBe(false);
      }
    }
  });

  it("rechtsSeiteBySlug wirft bei unbekanntem Slug", () => {
    expect(rechtsSeiteBySlug("impressum").title).toBe("Impressum");
    expect(() => rechtsSeiteBySlug("cookie-policy")).toThrow();
  });
});
```

- [ ] **Step 3: Test rot sehen**

Run: `npm run test -- tests/content/legal.test.ts`
Erwartet: FAIL — `Cannot find module '@/content/legal'`.

- [ ] **Step 4: Implementieren**

`content/legal.ts` — `paragraphs` gemäß Step 1 befüllen oder pending lassen:

```ts
import type { ServicePage } from "@/content/services";

// Bestandstexte von der Live-Seite (Task 10 Step 1) — verbatim oder pending.
// Rechtstexte niemals formulieren; Aktualisierung ist Sache von Betrieb/Anwalt.
export const rechtsSeiten: ServicePage[] = [
  { slug: "impressum", title: "Impressum", paragraphs: [], contentPending: true },
  { slug: "agb", title: "AGB", paragraphs: [], contentPending: true },
  { slug: "datenschutz", title: "Datenschutz", paragraphs: [], contentPending: true },
];

export function rechtsSeiteBySlug(slug: string): ServicePage {
  const found = rechtsSeiten.find((p) => p.slug === slug);
  if (!found) throw new Error(`Unbekannte Rechtsseite: ${slug}`);
  return found;
}
```

`app/impressum/page.tsx`:

```tsx
import { ServicePageBody } from "@/components/service-page-body";
import { rechtsSeiteBySlug } from "@/content/legal";
import { buildMetadata } from "@/lib/meta";

export const metadata = buildMetadata("/impressum");

export default function ImpressumPage() {
  return <ServicePageBody page={rechtsSeiteBySlug("impressum")} />;
}
```

`app/agb/page.tsx`:

```tsx
import { ServicePageBody } from "@/components/service-page-body";
import { rechtsSeiteBySlug } from "@/content/legal";
import { buildMetadata } from "@/lib/meta";

export const metadata = buildMetadata("/agb");

export default function AgbPage() {
  return <ServicePageBody page={rechtsSeiteBySlug("agb")} />;
}
```

`app/datenschutz/page.tsx`:

```tsx
import { ServicePageBody } from "@/components/service-page-body";
import { rechtsSeiteBySlug } from "@/content/legal";
import { buildMetadata } from "@/lib/meta";

export const metadata = buildMetadata("/datenschutz");

export default function DatenschutzPage() {
  return <ServicePageBody page={rechtsSeiteBySlug("datenschutz")} />;
}
```

- [ ] **Step 5: Test grün sehen, aufräumen, committen**

```bash
npm run test -- tests/content/legal.test.ts
rm -rf .tmp-extract
git add content/legal.ts app/impressum app/agb app/datenschutz tests/content/legal.test.ts
git commit -m "feat: Rechtsseiten mit Bestandstext- bzw. Pending-Logik"
```

Erwartet: PASS (3 Tests), Commit erfolgreich.

---

### Task 11: 301-Redirects der alten .php-URLs

**Files:**
- Modify: `next.config.ts` (komplett ersetzen)
- Test: `tests/config/redirects.test.ts`

**Interfaces:**
- Consumes: `allRoutes` (Task 4).
- Produces: `const phpRedirects: { source: string; destination: string }[]` als benannter Export aus `next.config.ts`; laufende 301-Weiterleitungen.

- [ ] **Step 1: Failing Test schreiben**

`tests/config/redirects.test.ts`:

```ts
import { allRoutes } from "@/content/pages";
import { phpRedirects } from "@/next.config";

describe("301-Redirects", () => {
  it("deckt alle bekannten alten .php-URLs ab", () => {
    const bySource = Object.fromEntries(phpRedirects.map((r) => [r.source, r.destination]));
    expect(bySource["/index.php"]).toBe("/");
    expect(bySource["/privatkunden.php"]).toBe("/privatkunden");
    expect(bySource["/hausverwaltung-industrie.php"]).toBe("/hausverwaltung-industrie");
    expect(bySource["/heizzentralen.php"]).toBe("/heizzentralen");
    expect(bySource["/fernueberwachung.php"]).toBe("/fernueberwachung");
    expect(bySource["/gebrechendienst.php"]).toBe("/gebrechendienst");
    expect(bySource["/wartung.php"]).toBe("/wartung");
    expect(bySource["/galerie.php"]).toBe("/galerie");
    expect(bySource["/impressum.php"]).toBe("/impressum");
    expect(bySource["/agb.php"]).toBe("/agb");
    expect(bySource["/datenschutz.php"]).toBe("/datenschutz");
    expect(bySource["/heizungsrechner.php"]).toBe("/heizungsrechner");
    expect(phpRedirects).toHaveLength(12);
  });

  it("jede Source ist .php, jede Destination eine echte Route", () => {
    for (const r of phpRedirects) {
      expect(r.source.endsWith(".php")).toBe(true);
      expect(allRoutes).toContain(r.destination);
    }
  });
});
```

- [ ] **Step 2: Test rot sehen**

Run: `npm run test -- tests/config/redirects.test.ts`
Erwartet: FAIL — `phpRedirects` existiert nicht.

- [ ] **Step 3: Implementieren**

`next.config.ts` (komplett ersetzen; `statusCode: 301` exakt wie in der Spec gefordert):

```ts
import type { NextConfig } from "next";

// Alle bekannten URLs der alten WordPress-Seite → neue Routes.
// heizungsrechner.php ist unbestätigt, der Redirect aber harmlos.
export const phpRedirects: { source: string; destination: string }[] = [
  { source: "/index.php", destination: "/" },
  { source: "/privatkunden.php", destination: "/privatkunden" },
  { source: "/hausverwaltung-industrie.php", destination: "/hausverwaltung-industrie" },
  { source: "/heizzentralen.php", destination: "/heizzentralen" },
  { source: "/fernueberwachung.php", destination: "/fernueberwachung" },
  { source: "/gebrechendienst.php", destination: "/gebrechendienst" },
  { source: "/wartung.php", destination: "/wartung" },
  { source: "/galerie.php", destination: "/galerie" },
  { source: "/impressum.php", destination: "/impressum" },
  { source: "/agb.php", destination: "/agb" },
  { source: "/datenschutz.php", destination: "/datenschutz" },
  { source: "/heizungsrechner.php", destination: "/heizungsrechner" },
];

const nextConfig: NextConfig = {
  async redirects() {
    return phpRedirects.map((r) => ({ ...r, statusCode: 301 as const }));
  },
};

export default nextConfig;
```

- [ ] **Step 4: Test + Build grün sehen**

```bash
npm run test -- tests/config/redirects.test.ts
npm run build
```

Erwartet: PASS (2 Tests); Build weiterhin `✓ Compiled successfully`.

- [ ] **Step 5: Commit**

```bash
git add next.config.ts tests/config/redirects.test.ts
git commit -m "feat: 301-Redirects fuer alle alten .php-URLs"
```

---

### Task 12: SEO-Finish (Sitemap, Robots, JSON-LD Plumber)

**Files:**
- Create: `app/sitemap.ts`, `app/robots.ts`, `lib/schema.ts`, `components/json-ld.tsx`
- Modify: `app/layout.tsx` (JSON-LD einhängen)
- Test: `tests/seo/seo.test.ts`

**Interfaces:**
- Consumes: `allRoutes` (Task 4); `locations`, `Location` (Task 4); `SITE_URL` (Task 2).
- Produces: `sitemap()` und `robots()` (App-Router-Konventionen); `plumberJsonLd(loc: Location): Record<string, unknown>`; `JsonLd({ data }: { data: object })`.

- [ ] **Step 1: Failing Test schreiben**

`tests/seo/seo.test.ts`:

```ts
import robots from "@/app/robots";
import sitemap from "@/app/sitemap";
import { allRoutes } from "@/content/pages";
import { locations } from "@/content/locations";
import { SITE_URL } from "@/lib/site";
import { plumberJsonLd } from "@/lib/schema";

describe("sitemap", () => {
  it("enthält jede Route genau einmal, absolut", () => {
    const entries = sitemap();
    expect(entries).toHaveLength(allRoutes.length);
    for (const e of entries) {
      expect(e.url.startsWith(SITE_URL)).toBe(true);
    }
    expect(new Set(entries.map((e) => e.url)).size).toBe(entries.length);
  });
});

describe("robots", () => {
  it("erlaubt alles und verweist auf die Sitemap", () => {
    const r = robots();
    expect(r.sitemap).toBe(`${SITE_URL}/sitemap.xml`);
  });
});

describe("plumberJsonLd", () => {
  it("baut valide LocalBusiness-Daten je Standort", () => {
    const data = plumberJsonLd(locations[0]) as Record<string, unknown>;
    expect(data["@type"]).toBe("Plumber");
    expect(data.telephone).toBe("+43 1 749 14 56");
    const address = data.address as Record<string, unknown>;
    expect(address.postalCode).toBe("1040");
    expect(address.addressCountry).toBe("AT");
    // Geo/Öffnungszeiten bewusst nicht enthalten (⚠️ TODO Betrieb)
    expect(data).not.toHaveProperty("geo");
    expect(data).not.toHaveProperty("openingHoursSpecification");
  });
});
```

- [ ] **Step 2: Test rot sehen**

Run: `npm run test -- tests/seo/seo.test.ts`
Erwartet: FAIL — `Cannot find module '@/app/sitemap'`.

- [ ] **Step 3: Implementieren**

`app/sitemap.ts`:

```ts
import type { MetadataRoute } from "next";
import { allRoutes } from "@/content/pages";
import { SITE_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return allRoutes.map((route) => ({
    url: route === "/" ? SITE_URL : `${SITE_URL}${route}`,
    changeFrequency: "monthly",
    priority: route === "/" ? 1 : 0.7,
  }));
}
```

`app/robots.ts`:

```ts
import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
```

`lib/schema.ts`:

```ts
import type { Location } from "@/content/locations";
import { SITE_URL } from "@/lib/site";

// Geo-Koordinaten und Öffnungszeiten bewusst ausgespart — ⚠️ TODO Betrieb (siehe TODO-BETRIEB.md)
export function plumberJsonLd(loc: Location): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "Plumber",
    name: "Gallhofer Haustechnik",
    telephone: "+43 1 749 14 56",
    url: SITE_URL,
    address: {
      "@type": "PostalAddress",
      streetAddress: loc.note ? `${loc.street}, ${loc.note}` : loc.street,
      postalCode: loc.postalCode,
      addressLocality: loc.city,
      addressCountry: "AT",
    },
  };
}
```

`components/json-ld.tsx`:

```tsx
export function JsonLd({ data }: { data: object }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}
```

- [ ] **Step 4: JSON-LD ins Layout einhängen**

In `app/layout.tsx` zwei Edits:

Imports ergänzen (nach den bestehenden Component-Imports):

```tsx
import { JsonLd } from "@/components/json-ld";
import { locations } from "@/content/locations";
import { plumberJsonLd } from "@/lib/schema";
```

Im JSX direkt vor `</body>` einfügen:

```tsx
        {locations.map((loc) => (
          <JsonLd key={loc.name} data={plumberJsonLd(loc)} />
        ))}
```

- [ ] **Step 5: Tests + Build grün sehen**

```bash
npm run test
npm run build
```

Erwartet: alle Tests PASS; Build-Routenliste enthält `/sitemap.xml` und `/robots.txt`.

- [ ] **Step 6: Commit**

```bash
git add app/sitemap.ts app/robots.ts lib/schema.ts components/json-ld.tsx app/layout.tsx tests/seo/seo.test.ts
git commit -m "feat: Sitemap, Robots und JSON-LD Plumber je Standort"
```

---

### Task 13: Endabnahme (Smoke-Test aller Routes, TODO-BETRIEB.md, README)

**Files:**
- Create: `TODO-BETRIEB.md`
- Modify: `README.md` (komplett ersetzen — vorher lesen; aktueller Inhalt ist nur ein Platzhalter-Titel)

**Interfaces:**
- Consumes: das gesamte Projekt.
- Produces: verifizierter Produktionsstand + Übergabedokumente.

- [ ] **Step 1: Voller Verifikationslauf**

```bash
npm run lint
npm run test
npm run build
```

Erwartet: alles grün. Danach Produktionsserver im Hintergrund starten (`npm run start`, Bash `run_in_background`) und prüfen:

```bash
for r in / /privatkunden /privatkunden/reparaturen /privatkunden/kessel-thermentausch \
  /privatkunden/smart-home /privatkunden/umwelt-energiemanagement /privatkunden/renovierung-neubau \
  /heizungsrechner /hausverwaltung-industrie /heizzentralen /fernueberwachung /gebrechendienst \
  /wartung /galerie /impressum /agb /datenschutz /sitemap.xml /robots.txt; do
  code=$(curl -s -o /dev/null -w "%{http_code}" "http://localhost:3000$r"); echo "$code $r"
done
curl -s -o /dev/null -w "%{http_code} -> %{redirect_url}\n" "http://localhost:3000/gebrechendienst.php"
curl -s -o /dev/null -w "%{http_code} -> %{redirect_url}\n" "http://localhost:3000/index.php"
```

Erwartet: alle Routes `200`; die beiden `.php`-Checks `301 -> http://localhost:3000/gebrechendienst` bzw. `…/`. Server danach stoppen.

- [ ] **Step 1b: Lighthouse gegen den laufenden Produktionsserver**

```bash
npx --yes lighthouse http://localhost:3000 --quiet --chrome-flags="--headless" \
  --only-categories=performance,accessibility,best-practices,seo --output=json --output-path=.lighthouse.json
node -e "const r=require('./.lighthouse.json');for(const[k,v]of Object.entries(r.categories))console.log(k,Math.round(v.score*100))"
rm .lighthouse.json
```

Erwartet: alle vier Kategorien ≥ 90 („Lighthouse grün", Spec-DoD). Findet `lighthouse` kein Chrome, `CHROME_PATH` auf Edge setzen (`export CHROME_PATH="C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe"`); schlägt es umgebungsbedingt weiter fehl, als manuellen Prüfpunkt für den Auftraggeber in TODO-BETRIEB.md aufnehmen statt raten.

- [ ] **Step 2: Visueller Endabgleich mit der Live-Seite**

Startseite, eine Privat-Seite, eine B2B-Seite und Gebrechendienst neben dem Original prüfen (Desktop + schmales Fenster/Mobil): Logo, Menüzeile, Kacheln, Standort-Block, Footer. Kriterium der Spec: „klar erkennbar gleich, nur etwas sauberer." Abweichungen jetzt fixen (Token-/Spacing-Ebene, kein Redesign).

- [ ] **Step 3: TODO-BETRIEB.md schreiben**

`TODO-BETRIEB.md` (Punkte aus Spec §11 + Erkenntnisse; zutreffende Fallbacks aus dem Token-Report ergänzen):

```markdown
# Offene Punkte — bitte vom Betrieb liefern/klären

Ohne diese Angaben bleiben die betroffenen Stellen als „⚠️ Inhalt folgt" markiert. Nichts davon wurde erfunden.

- [ ] Logo als **Vektor/SVG**, Kachel- und Galeriebilder in guter Auflösung.
- [ ] Exakte **Farbwerte/Schrift**, falls Corporate-Vorgabe existiert (aktuell: von der Live-Seite abgenommen, siehe docs/superpowers/research/gallhofer-tokens.md).
- [ ] **Telefonnummer je Standort** — aktuell beide 01/749 14 56 — und evtl. separate **Notdienst-Nummer**; gibt es 24h-Notdienst?
- [ ] **Öffnungszeiten** beider Standorte (auch für Google/JSON-LD).
- [ ] Aktuelle **Impressum-/AGB-/Datenschutz-Texte** bzw. Freigabe, den Bestand zu übernehmen.
- [ ] Was soll der **Heizungsrechner** rechnen? (Logik der alten Seite klären)
- [ ] Detailtexte für dünne Leistungsseiten (Privat + B2B, siehe ⚠️-Boxen auf der Seite).
- [ ] **Hosting-/DNS-Zugänge** für den Livegang — alte Zugänge als kompromittiert behandeln und neu setzen.
- [ ] Hinweis: Auf der alten Seite hängt ein Banner „Betriebsurlaub Winter 2025" — soll so etwas auf der neuen Seite pflegbar sein?
- [ ] Nach Livegang: **Google Search Console** auf Security Issues prüfen und ggf. Neubewertung anfordern.
```

- [ ] **Step 4: README.md ersetzen**

Bestehende `README.md` zuerst lesen (enthält nur einen Platzhalter-Titel), dann komplett ersetzen:

```markdown
# Gallhofer Haustechnik — Website

Originalgetreuer Neubau von gallhofer-haustechnik.at als Next.js-Seite (Ablöse des gehackten WordPress).
Spec: docs/superpowers/specs/2026-07-06-gallhofer-website-design.md · Offene Inhalte: TODO-BETRIEB.md

## Kommandos

- `npm run dev` — Entwicklungsserver (http://localhost:3000)
- `npm run build` / `npm run start` — Produktions-Build/-Server
- `npm run lint` — ESLint
- `npm run test` — Vitest

## Struktur

- `app/` — Routes (App Router), `sitemap.ts`, `robots.ts`
- `components/` — Header (Zwei-Welten-Menü), Footer, Kacheln, ⚠️-TodoNote …
- `content/` — alle Inhalte als typisierte Daten (Navigation, Standorte, Leistungen, Metadaten)
- `lib/` — `site.ts` (Domain), `meta.ts` (Metadata-Helper), `schema.ts` (JSON-LD)
- `public/` — Original-Assets (Logos, Kachel-/Galeriebilder)
- `docs/superpowers/research/gallhofer-tokens.md` — Herkunft der Design-Tokens

## Inhalte pflegen

Texte/Nummern ausschließlich in `content/*.ts` ändern — nie direkt im JSX. Seiten mit
`contentPending: true` zeigen automatisch die ⚠️-Box, bis echter Text eingetragen ist.

## Deployment (Vercel)

1. Repo bei Vercel importieren (Framework: Next.js, keine Sonderkonfiguration nötig).
2. Domain gallhofer-haustechnik.at aufschalten — DNS-Zugänge siehe TODO-BETRIEB.md (neu setzen!).
3. Nach Livegang: Google Search Console prüfen (Security Issues, Sitemap einreichen).
```

- [ ] **Step 5: Finaler Commit**

```bash
git add TODO-BETRIEB.md README.md
git commit -m "docs: Uebergabedokumente (TODO-Betrieb, README) nach Endabnahme"
```

---

## Definition of Done (aus der Spec)

- [ ] Neben der Live-Seite gestellt: klar erkennbar gleich, nur etwas sauberer.
- [ ] Alle 17 Routes vorhanden und mobil sauber; `npm run lint`, `npm run test`, `npm run build` grün; Lighthouse ≥ 90 in allen Kategorien.
- [ ] 301-Redirects aller alten `.php`-URLs verifiziert.
- [ ] Pro Seite eigener Title + Description; Sitemap/Robots/JSON-LD vorhanden.
- [ ] Kein erfundener Inhalt — alles Fehlende sichtbar als ⚠️ markiert und in TODO-BETRIEB.md gelistet.






