/** Envío gratis en pedidos superiores a $1,000 MXN. */
export function FreeShippingBar({ subtotalAmount }) {
  const subtotal = Number(subtotalAmount) || 0;
  const threshold = 1000;
  const hasFreeShipping = subtotal >= threshold;
  const pct = hasFreeShipping ? 100 : Math.min(99, Math.round((subtotal / threshold) * 100));
  const remaining = threshold - subtotal;

  return (
    <div className="mb-8 border border-neutral-200 bg-neutral-100/40 p-4">
      {hasFreeShipping ? (
        <p className="text-sm text-neutral-950 font-medium">
          ¡Tienes envío gratis en este pedido!
        </p>
      ) : subtotal > 0 ? (
        <p className="text-sm text-neutral-950">
          Te faltan{" "}
          <span className="font-serif font-medium">${Math.ceil(remaining).toLocaleString("es-MX")}</span>{" "}
          para obtener <span className="font-serif font-medium">envío gratis</span>.
        </p>
      ) : (
        <p className="text-sm text-neutral-950">
          Envío gratis en pedidos arriba de $1,000.
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
