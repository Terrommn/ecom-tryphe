"use client";

import { useMemo, useState, useTransition } from "react";
import { addLineItemAction } from "@/app/actions/cart";
import { formatMoney } from "@/lib/money";
import { useRouter } from "next/navigation";
import { WishlistButton } from "@/components/wishlist/WishlistButton";

function flattenVariants(product) {
  const edges = product?.variants?.edges;
  if (!edges) return [];
  return edges.map((e) => e.node);
}

function initialSelection(variants) {
  const first = variants.find((v) => v.availableForSale) || variants[0];
  const sel = {};
  first?.selectedOptions?.forEach((o) => {
    sel[o.name] = o.value;
  });
  return sel;
}

export function ProductPurchase({ product }) {
  const router = useRouter();
  const variants = useMemo(() => flattenVariants(product), [product]);

  const [selected, setSelected] = useState(() => initialSelection(variants));
  const [pending, startTransition] = useTransition();
  const [msg, setMsg] = useState(null);

  const activeVariant = useMemo(() => {
    return variants.find((v) =>
      v.selectedOptions?.every((o) => selected[o.name] === o.value),
    );
  }, [variants, selected]);

  const displayPrice = activeVariant?.price;
  const compareAt = activeVariant?.compareAtPrice;

  function setOption(name, value) {
    setSelected((prev) => {
      const next = { ...prev, [name]: value };
      const exact = variants.find((v) =>
        v.selectedOptions?.every((o) => next[o.name] === o.value),
      );
      if (exact) return next;
      const partial = variants.find((v) =>
        v.selectedOptions?.some((o) => o.name === name && o.value === value),
      );
      if (partial) {
        const s = {};
        partial.selectedOptions?.forEach((o) => {
          s[o.name] = o.value;
        });
        return s;
      }
      return next;
    });
  }

  function handleAdd() {
    if (!activeVariant?.id) return;
    setMsg(null);
    startTransition(async () => {
      const res = await addLineItemAction(activeVariant.id, 1);
      if (!res.ok) {
        setMsg(res.error || "No se pudo añadir");
        return;
      }
      if (typeof window !== "undefined") {
        window.dispatchEvent(new Event("store-cart"));
      }
      router.refresh();
    });
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="oob-heading-xl text-3xl md:text-4xl text-[var(--oob-cream)]">
          {product.title}
        </h1>
        {product.productType ? (
          <p className="mt-2 text-sm text-[var(--oob-muted)]">{product.productType}</p>
        ) : null}
        <div className="mt-6 flex flex-wrap items-baseline gap-3">
          {displayPrice ? (
            <span className="text-2xl font-medium text-[var(--oob-gold)]">
              {formatMoney(displayPrice.amount, displayPrice.currencyCode)}
            </span>
          ) : null}
          {compareAt?.amount &&
          Number(compareAt.amount) > Number(displayPrice?.amount || 0) ? (
            <span className="text-lg text-[var(--oob-muted)] line-through">
              {formatMoney(compareAt.amount, compareAt.currencyCode)}
            </span>
          ) : null}
        </div>
      </div>

      {product.options?.length > 0 ? (
        <div className="space-y-4">
          {product.options.map((opt) => (
            <div key={opt.name}>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--oob-muted)] mb-2">
                {opt.name}
              </label>
              <select
                value={selected[opt.name] || ""}
                onChange={(e) => setOption(opt.name, e.target.value)}
                className="w-full max-w-xs rounded-lg border border-[color:var(--oob-border)] bg-[var(--oob-surface)] px-4 py-2.5 text-[var(--oob-cream)] focus:border-[var(--oob-gold)] focus:outline-none focus:ring-1 focus:ring-[var(--oob-gold)]"
              >
                {opt.values.map((val) => (
                  <option key={val} value={val}>
                    {val}
                  </option>
                ))}
              </select>
            </div>
          ))}
        </div>
      ) : null}

      <div className="flex flex-wrap items-center gap-4">
        <button
          type="button"
          disabled={pending || !activeVariant?.availableForSale}
          onClick={handleAdd}
          className="inline-flex items-center justify-center rounded-full bg-[var(--oob-gold)] px-8 py-3.5 text-sm font-semibold uppercase tracking-wider text-[var(--oob-bg)] transition hover:bg-[var(--oob-gold-hover)] disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {pending ? "Añadiendo…" : "Agregar al carrito"}
        </button>
        <WishlistButton handle={product.handle} title={product.title} />
        {activeVariant && !activeVariant.availableForSale ? (
          <span className="text-sm text-[var(--oob-muted)]">Agotado</span>
        ) : null}
      </div>
      {msg ? <p className="text-sm text-red-400">{msg}</p> : null}

      <div className="border-t border-[color:var(--oob-border)] pt-6 text-sm text-[var(--oob-muted)] space-y-2">
        <p>
          <a href="/envios" className="text-[var(--oob-gold)] hover:underline">
            Envíos
          </a>{" "}
          y{" "}
          <a href="/devoluciones" className="text-[var(--oob-gold)] hover:underline">
            devoluciones
          </a>{" "}
          según políticas de la tienda.
        </p>
        {activeVariant?.quantityAvailable != null ? (
          <p>
            Disponibilidad:{" "}
            {activeVariant.availableForSale
              ? `${activeVariant.quantityAvailable} en stock (aprox.)`
              : "No disponible"}
          </p>
        ) : null}
      </div>
    </div>
  );
}
