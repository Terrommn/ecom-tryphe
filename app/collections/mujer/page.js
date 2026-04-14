import { isShopifyConfigured, getProductsFirst } from "@/lib/shopify";
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
    const all = await getProductsFirst(48);
    const tagged = all.filter((p) =>
      (p.tags ?? []).some((t) => /mujer|her|femme|femenin/i.test(t)),
    );
    if (tagged.length > 0) products = tagged;
    else if (all.length > 0) products = all.slice(0, 8);
  }

  return (
    <TrypheMarketingChrome navLinks={navLinks} shopConfigured={shopConfigured}>
      <CollectionLanding gender="mujer" products={products} />
    </TrypheMarketingChrome>
  );
}
