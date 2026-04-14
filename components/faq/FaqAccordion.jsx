"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import gsap from "gsap";

const SECTIONS = [
  {
    id: "pedidos",
    title: "Pedidos y compras",
    items: [
      {
        q: "Como realizo un pedido?",
        a: "Anade productos al carrito y completa el pago en el checkout seguro de Shopify.",
      },
      {
        q: "Puedo modificar mi pedido?",
        a: "Contacta de inmediato por email o WhatsApp; si el pedido aun no se ha procesado, intentaremos ayudarte.",
      },
    ],
  },
  {
    id: "envios",
    title: "Envios y entregas",
    items: [
      {
        q: "Cuanto tarda el envio?",
        a: "El tiempo promedio de entrega es de 1 a 5 dias habiles a traves de FedEx, Estafeta, DHL o mensajeria local, segun cobertura y ubicacion.",
      },
      {
        q: "Cual es el costo de envio?",
        a: "El costo de envio se calcula automaticamente en el proceso de pago, con base en el destino y peso del paquete.",
      },
    ],
  },
  {
    id: "devoluciones",
    title: "Devoluciones y cambios",
    items: [
      {
        q: "Cual es el plazo de devolucion?",
        a: "Cuentas con 24 horas naturales desde la recepcion del pedido para solicitar devolucion o cambio.",
      },
      {
        q: "Que condiciones debe cumplir el producto?",
        a: "El producto no debe haber sido usado (maximo 5-10 atomizaciones), debe estar en su empaque original y con etiqueta en buen estado.",
      },
    ],
  },
  {
    id: "reembolsos",
    title: "Reembolsos",
    items: [
      {
        q: "Como solicito un reembolso?",
        a: "Contactanos por email a info@tryphe.mx o por WhatsApp al 81 8458 7897. Nuestro equipo te guiara en el proceso.",
      },
      {
        q: "Cuanto tarda el reembolso?",
        a: "El reembolso puede tardar entre 5 y 10 dias habiles en procesarse, dependiendo del metodo de pago y entidad bancaria.",
      },
    ],
  },
  {
    id: "pagos",
    title: "Pagos y facturacion",
    items: [
      {
        q: "Que metodos de pago aceptan?",
        a: "Aceptamos pagos mediante tarjeta de credito, debito, Stripe, PayPal y Mercado Pago.",
      },
    ],
  },
  {
    id: "cuidado",
    title: "Cuidado de productos",
    items: [
      {
        q: "Como conservo mi perfume?",
        a: "Almacena tu fragancia en un lugar fresco y seco, lejos de la luz solar directa. Evita cambios bruscos de temperatura.",
      },
    ],
  },
  {
    id: "cuenta",
    title: "Cuenta de cliente",
    items: [
      {
        q: "Como accedo a mi cuenta?",
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
        { height, opacity: 1, duration: 0.35, ease: "power2.out" }
      );
    } else {
      gsap.to(content, {
        height: 0,
        opacity: 0,
        duration: 0.25,
        ease: "power2.in",
      });
    }
  }, [isOpen]);

  return (
    <li className="rounded-lg border border-[color:var(--oob-border)] bg-[var(--oob-surface)]/40 overflow-hidden">
      <button
        type="button"
        className="flex w-full items-center justify-between gap-4 px-4 py-3 text-left text-sm font-medium text-[var(--oob-cream)] hover:bg-[var(--oob-surface)]/80 transition-colors"
        aria-expanded={isOpen}
        onClick={onToggle}
      >
        {item.q}
        <span
          className="text-[var(--oob-gold)] shrink-0 transition-transform duration-300"
          style={{ transform: isOpen ? "rotate(45deg)" : "rotate(0deg)" }}
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
          className="border-t border-[color:var(--oob-border)] px-4 py-3 text-sm text-[var(--oob-muted)]"
        >
          {item.a}
        </div>
      </div>
    </li>
  );
}

export function FaqAccordion() {
  const [open, setOpen] = useState({});
  const containerRef = useRef(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        containerRef.current.children,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power3.out",
          stagger: 0.08,
        }
      );
    });

    return () => ctx.revert();
  }, []);

  const toggle = useCallback((key) => {
    setOpen((s) => ({ ...s, [key]: !s[key] }));
  }, []);

  return (
    <div className="space-y-10" ref={containerRef}>
      {SECTIONS.map((section) => (
        <section key={section.id} id={section.id}>
          <h2 className="text-lg font-semibold text-[var(--oob-gold)] mb-4">
            {section.title}
          </h2>
          <ul className="space-y-2">
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
  );
}
