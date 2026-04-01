"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export function CartBadge() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    function load() {
      fetch("/api/cart")
        .then((r) => r.json())
        .then((d) => setCount(d.totalQuantity ?? 0))
        .catch(() => setCount(0));
    }
    load();
    function onFocus() {
      load();
    }
    window.addEventListener("focus", onFocus);
    window.addEventListener("store-cart", load);
    document.addEventListener("visibilitychange", () => {
      if (document.visibilityState === "visible") load();
    });
    return () => {
      window.removeEventListener("focus", onFocus);
      window.removeEventListener("store-cart", load);
    };
  }, []);

  return (
    <Link
      href="/cart"
      className="relative p-2 text-[color:var(--oob-topbar-text)] hover:text-[var(--oob-gold)] transition-colors rounded-full hover:bg-[color:var(--oob-topbar-hover)]"
      aria-label={`Carrito${count ? `, ${count} artículos` : ""}`}
    >
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M16 11V7a4 4 0 00-8 0v4M5 9h14l-1 12H6L5 9z"
        />
      </svg>
      {count > 0 ? (
        <span className="absolute -top-0.5 -right-0.5 min-w-[1.125rem] h-[1.125rem] flex items-center justify-center rounded-full bg-[var(--oob-gold)] text-[10px] font-bold text-[#f8f4ef] px-0.5">
          {count > 99 ? "99+" : count}
        </span>
      ) : null}
    </Link>
  );
}
