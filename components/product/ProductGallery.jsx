"use client";

import Image from "next/image";
import { useState } from "react";

export function ProductGallery({ images, title }) {
  const list = images?.length ? images : [];
  const [active, setActive] = useState(0);
  const main = list[active] ?? list[0];

  if (!main?.url) {
    return (
      <div className="aspect-[3/4] bg-neutral-100 flex items-center justify-center">
        <span className="text-neutral-400 text-sm">Sin imagen</span>
      </div>
    );
  }

  return (
    <div className="flex flex-col-reverse gap-4 sm:flex-row sm:gap-5">
      {/* Thumbnails — vertical strip on desktop */}
      {list.length > 1 && (
        <div className="flex gap-2.5 sm:flex-col sm:gap-3 overflow-x-auto sm:overflow-y-auto sm:max-h-[640px] pb-1 sm:pb-0 sm:pr-1 shrink-0">
          {list.map((img, i) => (
            <button
              key={img.id || i}
              type="button"
              onClick={() => setActive(i)}
              className={`relative h-16 w-16 sm:h-20 sm:w-20 shrink-0 overflow-hidden transition-all duration-200 ${
                i === active
                  ? "ring-2 ring-neutral-950 ring-offset-2 ring-offset-[#faf9f7] opacity-100"
                  : "opacity-50 hover:opacity-80"
              }`}
            >
              <Image
                src={img.url}
                alt=""
                fill
                className="object-cover"
                sizes="80px"
              />
            </button>
          ))}
        </div>
      )}

      {/* Main image */}
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-neutral-100">
        <Image
          src={main.url}
          alt={main.altText || title}
          fill
          className="object-cover transition-transform duration-700 hover:scale-[1.03]"
          sizes="(max-width: 1024px) 100vw, 55vw"
          priority
        />
      </div>
    </div>
  );
}
