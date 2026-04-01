export function ProductSpecs({ metafields }) {
  const list = Array.isArray(metafields) ? metafields.filter(Boolean) : [];
  if (!list.length) return null;

  const labels = {
    material: "Material / composición",
    care: "Cuidados",
    specs: "Especificaciones",
  };

  return (
    <div className="mt-10 border-t border-[color:var(--oob-border)] pt-8">
      <h2 className="text-sm font-semibold uppercase tracking-wider text-[var(--oob-gold)] mb-4">
        Ficha técnica
      </h2>
      <dl className="space-y-3 text-sm">
        {list.map((m) => (
          <div key={`${m.namespace}.${m.key}`} className="grid gap-1 sm:grid-cols-[minmax(0,140px)_1fr]">
            <dt className="text-[var(--oob-muted)]">
              {labels[m.key] || m.key}
            </dt>
            <dd className="text-[var(--oob-cream)]">{m.value}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
