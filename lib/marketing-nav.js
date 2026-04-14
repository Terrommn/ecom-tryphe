import { isShopifyConfigured, getCollectionsFirst } from "@/lib/shopify";
import { collectionHrefOrFallback } from "@/lib/featured-collections";

/**
 * Misma navegación que la home editorial (Fragancias hombre/mujer, quiz, sobre).
 */
export async function getMarketingNavLinks() {
  const shopConfigured = isShopifyConfigured();
  let collectionsLarge = [];
  if (shopConfigured) {
    collectionsLarge = await getCollectionsFirst(48);
  }

  const handleHombre = process.env.NEXT_PUBLIC_COLLECTION_HANDLE_EL?.trim();
  const handleMujer = process.env.NEXT_PUBLIC_COLLECTION_HANDLE_ELLA?.trim();

  return [
    { label: "Fragancias hombre", href: "/collections/hombre" },
    { label: "Fragancias mujer", href: "/collections/mujer" },
    { label: "Encuentra tu Aroma", href: "/encuentra-tu-aroma" },
    { label: "Sobre Tryphé", href: "/acerca" },
  ];
}
