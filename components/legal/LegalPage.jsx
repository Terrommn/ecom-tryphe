export function LegalPage({ title, updated, children }) {
  return (
    <article className="oob-container max-w-3xl py-12 md:py-16">
      <h1 className="oob-heading-xl text-3xl md:text-4xl text-[var(--oob-cream)] mb-2">
        {title}
      </h1>
      {updated ? (
        <p className="text-xs text-[var(--oob-muted)] mb-10">Última actualización: {updated}</p>
      ) : null}
      <div className="prose prose-sm max-w-none text-[var(--oob-muted)] [&_p]:text-[var(--oob-cream)] [&_h2]:text-[var(--oob-fairway)] [&_h2]:text-lg [&_h2]:font-semibold [&_h2]:mt-8 [&_h2]:mb-3">
        {children}
      </div>
    </article>
  );
}
