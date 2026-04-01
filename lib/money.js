/** Formato de moneda; tienda México: locale es-MX (precios vienen de Shopify en la divisa configurada). */
export function formatMoney(amount, currencyCode = "MXN") {
  const n = Number(amount);
  if (Number.isNaN(n)) return "";
  const locale = currencyCode === "USD" ? "en-US" : "es-MX";
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: currencyCode,
  }).format(n);
}
