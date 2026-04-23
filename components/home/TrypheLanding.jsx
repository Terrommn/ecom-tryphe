"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState, useEffect, useCallback } from "react";
import { Star } from "lucide-react";
import { formatMoney } from "@/lib/money";
import { TrypheMarketingChrome } from "@/components/home/TrypheMarketingChrome";
import { PerfumeDiscoveryQuiz } from "@/components/quiz/PerfumeDiscoveryQuiz";

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

const HERO_SLIDES = [
  "/home/hero-duo-city.png",
  "/home/bottle-ignis.png",
  "/home/bottle-water.jpg",
  "/home/bottle-cabos.jpg",
];

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
  quizProducts = [],
}) {
  const [heroIdx, setHeroIdx] = useState(0);

  const nextSlide = useCallback(() => {
    setHeroIdx((i) => (i + 1) % HERO_SLIDES.length);
  }, []);

  const prevSlide = useCallback(() => {
    setHeroIdx((i) => (i - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
  }, []);

  useEffect(() => {
    const id = setInterval(nextSlide, 5000);
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
      {/* 1.1 Hero -- editorial split with slider */}
      <section className="grid min-h-[min(88vh,920px)] md:grid-cols-2">
        <div className="relative min-h-[42vh] overflow-hidden md:min-h-0 md:aspect-square">
          {HERO_SLIDES.map((src, i) => (
            <Image
              key={src}
              src={src}
              alt={`Editorial Tryphé ${i + 1}`}
              fill
              className={`object-cover object-center transition-opacity duration-1000 ease-in-out ${
                i === heroIdx ? "opacity-100" : "opacity-0"
              }`}
              sizes="(max-width:768px) 100vw, 50vw"
              priority={i === 0}
            />
          ))}
          {/* Nav arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/30 text-white backdrop-blur-sm transition hover:bg-black/50"
            aria-label="Anterior"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/30 text-white backdrop-blur-sm transition hover:bg-black/50"
            aria-label="Siguiente"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
          {/* Dots */}
          <div className="absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 gap-2">
            {HERO_SLIDES.map((_, i) => (
              <button
                key={i}
                onClick={() => setHeroIdx(i)}
                className={`h-2 rounded-full transition-all ${
                  i === heroIdx ? "w-6 bg-white" : "w-2 bg-white/50"
                }`}
                aria-label={`Slide ${i + 1}`}
              />
            ))}
          </div>
        </div>
        <div
          className="flex flex-col justify-center border-neutral-950/10 bg-[#faf9f7] px-6 py-14 md:border-l md:px-12 lg:px-16 xl:px-20"
          data-gsap="fade-up"
          data-gsap-stagger="0.12"
        >
          <p className="text-[9px] font-bold tracking-[0.45em] text-neutral-500 uppercase">
            Estetica olfativa
          </p>
          <h2 className="mt-6 font-serif text-[clamp(2rem,5vw,3.75rem)] font-medium leading-[1.05] tracking-tight text-neutral-950">
            Huele a quien ya lo logró
          </h2>
          <p className="mt-8 max-w-md text-sm leading-[1.75] text-neutral-600 md:text-base">
            Inspirado en perfumería de nicho.
            <br />
            Diseñado para proyectar presencia, no para pasar desapercibido.
            <br />
            Tu fragancia como firma — no como accesorio.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              href="/#encuentra-tu-aroma"
              className="inline-flex min-h-[48px] items-center justify-center border border-neutral-950 bg-neutral-950 px-10 text-[10px] font-bold tracking-[0.25em] text-[#faf9f7] uppercase transition hover:bg-neutral-800"
            >
              Encuentra tu Aroma Ideal
            </Link>
            <Link
              href="/collections"
              className="inline-flex min-h-[48px] items-center justify-center border border-neutral-950 px-10 text-[10px] font-bold tracking-[0.25em] text-neutral-950 uppercase transition hover:bg-neutral-950 hover:text-[#faf9f7]"
            >
              Explorar Fragancias
            </Link>
          </div>
          <p className="mt-8 font-serif text-sm italic text-neutral-700 md:text-base">
            Porque la primera impresión no se repite.
          </p>
        </div>
      </section>

      {/* 1.1b Trust-bar — garantía 30 días */}
      <section className="border-y border-neutral-950/10 bg-neutral-950 text-[#faf9f7]">
        <div className="mx-auto flex max-w-screen-2xl flex-col items-center justify-center gap-3 px-4 py-4 text-center md:flex-row md:gap-6 md:px-10">
          <p className="text-[9px] font-bold tracking-[0.4em] text-[#faf9f7]/60 uppercase">
            Garantía TRYPHÉ 30 días
          </p>
          <span className="hidden h-3 w-px bg-[#faf9f7]/25 md:block" />
          <p className="font-serif text-sm leading-tight text-[#faf9f7] md:text-base">
            Pruébalo sin riesgo. Si no conecta contigo, lo cambiamos por otra fragancia.{" "}
            <span className="italic text-[#faf9f7]/75">Sin preguntas.</span>
          </p>
        </div>
      </section>

      {/* 1.2 Quiz interactivo */}
      <section
        id="encuentra-tu-aroma"
        className="scroll-mt-28 border-y border-neutral-950/10 bg-[#faf9f7]"
      >
        <div className="mx-auto max-w-5xl px-4 py-12 md:px-8 md:py-16" data-gsap="fade-up">
          <PerfumeDiscoveryQuiz products={quizProducts} variant="embedded" />
        </div>
      </section>

      {/* 1.3 Colecciones destacadas */}
      {featuredTiles.length > 0 ? (
        <section className="bg-[#faf9f7] py-16 md:py-24">
          <div className="mx-auto max-w-screen-2xl px-4 md:px-10">
            <div className="mb-12 text-center md:mb-16" data-gsap="fade-up">
              <p className="text-[9px] font-bold tracking-[0.4em] text-neutral-500 uppercase">
                Colecciones destacadas
              </p>
              <h3 className="mt-4 font-serif text-3xl font-medium text-neutral-950 md:text-4xl">
                El catalogo en cuatro entradas
              </h3>
            </div>
            <div
              className="grid grid-cols-2 gap-px bg-neutral-950/10 md:grid-cols-3"
              data-gsap="scale-in"
              data-gsap-stagger="0.1"
            >
              {featuredTiles.map((c, idx) => {
                const fallback =
                  COLLECTION_IMAGE_FALLBACK[idx % COLLECTION_IMAGE_FALLBACK.length];
                const imgSrc = c.imageUrl || fallback;
                return (
                <Link
                  key={c.handle}
                  href={`/collections/${encodeURIComponent(c.handle)}`}
                  className="group relative aspect-[3/4] bg-neutral-200"
                >
                  <Image
                    src={imgSrc}
                    alt={c.imageAlt || c.title}
                    fill
                    className="object-cover transition duration-700 group-hover:opacity-90"
                    sizes="(max-width:768px) 50vw, 33vw"
                  />
                  <div className="absolute inset-x-0 bottom-0 bg-neutral-950 p-4 text-[#faf9f7]">
                    <p className="text-[8px] font-bold tracking-[0.25em] text-[#faf9f7]/60 uppercase">
                      {c.label}
                    </p>
                    <p className="mt-1 line-clamp-2 font-serif text-sm font-medium leading-tight">
                      {c.title}
                    </p>
                  </div>
                </Link>
                );
              })}
            </div>
          </div>
        </section>
      ) : null}

      {/* 1.4 Love by Celebrities — editorial magazine layout */}
      <section className="bg-[#faf9f7] py-20 md:py-28">
        <div className="mx-auto max-w-screen-2xl px-4 md:px-10">
          {/* Masthead editorial */}
          <div className="text-center" data-gsap="fade-up">
            <div className="flex items-center justify-center gap-6">
              <span className="h-px w-20 bg-neutral-950/25 md:w-28" />
              <p className="text-[10px] font-bold tracking-[0.55em] text-neutral-950/70 uppercase">
                Prensa & Cultura
              </p>
              <span className="h-px w-20 bg-neutral-950/25 md:w-28" />
            </div>
            <h3 className="mt-7 font-serif text-[clamp(2.75rem,6.5vw,5.25rem)] font-medium leading-[1] tracking-tight text-neutral-950">
              Love by <em className="italic text-neutral-950/70">Celebrities</em>
            </h3>
            <p className="mx-auto mt-7 max-w-xl text-sm leading-[1.85] text-neutral-600 md:text-base">
              No es coincidencia. Es percepción.
              <br />
              TRYPHÉ vive en el mismo universo donde el estilo no se explica — se reconoce.
            </p>
          </div>

          {/* Editorial grid asimétrico */}
          <div
            className="mt-16 grid grid-cols-1 gap-10 md:mt-24 md:grid-cols-12 md:gap-x-12 md:gap-y-16"
            data-gsap="fade-up"
            data-gsap-delay="0.15"
            data-gsap-stagger="0.1"
          >
            {/* Editorial 01 — feature grande (ocupa 7/12 y 2 filas) */}
            <article className="group flex flex-col md:col-span-7 md:row-span-2">
              <div className="relative aspect-[4/5] overflow-hidden bg-neutral-200">
                <Image
                  src={CELEBRITY_PLACEHOLDERS[0].image}
                  alt={`Editorial 1 — ${CELEBRITY_PLACEHOLDERS[0].source}`}
                  fill
                  className="object-cover grayscale transition-[filter,transform] duration-[1200ms] ease-out group-hover:scale-[1.02] group-hover:grayscale-0"
                  sizes="(max-width:768px) 100vw, 58vw"
                />
                <div className="absolute top-6 left-6 md:top-8 md:left-8">
                  <p className="font-serif text-5xl leading-none text-[#faf9f7] md:text-6xl">01</p>
                  <span className="mt-4 block h-px w-12 bg-[#faf9f7]/70" />
                </div>
              </div>
              <div className="mt-8 md:mt-10">
                <p className="text-[9px] font-bold tracking-[0.4em] text-neutral-500 uppercase">
                  {CELEBRITY_PLACEHOLDERS[0].source}
                </p>
                <blockquote className="mt-5 font-serif text-2xl leading-[1.3] text-neutral-950 md:text-3xl lg:text-4xl">
                  <span className="mr-1 text-neutral-950/40">«</span>
                  {CELEBRITY_PLACEHOLDERS[0].quote}
                  <span className="ml-1 text-neutral-950/40">»</span>
                </blockquote>
              </div>
            </article>

            {/* Editoriales 02 y 03 — apilados a la derecha */}
            {[1, 2].map((idx) => (
              <article
                key={idx}
                className="group flex gap-5 md:col-span-5 md:gap-6"
              >
                <div className="relative w-2/5 flex-shrink-0 overflow-hidden bg-neutral-200 md:w-[45%]">
                  <div className="relative aspect-[3/4] h-full w-full">
                    <Image
                      src={CELEBRITY_PLACEHOLDERS[idx].image}
                      alt={`Editorial ${idx + 1} — ${CELEBRITY_PLACEHOLDERS[idx].source}`}
                      fill
                      className="object-cover grayscale transition-[filter] duration-1000 ease-out group-hover:grayscale-0"
                      sizes="(max-width:768px) 40vw, 20vw"
                    />
                  </div>
                </div>
                <div className="flex flex-1 flex-col justify-between py-1">
                  <div>
                    <p className="font-serif text-4xl leading-none text-neutral-950/25 md:text-5xl">
                      {String(idx + 1).padStart(2, "0")}
                    </p>
                    <p className="mt-5 text-[9px] font-bold tracking-[0.4em] text-neutral-500 uppercase">
                      {CELEBRITY_PLACEHOLDERS[idx].source}
                    </p>
                    <blockquote className="mt-4 font-serif text-base leading-[1.4] text-neutral-950 md:text-lg lg:text-xl">
                      <span className="text-neutral-950/40">«</span>
                      {CELEBRITY_PLACEHOLDERS[idx].quote}
                      <span className="text-neutral-950/40">»</span>
                    </blockquote>
                  </div>
                  <span className="mt-6 block h-px w-10 bg-neutral-950/25" />
                </div>
              </article>
            ))}

            {/* Editorial 04 — banda horizontal ancha */}
            <article className="group mt-4 flex flex-col gap-8 border-t border-neutral-950/15 pt-12 md:col-span-12 md:mt-8 md:flex-row md:gap-14 md:pt-16">
              <div className="relative overflow-hidden bg-neutral-200 md:w-1/2">
                <div className="relative aspect-[16/10] w-full md:aspect-[5/3]">
                  <Image
                    src={CELEBRITY_PLACEHOLDERS[3].image}
                    alt={`Editorial 4 — ${CELEBRITY_PLACEHOLDERS[3].source}`}
                    fill
                    className="object-cover grayscale transition-[filter,transform] duration-[1200ms] ease-out group-hover:scale-[1.02] group-hover:grayscale-0"
                    sizes="(max-width:768px) 100vw, 50vw"
                  />
                </div>
              </div>
              <div className="flex flex-1 flex-col justify-center">
                <div className="flex items-baseline gap-6">
                  <p className="font-serif text-6xl leading-none text-neutral-950/25 md:text-7xl">
                    04
                  </p>
                  <span className="h-px flex-1 bg-neutral-950/20" />
                </div>
                <p className="mt-7 text-[9px] font-bold tracking-[0.4em] text-neutral-500 uppercase">
                  {CELEBRITY_PLACEHOLDERS[3].source}
                </p>
                <blockquote className="mt-5 font-serif text-2xl leading-[1.25] text-neutral-950 md:text-3xl lg:text-4xl">
                  <span className="mr-1 text-neutral-950/40">«</span>
                  {CELEBRITY_PLACEHOLDERS[3].quote}
                  <span className="ml-1 text-neutral-950/40">»</span>
                </blockquote>
              </div>
            </article>
          </div>

          {/* Footer editorial con metadatos */}
          <div className="mt-16 flex flex-col items-start justify-between gap-4 border-t border-neutral-950/15 pt-8 md:mt-20 md:flex-row md:items-center">
            <p className="text-[9px] font-bold tracking-[0.4em] text-neutral-500 uppercase">
              04 Editoriales destacados
            </p>
            <p className="text-[9px] font-bold tracking-[0.4em] text-neutral-500 uppercase">
              Tryphé — Prensa {new Date().getFullYear()}
            </p>
          </div>
        </div>
      </section>

      {/* 1.5 Confianza y calidad */}
      <section className="border-y border-neutral-950/10 bg-neutral-950 text-[#faf9f7]">
        <div className="mx-auto grid max-w-screen-2xl lg:grid-cols-2">
          <div className="relative min-h-[300px] overflow-hidden lg:min-h-[480px]" data-gsap="zoom-out">
            <Image
              src="/home/bottle-water.jpg"
              alt="Tryphé Elysse cayendo en agua"
              fill
              className="object-cover"
              sizes="(max-width:1024px) 100vw, 50vw"
            />
          </div>
          <div
            className="flex flex-col justify-center px-6 py-16 md:px-12 lg:py-24"
            data-gsap="fade-up"
            data-gsap-delay="0.2"
            data-gsap-stagger="0.1"
          >
            <p className="text-[9px] font-bold tracking-[0.4em] text-[#faf9f7]/45 uppercase">
              Transparencia
            </p>
            <h3 className="mt-5 font-serif text-3xl font-medium leading-tight md:text-4xl">
              Confianza y calidad
            </h3>
            <p className="mt-10 text-base leading-[1.85] text-[#faf9f7]/80 md:text-lg">
              <span className="text-[#faf9f7]">Misma formula, precio justo.</span> Referencia de mercado
              en boutiques de lujo frecuentemente por encima de{" "}
              <span className="font-semibold text-[#faf9f7]">$8,000</span> -- nuestro enfoque, desde{" "}
              <span className="font-semibold text-[#faf9f7]">$649</span>, prioriza el acceso sin
              renunciar a la experiencia.
            </p>
            <p className="mt-8 text-sm leading-relaxed text-[#faf9f7]/65">
              Empaque premium, pensado para regalo desde el primer contacto.
            </p>
          </div>
        </div>
      </section>

      {/* 1.6 Reviews — prueba social */}
      <section className="bg-[#faf9f7] py-20 md:py-28">
        <div className="mx-auto max-w-screen-2xl px-4 md:px-10">
          <div className="mx-auto max-w-2xl text-center" data-gsap="fade-up">
            <p className="text-[9px] font-bold tracking-[0.4em] text-neutral-500 uppercase">
              Prueba social
            </p>
            <h3 className="mt-4 font-serif text-3xl font-medium text-neutral-950 md:text-5xl">
              Lo que dicen nuestros clientes
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
                  <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full bg-neutral-200">
                    <Image
                      src={review.avatar}
                      alt={`Avatar de ${review.name}`}
                      fill
                      className="object-cover"
                      sizes="48px"
                    />
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

      {/* Bestsellers */}
      {shopConfigured && products.length > 0 ? (
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

      {/* 1.9 Partner TRYPHÉ — distribuidores */}
      <section className="border-t border-neutral-950/10 bg-neutral-950 text-[#faf9f7]">
        <div
          className="mx-auto max-w-screen-2xl px-4 py-20 md:px-10 md:py-28"
          data-gsap="fade-up"
          data-gsap-stagger="0.1"
        >
          <div className="grid items-end gap-10 md:grid-cols-12 md:gap-14">
            <div className="md:col-span-7">
              <div className="flex items-center gap-4">
                <span className="h-px w-12 bg-[#faf9f7]/40" />
                <p className="text-[10px] font-bold tracking-[0.5em] text-[#faf9f7]/60 uppercase">
                  Partner TRYPHÉ
                </p>
              </div>
              <h3 className="mt-6 font-serif text-[clamp(2.25rem,5vw,4rem)] font-medium leading-[1.05] tracking-tight text-[#faf9f7]">
                Conviértete en distribuidor TRYPHÉ.
              </h3>
              <p className="mt-8 max-w-xl text-sm leading-[1.85] text-[#faf9f7]/75 md:text-base">
                Buscamos aliados que compartan nuestra visión de perfumería accesible y de alto
                nivel. Programa de distribución con márgenes competitivos, soporte de marca y
                catálogo completo para tiendas físicas y digitales.
              </p>
            </div>

            <div className="md:col-span-5">
              <ul className="space-y-4 border-t border-[#faf9f7]/15 pt-6 text-sm text-[#faf9f7]/80">
                <li className="flex items-start gap-4">
                  <span className="mt-2 h-px w-6 bg-[#faf9f7]/40" />
                  <span>Márgenes mayoristas y precios escalonados por volumen.</span>
                </li>
                <li className="flex items-start gap-4">
                  <span className="mt-2 h-px w-6 bg-[#faf9f7]/40" />
                  <span>Material de marca y fotografía editorial para tu punto de venta.</span>
                </li>
                <li className="flex items-start gap-4">
                  <span className="mt-2 h-px w-6 bg-[#faf9f7]/40" />
                  <span>Acompañamiento directo — sin intermediarios.</span>
                </li>
              </ul>

              <div className="mt-10">
                <Link
                  href="/partners"
                  className="inline-flex min-h-[48px] items-center justify-center border border-[#faf9f7] bg-transparent px-10 text-[10px] font-bold tracking-[0.25em] text-[#faf9f7] uppercase transition hover:bg-[#faf9f7] hover:text-neutral-950"
                >
                  Quiero ser Partner
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-neutral-950/10 bg-white py-12" data-gsap="fade-in">
        <div className="mx-auto max-w-screen-lg px-4 text-center text-sm text-neutral-700">
          Envios y devoluciones:{" "}
          <Link href="/faq" className="font-semibold underline underline-offset-4">
            FAQ
          </Link>{" "}
          ·{" "}
          <Link href="/contacto" className="font-semibold underline underline-offset-4">
            Contacto
          </Link>
        </div>
      </section>

      <footer className="border-t border-neutral-950/10 bg-[#faf9f7]">
        <div
          className="mx-auto grid max-w-screen-2xl grid-cols-2 gap-y-2 px-4 py-10 text-center md:grid-cols-4 md:px-10 md:text-left"
          data-gsap="fade-in"
          data-gsap-stagger="0.08"
        >
          <Link
            href="/acerca"
            className="py-1 text-[9px] font-bold tracking-[0.2em] text-neutral-700 uppercase hover:text-neutral-950"
          >
            Sobre {siteName}
          </Link>
          <Link
            href="/faq"
            className="py-1 text-[9px] font-bold tracking-[0.2em] text-neutral-700 uppercase hover:text-neutral-950"
          >
            Atencion
          </Link>
          <Link
            href="/cart"
            className="py-1 text-[9px] font-bold tracking-[0.2em] text-neutral-700 uppercase hover:text-neutral-950"
          >
            Pedido
          </Link>
          <Link
            href="/contacto"
            className="py-1 text-[9px] font-bold tracking-[0.2em] text-neutral-700 uppercase hover:text-neutral-950"
          >
            Visitanos
          </Link>
        </div>
      </footer>
    </TrypheMarketingChrome>
  );
}
