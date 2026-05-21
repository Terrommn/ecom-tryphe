import { isShopifyConfigured, getCollectionProductsFirst } from "@/lib/shopify";
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
    const fetched = await getCollectionProductsFirst("perfumes-para-hombre", 48);
    if (fetched.length > 0) products = fetched;
  }

  return (
    <TrypheMarketingChrome navLinks={navLinks} shopConfigured={shopConfigured}>
      <CollectionLanding gender="hombre" products={products} />
    </TrypheMarketingChrome>
  );
}
