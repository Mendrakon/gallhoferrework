// Dateinamen relativ zu public/galerie/ — nur tatsächlich vorhandene Dateien eintragen.
//
// Quelle: https://www.gallhofer-haustechnik.at/galerie.php (Avada/Fusion-Theme, Fusion-Gallery-
// Element). Die Seite zeigt 10 Vorher/Nachher-Projektfotos, verlinkt je als <a
// href="wp-content/uploads/2018/08/*.jpg" data-attachment-id="…" data-type="image"
// class="fg-thumb"> (Original/Lightbox-Ziel). Die zugehörigen <img data-src-fg="…/<hash>.jpg">
// in denselben <a>-Tags sind nur die 250×200-Grid-Vorschaubilder (Fusion-Thumbnail-Cache in
// einem nach dem Originalnamen benannten Unterordner) und wurden bewusst NICHT übernommen.
// Ebenfalls ausgeschlossen: Header-Logo (logo-gallhofer-5.png, mob_logo.png) und
// Favicon-Crops (cropped-icons8-heizung-64-1-*x*.png) — beide liegen zwar unter
// wp-content/uploads/, sind aber kein Galerie-Inhalt, sondern Seiten-Chrome bzw. Site-Icon.
// Alle 10 Originale erfolgreich geladen (HTTP 200, echte JPEGs per Magic-Bytes/`file` geprüft).
export const galerieBilder: string[] = [
  "bild-1.jpg",
  "bild-2.jpg",
  "bild-3.jpg",
  "bild-4.jpg",
  "bild-5.jpg",
  "bild-6.jpg",
  "bild-7.jpg",
  "bild-8.jpg",
  "bild-9.jpg",
  "bild-10.jpg",
];
