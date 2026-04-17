import { formatMoney } from "@/lib/money";

/** Umbral en la misma divisa que el carrito (configura MXN en Shopify para Mexico). */
export function FreeShippingBar({ subtotalAmount }) {
  const threshold = Number(process.env.NEXT_PUBLIC_FREE_SHIPPING_THRESHOLD_MXN) || 3000;
  if (!threshold || !subtotalAmount?.amount) return null;

  const current = Number(subtotalAmount.amount);
  const currency = subtotalAmount.currencyCode;
  const remaining = Math.max(0, threshold - current);
  const pct = Math.min(100, (current / threshold) * 100);

  return (
    <div className="mb-8 border border-neutral-200 bg-neutral-100/40 p-4">
      {remaining > 0 ? (
        <p className="text-sm text-neutral-950">
          Te faltan{" "}
          <span className="font-serif font-medium">
            {formatMoney(String(remaining), currency)}
          </span>{" "}
          para envío gratis (pedidos desde {formatMoney(String(threshold), currency)}).
        </p>
      ) : (
        <p className="text-sm text-neutral-950 font-medium">
          ¡Tienes envío gratis en este pedido!
        </p>
      )}
      <div className="mt-3 h-1.5 w-full overflow-hidden bg-[#faf9f7]">
        <div
          className="h-full bg-neutral-950 transition-all"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
