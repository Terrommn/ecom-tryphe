/**
 * Placeholder for Judge.me or similar review widgets.
 * Set NEXT_PUBLIC_JUDGEME_SHOP_DOMAIN when ready to load the official widget.
 */
export function JudgeMePlaceholder({ productId }) {
  const domain = process.env.NEXT_PUBLIC_JUDGEME_SHOP_DOMAIN;
  if (!domain) {
    return null;
  }
  return (
    <section
      className="judgeme-widget mt-12"
      data-product-id={productId}
      data-shop-domain={domain}
    />
  );
}
