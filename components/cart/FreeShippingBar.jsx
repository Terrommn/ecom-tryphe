/** Envío gratis al comprar 2 o más perfumes. */
export function FreeShippingBar({ totalQuantity }) {
  const qty = Number(totalQuantity) || 0;
  const hasFreeShipping = qty >= 2;
  const pct = hasFreeShipping ? 100 : qty >= 1 ? 50 : 0;

  return (
    <div className="mb-8 border border-neutral-200 bg-neutral-100/40 p-4">
      {hasFreeShipping ? (
        <p className="text-sm text-neutral-950 font-medium">
          ¡Tienes envío gratis en este pedido!
        </p>
      ) : qty >= 1 ? (
        <p className="text-sm text-neutral-950">
          Agrega un perfume más y obtén{" "}
          <span className="font-serif font-medium">envío gratis</span>.
        </p>
      ) : (
        <p className="text-sm text-neutral-950">
          Envío gratis al comprar 2 o más perfumes.
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
