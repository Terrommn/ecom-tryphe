"use client";

import Image from "next/image";
import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { X } from "lucide-react";
import { addLineItemAction, applyDiscountAction } from "@/app/actions/cart";
import { formatMoney } from "@/lib/money";

export function Free60mlGallery({ products, onClose }) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [selectedId, setSelectedId] = useState(null);

  function handleSelect(product) {
    if (pending) return;
    setSelectedId(product.variant60ml.id);
    startTransition(async () => {
      await addLineItemAction(product.variant60ml.id, 1, [
        { key: "_promo", value: "free_60ml" },
      ]);
      await applyDiscountAction("DOSPERFUMES60ML");
      if (typeof window !== "undefined") {
        window.dispatchEvent(new Event("store-cart"));
      }
      onClose();
      router.push("/cart");
      router.refresh();
    });
  }

  if (!products?.length) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="relative mx-4 w-full max-w-2xl max-h-[85vh] overflow-y-auto bg-[#faf9f7] p-6 sm:p-8 shadow-2xl">
        <button
          onClick={onClose}
          className="absolute right-3 top-3 text-neutral-400 hover:text-neutral-950 transition-colors z-10"
          aria-label="Cerrar"
        >
          <X size={20} />
        </button>

        <p className="text-[9px] font-bold tracking-[0.4em] text-[#a17952] uppercase">
          Tu regalo
        </p>
        <h2 className="mt-2 font-serif text-2xl font-medium text-neutral-950">
          Elige tu perfume de 60ml gratis
        </h2>
        <p className="mt-2 text-sm text-neutral-500">
          Selecciona el que mas te guste. Se agregara a tu carrito sin costo.
        </p>

        <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 gap-4">
          {products.map((p) => {
            const img = p.featuredImage;
            const price = p.variant60ml?.price;
            const isThis = selectedId === p.variant60ml?.id;

            return (
              <div
                key={p.id}
                className="border border-neutral-200 bg-white overflow-hidden flex flex-col"
              >
                <div className="relative aspect-[3/4] bg-white">
                  <span className="absolute left-2 top-2 z-[1] bg-[#d4a574] px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-white">
                    Gratis
                  </span>
                  {img?.url ? (
                    <Image
                      src={img.url}
                      alt={img.altText || p.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 45vw, 200px"
                    />
                  ) : (
                    <div className="absolute inset-0 bg-gradient-to-br from-neutral-100 to-[#faf9f7] flex items-center justify-center">
                      <span className="text-neutral-400 text-xs">—</span>
                    </div>
                  )}
                </div>
                <div className="p-3 flex-1 flex flex-col">
                  <h3 className="text-sm font-medium text-neutral-950 leading-tight">
                    {p.title}
                  </h3>
                  {price && (
                    <p className="mt-1 text-xs text-neutral-400 line-through">
                      {formatMoney(price.amount, price.currencyCode)}
                    </p>
                  )}
                  <button
                    type="button"
                    disabled={pending}
                    onClick={() => handleSelect(p)}
                    className="mt-auto pt-3 w-full py-2.5 bg-neutral-950 text-[9px] font-bold uppercase tracking-[0.2em] text-white transition hover:bg-neutral-800 disabled:opacity-40"
                  >
                    {isThis && pending ? "Agregando..." : "Elegir este"}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
