"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import Image from "next/image";
import { Search, Mail, User, ShoppingBag, Menu, X } from "lucide-react";

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

const ANNOUNCEMENTS = [
  <>
    Envío gratis al comprar 2 o más perfumes ·{" "}
    <Link href="/envios" className="underline underline-offset-4 hover:text-white">
      condiciones
    </Link>
  </>,
  <>
    Mayo · Compra un perfume de 100 ml y llévate otro de 60 ml al{" "}
    <span className="text-[#d4a574]">50% de descuento</span>
  </>,
  <>
    Mayo · Compra 2 perfumes de 100 ml y el 60 ml{" "}
    <span className="text-[#d4a574]">va por nuestra cuenta</span>
  </>,
];

function AnnouncementBar() {
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setIdx((i) => (i + 1) % ANNOUNCEMENTS.length), 4000);
    return () => clearInterval(id);
  }, []);
  return (
    <div className="relative bg-neutral-950 py-2 text-center text-[9px] font-bold tracking-[0.35em] text-[#faf9f7] uppercase sm:text-[10px] overflow-hidden h-8 flex items-center justify-center">
      {ANNOUNCEMENTS.map((msg, i) => (
        <span
          key={i}
          className={`absolute inset-x-0 px-4 transition-all duration-500 ${
            i === idx ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          {msg}
        </span>
      ))}
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

  return (
    <div className="min-h-screen bg-[#faf9f7] font-sans text-neutral-950 antialiased">
      <AnnouncementBar />

      {!shopConfigured ? (
        <div className="border-b border-neutral-200 bg-[#f5f0e8] px-3 py-2 text-center text-[10px] leading-snug text-neutral-800 sm:text-[11px]">
          <strong>Solo falta pasar clave de acceso a Neil.</strong>
        </div>
      ) : null}

      <header className="sticky top-0 z-40 border-b border-neutral-950/10 bg-[#faf9f7]/95 backdrop-blur-sm">
        <div className="mx-auto max-w-screen-2xl px-4 lg:px-10">
          <div className="flex h-16 items-center justify-between sm:h-[4.5rem]">
            <Link href="/" className="shrink-0">
              <Image
                src="/logo.png"
                alt={siteName}
                width={320}
                height={64}
                sizes="(max-width: 640px) 180px, 280px"
                className="h-16 w-auto max-w-[300px] sm:h-[4.5rem]"
                priority
              />
            </Link>

            <form
              action="/search"
              method="get"
              className="relative mx-6 hidden max-w-md flex-1 md:flex"
            >
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />
              <input
                type="search"
                name="q"
                placeholder="Buscar fragancias…"
                className="w-full border border-neutral-950/15 bg-white py-2 pl-10 pr-4 text-xs outline-none transition-colors focus:border-neutral-950"
              />
            </form>

            <div className="flex items-center gap-5 sm:gap-8">
              <div className="hidden items-center gap-6 text-[9px] font-bold tracking-[0.2em] text-neutral-800 lg:flex">
                <Link href="/contacto" className="hover:opacity-60" aria-label="Contacto">
                  <Mail className="h-4 w-4" />
                </Link>
                <Link
                  href="/account"
                  className="hidden hover:opacity-60 sm:flex sm:items-center sm:gap-2"
                >
                  <User className="h-4 w-4" />
                  <span className="max-w-[10rem] truncate">CUENTA</span>
                </Link>
              </div>
              <Link href="/cart" className="flex items-center hover:opacity-60">
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

          <nav className="hidden justify-center gap-x-8 border-t border-neutral-950/5 py-3 lg:flex xl:gap-x-12">
            {navLinks.map((item) => (
              <Link
                key={`${item.href}-${item.label}`}
                href={item.href}
                className="text-[9px] font-bold tracking-[0.25em] text-neutral-800 uppercase transition hover:text-neutral-500"
              >
                {item.label}
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
    </div>
  );
}
