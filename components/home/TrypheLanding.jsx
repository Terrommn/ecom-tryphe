"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState, useEffect, useCallback, useTransition } from "react";
import { Star, Truck, RotateCcw, ShieldCheck } from "lucide-react";
import { formatMoney } from "@/lib/money";
import { TrypheMarketingChrome } from "@/components/home/TrypheMarketingChrome";
import { PerfumeDiscoveryQuiz } from "@/components/quiz/PerfumeDiscoveryQuiz";
import { UgcVideoSection } from "@/components/home/UgcVideoSection";
import { PartnersBanner } from "@/components/home/PartnersBanner";
import { addLineItemAction } from "@/app/actions/cart";

const siteName = process.env.NEXT_PUBLIC_SITE_NAME?.trim() || "Tryphe";
const tagline = process.env.NEXT_PUBLIC_SITE_TAGLINE?.trim() || "RAW -- ESENCIAL";

/** Fotos editoriales propias (public/brand/). */
const IMG_BOTTLE_SANTOR = "/brand/bottle-santor.png";
const IMG_ESSENCE_AMADERADOS = "/brand/essence-amaderados.png";
const IMG_BOTTLE_MAGNA = "/brand/bottle-magna.png";
const IMG_BOTTLE_VALIANT = "/brand/bottle-valiant.png";
const IMG_BOTTLE_ELAN = "/brand/bottle-elan.png";
const IMG_ESSENCE_FRESCO = "/brand/essence-fresco.png";
const IMG_BOTTLES_GRID = "/brand/bottles-grid.png";
const IMG_BOTTLE_SOLARE = "/brand/bottle-solare.png";
const IMG_BOTTLE_ELYSSE = "/brand/bottle-elysse.png";


const COLLECTION_IMAGE_FALLBACK = [
  IMG_BOTTLES_GRID,
  IMG_BOTTLE_ELYSSE,
  IMG_BOTTLE_SOLARE,
  IMG_BOTTLE_MAGNA,
];

const CELEBRITY_PLACEHOLDERS = [
  {
    quote: "Una firma que entiende el lujo sin el ruido.",
    source: "Revista — próximamente",
    image: "/home/celeb-01.png",
  },
  {
    quote: "La promesa es clara: emoción antes que notas.",
    source: "Columna de estilo",
    image: "/home/celeb-02.png",
  },
  {
    quote: "El empaque ya es un regalo en sí mismo.",
    source: "Editorial belleza",
    image: "/home/celeb-03.png",
  },
  {
    quote: "Tryphé apuesta por la proyección, no por el cliché.",
    source: "Prensa digital",
    image: "/home/celeb-04.png",
  },
];

const REVIEWS = [
  {
    name: "Sofía Martínez",
    location: "Monterrey, N.L.",
    rating: 5,
    date: "14 abr 2026",
    product: "ASTER",
    quote:
      "Llevo tres semanas con ASTER y sigue proyectando igual que el primer día. Nadie me cree que no es un perfume de $3,000.",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=240&h=240&q=80",
  },
  {
    name: "Diego Ramírez",
    location: "CDMX",
    rating: 5,
    date: "9 abr 2026",
    product: "VICTORIUM",
    quote:
      "VICTORIUM es una bestia. Lo uso para salir los viernes y termino la noche con piropos. La estela dura horas.",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=240&h=240&q=80",
  },
  {
    name: "Valentina López",
    location: "Guadalajara, Jal.",
    rating: 5,
    date: "2 abr 2026",
    product: "MAGNA",
    quote:
      "El empaque ya me ganó antes de olerlo. Es un regalo dentro de otro regalo. MAGNA es mi nuevo favorito.",
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=240&h=240&q=80",
  },
  {
    name: "Andrés Vega",
    location: "Puebla, Pue.",
    rating: 5,
    date: "28 mar 2026",
    product: "SANTOR",
    quote:
      "Compré SANTOR porque no quería gastar $5k en Santal 33. La calidad es sorprendente — huele casi idéntico y dura más.",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=240&h=240&q=80",
  },
  {
    name: "Regina Castillo",
    location: "Querétaro, Qro.",
    rating: 5,
    date: "21 mar 2026",
    product: "ALVUS",
    quote:
      "ALVUS es fresco sin ser básico. Mi novio me pidió uno para él. Ahora los dos somos fans.",
    avatar:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=240&h=240&q=80",
  },
  {
    name: "Mateo Herrera",
    location: "Tijuana, B.C.",
    rating: 5,
    date: "14 mar 2026",
    product: "VICTORIUM",
    quote:
      "Entrega en 3 días a la frontera. El atomizador es de lujo real, no esos baratos que salpican. Ya encargué dos más.",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=240&h=240&q=80",
  },
];

const BUNDLES = [
  {
    name: "Atracción Silenciosa",
    headline: "No persigues atención... la provocas",
    includes: "MAGNA · ETERNA · SANTOR",
    inspiration: "Inspirado en fragancias de Maison Francis Kurkdjian, Lancôme y Le Labo",
    marketValue: "$9,000 – $15,500",
    price: "$1,799",
    badge: "MÁS ELEGIDO",
    badgeColor: "bg-[#5a6e4a]",
    cta: "Quiero provocar atracción",
    href: "/products/atraccion-silenciosa-100-ml",
    image: "/home/bundle-atraccion-silenciosa.webp",
  },
  {
    name: "Lujo Inteligente",
    headline: "No gastas más... eliges mejor",
    includes: "SANTOR · ALVUS · ELAN",
    inspiration: "Inspirado en fragancias de Tom Ford, Dior y Chanel",
    marketValue: "$8,500 – $14,000",
    price: "$1,199",
    badge: null,
    badgeColor: null,
    cta: "Quiero elegir mejor",
    href: "/products/lujo-inteligente-100-ml",
    image: "/home/bundle-lujo-inteligente.webp",
  },
  {
    name: "Impacto Inmediato",
    headline: "Desde el primer momento... se nota",
    includes: "VICTORIUM · ASTER",
    inspiration: "Inspirado en fragancias de Paco Rabanne y Yves Saint Laurent",
    marketValue: "$6,000 – $10,500",
    price: "$1,149",
    badge: "EMPIEZA AQUÍ",
    badgeColor: "bg-[#5a6e4a]",
    cta: "Quiero causar impacto",
    href: "/products/impacto-inmediato-60-ml",
    image: "/home/bundle-impacto-inmediato.png",
  },
];

const NAV_TABS = [
  { label: "Para Él", href: "/collections/hombre" },
  { label: "Para Ella", href: "/collections/mujer" },
  { label: "Formal", href: "/collections/formal" },
  { label: "Casual", href: "/collections/casual" },
  { label: "Bundles & Sets", href: "/collections/sets" },
];

/**
 * @param {object} props
 * @param {boolean} props.shopConfigured
 * @param {{ label: string, href: string }[]} props.navLinks
 * @param {{ handle: string, title: string, imageUrl: string|null, imageAlt: string }[]} props.featuredCollections
 * @param {{ handle: string, title: string, href: string, imageUrl: string|null, imageAlt: string, priceAmount: string|null, priceCurrency: string }[]} props.products
 * @param {{ handle: string, title: string, href: string, imageUrl: string|null, imageAlt: string, priceAmount: string|null, priceCurrency: string, tags: string[] }[]} props.quizProducts
 */
export function TrypheLanding({
  shopConfigured = false,
  navLinks = [],
  featuredCollections = [],
  products = [],
  hombreProducts = [],
  mujerProducts = [],
  hombreHref = "/collections/hombre",
  mujerHref = "/collections/mujer",
  quizProducts = [],
  santorVariantId = null,
  santorCheckoutUrl = null,
}) {
  const [heroIdx, setHeroIdx] = useState(0);
  const [activeTab, setActiveTab] = useState("MÁS VENDIDOS");
  const [santorPending, startSantorTransition] = useTransition();

  function handleActivarSantor() {
    if (!santorVariantId) {
      window.location.href = santorCheckoutUrl || "/products/santor-effect";
      return;
    }
    startSantorTransition(async () => {
      await addLineItemAction(santorVariantId, 1);
      if (typeof window !== "undefined") {
        window.dispatchEvent(new Event("store-cart"));
      }
      window.location.href = santorCheckoutUrl || "/cart";
    });
  }

  const nextSlide = useCallback(() => {
    setHeroIdx((i) => (i + 1) % 3);
  }, []);

  const prevSlide = useCallback(() => {
    setHeroIdx((i) => (i - 1 + 3) % 3);
  }, []);

  useEffect(() => {
    const id = setInterval(nextSlide, 8000);
    return () => clearInterval(id);
  }, [nextSlide]);

  const featuredTiles = useMemo(() => {
    const labels = ["Perfumes para El", "Perfumes para Ella", "Los mas vendidos"];
    return featuredCollections.slice(0, 3).map((c, i) => ({
      ...c,
      label: labels[i] ?? c.title,
    }));
  }, [featuredCollections]);

  const bundleCollection = featuredCollections[3] || null;

  return (
    <TrypheMarketingChrome navLinks={navLinks} shopConfigured={shopConfigured}>
      {/* Hero Carousel — slider horizontal (no fixed height → nunca corta en mobile) */}
      <section className="relative overflow-hidden">
        {/* Track: 300% ancho, se desplaza 33.33% por banner */}
        <div
          className="flex transition-transform duration-700"
          style={{
            width: "300%",
            transform: `translateX(-${(heroIdx * 100) / 3}%)`,
            transitionTimingFunction: "cubic-bezier(0.77, 0, 0.175, 1)",
          }}
        >
          {/* ── Banner 1: SANTOR EFFECT — Conversión ── */}
          <div style={{ width: "33.333%" }} className="grid md:grid-cols-2 md:h-[85vh] md:max-h-[920px]">

            {/* ── Imagen izquierda ── */}
            <div className="relative min-h-[58vw] overflow-hidden bg-[#e8e2d8] md:min-h-0">
              <Image
                src="/cambiosmayo/hero1.png"
                alt="SANTOR — Sistema Completo Tryphé"
                fill
                className={`object-cover object-center transition-transform duration-[4000ms] ease-out ${heroIdx === 0 ? "scale-100" : "scale-[1.06]"}`}
                priority
                sizes="(max-width:768px) 100vw, 50vw"
              />
              {/* Badge sobre imagen */}
              <div className="absolute left-4 top-4 z-10">
                <span className="inline-block bg-[#a9b989] px-4 py-1.5 text-[9px] font-bold tracking-[0.22em] uppercase text-neutral-950 shadow-sm">
                  BONUS · LIMITADO A 99 PIEZAS
                </span>
              </div>
              {/* Barra urgencia pie imagen */}
              <div className="absolute bottom-0 left-0 right-0 z-10 bg-white/80 px-4 py-2.5 backdrop-blur-sm">
                <p className="text-center font-serif text-[10px] italic leading-snug text-neutral-800 md:text-xs">
                  Cuando se acaben las 99 piezas, el SANTOR Pocket desaparece.
                </p>
              </div>
            </div>

            {/* ── Contenido derecho ── */}
            <div className="flex flex-col justify-center overflow-y-auto border-t-[3px] border-neutral-200 bg-white px-6 py-8 md:border-t-0 md:px-10 lg:px-14 xl:px-16">
              <div key={`b0-${heroIdx}`} className="flex flex-col gap-0">

                {/* Eyebrow */}
                <p className="hero-enter hero-enter-d1 text-[9px] font-bold tracking-[0.35em] uppercase text-[#888]">
                  No lo dejes ir
                </p>

                {/* Headline */}
                <h2 className="hero-enter hero-enter-d2 mt-3 font-serif leading-[1.0] tracking-tight text-neutral-950">
                  <span className="block text-[clamp(1.6rem,3vw,2.5rem)] font-bold">
                    Tu nombre se olvida.
                  </span>
                  <span className="block text-[clamp(2rem,4.2vw,3.5rem)] font-bold">
                    Tu aroma no
                  </span>
                  <span className="mt-1.5 block h-0.5 w-[60px] bg-neutral-950" />
                </h2>

                {/* Subtítulo */}
                <p className="hero-enter hero-enter-d2 mt-3 text-[1.05rem] leading-[1.6] text-neutral-900">
                  THE SANTOR EFFECT hace que te volteen a oler.
                </p>

                {/* Inspirado en */}
                <div className="hero-enter hero-enter-d3 mt-4 border-l-4 border-neutral-950 bg-[#f5f3ef] px-4 py-3">
                  <p className="text-[9px] font-bold tracking-[0.25em] uppercase text-neutral-500">
                    Inspirado en
                  </p>
                  <div className="mt-1 flex flex-wrap items-baseline gap-x-3 gap-y-0.5">
                    <span className="text-[12px] text-neutral-500 line-through">Santal 33 — $7,250</span>
                    <span className="text-[12px] text-neutral-700">
                      SANTOR —{" "}
                      <span className="text-[1.25rem] font-bold text-neutral-950">$649</span>
                    </span>
                  </div>
                  <p className="mt-1 font-serif text-[11px] italic text-neutral-500">
                    Mismo carácter. Misma presencia.
                  </p>
                </div>

                {/* Sistema completo */}
                <div className="hero-enter hero-enter-d3 mt-3 bg-[#a9b989]/20 px-4 py-3">
                  <p className="text-[9px] font-bold tracking-[0.22em] uppercase text-neutral-700">
                    Qué incluye el sistema completo
                  </p>
                  <ul className="mt-2 flex flex-col gap-1.5">
                    {[
                      "SANTOR 100ml · Eau de Parfum",
                      "SANTOR Pocket · antibacterial o hand soap 30ml",
                      "Manual de la Presencia (e-book)",
                      "60 días de garantía Tryphé",
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-2 text-[13px] leading-snug text-neutral-800">
                        <span className="mt-0.5 font-bold text-[#6b8c52]">✓</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Precio */}
                <div className="hero-enter hero-enter-d4 mt-4 flex items-baseline gap-3">
                  <span className="text-[2.6rem] font-bold leading-none text-neutral-950">$649</span>
                  <div className="flex flex-col leading-tight">
                    <span className="text-[10px] text-neutral-400 uppercase tracking-wide">Valor total</span>
                    <span className="text-[0.95rem] text-neutral-400 line-through">$7,500</span>
                  </div>
                </div>

                {/* CTAs */}
                <div className="hero-enter hero-enter-d5 mt-5 flex flex-col gap-2 sm:flex-row">
                  <button
                    onClick={handleActivarSantor}
                    disabled={santorPending}
                    className="inline-flex flex-1 min-h-[46px] items-center justify-center bg-[#1a1a1a] px-5 text-[9px] font-bold tracking-[0.2em] uppercase text-white transition duration-200 hover:scale-[1.02] hover:bg-neutral-800 active:scale-100 disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {santorPending ? "Activando…" : "Activar mi Santor Effect"}
                  </button>
                  <Link
                    href="/oferta-irresistible"
                    className="inline-flex flex-1 min-h-[46px] items-center justify-center border-2 border-neutral-950 px-5 text-[9px] font-bold tracking-[0.2em] uppercase text-neutral-950 transition hover:bg-neutral-100"
                  >
                    Ver Detalles
                  </Link>
                </div>

              </div>
            </div>
          </div>

          {/* ── Banner 2: Historia / Testimonial ── */}
          <div style={{ width: "33.333%" }} className="grid md:grid-cols-2 md:h-[85vh] md:max-h-[920px]">
            <div className="relative min-h-[40vh] overflow-hidden md:min-h-0">
              <Image
                src="/cambiosmayo/Novios.png"
                alt="Pareja — historia Tryphé"
                fill
                className={`object-cover object-center transition-transform duration-[4000ms] ease-out ${heroIdx === 1 ? "scale-100" : "scale-[1.06]"}`}
                sizes="(max-width:768px) 100vw, 50vw"
              />
            </div>
            <div className="flex flex-col justify-center border-t-[3px] border-neutral-950/8 bg-[#faf9f7] px-6 py-10 md:border-t-0 md:px-12 lg:px-16 xl:px-20">
              <div key={`b1-${heroIdx}`} className="flex flex-col">
                <div className="hero-enter hero-enter-d1 flex items-center gap-2">
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <span className="text-[9px] font-bold tracking-[0.2em] uppercase text-neutral-600">
                    +10,000 clientes felices
                  </span>
                </div>
                <p className="hero-enter hero-enter-d1 mt-5 text-[9px] font-bold tracking-[0.4em] uppercase text-neutral-500">
                  La historia detrás de Tryphé
                </p>
                <h2 className="hero-enter hero-enter-d2 mt-3 font-serif text-[clamp(1.65rem,4vw,3.5rem)] font-medium leading-[1.05] tracking-tight text-neutral-950">
                  Empezó como una fragancia.
                  <br />
                  Terminó cambiándolo todo.
                </h2>
                <div className="hero-enter hero-enter-d3 mt-6 h-px w-12 bg-neutral-950/20" />
                <blockquote className="hero-enter hero-enter-d3 mt-5 font-serif text-lg italic text-neutral-800 md:text-xl">
                  &ldquo;Mi mejor amiga ahora es mi novia&rdquo;
                </blockquote>
                <p className="hero-enter hero-enter-d4 mt-3 max-w-sm text-sm leading-[1.75] text-neutral-600">
                  Cuando creas algo que te cambia la vida, tienes que compartirlo.
                </p>
                <div className="hero-enter hero-enter-d5 mt-8 flex flex-wrap gap-3">
                  <Link
                    href="/acerca"
                    className="inline-flex min-h-[44px] items-center justify-center bg-neutral-950 px-8 text-[10px] font-bold tracking-[0.25em] uppercase text-[#faf9f7] transition hover:bg-neutral-800"
                  >
                    Conoce la Historia
                  </Link>
                  <Link
                    href="/collections"
                    className="inline-flex min-h-[44px] items-center justify-center border border-neutral-950 px-8 text-[10px] font-bold tracking-[0.25em] uppercase text-neutral-950 transition hover:bg-neutral-950 hover:text-[#faf9f7]"
                  >
                    Explorar Fragancias
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* ── Banner 3: Atracción / Hombre ── */}
          <div style={{ width: "33.333%" }} className="grid md:grid-cols-2 md:h-[85vh] md:max-h-[920px]">
            <div className="relative min-h-[40vh] overflow-hidden md:min-h-0">
              <Image
                src="/cambiosmayo/Ligue.png"
                alt="Hombre — Tryphé Atracción Silenciosa"
                fill
                className={`object-cover object-center transition-transform duration-[4000ms] ease-out ${heroIdx === 2 ? "scale-100" : "scale-[1.06]"}`}
                sizes="(max-width:768px) 100vw, 50vw"
              />
            </div>
            <div className="flex flex-col justify-center border-t-[3px] border-neutral-950/8 bg-[#faf9f7] px-6 py-10 md:border-t-0 md:px-12 lg:px-16 xl:px-20">
              <div key={`b2-${heroIdx}`} className="flex flex-col">
                <p className="hero-enter hero-enter-d1 text-[9px] font-bold tracking-[0.4em] uppercase text-neutral-500">
                  Para los que quieren destacar
                </p>
                <h2 className="hero-enter hero-enter-d2 mt-5 font-serif text-[clamp(2.25rem,6vw,5rem)] font-medium leading-[1.0] tracking-tight text-neutral-950">
                  Huele guapo.
                </h2>
                <div className="hero-enter hero-enter-d3 mt-6 h-px w-12 bg-neutral-950/20" />
                <p className="hero-enter hero-enter-d3 mt-5 max-w-sm text-sm leading-[1.75] text-neutral-600">
                  ¿Te imaginas ser el &ldquo;es que no sé qué tiene&rdquo; en la plática con las amigas?
                </p>
                <div className="hero-enter hero-enter-d4 mt-8 flex flex-wrap gap-3">
                  <Link
                    href="/collections/hombre"
                    className="inline-flex min-h-[44px] items-center justify-center bg-neutral-950 px-8 text-[10px] font-bold tracking-[0.25em] uppercase text-[#faf9f7] transition hover:bg-neutral-800"
                  >
                    Quiero Oler Así
                  </Link>
                  <Link
                    href="/collections"
                    className="inline-flex min-h-[44px] items-center justify-center border border-neutral-950 px-8 text-[10px] font-bold tracking-[0.25em] uppercase text-neutral-950 transition hover:bg-neutral-950 hover:text-[#faf9f7]"
                  >
                    Ver Bundle Atracción Silenciosa
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Flechas — centradas en la imagen (top-[20vh] en mobile = mitad de 40vh imagen) */}
        <button
          onClick={prevSlide}
          className="absolute left-3 top-[20vh] z-20 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-black/35 text-white shadow-md backdrop-blur-sm transition hover:bg-black/60 md:left-4 md:top-1/2 md:h-10 md:w-10"
          aria-label="Banner anterior"
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-3 top-[20vh] z-20 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-black/35 text-white shadow-md backdrop-blur-sm transition hover:bg-black/60 md:right-auto md:top-1/2 md:left-[calc(50%-3rem)] md:h-10 md:w-10"
          aria-label="Banner siguiente"
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* Dots — centrados en mobile, lado imagen en desktop */}
        <div className="absolute bottom-3 left-1/2 z-20 flex -translate-x-1/2 gap-2 md:left-1/4">
          {[0, 1, 2].map((i) => (
            <button
              key={i}
              onClick={() => setHeroIdx(i)}
              className={`h-2 rounded-full transition-all duration-300 ${i === heroIdx ? "w-6 bg-neutral-950" : "w-2 bg-neutral-950/30"
                }`}
              aria-label={`Banner ${i + 1}`}
            />
          ))}
        </div>
      </section>

      {/* Trust bar — debajo del hero */}
      <div className="w-full bg-[#d4c4b0]">
        <div className="mx-auto grid max-w-screen-xl grid-cols-2 divide-x divide-neutral-950/10 md:grid-cols-4">
          {[
            { icon: "↩", label: "Devoluciones gratis" },
            { icon: "→", label: "Envíos sin costo" },
            { icon: "★", label: "+10,000 reseñas" },
            { icon: "⊘", label: "Pago 100% seguro" },
          ].map(({ icon, label }) => (
            <div key={label} className="flex items-center justify-center gap-2.5 px-4 py-3.5">
              <span className="font-serif text-base font-bold text-neutral-900">{label}</span>
              <span className="text-sm text-neutral-700">{icon}</span>
            </div>
          ))}
        </div>
      </div>

      {/* 3. COLECCIONES CON TABS */}
      <section className="bg-white py-10 md:py-16">
        <div className="mx-auto max-w-screen-xl px-4 md:px-10">

          {/* Eyebrow + tabs centrados */}
          <div className="mb-8 text-center">
            <p className="text-[11px] font-bold tracking-[0.35em] uppercase text-[#999]">
              Colecciones
            </p>

            {/* Tab nav */}
            <div className="mt-4 flex items-end justify-center gap-0 overflow-x-auto whitespace-nowrap border-b border-neutral-200">
              {["MÁS VENDIDOS", "BUNDLES", "HOMBRE", "MUJER", "SUSCRIPCIÓN"].map((tab) => (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setActiveTab(tab)}
                  className={`shrink-0 px-5 pb-3 pt-2 text-[11px] tracking-[0.18em] uppercase transition-colors md:px-8 ${activeTab === tab
                      ? "border-b-[3px] border-neutral-950 font-bold text-neutral-950"
                      : "border-b-[3px] border-transparent font-normal text-[#555] hover:text-neutral-800"
                    }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {/* ── Tab: MÁS VENDIDOS ── */}
          {activeTab === "MÁS VENDIDOS" && (
            <ProductGrid products={products.slice(0, 8)} ctaHref="/collections" ctaLabel="Ver catálogo completo" />
          )}

          {/* ── Tab: BUNDLES ── */}
          {activeTab === "BUNDLES" && (
            <>
              <div className="mb-10 text-center">
                <h3 className="font-serif text-2xl font-bold leading-tight text-neutral-950 md:text-3xl">
                  NO ELIGES UN PERFUME.
                  <br />
                  ELIGES CÓMO QUIERES SER PERCIBIDO.
                </h3>
              </div>
              <div className="grid gap-6 md:grid-cols-3">
                {BUNDLES.map((b) => (
                  <div
                    key={b.name}
                    className="group relative flex flex-col border border-neutral-200 bg-white transition hover:shadow-lg"
                  >
                    {b.badge && (
                      <span className={`absolute left-4 top-4 z-10 inline-block px-3 py-1 text-[9px] font-bold tracking-[0.25em] uppercase text-white ${b.badgeColor}`}>
                        {b.badge}
                      </span>
                    )}
                    <div className="relative aspect-[4/5] overflow-hidden bg-[#f5f3ef]">
                      <Image
                        src={b.image}
                        alt={b.name}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                      />
                    </div>
                    <div className="flex flex-1 flex-col p-6">
                      <h4 className="text-base font-bold text-neutral-950">{b.name}</h4>
                      <p className="mt-0.5 font-serif text-sm italic text-neutral-500">{b.headline}</p>

                      <div className="mt-4 border-t border-neutral-100 pt-4">
                        <p className="text-[9px] font-bold tracking-[0.2em] uppercase text-neutral-500">Incluye:</p>
                        <p className="mt-1 text-[11px] font-bold tracking-wide text-neutral-950">{b.includes}</p>
                      </div>

                      <p className="mt-3 text-[10px] leading-snug text-neutral-500">{b.inspiration}</p>

                      <div className="mt-4">
                        <p className="text-[9px] font-bold tracking-[0.2em] uppercase text-neutral-400">
                          Valor de mercado equivalente:
                        </p>
                        <p className="mt-0.5 text-[11px] text-neutral-400 line-through">{b.marketValue}</p>
                      </div>

                      <div className="mt-3">
                        <p className="text-[9px] font-bold tracking-[0.2em] uppercase text-neutral-500">Tu inversión:</p>
                        <p className="text-2xl font-bold text-neutral-950">{b.price} <span className="text-[11px] font-normal text-neutral-500">MXN</span></p>
                      </div>

                      <Link
                        href={b.href}
                        className="mt-4 block w-full bg-neutral-950 py-3.5 text-center text-[9px] font-bold tracking-[0.25em] uppercase text-white transition hover:bg-neutral-800"
                      >
                        {b.cta}
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          {/* ── Tab: HOMBRE ── */}
          {activeTab === "HOMBRE" && (
            hombreProducts.length > 0
              ? <ProductGrid products={hombreProducts} ctaHref={hombreHref} ctaLabel="Ver toda la colección Hombre" />
              : <CollectionCTA label="Perfumes para Él" description="Fragancias diseñadas para proyectar presencia, atracción y carácter." href={hombreHref} cta="Ver colección Hombre" />
          )}

          {/* ── Tab: MUJER ── */}
          {activeTab === "MUJER" && (
            mujerProducts.length > 0
              ? <ProductGrid products={mujerProducts} ctaHref={mujerHref} ctaLabel="Ver toda la colección Mujer" />
              : <CollectionCTA label="Perfumes para Ella" description="Fragancias que se convierten en firma personal — delicadas, profundas, memorables." href={mujerHref} cta="Ver colección Mujer" />
          )}

          {/* ── Tab: SUSCRIPCIÓN ── */}
          {activeTab === "SUSCRIPCIÓN" && (
            <div className="flex flex-col items-center justify-center rounded-sm bg-neutral-50 py-20 text-center">
              <svg className="h-10 w-10 text-neutral-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
              </svg>
              <p className="mt-4 font-serif text-xl font-medium text-neutral-950">Próximamente</p>
              <p className="mt-2 max-w-xs text-sm text-neutral-500">
                Suscríbete y recibe tu fragancia favorita cada mes con beneficios exclusivos.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* 4. Quiz interactivo */}
      <section
        id="encuentra-tu-aroma"
        className="scroll-mt-28 border-y border-neutral-950/10 bg-[#faf9f7]"
      >
        <div className="mx-auto max-w-5xl px-4 py-12 md:px-8 md:py-16" data-gsap="fade-up">
          <PerfumeDiscoveryQuiz products={quizProducts} variant="embedded" />
        </div>
      </section>

      {/* 5. UGC Videos */}
      <UgcVideoSection />

      {/* 6. Reviews */}
      <section className="bg-[#faf9f7] py-20 md:py-28">
        <div className="mx-auto max-w-screen-2xl px-4 md:px-10">
          <div className="mx-auto max-w-2xl text-center" data-gsap="fade-up">
            <p className="text-[9px] font-bold tracking-[0.4em] text-neutral-500 uppercase">
              Prueba social
            </p>
            <h3 className="mt-4 font-serif text-3xl font-medium text-neutral-950 md:text-5xl">
              A ellos hoy los perciben diferentes
            </h3>
            <div className="mt-6 flex items-center justify-center gap-3">
              <div className="flex items-center gap-0.5 text-neutral-950">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-4 w-4" fill="currentColor" strokeWidth={0} />
                ))}
              </div>
              <p className="text-sm font-medium text-neutral-950">4.9</p>
              <span className="h-3 w-px bg-neutral-950/30" />
              <p className="text-xs text-neutral-600">
                Basado en <span className="font-semibold text-neutral-950">1,240+</span> reseñas verificadas
              </p>
            </div>
          </div>

          <div
            className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
            data-gsap="fade-up"
            data-gsap-delay="0.15"
            data-gsap-stagger="0.08"
          >
            {REVIEWS.map((review) => (
              <article
                key={review.name}
                className="flex flex-col border border-neutral-950/10 bg-white p-8 transition-colors hover:border-neutral-950/30 md:p-9"
              >
                {/* Header: avatar + nombre + ubicación */}
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-neutral-950 text-sm font-bold text-white">
                    {review.name.split(" ").map((n) => n[0]).slice(0, 2).join("")}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-serif text-base font-medium text-neutral-950">
                      {review.name}
                    </p>
                    <p className="truncate text-[10px] font-bold tracking-[0.2em] text-neutral-500 uppercase">
                      {review.location}
                    </p>
                  </div>
                </div>

                {/* Rating + fecha */}
                <div className="mt-6 flex items-center justify-between">
                  <div className="flex items-center gap-0.5 text-neutral-950">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className="h-3.5 w-3.5"
                        fill={i < review.rating ? "currentColor" : "none"}
                        strokeWidth={i < review.rating ? 0 : 1.5}
                      />
                    ))}
                  </div>
                  <p className="text-[10px] tracking-wider text-neutral-500 uppercase">
                    {review.date}
                  </p>
                </div>

                {/* Quote */}
                <blockquote className="mt-6 flex-1 font-serif text-base leading-[1.65] text-neutral-800 md:text-[17px]">
                  <span className="mr-1 text-neutral-950/40">«</span>
                  {review.quote}
                  <span className="ml-1 text-neutral-950/40">»</span>
                </blockquote>

                {/* Footer: producto comprado */}
                <div className="mt-7 flex items-center gap-3 border-t border-neutral-950/10 pt-5">
                  <span className="text-[9px] font-bold tracking-[0.3em] text-neutral-500 uppercase">
                    Compró
                  </span>
                  <span className="font-serif text-sm font-medium text-neutral-950">
                    {review.product}
                  </span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* [Bestsellers duplicate removed] */}
      {false && shopConfigured && products.length > 0 ? (
        <section className="border-t border-neutral-950/10 bg-white py-16 md:py-24">
          <div className="mx-auto max-w-screen-2xl px-4 md:px-10">
            <div
              className="mb-12 flex flex-col justify-between gap-6 md:mb-16 md:flex-row md:items-end"
              data-gsap="fade-up"
            >
              <div>
                <p className="text-[9px] font-bold tracking-[0.4em] text-neutral-500 uppercase">
                  Seleccion tienda
                </p>
                <h3 className="mt-3 font-serif text-3xl font-medium text-neutral-950 md:text-4xl">
                  Los mas buscados
                </h3>
              </div>
              <Link
                href="/collections"
                className="text-[9px] font-bold tracking-[0.25em] text-neutral-950 uppercase underline-offset-8 hover:underline"
              >
                Ver catalogo completo
              </Link>
            </div>
            <div
              className="grid grid-cols-2 gap-px bg-neutral-950/10 sm:grid-cols-3 lg:grid-cols-4"
              data-gsap="fade-up"
              data-gsap-stagger="0.06"
            >
              {products.map((p) => (
                <Link
                  key={p.handle}
                  href={p.href}
                  className="group flex flex-col bg-white"
                >
                  <div className="relative aspect-[3/4] bg-neutral-100">
                    {p.imageUrl ? (
                      <Image
                        src={p.imageUrl}
                        alt={p.imageAlt}
                        fill
                        className="object-cover transition duration-500 group-hover:opacity-90"
                        sizes="(max-width:640px) 50vw, 25vw"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center text-[10px] text-neutral-400">
                        --
                      </div>
                    )}
                  </div>
                  <div className="border-t border-neutral-950/5 p-4">
                    <p className="line-clamp-2 text-[10px] font-bold tracking-[0.15em] text-neutral-950 uppercase">
                      {p.title}
                    </p>
                    {p.priceAmount ? (
                      <p className="mt-2 font-serif text-sm text-neutral-700">
                        {formatMoney(p.priceAmount, p.priceCurrency)}
                      </p>
                    ) : null}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      ) : shopConfigured && products.length === 0 ? (
        <section className="border-t border-neutral-950/10 px-4 py-16 text-center text-sm text-neutral-500">
          No hay productos publicados en Shopify.
        </section>
      ) : null}

      {/* 1.8 Bundles / Sets de regalo — sección dedicada con protagonismo
      <section className="border-t border-neutral-950/10 bg-[#faf9f7] py-20 md:py-28">
        <div className="mx-auto max-w-screen-2xl px-4 md:px-10">
          <div className="grid gap-12 md:grid-cols-12 md:gap-14 lg:gap-20">
            <div
              className="relative aspect-[4/5] overflow-hidden bg-neutral-200 md:col-span-7 md:aspect-[5/6]"
              data-gsap="zoom-out"
            >
              <Image
                src={bundleCollection?.imageUrl || "/home/hero-duo-urban.png"}
                alt={bundleCollection?.imageAlt || "Sets de regalo Tryphé"}
                fill
                className="object-cover"
                sizes="(max-width:768px) 100vw, 58vw"
              />
              <div className="absolute top-6 left-6 md:top-10 md:left-10">
                <p className="font-serif text-5xl leading-none text-[#faf9f7] md:text-6xl">05</p>
                <span className="mt-4 block h-px w-12 bg-[#faf9f7]/70" />
              </div>
            </div>
            <div
              className="flex flex-col justify-center md:col-span-5"
              data-gsap="fade-up"
              data-gsap-delay="0.15"
              data-gsap-stagger="0.1"
            >
              <p className="text-[10px] font-bold tracking-[0.5em] text-neutral-500 uppercase">
                Sets &amp; Bundles
              </p>
              <h3 className="mt-6 font-serif text-[clamp(2.25rem,4.5vw,3.5rem)] font-medium leading-[1.05] tracking-tight text-neutral-950">
                Dos fragancias, una sola firma.
              </h3>
              <p className="mt-8 text-sm leading-[1.85] text-neutral-600 md:text-base">
                Combinaciones pensadas para el día y la noche, para regalo o ritual propio. Un
                empaque premium — el lujo de abrirlo es parte del aroma.
              </p>
              <ul className="mt-8 space-y-3 text-sm text-neutral-700 md:text-[15px]">
                <li className="flex gap-3">
                  <span className="mt-2 h-px w-6 bg-neutral-950/40" />
                  <span>Duo curado con dos aromas complementarios.</span>
                </li>
                <li className="flex gap-3">
                  <span className="mt-2 h-px w-6 bg-neutral-950/40" />
                  <span>Empaque de regalo listo para entregar.</span>
                </li>
                <li className="flex gap-3">
                  <span className="mt-2 h-px w-6 bg-neutral-950/40" />
                  <span>Mejor precio que la compra individual.</span>
                </li>
              </ul>
              <div className="mt-10 flex flex-wrap gap-4">
                <Link
                  href={
                    bundleCollection
                      ? `/collections/${encodeURIComponent(bundleCollection.handle)}`
                      : "/collections"
                  }
                  className="inline-flex min-h-[48px] items-center justify-center border border-neutral-950 bg-neutral-950 px-10 text-[10px] font-bold tracking-[0.25em] text-[#faf9f7] uppercase transition hover:bg-neutral-800"
                >
                  Ver Sets &amp; Bundles
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      */}

      {/* 7. BANNER PARTNERS */}
      <PartnersBanner />
    </TrypheMarketingChrome>
  );
}

/* ─── Shared sub-components for the Colecciones tabs ─── */

function ProductGrid({ products, ctaHref, ctaLabel }) {
  return (
    <>
      <div className="grid grid-cols-2 gap-4 sm:gap-5 md:grid-cols-4 md:gap-6">
        {products.map((p) => (
          <a key={p.handle} href={p.href} className="group flex flex-col">
            <div className="relative aspect-[3/4] overflow-hidden bg-[#f5f3ef]">
              {p.imageUrl ? (
                <Image
                  src={p.imageUrl}
                  alt={p.imageAlt || p.title}
                  fill
                  sizes="(max-width:640px) 50vw, 25vw"
                  className="object-contain object-center transition-transform duration-300 ease-out group-hover:scale-[1.03]"
                />
              ) : (
                <div className="h-full w-full bg-[#e8e1d8]" />
              )}
            </div>
            <div className="mt-3 flex flex-col gap-0.5">
              <p className="line-clamp-2 text-[13px] leading-snug text-neutral-950">
                {p.title}
              </p>
              <div className="flex items-baseline gap-2">
                {p.compareAtAmount && Number(p.compareAtAmount) > Number(p.priceAmount) && (
                  <span className="text-[11px] text-neutral-400 line-through">
                    ${Number(p.compareAtAmount).toLocaleString("es-MX", { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                  </span>
                )}
                <span className="text-[13px] font-bold text-neutral-950">
                  ${Number(p.priceAmount).toLocaleString("es-MX", { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                </span>
              </div>
            </div>
          </a>
        ))}
      </div>
      <div className="mt-10 text-center">
        <Link
          href={ctaHref || "/collections"}
          className="inline-flex min-h-[44px] items-center justify-center border border-neutral-950 px-10 text-[9px] font-bold tracking-[0.25em] uppercase text-neutral-950 transition hover:bg-neutral-950 hover:text-white"
        >
          {ctaLabel || "Ver más"} →
        </Link>
      </div>
    </>
  );
}

function CollectionCTA({ label, description, href, cta }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <p className="font-serif text-3xl font-medium text-neutral-950">{label}</p>
      <p className="mt-4 max-w-sm text-sm text-neutral-500">{description}</p>
      <Link
        href={href}
        className="mt-8 inline-flex min-h-[46px] items-center justify-center border border-neutral-950 px-10 text-[9px] font-bold tracking-[0.25em] uppercase text-neutral-950 transition hover:bg-neutral-950 hover:text-white"
      >
        {cta}
      </Link>
    </div>
  );
}
