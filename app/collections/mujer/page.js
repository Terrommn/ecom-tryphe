import { isShopifyConfigured, getCollectionProductsFirst } from "@/lib/shopify";
import { getMarketingNavLinks } from "@/lib/marketing-nav";
import { TrypheMarketingChrome } from "@/components/home/TrypheMarketingChrome";
import { CollectionLanding } from "@/components/collection/CollectionLanding";
import { placeholderMujer } from "@/lib/placeholder-products";

export const metadata = {
  title: "Fragancias para Ella | Tryphé",
  description:
    "Colección femenina Tryphé — emoción, textura y presencia. Aromas que son extensión de quien los lleva.",
};

export const revalidate = 120;

export default async function MujerPage() {
  const shopConfigured = isShopifyConfigured();
  const navLinks = await getMarketingNavLinks();

  let products = placeholderMujer;
  if (shopConfigured) {
    const fetched = await getCollectionProductsFirst("perfumes-para-mujer", 48);
    if (fetched.length > 0) products = fetched;
  }

  return (
    <TrypheMarketingChrome navLinks={navLinks} shopConfigured={shopConfigured}>
      <CollectionLanding gender="mujer" products={products} />
    </TrypheMarketingChrome>
  );
}
