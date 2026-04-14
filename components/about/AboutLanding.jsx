"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
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

const IMG_CITY = "/home/hero-duo-city.png";
const IMG_URBAN = "/home/hero-duo-urban.png";

const VALUES = [
  {
    title: "Proyección",
    description:
      "Fragancias diseñadas para dejar huella. Concentraciones altas, materias de nicho — la estela no es accidental.",
    icon: "◆",
  },
  {
    title: "Materia",
    description:
      "Ingredientes seleccionados de los mismos proveedores que abastecen casas europeas de alta perfumería.",
    icon: "◇",
  },
  {
    title: "Intención",
    description:
      "Cada composición tiene un propósito emocional: no vendemos notas, vendemos la sensación que dejan.",
    icon: "○",
  },
];

export function AboutLanding() {
  const heroTextRef = useRef(null);
  const heroImgRef = useImageZoom({ scale: 1.06, duration: 1.8 });
  const storyTextRef = useScrollReveal({ y: 35, duration: 0.9 });
  const storyImgRef = useParallax(35);
  const valuesRef = useStaggerReveal(":scope > *", { y: 50, stagger: 0.15, duration: 0.8 });
  const processImgRef = useParallax(30);
  const processTextRef = useScrollReveal({ y: 25, duration: 0.8 });
  const quoteRef = useScrollReveal({ y: 20, duration: 1 });
  const ctaRef = useScrollReveal({ y: 30, duration: 0.7 });

  /* Hero text stagger */
  useLayoutEffect(() => {
    const el = heroTextRef.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const children = el.querySelectorAll("[data-reveal]");
    gsap.set(children, { opacity: 0, y: 30 });
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
      {/* ── Hero ── */}
      <section className="relative flex min-h-[80vh] items-center overflow-hidden bg-neutral-950">
        <div ref={heroImgRef} className="absolute inset-0">
          <Image
            src={IMG_CITY}
            alt="Sobre Tryphé — estética editorial"
            fill
            className="object-cover opacity-50"
            sizes="100vw"
            priority
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-neutral-950/70 via-neutral-950/40 to-transparent" />
        <div
          ref={heroTextRef}
          className="relative z-10 mx-auto w-full max-w-screen-2xl px-6 py-20 md:px-12 lg:px-16"
        >
          <p
            data-reveal
            className="text-[9px] font-bold tracking-[0.5em] text-[#faf9f7]/45 uppercase"
          >
            Nuestra historia
          </p>
          <h1
            data-reveal
            className="mt-5 max-w-2xl font-serif text-[clamp(2.5rem,6vw,5rem)] font-medium leading-[1.05] tracking-tight text-[#faf9f7]"
          >
            Sobre Tryphé
          </h1>
          <p
            data-reveal
            className="mt-6 max-w-xl text-base leading-relaxed text-[#faf9f7]/65 md:text-lg"
          >
            Nacimos de una pregunta simple: ¿por qué el lujo olfativo tiene que costar una
            fortuna? La respuesta se convirtió en nuestra marca.
          </p>
        </div>
      </section>

      {/* ── Historia — split ── */}
      <section className="bg-[#faf9f7]">
        <div className="mx-auto grid max-w-screen-2xl lg:grid-cols-2">
          <div
            ref={storyTextRef}
            className="flex flex-col justify-center px-6 py-16 md:px-12 lg:px-16 lg:py-24"
          >
            <p className="text-[9px] font-bold tracking-[0.4em] text-neutral-500 uppercase">
              El origen
            </p>
            <h2 className="mt-5 font-serif text-3xl font-medium leading-tight text-neutral-950 md:text-4xl">
              De la curiosidad al laboratorio
            </h2>
            <p className="mt-8 text-base leading-[1.85] text-neutral-600 md:text-lg">
              Tryphé empezó en 2024 cuando descubrimos que las mismas esencias que componen
              fragancias de $8,000+ podían formularse de manera accesible sin sacrificar
              proyección ni duración. Trabajamos directamente con laboratorios que abastecen
              a casas europeas de nicho.
            </p>
            <p className="mt-6 text-base leading-[1.85] text-neutral-600 md:text-lg">
              No somos una marca de "dupes". Cada fórmula es original, inspirada en perfiles
              olfativos que resuenan con la cultura y el clima latinoamericano. El resultado:
              fragancias que proyectan, duran y emocionan — desde $649.
            </p>
          </div>
          <div className="relative min-h-[360px] overflow-hidden lg:min-h-0">
            <div ref={storyImgRef} className="absolute inset-[-10%]">
              <Image
                src={IMG_URBAN}
                alt="Proceso creativo Tryphé"
                fill
                className="object-cover"
                sizes="(max-width:1024px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── Valores — grid ── */}
      <section className="border-y border-neutral-950/10 bg-white py-16 md:py-24">
        <div className="mx-auto max-w-screen-2xl px-4 md:px-10">
          <div className="mx-auto mb-14 max-w-2xl text-center md:mb-20">
            <p className="text-[9px] font-bold tracking-[0.4em] text-neutral-500 uppercase">
              Pilares
            </p>
            <h2 className="mt-4 font-serif text-3xl font-medium text-neutral-950 md:text-4xl">
              Lo que nos define
            </h2>
          </div>
          <div ref={valuesRef} className="grid gap-8 md:grid-cols-3 md:gap-6">
            {VALUES.map((v) => (
              <div
                key={v.title}
                className="border border-neutral-950/10 bg-[#faf9f7] p-8 text-center md:p-10"
              >
                <span className="inline-block text-3xl text-neutral-950">{v.icon}</span>
                <h3 className="mt-5 font-serif text-xl font-medium text-neutral-950">
                  {v.title}
                </h3>
                <p className="mt-4 text-sm leading-relaxed text-neutral-600">{v.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Proceso — banda full ── */}
      <section className="relative overflow-hidden bg-neutral-950">
        <div ref={processImgRef} className="absolute inset-[-10%]">
          <Image
            src={IMG_CITY}
            alt="Proceso de creación"
            fill
            className="object-cover opacity-30"
            sizes="100vw"
          />
        </div>
        <div
          ref={processTextRef}
          className="relative z-10 mx-auto max-w-screen-md px-6 py-24 text-center md:py-32"
        >
          <p className="text-[9px] font-bold tracking-[0.5em] text-[#faf9f7]/40 uppercase">
            El proceso
          </p>
          <h2 className="mt-5 font-serif text-3xl font-medium text-[#faf9f7] md:text-4xl">
            Del concepto al frasco
          </h2>
          <p className="mt-8 text-base leading-[1.85] text-[#faf9f7]/70 md:text-lg">
            Cada fragancia pasa por un mínimo de 12 iteraciones antes de aprobarse. Evaluamos
            proyección, duración, evolución de notas y — lo más importante — la emoción que
            genera. Si no provoca algo, no sale.
          </p>
        </div>
      </section>

      {/* ── Quote editorial ── */}
      <section className="bg-[#faf9f7] py-20 md:py-28">
        <div ref={quoteRef} className="mx-auto max-w-screen-md px-6 text-center">
          <blockquote className="font-serif text-2xl leading-relaxed text-neutral-950 md:text-3xl lg:text-4xl">
            «El verdadero lujo no es el precio — es la intención detrás de cada gota.»
          </blockquote>
          <p className="mt-8 text-[9px] font-bold tracking-[0.4em] text-neutral-500 uppercase">
            Filosofía Tryphé
          </p>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="border-t border-neutral-950/10 bg-neutral-950 py-20 md:py-28">
        <div ref={ctaRef} className="mx-auto max-w-screen-md px-6 text-center">
          <h3 className="font-serif text-3xl font-medium text-[#faf9f7] md:text-4xl">
            Explora nuestras fragancias
          </h3>
          <p className="mt-5 text-sm leading-relaxed text-[#faf9f7]/60">
            Descubre la colección completa o deja que nuestro quiz te guíe hacia tu aroma ideal.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link
              href="/collections"
              className="inline-flex min-h-[48px] items-center border border-[#faf9f7] bg-[#faf9f7] px-10 text-[10px] font-bold tracking-[0.25em] text-neutral-950 uppercase transition hover:bg-transparent hover:text-[#faf9f7]"
            >
              Ver catálogo
            </Link>
            <Link
              href="/encuentra-tu-aroma"
              className="inline-flex min-h-[48px] items-center border border-[#faf9f7]/40 px-10 text-[10px] font-bold tracking-[0.25em] text-[#faf9f7] uppercase transition hover:border-[#faf9f7]"
            >
              Encuentra tu Aroma
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
