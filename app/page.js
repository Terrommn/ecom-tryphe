import {
  isShopifyConfigured,
  getCollectionsFirst,
  getProductsFirst,
} from "@/lib/shopify";
import { getProductHref } from "@/lib/product-href";
import { TrypheLanding } from "@/components/home/TrypheLanding";
import { resolveFeaturedCollections } from "@/lib/featured-collections";
import { getMarketingNavLinks } from "@/lib/marketing-nav";

/** Catálogo y precios se actualizan al regenerar la página (ISR). */
export const revalidate = 120;

export default async function Home() {
  const shopConfigured = isShopifyConfigured();

  let collectionsLarge = [];
  let productsAll = [];

  if (shopConfigured) {
    [collectionsLarge, productsAll] = await Promise.all([
      getCollectionsFirst(48),
      getProductsFirst(48),
    ]);
  }

  const envHandles = [
    process.env.NEXT_PUBLIC_COLLECTION_HANDLE_EL?.trim(),
    process.env.NEXT_PUBLIC_COLLECTION_HANDLE_ELLA?.trim(),
    process.env.NEXT_PUBLIC_COLLECTION_HANDLE_BEST?.trim(),
    process.env.NEXT_PUBLIC_COLLECTION_HANDLE_GIFTS?.trim(),
  ].filter(Boolean);

  const featuredCollections = resolveFeaturedCollections(
    collectionsLarge,
    envHandles,
  );

  const navLinks = await getMarketingNavLinks();

  const productCards = productsAll.slice(0, 12).map((p) => ({
    handle: p.handle,
    title: p.title,
    href: getProductHref(p),
    imageUrl: p.featuredImage?.url ?? null,
    imageAlt: p.featuredImage?.altText ?? p.title,
    priceAmount: p.priceRange?.minVariantPrice?.amount ?? null,
    priceCurrency: p.priceRange?.minVariantPrice?.currencyCode ?? "MXN",
  }));

  const quizProducts = productsAll.map((p) => ({
    handle: p.handle,
    title: p.title,
    href: getProductHref(p),
    imageUrl: p.featuredImage?.url ?? null,
    imageAlt: p.featuredImage?.altText ?? p.title,
    priceAmount: p.priceRange?.minVariantPrice?.amount ?? null,
    priceCurrency: p.priceRange?.minVariantPrice?.currencyCode ?? "MXN",
    tags: p.tags ?? [],
  }));

  return (
    <TrypheLanding
      shopConfigured={shopConfigured}
      navLinks={navLinks}
      featuredCollections={featuredCollections}
      products={productCards}
      quizProducts={quizProducts}
    />
  );
}
