import Image from "next/image";
import Link from "next/link";
import { getCollectionsCatalog } from "@/lib/shopify";
import { TrypheShell } from "@/components/layout/TrypheShell";

export const metadata = {
  title: "Colecciones | Tienda",
  description: "Listado de colecciones públicas desde Shopify.",
};

const COLLECTION_IMAGE_OVERRIDES = {
  formal: { url: "/home/col-formal.jpg", altText: "Formal" },
  hombre: { url: "/home/col-hombre.jpg", altText: "Hombre" },
  mujer: { url: "/home/col-mujer.jpg", altText: "Mujer" },
  casual: { url: "/home/col-casual.jpg", altText: "Casual" },
};

const CURATED_COLLECTIONS = [
  { id: "curated-formal", handle: "formal", title: "Formal", label: "Formal", displayTitle: "Formal" },
  { id: "curated-hombre", handle: "hombre", title: "Hombre", label: "Hombre", displayTitle: "Para Él" },
  { id: "curated-mujer", handle: "mujer", title: "Mujer", label: "Mujer", displayTitle: "Para Ella" },
  { id: "curated-casual", handle: "casual", title: "Casual", label: "Casual", displayTitle: "Casual" },
];

const DISPLAY_TITLES = {
  formal: { label: "Formal", displayTitle: "Formal" },
  hombre: { label: "Hombre", displayTitle: "Para Él" },
  mujer: { label: "Mujer", displayTitle: "Para Ella" },
  casual: { label: "Casual", displayTitle: "Casual" },
};

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
            <div className="mb-12" />
          </div>

          {collections.length === 0 ? (
            <p className="text-neutral-500">
              No hay colecciones públicas. Configura Shopify o añade colecciones en el admin.
            </p>
          ) : (
            <div
              className="grid grid-cols-2 gap-px bg-neutral-950/10 md:grid-cols-4"
              data-gsap="scale-in"
              data-gsap-stagger="0.1"
            >
              {collections.map((col) => {
                const display = DISPLAY_TITLES[col.handle];
                const label = display?.label || col.title;
                const title = display?.displayTitle || col.title;
                return (
                  <Link
                    key={col.id}
                    href={`/collections/${col.handle}`}
                    className="group relative aspect-[3/4] overflow-hidden bg-neutral-200"
                  >
                    {col.image?.url ? (
                      <Image
                        src={col.image.url}
                        alt={col.image.altText || col.title}
                        fill
                        className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-110"
                        sizes="(max-width:768px) 50vw, 25vw"
                      />
                    ) : (
                      <div
                        className="absolute inset-0 bg-gradient-to-br from-neutral-100 to-neutral-300"
                        aria-hidden
                      />
                    )}
                    <div className="absolute inset-0 bg-black/20 transition-colors duration-500 group-hover:bg-black/45" />
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-[#faf9f7]">
                      <p className="font-serif text-2xl font-medium tracking-tight md:text-3xl drop-shadow-lg">
                        {title}
                      </p>
                      <span className="mt-3 h-px w-0 bg-[#faf9f7]/70 transition-all duration-700 group-hover:w-16" />
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </TrypheShell>
  );
}
