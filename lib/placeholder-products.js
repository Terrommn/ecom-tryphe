/**
 * Placeholder products so collection landings look complete without Shopify.
 * IDs start with "ph-" which ProductCard already recognises as placeholder.
 */

const HOMBRE = [
  { id: "ph-h1", handle: "noir-absolu", title: "Noir Absolu", tags: ["hombre", "nuevo"] },
  { id: "ph-h2", handle: "cuero-crudo", title: "Cuero Crudo", tags: ["hombre", "bestseller"] },
  { id: "ph-h3", handle: "madera-negra", title: "Madera Negra", tags: ["hombre"] },
  { id: "ph-h4", handle: "ambar-salvaje", title: "Ámbar Salvaje", tags: ["hombre", "nuevo"] },
  { id: "ph-h5", handle: "vetiver-oscuro", title: "Vetiver Oscuro", tags: ["hombre"] },
  { id: "ph-h6", handle: "oud-imperial", title: "Oud Imperial", tags: ["hombre", "bestseller"] },
  { id: "ph-h7", handle: "cedro-humo", title: "Cedro & Humo", tags: ["hombre"] },
  { id: "ph-h8", handle: "titanio", title: "Titanio", tags: ["hombre", "nuevo"] },
];

const MUJER = [
  { id: "ph-m1", handle: "rosa-negra", title: "Rosa Negra", tags: ["mujer", "nuevo"] },
  { id: "ph-m2", handle: "flor-de-noche", title: "Flor de Noche", tags: ["mujer", "bestseller"] },
  { id: "ph-m3", handle: "seda-blanca", title: "Seda Blanca", tags: ["mujer"] },
  { id: "ph-m4", handle: "jazmin-salvaje", title: "Jazmín Salvaje", tags: ["mujer", "nuevo"] },
  { id: "ph-m5", handle: "iris-dorado", title: "Iris Dorado", tags: ["mujer"] },
  { id: "ph-m6", handle: "magnolia-intensa", title: "Magnolia Intensa", tags: ["mujer", "bestseller"] },
  { id: "ph-m7", handle: "vainilla-oscura", title: "Vainilla Oscura", tags: ["mujer"] },
  { id: "ph-m8", handle: "amanecer", title: "Amanecer", tags: ["mujer", "nuevo"] },
];

const PRICES = ["649.00", "890.00", "1290.00", "749.00", "990.00", "1490.00", "850.00", "1190.00"];

function hydrate(list) {
  return list.map((p, i) => ({
    ...p,
    href: `/products/${p.handle}`,
    imageUrl: null,
    imageAlt: p.title,
    priceAmount: PRICES[i % PRICES.length],
    priceCurrency: "MXN",
    featuredImage: null,
    priceRange: {
      minVariantPrice: {
        amount: PRICES[i % PRICES.length],
        currencyCode: "MXN",
      },
    },
  }));
}

export const placeholderHombre = hydrate(HOMBRE);
export const placeholderMujer = hydrate(MUJER);
