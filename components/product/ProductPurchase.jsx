"use client";

import { useMemo, useState, useTransition } from "react";
import { addLineItemAction } from "@/app/actions/cart";
import { formatMoney } from "@/lib/money";
import { useRouter, useSearchParams } from "next/navigation";
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
  const searchParams = useSearchParams();
  const isFlashSale = searchParams.get("oferta") === "relampago";
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

  // Flash sale: calcular precio con 15% OFF
  const flashPrice = useMemo(() => {
    if (!isFlashSale || !displayPrice?.amount) return null;
    return (Number(displayPrice.amount) * 0.85).toFixed(2);
  }, [isFlashSale, displayPrice]);

  // Detectar si la variante seleccionada es 100ml
  const is100ml = useMemo(() => {
    const title = (activeVariant?.title ?? "").toLowerCase();
    return title.includes("100");
  }, [activeVariant]);

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
      const attrs = isFlashSale
        ? [{ key: "_source", value: "flash_sale" }]
        : [];
      const res = await addLineItemAction(activeVariant.id, 1, attrs);
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
    <div className="space-y-9">
      {/* Flash sale banner */}
      {isFlashSale && (
        <div className="border-2 px-5 py-4 text-center" style={{ borderColor: "#39FF14", backgroundColor: "rgba(57,255,20,0.06)" }}>
          <p className="text-[10px] font-bold uppercase tracking-[0.3em]" style={{ color: "#39FF14" }}>
            ⚡ Oferta Relámpago — 15% OFF
          </p>
          <p className="mt-1 text-xs text-neutral-600">
            Este descuento desaparece cuando termine el cronómetro.
          </p>
        </div>
      )}

      {/* Kicker + Title */}
      <div>
        {product.productType && (
          <p className="text-[9px] font-bold uppercase tracking-[0.4em] text-neutral-400 mb-3">
            {product.productType}
          </p>
        )}
        <h1 className="font-serif text-[clamp(1.75rem,3.5vw,2.5rem)] font-medium leading-[1.08] text-neutral-950">
          {product.title}
        </h1>
      </div>

      {/* Price */}
      <div className="flex flex-wrap items-baseline gap-3">
        {isFlashSale && flashPrice ? (
          <>
            <span className="font-serif text-2xl font-medium" style={{ color: "#22c55e" }}>
              {formatMoney(flashPrice, displayPrice.currencyCode)}
            </span>
            <span className="text-sm text-neutral-400 line-through">
              {formatMoney(displayPrice.amount, displayPrice.currencyCode)}
            </span>
          </>
        ) : (
          <>
            {displayPrice && (
              <span className="font-serif text-2xl font-medium text-neutral-950">
                {formatMoney(displayPrice.amount, displayPrice.currencyCode)}
              </span>
            )}
            {compareAt?.amount &&
            Number(compareAt.amount) > Number(displayPrice?.amount || 0) ? (
              <span className="text-sm text-neutral-400 line-through">
                {formatMoney(compareAt.amount, compareAt.currencyCode)}
              </span>
            ) : null}
          </>
        )}
      </div>

      <div className="h-px bg-neutral-950/10" />

      {/* Variant selector */}
      {product.options?.filter(
        (opt) => !(opt.name === "Title" && opt.values.length === 1 && opt.values[0] === "Default Title"),
      ).length > 0 && (
        <div className="space-y-5">
          {product.options.filter(
            (opt) => !(opt.name === "Title" && opt.values.length === 1 && opt.values[0] === "Default Title"),
          ).map((opt) => (
            <div key={opt.name}>
              <label className="block text-[9px] font-bold uppercase tracking-[0.35em] text-neutral-400 mb-3">
                {opt.name}
              </label>
              <div className="flex flex-wrap gap-2">
                {opt.values.map((val) => {
                  const isActive = selected[opt.name] === val;
                  return (
                    <button
                      key={val}
                      type="button"
                      onClick={() => setOption(opt.name, val)}
                      className={`px-5 py-2.5 text-xs font-medium tracking-wide border transition-all duration-200 ${
                        isActive
                          ? "border-neutral-950 text-neutral-950 bg-neutral-950/[0.04]"
                          : "border-neutral-300 text-neutral-500 hover:border-neutral-950 hover:text-neutral-950"
                      }`}
                    >
                      {val}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* CTA */}
      <div className="space-y-3 pt-1">
        <button
          type="button"
          disabled={pending || !activeVariant?.availableForSale}
          onClick={handleAdd}
          className={`w-full py-4 text-[10px] font-bold uppercase tracking-[0.25em] transition-colors disabled:opacity-40 disabled:cursor-not-allowed ${
            isFlashSale
              ? "text-black hover:brightness-110"
              : "bg-neutral-950 text-[#faf9f7] hover:bg-neutral-800"
          }`}
          style={isFlashSale ? { backgroundColor: "#39FF14" } : undefined}
        >
          {pending
            ? "Añadiendo…"
            : activeVariant && !activeVariant.availableForSale
              ? "Agotado"
              : isFlashSale
                ? "Agregar con 15% OFF"
                : "Agregar al carrito"}
        </button>
        <WishlistButton handle={product.handle} title={product.title} />
      </div>

      {msg && <p className="text-sm text-red-500">{msg}</p>}

      {/* SANTOR Effect promo — solo si es 100ml y NO es oferta relámpago */}
      {is100ml && !isFlashSale && (
        <div className="border border-neutral-200 bg-neutral-950 p-5">
          <p className="text-[9px] font-bold tracking-[0.4em] uppercase text-[#a17952] mb-2">
            Desbloquea el SANTOR Effect
          </p>
          <p className="text-[13px] text-[#faf9f7] leading-relaxed">
            Compra 2 perfumes de 100ml y{" "}
            <span className="font-semibold text-[#d4a574]">
              llévate 1 de 60ml + Jabón GRATIS
            </span>
            . Revisa tu carrito para activarlo.
          </p>
        </div>
      )}

      {/* Flash sale: aviso de que no aplica SANTOR Effect */}
      {is100ml && isFlashSale && (
        <div className="border border-amber-200 bg-amber-50 px-5 py-3">
          <p className="text-[11px] text-amber-800">
            <strong>Nota:</strong> La Oferta Relámpago no es acumulable con el SANTOR Effect.
          </p>
        </div>
      )}

      {/* Shipping info */}
      <div className="pt-2 text-[11px] text-neutral-400 space-y-1.5">
        <p>Envío gratis en pedidos arriba de $1,000.</p>
        <p>
          <a
            href="/envios"
            className="underline underline-offset-4 decoration-neutral-300 transition-colors hover:text-neutral-950 hover:decoration-neutral-950"
          >
            Envíos
          </a>{" "}
          y{" "}
          <a
            href="/devoluciones"
            className="underline underline-offset-4 decoration-neutral-300 transition-colors hover:text-neutral-950 hover:decoration-neutral-950"
          >
            devoluciones
          </a>{" "}
          según políticas de la tienda.
        </p>
      </div>
    </div>
  );
}
