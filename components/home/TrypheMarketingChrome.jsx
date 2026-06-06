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

/* ── Flash Sale — 5 productos rotan cada 3 horas ── */
const FLASH_PRODUCTS = [
  { name: "ETERNA", full: "ETERNA (La Vie Est Belle)", handle: "noxor-inspirado-en-212-vip-copia" },
  { name: "ASTER",  full: "ASTER (Burberry HER)",      handle: "aster-burberry-her" },
  { name: "AZUR",   full: "AZUR (Polo Blue)",           handle: "azur-inspirado-en-bleu-de-channel" },
  { name: "CROWN",  full: "CROWN (One Million)",        handle: "crown-inspirado-en-one-million-de-paco-rabanne" },
  { name: "LYRIA",  full: "LYRIA (Ari de Ariana Grande)", handle: "lyria-100ml-inspirado-en-ari-de-ariana-grande" },
];
const SLOT_HOURS = 3;

function getFlashSlot() {
  // Slot based on elapsed hours since epoch, cycles every SLOT_HOURS * 5
  const slotIndex = Math.floor(Date.now() / (SLOT_HOURS * 3600 * 1000)) % FLASH_PRODUCTS.length;
  // End time = start of next slot
  const slotStart = Math.floor(Date.now() / (SLOT_HOURS * 3600 * 1000)) * (SLOT_HOURS * 3600 * 1000);
  const slotEnd = slotStart + SLOT_HOURS * 3600 * 1000;
  return { product: FLASH_PRODUCTS[slotIndex], end: slotEnd };
}

function useFlashCountdown() {
  const calc = () => {
    const { product, end } = getFlashSlot();
    const diff = Math.max(0, end - Date.now());
    return {
      product,
      hours: Math.floor(diff / 3600000),
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

function CountUnit({ value, label, compact }) {
  const pad = (n) => String(n).padStart(2, "0");
  return (
    <span className="flex flex-col items-center leading-none">
      <span className={`font-bold tabular-nums text-white transition-all duration-300 ${compact ? "text-base" : "text-xl sm:text-2xl"}`}>{pad(value)}</span>
      <span className={`font-semibold tracking-[0.15em] uppercase text-white/45 transition-all duration-300 ${compact ? "mt-0.5 text-[5px]" : "mt-1 text-[7px] sm:text-[8px]"}`}>{label}</span>
    </span>
  );
}

function Pipe({ compact }) {
  return <span className={`font-bold mx-1 text-white/25 transition-all duration-300 ${compact ? "text-sm" : "text-lg sm:text-xl"}`}>:</span>;
}

function AnnouncementBar({ compact }) {
  const { product, hours, mins, secs } = useFlashCountdown();

  return (
    <div className={`w-full bg-[#3b3b26] px-3 sm:px-4 transition-all duration-300 ${compact ? "py-1.5" : "py-2.5 sm:py-3.5"}`}>
      <div className="mx-auto flex max-w-screen-2xl items-center justify-between gap-2 sm:gap-4">
        {/* Copy */}
        <p className="min-w-0 shrink font-bold uppercase text-white/80 transition-all duration-300">
          <span className={`hidden sm:inline tracking-[0.15em] ${compact ? "text-[10px]" : "text-xs"}`}>⚡ Oferta Relámpago · {product.full} · 15% OFF</span>
          <span className={`sm:hidden tracking-[0.08em] leading-tight ${compact ? "text-[8px]" : "text-[10px]"}`}>⚡ {product.name} · 15% OFF</span>
        </p>

        {/* Countdown + CTA */}
        <div className="flex shrink-0 items-center gap-2.5 sm:gap-4">
          <div className="flex items-center">
            <CountUnit value={hours} label="HRS" compact={compact} />
            <Pipe compact={compact} />
            <CountUnit value={mins} label="MIN" compact={compact} />
            <Pipe compact={compact} />
            <CountUnit value={secs} label="SEG" compact={compact} />
          </div>

          <button
            onClick={() => { window.location.href = `/products/${product.handle}?oferta=relampago`; }}
            className={`shrink-0 font-bold tracking-[0.2em] uppercase text-neutral-950 bg-[#d4b896] transition hover:bg-[#c9a882] ${compact ? "px-3 py-1 text-[8px] sm:px-4 sm:py-1.5" : "px-3.5 py-2 text-[9px] sm:px-5 sm:py-2.5 sm:text-[11px]"}`}
          >
            Shop now
          </button>
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
      <div className="sticky top-0 z-40">
      <AnnouncementBar compact={scrolled} />
      {!shopConfigured ? (
        <div className="border-b border-neutral-200 bg-[#f5f0e8] px-3 py-2 text-center text-[10px] leading-snug text-neutral-800 sm:text-[11px]">
          <strong>Solo falta pasar clave de acceso a Neil.</strong>
        </div>
      ) : null}

      <header
        className={`border-b border-neutral-950/10 bg-[#faf9f7]/95 backdrop-blur-sm transition-shadow duration-300 ${
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
      </div>

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
