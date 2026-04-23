"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ProductCard } from "@/components/catalog/ProductCard";
import {
  useScrollReveal,
  useStaggerReveal,
  useParallax,
  useSlideIn,
  useImageZoom,
} from "@/hooks/useGsapReveal";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const IMG_HOMBRE = "/home/hero-hombre.jpg";
const IMG_MUJER = "/home/hero-mujer.jpg";

const COPY = {
  hombre: {
    kicker: "Colección masculina",
    headline: "Fragancias para Él",
    sub: "Proyección, carácter y silencio. Perfumes que no piden permiso — se imponen.",
    philosophy:
      "«El perfume del hombre contemporáneo no grita. Susurra con autoridad.»",
    editorialTitle: "La firma invisible",
    editorialText:
      "Cada fragancia masculina de Tryphé nace de la tensión entre lo crudo y lo refinado. Materias primas de nicho — vetiver haitiano, oud camboyano, cuero reconstituido — trabajadas con la precisión de un laboratorio suizo. El resultado: una proyección que deja huella sin saturar el espacio.",
    editorialImage: "/home/editorial-hombre.png",
    heroImage: IMG_HOMBRE,
    ctaText: "Encuentra tu firma",
  },
  mujer: {
    kicker: "Colección femenina",
    headline: "Fragancias para Ella",
    sub: "Emoción, textura y presencia. Aromas que son extensión de quien los lleva.",
    philosophy:
      "«La mujer que elige su fragancia, elige cómo quiere ser recordada.»",
    editorialTitle: "Una declaración silenciosa",
    editorialText:
      "Las composiciones femeninas de Tryphé exploran la dualidad: la suavidad del iris con la intensidad del oud, la frescura del neroli contra la profundidad de la vainilla tahitiana. No buscamos replicar — buscamos evocar. Cada nota es una capa de intención.",
    editorialImage: "/home/editorial-mujer.png",
    heroImage: IMG_MUJER,
    ctaText: "Descubre tu aroma",
  },
};

export function CollectionLanding({ gender = "hombre", products = [] }) {
  const copy = COPY[gender] ?? COPY.hombre;

  const heroTextRef = useRef(null);
  const heroImgRef = useImageZoom({ scale: 1.08, duration: 1.6 });
  const philosophyRef = useSlideIn({ x: -80, duration: 1 });
  const gridRef = useStaggerReveal(":scope > *", { y: 50, stagger: 0.1 });
  const editTextRef = useScrollReveal({ y: 30, duration: 0.9 });
  const editImgRef = useParallax(40);
  const ctaRef = useScrollReveal({ y: 30, duration: 0.7 });

  /* Hero text — word-by-word stagger */
  useLayoutEffect(() => {
    const el = heroTextRef.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const children = el.querySelectorAll("[data-reveal]");
    gsap.set(children, { opacity: 0, y: 32 });
    const ctx = gsap.context(() => {
      gsap.to(children, {
        opacity: 1,
        y: 0,
        duration: 0.9,
        stagger: 0.15,
        ease: "power3.out",
        delay: 0.3,
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <>
      {/* ── Hero cinemático ── */}
      <section className="relative min-h-[85vh] flex items-end overflow-hidden bg-neutral-950">
        <div ref={heroImgRef} className="absolute inset-0">
          <Image
            src={copy.heroImage}
            alt={copy.headline}
            fill
            className="object-cover object-[center_30%] opacity-60"
            sizes="100vw"
            priority
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/80 via-neutral-950/30 to-transparent" />
        <div
          ref={heroTextRef}
          className="relative z-10 mx-auto w-full max-w-screen-2xl px-6 pb-16 md:px-12 md:pb-24 lg:pb-32"
        >
          <p
            data-reveal
            className="text-[9px] font-bold tracking-[0.5em] text-[#faf9f7]/50 uppercase"
          >
            {copy.kicker}
          </p>
          <h1
            data-reveal
            className="mt-5 font-serif text-[clamp(2.5rem,7vw,5.5rem)] font-medium leading-[1] tracking-tight text-[#faf9f7]"
          >
            {copy.headline}
          </h1>
          <p
            data-reveal
            className="mt-6 max-w-xl text-base leading-relaxed text-[#faf9f7]/70 md:text-lg"
          >
            {copy.sub}
          </p>
          <div data-reveal className="mt-10 flex flex-wrap gap-4">
            <Link
              href="/#encuentra-tu-aroma"
              className="inline-flex min-h-[48px] items-center border border-[#faf9f7] bg-[#faf9f7] px-10 text-[10px] font-bold tracking-[0.25em] text-neutral-950 uppercase transition hover:bg-transparent hover:text-[#faf9f7]"
            >
              {copy.ctaText}
            </Link>
            <Link
              href="/collections"
              className="inline-flex min-h-[48px] items-center border border-[#faf9f7]/40 px-10 text-[10px] font-bold tracking-[0.25em] text-[#faf9f7] uppercase transition hover:border-[#faf9f7] hover:bg-[#faf9f7] hover:text-neutral-950"
            >
              Todo el catálogo
            </Link>
          </div>
        </div>
      </section>

      {/* ── Filosofía strip ── */}
      <section className="border-y border-neutral-950/10 bg-neutral-950 py-12 md:py-16">
        <div className="mx-auto max-w-screen-lg px-6 text-center md:px-12">
          <p
            ref={philosophyRef}
            className="font-serif text-xl leading-relaxed text-[#faf9f7]/80 md:text-2xl lg:text-3xl"
          >
            {copy.philosophy}
          </p>
        </div>
      </section>

      {/* ── Grid de productos ── */}
      <section className="bg-[#faf9f7] py-16 md:py-24">
        <div className="mx-auto max-w-screen-2xl px-4 md:px-10">
          <div className="mb-12 flex flex-col justify-between gap-6 md:mb-16 md:flex-row md:items-end">
            <div>
              <p className="text-[9px] font-bold tracking-[0.4em] text-neutral-500 uppercase">
                {copy.kicker}
              </p>
              <h2 className="mt-3 font-serif text-3xl font-medium text-neutral-950 md:text-4xl">
                Explora la colección
              </h2>
            </div>
            <Link
              href="/collections"
              className="text-[9px] font-bold tracking-[0.25em] text-neutral-950 uppercase underline-offset-8 hover:underline"
            >
              Ver catálogo completo
            </Link>
          </div>
          <div
            ref={gridRef}
            className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:gap-6"
          >
            {products.map((p) => (
              <ProductCard key={p.id || p.handle} product={p} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Editorial intermedio ── */}
      <section className="border-y border-neutral-950/10 bg-white">
        <div className="mx-auto grid max-w-screen-2xl lg:grid-cols-2">
          <div className="relative min-h-[360px] overflow-hidden lg:min-h-[520px]">
            <div ref={editImgRef} className="absolute inset-[-10%]">
              <Image
                src={copy.editorialImage}
                alt={copy.editorialTitle}
                fill
                className="object-cover"
                sizes="(max-width:1024px) 100vw, 50vw"
              />
            </div>
          </div>
          <div
            ref={editTextRef}
            className="flex flex-col justify-center px-6 py-16 md:px-12 lg:px-16 lg:py-24"
          >
            <p className="text-[9px] font-bold tracking-[0.4em] text-neutral-500 uppercase">
              La esencia
            </p>
            <h3 className="mt-5 font-serif text-3xl font-medium leading-tight text-neutral-950 md:text-4xl">
              {copy.editorialTitle}
            </h3>
            <p className="mt-8 text-base leading-[1.85] text-neutral-600 md:text-lg">
              {copy.editorialText}
            </p>
          </div>
        </div>
      </section>

      {/* ── CTA final ── */}
      <section className="bg-neutral-950 py-20 md:py-28">
        <div ref={ctaRef} className="mx-auto max-w-screen-md px-6 text-center">
          <p className="text-[9px] font-bold tracking-[0.5em] text-[#faf9f7]/40 uppercase">
            No sabes por dónde empezar?
          </p>
          <h3 className="mt-5 font-serif text-3xl font-medium text-[#faf9f7] md:text-4xl lg:text-5xl">
            Encuentra tu Aroma
          </h3>
          <p className="mt-6 text-base leading-relaxed text-[#faf9f7]/60">
            Nuestro cuestionario sensorial te guía en menos de 2 minutos hacia la fragancia
            que mejor proyecta tu esencia.
          </p>
          <Link
            href="/encuentra-tu-aroma"
            className="mt-10 inline-flex min-h-[52px] items-center border border-[#faf9f7] bg-[#faf9f7] px-12 text-[10px] font-bold tracking-[0.25em] text-neutral-950 uppercase transition hover:bg-transparent hover:text-[#faf9f7]"
          >
            Iniciar el quiz
          </Link>
        </div>
      </section>
    </>
  );
}
