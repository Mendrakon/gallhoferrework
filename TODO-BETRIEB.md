# Offene Punkte — bitte vom Betrieb liefern/klären

Ohne diese Angaben bleiben die betroffenen Stellen als „⚠️ Inhalt folgt" markiert. Nichts davon wurde erfunden.

## Sicherheit / Hack (wichtig — bitte zuerst lesen)

- [ ] **Die alte WordPress-Seite ist kompromittiert.** Beim Übernehmen der Originaltexte wurden auf mehreren Seiten versteckte SEO-Spam-Divs gefunden (Pharma-/Viagra-/Steroid-Links), teils per `opacity:0`, teils per `position:absolute` und Mini-Dimensionierung (wenige Pixel breit/hoch) unsichtbar gemacht — betroffen: `privatkunden.php`, `reparaturen`, `umwelt-energiemanagement`, `renovierung-neubau` und `datenschutz.php`. Diese Funde wurden strukturell verifiziert (Tag-Bilanz-Audit, Keyword-Scan, zweiter unabhängiger Fetch) und bei der Textübernahme sauber ausgeschlossen — **nichts davon ist in der neuen Seite enthalten.**
- [ ] Nach Livegang: **Google Search Console** auf Security Issues prüfen und ggf. eine Neubewertung („Review") anfordern.
- [ ] **Alte Hosting-/DNS-/Mail-Zugänge als kompromittiert behandeln** und komplett neu setzen (neue Passwörter, idealerweise neuer Hoster) — sie liefen auf einer nachweislich gehackten Installation.

## Rechtstexte & Stammdaten — bitte klären

- [ ] **Adress-Widerspruch Forchtenstein:** Das Impressum nennt „Schloßbergstraße 20", die Datenschutzerklärung nennt „Talgasse 23" — beide verbatim aus der Alt-Seite übernommen (kein Extraktionsfehler, ein echter Widerspruch im Bestand). Bitte die korrekte Adresse klären — betrifft Impressum, Datenschutz und die Standort-Daten (`content/locations.ts`, inkl. JSON-LD).
- [ ] **AGB — doppelte Abschnittsnummer:** Im Originaltext kommt „10." zweimal hintereinander vor („10. Hinweis auf Beschränkung des Leistungsumfanges" / „10. Behelfsmäßige Instandsetzung"), danach geht es mit „11." weiter. Verbatim erhalten, da Rechtstexte nicht eigenmächtig umformuliert/neu nummeriert werden. Bitte prüfen und ggf. neu nummerieren lassen.
- [ ] **AGB — verwaiste Domain:** Punkt 1.2 verweist auf die Homepage „www.haustechnik-gallhofer.at" — diese Domain ist nicht erreichbar (NXDOMAIN, geprüft). Die tatsächliche Domain lautet `gallhofer-haustechnik.at` (umgekehrte Wortstellung). Bitte die korrekte Domain bestätigen, damit der AGB-Verweis korrigiert werden kann.
- [ ] **Impressum-Zusatzdaten:** Das Impressum nennt Bürozeiten (Mo–Do 8–12 & 13–16 Uhr, Fr 8–12 Uhr) und Mobilnummern einzelner Mitarbeiter (Geschäftsführer, Inhaber, Sekretariat, Buchhaltung), die bislang nicht in den strukturierten Standort-Daten/JSON-LD stehen. Bitte bestätigen, ob und wie diese auf der neuen Seite bzw. als Kontaktdaten erscheinen sollen.
- [ ] **Freigabe der Rechtstexte:** Bestätigen, dass der bestehende Impressum-/AGB-/Datenschutz-Text unverändert übernommen werden darf — oder aktualisierte Fassung liefern. Rechtstexte wurden bewusst nicht neu formuliert oder korrigiert.
- [ ] **Datenschutz — Über-Deklaration:** Der übernommene Datenschutztext beschreibt ein Kontaktformular, einen Newsletter und Cookies, die die neue (statische) Seite nicht verwendet. Bewusst verbatim übernommen (Rechtstexte werden nicht selbst umformuliert) — bitte vom Anwalt/Betrieb auf den tatsächlichen Umfang der neuen Seite kürzen lassen.

## Navigation / Wording

- [ ] **Label „Umwelt- & Energiemanagement" bestätigen.** Die Alt-Seite ist in sich widersprüchlich: Die Navigation zeigt „Umwelt – & Energiemanagement" (mit Gedankenstrich), der Teaser-Text zeigt „UMWELT & ENERGIEMANAGEMENT" (ohne Bindestrich). Übernommen wurde die Schreibweise aus dem Auftraggeber-Dokument (`Gallhofer-Rework.md`): „Umwelt- & Energiemanagement". Bitte Wunsch-Schreibweise bestätigen.

## Inhalte, die noch fehlen

- [ ] Logo als **Vektor/SVG**, Kachel- und Galeriebilder in guter Auflösung (aktuell von der Live-Seite übernommene JPEG/PNG-Dateien).
- [ ] **Galerie:** aussagekräftige Bildbeschreibungen (Alt-Texte) statt der aktuellen technischen Platzhalter „Bild 1", „Bild 2" … ; ggf. Bilder in höherer Auflösung.
- [ ] Exakte **Farbwerte/Schrift**, falls eine Corporate-Vorgabe existiert. Aktuell verwendet (von der Live-Seite abgenommen, siehe `docs/superpowers/research/gallhofer-tokens.md`): Marke Blau `#0000fd`, Akzent-Rot `#e2001a`, Schrift PT Sans.
- [ ] **Telefonnummer je Standort** — aktuell beide Standorte 01/749 14 56 — und ob es eine separate **Notdienst-Nummer** bzw. 24h-Verfügbarkeit gibt (aktuell nur die Büro-Nummer erreichbar).
- [ ] **Öffnungszeiten** beider Standorte (auch für Google/JSON-LD).
- [ ] Was soll der **Heizungsrechner** rechnen? Die Rechenlogik der alten Seite ist ungeklärt — die neue Seite zeigt bewusst nur einen Platzhalter statt erfundener Logik.
- [ ] **Detailtexte für dünne Leistungsseiten:** Die Privatkunden-Übersicht und „Hausverwaltung & Industrie" zeigen aktuell die ⚠️-Box, weil der Originaltext dort keine sauber extrahierbaren Inhalte enthielt (bei der Privatkunden-Übersicht stand dort ausschließlich ein versteckter Spam-Link, siehe Sicherheitsabschnitt oben).

## Vor Livegang prüfen

- [ ] **Lighthouse:** Bei der Abnahme lokal gegen den Produktions-Build gemessen — Performance 98, Accessibility 95, Best Practices 100, SEO 100 (alle vier Kategorien ≥ 90, Ziel erreicht). Bitte vor dem eigentlichen Livegang zusätzlich in der Vercel-Preview gegenprüfen, da die reale Hosting-Umgebung/CDN von der lokalen Messung abweichen kann.
- [ ] Hinweis: Auf der alten Seite hängt ein Banner „Betriebsurlaub Winter 2025" — soll so etwas auf der neuen Seite pflegbar sein (z. B. als Eintrag in `content/`)?
- [ ] **Kontaktformular** wurde bewusst weggelassen (nur Telefon/Adressen wie im Original) — auf Wunsch später dezent nachrüstbar.
