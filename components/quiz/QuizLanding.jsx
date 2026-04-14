"use client";

import Image from "next/image";
import { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PerfumeDiscoveryQuiz } from "@/components/quiz/PerfumeDiscoveryQuiz";
import {
  useScrollReveal,
  useStaggerReveal,
  useImageZoom,
} from "@/hooks/useGsapReveal";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const IMG_HERO = "/home/hero-duo-city.png";

const TESTIMONIALS = [
  {
    quote: "En menos de 2 minutos me recomendó exactamente lo que buscaba.",
    author: "Sofía — Monterrey",
  },
  {
    quote: "Lo usé para regalar y acerté a la primera. Mi novio no se lo quita.",
    author: "Daniela — CDMX",
  },
  {
    quote: "No sabía nada de fragancias y el quiz me explicó todo sin ser pretencioso.",
    author: "Carlos — Guadalajara",
  },
];

export function QuizLanding({ quizProducts = [] }) {
  const heroTextRef = useRef(null);
  const heroImgRef = useImageZoom({ scale: 1.06, duration: 1.6 });
  const quizSectionRef = useScrollReveal({ y: 30, duration: 0.8 });
  const testimonialsRef = useStaggerReveal(":scope > *", {
    y: 40,
    stagger: 0.15,
    duration: 0.7,
  });

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
      <section className="relative flex min-h-[60vh] items-center overflow-hidden bg-neutral-950">
        <div ref={heroImgRef} className="absolute inset-0">
          <Image
            src={IMG_HERO}
            alt="Encuentra tu aroma — Tryphé"
            fill
            className="object-cover opacity-45"
            sizes="100vw"
            priority
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/70 via-neutral-950/30 to-transparent" />
        <div
          ref={heroTextRef}
          className="relative z-10 mx-auto w-full max-w-screen-lg px-6 py-20 text-center md:px-12"
        >
          <p
            data-reveal
            className="text-[9px] font-bold tracking-[0.5em] text-[#faf9f7]/45 uppercase"
          >
            Cuestionario sensorial
          </p>
          <h1
            data-reveal
            className="mt-5 font-serif text-[clamp(2rem,5vw,4rem)] font-medium leading-[1.1] tracking-tight text-[#faf9f7]"
          >
            Encuentra tu Aroma
          </h1>
          <p
            data-reveal
            className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-[#faf9f7]/65 md:text-lg"
          >
            Responde unas preguntas sobre tu personalidad, estilo y emociones. En menos de
            2 minutos te recomendamos la fragancia Tryphé que mejor proyecta tu esencia.
          </p>
        </div>
      </section>

      {/* ── Quiz embebido ── */}
      <section
        ref={quizSectionRef}
        className="scroll-mt-28 border-y border-neutral-950/10 bg-[#faf9f7]"
      >
        <div className="mx-auto max-w-5xl px-4 py-12 md:px-8 md:py-16">
          <PerfumeDiscoveryQuiz products={quizProducts} variant="embedded" />
        </div>
      </section>

      {/* ── Testimonios ── */}
      <section className="bg-white py-16 md:py-24">
        <div className="mx-auto max-w-screen-2xl px-4 md:px-10">
          <div className="mx-auto mb-14 max-w-2xl text-center">
            <p className="text-[9px] font-bold tracking-[0.4em] text-neutral-500 uppercase">
              Quienes ya lo probaron
            </p>
            <h2 className="mt-4 font-serif text-3xl font-medium text-neutral-950 md:text-4xl">
              Historias del quiz
            </h2>
          </div>
          <div ref={testimonialsRef} className="grid gap-6 md:grid-cols-3">
            {TESTIMONIALS.map((t) => (
              <blockquote
                key={t.author}
                className="border border-neutral-950/10 bg-[#faf9f7] p-8 md:p-10"
              >
                <p className="font-serif text-lg leading-relaxed text-neutral-950 md:text-xl">
                  «{t.quote}»
                </p>
                <footer className="mt-6 text-[9px] font-bold tracking-[0.3em] text-neutral-500 uppercase">
                  {t.author}
                </footer>
              </blockquote>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="border-t border-neutral-950/10 bg-neutral-950 py-16 md:py-20">
        <div className="mx-auto max-w-screen-md px-6 text-center">
          <p className="font-serif text-2xl text-[#faf9f7] md:text-3xl">
            ¿Ya sabes cuál es tu aroma?
          </p>
          <p className="mt-4 text-sm text-[#faf9f7]/50">
            Explora el catálogo completo si prefieres navegar por tu cuenta.
          </p>
          <a
            href="#top"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="mt-8 inline-flex min-h-[48px] items-center border border-[#faf9f7] bg-[#faf9f7] px-10 text-[10px] font-bold tracking-[0.25em] text-neutral-950 uppercase transition hover:bg-transparent hover:text-[#faf9f7]"
          >
            Volver al quiz
          </a>
        </div>
      </section>
    </>
  );
}
