import {
  isShopifyConfigured,
  getCollectionsFirst,
  getProductsFirst,
  getCollectionProductsFirst,
} from "@/lib/shopify";
import { getProductHref } from "@/lib/product-href";
import { TrypheLanding } from "@/components/home/TrypheLanding";
import { resolveFeaturedCollections } from "@/lib/featured-collections";
import { getMarketingNavLinks } from "@/lib/marketing-nav";

/** Catálogo y precios se actualizan al regenerar la página (ISR). */
export const revalidate = 120;

/** Encuentra el handle real de una colección buscando por keyword en handle o título. */
function findCollectionHandle(collections, envHandle, keywords) {
  // 1. Si hay env var y existe en el catálogo, úsala
  if (envHandle) {
    const found = collections.find((c) => c.handle === envHandle);
    if (found) return found.handle;
  }
  // 2. Buscar por keyword en handle o título (case-insensitive)
  const lower = (s) => s.toLowerCase();
  for (const kw of keywords) {
    const found = collections.find(
      (c) => lower(c.handle).includes(kw) || lower(c.title).includes(kw),
    );
    if (found) return found.handle;
  }
  // 3. Fallback: primer keyword como handle literal
  return keywords[0];
}

export default async function Home() {
  const shopConfigured = isShopifyConfigured();

  let collectionsLarge = [];
  let productsAll = [];
  let hombreRaw = [];
  let mujerRaw = [];
  let hombreHandle = "hombre";
  let mujerHandle = "mujer";

  if (shopConfigured) {
    // Ronda 1: catálogo + productos generales en paralelo
    [collectionsLarge, productsAll] = await Promise.all([
      getCollectionsFirst(48),
      getProductsFirst(48),
    ]);

    // Resolver handles reales desde el catálogo de Shopify
    hombreHandle = findCollectionHandle(
      collectionsLarge,
      process.env.NEXT_PUBLIC_COLLECTION_HANDLE_EL?.trim(),
      ["hombre", "el", "él", "men", "man"],
    );
    mujerHandle = findCollectionHandle(
      collectionsLarge,
      process.env.NEXT_PUBLIC_COLLECTION_HANDLE_ELLA?.trim(),
      ["mujer", "ella", "women", "woman", "her"],
    );

    // Ronda 2: productos de cada colección con handles correctos
    [hombreRaw, mujerRaw] = await Promise.all([
      getCollectionProductsFirst(hombreHandle, 8),
      getCollectionProductsFirst(mujerHandle, 8),
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

  const mapProduct = (p) => ({
    handle: p.handle,
    title: p.title,
    href: getProductHref(p),
    imageUrl: p.featuredImage?.url ?? null,
    imageAlt: p.featuredImage?.altText ?? p.title,
    priceAmount: p.priceRange?.minVariantPrice?.amount ?? null,
    priceCurrency: p.priceRange?.minVariantPrice?.currencyCode ?? "MXN",
    compareAtAmount: p.compareAtPriceRange?.minVariantPrice?.amount ?? null,
  });

  const productCards = productsAll.slice(0, 12).map(mapProduct);
  const hombreProducts = hombreRaw.slice(0, 8).map(mapProduct);
  const mujerProducts = mujerRaw.slice(0, 8).map(mapProduct);

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

  const santorRaw = productsAll.find(
    (p) => p.handle === "santor-effect" || p.handle === "santor",
  );
  const santorVariantId =
    santorRaw?.variants?.edges?.find((e) => e.node.availableForSale)?.node?.id ??
    santorRaw?.variants?.edges?.[0]?.node?.id ??
    null;
  const santorCheckoutUrl = santorRaw?.onlineStoreUrl ?? null;

  return (
    <TrypheLanding
      shopConfigured={shopConfigured}
      navLinks={navLinks}
      featuredCollections={featuredCollections}
      products={productCards}
      hombreProducts={hombreProducts}
      mujerProducts={mujerProducts}
      hombreHref={`/collections/${hombreHandle}`}
      mujerHref={`/collections/${mujerHandle}`}
      quizProducts={quizProducts}
      santorVariantId={santorVariantId}
      santorCheckoutUrl={santorCheckoutUrl}
    />
  );
}
