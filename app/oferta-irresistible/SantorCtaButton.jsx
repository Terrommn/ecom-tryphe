"use client";

import { useTransition } from "react";
import { addLineItemAction } from "@/app/actions/cart";

export function SantorCtaButton({ variantId, checkoutUrl }) {
  const [pending, startTransition] = useTransition();

  function handleClick() {
    if (!variantId) {
      window.location.href = checkoutUrl || "/cart";
      return;
    }
    startTransition(async () => {
      await addLineItemAction(variantId, 1);
      if (typeof window !== "undefined") {
        window.dispatchEvent(new Event("store-cart"));
      }
      window.location.href = checkoutUrl || "/cart";
    });
  }

  return (
    <button
      onClick={handleClick}
      disabled={pending}
      className="inline-block bg-[#5a6e4a] text-white text-[11px] font-bold uppercase tracking-[0.2em] px-10 py-4 rounded-md hover:bg-[#4a5e3a] hover:scale-[1.02] transition-all disabled:opacity-60 disabled:cursor-not-allowed"
    >
      {pending ? "Activando…" : "Activar mi Santor Effect"}
    </button>
  );
}
