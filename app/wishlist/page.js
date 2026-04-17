import Link from "next/link";
import { WishlistClient } from "@/components/wishlist/WishlistClient";
import { TrypheShell } from "@/components/layout/TrypheShell";

export const metadata = {
  title: "Lista de deseos | Tienda",
  description: "Productos guardados para más tarde.",
};

export default function WishlistPage() {
  return (
    <TrypheShell>
      <div className="bg-[#faf9f7]">
        <div className="mx-auto max-w-screen-2xl px-4 lg:px-10 py-12 md:py-16">
          <h1 className="font-serif text-3xl md:text-4xl font-medium text-neutral-950 mb-4" data-gsap="fade-up">
            Lista de deseos
          </h1>
          <p className="text-sm text-neutral-500 mb-8 max-w-xl">
            Los favoritos se guardan en este navegador. Para sincronizar entre dispositivos hace falta
            cuenta de cliente (fase futura).
          </p>
          <WishlistClient />
          <p className="mt-10 text-sm text-neutral-500">
            <Link href="/collections" className="text-neutral-950 hover:underline">
              Seguir comprando
            </Link>
          </p>
        </div>
      </div>
    </TrypheShell>
  );
}
