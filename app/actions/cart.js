"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import {
  addToCart,
  createCart,
  getCart,
  removeCartLines,
  updateCart,
  updateCartDiscountCodes,
  isShopifyConfigured,
} from "@/lib/shopify";
import { CART_COOKIE_NAME, CART_COOKIE_MAX_AGE } from "@/lib/cart-cookie";

async function getCartCookieId() {
  const store = await cookies();
  return store.get(CART_COOKIE_NAME)?.value ?? null;
}

async function setCartCookie(cartId) {
  const store = await cookies();
  store.set(CART_COOKIE_NAME, cartId, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: CART_COOKIE_MAX_AGE,
  });
}

async function clearCartCookie() {
  const store = await cookies();
  store.delete(CART_COOKIE_NAME);
}

export async function ensureCartServer() {
  if (!isShopifyConfigured()) return { cart: null, error: "Shopify no configurado" };
  let cartId = await getCartCookieId();
  if (cartId) {
    const cart = await getCart(cartId);
    if (cart) return { cart, error: null };
    await clearCartCookie();
  }
  const { cart, userErrors } = await createCart([]);
  if (userErrors?.length) {
    return { cart: null, error: userErrors.map((e) => e.message).join(", ") };
  }
  if (cart?.id) {
    await setCartCookie(cart.id);
  }
  return { cart, error: null };
}

export async function addLineItemAction(merchandiseId, quantity = 1, attributes = []) {
  if (!isShopifyConfigured()) {
    return { ok: false, error: "Shopify no configurado" };
  }
  const { cart: ensured, error: e1 } = await ensureCartServer();
  if (!ensured?.id) {
    return { ok: false, error: e1 || "No se pudo crear el carrito" };
  }
  const cartId = ensured.id;
  const lineItem = { merchandiseId, quantity: Math.max(1, Number(quantity) || 1) };
  if (attributes.length) lineItem.attributes = attributes;
  const { cart, userErrors } = await addToCart(cartId, [lineItem]);
  if (userErrors?.length) {
    return { ok: false, error: userErrors.map((u) => u.message).join(", ") };
  }
  revalidatePath("/cart");
  revalidatePath("/");
  return { ok: true, cart, error: null };
}

export async function updateLineQuantityAction(lineId, quantity) {
  if (!isShopifyConfigured()) {
    return { ok: false, error: "Shopify no configurado" };
  }
  const cartId = await getCartCookieId();
  if (!cartId) return { ok: false, error: "Sin carrito" };
  const q = Math.max(0, Number(quantity) || 0);
  if (q === 0) {
    return removeLineAction(lineId);
  }
  const { cart, userErrors } = await updateCart(cartId, [{ id: lineId, quantity: q }]);
  if (userErrors?.length) {
    return { ok: false, error: userErrors.map((u) => u.message).join(", ") };
  }
  revalidatePath("/cart");
  return { ok: true, cart };
}

export async function removeLineAction(lineId) {
  if (!isShopifyConfigured()) {
    return { ok: false, error: "Shopify no configurado" };
  }
  const cartId = await getCartCookieId();
  if (!cartId) return { ok: false, error: "Sin carrito" };
  const { cart, userErrors } = await removeCartLines(cartId, [lineId]);
  if (userErrors?.length) {
    return { ok: false, error: userErrors.map((u) => u.message).join(", ") };
  }
  revalidatePath("/cart");
  return { ok: true, cart };
}

export async function applyDiscountAction(code) {
  if (!isShopifyConfigured()) {
    return { ok: false, error: "Shopify no configurado" };
  }
  const cartId = await getCartCookieId();
  if (!cartId) return { ok: false, error: "Sin carrito" };
  const trimmed = (code || "").trim();
  if (!trimmed) return { ok: false, error: "Codigo vacio" };

  // Leer codigos existentes del carrito para acumular
  const currentCart = await getCart(cartId);
  const existingCodes = (currentCart?.discountCodes ?? [])
    .map((c) => c.code)
    .filter(Boolean);

  // No duplicar si ya esta aplicado
  if (existingCodes.includes(trimmed)) {
    return { ok: true, cart: currentCart };
  }

  const allCodes = [...existingCodes, trimmed];
  const { cart, userErrors } = await updateCartDiscountCodes(cartId, allCodes);
  if (userErrors?.length) {
    return { ok: false, error: userErrors.map((u) => u.message).join(", ") };
  }
  revalidatePath("/cart");
  return { ok: true, cart };
}

/** For `<form action={...}>` (Next.js Server Action). */
export async function applyDiscountFormAction(formData) {
  const code = formData.get("code");
  return applyDiscountAction(typeof code === "string" ? code : "");
}

export async function getCartForPage() {
  if (!isShopifyConfigured()) return null;
  const cartId = await getCartCookieId();
  if (!cartId) return null;
  return getCart(cartId);
}

export async function checkCartPromoStatus() {
  if (!isShopifyConfigured()) return { unlocked: false, has60: false };
  const cartId = await getCartCookieId();
  if (!cartId) return { unlocked: false, has60: false };
  const cart = await getCart(cartId);
  if (!cart) return { unlocked: false, has60: false };
  const lines = cart.lines?.edges ?? [];
  let count100 = 0;
  let has60 = false;
  for (const { node: line } of lines) {
    const vTitle = (line.merchandise?.title ?? "").toLowerCase();
    const isFlash = (line.attributes ?? []).some(
      (a) => a.key === "_source" && a.value === "flash_sale"
    );
    console.log("[PROMO CHECK] variant:", vTitle, "qty:", line.quantity, "flash:", isFlash);
    if (vTitle.includes("100") && !isFlash) count100 += line.quantity;
    if (vTitle.includes("60")) has60 = true;
  }
  console.log("[PROMO CHECK] result: count100=", count100, "has60=", has60, "unlocked=", count100 >= 2);
  return { unlocked: count100 >= 2, has60 };
}

export async function getSantorFreeVariantId() {
  if (!isShopifyConfigured()) return null;
  const { getProductByHandle } = await import("@/lib/shopify");
  const product = await getProductByHandle("santor-inspirado-en-invictus-copia");
  if (!product) return null;
  const variants = product.variants?.edges ?? [];
  const v60 = variants.find(
    (e) =>
      e.node.title?.toLowerCase().includes("60") ||
      e.node.selectedOptions?.some(
        (o) => o.name?.toLowerCase() === "size" && o.value?.toLowerCase().includes("60")
      )
  );
  return v60?.node?.id ?? null;
}

export async function getSantorPocketVariantId() {
  if (!isShopifyConfigured()) return null;
  const { getProductByHandle } = await import("@/lib/shopify");
  const product = await getProductByHandle("santor-inspirado-en-invictus-copia");
  if (!product) return null;
  const variants = product.variants?.edges ?? [];
  const v30 = variants.find(
    (e) =>
      e.node.title?.toLowerCase().includes("30") ||
      e.node.title?.toLowerCase().includes("pocket") ||
      e.node.selectedOptions?.some(
        (o) => o.name?.toLowerCase() === "size" && o.value?.toLowerCase().includes("30")
      )
  );
  return v30?.node?.id ?? null;
}

export async function getAll60mlProducts() {
  if (!isShopifyConfigured()) return [];
  const { getProducts } = await import("@/lib/shopify");
  const allProducts = await getProducts();
  const results = [];
  for (const product of allProducts) {
    const variants = product.variants?.edges ?? [];
    const v60 = variants.find((e) => {
      const title = (e.node.title ?? "").toLowerCase();
      return title.includes("60");
    });
    if (v60) {
      results.push({
        id: product.id,
        handle: product.handle,
        title: product.title,
        featuredImage: product.featuredImage,
        variant60ml: {
          id: v60.node.id,
          title: v60.node.title,
          price: v60.node.price,
        },
      });
    }
  }
  return results;
}
