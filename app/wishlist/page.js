import Link from "next/link";
import { WishlistClient } from "@/components/wishlist/WishlistClient";

export const metadata = {
  title: "Lista de deseos | Tienda",
  description: "Productos guardados para más tarde.",
};

export default function WishlistPage() {
  return (
    <div className="oob-container py-12 md:py-16">
      <h1 className="oob-heading-xl text-3xl md:text-4xl text-[var(--oob-cream)] mb-4">
        Lista de deseos
      </h1>
      <p className="text-sm text-[var(--oob-muted)] mb-8 max-w-xl">
        Los favoritos se guardan en este navegador. Para sincronizar entre dispositivos hace falta
        cuenta de cliente (fase futura).
      </p>
      <WishlistClient />
      <p className="mt-10 text-sm text-[var(--oob-muted)]">
        <Link href="/collections" className="text-[var(--oob-gold)] hover:underline">
          Seguir comprando
        </Link>
      </p>
    </div>
  );
}
