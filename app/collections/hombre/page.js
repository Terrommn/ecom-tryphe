import { isShopifyConfigured, getProductsFirst } from "@/lib/shopify";
import { getMarketingNavLinks } from "@/lib/marketing-nav";
import { TrypheMarketingChrome } from "@/components/home/TrypheMarketingChrome";
import { CollectionLanding } from "@/components/collection/CollectionLanding";
import { placeholderHombre } from "@/lib/placeholder-products";

export const metadata = {
  title: "Fragancias para Él | Tryphé",
  description:
    "Colección masculina Tryphé — proyección, carácter y silencio. Perfumes inspirados en laboratorios de nicho.",
};

export const revalidate = 120;

export default async function HombrePage() {
  const shopConfigured = isShopifyConfigured();
  const navLinks = await getMarketingNavLinks();

  let products = placeholderHombre;
  if (shopConfigured) {
    const all = await getProductsFirst(48);
    const tagged = all.filter((p) =>
      (p.tags ?? []).some((t) => /hombre|him|homme|masculin/i.test(t)),
    );
    if (tagged.length > 0) products = tagged;
    else if (all.length > 0) products = all.slice(0, 8);
  }

  return (
    <TrypheMarketingChrome navLinks={navLinks} shopConfigured={shopConfigured}>
      <CollectionLanding gender="hombre" products={products} />
    </TrypheMarketingChrome>
  );
}
