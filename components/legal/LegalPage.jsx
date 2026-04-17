"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export function LegalPage({ title, updated, children }) {
  const headerRef = useRef(null);
  const bodyRef = useRef(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      if (headerRef.current) {
        gsap.fromTo(
          headerRef.current.children,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.7, ease: "power3.out", stagger: 0.1 }
        );
      }
      if (bodyRef.current) {
        gsap.fromTo(
          bodyRef.current.children,
          { opacity: 0, y: 25 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power3.out",
            stagger: 0.06,
            delay: 0.3,
          }
        );
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <article className="mx-auto max-w-3xl px-4 lg:px-10 py-12 md:py-16">
      <div ref={headerRef}>
        <h1 className="font-serif text-3xl md:text-4xl font-medium text-neutral-950 mb-2">
          {title}
        </h1>
        {updated ? (
          <p className="text-xs text-neutral-500 mb-10">
            Ultima actualizacion: {updated}
          </p>
        ) : null}
      </div>
      <div
        ref={bodyRef}
        className="prose prose-sm max-w-none text-neutral-500 [&_p]:text-neutral-950 [&_h2]:text-neutral-950 [&_h2]:text-lg [&_h2]:font-semibold [&_h2]:mt-8 [&_h2]:mb-3"
      >
        {children}
      </div>
    </article>
  );
}
