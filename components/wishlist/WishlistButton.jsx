"use client";

import { useEffect, useState } from "react";
import { addWishlistItem, isInWishlist, removeWishlistItem } from "@/lib/wishlist-client";

export function WishlistButton({ handle, title }) {
  const [on, setOn] = useState(false);

  useEffect(() => {
    setOn(isInWishlist(handle));
    function sync() {
      setOn(isInWishlist(handle));
    }
    window.addEventListener("store-wishlist", sync);
    return () => window.removeEventListener("store-wishlist", sync);
  }, [handle]);

  function toggle() {
    if (on) {
      removeWishlistItem(handle);
      setOn(false);
    } else {
      addWishlistItem(handle, title);
      setOn(true);
    }
  }

  return (
    <button
      type="button"
      onClick={toggle}
      className="inline-flex items-center gap-2 rounded-full border border-[color:var(--oob-border)] px-5 py-2.5 text-sm text-[var(--oob-cream)] hover:border-[var(--oob-gold)] hover:text-[var(--oob-gold)] transition-colors"
      aria-pressed={on}
    >
      <svg className="h-4 w-4" fill={on ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
        />
      </svg>
      {on ? "En tu lista" : "Guardar en lista"}
    </button>
  );
}
