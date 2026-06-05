"use client";

import Image from "next/image";
import Link from "next/link";
import { getProductHref } from "@/lib/product-href";
import { useTransition, useState } from "react";
import { useRouter } from "next/navigation";
import {
  updateLineQuantityAction,
  removeLineAction,
  applyDiscountFormAction,
  addLineItemAction,
  applyDiscountAction,
  getSantorFreeVariantId,
  getSantorPocketVariantId,
} from "@/app/actions/cart";
import { formatMoney } from "@/lib/money";

export function CartLines({ cart }) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [giftPending, startGiftTransition] = useTransition();
  const [giftMsg, setGiftMsg] = useState(null);
  const [santorEffectDismissed, setSantorEffectDismissed] = useState(false);
  const lines = cart?.lines?.edges ?? [];

  // ── SANTOR Effect: 2+ perfumes de 100ml a precio regular desbloquea 60ml + jabón gratis ──
  const regular100mlQty = lines.reduce((sum, { node: line }) => {
    const varTitle = (line.merchandise?.title ?? "").toLowerCase();
    const is100 = varTitle.includes("100");
    const isFlashSale = (line.attributes ?? []).some(
      (a) => a.key === "_source" && a.value === "flash_sale"
    );
    return is100 && !isFlashSale ? sum + line.quantity : sum;
  }, 0);
  const has2x100mlRegular = regular100mlQty >= 2;

  const hasSantor60 = lines.some(({ node: line }) => {
    const handle = line.merchandise?.product?.handle ?? "";
    const title = (line.merchandise?.title ?? "").toLowerCase();
    return handle === "santor-inspirado-en-invictus-copia" && title.includes("60");
  });

  const hasSantorPocket = lines.some(({ node: line }) => {
    const handle = line.merchandise?.product?.handle ?? "";
    const title = (line.merchandise?.title ?? "").toLowerCase();
    return handle === "santor-inspirado-en-invictus-copia" && (title.includes("30") || title.includes("pocket"));
  });

  const santorEffectUnlocked = has2x100mlRegular;
  const santorEffectItemsAdded = hasSantor60 && hasSantorPocket;
  const showSantorEffect = santorEffectUnlocked && !santorEffectItemsAdded && !santorEffectDismissed;
  const showSantorEffectConfirm = santorEffectUnlocked && santorEffectItemsAdded;

  async function addSantorEffectGifts() {
    startGiftTransition(async () => {
      const [v60, v30] = await Promise.all([
        getSantorFreeVariantId(),
        getSantorPocketVariantId(),
      ]);

      if (!v60 && !v30) {
        setGiftMsg("No encontramos los productos. Contáctanos.");
        return;
      }

      const results = [];
      if (v60 && !hasSantor60) {
        results.push(await addLineItemAction(v60, 1));
      }
      if (v30 && !hasSantorPocket) {
        results.push(await addLineItemAction(v30, 1));
      }

      const failed = results.find((r) => !r.ok);
      if (failed) {
        setGiftMsg(failed.error);
        return;
      }

      await applyDiscountAction("SANTOREFFECT");
      router.refresh();
    });
  }

  function updateQty(lineId, qty) {
    startTransition(async () => {
      await updateLineQuantityAction(lineId, qty);
      router.refresh();
    });
  }

  function remove(lineId) {
    startTransition(async () => {
      await removeLineAction(lineId);
      router.refresh();
    });
  }

  if (!lines.length) {
    return (
      <p className="text-neutral-500 py-8">
        Tu carrito está vacío.{" "}
        <Link href="/collections" className="text-neutral-950 hover:underline">
          Explorar colecciones
        </Link>
      </p>
    );
  }

  const subtotal = cart?.cost?.subtotalAmount;
  const total = cart?.cost?.totalAmount;
  const codes = cart?.discountCodes ?? [];

  return (
    <div className="space-y-8">
      {/* ── SANTOR Effect Unlock — UI de urgencia ── */}
      {showSantorEffect && (
        <div className="relative overflow-hidden border-2 border-[#d4a574] bg-gradient-to-br from-neutral-950 via-neutral-900 to-neutral-950 p-6 sm:p-8">
          {/* Glow decorativo */}
          <div className="absolute -top-20 -right-20 h-40 w-40 rounded-full bg-[#d4a574]/20 blur-3xl" />
          <div className="absolute -bottom-10 -left-10 h-32 w-32 rounded-full bg-[#a17952]/15 blur-2xl" />

          <div className="relative z-10">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 rounded-full bg-[#d4a574]/20 px-4 py-1.5 mb-4">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#d4a574] opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[#d4a574]" />
              </span>
              <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-[#d4a574]">
                SANTOR Effect Desbloqueado
              </span>
            </div>

            {/* Headline */}
            <h3 className="font-serif text-2xl sm:text-3xl font-medium text-white leading-tight">
              Has desbloqueado un regalo exclusivo
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-white/70 max-w-lg">
              Por comprar 2 perfumes de 100ml a precio completo, te has ganado el{" "}
              <span className="font-semibold text-[#d4a574]">SANTOR Effect</span>:
            </p>

            {/* Items incluidos */}
            <div className="mt-5 flex flex-col gap-3">
              <div className="flex items-center gap-3 bg-white/5 rounded px-4 py-3">
                <span className="text-lg">🧴</span>
                <div>
                  <p className="text-sm font-semibold text-white">SANTOR 60ml</p>
                  <p className="text-[11px] text-white/50">Eau de Parfum — GRATIS</p>
                </div>
                <span className="ml-auto text-xs font-bold text-[#d4a574]">$0</span>
              </div>
              <div className="flex items-center gap-3 bg-white/5 rounded px-4 py-3">
                <span className="text-lg">🧼</span>
                <div>
                  <p className="text-sm font-semibold text-white">Jabón SANTOR Pocket 30ml</p>
                  <p className="text-[11px] text-white/50">Aroma Santal 33 — GRATIS</p>
                </div>
                <span className="ml-auto text-xs font-bold text-[#d4a574]">$0</span>
              </div>
            </div>

            {/* Urgencia */}
            <div className="mt-5 flex items-start gap-2 bg-red-500/10 border border-red-500/20 rounded px-4 py-3">
              <span className="text-red-400 text-sm mt-0.5">⏳</span>
              <p className="text-[12px] leading-relaxed text-red-300">
                <strong>Esta promoción no la encontrarás en línea</strong> y desaparecerá al cerrar esta venta. Agrégala ahora.
              </p>
            </div>

            {/* CTA */}
            <button
              type="button"
              disabled={giftPending}
              onClick={addSantorEffectGifts}
              className="mt-6 w-full sm:w-auto px-8 py-4 bg-[#d4a574] text-neutral-950 text-[10px] font-bold uppercase tracking-[0.25em] transition hover:bg-[#c9955f] disabled:opacity-50"
            >
              {giftPending ? "Agregando regalos…" : "Agregar SANTOR Effect a mi carrito"}
            </button>
            {giftMsg && <p className="text-xs text-red-400 mt-2">{giftMsg}</p>}
          </div>
        </div>
      )}

      {/* Confirmación SANTOR Effect ya agregado */}
      {showSantorEffectConfirm && (
        <div className="flex items-center gap-3 rounded border border-[#d4a574]/30 bg-[#fdf6ec] px-5 py-4">
          <span className="text-xl">✨</span>
          <div>
            <p className="text-sm font-semibold text-neutral-900">SANTOR Effect activado</p>
            <p className="text-[11px] text-neutral-600">Tu SANTOR 60ml y Jabón Pocket van gratis con tu pedido.</p>
          </div>
        </div>
      )}

      <ul className="divide-y divide-neutral-200 border border-neutral-200 overflow-hidden">
        {lines.map(({ node: line }) => {
          const v = line.merchandise;
          if (!v?.product) return null;
          const img = v.image;
          const product = v.product;
          const price = v.price;
          const lineTotal =
            price && line.quantity
              ? (Number(price.amount) * line.quantity).toFixed(2)
              : null;
          const isFlashSale = (line.attributes ?? []).some(
            (a) => a.key === "_source" && a.value === "flash_sale"
          );

          return (
            <li
              key={line.id}
              className="flex flex-col sm:flex-row gap-4 p-4 bg-neutral-100/30"
            >
              <Link
                href={getProductHref(product)}
                className="relative h-28 w-24 shrink-0 overflow-hidden border border-neutral-200 bg-white"
              >
                {img?.url ? (
                  <Image
                    src={img.url}
                    alt={img.altText || product?.title || ""}
                    fill
                    className="object-cover"
                    sizes="96px"
                  />
                ) : null}
              </Link>
              <div className="flex-1 min-w-0">
                <Link
                  href={getProductHref(product)}
                  className="font-medium text-neutral-950 hover:opacity-60"
                >
                  {product?.title}
                </Link>
                {v.title && v.title !== "Default Title" ? (
                  <p className="text-sm text-neutral-500 mt-1">{v.title}</p>
                ) : null}
                {isFlashSale && (
                  <span className="inline-block mt-1 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-black rounded" style={{ backgroundColor: "#39FF14" }}>
                    Oferta Relámpago
                  </span>
                )}
                <div className="mt-3 flex flex-wrap items-center gap-4">
                  <label className="text-xs text-neutral-500 flex items-center gap-2">
                    Cantidad
                    <input
                      type="number"
                      min={1}
                      max={99}
                      defaultValue={line.quantity}
                      disabled={pending}
                      onChange={(e) => {
                        const q = parseInt(e.target.value, 10);
                        if (!Number.isNaN(q)) updateQty(line.id, q);
                      }}
                      className="w-16 border border-neutral-200 bg-[#faf9f7] px-2 py-1 text-sm text-neutral-950"
                    />
                  </label>
                  <button
                    type="button"
                    disabled={pending}
                    onClick={() => remove(line.id)}
                    className="text-xs uppercase tracking-wider text-neutral-500 hover:text-red-400"
                  >
                    Eliminar
                  </button>
                </div>
              </div>
              <div className="text-right shrink-0">
                {price ? (
                  <p className="font-serif text-neutral-950 font-medium">
                    {formatMoney(lineTotal, price.currencyCode)}
                  </p>
                ) : null}
                <p className="text-xs text-neutral-500 mt-1">
                  {line.quantity} × {price ? formatMoney(price.amount, price.currencyCode) : "—"}
                </p>
              </div>
            </li>
          );
        })}
      </ul>

      <form action={applyDiscountFormAction} className="flex flex-wrap gap-3 items-end">
        <div>
          <label htmlFor="discount-code" className="block text-xs text-neutral-500 mb-1">
            Código de descuento
          </label>
          <input
            id="discount-code"
            name="code"
            type="text"
            placeholder="Código"
            className="border border-neutral-200 bg-neutral-100 px-4 py-2 text-sm text-neutral-950"
          />
        </div>
        <button
          type="submit"
          disabled={pending}
          className="border border-neutral-950 px-5 py-2 text-[10px] font-bold uppercase tracking-[0.25em] text-neutral-950 hover:bg-neutral-950 hover:text-white disabled:opacity-50"
        >
          Aplicar
        </button>
      </form>
      {codes.length > 0 ? (
        <p className="text-sm text-neutral-500">
          Códigos: {codes.map((c) => c.code).join(", ")}
        </p>
      ) : null}

      <div className="border-t border-neutral-200 pt-6 space-y-2 text-sm">
        {subtotal ? (
          <div className="flex justify-between text-neutral-500">
            <span>Subtotal</span>
            <span>{formatMoney(subtotal.amount, subtotal.currencyCode)}</span>
          </div>
        ) : null}
        {total ? (
          <div className="flex justify-between text-lg font-medium text-neutral-950">
            <span>Total</span>
            <span className="font-serif">{formatMoney(total.amount, total.currencyCode)}</span>
          </div>
        ) : null}
        <p className="text-xs text-neutral-500 pt-2">
          Impuestos y envío se calculan en el siguiente paso (checkout de Shopify).
        </p>
      </div>
    </div>
  );
}
