"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getWishlistItems, removeWishlistItem } from "@/lib/wishlist-client";

export function WishlistClient() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    setItems(getWishlistItems());
    function sync() {
      setItems(getWishlistItems());
    }
    window.addEventListener("store-wishlist", sync);
    return () => window.removeEventListener("store-wishlist", sync);
  }, []);

  if (items.length === 0) {
    return (
      <p className="text-neutral-500 py-8 border border-dashed border-neutral-200 px-6">
        Aún no has guardado productos. Usa &ldquo;Guardar en lista&rdquo; en la ficha de producto.
      </p>
    );
  }

  return (
    <ul className="space-y-3">
      {items.map((item) => (
        <li
          key={item.handle}
          className="flex flex-wrap items-center justify-between gap-4 border border-neutral-200 bg-neutral-100/40 px-4 py-3"
        >
          <Link
            href={`/products/${item.handle}`}
            className="font-medium text-neutral-950 hover:opacity-60"
          >
            {item.title || item.handle}
          </Link>
          <div className="flex items-center gap-3">
            <Link
              href={`/products/${item.handle}`}
              className="text-[10px] font-bold uppercase tracking-[0.25em] text-neutral-950 hover:underline"
            >
              Ver producto
            </Link>
            <button
              type="button"
              onClick={() => {
                removeWishlistItem(item.handle);
                setItems(getWishlistItems());
              }}
              className="text-xs text-neutral-500 hover:text-red-400"
            >
              Quitar
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}
