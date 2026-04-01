/**
 * Placeholder for Judge.me or similar review widgets (PDF 9.3).
 * Set NEXT_PUBLIC_JUDGEME_SHOP_DOMAIN when ready to load the official widget.
 */
export function JudgeMePlaceholder({ productId }) {
  const domain = process.env.NEXT_PUBLIC_JUDGEME_SHOP_DOMAIN;
  if (!domain) {
    return (
      <section className="mt-12 rounded-lg border border-dashed border-[color:var(--oob-border)] p-6 text-center text-sm text-[var(--oob-muted)]">
        <p className="font-medium text-[var(--oob-cream)]/80">Reseñas de clientes</p>
        <p className="mt-2">
          Integra Judge.me u otra app de reseñas desde el admin de Shopify. Producto:{" "}
          <span className="font-mono text-xs opacity-70">{productId}</span>
        </p>
      </section>
    );
  }
  return (
    <section
      className="judgeme-widget mt-12"
      data-product-id={productId}
      data-shop-domain={domain}
    />
  );
}
