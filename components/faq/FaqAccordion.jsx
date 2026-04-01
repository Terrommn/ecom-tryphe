"use client";

import { useState } from "react";

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
        a: "Los plazos dependen del destino y del método elegido. Consulta la página de envíos para tablas orientativas.",
      },
      {
        q: "¿Hacéis envíos internacionales?",
        a: "[REVISAR] Indica zonas y condiciones según tu operativa logística.",
      },
    ],
  },
  {
    id: "devoluciones",
    title: "Devoluciones y cambios",
    items: [
      {
        q: "¿Cuál es el plazo de devolución?",
        a: "Suele ser de 30 días desde la recepción, salvo productos en oferta indicados como finales. Ver política de devoluciones.",
      },
    ],
  },
  {
    id: "tallas",
    title: "Tallas y ajuste",
    items: [
      {
        q: "¿Tenéis guía de tallas?",
        a: "[REVISAR] Añade enlace a tabla o PDF cuando esté disponible.",
      },
    ],
  },
  {
    id: "pagos",
    title: "Pagos y facturación",
    items: [
      {
        q: "¿Qué métodos de pago aceptáis?",
        a: "Los gestionados por Shopify Payments u otros proveedores activos en tu tienda (tarjeta, etc.).",
      },
    ],
  },
  {
    id: "cuidado",
    title: "Cuidado de productos",
    items: [
      {
        q: "¿Cómo lavar las prendas?",
        a: "Sigue siempre la etiqueta del producto. [REVISAR] Añade recomendaciones por tipo de tejido.",
      },
    ],
  },
  {
    id: "cuenta",
    title: "Cuenta de cliente",
    items: [
      {
        q: "¿Cómo accedo a mi cuenta?",
        a: "Desde el icono de cuenta o el enlace proporcionado por tu configuración de Shopify (Customer Account / clásico).",
      },
    ],
  },
];

export function FaqAccordion() {
  const [open, setOpen] = useState({});

  return (
    <div className="space-y-10">
      {SECTIONS.map((section) => (
        <section key={section.id} id={section.id}>
          <h2 className="text-lg font-semibold text-[var(--oob-gold)] mb-4">{section.title}</h2>
          <ul className="space-y-2">
            {section.items.map((item, i) => {
              const key = `${section.id}-${i}`;
              const isOpen = open[key];
              return (
                <li
                  key={key}
                  className="rounded-lg border border-[color:var(--oob-border)] bg-[var(--oob-surface)]/40 overflow-hidden"
                >
                  <button
                    type="button"
                    className="flex w-full items-center justify-between gap-4 px-4 py-3 text-left text-sm font-medium text-[var(--oob-cream)] hover:bg-[var(--oob-surface)]/80"
                    aria-expanded={isOpen}
                    onClick={() => setOpen((s) => ({ ...s, [key]: !s[key] }))}
                  >
                    {item.q}
                    <span className="text-[var(--oob-gold)] shrink-0">{isOpen ? "−" : "+"}</span>
                  </button>
                  {isOpen ? (
                    <div className="border-t border-[color:var(--oob-border)] px-4 py-3 text-sm text-[var(--oob-muted)]">
                      {item.a}
                    </div>
                  ) : null}
                </li>
              );
            })}
          </ul>
        </section>
      ))}
    </div>
  );
}
