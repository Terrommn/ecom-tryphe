import { PLACEHOLDER_PRODUCTS } from "@/lib/placeholders";

/**
 * Up to 8 products for the homepage. Uses only Storefront data when the store
 * returns any products — never mixes demo placeholders (wrong /products/... URLs).
 * Placeholders are used only when the API returns nothing (demo / misconfig).
 */
export function mergeBestsellerProducts(apiProducts) {
  const api = apiProducts || [];
  if (api.length > 0) {
    return api.slice(0, 8);
  }
  const out = [];
  for (const p of PLACEHOLDER_PRODUCTS) {
    if (out.length >= 8) break;
    if (!out.some((x) => x.handle === p.handle)) out.push(p);
  }
  let i = 0;
  while (out.length < 8) {
    const p = PLACEHOLDER_PRODUCTS[i % PLACEHOLDER_PRODUCTS.length];
    out.push({ ...p, id: `${p.id}-fill-${out.length}-${i}` });
    i += 1;
  }
  return out.slice(0, 8);
}
