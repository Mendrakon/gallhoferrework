import type { Location } from "@/content/locations";

export function LocationCard({ location }: { location: Location }) {
  return (
    <address className="text-sm not-italic leading-relaxed">
      <strong className="font-medium">{location.name}:</strong>
      <br />
      {location.postalCode} {location.city}
      <br />
      {location.street}
      {location.note ? ` ${location.note}` : ""}
      <br />
      Büro:{" "}
      <a href={location.phoneHref} className="text-brand hover:text-brand-dark">
        {location.phone}
      </a>
    </address>
  );
}
