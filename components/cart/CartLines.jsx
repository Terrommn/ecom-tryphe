"use client";

import Image from "next/image";
import Link from "next/link";
import { getProductHref } from "@/lib/product-href";
import { useTransition, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import {
  updateLineQuantityAction,
  removeLineAction,
  applyDiscountFormAction,
} from "@/app/actions/cart";
import { formatMoney } from "@/lib/money";


function Confetti() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const colors = ["#d4a574", "#c9955f", "#fbbf24", "#f59e0b", "#a17952", "#34d399", "#f472b6"];
    const pieces = Array.from({ length: 50 }, () => {
      const d = document.createElement("div");
      const size = Math.random() * 8 + 4;
      Object.assign(d.style, {
        position: "absolute",
        width: `${size}px`,
        height: `${size}px`,
        backgroundColor: colors[Math.floor(Math.random() * colors.length)],
        borderRadius: Math.random() > 0.5 ? "50%" : "2px",
        left: `${Math.random() * 100}%`,
        top: "-10px",
        opacity: "1",
        pointerEvents: "none",
        zIndex: "20",
        transition: `all ${1.5 + Math.random()}s cubic-bezier(.25,.46,.45,.94)`,
      });
      el.appendChild(d);
      return d;
    });
    requestAnimationFrame(() => {
      pieces.forEach((d) => {
        d.style.top = `${70 + Math.random() * 50}%`;
        d.style.left = `${parseFloat(d.style.left) + (Math.random() - 0.5) * 40}%`;
        d.style.opacity = "0";
        d.style.transform = `rotate(${Math.random() * 720}deg)`;
      });
    });
    const t = setTimeout(() => pieces.forEach((d) => d.remove()), 3000);
    return () => { clearTimeout(t); pieces.forEach((d) => d.remove()); };
  }, []);
  return <div ref={ref} className="absolute inset-0 overflow-hidden pointer-events-none" />;
}

export function CartLines({ cart }) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const lines = cart?.lines?.edges ?? [];

  // ── Promo: 2+ perfumes de 100ml a precio regular → cualquier 60ml gratis ──
  let regular100mlQty = 0;
  let has60ml = false;
  let price60ml = null;
  for (const { node: line } of lines) {
    const varTitle = (line.merchandise?.title ?? "").toLowerCase();
    const isFlashSale = (line.attributes ?? []).some(
      (a) => a.key === "_source" && a.value === "flash_sale"
    );
    if (varTitle.includes("100") && !isFlashSale) regular100mlQty += line.quantity;
    if (varTitle.includes("60")) {
      has60ml = true;
      if (!price60ml) price60ml = line.merchandise?.price;
    }
  }
  const promoUnlocked = regular100mlQty >= 2;
  const showPromo = promoUnlocked && !has60ml;
  const showPromoConfirm = promoUnlocked && has60ml;

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
      {/* ── Promo: 2 de 100ml → cualquier 60ml gratis ── */}
      {showPromo && (
        <div className="relative overflow-hidden border border-neutral-200 bg-white p-6 sm:p-8 rounded-lg shadow-sm">
          <Confetti />
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 rounded-full bg-[#d4a574]/15 px-4 py-1.5 mb-4">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#d4a574] opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[#d4a574]" />
              </span>
              <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-[#a17952]">
                Promoción Desbloqueada
              </span>
            </div>

            <h3 className="font-serif text-2xl sm:text-3xl font-medium text-neutral-950 leading-tight">
              Has desbloqueado un regalo exclusivo
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-neutral-600 max-w-lg">
              Por comprar 2 perfumes de 100ml a precio regular, te has ganado{" "}
              <strong className="text-neutral-950">cualquier perfume de 60ml totalmente gratis</strong>.
            </p>

            <div className="mt-5">
              <div className="flex items-center gap-3 bg-neutral-50 border border-neutral-200 rounded px-4 py-3">
                <span className="text-lg">🎁</span>
                <div>
                  <p className="text-sm font-semibold text-neutral-950">Perfume de 60ml a tu elección</p>
                  <p className="text-[11px] text-neutral-500">Agrega cualquier perfume en presentación de 60ml a tu carrito</p>
                </div>
                <span className="ml-auto text-xs font-bold text-[#d4a574]">GRATIS</span>
              </div>
            </div>

            <p className="mt-4 text-[12px] leading-relaxed text-neutral-600">
              El descuento se aplica automaticamente.
            </p>

            <Link
              href="/collections"
              className="mt-6 inline-block w-full sm:w-auto text-center px-8 py-4 bg-neutral-950 text-white text-[10px] font-bold uppercase tracking-[0.25em] transition hover:bg-neutral-800"
            >
              Elegir mi perfume de 60ml gratis
            </Link>
          </div>
        </div>
      )}

      {showPromoConfirm && (
        <div className="flex items-center gap-3 rounded-lg border border-green-200 bg-green-50 px-5 py-4">
          <span className="text-xl">✅</span>
          <div>
            <p className="text-sm font-semibold text-neutral-900">Promocion activada</p>
            <p className="text-[11px] text-neutral-600">
              Tu perfume de 60ml va gratis con tu pedido. El descuento se aplica automaticamente al pagar.
            </p>
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
        {showPromoConfirm && price60ml ? (
          <div className="flex justify-between text-neutral-400">
            <span>Perfume 60ml <span className="text-[#d4a574] font-medium">(gratis con tu promo)</span></span>
            <span className="line-through">{formatMoney(price60ml.amount, price60ml.currencyCode)}</span>
          </div>
        ) : null}
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
