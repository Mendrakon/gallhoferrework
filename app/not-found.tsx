import Link from "next/link";
import { Section } from "@/components/section";

export default function NotFound() {
  return (
    <Section title="Seite nicht gefunden">
      <p className="mb-4">Diese Seite existiert nicht (mehr).</p>
      <Link href="/" className="text-brand underline hover:text-brand-dark">
        Zur Startseite
      </Link>
    </Section>
  );
}
