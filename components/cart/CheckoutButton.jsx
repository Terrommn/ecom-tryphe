"use client";

export function CheckoutButton({ checkoutUrl, disabled }) {
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
    let url = checkoutUrl.replace("vh3sx0-jz.myshopify.com", "tryphe.mx");
    try {
      const code = localStorage.getItem("pending_discount");
      if (code) {
        url += (url.includes("?") ? "&" : "?") + `discount=${encodeURIComponent(code)}`;
        localStorage.removeItem("pending_discount");
      }
    } catch {}
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
