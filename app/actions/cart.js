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

export async function addLineItemAction(merchandiseId, quantity = 1) {
  if (!isShopifyConfigured()) {
    return { ok: false, error: "Shopify no configurado" };
  }
  const { cart: ensured, error: e1 } = await ensureCartServer();
  if (!ensured?.id) {
    return { ok: false, error: e1 || "No se pudo crear el carrito" };
  }
  const cartId = ensured.id;
  const { cart, userErrors } = await addToCart(cartId, [
    { merchandiseId, quantity: Math.max(1, Number(quantity) || 1) },
  ]);
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
  const { cart, userErrors } = await updateCartDiscountCodes(
    cartId,
    trimmed ? [trimmed] : [],
  );
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
