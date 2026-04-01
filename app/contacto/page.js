import Link from "next/link";
import { LegalPage } from "@/components/legal/LegalPage";

export const metadata = {
  title: "Contacto | Tienda",
  description: "Formulario de contacto, ubicación y horarios.",
};

export default function ContactPage() {
  const mapEmbed = process.env.NEXT_PUBLIC_GOOGLE_MAPS_EMBED_URL;

  return (
    <div className="oob-container py-12 md:py-16">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
        <div>
          <h1 className="oob-heading-xl text-3xl md:text-4xl text-[var(--oob-cream)] mb-4">
            Contacto
          </h1>
          <p className="text-[var(--oob-muted)] mb-8">
            Completa el formulario o usa los datos directos. Responderemos lo antes posible.
          </p>
          <form
            className="space-y-4"
            action="mailto:hola@outofbounds.example"
            method="get"
            encType="text/plain"
          >
            <div>
              <label htmlFor="name" className="block text-xs text-[var(--oob-muted)] mb-1">
                Nombre
              </label>
              <input
                id="name"
                name="name"
                required
                className="w-full rounded-lg border border-[color:var(--oob-border)] bg-[var(--oob-surface)] px-4 py-2.5 text-[var(--oob-cream)]"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-xs text-[var(--oob-muted)] mb-1">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="w-full rounded-lg border border-[color:var(--oob-border)] bg-[var(--oob-surface)] px-4 py-2.5 text-[var(--oob-cream)]"
              />
            </div>
            <div>
              <label htmlFor="phone" className="block text-xs text-[var(--oob-muted)] mb-1">
                Teléfono
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                className="w-full rounded-lg border border-[color:var(--oob-border)] bg-[var(--oob-surface)] px-4 py-2.5 text-[var(--oob-cream)]"
              />
            </div>
            <div>
              <label htmlFor="body" className="block text-xs text-[var(--oob-muted)] mb-1">
                Mensaje
              </label>
              <textarea
                id="body"
                name="body"
                rows={5}
                required
                className="w-full rounded-lg border border-[color:var(--oob-border)] bg-[var(--oob-surface)] px-4 py-2.5 text-[var(--oob-cream)]"
              />
            </div>
            <p className="text-xs text-[var(--oob-muted)]">
              [Opcional] Sustituye este formulario por una API Route con Resend/SendGrid para envío
              real.
            </p>
            <button
              type="submit"
              className="rounded-full bg-[var(--oob-gold)] px-8 py-3 text-sm font-semibold uppercase tracking-wider text-[var(--oob-bg)] hover:bg-[var(--oob-gold-hover)] transition-colors"
            >
              Enviar
            </button>
          </form>
        </div>
        <div className="space-y-8">
          <section>
            <h2 className="text-sm font-semibold uppercase tracking-wider text-[var(--oob-gold)] mb-3">
              Datos directos
            </h2>
            <ul className="text-[var(--oob-cream)]/90 space-y-2 text-sm">
              <li>
                Email:{" "}
                <a href="mailto:hola@outofbounds.example" className="text-[var(--oob-gold)] hover:underline">
                  hola@outofbounds.example
                </a>
              </li>
              <li>Teléfono: [REVISAR]</li>
              <li>
                WhatsApp:{" "}
                <a href="https://wa.me/" className="text-[var(--oob-gold)] hover:underline">
                  [REVISAR enlace]
                </a>
              </li>
              <li>Dirección: [REVISAR]</li>
            </ul>
          </section>
          <section>
            <h2 className="text-sm font-semibold uppercase tracking-wider text-[var(--oob-gold)] mb-3">
              Horarios
            </h2>
            <p className="text-sm text-[var(--oob-muted)]">Lun–Vie 9:00–18:00 [REVISAR]</p>
          </section>
          {mapEmbed ? (
            <div className="aspect-video w-full overflow-hidden rounded-lg border border-[color:var(--oob-border)]">
              <iframe
                title="Mapa"
                src={mapEmbed}
                className="h-full w-full"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          ) : (
            <p className="text-xs text-[var(--oob-muted)]">
              Configura <code className="text-[var(--oob-gold)]">NEXT_PUBLIC_GOOGLE_MAPS_EMBED_URL</code>{" "}
              para mostrar el mapa.
            </p>
          )}
          <section>
            <h2 className="text-sm font-semibold uppercase tracking-wider text-[var(--oob-gold)] mb-3">
              FAQ rápido
            </h2>
            <Link href="/faq" className="text-[var(--oob-gold)] hover:underline text-sm">
              Ir a preguntas frecuentes
            </Link>
          </section>
        </div>
      </div>
    </div>
  );
}
