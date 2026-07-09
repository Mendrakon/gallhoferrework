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
