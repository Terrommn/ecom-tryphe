export function ProductSpecs({ metafields }) {
  const list = Array.isArray(metafields) ? metafields.filter(Boolean) : [];
  if (!list.length) return null;

  const labels = {
    material: "Material / composición",
    care: "Cuidados",
    specs: "Especificaciones",
  };

  return (
    <div className="mt-14">
      <div className="h-px bg-neutral-950/10 mb-10" />
      <p className="text-[9px] font-bold uppercase tracking-[0.4em] text-neutral-400 mb-6">
        Ficha técnica
      </p>
      <dl className="space-y-4 text-sm">
        {list.map((m) => (
          <div
            key={`${m.namespace}.${m.key}`}
            className="grid gap-1 sm:grid-cols-[160px_1fr]"
          >
            <dt className="text-neutral-400 text-xs uppercase tracking-wider">
              {labels[m.key] || m.key}
            </dt>
            <dd className="text-neutral-800">{m.value}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
