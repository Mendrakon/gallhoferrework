import type { StaticImageData } from "next/image";
import img_kesselThermentausch_1 from "@/public/leistungen/gallery/kessel-thermentausch-1.jpg";
import img_kesselThermentausch_2 from "@/public/leistungen/gallery/kessel-thermentausch-2.jpg";
import img_kesselThermentausch_3 from "@/public/leistungen/gallery/kessel-thermentausch-3.jpg";
import img_smartHome_1 from "@/public/leistungen/gallery/smart-home-1.jpg";
import img_smartHome_2 from "@/public/leistungen/gallery/smart-home-2.jpg";
import img_smartHome_3 from "@/public/leistungen/gallery/smart-home-3.jpg";
import img_smartHome_4 from "@/public/leistungen/gallery/smart-home-4.jpg";
import img_smartHome_5 from "@/public/leistungen/gallery/smart-home-5.jpg";
import img_umweltEnergiemanagement_1 from "@/public/leistungen/gallery/umwelt-energiemanagement-1.jpg";
import img_umweltEnergiemanagement_2 from "@/public/leistungen/gallery/umwelt-energiemanagement-2.jpg";
import img_umweltEnergiemanagement_3 from "@/public/leistungen/gallery/umwelt-energiemanagement-3.jpg";
import img_umweltEnergiemanagement_4 from "@/public/leistungen/gallery/umwelt-energiemanagement-4.jpg";
import img_umweltEnergiemanagement_5 from "@/public/leistungen/gallery/umwelt-energiemanagement-5.jpg";
import img_umweltEnergiemanagement_6 from "@/public/leistungen/gallery/umwelt-energiemanagement-6.jpg";
import img_heizzentralen_1 from "@/public/leistungen/gallery/heizzentralen-1.jpg";
import img_heizzentralen_2 from "@/public/leistungen/gallery/heizzentralen-2.jpg";
import img_heizzentralen_3 from "@/public/leistungen/gallery/heizzentralen-3.jpg";
import img_heizzentralen_4 from "@/public/leistungen/gallery/heizzentralen-4.jpg";
import img_fernueberwachung_1 from "@/public/leistungen/gallery/fernueberwachung-1.jpg";
import img_fernueberwachung_2 from "@/public/leistungen/gallery/fernueberwachung-2.jpg";
import img_fernueberwachung_3 from "@/public/leistungen/gallery/fernueberwachung-3.png";
import img_fernueberwachung_4 from "@/public/leistungen/gallery/fernueberwachung-4.png";
import img_fernueberwachung_5 from "@/public/leistungen/gallery/fernueberwachung-5.png";
import img_fernueberwachung_6 from "@/public/leistungen/gallery/fernueberwachung-6.png";
import img_fernueberwachung_7 from "@/public/leistungen/gallery/fernueberwachung-7.png";
import img_fernueberwachung_8 from "@/public/leistungen/gallery/fernueberwachung-8.png";

// Original-Galeriebilder je Leistungs-Detailseite (verbatim aus wp-content/uploads der
// Alt-Seite; Thumbnails/Größenvarianten und Header-/Favicon-Assets ausgeschlossen).
// Seiten ohne eigene Galerie fehlen hier bewusst (Reparaturen, Wartung, Gebrechendienst,
// Renovierung & Neubau — deren einziges Bild ist bereits das Hero).
export const galleryBySlug: Record<string, StaticImageData[]> = {
  "kessel-thermentausch": [img_kesselThermentausch_1, img_kesselThermentausch_2, img_kesselThermentausch_3],
  "smart-home": [img_smartHome_1, img_smartHome_2, img_smartHome_3, img_smartHome_4, img_smartHome_5],
  "umwelt-energiemanagement": [img_umweltEnergiemanagement_1, img_umweltEnergiemanagement_2, img_umweltEnergiemanagement_3, img_umweltEnergiemanagement_4, img_umweltEnergiemanagement_5, img_umweltEnergiemanagement_6],
  "heizzentralen": [img_heizzentralen_1, img_heizzentralen_2, img_heizzentralen_3, img_heizzentralen_4],
  "fernueberwachung": [
    img_fernueberwachung_1,
    img_fernueberwachung_2,
    img_fernueberwachung_3,
    img_fernueberwachung_4,
    img_fernueberwachung_5,
    img_fernueberwachung_6,
    img_fernueberwachung_7,
    img_fernueberwachung_8,
  ],
};
