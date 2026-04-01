import Image from "next/image";

const DEFAULT_WORDMARK = "/brand/logo-placeholder.svg";

/**
 * Wordmark: imagen (por defecto `logo-placeholder.svg`) o solo texto si
 * NEXT_PUBLIC_BRAND_WORDMARK_TEXT_ONLY=1.
 *
 * - NEXT_PUBLIC_BRAND_WORDMARK_SRC: anula la ruta (ej. /brand/wordmark.svg)
 * - NEXT_PUBLIC_BRAND_WORDMARK_NO_INVERT_ON_DARK=1: sin filtro en header oscuro (logos a color)
 */
export function BrandWordmark({
  className = "",
  title,
  variant = "onDark",
}) {
  const name =
    title != null && String(title).length > 0
      ? title
      : (process.env.NEXT_PUBLIC_SITE_NAME?.trim() || "Tu marca");
  const onDark = variant === "onDark";
  const textOnly = process.env.NEXT_PUBLIC_BRAND_WORDMARK_TEXT_ONLY === "1";
  const override = process.env.NEXT_PUBLIC_BRAND_WORDMARK_SRC?.trim();
  const skipInvert = process.env.NEXT_PUBLIC_BRAND_WORDMARK_NO_INVERT_ON_DARK === "1";

  const src = textOnly ? "" : override || DEFAULT_WORDMARK;

  if (src) {
    return (
      <span
        className={`inline-flex shrink-0 items-center ${className}`}
        role="img"
        aria-label={name}
      >
        <Image
          src={src}
          alt=""
          width={240}
          height={48}
          sizes="(max-width: 640px) 160px, 220px"
          className={`h-8 w-auto max-w-[min(220px,58vw)] md:h-9 ${
            onDark && !skipInvert
              ? "brightness-0 invert opacity-[0.95] transition-opacity group-hover:opacity-100"
              : ""
          }`}
          priority={onDark}
        />
      </span>
    );
  }

  return (
    <span
      className={`inline-flex shrink-0 items-center text-base font-semibold tracking-tight md:text-lg ${onDark ? "text-white" : "text-[var(--oob-cream)]"} ${className}`}
      style={{ fontFamily: "var(--font-display), system-ui, sans-serif" }}
    >
      {name}
    </span>
  );
}
