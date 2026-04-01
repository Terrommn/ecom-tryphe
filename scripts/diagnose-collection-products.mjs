#!/usr/bin/env node
/**
 * Diagnóstico: colección → enlaces /products/... vs product(handle).
 * Uso: node --env-file=.env scripts/diagnose-collection-products.mjs [handleColeccion]
 * Default handle: hombre
 *
 * Implementa las fases 1–4 y 6 del plan (evidencia, comparación onlineStoreUrl/handle,
 * ProductByHandle). La fase 2 (Admin) queda como paso manual usando la tabla impresa.
 */

import { GraphQLClient } from "graphql-request";

const API_VERSION = "2025-01";

const PRODUCT_MIN = `
  fragment ProductCardFields on Product {
    id
    handle
    onlineStoreUrl
    title
  }
`;

const COLLECTION_QUERY = `
  ${PRODUCT_MIN}
  query CollectionPage($handle: String!, $first: Int!, $after: String) {
    collection(handle: $handle) {
      id
      title
      handle
      products(first: $first, after: $after, sortKey: MANUAL, reverse: false) {
        pageInfo {
          hasNextPage
          endCursor
        }
        edges {
          node {
            ...ProductCardFields
          }
        }
      }
    }
  }
`;

const PRODUCT_BY_HANDLE = `
  query ProductByHandle($handle: String!) {
    product(handle: $handle) {
      id
      handle
      title
    }
  }
`;

function getClient() {
  const domain = process.env.SHOPIFY_STORE_DOMAIN;
  const token = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN;
  if (!domain || !token) {
    console.error(
      "Falta SHOPIFY_STORE_DOMAIN o SHOPIFY_STOREFRONT_ACCESS_TOKEN (usa: node --env-file=.env ...)",
    );
    process.exit(1);
  }
  const endpoint = `https://${domain}/api/${API_VERSION}/graphql.json`;
  return new GraphQLClient(endpoint, {
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token": token,
    },
  });
}

function pathnameLastSegment(pathname) {
  const raw = pathname.replace(/^\/products\//, "").split("/")[0] || "";
  try {
    return decodeURIComponent(raw);
  } catch {
    return raw;
  }
}

/** Lógica alineada con getProductHref (antes del fix defensivo). */
function hrefLegacy(product) {
  if (!product?.handle) return "/collections";
  const raw = product.onlineStoreUrl;
  if (typeof raw === "string" && raw.startsWith("http")) {
    try {
      const pathname = new URL(raw).pathname;
      if (pathname.startsWith("/products/")) return pathname;
    } catch {
      /* ignore */
    }
  }
  return `/products/${encodeURIComponent(product.handle)}`;
}

/** Lógica alineada con getProductHref tras fix (handle fuente de verdad si hay mismatch). */
function hrefFixed(product) {
  if (!product?.handle) return "/collections";
  const raw = product.onlineStoreUrl;
  if (typeof raw === "string" && raw.startsWith("http")) {
    try {
      const pathname = new URL(raw).pathname;
      if (pathname.startsWith("/products/")) {
        const seg = pathnameLastSegment(pathname);
        if (seg === product.handle) return pathname;
        return `/products/${encodeURIComponent(product.handle)}`;
      }
    } catch {
      /* ignore */
    }
  }
  return `/products/${encodeURIComponent(product.handle)}`;
}

async function main() {
  const collectionHandle = process.argv[2] || "hombre";
  const domain = process.env.SHOPIFY_STORE_DOMAIN;
  console.log("=== Diagnóstico enlaces colección → producto ===\n");
  console.log(`Tienda: ${domain}`);
  console.log(`Colección (handle): ${collectionHandle}\n`);

  const client = getClient();
  const allNodes = [];
  let after = null;
  let page = 0;
  const pageSize = 50;

  for (;;) {
    page += 1;
    const data = await client.request(COLLECTION_QUERY, {
      handle: collectionHandle,
      first: pageSize,
      after,
    });
    const col = data.collection;
    if (!col) {
      console.error(`No existe la colección con handle "${collectionHandle}" (Storefront).`);
      process.exit(2);
    }
    if (page === 1) {
      console.log(`Colección: "${col.title}" (id ${col.id})\n`);
    }
    const edges = col.products?.edges ?? [];
    for (const e of edges) {
      if (e.node) allNodes.push(e.node);
    }
    const pi = col.products?.pageInfo;
    if (!pi?.hasNextPage || !pi.endCursor) break;
    after = pi.endCursor;
  }

  console.log(`Productos en colección: ${allNodes.length}\n`);
  console.log(
    "--- Fase 3: handle vs último segmento de onlineStoreUrl (mismatch = riesgo de 404) ---\n",
  );

  const rows = [];
  for (const p of allNodes) {
    const url = p.onlineStoreUrl;
    let pathname = "";
    let lastSeg = "";
    let mismatch = false;
    if (typeof url === "string" && url.startsWith("http")) {
      try {
        pathname = new URL(url).pathname;
        lastSeg = pathname.startsWith("/products/")
          ? pathnameLastSegment(pathname)
          : "";
        mismatch = lastSeg !== "" && lastSeg !== p.handle;
      } catch {
        pathname = "(URL inválida)";
      }
    }
    rows.push({ p, pathname, lastSeg, mismatch });
    const flag = mismatch ? " ⚠ MISMATCH" : "";
    console.log(`· ${p.title}`);
    console.log(`  handle:           ${p.handle}`);
    console.log(`  onlineStoreUrl:   ${url || "(null)"}`);
    if (pathname) console.log(`  pathname / último: ${pathname} → "${lastSeg}"${flag}`);
    console.log("");
  }

  console.log(
    "--- Fase 1 / URLs locales esperadas (legacy getProductHref vs corregido) ---\n",
  );
  for (const { p, mismatch } of rows) {
    const leg = hrefLegacy(p);
    const fix = hrefFixed(p);
    const same = leg === fix;
    console.log(`· ${p.handle}`);
    console.log(`  legacy href: ${leg}`);
    console.log(`  fixed href:  ${fix}${same ? "" : "  ← diferencia"}`);
    if (mismatch && !same) {
      console.log(
        `  → El enlace legacy podía ir a un slug distinto; la ficha usa product(handle) del path.`,
      );
    }
    console.log("");
  }

  console.log("--- Fase 4: product(handle) para el slug que usaría cada enlace ---\n");
  for (const { p } of rows) {
    const pathFromFixed = hrefFixed(p);
    const slug = pathFromFixed.replace(/^\/products\//, "");
    const slugDecoded = decodeURIComponent(slug);
    let ok = false;
    let errMsg = "";
    try {
      const r = await client.request(PRODUCT_BY_HANDLE, { handle: slugDecoded });
      ok = !!r.product;
      if (!ok) errMsg = "product es null";
    } catch (e) {
      errMsg = e?.message || String(e);
    }
    console.log(
      `· handle consultado: "${slugDecoded}" → ${ok ? "OK" : "FALLO"}${errMsg ? ` (${errMsg})` : ""}`,
    );
  }

  console.log("\n--- Fase 2 (manual): Admin → Producto → SEO → URL y handle ---");
  console.log(
    "Comprueba que cada handle impreso arriba coincide con el campo URL y handle en Shopify.\n",
  );

  const mismatches = rows.filter((r) => r.mismatch).length;
  console.log("=== Resumen ===");
  console.log(`Mismatches handle vs onlineStoreUrl: ${mismatches} / ${rows.length}`);
  console.log(
    mismatches > 0
      ? "→ Corregido en lib/product-href.js: el enlace usa el handle de Storefront si hay desajuste."
      : "→ Sin desajuste API; si aún hay 404, revisa publicación del producto o errores de API (logs dev).",
  );
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
