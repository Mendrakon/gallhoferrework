# Design: Gallhofer Haustechnik — Website-Neubau (originalgetreu)

**Datum:** 2026-07-06
**Status:** Vom Auftraggeber freigegeben
**Grundlage:** `Gallhofer-Rework.md` (Arbeitsanweisung), Live-Referenz https://www.gallhofer-haustechnik.at/index.php

## Ziel

Die bestehende WordPress-Seite als Next.js-Seite so ähnlich wie möglich nachbauen — gleiches Aussehen, gleicher Aufbau, nur dezent moderner und sicher. Kein Redesign. Leitfrage bei jeder Entscheidung: *Würde ein Stammkunde den Unterschied bemerken?* Wenn ja → zu viel. Unsichtbares (Security, SEO, Performance) darf besser werden.

## Beschlossener Umfang (dieser Durchgang)

- **Alle Routes aus §5 der Arbeitsanweisung als echte Seiten** mit korrekter Architektur: Zwei-Welten-Navigation, Content als typisierte Daten, Design-Tokens, 301-Redirects, SEO-Gerüst. Deploy-fähig.
- Echte Inhalte, wo belegt (Nav, Headline, Standorte, Gebrechendienst); sonst klar markierte `⚠️`-Platzhalter.
- **Kontaktformular: weggelassen** (Entscheidung Auftraggeber). Nur Telefon/Adressen wie im Original. Kann später dezent ergänzt werden.

## Stack & Grundsatzentscheidungen

- **Next.js 14+** (App Router, TypeScript), **Tailwind CSS v4** (CSS-Variablen-nativ via `@theme` — passt exakt zur Vorgabe „Tokens nur über CSS-Variablen"), self-hosted Fonts via `next/font`, Bilder via `next/image`, Hosting **Vercel**.
- **Standard-Next auf Vercel** (Seiten statisch gerendert), **kein** `output: 'export'` — sonst funktionieren 301-Redirects und Bildoptimierung nicht sauber.
- Kein WordPress, kein PHP, keine Plugins. Keine Alt-Markup-Übernahme (SEO-Spam-Risiko) — nur saubere Bild-/Logodateien.

## Projektstruktur

```
app/                 # alle Routes (siehe unten), sitemap.ts, robots.ts, globals.css
components/          # site-header, site-footer, tile, section, todo-note, json-ld
content/             # typisierte Daten: navigation, locations, services, site-info
public/              # Logo (Desktop/Mobil), Kachelbilder (→ WebP), Favicon
next.config.js       # 301-Redirects aller alten .php-URLs
```

### Routes (aus §5, unverändert)

```
/                          Splash „Wählen Sie Ihren Bereich!"   ← index.php
/privatkunden              Übersicht Privat                      ← privatkunden.php
/privatkunden/reparaturen
/privatkunden/kessel-thermentausch
/privatkunden/smart-home
/privatkunden/umwelt-energiemanagement
/privatkunden/renovierung-neubau
/heizungsrechner           (Logik ⚠️ TODO — Seite mit Platzhalter)
/hausverwaltung-industrie  Übersicht B2B                         ← hausverwaltung-industrie.php
/heizzentralen                                                   ← heizzentralen.php
/fernueberwachung                                                ← fernueberwachung.php
/gebrechendienst           Notdienst                             ← gebrechendienst.php
/wartung                                                         ← wartung.php
/galerie                                                         ← galerie.php
/impressum                                                       ← impressum.php
/agb                                                             ← agb.php
/datenschutz                                                     ← datenschutz.php
```

## Zwei-Welten-Navigation

Ein zentraler `<SiteHeader>` (Client Component) leitet die „Welt" aus dem Pfad ab (`usePathname`):

- **Neutral** (`/`): Logo + reduzierte Navigation wie im Original-Splash.
- **Privat** (`/privatkunden/*`, `/heizungsrechner`): Menü *Reparaturen · Kessel & Thermentausch · Smart Home · Umwelt- & Energiemanagement · Renovierung & Neubau*.
- **B2B** (alle übrigen Leistungsseiten): Menü *Willkommen · Hausverwaltung & Industrie · Heizzentralen · Fernüberwachung · Gebrechendienst · Wartung · Galerie*.

Mobil: Burger-Menü. Das Zwei-Welten-Prinzip wird **nicht umgebaut**, nur sauber und mobiltauglich umgesetzt. Menü-Zuordnung und Labels liegen als Daten in `content/navigation.ts`.

Rechtsseiten (Impressum/AGB/Datenschutz) erhalten die B2B-/Hauptnavigation, erreichbar wie im Original über den Footer.

## Inhalte & Platzhalter-Strategie („nichts erfinden")

**Echt eingepflegt (belegt aus Original bzw. Arbeitsanweisung §6):**
- Nav-Menüs und Headline **„Wählen Sie Ihren Bereich!"**
- Standort-Block: 1040 Wien, Viktorgasse 20 Stiege 1, Top 2 Souterrain (im Hof rechts) · 7212 Forchtenstein, Schloßbergstraße 20 · Büro: 01/749 14 56 (beide Standorte, vor Livegang gegenprüfen)
- Die 5 Gebrechendienst-Leistungen (Abflussverstopfung, Leitungsgebrechen, Leckortung, Gasleitung, Störungen in Heizungsanlagen) mit den Texten aus §6.

**Assets von der Live-Seite** (verifiziert vorhanden): `logo-gallhofer-5.png`, `mob_logo.png`, `privatkunden.jpg`, `industrie.jpg`, Favicon `cropped-icons8-heizung-64-1` (32/180/192 px). Re-optimiert als WebP, optisch identisch. Hinweis: Auf der Live-Seite hängt aktuell ein Banner `betriebsurlaub-winter-2025.jpg` — wird **nicht** übernommen (saisonal), aber dem Betrieb gemeldet.

**Platzhalter (`<TodoNote>`-Komponente, sichtbar markiert „⚠️ Inhalt vom Betrieb"):**
- Detailtexte aller Privatkunden-Leistungsseiten
- Heizzentralen, Fernüberwachung, Wartung, Hausverwaltung & Industrie (sofern Live-Texte beim Bauen nicht sauber extrahierbar sind — extrahierbare Originaltexte werden übernommen)
- Galerie (Bilder aus Original-Galerie ziehen, sonst Platzhalter)
- Impressum, AGB, Datenschutz (Rechtstexte niemals erfinden)
- Öffnungszeiten, separate Notdienst-Nummer, Heizungsrechner-Logik

## Design-Tokens

CSS-Variablen in `globals.css`, gemappt ins Tailwind-Theme. **Aus der Live-Seite verifiziert:** Weiß `#ffffff`, helle Fläche `#f2f2f2`, dunkler Text `#32373c`, Schwarz `#000000`. Die im HTML gefundenen Buntwerte (`#ff6900`, `#0693e3` …) sind Gutenberg-Standardpalette, **keine Markenfarben** — nicht verwenden.

```css
:root {
  --brand:      /* ⚠️ beim Bauen aus Logo + Live-Theme-CSS feststecken */;
  --brand-dark: /* abgeleitet von --brand */;
  --text:       #32373c;
  --muted:      /* aus Live-CSS ableiten, sonst neutraler Grauwert */;
  --bg:         #ffffff;
  --surface:    #f2f2f2;
  --line:       /* aus Live-CSS ableiten */;
}
```

- **Schrift:** aus dem Live-Theme-CSS auslesen (Elementor-Variablen wie `--h2_typography-font-family`); die gleiche oder nächstliegende freie Schrift self-hosted via `next/font`. Keine neue Display-Schrift.
- Erster Implementierungsschritt ist die **Token-Extraktion** (Theme-CSS der Live-Seite laden, Farben/Fonts feststecken). Erst wenn das steht, wird gebaut (§4 der Arbeitsanweisung).
- Dezente Politur erlaubt: Weißraum, Zeilenhöhe, sanfter Hover/Zoom auf Kacheln. Border-Radius/Schatten nüchtern wie im Original.

## Redirects, SEO, Security

- **301-Redirects** in `next.config.js` von jeder alten `.php`-URL auf die neue Route, inkl. `/index.php` → `/`.
- **Pro Seite** eigener `title` + `meta description` (behebt den Hauptfehler „Wählen Sie Ihren Bereich!" überall). `sitemap.xml` + `robots.txt` über App-Router-Konventionen. Genau eine `h1` pro Seite, Alt-Texte für alle Bilder.
- **JSON-LD `Plumber`** je Standort (Adresse, Telefon; Geo/Öffnungszeiten als ⚠️ TODO ausgespart).
- Open-Graph: Bild = Logo, `og:title`/`og:url` pro Seite befüllt.
- Nach Livegang: Google Search Console auf Security Issues prüfen (Betreiber-Aufgabe, im TODO-Block dokumentiert).

## Nicht in diesem Durchgang

- Kontaktformular (Entscheidung Auftraggeber: nur Telefon/Adressen)
- Heizungsrechner-Logik (⚠️ TODO Betrieb)
- Echte Rechtstexte, Öffnungszeiten, Notdienst-Nummern (⚠️ TODO Betrieb)
- Analytics (nur auf Wunsch)
- Jegliches Redesign, Feature-Bloat (Shop, Chat, Cookie-Wände)

## Definition of Done (aus §13)

- Seite sieht neben der aktuellen gestellt klar erkennbar gleich aus, nur etwas sauberer.
- Alle Routes vorhanden, mobil sauber, Lighthouse grün.
- 301-Redirects von allen alten `.php`-URLs.
- Kein WordPress/PHP; pro Seite eigene Metadaten.
- Alle ⚠️ TODO befüllt oder klar als Platzhalter markiert — keine erfundenen Inhalte.
