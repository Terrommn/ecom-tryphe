"use client";

import Image from "next/image";

/**
 * Ícono de marca opcional: NEXT_PUBLIC_BRAND_ICON_SRC=/brand/icon-mark.svg
 * Si no hay env, muestra un marco genérico (sustituye por tu SVG).
 */
export function BrandBadge({
  className = "",
  title = "Marca",
  heightClass = "h-10 md:h-12",
}) {
  const src = process.env.NEXT_PUBLIC_BRAND_ICON_SRC?.trim();

  if (src) {
    return (
      <span
        className={`inline-flex shrink-0 items-center text-current ${className}`}
        role="img"
        aria-label={title}
      >
        <Image
          src={src}
          alt=""
          width={64}
          height={64}
          className={`${heightClass} w-auto object-contain`}
        />
      </span>
    );
  }

  return (
    <span
      className={`inline-flex shrink-0 items-center text-[var(--oob-muted)] ${className}`}
      role="img"
      aria-label={title}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 64 64"
        fill="none"
        className={`${heightClass} w-auto`}
        aria-hidden
      >
        <rect x="6" y="6" width="52" height="52" rx="10" stroke="currentColor" strokeWidth="2" />
      </svg>
    </span>
  );
}
