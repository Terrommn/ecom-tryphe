"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

/* ─────────────────────────────────────────
   SVG ICONS — línea delicada
───────────────────────────────────────── */
function IconRose({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2c0 0-4 2-4 6 0 2.5 1.5 4 4 4s4-1.5 4-4c0-4-4-6-4-6z" />
      <path d="M12 12v10" />
      <path d="M9 15c-2 0-3.5-1-3.5-3 0-1.5 1-2.5 2.5-2.5" />
      <path d="M15 15c2 0 3.5-1 3.5-3 0-1.5-1-2.5-2.5-2.5" />
      <path d="M8 19c-1.5 0-2.5-.8-2.5-2" />
      <path d="M16 19c1.5 0 2.5-.8 2.5-2" />
    </svg>
  );
}

function IconTruck({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
      <path d="M1 3h15v13H1z" />
      <path d="M16 8h4l3 3v5h-7V8z" />
      <circle cx="5.5" cy="18.5" r="2.5" />
      <circle cx="18.5" cy="18.5" r="2.5" />
    </svg>
  );
}

function IconLeaf({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
      <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10z" />
      <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
    </svg>
  );
}

function IconShield({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}

function IconCalendar({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
      <text x="12" y="17" textAnchor="middle" fontSize="7" fill="currentColor" stroke="none" fontWeight="bold">30</text>
    </svg>
  );
}

const TRUST_ITEMS = [
  { Icon: IconRose,     label: "Flores frescas diarias" },
  { Icon: IconTruck,    label: "Entrega en CDMX" },
  { Icon: IconLeaf,     label: "100% naturales" },
  { Icon: IconShield,   label: "Satisfacción garantizada" },
  { Icon: IconCalendar, label: "30 días de garantía" },
];

/* ─────────────────────────────────────────
   SEPARADOR BOTÁNICO
───────────────────────────────────────── */
function FloralSeparator() {
  return (
    <div className="flex items-center gap-4 my-7 md:my-9">
      <div className="flex-1" style={{ height: "1px", background: "linear-gradient(to right, transparent, #9e847280)" }} />
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9e8472" strokeWidth="1.2" strokeLinecap="round" opacity="0.65">
        <circle cx="12" cy="12" r="2.5" />
        <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
      </svg>
      <div className="flex-1" style={{ height: "1px", background: "linear-gradient(to left, transparent, #9e847280)" }} />
    </div>
  );
}

/* ─────────────────────────────────────────
   PLACEHOLDER ELEGANTE DE IMAGEN
───────────────────────────────────────── */
function ProductImagePlaceholder() {
  return (
    <div className="relative mx-auto" style={{ maxWidth: "480px" }}>
      {/* Marco principal */}
      <div
        className="relative overflow-hidden"
        style={{
          aspectRatio: "3 / 4",
          background: "linear-gradient(150deg, #ede4d8 0%, #d9ccc0 50%, #c9b59a 100%)",
          borderRadius: "2px",
        }}
      >
        {/* Textura lino */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(100,70,40,0.04) 3px, rgba(100,70,40,0.04) 4px)," +
              "repeating-linear-gradient(90deg, transparent, transparent 3px, rgba(100,70,40,0.03) 3px, rgba(100,70,40,0.03) 4px)",
          }}
        />

        {/* Ilustración botánica SVG */}
        <svg
          className="absolute inset-0 w-full h-full"
          viewBox="0 0 360 480"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="xMidYMid meet"
        >
          {/* Esquinas decorativas */}
          <g stroke="#6b4e35" strokeWidth="0.75" opacity="0.4" strokeLinecap="round">
            <path d="M24 24 L72 24 M24 24 L24 72" />
            <path d="M38 24 C38 38 52 38 52 24" />
            <path d="M24 38 C38 38 38 52 24 52" />

            <path d="M336 24 L288 24 M336 24 L336 72" />
            <path d="M322 24 C322 38 308 38 308 24" />
            <path d="M336 38 C322 38 322 52 336 52" />

            <path d="M24 456 L72 456 M24 456 L24 408" />
            <path d="M38 456 C38 442 52 442 52 456" />
            <path d="M24 442 C38 442 38 428 24 428" />

            <path d="M336 456 L288 456 M336 456 L336 408" />
            <path d="M322 456 C322 442 308 442 308 456" />
            <path d="M336 442 C322 442 322 428 336 428" />
          </g>

          {/* Tallo central */}
          <path d="M180 380 Q178 320 180 180" stroke="#6b4e35" strokeWidth="1" opacity="0.45" fill="none" strokeLinecap="round" />

          {/* Rosa principal */}
          <g stroke="#6b4e35" strokeWidth="0.9" opacity="0.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="180" cy="155" r="30" />
            <circle cx="180" cy="155" r="20" />
            <circle cx="180" cy="155" r="10" />
            <path d="M180 125 C172 112 160 115 158 125 C156 135 164 142 180 125z" />
            <path d="M180 185 C172 198 160 195 158 185 C156 175 164 168 180 185z" />
            <path d="M150 155 C137 147 134 135 142 130 C150 125 158 132 150 155z" />
            <path d="M210 155 C223 147 226 135 218 130 C210 125 202 132 210 155z" />
            <path d="M158 133 C148 123 150 112 158 110 C166 108 170 116 158 133z" />
            <path d="M202 133 C212 123 210 112 202 110 C194 108 190 116 202 133z" />
          </g>

          {/* Hojas izquierda */}
          <g stroke="#6b4e35" strokeWidth="0.85" opacity="0.4" fill="none" strokeLinecap="round">
            <path d="M180 240 C162 228 148 235 148 248 C148 261 162 266 180 255" />
            <path d="M180 240 L158 238" />
            <path d="M180 295 C162 283 148 290 148 303 C148 316 162 321 180 310" />
            <path d="M180 295 L158 293" />
          </g>

          {/* Hojas derecha */}
          <g stroke="#6b4e35" strokeWidth="0.85" opacity="0.4" fill="none" strokeLinecap="round">
            <path d="M180 265 C198 253 212 260 212 273 C212 286 198 291 180 280" />
            <path d="M180 265 L202 263" />
            <path d="M180 330 C198 318 212 325 212 338 C212 351 198 356 180 345" />
            <path d="M180 330 L202 328" />
          </g>

          {/* Capullos laterales */}
          <g stroke="#6b4e35" strokeWidth="0.85" opacity="0.38" fill="none" strokeLinecap="round">
            <path d="M155 205 L148 220" />
            <ellipse cx="144" cy="228" rx="6" ry="9" transform="rotate(-15 144 228)" />
            <path d="M205 235 L212 250" />
            <ellipse cx="216" cy="258" rx="6" ry="9" transform="rotate(15 216 258)" />
          </g>

          {/* Label */}
          <text x="180" y="430" textAnchor="middle" fontFamily="Georgia, serif" fontSize="9.5" fill="#6b4e35" opacity="0.5" letterSpacing="3.5">
            IMAGEN DEL PRODUCTO
          </text>
        </svg>
      </div>

      {/* Caption */}
      <p
        className="mt-3 text-center uppercase"
        style={{
          fontFamily: "'Jost', system-ui, sans-serif",
          fontWeight: 300,
          fontSize: "9.5px",
          letterSpacing: "0.32em",
          color: "#9e8472",
        }}
      >
        Arreglo Rosas Rojas · Edición Especial
      </p>

      {/* Precio flotante */}
      <div
        className="absolute bottom-10 left-0 -translate-x-1/4 hidden md:flex flex-col items-center"
        style={{
          background: "#f5f0ea",
          border: "1px solid #d4c4b4",
          padding: "12px 20px",
          minWidth: "120px",
        }}
      >
        <span
          style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontWeight: 600,
            fontSize: "1.6rem",
            color: "#1e1410",
            lineHeight: 1,
          }}
        >
          $890
        </span>
        <span
          style={{
            fontFamily: "'Jost', system-ui, sans-serif",
            fontWeight: 300,
            fontSize: "9px",
            letterSpacing: "0.2em",
            color: "#9e8472",
            textTransform: "uppercase",
            marginTop: "4px",
          }}
        >
          MXN · desde
        </span>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────
   COMPONENTE PRINCIPAL
───────────────────────────────────────── */
export function FloralHeroSection() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 60);
    return () => clearTimeout(t);
  }, []);

  return (
    <>
      {/* Fuentes + keyframes — inyectadas una sola vez */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,500;0,600;0,700;1,500;1,600;1,700&family=Jost:wght@300;400;500&display=swap');

        @keyframes floralFadeUp {
          from { opacity: 0; transform: translateY(22px); }
          to   { opacity: 1; transform: translateY(0);    }
        }

        .floral-root .f-enter { opacity: 0; }
        .floral-root.f-visible .f-d0 { animation: floralFadeUp 0.85s cubic-bezier(0.22,1,0.36,1)   0ms forwards; }
        .floral-root.f-visible .f-d1 { animation: floralFadeUp 0.85s cubic-bezier(0.22,1,0.36,1) 160ms forwards; }
        .floral-root.f-visible .f-d2 { animation: floralFadeUp 0.85s cubic-bezier(0.22,1,0.36,1) 300ms forwards; }
        .floral-root.f-visible .f-d3 { animation: floralFadeUp 0.85s cubic-bezier(0.22,1,0.36,1) 420ms forwards; }
        .floral-root.f-visible .f-d4 { animation: floralFadeUp 0.85s cubic-bezier(0.22,1,0.36,1) 560ms forwards; }

        .floral-root .f-img  { opacity: 0; transform: scale(1.04); transition: opacity 1.1s cubic-bezier(0.22,1,0.36,1) 120ms, transform 1.3s cubic-bezier(0.22,1,0.36,1) 120ms; }
        .floral-root.f-visible .f-img { opacity: 1; transform: scale(1); }

        .floral-cta-primary:hover  { filter: brightness(1.08); }
        .floral-cta-secondary:hover { border-color: #9e8472 !important; }

        @keyframes trustMarquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>

      {/* ── Trust Bar — Marquee infinito ── */}
      <div style={{ background: "#c9b99a", padding: "10px 0", overflow: "hidden" }}>
        <div
          style={{
            display: "flex",
            width: "max-content",
            animation: "trustMarquee 25s linear infinite",
          }}
        >
          {[...Array(2)].map((_, copy) => (
            <div
              key={copy}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0",
                flexShrink: 0,
              }}
            >
              {TRUST_ITEMS.map(({ Icon, label }) => (
                <div key={label} style={{ display: "flex", alignItems: "center", gap: "7px", padding: "0 24px" }}>
                  <Icon
                    className="h-4 w-4 shrink-0"
                    style={{ color: "#3d2b1f", opacity: 0.9 }}
                  />
                  <span
                    style={{
                      fontFamily: "'Jost', system-ui, sans-serif",
                      fontWeight: 500,
                      fontSize: "9.5px",
                      letterSpacing: "0.2em",
                      textTransform: "uppercase",
                      color: "#3d2b1f",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {label}
                  </span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* ── Hero Section ── */}
      <section
        className={`floral-root relative overflow-hidden${visible ? " f-visible" : ""}`}
        style={{ background: "#f5f0ea", minHeight: "88vh" }}
      >
        {/* Textura lino */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage:
              "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(90,65,35,0.025) 3px, rgba(90,65,35,0.025) 4px)," +
              "repeating-linear-gradient(90deg, transparent, transparent 5px, rgba(90,65,35,0.018) 5px, rgba(90,65,35,0.018) 6px)",
          }}
        />

        {/* Viñeta suave */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background: "radial-gradient(ellipse at 70% 50%, transparent 40%, rgba(90,65,35,0.06) 100%)",
          }}
        />

        <div
          className="relative mx-auto flex flex-col-reverse items-center gap-10 px-6 py-16 md:flex-row md:items-center md:gap-0"
          style={{ maxWidth: "1200px", minHeight: "88vh" }}
        >
          {/* ── IZQUIERDA: Texto 45% ── */}
          <div className="w-full md:w-[45%] md:pr-12 lg:pr-20">
            {/* Sobre-título */}
            <p
              className="f-enter f-d0"
              style={{
                fontFamily: "'Jost', system-ui, sans-serif",
                fontWeight: 300,
                fontSize: "9.5px",
                letterSpacing: "0.38em",
                textTransform: "uppercase",
                color: "#9e8472",
                marginBottom: "28px",
              }}
            >
              Boutique Floral · Ciudad de México
            </p>

            {/* Headline */}
            <h1
              className="f-enter f-d1"
              style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontWeight: 700,
                fontStyle: "italic",
                fontSize: "clamp(3rem, 6.5vw, 5.75rem)",
                lineHeight: 0.98,
                letterSpacing: "-0.015em",
                color: "#1e1410",
                margin: 0,
              }}
            >
              Flores que<br />
              <span style={{ color: "#6b4e3d" }}>hablan</span> por ti
            </h1>

            {/* Separador botánico */}
            <div className="f-enter f-d2">
              <FloralSeparator />
            </div>

            {/* Subheadline */}
            <p
              className="f-enter f-d2"
              style={{
                fontFamily: "'Jost', system-ui, sans-serif",
                fontWeight: 300,
                fontSize: "clamp(0.9rem, 1.5vw, 1.05rem)",
                lineHeight: 1.8,
                color: "#5c4a3d",
                maxWidth: "38ch",
                marginBottom: "36px",
              }}
            >
              Arreglos únicos elaborados con flores frescas de temporada.
              <br />
              Cada pieza es un mensaje que no necesita palabras.
            </p>

            {/* CTAs */}
            <div
              className="f-enter f-d3"
              style={{ display: "flex", flexWrap: "wrap", gap: "14px", alignItems: "center" }}
            >
              <Link
                href="/collections"
                className="floral-cta-primary"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: "#9e8472",
                  color: "#faf8f5",
                  fontFamily: "'Jost', system-ui, sans-serif",
                  fontWeight: 500,
                  fontSize: "10.5px",
                  letterSpacing: "0.22em",
                  textTransform: "uppercase",
                  padding: "15px 34px",
                  minHeight: "50px",
                  transition: "filter 0.25s",
                  textDecoration: "none",
                }}
              >
                Explorar arreglos
              </Link>

              <Link
                href="/acerca"
                className="floral-cta-secondary"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  color: "#9e8472",
                  fontFamily: "'Jost', system-ui, sans-serif",
                  fontWeight: 400,
                  fontSize: "10.5px",
                  letterSpacing: "0.22em",
                  textTransform: "uppercase",
                  padding: "15px 4px",
                  minHeight: "50px",
                  borderBottom: "1px solid rgba(158,132,114,0.35)",
                  textDecoration: "none",
                  transition: "border-color 0.25s",
                }}
              >
                Nuestra historia
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
            </div>

            {/* Trust micro — visible solo en desktop debajo del CTA */}
            <div
              className="f-enter f-d4 hidden md:flex"
              style={{
                marginTop: "48px",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <div style={{ display: "flex" }}>
                {["#e8b4b8", "#d4a0a4", "#c08c90", "#ac7880", "#986472"].map((c, i) => (
                  <div
                    key={i}
                    style={{
                      width: "28px",
                      height: "28px",
                      borderRadius: "50%",
                      border: "2px solid #f5f0ea",
                      background: c,
                      marginLeft: i > 0 ? "-8px" : 0,
                    }}
                  />
                ))}
              </div>
              <p
                style={{
                  fontFamily: "'Jost', system-ui, sans-serif",
                  fontWeight: 300,
                  fontSize: "11px",
                  color: "#7a6355",
                  letterSpacing: "0.02em",
                  marginLeft: "4px",
                }}
              >
                <strong style={{ fontWeight: 500 }}>+4,800</strong> personas felices este mes
              </p>
            </div>
          </div>

          {/* ── DERECHA: Imagen 55% ── */}
          <div className="f-img w-full md:w-[55%] md:pl-8 lg:pl-12">
            <ProductImagePlaceholder />
          </div>
        </div>

        {/* Scroll hint */}
        <div
          className="f-enter f-d4 absolute bottom-8 left-1/2 hidden md:flex flex-col items-center gap-2"
          style={{ transform: "translateX(-50%)" }}
        >
          <span
            style={{
              fontFamily: "'Jost', system-ui, sans-serif",
              fontWeight: 300,
              fontSize: "8.5px",
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              color: "#b0977e",
            }}
          >
            Scroll
          </span>
          <div
            style={{
              width: "1px",
              height: "32px",
              background: "linear-gradient(to bottom, #9e8472, transparent)",
            }}
          />
        </div>
      </section>
    </>
  );
}
