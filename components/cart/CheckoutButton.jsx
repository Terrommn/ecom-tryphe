"use client";

export function CheckoutButton({ checkoutUrl, disabled, discountCodes }) {
  if (disabled || !checkoutUrl) {
    return (
      <button
        type="button"
        disabled
        className="w-full bg-neutral-500 px-8 py-4 text-[10px] font-bold uppercase tracking-[0.25em] text-white cursor-not-allowed"
      >
        Proceder al pago
      </button>
    );
  }

  function handleCheckout() {
    let url = checkoutUrl;
    // Pasar todos los codigos de descuento acumulados al checkout URL
    const codes = (discountCodes ?? [])
      .map((c) => c.code)
      .filter(Boolean);
    try {
      const pending = localStorage.getItem("pending_discount");
      if (pending && !codes.includes(pending)) {
        codes.push(pending);
      }
      localStorage.removeItem("pending_discount");
    } catch {}
    if (codes.length > 0) {
      const param = codes.join(",");
      url += (url.includes("?") ? "&" : "?") + `discount=${encodeURIComponent(param)}`;
    }
    window.location.href = url;
  }

  return (
    <button
      type="button"
      onClick={handleCheckout}
      className="flex w-full items-center justify-center bg-neutral-950 px-8 py-4 text-[10px] font-bold uppercase tracking-[0.25em] text-white transition hover:bg-neutral-800"
    >
      Proceder al pago
    </button>
  );
}
