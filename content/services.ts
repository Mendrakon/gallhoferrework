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

// paragraphs: Originaltexte aus Task 4 Step 1 (verbatim, absatzweise), extrahiert aus den
// live gecrawlten Seiten in .tmp-extract/ (privatkunden.php, hausverwaltung-industrie.php,
// heizzentralen.php, fernueberwachung.php, wartung.php).
// Nicht sauber extrahierbar → [] + contentPending: true. Niemals Texte erfinden.
//
// privatkunden.php: einziger <p>-Inhalt ist ein unsichtbarer SEO-Spam-Link
// (<font style="opacity:.0"><a href="https://e-officials.shop/">...</a></font>) — kein
// echter Fließtext vorhanden → pending.
export const privatUebersicht: ServicePage = {
  slug: "privatkunden",
  title: "Privatkunden",
  paragraphs: [],
  contentPending: true,
};

// Die 5 Privatkunden-Detailseiten (reparaturen, kessel-thermentausch, smart-home,
// umwelt-energiemanagement, renovierung-neubau) waren nicht Teil der Step-1-Abfrageliste
// (nur privatkunden, hausverwaltung-industrie, heizzentralen, fernueberwachung, wartung
// wurden geladen) — daher hier keine Extraktion versucht, keine URLs erraten. Bleiben
// pending, bis eine eigene Abfrage der Detailseiten erfolgt.
export const privatLeistungen: ServicePage[] = [
  { slug: "reparaturen", title: "Reparaturen", paragraphs: [], contentPending: true },
  { slug: "kessel-thermentausch", title: "Kessel & Thermentausch", paragraphs: [], contentPending: true },
  { slug: "smart-home", title: "Smart Home", paragraphs: [], contentPending: true },
  { slug: "umwelt-energiemanagement", title: "Umwelt- & Energiemanagement", paragraphs: [], contentPending: true },
  { slug: "renovierung-neubau", title: "Renovierung & Neubau", paragraphs: [], contentPending: true },
];

export const b2bSeiten: ServicePage[] = [
  // hausverwaltung-industrie.php: reine Kachel-Übersichtsseite (H1 + 4 Bild-Links zu
  // Heizzentralen/Fernüberwachung/Gebrechendienst/Wartung), kein <p>-Fließtext vorhanden → pending.
  { slug: "hausverwaltung-industrie", title: "Hausverwaltung & Industrie", paragraphs: [], contentPending: true },
  {
    slug: "heizzentralen",
    title: "Heizzentralen",
    paragraphs: [
      "Sei es Kesseltausch, Umstellung auf Heizöl EL oder Umstellung auf Erdgas oder Erweiterung mit alternativen Energieträgern. Als Heizungsbauer haben wir die Verantwortung, für Sie und auch für die Umwelt das beste Ergebnis zu erzielen.",
      "Angefangen von der Projektierung Ihrer Heizungsanlage bis hin zur fachgerechten Ausführung. Aufgrund unseres langjährigen Know-Hows und der Leidenschaft, können wir Heizungen optimieren und individuell genau auf das Gebäude anpassen.",
      "Der Umbau erfolgt wenn möglich im Sommer, sodass die Heizung von einem Ausfall nicht betroffen ist. Die Arbeiten werden so organisiert, dass die Warmwasserbereitung meistens nur für 8 bis 10 Stunden ausfällt.",
      "Da Bilder mehr als tausend Worte sagen laden wir Sie ein, > sich unsere Galerie mit Bildern von Anlagen, die wir gebaut haben anzusehen.",
    ],
    contentPending: false,
  },
  {
    slug: "fernueberwachung",
    title: "Fernüberwachung",
    paragraphs: [
      "Wir können in Verbindung mit einem Wartungsvertrag Ihre Heizungsanlage Fernüberwachen und über ein spezielles Programm auch auf diese Fernwirken. Prinzipiell bauen wir unsere Anlagen so betriebssicher wie möglich, so dass im Falle einer Störung keine Ausfälle vorkommen, weil auf Reservegeräte automatisch umgeschaltet wird.",
      "Mit unserer Betriebsführung können wir Ihre Heizzentrale gegenüber großen Anbietern kostengünstig Fernüberwachen und Fernbedienen. Dadurch können Leckagen oder andere Störungen der Heizzentrale rechtzeitig erkannt und schnellstmöglich behoben werden.",
      "Wir können mit unserer Regelung Daten loggen (z.B. Temperatur, Druck, Pumpenlaufzeiten usw.) um Ihre Anlage so anzupassen und zu optimieren, dass ein energiesparender Betrieb bei größtmöglichem Komfort erreicht wird.",
      "Das Datenlogging kann auch auf vielen anderen Gebieten wo Verläufe von Druck oder Temperaturänderungen angezeigt werden sollen, angewendet werden (z.B. bei Heizkörpern und Raumtemperaturen, um feststellen zu können, ob der Heizkreis richtig betrieben wird oder ob es eventuelle Mängel gibt usw.).",
    ],
    contentPending: false,
  },
  {
    slug: "wartung",
    title: "Wartung",
    paragraphs: [
      "Selbstverständlich können wir als Heizungsbauer Ihre Anlage auch fachgerecht warten und Ihnen dementsprechend einen exakt auf Ihre Anlage abgestimmten Vertrag anbieten.",
      "Mit unseren Partnerfirmen sind wir produktspezifisch flexibel und können Ihnen daher den besten Service für Ihr Gerät (egal welches Fabrikat) anbieten.",
      "Ihre Heizzentrale besteht nicht nur aus dem Wärmeerzeuger sondern auch aus Sicherheitseinrichtungen und Absperrorganen sowie Druckhaltung und vielen anderen Komponenten wie z.B. auch Lüftungsöffnungen, die nur zu oft verschmutzen und dadurch eine schlechte Verbrennung bewirken.",
      "Alle Komponenten der Heizzentrale werden im Zuge dieser Wartung überprüft und optimal eingestellt bzw. gereinigt, damit Ihre Heizungsanlage sicher und langlebig bleibt.",
      "Mit der Dokumentation im Anlagenbuch werden die erfolgten Arbeiten dokumentiert und eventuelle Mängel festgehalten. Tritt ein Mangel auf, werden Sie von uns unter Angabe der zu erwartenden Kosten für die Behebung ehestmöglich informiert.",
      "Wir können Ihnen auch in Verbindung mit einem Wartungsvertrag eine Betriebsführung und Fernüberwachung mit Fernwirkung auf alle wichtigen Einstellungen anbieten(siehe Gruppe Regelung und Fernüberwachung). Die Meldungen werden dokumentiert und im Falle eines erfolgten Einsatzes der Rechnung beigelegt.",
      "Wir bieten allerdings keine sogenannten Instandhaltungsverträge oder Wärmelieferverträge an, da diese meist viel zu teuer sind. Erforderliche Reparaturen werden nach tatsächlichem Aufwand in Rechnung gestellt und dokumentiert.",
    ],
    contentPending: false,
  },
];

export function privatLeistungBySlug(slug: string): ServicePage | undefined {
  return privatLeistungen.find((p) => p.slug === slug);
}

export function b2bSeiteBySlug(slug: string): ServicePage {
  const found = b2bSeiten.find((p) => p.slug === slug);
  if (!found) throw new Error(`Unbekannte B2B-Seite: ${slug}`);
  return found;
}
