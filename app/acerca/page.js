import { isShopifyConfigured } from "@/lib/shopify";
import { getMarketingNavLinks } from "@/lib/marketing-nav";
import { TrypheMarketingChrome } from "@/components/home/TrypheMarketingChrome";
import { AboutLanding } from "@/components/about/AboutLanding";

export const metadata = {
  title: "Sobre Tryphé | Nuestra historia",
  description:
    "Historia, valores y proceso detrás de Tryphé — fragancias de nicho accesibles desde México.",
};

export default async function AboutPage() {
  const shopConfigured = isShopifyConfigured();
  const navLinks = await getMarketingNavLinks();

  return (
    <TrypheMarketingChrome navLinks={navLinks} shopConfigured={shopConfigured}>
      <AboutLanding />
    </TrypheMarketingChrome>
  );
}
