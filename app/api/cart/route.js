import { cookies } from "next/headers";
import { getCart, isShopifyConfigured } from "@/lib/shopify";
import { CART_COOKIE_NAME } from "@/lib/cart-cookie";

export async function GET() {
  if (!isShopifyConfigured()) {
    return Response.json({ totalQuantity: 0 });
  }
  const store = await cookies();
  const id = store.get(CART_COOKIE_NAME)?.value;
  if (!id) {
    return Response.json({ totalQuantity: 0 });
  }
  try {
    const cart = await getCart(id);
    return Response.json({
      totalQuantity: cart?.totalQuantity ?? 0,
      checkoutUrl: cart?.checkoutUrl ?? null,
    });
  } catch {
    return Response.json({ totalQuantity: 0 });
  }
}
