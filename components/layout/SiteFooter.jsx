import Link from "next/link";
import { BrandWordmark } from "@/components/brand/BrandWordmark";

const company = [
  { href: "/acerca", label: "Acerca" },
  { href: "/contacto", label: "Contacto" },
];

const service = [
  { href: "/faq", label: "FAQ" },
  { href: "/envios", label: "Envíos" },
  { href: "/devoluciones", label: "Devoluciones" },
];

const legal = [
  { href: "/terminos", label: "Términos" },
  { href: "/privacidad", label: "Privacidad" },
];

export function SiteFooter() {
  const year = new Date().getFullYear();
  const siteName = process.env.NEXT_PUBLIC_SITE_NAME?.trim() || "Tu tienda";

  return (
    <footer className="relative z-[1] border-t border-[color:var(--oob-border)] bg-[var(--oob-bg-elevated)] mt-24 pb-12 pt-16">
      <div className="oob-container">
        <div className="mb-12 flex flex-col gap-6 border-b border-[color:var(--oob-border)] pb-12 sm:flex-row sm:items-center sm:justify-between" data-gsap="fade-up">
          <Link href="/" className="group inline-flex max-w-md shrink-0">
            <BrandWordmark variant="onLight" className="transition-opacity group-hover:opacity-85" />
          </Link>
          <p className="max-w-md text-sm leading-relaxed text-[var(--oob-muted)]">
            Texto de pie de página: edita este bloque cuando definas voz de marca y propuesta de valor.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4" data-gsap="fade-up" data-gsap-stagger="0.1">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--oob-gold)] mb-4">
              Empresa
            </p>
            <ul className="space-y-3">
              {company.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-[var(--oob-cream)]/85 hover:text-[var(--oob-gold)] transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--oob-gold)] mb-4">
              Servicio
            </p>
            <ul className="space-y-3">
              {service.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-[var(--oob-cream)]/85 hover:text-[var(--oob-gold)] transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--oob-gold)] mb-4">
              Legal
            </p>
            <ul className="space-y-3">
              {legal.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-[var(--oob-cream)]/85 hover:text-[var(--oob-gold)] transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--oob-gold)] mb-4">
              Redes
            </p>
            <p className="text-sm text-[var(--oob-muted)]">
              Añade enlaces en este bloque cuando tengas perfiles públicos.
            </p>
          </div>
        </div>
        <div className="oob-line-gold mt-14 mb-8 max-w-md" data-gsap="line-draw" />
        <p className="text-center text-xs text-[var(--oob-muted)]">
          © {year} {siteName}. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  );
}
