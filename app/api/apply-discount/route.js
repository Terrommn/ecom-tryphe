import { cookies } from "next/headers";
import { getCart, createCart, updateCartDiscountCodes, isShopifyConfigured } from "@/lib/shopify";
import { CART_COOKIE_NAME, CART_COOKIE_MAX_AGE } from "@/lib/cart-cookie";

export async function POST(req) {
  if (!isShopifyConfigured()) {
    return Response.json({ ok: false, error: "Shopify no configurado" }, { status: 500 });
  }

  const { code } = await req.json();
  if (!code) return Response.json({ ok: false, error: "Sin código" }, { status: 400 });

  const store = await cookies();
  let cartId = store.get(CART_COOKIE_NAME)?.value;

  if (cartId) {
    const existing = await getCart(cartId);
    if (!existing) cartId = null;
  }

  if (!cartId) {
    const { cart } = await createCart([]);
    cartId = cart?.id;
    if (cartId) {
      store.set(CART_COOKIE_NAME, cartId, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: CART_COOKIE_MAX_AGE,
      });
    }
  }

  if (!cartId) return Response.json({ ok: false, error: "No se pudo crear carrito" }, { status: 500 });

  await updateCartDiscountCodes(cartId, [code]);
  return Response.json({ ok: true });
}
