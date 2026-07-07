import type { ServicePage } from "@/content/services";

// Bestandstexte von der Live-Seite (Task 10 Step 1), aus .tmp-extract/ extrahiert:
// impressum.php, agb.php, datenschutz.php (alle drei HTTP 200, Fetch-Datum siehe
// task-10-report.md). Rechtstexte niemals formulieren; Aktualisierung ist Sache von
// Betrieb/Anwalt.
//
// Extraktion strukturbewusst statt naivem <p>-Grep (Brief Step 1): Die eigentlichen
// Rechtsinhalte stehen teils in <h3>/<div>-Zeilen (Impressum-Kontaktblock) bzw. als ein
// einziges <p> mit <br>-getrennten Klauseln (AGB) statt in eigenen <p>-Tags. Extraktion
// bleibt rein mechanisch: Tags entfernt, HTML-Entities dekodiert, Whitespace normalisiert,
// <br> als Trenner zwischen eigenständigen Zeilen/Klauseln behandelt — kein Wort
// umformuliert, keine Reihenfolge geändert. Verifiziert: Wort-für-Wort-Diff zwischen einem
// naiven Full-Tag-Strip jedes echten Inhaltsblocks und der Konkatenation der übernommenen
// paragraphs-Einträge ergab für alle 3 Seiten exakte Übereinstimmung (Details:
// task-10-report.md).
//
// Sicherheitscheck (Gallhofer-Rework.md §7, kompromittierte Live-Seite): alle 3 Seiten
// geprüft auf versteckte SEO-Spam-Muster (Keyword-Scan viagra/steroid/cialis/etc.,
// position:absolute-Mini-Div-Scan, <p>-Tag-Balance). impressum.php und agb.php: sauber,
// kein Fund. datenschutz.php: 1 versteckter Spam-Div gefunden (Kommentar bei
// datenschutz-Eintrag unten) — liegt strukturell nachweislich außerhalb des übernommenen
// Textes.
export const rechtsSeiten: ServicePage[] = [
  // impressum.php: vollständiger, sauberer Bestand. Firma + beide Standorte (decken sich
  // mit content/locations.ts: Viktorgasse 20/1040 Wien, Schloßbergstraße 20/7212
  // Forchtenstein), Telefon 01/749 14 56 (deckt sich), FB Nr. 76806a / UID ATU15599706 /
  // DG Nr. 200623312. Enthält zusätzlich bislang unbekannte Bürozeiten (Mo-Do 8-12 /13-16,
  // Fr 8-12) und Mobilnummern/Ansprechpartner (Geschäftsführer, Inhaber, Sekretariat,
  // Buchhaltung) — bereits auf der aktuellen Live-Seite öffentliches Pflicht-Impressum,
  // hier unverändert übernommen. Die Kontaktzeilen stehen im Original nicht in <p>, sondern
  // als eigene <h3>/<div>-Zeilen in einer zweiten Spalte — jede Zeile unverändert 1:1 als
  // eigener paragraphs-Eintrag übernommen (kein Zusammenfassen/Umformulieren).
  // Ausgelassen: ein <p>, das nur ein verlinktes WKO-Logo enthält (kein Text, siehe
  // firmen.wko.at-Verifizierungslink) — inhaltlich nichts verloren.
  // Sicherheitscheck: kein Spam gefunden (Keyword-Scan + position:absolute-Scan clean,
  // <p>-Tags 4 offen/4 geschlossen).
  {
    slug: "impressum",
    title: "Impressum",
    paragraphs: [
      "Herr Johann Gallhofer hat 1987 die Firma von Herrn Michael Duacsek übernommen und gründete gemeinsam mit Herrn Duacsek die Duacsek GmbH, die dann nach dem Ausscheiden des Herrn Duacsek in Gallhofer GmbH umbenannt wurde. Zum damaligen Zeitpunkt existierte die Firma Michael Duacsek schon über 30 Jahre. Die Firma ist somit über 60 Jahre alt.",
      "Gallhofer Gesellschaft m.b.H.",
      "Viktorgasse 20, 1040 Wien",
      "Tel.: 01/749 14 56",
      "Zweigstelle:",
      "Schloßbergstraße 20, 7212 Forchtenstein",
      "Bürozeiten:",
      "Montag – Donnerstag von 8:00 - 12:00 und 13:00 - 16:00",
      "Freitag von 8:00 - 12:00",
      "Mobilnummern:",
      "Gallhofer Johannes – Geschäftsführer",
      "Gallhofer Johann – Inhaber",
      "Barbara Gallhofer – Sekretärin: 0650/749 14 56",
      "Barbara Fass – Buchhaltung: 01/749 14 56",
      "E-Mail: office@gallhofer-haustechnik.at",
      "Internet: www.gallhofer-haustechnik.at",
      "FB Nr. 76806a UID: ATU15599706 DG Nr. 200623312",
    ],
    contentPending: false,
  },

  // agb.php: vollständiger, sauberer Bestand — 19 nummerierte Abschnitte (Geltung bis
  // Allgemeines), erkennbar echtes, auf Gallhofer GmbH zugeschnittenes AGB-Dokument mit
  // korrekten österreichischen Rechtsverweisen (§ 456 UGB, § 7b KSchG, UN-Kaufrecht, VPI
  // 2010, KSV/AKV/ÖVC/ISA). Quelle ist im Original EIN einziges <p> mit 135 <br>-Tags statt
  // einzelner <p> je Klausel; <br> wurde als Trenner zwischen eigenständigen
  // Klauseln/Überschriften behandelt (mechanischer Split, kein Zusammenfassen mit Leerzeichen
  // wie sonst bei einzelnen Zeilenumbrüchen innerhalb eines Fließtext-Absatzes).
  // Verbatim erhaltene Eigenheiten des Originaldokuments (NICHT korrigiert):
  //  - Doppelte Abschnittsnummer "10." (10. Hinweis auf Beschränkung des
  //    Leistungsumfanges / 10. Behelfsmäßige Instandsetzung, direkt aufeinanderfolgend,
  //    dann weiter mit 11.) — Nummerierungsfehler im Originaldokument, nicht neu
  //    durchnummeriert (Rechtstexte niemals selbst formulieren/korrigieren).
  //  - Mid-Klausel-Zeilenumbruch nach 16.10: der Folgesatz "Wird eine Mängelrüge nicht
  //    rechtzeitig erhoben, gilt die Ware als genehmigt." steht ohne eigene Nummer als
  //    eigener Array-Eintrag (Original-<br> mitten in Klausel 16.10, nicht an einer
  //    Nummerngrenze) — inhaltlich nichts verloren, nur ein zusätzlicher Absatzumbruch.
  //  - Diverse Mitten-im-Wort-Trennstriche (z.B. "Per-sonen", "Rechtsge-schäft",
  //    "Ände-rungen") sind Artefakte im Originaltext selbst (vermutlich aus einer
  //    umbruchformatierten Vorlage kopiert) — verbatim erhalten. Ebenso ein einzelnes
  //    Sonderzeichen "¬" (U+00AC, NOT SIGN) mitten im Wort "Kaufge¬genstand" (7.6) —
  //    per Byte-Check im Original-HTML bestätigt (kein Encoding-Fehler der Extraktion),
  //    vermutlich ein verunglückter Trennstrich aus derselben Quelle — verbatim erhalten.
  // Ausgelassen: der Download-als-PDF-Link ("> Allgemeine Geschäftsbedingungen / Download
  // als PDF", im Original vor UND nach dem Fließtext identisch als eigenes <p>) — als reiner
  // Text ohne echten Link wäre er auf der neuen Seite irreführend (verweist auf einen
  // WordPress-Upload-Pfad, der im neuen Next.js-Projekt nicht existiert); kein Fließtext-
  // Verlust, da beide Vorkommen textgleiche Navigations-/Download-Hinweise sind, keine
  // AGB-Klauseln.
  // Sicherheitscheck: kein Spam gefunden (Keyword-Scan + position:absolute-Scan clean,
  // <p>-Tags 3 offen/3 geschlossen).
  {
    slug: "agb",
    title: "AGB",
    paragraphs: [
      "1. Geltung",
      "1.1. Diese Geschäftsbedingungen gelten zwischen uns (Gallhofer GmbH) und natürlichen und juristischen Per-sonen (kurz Kunde) für das gegenständliche Rechtsge-schäft sowie gegenüber unternehmerischen Kunden auch für alle hinkünftigen Geschäfte, selbst wenn im Einzelfall, insbesondere bei künftigen Ergänzungs- oder Folge-aufträgen darauf nicht ausdrücklich Bezug genommen wurde.",
      "1.2. Es gilt gegenüber unternehmerischen Kunden jeweils die bei Vertragsabschluss aktuelle Fassung unserer AGB, abrufbar auf unserer Homepage (www.haustechnik-gallhofer.at) und wurden diese auch an den Kunden übermittelt.",
      "1.3. Wir kontrahieren ausschließlich unter Zugrundele-gung unserer AGB.",
      "1.4. Geschäftsbedingungen des Kunden oder Ände-rungen bzw. Ergänzungen unserer AGB bedürfen zu ihrer Geltung unserer ausdrücklichen – gegenüber unterneh-merischen Kunden schriftlichen – Zustimmung.",
      "1.5. Geschäftsbedingungen des Kunden werden auch dann nicht anerkannt, wenn wir ihnen nach Eingang bei uns nicht ausdrücklich widersprechen.",
      "2. Angebot/Vertragsabschluss",
      "2.1. Unsere Angebote sind unverbindlich.",
      "2.2. Zusagen, Zusicherungen und Garantien unsererseits oder von diesen AGB abweichende Vereinbarungen im Zusammenhang mit dem Vertragsabschluss werden gegenüber unternehmerischen Kunden erst durch unsere schriftliche Bestätigung verbindlich.",
      "2.3. In Katalogen, Preislisten, Prospekten, Anzeigen auf Messeständen, Rundschreiben, Werbeaussendungen oder anderen Medien (Informationsmaterial) angeführte Informationen über unsere Produkte und Leistungen, die nicht uns zuzurechnen sind, hat der Kunde – sofern der Kunde diese seiner Entscheidung zur Beauftragung zu-grunde legt – uns darzulegen. Diesfalls können wir zu deren Richtigkeit Stellung nehmen. Verletzt der Kunde diese Obliegenheit, sind derartige Angaben unverbindlich, soweit diese nicht ausdrücklich – unternehmerischen Kunden gegenüber schriftlich – zum Vertragsinhalt erklärt wurden.",
      "2.4. Kostenvoranschläge werden ohne Gewähr erstellt und sind entgeltlich. Verbraucher werden vor Erstellung des Kostenvoranschlages auf die Kostenpflicht hingewiesen. Erfolgt eine Beauftragung mit sämtlichen im Kosten-voranschlag umfassten Leistungen, wird der gegenständ-lichen Rechnung das Entgelt für den Kostenvoranschlag gutgeschrieben.",
      "3. Preise",
      "3.1. Preisangaben sind grundsätzlich nicht als Pau-schalpreis zu verstehen.",
      "3.2. Für vom Kunden angeordnete Leistungen, die im ursprünglichen Auftrag keine Deckung finden, besteht Anspruch auf angemessenes Entgelt.",
      "3.3. Preisangaben verstehen sich zuzüglich der jeweils geltenden gesetzlichen Umsatzsteuer und ab Lager. Verpackungs-, Transport-. Verladungs- und Versandkosten sowie Zoll und Versicherung gehen zu Lasten des un-ternehmerischen Kunden. Verbrauchern als Kunden ge-genüber werden diese Kosten nur verrechnet, wenn dies einzelvertraglich ausverhandelt wurde. Wir sind nur bei ausdrücklicher Vereinbarung verpflichtet, Verpackung zu-rückzunehmen.",
      "3.4. Die fach- und umweltgerechte Entsorgung von Alt-material hat der Kunde zu veranlassen. Werden wir ge-sondert hiermit beauftragt, ist dies vom Kunden zusätzlich im hierfür vereinbarten Ausmaß, mangels Entgeltsverein-barung angemessen zu vergüten.",
      "3.5. Wir sind aus eigenem berechtigt, wie auch auf Antrag des Kunden verpflichtet, die vertraglich vereinbarten Ent-gelte anzupassen, wenn Änderungen im Ausmaß von zumindest 2 % hinsichtlich",
      "a) der Lohnkosten durch Gesetz, Verordnung, Kollektiv-vertrag, Betriebsvereinbarungen oder",
      "b) anderer zur Leistungserbringung notwendiger Kosten-faktoren wie Materialkosten aufgrund von Empfehlungen der Paritätischen Kommissionen oder von Änderungen der nationalen bzw Weltmarktpreise für Rohstoffe, Änderungen relevanter Wechselkurse etc. seit Vertragsabschluss ein-getreten sind. Die Anpassung erfolgt in dem Ausmaß, in dem sich die tatsächlichen Herstellungskosten im Zeitpunkt des Vertragsabschlusses ändern gegenüber jenen im Zeitpunkt der tatsächlichen Leistungserbringung, sofern wir uns nicht in Verzug befinden.",
      "3.6. Das Entgelt bei Dauerschuldverhältnissen wird als wertgesichert nach dem VPI 2010 vereinbart und erfolgt dadurch eine Anpassung der Entgelte. Als Ausgangsbasis wird der Monat zu Grunde gelegt, in dem der Vertrag ab-geschlossen wurde.",
      "3.7. Verbrauchern als Kunden gegenüber erfolgt bei Änderung der Kosten eine Anpassung des Entgelts gemäß Punkt 3.5 sowie bei Dauerschuldverhältnisses gemäß Punkt 3.6 nur bei einzelvertraglicher Aushandlung, wenn die Leistung innerhalb von zwei Monaten nach Ver-tragsabschluss zu erbringen ist.",
      "3.8. Bogenförmig verlegte Leitungen werden im Außen-bogen gemessen. Formstücke und Armaturen werden im Rohrausmaß mit gemessen, jedoch separat verrechnet. Das Ausmaß des Korrosionsschutzes und des Anstrichs wird gleich dem Ausmaß der darunter befindlichen Rohre angenommen. Das Ausmaß der Wärmedämmung wird an den Außenflächen gemessen. Unterbrechungen bis ma-ximal 1 Meter bleiben unberücksichtigt.",
      "4. Beigestellte Ware",
      "4.1. Werden Geräte oder sonstige Materialien vom Kun-den bereitgestellt, sind wir berechtigt, dem Kunden einen Zuschlag von 15 % des Werts der beigestellten Geräte bzw. des Materials zu berechnen.",
      "4.2. Solche vom Kunden beigestellte Geräte und sonstige Materialien sind nicht Gegenstand von Gewährleistung.",
      "4.3. Die Qualität und Betriebsbereitschaft von Beistel-lungen liegt in der Verantwortung des Kunden.",
      "5. Zahlung",
      "5.1. Ein Drittel des Entgeltes wird bei Vertragsab-schluss, ein Drittel bei Leistungsbeginn und der Rest nach Leistungsfertigstellung fällig. Es ei den es werden andere Zahlungsbedingungen von uns angeboten oder mit dem Kunden vereinbart.",
      "5.2. Die Berechtigung zu einem Skontoabzug bedarf einer ausdrücklichen – gegenüber unternehmerischen Kunden schriftlichen – Vereinbarung.",
      "5.3. Vom Kunden vorgenommene Zahlungswidmungen auf Überweisungsbelegen sind für uns nicht verbindlich.",
      "5.4. Gegenüber Unternehmern als Kunden sind wir gemäß § 456 UGB bei verschuldetem Zahlungsverzug dazu berechtigt, 9,2 % Punkte über dem Basiszinssatz zu be-rechnen. Gegenüber Verbrauchern berechnen wir einen Zinssatz iHv 4%.",
      "5.5. Die Geltendmachung eines weiteren Verzugs-schadens bleibt vorbehalten, gegenüber Verbrauchern als Kunden jedoch nur, wenn dies im Einzelnen ausgehandelt wird.",
      "5.6. Kommt der unternehmerische Kunde im Rahmen anderer mit uns bestehender Vertragsverhältnisse in Zah-lungsverzug, so sind wir berechtigt, die Erfüllung unserer Verpflichtungen aus diesem Vertrag bis zur Erfüllung durch den Kunden einzustellen.",
      "5.7. Wir sind dann auch berechtigt, alle Forderungen für bereits erbrachte Leistungen aus der laufenden Ge-schäftsbeziehung mit dem Kunden fällig zu stellen. Dies gegenüber Verbrauchern als Kunden nur für den Fall, dass eine rückständige Leistung zumindest seit sechs Wochen fällig ist und wir unter Androhung dieser Folge den Kunden unter Setzung einer Nachfrist von mindestens zwei Wochen erfolglos gemahnt haben.",
      "5.8. Eine Aufrechnungsbefugnis steht dem Kunden nur insoweit zu, als Gegenansprüche gerichtlich festgestellt oder von uns anerkannt worden sind. Verbrauchern als Kunden steht eine Aufrechnungsbefugnis auch zu, soweit Gegenansprüche im rechtlichen Zusammenhang mit der Zahlungsverbindlichkeit des Kunden stehen, sowie bei Zahlungsunfähigkeit unseres Unternehmens.",
      "5.9. Bei Überschreitung der Zahlungsfrist verfallen ge-währte Vergütungen (Rabatte, Abschläge, u.a.) und werden der Rechnung zugerechnet.",
      "5.10. Für zur Einbringlichmachung notwendige und zweckentsprechenden Mahnungen verpflichtet sich der Kunde bei verschuldeten Zahlungsverzug zur Bezahlung von Mahnspesen pro Mahnung in Höhe von € 8,- soweit dies im angemessenen Verhältnis zur betriebenen Forderung steht.",
      "6. Bonitätsprüfung",
      "6.1. Der Kunde erklärt sein ausdrückliches Einverständ-nis, dass seine Daten ausschließlich zum Zwecke des Gläubigerschutzes an die staatlich bevorrechteten Gläu-bigerschutzverbände Alpenländischer Kreditorenverband (AKV), Österreichischer Verband Creditreform (ÖVC), In-solvenzschutzverband für Arbeitnehmer oder Arbeitneh-merinnen (ISA) und Kreditschutzverband von 1870(KSV) übermittelt werden dürfen.",
      "7. Mitwirkungspflichten des Kunden",
      "7.1. Unsere Pflicht zur Leistungsausführung beginnt frühestens, sobald der Kunde alle baulichen, technischen sowie rechtlichen Voraussetzungen zur Ausführung ge-schaffen hat, die im Vertrag oder in vor Vertragsabschluss dem Kunden erteilten Informationen umschrieben wurden oder der Kunde aufgrund einschlägiger Fachkenntnis oder Erfahrung kennen musste.",
      "7.2. Insbesondere hat der Kunde vor Beginn der Leis-tungsausführung die nötigen Angaben über die Lage verdeckt geführter Strom-, Gas- und Wasserleitungen oder ähnlicher Vorrichtungen, Fluchtwege, sonstige Hin-dernisse baulicher Art, sonstige mögliche Störungsquellen, Gefahrenquellen sowie die erforderlichen statischen An-gaben und allfällige diesbezügliche projektierte Änderungen unaufgefordert zur Verfügung zu stellen. Auftragsbezogener Details zu den notwendigen Angaben können bei uns angefragt werden.",
      "7.3. Kommt der Kunde dieser Mitwirkungspflicht nicht nach, ist – ausschließlich im Hinblick auf die infolge fal-scher Kundenangaben nicht voll gegebene Leistungsfä-higkeit – unsere Leistung nicht mangelhaft.",
      "7.4. Der Kunde hat die erforderlichen Bewilligungen Dritter sowie Meldungen und Bewilligungen durch Behörden auf seine Kosten zu veranlassen. Auf diese weisen wir im Rahmen des Vertragsabschlusses hin, sofern nicht der Kunde darauf verzichtet hat oder der unternehmerische Kunde aufgrund Ausbildung oder Erfahrung über solches Wissen verfügen musste.",
      "7.5. Die für die Leistungsausführung einschließlich des Probebetriebes erforderliche Energie und Wassermengen sind vom Kunden auf dessen Kosten beizustellen.",
      "7.6. Der Kunde haftet dafür, dass die notwendigen bau-lichen, technischen und rechtlichen Voraussetzungen für das herzustellende Werk oder den Kaufge¬genstand gegeben sind, die im Vertrag oder in vor Vertragsabschluss dem Kunden erteilten Informationen umschrieben wurden oder der Kunde aufgrund einschlägiger Fachkenntnis oder Erfahrung kennen musste.",
      "7.7. Der Kunde hat uns für die Zeit der Leistungsausfüh-rung kostenlos versperrbare Räume für den Aufenthalt der Arbeiter sowie für die Lagerung von Werkzeugen und Materialien zur Verfügung zu stellen.",
      "7.8. Auftragsbezogene Details der notwendigen Angaben können bei uns angefragt werden.",
      "7.9. Der Kunde ist nicht berechtigt, Forderungen und Rechte aus dem Vertragsverhältnis ohne unsere schriftli-che Zustimmung abzutreten.",
      "8. Leistungsausführung",
      "8.1. Wir sind lediglich dann verpflichtet, nachträgliche Änderungs- und Erweiterungswünsche des Kunden zu berücksichtigen, wenn sie aus technischen Gründen er-forderlich sind, um den Vertragszweck zu erreichen.",
      "8.2. Dem Kunden zumutbare sachlich gerechtfertigte ge-ringfügige Änderungen unserer Leistungsausführung gelten als vorweg genehmigt. Gegenüber Verbrauchern besteht dieses Recht nur, wenn es im Einzelfall ausge-handelt wird.",
      "8.3. Kommt es nach Auftragserteilung aus welchen Gründen auch immer zu einer Abänderung oder Ergänzung des Auftrages, so verlängert sich die Liefer-/Leistungsfrist um einen angemessenen Zeitraum.",
      "8.4. Wünscht der Kunde nach Vertragsabschluss eine Leistungsausführung innerhalb eines kürzeren Zeitraums, stellt dies eine Vertragsänderung dar. Hierdurch können Überstunden notwendig werden und/oder durch die Be-schleunigung der Materialbeschaffung Mehrkosten auf-laufen, und erhöht sich das Entgelt im Verhältnis zum notwendigen Mehraufwand angemessen.",
      "8.5. Sachlich (z.B. Anlagengröße, Baufortschritt, u.a.) gerechtfertigte Teillieferungen und -leistungen sind zu-lässig und können gesondert in Rechnung gestellt werden.",
      "9. Leistungsfristen und Termine",
      "9.1. Fristen und Termine verschieben sich bei höherer Gewalt, Streik, nicht vorhersehbare und von uns nicht verschuldete Verzögerung unserer Zulieferer oder sonstigen vergleichbaren Ereignissen, die nicht in unserem Ein-flussbereich liegen, in jenem Zeitraum, während dessen das entsprechende Ereignis andauert. Davon unberührt bleibt das Recht des Kunden auf Rücktritt vom Vertrag bei Verzögerungen die eine Bindung an den Vertrag unzumutbar machen.",
      "9.2. Werden der Beginn der Leistungsausführung oder die Ausführung durch dem Kunden zuzurechnende Um-stände verzögert oder unterbrochen, insbesondere auf-grund der Verletzung der Mitwirkungspflichten gemäß Punkt 7. dieser AGB, so werden Leistungsfristen entsprechend verlängert und vereinbarte Fertigstellungstermine entsprechend hinausgeschoben.",
      "9.3. Wir sind berechtigt, für die dadurch notwendige La-gerung von Materialien und Geräten und dergleichen in unserem Betrieb 1 % des Rechnungsbetrages je begon-nenen Monat der Leistungsverzögerung zu verrechnen, wobei die Verpflichtung des Kunden zur Zahlung sowie dessen Abnahmeobliegenheit hiervon unberührt bleibt.",
      "9.4. Unternehmerischen Kunden gegenüber sind Liefer- und Fertigstellungstermine nur verbindlich, wenn deren Einhaltung schriftlich zugesagt wurde.",
      "9.5. Bei Verzug mit der Vertragserfüllung durch uns steht dem Kunden ein Recht auf Rücktritt vom Vertrag nach Setzung einer angemessenen Nachfrist zu. Die Setzung der Nachfrist hat schriftlich (von unternehmerischen Kunden mittels eingeschriebenen Briefs), unter gleichzeitiger Androhung des Rücktritts zu erfolgen.",
      "10. Hinweis auf Beschränkung des Leistungsumfan-ges",
      "10.1. Im Rahmen von Montage- und Instandsetzungsar-beiten können Schäden (a) an bereits vorhandenen Lei-tungen, Rohrleitungen, Armaturen, sanitären Einrich-tungsgegenständen und Geräten als Folge nicht erkenn-barer Gegebenheiten oder Materialfehler (b) bei Stemm-arbeiten in bindungslosem Mauerwerk entstehen. Solche Schäden sind von uns nur zu verantworten, wenn wir diese schuldhaft verursacht haben.",
      "10. Behelfsmäßige Instandsetzung",
      "10.1. Bei behelfsmäßigen Instandsetzungen besteht ledig-lich eine sehr beschränkte und den Umständen entspre-chende Haltbarkeit.",
      "10.2. Vom Kunden ist bei behelfsmäßiger Instandsetzung umgehend eine fachgerechte Instandsetzung zu veran-lassen.",
      "11. Gefahrtragung",
      "11.1. FÜR DEN GEFAHRENÜBERGANG BEI ÜBERSENDUNG DER WARE AN DEN VERBRAUCHER GILT § 7B KSCHG.",
      "11.2. AUF DEN UNTERNEHMERISCHEN KUNDEN GEHT DIE GEFAHR ÜBER, SOBALD WIR DEN KAUFGEGENSTAND, DAS MATERIAL ODER DAS WERK ZUR ABHOLUNG IM WERK ODER LAGER BEREITHALTEN, DIESES SELBST ANLIEFERN ODER AN EINEN TRANSPORTEUR ÜBERGEBEN.",
      "11.3. DER UNTERNEHMERISCHE KUNDE WIRD SICH GEGEN DIESES RISIKO ENTSPRECHEND VERSICHERN. WIR VERPFLICHTEN UNS, EINE TRANSPORTVERSICHERUNG ÜBER SCHRIFTLICHEN WUNSCH DES KUNDEN AUF DESSEN KOSTEN ABZUSCHLIESSEN. DER KUNDE GENEHMIGT JEDE VERKEHRSÜBLICHE VERSANDART.",
      "12. Annahmeverzug",
      "12.1. Gerät der Kunde länger als 4 Wochen in Annahme-verzug (Verweigerung der Annahme, Verzug mit Vorleis-tungen oder anders), und hat der Kunde trotz angemessener Nachfristsetzung nicht für die Beseitigung der ihm zuzurechnenden Umstände gesorgt, welche die Leis-tungsausführung verzögern oder verhindern, dürfen wir bei aufrechtem Vertrag über die für die Leistungsausführung spezifizierten Geräte und Materialien anderweitig ver-fügen, sofern wir im Fall der Fortsetzung der Leistungs-ausführung diese innerhalb einer den jeweiligen Gege-benheiten angemessenen Frist nachbeschaffen.",
      "12.2. Bei Annahmeverzug des Kunden sind wir ebenso berechtigt, bei Bestehen auf Vertragserfüllung die Ware bei uns einzulagern, wofür uns eine Lagergebühr in Höhe von € 50,- zusteht.",
      "12.3. Davon unberührt bleibt unser Recht, das Entgelt für erbrachte Leistungen fällig zu stellen und nach angemes-sener Nachfrist vom Vertrag zurückzutreten.",
      "12.4. Im Falle eines berechtigten Rücktritts vom Vertrag, dürfen wir einen pauschalierten Schadenersatz in Höhe von 3 % des Auftragswertes zuzüglich USt ohne Nachweis des tatsächlichen Schadens vom Kunden zu verlangen. Die Verpflichtung zur Zahlung eines Schadenersatzes ist im Falle eines Unternehmers vom Verschulden unabhängig.",
      "12.5. Die Geltendmachung eines höheren Schadens ist zulässig. Gegenüber Verbrauchern besteht dieses Recht nur, wenn es im Einzelfall ausgehandelt wird.",
      "13. Eigentumsvorbehalt",
      "13.1. Die von uns gelieferte, montierte oder sonst über-gebene Ware bleibt bis zur vollständigen Bezahlung unser Eigentum.",
      "13.2. Eine Weiterveräußerung ist nur zulässig, wenn uns diese rechtzeitig vorher unter Angabe des Namens und der Anschrift des Käufers bekannt gegeben wurde und wir der Veräußerung zustimmen. Im Fall unserer Zustimmung gilt die Kaufpreisforderung bereits jetzt als an uns abgetreten.",
      "13.3. Der Auftraggeber hat bis zur vollständigen Zahlung des Entgeltes oder Kaufpreises in seinen Büchern und auf seinen Rechnungen diese Abtretung anzumerken und seine Schuldner auf diese hinzuweisen. Über Aufforde-rung hat er dem Auftragnehmer alle Unterlagen und In-formationen, die zur Geltendmachung der abgetretenen Forderungen und Ansprüche erforderlich sind, zur Verfü-gung zu stellen.",
      "13.4. Gerät der Kunde in Zahlungsverzug, sind wir bei angemessener Nachfristsetzung berechtigt, die Vorbe-haltsware herauszuverlangen. Gegenüber Verbrauchern als Kunden dürfen wir dieses Recht nur ausüben, wenn zumindest eine rückständige Leistung des Verbrauchers seit mindestens sechs Wochen fällig ist und wir ihn unter Androhung dieser Rechtsfolge und unter Setzung einer Nachfrist von mindestens zwei Wochen erfolglos gemahnt haben.",
      "13.5. Der Kunde hat uns von der Eröffnung des Konkurses über sein Vermögen oder der Pfändung unserer Vorbehaltsware unverzüglich zu verständigen.",
      "13.6. Wir sind berechtigt, zur Geltendmachung unseres Eigentumsvorbehaltes den Standort der Vorbehaltsware soweit für den Kunden zumutbar zu betreten, dies nach angemessener Vorankündigung.",
      "13.7. Notwendige und zur zweckentsprechenden Rechts-verfolgung angemessene Kosten trägt der Kunde.",
      "13.8. In der Geltendmachung des Eigentumsvorbehaltes liegt nur dann ein Rücktritt vom Vertrag, wenn dieser ausdrücklich erklärt wird.",
      "13.9. Die zurückgenommene Vorbehaltsware dürfen wir gegenüber unternehmerischen Kunden freihändig und bestmöglich verwerten.",
      "14. Schutzrechte Dritter",
      "14.1. Bringt der Kunde geistige Schöpfungen oder Un-terlagen bei und werden hinsichtlich solcher Schöpfungen, Schutzrechte Dritter geltend gemacht, so sind wir berech-tigt, die Herstellung des Liefergegenstandes auf Risiko des Auftraggebers bis zur Klärung der Rechte Dritter einzu-stellen, und den Ersatz der von uns aufgewendeten not-wendigen und zweckentsprechenden Kosten zu bean-spruchen, außer die Unberechtigtheit der Ansprüche ist offenkundig.",
      "14.2. Der Kunde hält uns diesbezüglich schad- und klaglos.",
      "14.3. Wir sind berechtigt, von unternehmerischen Kunden für allfällige Prozesskosten angemessene Kostenvor-schüsse zu verlangen.",
      "14.4. Für Liefergegenstände, welche wir nach Kunden-unterlagen (Konstruktionsangaben, Zeichnungen, Modelle oder sonstige Spezifikationen, etc) herstellen, übernimmt ausschließlich der Kunde die Gewähr, dass die Anfertigung dieser Liefergegenstände Schutzrechte Dritter nicht verletzt werden.",
      "14.5. Werden Schutzrechte Dritter dennoch geltend ge-macht, so sind wir berechtigt, die Herstellung der Liefer-gegenstände auf Risiko des Auftraggebers bis zur Klärung der Rechte Dritter einzustellen, außer die Unberechtigtheit der Ansprüche ist offenkundig.",
      "14.6. Ebenso können wir den Ersatz von uns aufgewen-deter notwendiger und nützlicher Kosten vom Kunden beanspruchen.",
      "15. Unser geistiges Eigentum",
      "15.1. Pläne, Skizzen, Kostenvoranschläge und sonstige Unterlagen, die von uns beigestellt oder durch unseren Beitrag entstanden sind, bleiben unser geistiges Eigentum.",
      "15.2. Die Verwendung solcher Unterlagen außerhalb der bestimmungsgemäßen Nutzung, insbesondere die Wei-tergabe, Vervielfältigung, Veröffentlichung und Zur-Verfügung-Stellung einschließlich auch nur auszugs-weisen Kopierens bedarf unserer ausdrücklichen Zustim-mung.",
      "15.3. Der Kunde verpflichtet sich weiteres zur Geheim-haltung des ihm aus der Geschäftsbeziehung zugegan-genen Wissens Dritten gegenüber.",
      "16. Gewährleistung",
      "16.1. Es gelten die Bestimmungen über die gesetzliche Gewährleistung. Die Gewährleistungsfrist für unsere Leistungen beträgt gegenüber unternehmerischen Kunden ein Jahr ab Übergabe.",
      "16.2. Der Zeitpunkt der Übergabe ist mangels abwei-chender Vereinbarung (z.B. förmliche Abnahme) der Fer-tigstellungszeitpunkt, spätestens wenn der Kunde die Leistung in seine Verfügungsmacht übernommen hat oder die Übernahme ohne Angabe von Gründen verweigert hat.",
      "16.3. Ist eine gemeinsame Übergabe vorgesehen, und bleibt der Kunde dem ihm mitgeteilten Übergabetermin fern, gilt die Übernahme als an diesem Tag erfolgt.",
      "16.4. Behebungen eines vom Kunden behaupteten Mangels stellen kein Anerkenntnis dieses vom Kunden behauptenden Mangels dar.",
      "16.5. Zur Mängelbehebung sind uns seitens des unter-nehmerischen Kunden zumindest zwei Versuche einzu-räumen.",
      "16.6. Sind die Mängelbehauptungen des Kunden unbe-rechtigt, ist der Kunde verpflichtet, uns entstandene Auf-wendungen für die Feststellung der Mängelfreiheit oder Fehlerbehebung zu ersetzen.",
      "16.7. Der unternehmerische Kunde hat stets zu beweisen, dass der Mangel zum Übergabezeitpunkt bereits vorhanden war.",
      "16.8. Zur Behebung von Mängeln hat der Kunde die Anlage bzw. die Geräte ohne schuldhafte Verzögerung uns zugänglich zu machen und uns die Möglichkeit zur Be-gutachtung durch uns oder von uns bestellten Sachver-ständigen einzuräumen.",
      "16.9. Mängel am Liefergegenstand, die der unternehme-rische Kunde bei ordnungsgemäßem Geschäftsgang nach Ablieferung durch Untersuchung festgestellt hat oder fest-stellen hätte müssen sind unverzüglich, spätestens 14 Tage nach Übergabe an uns schriftlich anzuzeigen. Ver-steckte Mängel müssen ebenfalls in dieser angemessenen Frist ab Entdecken angezeigt werden.",
      "16.10. Eine etwaige Nutzung oder Verarbeitung des mangelhaften Leistungsgegenstandes, durch welche ein weitergehender Schaden droht oder eine Ursachenerhe-bung erschwert oder verhindert wird, ist vom Kunden un-verzüglich einzustellen, soweit dies nicht unzumutbar ist.",
      "Wird eine Mängelrüge nicht rechtzeitig erhoben, gilt die Ware als genehmigt.",
      "16.11. Sind Mängelbehauptungen des Kunden unberechtigt, ist er verpflichtet, uns entstandene Aufwendungen für die Feststellung der Mängelfreiheit oder Fehlerbehebung zu ersetzen.",
      "16.12. Eine etwaige Nutzung oder Verarbeitung des mangelhaften Liefergegenstandes, durch welche ein wei-tergehender Schaden droht oder eine Ursachenbehebung erschwert oder verhindert wird, ist vom Kunden unverzüg-lich einzustellen, soweit dies nicht unzumutbar ist.",
      "16.13. Ein Wandlungsbegehren können wir durch Ver-besserung oder angemessene Preisminderung abwenden, sofern es sich um keinen wesentlichen und unbehebbaren Mangel handelt.",
      "16.14. Werden die Leistungsgegenstände aufgrund von Angaben, Zeichnungen, Plänen, Modellen oder sonstigen Spezifikationen des Kunden hergestellt, so leisten wir nur für die bedingungsgemäße Ausführung Gewähr.",
      "16.15. Keinen Mangel begründet der Umstand, dass das Werk zum vereinbarten Gebrauch nicht voll geeignet ist, wenn dies ausschließlich auf abweichende tatsächliche Gegebenheiten von den uns im Zeitpunkt der Leistungs-erbringung vorgelegenen Informationen basiert, weil der Kunde seinen Mitwirkungspflichten nicht nachkommt.",
      "16.16. Die mangelhafte Lieferung oder Proben davon sind – sofern wirtschaftlich vertretbar – vom unternehmerischen Kunden an uns zu retournieren.",
      "16.17. Die Kosten für den Rücktransport der mangelhaften Sache an uns trägt zur Gänze der unternehmerische Kunde.",
      "16.18. Den Kunden trifft die Obliegenheit, eine unverzüg-liche Mangelfeststellung durch uns zu ermöglichen.",
      "16.19. Die Gewährleistung ist ausgeschlossen, wenn die technischen Anlagen des Kunden wie etwa Zuleitungen, Verkabelungen u.ä. nicht in technisch einwandfreiem und betriebsbereitem Zustand oder mit den gelieferten Ge-genständen nicht kompatibel sind, soweit dieser Umstand kausal für den Mangel ist.",
      "17. Haftung",
      "17.1. Wegen Verletzung vertraglicher oder vorvertraglicher Pflichten, insbesondere wegen Unmöglichkeit, Verzug etc. haften wir bei Vermögensschäden nur in Fällen von Vorsatz oder grober Fahrlässigkeit.",
      "17.2. Gegenüber unternehmerischen Kunden ist die Haf-tung beschränkt mit dem Haftungshöchstbetrag einer al-lenfalls durch uns abgeschlossenen Haftpflichtversiche-rung.",
      "17.3. Diese Beschränkung gilt auch hinsichtlich des Schadens an einer Sache, die wir zur Bearbeitung übernommen haben. Gegenüber Verbrauchern gilt dies jedoch nur dann, wenn dies einzelvertraglich ausgehandelt wurde.",
      "17.4. Schadenersatzansprüche unternehmerischer Kunden sind bei sonstigem Verfall binnen zwei Jahren gerichtlich geltend zu machen.",
      "17.5. Der Haftungsausschluss umfasst auch Ansprüche gegen unsere Mitarbeiter, Vertreter und Erfüllungsgehilfe aufgrund Schädigungen, die diese dem Kunden – ohne Bezug auf einen Vertrag ihrerseits mit dem Kunden – zu-fügen.",
      "17.6. Unsere Haftung ist ausgeschlossen für Schäden durch unsachgemäße Behandlung oder Lagerung, Überbeanspruchung, Nichtbefolgen von Bedienungs- und Installationsvorschriften, fehlerhafter Montage, Inbetrieb-nahme, Wartung, Instandhaltung durch den Kunden oder nicht von uns autorisierte Dritte, oder natürliche Abnutzung, sofern dieses Ereignis kausal für den Schaden war. Ebenso besteht der Haftungsausschluss für Unterlassung notwendiger Wartungen, sofern wir nicht vertraglich die Pflicht zur Wartung übernommen haben.",
      "17.7. Wenn und soweit der Kunde für Schäden, für die wir haften, Versicherungsleistungen durch eine eigene oder zu seinen Gunsten abgeschlossen Schadenversicherung (z.B. Haftpflichtversicherung, Kasko, Transport, Feuer, Betriebsunterbrechung und andere) in Anspruch nehmen kann, verpflichtet sich der Kunde zur Inanspruchnahme der Versicherungsleistung und beschränkt sich unsere Haftung insoweit auf die Nachteile, die dem Kunden durch die In-anspruchnahme dieser Versicherung entstehen (z.B. hö-here Versicherungsprämie).",
      "17.8. Jene Produkteigenschaften werden geschuldet, die im Hinblick auf die Zulassungsvorschriften, Bedienungs-anleitungen und sonstige produktbezogene Anleitungen und Hinweise (insbesondere auch Kontrolle und Wartung) von uns, dritten Herstellern oder Importeuren vom Kunden unter Berücksichtigung dessen Kenntnisse und Erfahrungen erwartet werden können. Der Kunde als Weiterverkäufer hat eine ausreichende Versicherung für Produkt-haftungsansprüche abzuschließen und uns hinsichtlich Regressansprüchen schad- und klaglos zu halten .",
      "18. Salvatorische Klausel",
      "18.1. Sollten einzelne Teile dieser AGB unwirksam sein, so wird dadurch die Gültigkeit der übrigen Teile nicht berührt.",
      "18.2. Wir verpflichten uns ebenso wie der unternehmeri-sche Kunde jetzt schon, gemeinsam – ausgehend vom Horizont redlicher Vertragsparteien – eine Ersatzregelung zu treffen, die dem wirtschaftlichen Ergebnis der unwirk-samen Bedingung am nächsten kommt.",
      "19. Allgemeines",
      "19.1. Es gilt österreichisches Recht.",
      "19.2. Das UN-Kaufrecht ist ausgeschlossen.",
      "19.3. Erfüllungsort ist der Sitz des Unternehmens (Wien).",
      "19.4. Gerichtsstand für alle sich aus dem Vertragsver-hältnis oder künftigen Verträgen zwischen uns und dem unternehmerischen Kunden ergebenden Streitigkeiten ist das für unseren Sitz örtlich zuständige Gericht. Gerichts-stand für Verbraucher, sofern dieser seinen Wohnsitz im Inland hat, ist das Gericht, in dessen Sprengel der Ver-braucher seinen gewöhnlichen Aufenthalt oder Ort der Beschäftigung hat.",
      "19.5. Änderungen seines Namens, der Firma, seiner Anschrift, seiner Rechtsform oder andere relevante Infor-mationen hat der Kunde uns umgehend schriftlich bekannt zu geben.",
    ],
    contentPending: false,
  },

  // datenschutz.php: vollständiger, sauberer Bestand — 6 nummerierte DSGVO-Abschnitte
  // (Erhebung/Verwendung, Newsletter, Datenübermittlung, Einwilligung, Cookies, Rechte der
  // Betroffenen) plus Kontaktdaten. Die Original-Nummerierung "1." bis "6." wird im
  // Quell-HTML nicht als Text, sondern über <ol start="N"><li>...</li></ol> (Browser-
  // generierte Zählung) dargestellt; da paragraphs eine flache String-Liste ist (keine
  // <ol>-Semantik), wurde die jeweilige start-Zahl aus dem Original-Attribut mechanisch als
  // "N. " vor den zugehörigen <li>-Text gesetzt (keine erfundene Nummer, nur die im Markup
  // bereits vorhandene Zahl in Text umgewandelt).
  // ACHTUNG Datenschutz-Adresse weicht vom Impressum ab: hier "7212 Forchtenstein,
  // Talgasse 23", im Impressum und in content/locations.ts dagegen "Schloßbergstraße 20"
  // für denselben Standort. Beide Texte je für sich sind erkennbar echte, unveränderte
  // Bestandstexte der jeweiligen Seite (keine Spam-/Fälschungsanzeichen) — die
  // Diskrepanz selbst ist eine inhaltliche Unstimmigkeit im Bestand der Altseite, nicht
  // ein Extraktionsfehler. NICHT eigenmächtig vereinheitlicht (Rechtstexte niemals selbst
  // formulieren) — verbatim je Seite belassen, Klärung mit aktueller Anschrift ist Sache von
  // Betrieb/Anwalt (siehe task-10-report.md Concerns).
  // Sicherheitsfund (Gallhofer-Rework.md §7, Fortsetzung des in Task 4 gefundenen Site-Hacks):
  // ein versteckter <div style="position: absolute; ... width: 10px; height: 11px; ...
  // overflow: scroll;"> mit einem Link "steroid web sites" auf https://braxeng.com/community,
  // eingefügt als eigene, separate fusion-builder-row NACH dem echten Inhalt (eigene Spalte,
  // kein <p>). Tag-Audit (13 offene / 13 geschlossene <p>-Tags, keine Verwaisung) und
  // Keyword-Scan über jeden übernommenen Absatz bestätigen: 0 Treffer in den unten
  // übernommenen paragraphs.
  {
    slug: "datenschutz",
    title: "Datenschutz",
    paragraphs: [
      "Diese Erklärung bezieht sich auf Daten, die dadurch bekannt werden, weil der Kunde diese Website nutzt. Im Folgenden wird darüber informiert, um was für Daten es sich dabei handelt und was mit ihnen passiert.",
      "Sofern sich auf der Website der Fa. Gallhofer GmbH Links zu anderen Internetseiten befinden, gilt diese Erklärung nicht für die Datenerhebung- und Verwendung auf den gelinkten Seiten.",
      "1. Personenbezogene Daten – Erhebung und Verwendung",
      "Personenbezogene Daten erhebt die Fa. Gallhofer GmbH nur, wenn ihr der Kunde diese freiwillig mitteilt. Solch eine Mitteilung erfolgt insb. im Rahmen einer Bestellung. Um eine Bestellung tätigen zu können, muss der Kunde folgende persönliche Daten in ein Kontaktformular eintragen: 1. seinen Namen 2. seine Adresse 3. seine E-Mail-Adresse 4. seine Telefonnummer. Die Fa. Gallhofer GmbH speichert diese Daten in ihrer Datenbank und verwendet sie ausschließlich zur individuellen Kommunikation mit dem Kunden bzw. zur Durchführung des Vertrages. Darunter fällt die Anbahnung, der Abschluss, die Abwicklung, Gewährleistungen sowie die Rückabwicklung. Die Daten werden grds. nur so lange gespeichert, bis der Vertrag vollständig abgewickelt ist. Soweit handels- und steuerrechtliche Aufbewahrungsfristen bestehen, kann die Dauer der Speicherung bis zu 10 Jahren betragen.",
      "2. Sonstige Erhebung und Verwendung personenbezogener Daten",
      "Außer bei der Bestellung ist die Eingabe persönlicher Daten im Falle von Feedbacks sowie zur eventuellen Abonnierung von Newslettern notwendig. Die Nutzung dieser Serviceleistungen und Dienste seitens des Nutzers erfolgt ausdrücklich auf freiwilliger Basis.",
      "Soweit es um den Newsletter geht, werden die E-Mail-Adressen zwecks Versand auf dem Newsletterserver der Fa. Gallhofer GmbH gespeichert und für keine anderen Zwecke als den Versand der Newsletter verwendet. Die Abonnenten der Newsletter können jederzeit selbst das Abonnement kündigen; die E-Mail-Adressen werden dadurch automatisch gelöscht. In jedem Fall (Newsletter, Feedback) werden die angegebenen persönlichen Daten (insb. Name, E-Mail-Adresse) nur für die Übersendung der gewünschten Veröffentlichungen oder Informationen bzw. für die bei dem einzelnen Formular ggf. explizit genannten anderen Zwecke verarbeitet.",
      "3. Datenübermittlung",
      "Die Weitergabe von Kundendaten erfolgt nur insoweit, als das zur Vertragsabwicklung notwendig ist. Eine Weitergabe der Daten erfolgt insb. in folgenden Fällen : 1) Adressdaten an Versandunternehmen zwecks Lieferung 2) Zahlungsdaten an Kreditinstitute bzw. Zahlungsintermediäre zur Abwicklung von Zahlungen. 3) O.g. Daten an Inkassounternehmen bei Abtretung der Forderung Im Übrigen übermittelt die Fa. Gallhofer GmbH Kundendaten an Dritte nur dann, wenn dies zur Abwehr von Gefahren für die öffentliche Sicherheit und Ordnung erforderlich ist, insb. wenn sie zur Übermittlung an Strafverfolgungs- oder Aufsichtsbehörden verpflichtet ist.",
      "4. Einwilligungsbedürftige Nutzung von Daten",
      "Zum Zwecke der Werbung, Markt- und Meinungsforschung nutzt die Fa. Gallhofer GmbH Kundendaten nur, soweit der Kunde eingewilligt hat. Um seine Einwilligung wird der Kunde im jeweiligen Fall gesondert gebeten. Er gibt seine Einwilligungserklärung ab, indem er ein Kästchen neben dem entsprechenden Einwilligungstext anklickt. Ein Widerruf dieser Einwilligungserklärung ist jederzeit möglich.",
      "5. Verwendung von Cookies",
      "Im Informationsangebot der Fa. Gallhofer GmbH werden Cookies verwendet. Cookies sind kleine Datenpakete, die Browser des Kunden auf unsere Veranlassung in dem Endgerät des Kunden speichert. Dort richten sie keinen Schaden an. Die Fa. Gallhofer GmbH verwendet zwei Arten von Cookies. Temporäre Cookies werden mit dem Schließen des Browsers des Kunden automatisch gelöscht (Session-Cookies). Dauerhafte Cookies werden erst durch manuelles Löschen des Browsers durch den Kunden entfernt (Zeitraum individuell) (Permanent-Cookies). Die dauerhaften Cookies ermöglichen es, dass der Kunde beim Wiederaufruf nach Verlassen der Website wiedererkannt wird. Mithilfe der Cookies ist es uns möglich, Nutzungsverhalten des Kunden zu oben genannten Zwecken und in entsprechendem Umfang nachzuvollziehen. Sie sollen dem Kunden außerdem ein optimiertes Surfen auf unserer Website ermöglichen. Auch diese Daten erheben wir nur in anonymisierter bzw. pseudonomisierter Form. Der Kunde kann seinen Internetbrowser so einstellen, dass unsere Cookies nicht auf seinem Endgerät abgelegt werden können oder bereits abgelegte Cookies gelöscht werden.",
      "Hinweis: Denken Sie aber bitte daran, dass Cookies oft verwendet werden, um bestimmte Funktionen auf unserer Webseite zu ermöglichen und zu verbessern. Wenn Sie also die von uns verwendeten Cookies deaktivieren, kann dies Ihr Besuchserlebnis auf der Webseite beeinträchtigen. So kann es zum Beispiel passieren, dass Sie bestimmte Bereiche der Webseite nicht mehr besuchen können und keine personalisierten Informationen erhalten oder die Website nicht richtig dargestellt werden kann.",
      "6. Ihre Rechte",
      "Ihnen stehen grundsätzlich die Rechte auf Auskunft, Berichtigung, Löschung, Einschränkung, Datenübertragbarkeit, Widerruf und Widerspruch zu. Wenn Sie glauben, dass die Verarbeitung Ihrer Daten gegen das Datenschutzrecht verstößt oder Ihre datenschutzrechtlichen Ansprüche sonst in einer Weise verletzt worden sind, kontaktieren Sie bitte umgehend unser Unternehmen.",
      "Sie erreichen uns unter folgenden Kontaktdaten:",
      "Gallhofer GmbH",
      "1040 Wien, Viktorgasse 20 – Hauptsitz 7212 Forchtenstein, Talgasse 23 – Zweigstelle Tel. +4317491456 Email: office@gallhofer-haustechnik.at",
    ],
    contentPending: false,
  },
];

export function rechtsSeiteBySlug(slug: string): ServicePage {
  const found = rechtsSeiten.find((p) => p.slug === slug);
  if (!found) throw new Error(`Unbekannte Rechtsseite: ${slug}`);
  return found;
}
