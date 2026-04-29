import Link from "next/link";
import { notFound } from "next/navigation";
import { getCollectionPage } from "@/lib/shopify";
import { ProductCard } from "@/components/catalog/ProductCard";
import { CollectionToolbar } from "@/components/collection/CollectionToolbar";
import {
  getCollectionSort,
  parseCollectionProductFilters,
  getViewMode,
  getCursor,
  collectionNextHref,
} from "@/lib/collection-params";
import { TrypheShell } from "@/components/layout/TrypheShell";

const HANDLE = "casual";

export const metadata = {
  title: "Casual | Tryphé",
  description: "Fragancias casuales para el día a día. Frescas, ligeras y versátiles.",
};

export default async function CasualCollectionPage({ searchParams }) {
  const sp = await searchParams;
  const sort = getCollectionSort(sp);
  const filters = parseCollectionProductFilters(sp);
  const view = getViewMode(sp);
  const after = getCursor(sp);

  const collection = await getCollectionPage({
    handle: HANDLE,
    first: 24,
    after,
    sortKey: sort.sortKey,
    reverse: sort.reverse,
    filters,
  });

  if (!collection) notFound();

  const edges = collection.products?.edges ?? [];
  const products = edges.map((e) => e.node);
  const pageInfo = collection.products?.pageInfo;
  const hasNext = pageInfo?.hasNextPage;
  const endCursor = pageInfo?.endCursor;

  const gridClass =
    view === "list"
      ? "grid grid-cols-1 gap-6"
      : "grid grid-cols-2 gap-4 md:gap-6 lg:grid-cols-3 xl:grid-cols-4";

  return (
    <TrypheShell>
      <div className="bg-[#faf9f7]">
        <div className="pb-20">
          <div className="mx-auto max-w-screen-2xl px-4 lg:px-10 pt-10 md:pt-14">
            <nav className="text-xs text-neutral-500 mb-3" aria-label="Migas">
              <Link href="/" className="hover:text-neutral-950">Inicio</Link>
              <span className="mx-2">/</span>
              <Link href="/collections" className="hover:text-neutral-950">Colecciones</Link>
              <span className="mx-2">/</span>
              <span className="text-neutral-950">{collection.title}</span>
            </nav>
            <h1
              className="font-serif text-3xl md:text-4xl font-medium text-neutral-950"
              data-gsap="fade-up"
            >
              {collection.title}
            </h1>
            {collection.descriptionHtml ? (
              <div
                className="mt-3 max-w-2xl text-sm text-neutral-500 line-clamp-2 [&_p]:inline"
                dangerouslySetInnerHTML={{ __html: collection.descriptionHtml }}
              />
            ) : null}
          </div>

          <div className="mx-auto max-w-screen-2xl px-4 lg:px-10 py-10 md:py-12 space-y-8">
            <CollectionToolbar handle={HANDLE} searchParams={sp} />
            <p className="text-sm text-neutral-500">
              {products.length} producto{products.length !== 1 ? "s" : ""}
              {hasNext ? " (página con más resultados disponibles)" : ""}
            </p>

            {products.length === 0 ? (
              <p className="text-center text-neutral-500 py-16">
                No hay productos con estos filtros.
              </p>
            ) : (
              <div className={gridClass} data-gsap="fade-up" data-gsap-stagger="0.06">
                {products.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            )}

            {hasNext && endCursor ? (
              <div className="flex justify-center pt-8">
                <Link
                  href={collectionNextHref(HANDLE, sp, endCursor)}
                  className="border border-neutral-950 px-8 py-3 text-sm font-semibold uppercase tracking-wider text-neutral-950 hover:bg-neutral-950 hover:text-[#faf9f7] transition-colors"
                >
                  Cargar más
                </Link>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </TrypheShell>
  );
}
