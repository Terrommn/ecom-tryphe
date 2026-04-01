import Image from "next/image";
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

export async function generateMetadata({ params }) {
  const { handle } = await params;
  const collection = await getCollectionPage({
    handle,
    first: 1,
    sortKey: "MANUAL",
    reverse: false,
    filters: [],
  });
  if (!collection) return { title: "Colección | Tienda" };
  return {
    title: `${collection.title} | Tienda`,
    description: collection.title,
  };
}

export default async function CollectionPage({ params, searchParams }) {
  const { handle } = await params;
  const sp = await searchParams;
  const sort = getCollectionSort(sp);
  const filters = parseCollectionProductFilters(sp);
  const view = getViewMode(sp);
  const after = getCursor(sp);

  const collection = await getCollectionPage({
    handle,
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
    <div className="pb-20">
      <div className="relative h-[220px] md:h-[280px] border-b border-[color:var(--oob-border)]">
        {collection.image?.url ? (
          <Image
            src={collection.image.url}
            alt={collection.image.altText || collection.title}
            fill
            className="object-cover"
            sizes="100vw"
            priority
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-[var(--oob-fairway)]/30 to-[var(--oob-bg)]" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--oob-bg)] to-transparent" />
        <div className="oob-container relative h-full flex flex-col justify-end pb-8">
          <nav className="text-xs text-[var(--oob-muted)] mb-3" aria-label="Migas">
            <Link href="/" className="hover:text-[var(--oob-gold)]">
              Inicio
            </Link>
            <span className="mx-2">/</span>
            <Link href="/collections" className="hover:text-[var(--oob-gold)]">
              Colecciones
            </Link>
            <span className="mx-2">/</span>
            <span className="text-[var(--oob-cream)]">{collection.title}</span>
          </nav>
          <h1 className="oob-heading-xl text-3xl md:text-4xl text-[var(--oob-cream)]">
            {collection.title}
          </h1>
          {collection.descriptionHtml ? (
            <div
              className="mt-3 max-w-2xl text-sm text-[var(--oob-muted)] line-clamp-2 [&_p]:inline"
              dangerouslySetInnerHTML={{ __html: collection.descriptionHtml }}
            />
          ) : null}
        </div>
      </div>

      <div className="oob-container py-10 md:py-12 space-y-8">
        <CollectionToolbar handle={handle} searchParams={sp} />
        <p className="text-sm text-[var(--oob-muted)]">
          {products.length} producto{products.length !== 1 ? "s" : ""}
          {hasNext ? " (página con más resultados disponibles)" : ""}
        </p>

        {products.length === 0 ? (
          <p className="text-center text-[var(--oob-muted)] py-16">
            No hay productos con estos filtros.
          </p>
        ) : (
          <div className={gridClass}>
            {products.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}

        {hasNext && endCursor ? (
          <div className="flex justify-center pt-8">
            <Link
              href={collectionNextHref(handle, sp, endCursor)}
              className="rounded-full border border-[var(--oob-gold)] px-8 py-3 text-sm font-semibold uppercase tracking-wider text-[var(--oob-gold)] hover:bg-[var(--oob-gold)] hover:text-[var(--oob-bg)] transition-colors"
            >
              Cargar más
            </Link>
          </div>
        ) : null}
      </div>
    </div>
  );
}
