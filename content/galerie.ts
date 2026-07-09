import type { StaticImageData } from "next/image";
import bild1 from "@/public/galerie/bild-1.jpg";
import bild2 from "@/public/galerie/bild-2.jpg";
import bild3 from "@/public/galerie/bild-3.jpg";
import bild4 from "@/public/galerie/bild-4.jpg";
import bild5 from "@/public/galerie/bild-5.jpg";
import bild6 from "@/public/galerie/bild-6.jpg";
import bild7 from "@/public/galerie/bild-7.jpg";
import bild8 from "@/public/galerie/bild-8.jpg";
import bild9 from "@/public/galerie/bild-9.jpg";
import bild10 from "@/public/galerie/bild-10.jpg";

// Quelle: https://www.gallhofer-haustechnik.at/galerie.php (Avada/Fusion-Gallery). 10 Original-
// Projektfotos aus wp-content/uploads/2018/08; Thumbnails/Größenvarianten, Header-/Favicon-
// Assets ausgeschlossen. Als statische Imports eingebunden (korrekte Bildmaße für die Lightbox).
export const galerieImages: StaticImageData[] = [
  bild1,
  bild2,
  bild3,
  bild4,
  bild5,
  bild6,
  bild7,
  bild8,
  bild9,
  bild10,
];
