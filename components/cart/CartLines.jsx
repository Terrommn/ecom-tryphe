"use client";

import Image from "next/image";
import Link from "next/link";
import { getProductHref } from "@/lib/product-href";
import { useTransition } from "react";
import { useRouter } from "next/navigation";
import {
  updateLineQuantityAction,
  removeLineAction,
  applyDiscountFormAction,
} from "@/app/actions/cart";
import { formatMoney } from "@/lib/money";

export function CartLines({ cart }) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const lines = cart?.lines?.edges ?? [];

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
      <p className="text-[var(--oob-muted)] py-8">
        Tu carrito está vacío.{" "}
        <Link href="/collections" className="text-[var(--oob-gold)] hover:underline">
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
      <ul className="divide-y divide-[color:var(--oob-border)] border border-[color:var(--oob-border)] rounded-lg overflow-hidden">
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

          return (
            <li
              key={line.id}
              className="flex flex-col sm:flex-row gap-4 p-4 bg-[var(--oob-surface)]/30"
            >
              <Link
                href={getProductHref(product)}
                className="relative h-28 w-24 shrink-0 overflow-hidden rounded border border-[color:var(--oob-border)] bg-[var(--oob-bg-elevated)]"
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
                  className="font-medium text-[var(--oob-cream)] hover:text-[var(--oob-gold)]"
                >
                  {product?.title}
                </Link>
                {v.title && v.title !== "Default Title" ? (
                  <p className="text-sm text-[var(--oob-muted)] mt-1">{v.title}</p>
                ) : null}
                <div className="mt-3 flex flex-wrap items-center gap-4">
                  <label className="text-xs text-[var(--oob-muted)] flex items-center gap-2">
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
                      className="w-16 rounded border border-[color:var(--oob-border)] bg-[var(--oob-bg)] px-2 py-1 text-sm text-[var(--oob-cream)]"
                    />
                  </label>
                  <button
                    type="button"
                    disabled={pending}
                    onClick={() => remove(line.id)}
                    className="text-xs uppercase tracking-wider text-[var(--oob-muted)] hover:text-red-400"
                  >
                    Eliminar
                  </button>
                </div>
              </div>
              <div className="text-right shrink-0">
                {price ? (
                  <p className="text-[var(--oob-gold)] font-medium">
                    {formatMoney(lineTotal, price.currencyCode)}
                  </p>
                ) : null}
                <p className="text-xs text-[var(--oob-muted)] mt-1">
                  {line.quantity} × {price ? formatMoney(price.amount, price.currencyCode) : "—"}
                </p>
              </div>
            </li>
          );
        })}
      </ul>

      <form action={applyDiscountFormAction} className="flex flex-wrap gap-3 items-end">
        <div>
          <label htmlFor="discount-code" className="block text-xs text-[var(--oob-muted)] mb-1">
            Código de descuento
          </label>
          <input
            id="discount-code"
            name="code"
            type="text"
            placeholder="Código"
            className="rounded-lg border border-[color:var(--oob-border)] bg-[var(--oob-surface)] px-4 py-2 text-sm text-[var(--oob-cream)]"
          />
        </div>
        <button
          type="submit"
          disabled={pending}
          className="rounded-full border border-[var(--oob-gold)] px-5 py-2 text-sm font-medium text-[var(--oob-gold)] hover:bg-[var(--oob-gold)] hover:text-[var(--oob-bg)] disabled:opacity-50"
        >
          Aplicar
        </button>
      </form>
      {codes.length > 0 ? (
        <p className="text-sm text-[var(--oob-muted)]">
          Códigos: {codes.map((c) => c.code).join(", ")}
        </p>
      ) : null}

      <div className="border-t border-[color:var(--oob-border)] pt-6 space-y-2 text-sm">
        {subtotal ? (
          <div className="flex justify-between text-[var(--oob-muted)]">
            <span>Subtotal</span>
            <span>{formatMoney(subtotal.amount, subtotal.currencyCode)}</span>
          </div>
        ) : null}
        {total ? (
          <div className="flex justify-between text-lg font-medium text-[var(--oob-cream)]">
            <span>Total</span>
            <span>{formatMoney(total.amount, total.currencyCode)}</span>
          </div>
        ) : null}
        <p className="text-xs text-[var(--oob-muted)] pt-2">
          Impuestos y envío se calculan en el siguiente paso (checkout de Shopify).
        </p>
      </div>
    </div>
  );
}
