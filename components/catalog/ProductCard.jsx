import Image from "next/image";
import Link from "next/link";
import { formatMoney } from "@/lib/money";
import { getProductHref } from "@/lib/product-href";

export function ProductCard({ product }) {
  const isPlaceholder =
    product.placeholder === true || String(product.id ?? "").startsWith("ph-");
  const href = isPlaceholder ? "/collections" : getProductHref(product);
  const ctaLabel = isPlaceholder ? "Ver colecciones" : "Ver producto";
  const img = product.featuredImage;
  const price = product.priceRange?.minVariantPrice;
  const amount = price?.amount;
  const currency = price?.currencyCode ?? "MXN";
  let badge = product.badge;
  if (!badge && product.tags?.length) {
    const tags = product.tags.map((t) => String(t).toLowerCase());
    if (tags.some((t) => t === "nuevo" || t === "new")) badge = "Nuevo";
    else if (tags.some((t) => /bestseller|más-vendido|mas-vendido/.test(t)))
      badge = "Más vendido";
  }

  return (
    <article className="group flex flex-col rounded-lg border border-[color:var(--oob-border)] bg-[var(--oob-surface)]/40 overflow-hidden transition hover:border-[var(--oob-gold)]/50 hover:shadow-lg hover:shadow-black/10">
      <Link href={href} className="relative aspect-[3/4] block bg-[var(--oob-bg-elevated)] overflow-hidden">
        {badge ? (
          <span className="absolute left-3 top-3 z-[1] rounded-full bg-[var(--oob-fairway)] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-white">
            {badge}
          </span>
        ) : null}
        {img?.url ? (
          <Image
            src={img.url}
            alt={img.altText || product.title}
            fill
            className="object-cover transition duration-500 group-hover:scale-[1.03]"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          />
        ) : (
          <div
            className="absolute inset-0 bg-gradient-to-br from-[var(--oob-surface)] to-[var(--oob-bg)] flex items-center justify-center"
            aria-hidden
          >
            <span className="text-[var(--oob-muted)] text-xs uppercase tracking-widest">—</span>
          </div>
        )}
      </Link>
      <div className="flex flex-1 flex-col p-4">
        <h3 className="font-medium text-[var(--oob-cream)] line-clamp-2 group-hover:text-[var(--oob-gold)] transition-colors">
          <Link href={href}>{product.title}</Link>
        </h3>
        {amount != null ? (
          <p className="mt-2 text-sm text-[var(--oob-gold)]">{formatMoney(amount, currency)}</p>
        ) : null}
        <Link
          href={href}
          className="mt-4 inline-flex w-fit items-center text-xs font-semibold uppercase tracking-wider text-[var(--oob-cream)] underline-offset-4 hover:text-[var(--oob-gold)] hover:underline"
        >
          {ctaLabel}
        </Link>
      </div>
    </article>
  );
}
