import Link from "next/link";
import { BrandWordmark } from "@/components/brand/BrandWordmark";
import { HeaderSearch, MobileSearchForm } from "@/components/layout/HeaderSearch";
import { CartBadge } from "@/components/layout/CartBadge";

const nav = [
  { href: "/collections", label: "Bundles" },
  { href: "/search", label: "Buscar" },
];

const serviceLinks = [
  { href: "/faq", label: "FAQ" },
  { href: "/envios", label: "Envíos" },
  { href: "/contacto", label: "Contacto" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-[2] border-b border-[color:var(--oob-topbar-border)] bg-[var(--oob-topbar-bg)] shadow-sm shadow-black/5">
      <div className="oob-container flex h-16 md:h-[4.25rem] items-center justify-between gap-4">
        <Link
          href="/"
          className="group flex min-w-0 shrink-0 items-center transition-opacity hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--oob-gold)]"
        >
          <BrandWordmark variant="onDark" />
        </Link>

        <nav
          className="hidden lg:flex items-center gap-8 text-sm font-medium tracking-wide"
          aria-label="Principal"
        >
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-white/90 hover:text-[var(--oob-gold)] transition-colors relative after:absolute after:left-0 after:-bottom-1 after:h-px after:w-0 after:bg-[var(--oob-gold)] hover:after:w-full after:transition-all"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2 md:gap-3">
          <HeaderSearch />

          <Link
            href="/account"
            className="p-2 text-[color:var(--oob-topbar-text)] hover:text-[var(--oob-gold)] transition-colors rounded-full hover:bg-[color:var(--oob-topbar-hover)]"
            aria-label="Cuenta"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
          </Link>

          <CartBadge />

          <Link
            href="/wishlist"
            className="hidden sm:inline-flex p-2 text-[color:var(--oob-topbar-text)] hover:text-[var(--oob-gold)] transition-colors rounded-full hover:bg-[color:var(--oob-topbar-hover)]"
            aria-label="Lista de deseos"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
          </Link>

          <MobileNav />
        </div>
      </div>
    </header>
  );
}

function MobileNav() {
  return (
    <details className="lg:hidden relative group">
      <summary className="list-none cursor-pointer p-2 rounded-full hover:bg-[color:var(--oob-topbar-hover)] text-[color:var(--oob-topbar-text)] [&::-webkit-details-marker]:hidden">
        <span className="sr-only">Menú</span>
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </summary>
      <div className="absolute right-0 top-full mt-2 w-64 max-h-[80vh] overflow-y-auto rounded-lg border border-[color:var(--oob-border)] bg-[var(--oob-bg-elevated)] py-2 shadow-xl shadow-black/20">
        <MobileSearchForm />
        <div className="border-t border-[color:var(--oob-border)] my-2" />
        {nav.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="block px-4 py-2.5 text-sm text-[var(--oob-cream)] hover:bg-[var(--oob-surface)] hover:text-[var(--oob-fairway)]"
          >
            {item.label}
          </Link>
        ))}
        <div className="border-t border-[color:var(--oob-border)] my-2" />
        <p className="px-4 py-1 text-[10px] uppercase tracking-wider text-[var(--oob-muted)]">
          Servicio al cliente
        </p>
        {serviceLinks.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="block px-4 py-2.5 text-sm text-[var(--oob-cream)] hover:bg-[var(--oob-surface)] hover:text-[var(--oob-fairway)]"
          >
            {item.label}
          </Link>
        ))}
        <Link
          href="/wishlist"
          className="block px-4 py-2.5 text-sm text-[var(--oob-cream)] sm:hidden hover:bg-[var(--oob-surface)]"
        >
          Lista de deseos
        </Link>
      </div>
    </details>
  );
}
