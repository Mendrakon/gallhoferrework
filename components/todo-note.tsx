export function TodoNote({ children }: { children?: React.ReactNode }) {
  return (
    <aside role="note" className="border border-line bg-surface px-4 py-3 text-sm text-muted">
      <strong className="font-medium text-text">⚠️ Inhalt folgt — wird vom Betrieb geliefert.</strong>
      {children ? <div className="mt-1">{children}</div> : null}
    </aside>
  );
}
