import Image from "next/image";
import Link from "next/link";
import { getCollectionsCatalog } from "@/lib/shopify";
import { TrypheShell } from "@/components/layout/TrypheShell";

export const metadata = {
  title: "Colecciones | Tienda",
  description: "Listado de colecciones públicas desde Shopify.",
};

const COLLECTION_IMAGE_OVERRIDES = {
  formal: { url: "/collections/formal.png", altText: "Formal" },
  hombre: { url: "/collections/hombre.png", altText: "Hombre" },
  mujer: { url: "/collections/mujer.png", altText: "Mujer" },
  casual: { url: "/collections/casual.png", altText: "Casual" },
};

const CURATED_COLLECTIONS = [
  { id: "curated-formal", handle: "formal", title: "Formal" },
  { id: "curated-hombre", handle: "hombre", title: "Hombre" },
  { id: "curated-mujer", handle: "mujer", title: "Mujer" },
  { id: "curated-casual", handle: "casual", title: "Casual" },
];

export default async function CollectionsIndexPage() {
  const shopifyCollections = await getCollectionsCatalog(48);

  const byHandle = new Map(shopifyCollections.map((c) => [c.handle, c]));
  for (const curated of CURATED_COLLECTIONS) {
    if (!byHandle.has(curated.handle)) byHandle.set(curated.handle, curated);
  }

  const collections = Array.from(byHandle.values()).map((col) => {
    const override = COLLECTION_IMAGE_OVERRIDES[col.handle];
    return override ? { ...col, image: override } : col;
  });

  return (
    <TrypheShell>
      <div className="bg-[#faf9f7]">
        <div className="mx-auto max-w-screen-2xl px-4 lg:px-10 py-12 md:py-16">
          <div data-gsap="fade-up">
            <h1 className="font-serif text-3xl md:text-4xl font-medium text-neutral-950 mb-4">
              Colecciones
            </h1>
            <p className="text-neutral-500 max-w-xl mb-12">
              Catalogo sincronizado con tu admin de Shopify.
            </p>
          </div>

          {collections.length === 0 ? (
            <p className="text-neutral-500">
              No hay colecciones públicas. Configura Shopify o añade colecciones en el admin.
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" data-gsap="scale-in" data-gsap-stagger="0.1">
              {collections.map((col) => (
                <Link
                  key={col.id}
                  href={`/collections/${col.handle}`}
                  className="group relative overflow-hidden rounded-lg border border-neutral-200 aspect-[4/5] bg-white"
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
                      className="absolute inset-0 bg-gradient-to-br from-neutral-100 to-[#faf9f7]"
                      aria-hidden
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#faf9f7] via-[#faf9f7]/40 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h2 className="font-serif text-3xl md:text-4xl font-medium text-xl text-neutral-950 group-hover:text-neutral-950 transition-colors">
                      {col.title}
                    </h2>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </TrypheShell>
  );
}
