import Link from "next/link";
import { isShopifyConfigured } from "@/lib/shopify";
import { getMarketingNavLinks } from "@/lib/marketing-nav";
import { TrypheMarketingChrome } from "@/components/home/TrypheMarketingChrome";

const siteName = process.env.NEXT_PUBLIC_SITE_NAME?.trim() || "Tryphé";

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

function TrypheFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-neutral-950/10 bg-[#f5f0e8] pt-16 pb-12">
      <div className="mx-auto max-w-screen-2xl px-4 lg:px-10">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4" data-gsap="fade-up" data-gsap-stagger="0.1">
          <div>
            <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-neutral-400 mb-4">
              Empresa
            </p>
            <ul className="space-y-3">
              {company.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-neutral-700 hover:text-neutral-950 transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-neutral-400 mb-4">
              Servicio
            </p>
            <ul className="space-y-3">
              {service.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-neutral-700 hover:text-neutral-950 transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-neutral-400 mb-4">
              Legal
            </p>
            <ul className="space-y-3">
              {legal.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-neutral-700 hover:text-neutral-950 transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-neutral-400 mb-4">
              Contacto
            </p>
            <ul className="space-y-3 text-sm text-neutral-700">
              <li>
                <a href="mailto:info@tryphe.mx" className="hover:text-neutral-950 transition-colors">
                  info@tryphe.mx
                </a>
              </li>
              <li>
                <a href="https://wa.me/528184587897" className="hover:text-neutral-950 transition-colors" target="_blank" rel="noopener noreferrer">
                  WhatsApp: 81 8458 7897
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-14 mb-8 h-px max-w-md bg-gradient-to-r from-transparent via-neutral-300 to-transparent" data-gsap="line-draw" />
        <p className="text-center text-xs text-neutral-400">
          © {year} {siteName}. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  );
}

/**
 * Server component that wraps any page with the Tryphé marketing chrome
 * (announcement bar + light editorial header + nav + footer).
 */
export async function TrypheShell({ children }) {
  const shopConfigured = isShopifyConfigured();
  const navLinks = await getMarketingNavLinks();

  return (
    <TrypheMarketingChrome shopConfigured={shopConfigured} navLinks={navLinks}>
      {children}
      <TrypheFooter />
    </TrypheMarketingChrome>
  );
}
