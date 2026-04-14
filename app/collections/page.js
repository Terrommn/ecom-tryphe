import Image from "next/image";
import Link from "next/link";
import { getCollectionsCatalog } from "@/lib/shopify";

export const metadata = {
  title: "Colecciones | Tienda",
  description: "Listado de colecciones públicas desde Shopify.",
};

export default async function CollectionsIndexPage() {
  const collections = await getCollectionsCatalog(48);

  return (
    <div className="oob-container py-12 md:py-16">
      <div data-gsap="fade-up">
        <h1 className="oob-heading-xl text-3xl md:text-4xl text-[var(--oob-cream)] mb-4">
          Colecciones
        </h1>
        <p className="text-[var(--oob-muted)] max-w-xl mb-12">
          Catalogo sincronizado con tu admin de Shopify.
        </p>
      </div>

      {collections.length === 0 ? (
        <p className="text-[var(--oob-muted)]">
          No hay colecciones públicas. Configura Shopify o añade colecciones en el admin.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" data-gsap="scale-in" data-gsap-stagger="0.1">
          {collections.map((col) => (
            <Link
              key={col.id}
              href={`/collections/${col.handle}`}
              className="group relative overflow-hidden rounded-lg border border-[color:var(--oob-border)] aspect-[4/3] bg-[var(--oob-bg-elevated)]"
            >
              {col.image?.url ? (
                <Image
                  src={col.image.url}
                  alt={col.image.altText || col.title}
                  fill
                  className="object-cover transition duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              ) : (
                <div
                  className="absolute inset-0 bg-gradient-to-br from-[var(--oob-surface)] to-[var(--oob-bg)]"
                  aria-hidden
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--oob-bg)] via-[var(--oob-bg)]/40 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h2 className="oob-heading-xl text-xl text-[var(--oob-cream)] group-hover:text-[var(--oob-gold)] transition-colors">
                  {col.title}
                </h2>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
