import { isShopifyConfigured } from "@/lib/shopify";
import { getMarketingNavLinks } from "@/lib/marketing-nav";
import { TrypheMarketingChrome } from "@/components/home/TrypheMarketingChrome";
import { PartnersLanding } from "@/components/partners/PartnersLanding";

export const metadata = {
  title: "Partner TRYPHÉ — Programa de distribuidores",
  description:
    "Únete al programa de distribución TRYPHÉ. Márgenes competitivos, soporte de marca y acceso al catálogo completo para boutiques y e-commerce especializados.",
};

export default async function PartnersPage() {
  const shopConfigured = isShopifyConfigured();
  const navLinks = await getMarketingNavLinks();

  return (
    <TrypheMarketingChrome navLinks={navLinks} shopConfigured={shopConfigured}>
      <PartnersLanding />
    </TrypheMarketingChrome>
  );
}
