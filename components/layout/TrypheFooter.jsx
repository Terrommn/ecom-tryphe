"use client";

import Link from "next/link";
import { useState } from "react";

const STORE_LINKS = [
  { href: "/collections/mujer", label: "Mujer" },
  { href: "/collections/hombre", label: "Hombre" },
  { href: "/collections/unisex", label: "Unisex" },
  { href: "/collections", label: "Todos los Perfumes" },
  { href: "/encuentra-tu-aroma", label: "Quiz" },
  { href: "/products/gift-card", label: "Gift Card" },
];

const HELP_LINKS = [
  { href: "/privacidad", label: "Aviso de Privacidad" },
  { href: "/devoluciones", label: "Cambios y Devoluciones" },
  { href: "/politicas-cancelacion", label: "Políticas de Cancelación y Devoluciones" },
  { href: "/terminos", label: "Términos y Condiciones" },
  { href: "/publicidad-comparativa", label: "Acerca de la Publicidad Comparativa" },
  { href: "/factura", label: "Factura Tu Pedido" },
];

function IconFacebook() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
      <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
    </svg>
  );
}

function IconInstagram() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

function IconVisa() {
  return (
    <svg viewBox="0 0 48 16" className="h-5 w-auto opacity-60">
      <text x="0" y="13" fontFamily="Arial" fontWeight="bold" fontSize="14" fill="white">VISA</text>
    </svg>
  );
}

function IconMastercard() {
  return (
    <svg viewBox="0 0 38 24" className="h-5 w-auto opacity-60">
      <circle cx="15" cy="12" r="10" fill="#EB001B" opacity="0.7" />
      <circle cx="23" cy="12" r="10" fill="#F79E1B" opacity="0.7" />
    </svg>
  );
}

function IconPaypal() {
  return (
    <svg viewBox="0 0 60 16" className="h-5 w-auto opacity-60">
      <text x="0" y="13" fontFamily="Arial" fontWeight="bold" fontSize="12" fill="white">PayPal</text>
    </svg>
  );
}

export function TrypheFooter() {
  const [email, setEmail] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    setEmail("");
  }

  return (
    <footer className="bg-[#111111] pt-16 pb-6 text-white">
      <div className="mx-auto max-w-screen-xl px-4 md:px-10">

        {/* 3 columnas */}
        <div className="grid grid-cols-1 gap-12 md:grid-cols-[2fr_1fr_1fr]">

          {/* Col 1 — Marca + Newsletter */}
          <div>
            {/* Logo */}
            <div className="mb-8">
              <Link href="/" className="inline-block">
                <span className="border-b-4 border-white pb-0.5 font-sans text-2xl font-black uppercase tracking-widest text-white">
                  TRYPHÉ
                </span>
              </Link>
            </div>

            {/* Newsletter */}
            <p className="text-[10px] font-bold uppercase tracking-[0.35em] text-neutral-400">
              Suscríbete a nuestro newsletter
            </p>
            <p className="mt-2 text-[13px] leading-relaxed text-neutral-500">
              Entérate de nuevos lanzamientos, promociones e información sobre
              los beneficios y usos de nuestros productos.
            </p>
            <form onSubmit={handleSubmit} className="mt-4 flex">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Correo electrónico"
                required
                className="h-11 flex-1 border border-neutral-600 bg-[#222] px-3 text-[13px] text-white placeholder-neutral-500 focus:border-neutral-400 focus:outline-none"
              />
              <button
                type="submit"
                className="h-11 bg-white px-5 text-[11px] font-bold uppercase tracking-wider text-neutral-950 transition-colors hover:bg-neutral-200"
              >
                Enviar
              </button>
            </form>

            {/* Redes */}
            <div className="mt-5 flex gap-3">
              <a
                href="https://www.facebook.com/tryphe.mx"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="flex h-9 w-9 items-center justify-center border border-white text-white transition-colors hover:bg-white hover:text-neutral-950"
              >
                <IconFacebook />
              </a>
              <a
                href="https://www.instagram.com/tryphe.mx"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="flex h-9 w-9 items-center justify-center border border-white text-white transition-colors hover:bg-white hover:text-neutral-950"
              >
                <IconInstagram />
              </a>
            </div>
          </div>

          {/* Col 2 — Tienda */}
          <div>
            <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.35em] text-neutral-500">
              Tienda
            </p>
            <ul className="space-y-3">
              {STORE_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-[14px] text-white transition-colors hover:text-neutral-300 hover:underline"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3 — Ayuda */}
          <div>
            <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.35em] text-neutral-500">
              Ayuda
            </p>
            <ul className="space-y-3">
              {HELP_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-[14px] text-white transition-colors hover:text-neutral-300 hover:underline"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Divisor */}
        <hr className="mt-12 border-neutral-800" />

        {/* Bottom bar */}
        <div className="mt-5 flex flex-col gap-4 text-[11px] text-neutral-600 md:flex-row md:items-center md:justify-between">
          <p className="shrink-0">©2026 Incubrands MX, S.A.P.I. de C.V.</p>

          <p className="max-w-xl text-center leading-relaxed">
            * Se hace del conocimiento al público consumidor que las marcas
            registradas mencionadas con fines de publicidad comparativa, no
            deben de entenderse como licencias marcarias ni como relación
            comercial con dichas marcas.
          </p>

          {/* Logos de pago */}
          <div className="flex shrink-0 items-center gap-4">
            <IconPaypal />
            <IconMastercard />
            <IconVisa />
          </div>
        </div>

      </div>
    </footer>
  );
}
