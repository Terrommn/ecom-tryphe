import Link from "next/link";
import { TrypheShell } from "@/components/layout/TrypheShell";

export const metadata = {
  title: "Contacto | Tienda",
  description: "Formulario de contacto, ubicación y horarios.",
};

export default function ContactPage() {
  const mapEmbed = process.env.NEXT_PUBLIC_GOOGLE_MAPS_EMBED_URL;

  return (
    <TrypheShell>
      <div className="bg-[#faf9f7]">
        <div className="mx-auto max-w-screen-2xl px-4 lg:px-10 py-12 md:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            <div data-gsap="fade-up">
              <h1 className="font-serif text-3xl md:text-4xl font-medium text-neutral-950 mb-4">
                Contacto
              </h1>
              <p className="text-neutral-500 mb-8">
                Completa el formulario o usa los datos directos. Responderemos lo antes posible.
              </p>
              <form
                className="space-y-4"
                action="mailto:info@tryphe.mx"
                method="get"
                encType="text/plain"
              >
                <div>
                  <label htmlFor="name" className="block text-xs text-neutral-500 mb-1">
                    Nombre
                  </label>
                  <input
                    id="name"
                    name="name"
                    required
                    className="w-full rounded-lg border border-neutral-200 bg-neutral-100 px-4 py-2.5 text-neutral-950"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-xs text-neutral-500 mb-1">
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    className="w-full rounded-lg border border-neutral-200 bg-neutral-100 px-4 py-2.5 text-neutral-950"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-xs text-neutral-500 mb-1">
                    Teléfono
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    className="w-full rounded-lg border border-neutral-200 bg-neutral-100 px-4 py-2.5 text-neutral-950"
                  />
                </div>
                <div>
                  <label htmlFor="body" className="block text-xs text-neutral-500 mb-1">
                    Mensaje
                  </label>
                  <textarea
                    id="body"
                    name="body"
                    rows={5}
                    required
                    className="w-full rounded-lg border border-neutral-200 bg-neutral-100 px-4 py-2.5 text-neutral-950"
                  />
                </div>
                <p className="text-xs text-neutral-500">
                  [Opcional] Sustituye este formulario por una API Route con Resend/SendGrid para envío
                  real.
                </p>
                <button
                  type="submit"
                  className="bg-neutral-950 px-8 py-3 text-sm font-semibold uppercase tracking-wider text-[#faf9f7] hover:bg-neutral-800 transition-colors"
                >
                  Enviar
                </button>
              </form>
            </div>
            <div className="space-y-8" data-gsap="fade-up" data-gsap-delay="0.15">
              <section>
                <h2 className="text-sm font-semibold uppercase tracking-wider text-neutral-950 mb-3">
                  Datos directos
                </h2>
                <ul className="text-neutral-950/90 space-y-2 text-sm">
                  <li>
                    Email:{" "}
                    <a href="mailto:info@tryphe.mx" className="text-neutral-950 hover:underline">
                      info@tryphe.mx
                    </a>
                  </li>
                  <li>Teléfono: [REVISAR]</li>
                  <li>
                    WhatsApp:{" "}
                    <a href="https://wa.me/528184587897" className="text-neutral-950 hover:underline">
                      +52 81 8458 7897
                    </a>
                  </li>
                  <li>Dirección: [REVISAR]</li>
                </ul>
              </section>
              <section>
                <h2 className="text-sm font-semibold uppercase tracking-wider text-neutral-950 mb-3">
                  Horarios
                </h2>
                <p className="text-sm text-neutral-500">Lun–Vie 9:00–18:00 [REVISAR]</p>
              </section>
              {mapEmbed ? (
                <div className="aspect-video w-full overflow-hidden rounded-lg border border-neutral-200">
                  <iframe
                    title="Mapa"
                    src={mapEmbed}
                    className="h-full w-full"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
              ) : (
                <p className="text-xs text-neutral-500">
                  Configura <code className="text-neutral-950">NEXT_PUBLIC_GOOGLE_MAPS_EMBED_URL</code>{" "}
                  para mostrar el mapa.
                </p>
              )}
              <section>
                <h2 className="text-sm font-semibold uppercase tracking-wider text-neutral-950 mb-3">
                  FAQ rápido
                </h2>
                <Link href="/faq" className="text-neutral-950 hover:underline text-sm">
                  Ir a preguntas frecuentes
                </Link>
              </section>
            </div>
          </div>
        </div>
      </div>
    </TrypheShell>
  );
}
