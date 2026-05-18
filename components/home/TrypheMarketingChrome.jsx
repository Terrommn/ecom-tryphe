"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Search, Mail, User, ShoppingBag, Menu, X } from "lucide-react";
import { TrypheFooter } from "@/components/layout/TrypheFooter";

const siteName = process.env.NEXT_PUBLIC_SITE_NAME?.trim() || "Tryphé";
const tagline = process.env.NEXT_PUBLIC_SITE_TAGLINE?.trim() || "RAW — ESENCIAL";

function CartCount() {
  const [count, setCount] = useState(0);
  useEffect(() => {
    function load() {
      fetch("/api/cart")
        .then((r) => r.json())
        .then((d) => setCount(d.totalQuantity ?? 0))
        .catch(() => setCount(0));
    }
    load();
    window.addEventListener("store-cart", load);
    return () => window.removeEventListener("store-cart", load);
  }, []);
  return <span className="ml-1 text-xs font-bold">({count})</span>;
}

const PROMO_END = new Date("2026-05-31T23:59:59-06:00");

function useCountdown(target) {
  const calc = () => {
    const diff = Math.max(0, target - Date.now());
    return {
      days: Math.floor(diff / 86400000),
      hours: Math.floor((diff % 86400000) / 3600000),
      mins: Math.floor((diff % 3600000) / 60000),
      secs: Math.floor((diff % 60000) / 1000),
    };
  };
  const [t, setT] = useState(calc);
  useEffect(() => {
    const id = setInterval(() => setT(calc()), 1000);
    return () => clearInterval(id);
  }, []);
  return t;
}

function CountUnit({ value, label }) {
  const pad = (n) => String(n).padStart(2, "0");
  return (
    <span className="flex flex-col items-center leading-none">
      <span className="text-[13px] font-bold tabular-nums text-white">{pad(value)}</span>
      <span className="mt-0.5 text-[6px] font-semibold tracking-[0.15em] uppercase text-white/45">{label}</span>
    </span>
  );
}

function Pipe() {
  return <span className="h-5 w-px bg-white/20" />;
}

function AnnouncementBar() {
  const { days, hours, mins, secs } = useCountdown(PROMO_END);

  return (
    <div className="w-full bg-[#3b3b26] px-4 py-2.5">
      <div className="mx-auto flex max-w-screen-2xl items-center justify-between gap-3">
        {/* Copy */}
        <p className="min-w-0 shrink text-[9px] font-bold uppercase tracking-[0.18em] text-white/80 sm:text-[10px] sm:tracking-[0.22em]">
          <span className="hidden sm:inline">Edición Mes de las Madres · Tres fragancias por el precio de dos</span>
          <span className="sm:hidden">Mes de las Madres</span>
        </p>

        {/* Countdown + CTA */}
        <div className="flex shrink-0 items-center gap-3">
          {/* Todos los breakpoints: DÍA HRS MIN SEG */}
          <div className="flex items-center gap-2">
            <CountUnit value={days} label="DÍA" />
            <Pipe />
            <CountUnit value={hours} label="HRS" />
            <Pipe />
            <CountUnit value={mins} label="MIN" />
            <Pipe />
            <CountUnit value={secs} label="SEG" />
          </div>

          <Link
            href="/collections"
            className="shrink-0 bg-[#d4b896] px-3.5 py-1.5 text-[9px] font-bold tracking-[0.25em] uppercase text-neutral-950 transition hover:bg-[#c9a882] sm:px-4"
          >
            Shop Now
          </Link>
        </div>
      </div>
    </div>
  );
}

/**
 * Barra superior + header editorial (misma UI que la home Tryphé).
 *
 * @param {object} props
 * @param {boolean} props.shopConfigured
 * @param {{ label: string, href: string }[]} props.navLinks
 * @param {import("react").ReactNode} props.children
 */
export function TrypheMarketingChrome({
  shopConfigured = false,
  navLinks = [],
  children,
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <div className="min-h-screen bg-[#faf9f7] font-sans text-neutral-950 antialiased">
      <AnnouncementBar />

      {!shopConfigured ? (
        <div className="border-b border-neutral-200 bg-[#f5f0e8] px-3 py-2 text-center text-[10px] leading-snug text-neutral-800 sm:text-[11px]">
          <strong>Solo falta pasar clave de acceso a Neil.</strong>
        </div>
      ) : null}

      <header
        className={`sticky top-0 z-40 border-b border-neutral-950/10 bg-[#faf9f7]/95 backdrop-blur-sm transition-shadow duration-300 ${
          scrolled ? "shadow-[0_2px_24px_rgba(0,0,0,0.07)]" : "shadow-none"
        }`}
      >
        <div className="mx-auto max-w-screen-2xl px-4 lg:px-10">
          <div className="flex h-16 items-center justify-between sm:h-[4.5rem]">
            <Link href="/" className="shrink-0">
              <Image
                src="/logo.png"
                alt={siteName}
                width={320}
                height={64}
                sizes="(max-width: 640px) 180px, 280px"
                className="h-14 w-auto max-w-[260px] sm:h-[4.5rem] sm:max-w-[300px]"
                priority
              />
            </Link>

            <form
              action="/search"
              method="get"
              className="relative mx-6 hidden max-w-xs flex-1 lg:flex xl:max-w-md"
            >
              <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-neutral-400" />
              <input
                type="search"
                name="q"
                placeholder="Buscar fragancias…"
                className="w-full border border-neutral-950/12 bg-neutral-50 py-2 pl-9 pr-4 text-[11px] outline-none transition-colors focus:border-neutral-950 focus:bg-white"
              />
            </form>

            <div className="flex items-center gap-4 sm:gap-6">
              <div className="hidden items-center gap-5 lg:flex">
                <Link
                  href="/contacto"
                  className="text-neutral-500 transition-colors hover:text-neutral-950"
                  aria-label="Contacto"
                >
                  <Mail className="h-4 w-4" />
                </Link>
                <Link
                  href="/account"
                  className="flex items-center gap-1.5 text-neutral-500 transition-colors hover:text-neutral-950"
                >
                  <User className="h-4 w-4" />
                  <span className="text-[9px] font-bold tracking-[0.2em] uppercase">Cuenta</span>
                </Link>
              </div>
              <Link
                href="/cart"
                className="flex items-center gap-1 text-neutral-700 transition-colors hover:text-neutral-950"
              >
                <ShoppingBag className="h-5 w-5" strokeWidth={1.5} />
                <CartCount />
              </Link>
              <button
                type="button"
                className="lg:hidden"
                onClick={() => setIsMenuOpen((o) => !o)}
                aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>

          <nav className="hidden justify-center gap-x-7 border-t border-neutral-950/5 py-2.5 lg:flex xl:gap-x-10">
            {navLinks.map((item) => (
              <Link
                key={`${item.href}-${item.label}`}
                href={item.href}
                className="group relative text-[9px] font-bold tracking-[0.25em] text-neutral-700 uppercase transition-colors hover:text-neutral-950"
              >
                {item.label}
                <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-neutral-950 transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
          </nav>
        </div>
      </header>

      {isMenuOpen ? (
        <div className="fixed inset-0 z-50 flex flex-col bg-[#faf9f7] p-6 lg:hidden">
          <button
            type="button"
            onClick={() => setIsMenuOpen(false)}
            className="mb-8 self-end"
            aria-label="Cerrar"
          >
            <X className="h-6 w-6" />
          </button>
          <MobileSearchBar onClose={() => setIsMenuOpen(false)} />
          {navLinks.map((item) => (
            <Link
              key={`${item.href}-${item.label}`}
              href={item.href}
              className="border-b border-neutral-200 py-4 text-xs font-bold tracking-[0.2em] uppercase"
              onClick={() => setIsMenuOpen(false)}
            >
              {item.label}
            </Link>
          ))}
        </div>
      ) : null}

      {children}
      <TrypheFooter />
    </div>
  );
}

function MobileSearchBar({ onClose }) {
  const router = useRouter();

  function handleSubmit(e) {
    e.preventDefault();
    const q = new FormData(e.currentTarget).get("q")?.toString().trim();
    if (q) {
      router.push(`/search?q=${encodeURIComponent(q)}`);
      onClose?.();
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <div className="flex items-center gap-2 rounded-full border border-neutral-300 bg-white px-4 py-2.5">
        <Search className="h-4 w-4 shrink-0 text-neutral-400" />
        <input
          name="q"
          type="search"
          placeholder="Buscar..."
          className="flex-1 bg-transparent border-0 p-0 text-sm text-neutral-900 placeholder:text-neutral-400 focus:ring-0 focus:outline-none"
        />
      </div>
    </form>
  );
}
