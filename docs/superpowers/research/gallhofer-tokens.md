# Token-Report Gallhofer Haustechnik (Quelle: Live-Seite, Stand 2026-07-06)

| Token     | Wert      | Beleg (Datei + Selektor/Variable)        |
| --------- | --------- | ---------------------------------------- |
| --brand   | #0000fd   | style-3.css (= `wp-content/uploads/fusion-styles/a7123da46abd4db34b5d70512e8db76d.min.css`, das kompilierte Avada/Fusion-Theme-CSS), Variablen `--link_color:#0000fd` (Standard-Linkfarbe) und `--h3_typography-color:#0000fd`. Auf home.html real gerendert: 5× als `<h3>` (Bannertext, Standort-Überschriften), 0 Vorkommen von `<h1>`/`<h4>` (den beiden Ebenen, die stattdessen Rot nutzen). Logo-Gegenprobe bestätigt Blau als dominante Farbe (siehe unten). |
| --muted   | #747474   | style-3.css, wiederholt als Text-/Sekundärfarbe (`color:#747474` u. a. bei `.timeline-title`, Listen-Icon-Text, 13px-Formular-Begleittext); entspricht zugleich Avada-Systemfarbe „awb-color-6" (`.has-awb-color-6-color{color:rgba(116,116,116,1)}`). |
| --line    | #e5e5e5   | style-3.css, Variablen `--header_border_color:#e5e5e5` und `--header_top_first_border_color:#e5e5e5` (Rahmenfarbe der Kopfzeile — häufigstes sichtbares Trennlinien-Element der Seite). |
| --text    | #32373c   | home.html (verifiziert in Session)        |
| --bg      | #ffffff   | home.html (verifiziert in Session)        |
| --surface | #f2f2f2   | home.html (verifiziert in Session)        |

**Font:** PT Sans (Beleg: style-3.css, `--body_typography-font-family:"PT Sans"`; dieselbe Variable versorgt auch Button- und Footer-Überschriften-Typografie) → next/font-Import: `PT_Sans`
**Accent-Zweitfarbe:** vorhanden? ja — Wert `#e2001a` — Beleg: style-3.css, `--primary_color:#e2001a` (Avada-Theme-Option „Primary Color"), außerdem `--link_hover_color`, `--h1_typography-color`, `--h4_typography-color`, `--menu_hover_first_color`. Im Logo als Nebenfarbe sichtbar (Buchstabe „S" im HSG-Signet, eine der drei Parallelogramm-Flächen).
**Logo-Gegenprobe:** Brand-Farbe passt zum Logo? ja — `public/logo-gallhofer-5.png` und `public/mob_logo.png` zeigen den Schriftzug „Heizung - Sanitär - Gallhofer" vollständig in Blau; Rot (`#e2001a`) kommt im Logo nur als kleine Akzentfläche vor, nicht im Schriftzug.
**Angewendete Fallbacks:** Keine — alle sechs Tokens sind aus dem Live-CSS/HTML belegt, kein Fallback-Grauwert nötig. Anmerkung (kein Fallback, sondern eine dokumentierte Abwägung): Das Theme benennt `--primary_color:#e2001a` (Rot) explizit als „Primary Color" — das wäre der naheliegendste Elementor-„e-global-color-primary"-Analogwert. Da Rot dort aber nur in Hover-Zuständen sowie auf Heading-Ebenen auftritt, die auf der Live-Startseite gar nicht gerendert werden (0× `<h1>`, 0× `<h4>`), und die Logo-Gegenprobe eindeutig Blau bestätigt, wurde Blau (`#0000fd`) als `--brand` übernommen und Rot als `--accent` eingeordnet. Volle Rohdaten/Begründung: `.superpowers/sdd/task-1-report.md`.
