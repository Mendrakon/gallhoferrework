export interface ServiceItem {
  title: string;
  body: string;
}

// Ein Inhaltsblock einer Leistungsseite: Zwischenüberschrift oder Absatz (verbatim aus der Alt-Seite).
export type ContentBlock =
  | { type: "heading"; text: string }
  | { type: "paragraph"; text: string };

export interface ServicePage {
  slug: string;
  title: string;
  blocks: ContentBlock[];
  contentPending: boolean;
}

// Hilfsfunktion: reine Absatz-Listen (z. B. Rechtstexte) in Blöcke wandeln.
export function asParagraphs(texts: string[]): ContentBlock[] {
  return texts.map((text) => ({ type: "paragraph", text }));
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

// blocks: Originalinhalte der Live-Seiten, verbatim (Absätze UND Zwischenüberschriften in
// Reihenfolge). Nicht sauber extrahierbar → [] + contentPending: true. Niemals Texte erfinden.
// Der site-weite SEO-Spam (versteckte Divs, Pharma-Links) liegt außerhalb aller <h*>/<p>-Tags
// und wurde nachweislich nicht übernommen (Spam-Keyword-Scan über die Extraktion: 0 Treffer).
export const privatUebersicht: ServicePage = {
  slug: "privatkunden",
  title: "Privatkunden",
  blocks: [],
  contentPending: true,
};

export const privatLeistungen: ServicePage[] = [
  {
    slug: "reparaturen",
    title: "Reparaturen",
    blocks: [
    { type: "heading", text: "Leistungsbereiche:" },
    { type: "paragraph", text: "Abflussverstopfung: Vom Badezimmer Abfluss bis hin zu Ihrem WC- oder Terrassen Abfluss können wir mit unserem kompakten Spezialwerkzeug Verstopfungen beheben." },
    { type: "paragraph", text: "Leitungsgebrechen: Bei Leitungsgebrechen in der Wasser-, Heizungs- oder Abflussleitung sind wir der richtige Ansprechpartner für Sie. Es wird jeder Schaden mit sämtlichen Folgeschäden für die Versicherung mit Fotos dokumentiert (jeweils vor und nach der Reparatur). Die Behebungen sämtlicher Folge- und Nebenschäden können wir selbstverständlich auch für Sie mit unseren Partnerfirmen übernehmen. Wenn möglich, kann die Schadenabwicklung auch direkt über Ihre Versicherung erfolgen." },
    { type: "paragraph", text: "Leckortung: Im Rahmen der Gebrechenssuche führen wir wenn notwendig auch jede Art von Leckortung mit Partnerfirmen durch." },
    { type: "paragraph", text: "Gasleitung: Leckagen in der Gasleitung können wir für Sie fachgerecht und wahlweise ohne Stemmarbeiten mittels flüssigem Dichtmittel wieder Instand setzen." },
    { type: "paragraph", text: "Störungen in Heizungsanlagen: Sie haben ein schon lang andauerndes oder erst kürzlich aufgetretenes Problem in Ihrer Heizungsanlage? Unsere langjährige Erfahrung im Heizungsbau auch in alten Gebäuden und daher auch alten Heizsystemen kommt Ihnen hier zu Gute. Die Heizungshydraulik ist oft und vor allem in alten Gebäuden sehr komplex. Wir finden heraus wo der Schuh drückt und bieten Ihnen kompetente Lösungen an." },
    ],
    contentPending: false,
  },
  {
    slug: "kessel-thermentausch",
    title: "Kessel & Thermentausch",
    blocks: [
    { type: "paragraph", text: "Sie haben einen veralteten Heizkessel oder eine defekte Therme? Wir beraten Sie gerne und führen kompetent den Tausch Ihres Wärmeerzeugers durch. Der Umbau erfolgt wenn möglich immer so, dass Ihre Warmwasserversorgung oder die Heizung so kurz wie möglich unterbrochen werden." },
    { type: "paragraph", text: "Unsere langjährige Erfahrung als Heizungsbauer kommt Ihnen hier zu Gute. Wir können für Sie die nötigen Umbauarbeiten hydraulisch sowie auch regelungstechnisch planen und umsetzen. Mit unseren Partnern, den Herstellern von Wärmeerzeugern und in der Regelungstechnik, decken wir ein sehr großes Spektrum ab und können Ihnen individuelle und genau auf Sie abgestimmte Lösungen anbieten. Dokumentationen und Pläne erstellen wir auf Wunsch mittels CAD – Software fachgerecht und individuell für Ihre Anlage." },
    ],
    contentPending: false,
  },
  {
    slug: "smart-home",
    title: "Smart Home",
    blocks: [
    { type: "paragraph", text: "Mit uns kann auch Ihre Heizung Smart werden. Folgende Bereiche können wir Ihnen anbieten:" },
    { type: "heading", text: "Wohnungsregelung:" },
    { type: "paragraph", text: "Egal welchen Wärmeerzeuger Sie installiert haben oder installieren wollen. Im Bereich der Wohnungsregelung können wir Ihnen mit dem Produkt der Marke Honeywell Evo Home ein starkes und stabiles Produkt anbieten welches Ihre Heizkörper und/oder auch Ihre Therme oder Fernwärme individuell regelt. Eine Fernsteuerung lässt sich problemlos ausführen. Wir beraten Sie gerne! Mehr unter : https://getconnected.honeywell.com/de/thermostate/evohome" },
    { type: "heading", text: "Einfamilienhäuser:" },
    { type: "paragraph", text: "Mit den Produkten bevorzugt der Firmen „Viessmann“ und „Technische Alternative“ wird auch die Heizung Ihres Einfamilienhauses Smart und bietet mehr Komfort bei gleichzeitiger Energieeinsparung durch exaktes Regeln." },
    { type: "paragraph", text: "Die Software kann auch in Kombination mit Alternativ-Energien wie Solaranlagen, Wärmepumpen usw. eingesetzt werden. Hier kann eine individuelle Regelung Ihren Komfort und auch Ihre Heizkosten optimieren. Egal wie Ihre Anlage ausgeführt ist, wir können die Software für Sie individuell programmieren. Beachten Sie auch unsere Leistungen im Bereich > Umwelt und Energie" },
    ],
    contentPending: false,
  },
  {
    slug: "umwelt-energiemanagement",
    title: "Umwelt- & Energiemanagement",
    blocks: [
    { type: "heading", text: "Regenwassernutzung:" },
    { type: "paragraph", text: "Unsere Rohstoffe sind allesamt wertvoll und manche auch sogar begrenzt. Auch Wasser wird eines Tages sehr wertvoll sein. Daher bieten wir Ihnen auch unser Know-How im Bereich der Regenwassernutzung an." },
    { type: "heading", text: "Alternativ Energie – Solar Thermie:" },
    { type: "paragraph", text: "Die Sonne ist eine für uns unerschöpfliche Energiequelle. Warum diese dann nicht nutzen?" },
    { type: "paragraph", text: "Mit Sonnenkollektoren der Marke Viessmann mit Therm – Protect optimieren wir Ihre Heizung unabhängig davon ob nur Warmwasser, Ihre Heizung oder auch das Schwimmbad unterstützt werden soll. Neben den Standard-Solarregelungen können wir eine von uns individuell programmierte Regelung anbieten, da wir eine „echte Speicher Nachheizunterdrückung“ umsetzen und somit auch im Gegensatz zu Standard-Regelungen die Sonnenenergie optimal nutzen. Gerne beraten wir Sie diesbezüglich." },
    { type: "paragraph", text: "!!Wartung!! Auch eine Solaranlage gehört fachgerecht gewartet. Wir empfehlen eine Wartung je nach Anlagengröße von jährlich bis hin zu 3-Jahres Abständen. Gerne können wir Ihnen auch ein Wartungsangebot erstellen." },
    { type: "heading", text: "Alternativ Energie – Wärmepumpe:" },
    { type: "paragraph", text: "Im Neubau wird derzeit zu recht die Wärmepumpe forciert. Hier können wir Ihr Projekt mit den Herstellern Viessmann und Ochsner oder einem Ihrer Favoriten fachgerecht und effizient umsetzen. Selbstverständlich auch mit individuell programmierbarer Regelung der Technischen Alternative." },
    { type: "heading", text: "Alternativ Energie – Pellets oder Festbrennstoff:" },
    { type: "paragraph", text: "Unter den erneuerbaren Energiequellen zählen die Brennstoffe Pellets, Hackgut und unser gutes altes Scheitholz zu den wichtigsten Energielieferanten. Mit unserem starken österreichischen Partner Hargassner oder die Firma Viessmann planen wir gerne Ihre Holzheizung und setzen Ihr Projekt um." },
    ],
    contentPending: false,
  },
  {
    // Live-Datei renovierung-und-neubau.php — Dateiname weicht vom Routen-Slug ab.
    slug: "renovierung-neubau",
    title: "Renovierung & Neubau",
    blocks: [
    { type: "paragraph", text: "Folgende Projekte können wir für Sie umsetzen:" },
    { type: "paragraph", text: "Projektierung und Installation von Heizungs-, Klima-, Lüftungs- und Sanitärinstallationen für Wohnungssanierung, Dachgeschoßausbau oder Einfamilienhäuser. Wir sind gerne Ihr Partner für Ihr Projekt, helfen Ihnen bei der Planung und setzen Ihr Projekt fachgerecht um." },
    { type: "paragraph", text: "Natürlich erstellen wir auch gerne alle notwendigen Unterlagen für Einreichungen und Meldungen bei der zuständigen Gemeinde." },
    ],
    contentPending: false,
  },
];

export const b2bSeiten: ServicePage[] = [
  // hausverwaltung-industrie.php: reine Kachel-Übersichtsseite ohne Fließtext → pending.
  { slug: "hausverwaltung-industrie", title: "Hausverwaltung & Industrie", blocks: [], contentPending: true },
  {
    slug: "heizzentralen",
    title: "Heizzentralen",
    blocks: [
    { type: "paragraph", text: "Sei es Kesseltausch, Umstellung auf Heizöl EL oder Umstellung auf Erdgas oder Erweiterung mit alternativen Energieträgern. Als Heizungsbauer haben wir die Verantwortung, für Sie und auch für die Umwelt das beste Ergebnis zu erzielen." },
    { type: "paragraph", text: "Angefangen von der Projektierung Ihrer Heizungsanlage bis hin zur fachgerechten Ausführung. Aufgrund unseres langjährigen Know-Hows und der Leidenschaft, können wir Heizungen optimieren und individuell genau auf das Gebäude anpassen." },
    { type: "paragraph", text: "Der Umbau erfolgt wenn möglich im Sommer, sodass die Heizung von einem Ausfall nicht betroffen ist. Die Arbeiten werden so organisiert, dass die Warmwasserbereitung meistens nur für 8 bis 10 Stunden ausfällt." },
    { type: "paragraph", text: "Da Bilder mehr als tausend Worte sagen laden wir Sie ein, > sich unsere Galerie mit Bildern von Anlagen, die wir gebaut haben anzusehen." },
    ],
    contentPending: false,
  },
  {
    slug: "fernueberwachung",
    title: "Fernüberwachung",
    blocks: [
    { type: "paragraph", text: "Wir können in Verbindung mit einem Wartungsvertrag Ihre Heizungsanlage Fernüberwachen und über ein spezielles Programm auch auf diese Fernwirken. Prinzipiell bauen wir unsere Anlagen so betriebssicher wie möglich, so dass im Falle einer Störung keine Ausfälle vorkommen, weil auf Reservegeräte automatisch umgeschaltet wird." },
    { type: "paragraph", text: "Mit unserer Betriebsführung können wir Ihre Heizzentrale gegenüber großen Anbietern kostengünstig Fernüberwachen und Fernbedienen. Dadurch können Leckagen oder andere Störungen der Heizzentrale rechtzeitig erkannt und schnellstmöglich behoben werden." },
    { type: "paragraph", text: "Wir können mit unserer Regelung Daten loggen (z.B. Temperatur, Druck, Pumpenlaufzeiten usw.) um Ihre Anlage so anzupassen und zu optimieren, dass ein energiesparender Betrieb bei größtmöglichem Komfort erreicht wird." },
    { type: "paragraph", text: "Das Datenlogging kann auch auf vielen anderen Gebieten wo Verläufe von Druck oder Temperaturänderungen angezeigt werden sollen, angewendet werden (z.B. bei Heizkörpern und Raumtemperaturen, um feststellen zu können, ob der Heizkreis richtig betrieben wird oder ob es eventuelle Mängel gibt usw.)." },
    ],
    contentPending: false,
  },
  {
    slug: "wartung",
    title: "Wartung",
    blocks: [
    { type: "paragraph", text: "Selbstverständlich können wir als Heizungsbauer Ihre Anlage auch fachgerecht warten und Ihnen dementsprechend einen exakt auf Ihre Anlage abgestimmten Vertrag anbieten." },
    { type: "paragraph", text: "Mit unseren Partnerfirmen sind wir produktspezifisch flexibel und können Ihnen daher den besten Service für Ihr Gerät (egal welches Fabrikat) anbieten." },
    { type: "paragraph", text: "Ihre Heizzentrale besteht nicht nur aus dem Wärmeerzeuger sondern auch aus Sicherheitseinrichtungen und Absperrorganen sowie Druckhaltung und vielen anderen Komponenten wie z.B. auch Lüftungsöffnungen, die nur zu oft verschmutzen und dadurch eine schlechte Verbrennung bewirken." },
    { type: "paragraph", text: "Alle Komponenten der Heizzentrale werden im Zuge dieser Wartung überprüft und optimal eingestellt bzw. gereinigt, damit Ihre Heizungsanlage sicher und langlebig bleibt." },
    { type: "paragraph", text: "Mit der Dokumentation im Anlagenbuch werden die erfolgten Arbeiten dokumentiert und eventuelle Mängel festgehalten. Tritt ein Mangel auf, werden Sie von uns unter Angabe der zu erwartenden Kosten für die Behebung ehestmöglich informiert." },
    { type: "paragraph", text: "Wir können Ihnen auch in Verbindung mit einem Wartungsvertrag eine Betriebsführung und Fernüberwachung mit Fernwirkung auf alle wichtigen Einstellungen anbieten(siehe Gruppe Regelung und Fernüberwachung). Die Meldungen werden dokumentiert und im Falle eines erfolgten Einsatzes der Rechnung beigelegt." },
    { type: "paragraph", text: "Wir bieten allerdings keine sogenannten Instandhaltungsverträge oder Wärmelieferverträge an, da diese meist viel zu teuer sind. Erforderliche Reparaturen werden nach tatsächlichem Aufwand in Rechnung gestellt und dokumentiert." },
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
