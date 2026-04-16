import { isShopifyConfigured } from "@/lib/shopify";
import { getMarketingNavLinks } from "@/lib/marketing-nav";
import { TrypheMarketingChrome } from "@/components/home/TrypheMarketingChrome";
import { FaqLanding } from "@/components/faq/FaqLanding";

export const metadata = {
  title: "Preguntas frecuentes | Tryphé",
  description:
    "Respuestas a las dudas más comunes sobre pedidos, envíos, devoluciones, pagos y cuidado de tu fragancia Tryphé.",
};

export default async function FaqPage() {
  const shopConfigured = isShopifyConfigured();
  const navLinks = await getMarketingNavLinks();

  return (
    <TrypheMarketingChrome navLinks={navLinks} shopConfigured={shopConfigured}>
      <FaqLanding />
    </TrypheMarketingChrome>
  );
}
