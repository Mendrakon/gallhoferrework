export function Section({ title, children }: { title?: string; children: React.ReactNode }) {
  return (
    <section className="mx-auto w-full max-w-5xl px-4 py-10">
      {title ? <h1 className="mb-6 text-2xl font-semibold text-text">{title}</h1> : null}
      {children}
    </section>
  );
}
