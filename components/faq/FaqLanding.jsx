"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useRef, useEffect, useCallback, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  useScrollReveal,
  useStaggerReveal,
  useImageZoom,
} from "@/hooks/useGsapReveal";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const IMG_HERO = "/home/hero-duo-urban.png";

const SECTIONS = [
  {
    id: "pedidos",
    title: "Pedidos y compras",
    items: [
      {
        q: "¿Cómo realizo un pedido?",
        a: "Añade productos al carrito y completa el pago en el checkout seguro de Shopify.",
      },
      {
        q: "¿Puedo modificar mi pedido?",
        a: "Contacta de inmediato por email o WhatsApp; si el pedido aún no se ha procesado, intentaremos ayudarte.",
      },
    ],
  },
  {
    id: "envios",
    title: "Envíos y entregas",
    items: [
      {
        q: "¿Cuánto tarda el envío?",
        a: "El tiempo promedio de entrega es de 1 a 5 días hábiles a través de FedEx, Estafeta, DHL o mensajería local, según cobertura y ubicación.",
      },
      {
        q: "¿Cuál es el costo de envío?",
        a: "El costo de envío se calcula automáticamente en el proceso de pago, con base en el destino y peso del paquete.",
      },
    ],
  },
  {
    id: "devoluciones",
    title: "Devoluciones y cambios",
    items: [
      {
        q: "¿Cuál es el plazo de devolución?",
        a: "Cuentas con 24 horas naturales desde la recepción del pedido para solicitar devolución o cambio.",
      },
      {
        q: "¿Qué condiciones debe cumplir el producto?",
        a: "El producto no debe haber sido usado (máximo 5-10 atomizaciones), debe estar en su empaque original y con etiqueta en buen estado.",
      },
    ],
  },
  {
    id: "reembolsos",
    title: "Reembolsos",
    items: [
      {
        q: "¿Cómo solicito un reembolso?",
        a: "Contáctanos por email a info@tryphe.mx o por WhatsApp al 81 8458 7897. Nuestro equipo te guiará en el proceso.",
      },
      {
        q: "¿Cuánto tarda el reembolso?",
        a: "El reembolso puede tardar entre 5 y 10 días hábiles en procesarse, dependiendo del método de pago y entidad bancaria.",
      },
    ],
  },
  {
    id: "pagos",
    title: "Pagos y facturación",
    items: [
      {
        q: "¿Qué métodos de pago aceptan?",
        a: "Aceptamos pagos mediante tarjeta de crédito, débito, Stripe, PayPal y Mercado Pago.",
      },
    ],
  },
  {
    id: "cuidado",
    title: "Cuidado de productos",
    items: [
      {
        q: "¿Cómo conservo mi perfume?",
        a: "Almacena tu fragancia en un lugar fresco y seco, lejos de la luz solar directa. Evita cambios bruscos de temperatura.",
      },
    ],
  },
  {
    id: "cuenta",
    title: "Cuenta de cliente",
    items: [
      {
        q: "¿Cómo accedo a mi cuenta?",
        a: "Desde el icono de cuenta en la barra superior o el enlace proporcionado por Shopify.",
      },
    ],
  },
];

function AccordionItem({ item, isOpen, onToggle }) {
  const contentRef = useRef(null);
  const innerRef = useRef(null);

  useEffect(() => {
    const content = contentRef.current;
    if (!content) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      content.style.height = isOpen ? "auto" : "0px";
      content.style.opacity = isOpen ? "1" : "0";
      return;
    }

    if (isOpen) {
      const height = innerRef.current?.scrollHeight || "auto";
      gsap.fromTo(
        content,
        { height: 0, opacity: 0 },
        { height, opacity: 1, duration: 0.4, ease: "power2.out" }
      );
    } else {
      gsap.to(content, {
        height: 0,
        opacity: 0,
        duration: 0.3,
        ease: "power2.in",
      });
    }
  }, [isOpen]);

  return (
    <li className="border-b border-neutral-950/10 last:border-b-0">
      <button
        type="button"
        className="flex w-full items-start justify-between gap-6 py-6 text-left transition-colors hover:text-neutral-950"
        aria-expanded={isOpen}
        onClick={onToggle}
      >
        <span className="font-serif text-base leading-snug text-neutral-950 md:text-lg">
          {item.q}
        </span>
        <span
          className="mt-1 shrink-0 text-xl text-neutral-950 transition-transform duration-300"
          style={{ transform: isOpen ? "rotate(45deg)" : "rotate(0deg)" }}
          aria-hidden="true"
        >
          +
        </span>
      </button>
      <div
        ref={contentRef}
        className="overflow-hidden"
        style={{ height: 0, opacity: 0 }}
      >
        <div
          ref={innerRef}
          className="pb-7 pr-10 text-sm leading-[1.85] text-neutral-600 md:text-base"
        >
          {item.a}
        </div>
      </div>
    </li>
  );
}

export function FaqLanding() {
  const [open, setOpen] = useState({});
  const heroTextRef = useRef(null);
  const heroImgRef = useImageZoom({ scale: 1.06, duration: 1.8 });
  const sectionsRef = useStaggerReveal(":scope > section", {
    y: 40,
    stagger: 0.12,
    duration: 0.7,
  });
  const ctaRef = useScrollReveal({ y: 30, duration: 0.7 });

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

  const toggle = useCallback((key) => {
    setOpen((s) => ({ ...s, [key]: !s[key] }));
  }, []);

  return (
    <>
      {/* ── Hero ── */}
      <section className="relative flex min-h-[55vh] items-center overflow-hidden bg-neutral-950">
        <div ref={heroImgRef} className="absolute inset-0">
          <Image
            src={IMG_HERO}
            alt="Preguntas frecuentes — Tryphé"
            fill
            className="object-cover opacity-45"
            sizes="100vw"
            priority
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-neutral-950/75 via-neutral-950/45 to-transparent" />
        <div
          ref={heroTextRef}
          className="relative z-10 mx-auto w-full max-w-screen-2xl px-6 py-20 md:px-12 lg:px-16"
        >
          <p
            data-reveal
            className="text-[9px] font-bold tracking-[0.5em] text-[#faf9f7]/45 uppercase"
          >
            Atención al cliente
          </p>
          <h1
            data-reveal
            className="mt-5 max-w-2xl font-serif text-[clamp(2.25rem,5.5vw,4.5rem)] font-medium leading-[1.05] tracking-tight text-[#faf9f7]"
          >
            Preguntas frecuentes
          </h1>
          <p
            data-reveal
            className="mt-6 max-w-xl text-base leading-relaxed text-[#faf9f7]/65 md:text-lg"
          >
            Respuestas a las dudas más comunes sobre pedidos, envíos, devoluciones, pagos y cuidado
            de tu fragancia.
          </p>
        </div>
      </section>

      {/* ── Contenido ── */}
      <section className="bg-[#faf9f7]">
        <div className="mx-auto grid max-w-screen-2xl gap-14 px-6 py-16 md:px-12 md:py-24 lg:grid-cols-[minmax(0,220px)_1fr] lg:gap-20 lg:px-16">
          {/* Índice lateral */}
          <aside className="lg:sticky lg:top-28 lg:self-start">
            <p className="text-[9px] font-bold tracking-[0.4em] text-neutral-500 uppercase">
              Secciones
            </p>
            <nav className="mt-5 flex flex-col gap-3">
              {SECTIONS.map((s) => (
                <a
                  key={s.id}
                  href={`#${s.id}`}
                  className="font-serif text-sm leading-snug text-neutral-600 transition-colors hover:text-neutral-950"
                >
                  {s.title}
                </a>
              ))}
            </nav>
          </aside>

          {/* Lista de preguntas */}
          <div ref={sectionsRef} className="max-w-3xl space-y-16">
            {SECTIONS.map((section) => (
              <section
                key={section.id}
                id={section.id}
                className="scroll-mt-28"
              >
                <p className="text-[9px] font-bold tracking-[0.4em] text-neutral-500 uppercase">
                  {section.id.padStart(2, "0")}
                </p>
                <h2 className="mt-3 font-serif text-2xl font-medium text-neutral-950 md:text-3xl">
                  {section.title}
                </h2>
                <ul className="mt-6 border-t border-neutral-950/10">
                  {section.items.map((item, i) => {
                    const key = `${section.id}-${i}`;
                    return (
                      <AccordionItem
                        key={key}
                        item={item}
                        isOpen={!!open[key]}
                        onToggle={() => toggle(key)}
                      />
                    );
                  })}
                </ul>
              </section>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA contacto ── */}
      <section className="border-t border-neutral-950/10 bg-neutral-950 py-20 md:py-28">
        <div ref={ctaRef} className="mx-auto max-w-screen-md px-6 text-center">
          <p className="text-[9px] font-bold tracking-[0.5em] text-[#faf9f7]/40 uppercase">
            ¿No encontraste tu respuesta?
          </p>
          <h3 className="mt-5 font-serif text-3xl font-medium text-[#faf9f7] md:text-4xl">
            Escríbenos directamente
          </h3>
          <p className="mt-5 text-sm leading-relaxed text-[#faf9f7]/60">
            Nuestro equipo responde pedidos, dudas de fragancia y seguimiento de envíos en menos
            de 24 horas hábiles.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link
              href="/contacto"
              className="inline-flex min-h-[48px] items-center border border-[#faf9f7] bg-[#faf9f7] px-10 text-[10px] font-bold tracking-[0.25em] text-neutral-950 uppercase transition hover:bg-transparent hover:text-[#faf9f7]"
            >
              Contacto
            </Link>
            <a
              href="https://wa.me/528184587897"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[48px] items-center border border-[#faf9f7]/40 px-10 text-[10px] font-bold tracking-[0.25em] text-[#faf9f7] uppercase transition hover:border-[#faf9f7]"
            >
              WhatsApp
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
