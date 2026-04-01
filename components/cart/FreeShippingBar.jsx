import { formatMoney } from "@/lib/money";

/** Umbral en la misma divisa que el carrito (configura MXN en Shopify para México). */
export function FreeShippingBar({ subtotalAmount }) {
  const threshold = Number(process.env.NEXT_PUBLIC_FREE_SHIPPING_THRESHOLD_MXN) || 3000;
  if (!threshold || !subtotalAmount?.amount) return null;

  const current = Number(subtotalAmount.amount);
  const currency = subtotalAmount.currencyCode;
  const remaining = Math.max(0, threshold - current);
  const pct = Math.min(100, (current / threshold) * 100);

  return (
    <div className="mb-8 rounded-lg border border-[color:var(--oob-border)] bg-[var(--oob-surface)]/40 p-4">
      {remaining > 0 ? (
        <p className="text-sm text-[var(--oob-cream)]">
          Te faltan{" "}
          <span className="text-[var(--oob-gold)] font-medium">
            {formatMoney(String(remaining), currency)}
          </span>{" "}
          para envío gratis (pedidos desde {formatMoney(String(threshold), currency)}).
        </p>
      ) : (
        <p className="text-sm text-[var(--oob-gold)] font-medium">
          ¡Tienes envío gratis en este pedido!
        </p>
      )}
      <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-[var(--oob-bg)]">
        <div
          className="h-full rounded-full bg-[var(--oob-gold)] transition-all"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
