/**
 * Ruta relativa a la ficha del producto en el headless.
 * Usa `onlineStoreUrl` solo si el último segmento coincide con `product.handle`.
 * Si `onlineStoreUrl` apunta a otro slug (desincronía tras renombrar, etc.),
 * `product(handle)` en la ficha seguiría el handle actual; priorizamos `handle`.
 *
 * Si ves URLs como `/products/2` o `/products/123`, el **handle** en Shopify es numérico:
 * Admin → Producto → Vista previa del listado en buscadores → Editar → **URL y handle**.
 */
function pathnameProductHandle(pathname) {
  const raw = pathname.replace(/^\/products\//, "").split("/")[0] || "";
  try {
    return decodeURIComponent(raw);
  } catch {
    return raw;
  }
}

export function getProductHref(product) {
  if (!product?.handle) return "/collections";
  const raw = product.onlineStoreUrl;
  if (typeof raw === "string" && raw.startsWith("http")) {
    try {
      const pathname = new URL(raw).pathname;
      if (pathname.startsWith("/products/")) {
        const seg = pathnameProductHandle(pathname);
        if (seg === product.handle) return pathname;
      }
    } catch {
      /* ignore */
    }
  }
  return `/products/${encodeURIComponent(product.handle)}`;
}
