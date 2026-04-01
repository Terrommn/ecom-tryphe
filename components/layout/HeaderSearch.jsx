"use client";

import { useRouter } from "next/navigation";

export function HeaderSearch() {
  const router = useRouter();

  function handleSubmit(e) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const q = (fd.get("q") || "").toString().trim();
    if (q) {
      router.push(`/search?q=${encodeURIComponent(q)}`);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="hidden sm:flex items-center rounded-full border border-[color:var(--oob-topbar-border)] bg-[color:var(--oob-topbar-hover)] px-3 py-1.5 text-sm focus-within:border-[var(--oob-gold)]/60 focus-within:ring-1 focus-within:ring-[var(--oob-gold)]/35"
    >
      <span className="sr-only">Buscar</span>
      <svg
        className="h-4 w-4 shrink-0 text-[color:var(--oob-topbar-muted)]"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        aria-hidden
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        />
      </svg>
      <input
        name="q"
        type="search"
        placeholder="Buscar"
        className="w-28 md:w-36 bg-transparent border-0 p-0 text-[color:var(--oob-topbar-text)] placeholder:text-[color:var(--oob-topbar-muted)] focus:ring-0 text-sm"
      />
    </form>
  );
}
