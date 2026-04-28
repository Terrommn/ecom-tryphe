import Link from "next/link";
import { getCartForPage } from "@/app/actions/cart";
import { isShopifyConfigured, getProductsFirst } from "@/lib/shopify";
import { CartLines } from "@/components/cart/CartLines";
import { CheckoutButton } from "@/components/cart/CheckoutButton";
import { FreeShippingBar } from "@/components/cart/FreeShippingBar";
import { ProductCard } from "@/components/catalog/ProductCard";
import { TrypheShell } from "@/components/layout/TrypheShell";

export const metadata = {
  title: "Carrito | Tienda",
  description: "Revisa tu pedido y procede al pago.",
};

export default async function CartPage() {
  const configured = isShopifyConfigured();
  const cart = configured ? await getCartForPage() : null;

  const upsell = configured ? (await getProductsFirst(4)) : [];

  return (
    <TrypheShell>
      <div className="bg-[#faf9f7]">
        <div className="mx-auto max-w-screen-2xl px-4 lg:px-10 py-10 md:py-14">
          <h1 className="font-serif text-3xl md:text-4xl font-medium text-neutral-950 mb-2" data-gsap="fade-up">
            Carrito
          </h1>
          {!configured ? (
            <p className="text-neutral-500 mt-6">
              Conecta Shopify (variables de entorno) para usar el carrito.
            </p>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mt-8" data-gsap="fade-up" data-gsap-delay="0.1">
              <div className="lg:col-span-2 space-y-6">
                <FreeShippingBar totalQuantity={cart?.totalQuantity ?? 0} />
                <CartLines cart={cart} />
              </div>
              <div className="lg:col-span-1">
                <div className="sticky top-28 rounded-lg border border-neutral-200 bg-neutral-100/40 p-6 space-y-6">
                  <CheckoutButton checkoutUrl={cart?.checkoutUrl} disabled={!cart?.lines?.edges?.length} />
                  <p className="text-xs text-neutral-500">
                    Serás redirigido al checkout seguro de Shopify para completar el pago, envío y
                    facturación.
                  </p>
                  <Link
                    href="/collections"
                    className="block text-center text-sm text-neutral-950 hover:underline"
                  >
                    Seguir comprando
                  </Link>
                </div>
              </div>
            </div>
          )}

          {configured && upsell.length > 0 && cart?.lines?.edges?.length ? (
            <section className="mt-20 border-t border-neutral-200 pt-12">
              <h2 className="font-serif text-3xl md:text-4xl font-medium text-xl text-neutral-950 mb-6">
                Completa tu look
              </h2>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {upsell.slice(0, 4).map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            </section>
          ) : null}
        </div>
      </div>
    </TrypheShell>
  );
}
