import { FaqAccordion } from "@/components/faq/FaqAccordion";

export const metadata = {
  title: "Preguntas frecuentes | Tienda",
  description: "Pedidos, envíos, devoluciones, tallas, pagos y más.",
};

export default function FaqPage() {
  return (
    <article className="oob-container max-w-3xl py-12 md:py-16">
      <div data-gsap="fade-up">
        <h1 className="oob-heading-xl text-3xl md:text-4xl text-[var(--oob-cream)] mb-4">
          Preguntas frecuentes
        </h1>
        <p className="text-[var(--oob-muted)] mb-10 text-sm">
          Encuentra respuestas a las dudas mas comunes sobre pedidos, envios, devoluciones y mas.
        </p>
      </div>
      <FaqAccordion />
    </article>
  );
}
