"use client";

import Link from "next/link";

function toFlat(sp) {
  if (!sp || typeof sp !== "object") return {};
  const out = {};
  for (const [k, v] of Object.entries(sp)) {
    out[k] = Array.isArray(v) ? v[0] : v;
  }
  return out;
}

function withQuery(basePath, flat, patch) {
  const merged = { ...toFlat(flat), ...patch };
  delete merged.cursor;
  const p = new URLSearchParams();
  Object.entries(merged).forEach(([k, v]) => {
    if (v !== undefined && v !== null && String(v) !== "") {
      p.set(k, String(v));
    }
  });
  const q = p.toString();
  return q ? `${basePath}?${q}` : basePath;
}

export function CollectionToolbar({ handle, searchParams: sp }) {
  const basePath = `/collections/${handle}`;
  const flat = toFlat(sp);
  const currentSort = flat.sort || "manual";
  const view = flat.view === "list" ? "list" : "grid";
  const minPrice = flat.minPrice || "";
  const maxPrice = flat.maxPrice || "";
  const available = flat.available === "1";

  const gridHref = withQuery(basePath, flat, { view: "grid" });
  const listHref = withQuery(basePath, flat, { view: "list" });

  return (
    <div className="flex flex-col gap-6 lg:flex-row lg:flex-wrap lg:items-end lg:justify-between">
      <form
        method="get"
        action={basePath}
        className="flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-end"
      >
        {view === "list" ? <input type="hidden" name="view" value="list" /> : null}
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--oob-muted)] mb-1">
            Ordenar
          </label>
          <select
            name="sort"
            defaultValue={currentSort}
            onChange={(e) => e.target.form?.submit()}
            className="rounded-lg border border-[color:var(--oob-border)] bg-[var(--oob-surface)] px-3 py-2 text-sm text-[var(--oob-cream)]"
          >
            <option value="manual">Destacados</option>
            <option value="bestselling">Más vendido</option>
            <option value="newest">Más nuevo</option>
            <option value="price-asc">Precio: menor a mayor</option>
            <option value="price-desc">Precio: mayor a menor</option>
            <option value="name">Nombre A–Z</option>
          </select>
        </div>
        <div className="flex gap-2">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--oob-muted)] mb-1">
              Precio min
            </label>
            <input
              name="minPrice"
              type="number"
              step="0.01"
              min="0"
              defaultValue={minPrice}
              placeholder="0"
              className="w-24 rounded-lg border border-[color:var(--oob-border)] bg-[var(--oob-surface)] px-2 py-2 text-sm text-[var(--oob-cream)]"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--oob-muted)] mb-1">
              Precio max
            </label>
            <input
              name="maxPrice"
              type="number"
              step="0.01"
              min="0"
              defaultValue={maxPrice}
              className="w-24 rounded-lg border border-[color:var(--oob-border)] bg-[var(--oob-surface)] px-2 py-2 text-sm text-[var(--oob-cream)]"
            />
          </div>
        </div>
        <label className="flex items-center gap-2 text-sm text-[var(--oob-cream)] cursor-pointer">
          <input
            type="checkbox"
            name="available"
            value="1"
            defaultChecked={available}
            className="rounded border-[color:var(--oob-border)]"
          />
          Solo disponibles
        </label>
        <button
          type="submit"
          className="rounded-full border border-[var(--oob-gold)] px-4 py-2 text-sm font-medium text-[var(--oob-gold)] hover:bg-[var(--oob-gold)] hover:text-[var(--oob-bg)] transition-colors"
        >
          Aplicar filtros
        </button>
      </form>

      <div className="flex items-center gap-2">
        <span className="text-xs text-[var(--oob-muted)] uppercase tracking-wider">Vista</span>
        <Link
          href={gridHref}
          className={`rounded px-3 py-1.5 text-sm ${view === "grid" ? "bg-[var(--oob-gold)] text-[var(--oob-bg)]" : "border border-[color:var(--oob-border)] text-[var(--oob-cream)]"}`}
        >
          Cuadrícula
        </Link>
        <Link
          href={listHref}
          className={`rounded px-3 py-1.5 text-sm ${view === "list" ? "bg-[var(--oob-gold)] text-[var(--oob-bg)]" : "border border-[color:var(--oob-border)] text-[var(--oob-cream)]"}`}
        >
          Lista
        </Link>
      </div>
    </div>
  );
}
