"use client";

import Image from "next/image";
import { useState } from "react";

export function ProductGallery({ images, title }) {
  const list = images?.length ? images : [];
  const [active, setActive] = useState(0);
  const main = list[active] ?? list[0];

  if (!main?.url) {
    return (
      <div className="aspect-[3/4] rounded-lg border border-[color:var(--oob-border)] bg-[var(--oob-bg-elevated)] flex items-center justify-center">
        <span className="text-[var(--oob-muted)] text-sm">Sin imagen</span>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="relative aspect-[3/4] overflow-hidden rounded-lg border border-[color:var(--oob-border)] bg-[var(--oob-bg-elevated)]">
        <Image
          src={main.url}
          alt={main.altText || title}
          fill
          className="object-cover"
          sizes="(max-width: 1024px) 100vw, 50vw"
          priority
        />
      </div>
      {list.length > 1 ? (
        <div className="flex gap-2 overflow-x-auto pb-1">
          {list.map((img, i) => (
            <button
              key={img.id || i}
              type="button"
              onClick={() => setActive(i)}
              className={`relative h-20 w-16 shrink-0 overflow-hidden rounded border transition ${
                i === active
                  ? "border-[var(--oob-gold)] ring-1 ring-[var(--oob-gold)]"
                  : "border-[color:var(--oob-border)] opacity-70 hover:opacity-100"
              }`}
            >
              <Image
                src={img.url}
                alt=""
                fill
                className="object-cover"
                sizes="64px"
              />
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
