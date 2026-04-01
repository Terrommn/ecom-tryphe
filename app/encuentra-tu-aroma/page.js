import { getMarketingNavLinks } from "@/lib/marketing-nav";
import { isShopifyConfigured } from "@/lib/shopify";
import { TrypheMarketingChrome } from "@/components/home/TrypheMarketingChrome";
import { RedirectToHomeQuiz } from "./RedirectToHomeQuiz";

export const metadata = {
  title: "Encuentra tu aroma",
  description:
    "Cuestionario sensorial para recomendarte una fragancia Tryphé según proyección, emoción y contexto.",
};

export default async function EncuentraTuAromaPage() {
  const shopConfigured = isShopifyConfigured();
  const navLinks = await getMarketingNavLinks();

  return (
    <TrypheMarketingChrome navLinks={navLinks} shopConfigured={shopConfigured}>
      <RedirectToHomeQuiz />
    </TrypheMarketingChrome>
  );
}
