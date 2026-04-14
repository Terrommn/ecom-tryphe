"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const ANIMATIONS = {
  "fade-up": {
    from: { opacity: 0, y: 50 },
    to: { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
  },
  "fade-in": {
    from: { opacity: 0 },
    to: { opacity: 1, duration: 0.7, ease: "power2.out" },
  },
  "fade-left": {
    from: { opacity: 0, x: -50 },
    to: { opacity: 1, x: 0, duration: 0.8, ease: "power3.out" },
  },
  "fade-right": {
    from: { opacity: 0, x: 50 },
    to: { opacity: 1, x: 0, duration: 0.8, ease: "power3.out" },
  },
  "scale-in": {
    from: { opacity: 0, scale: 0.92 },
    to: { opacity: 1, scale: 1, duration: 0.7, ease: "power2.out" },
  },
  "zoom-out": {
    from: { scale: 1.08 },
    to: { scale: 1, duration: 1.4, ease: "power2.out" },
  },
  "line-draw": {
    from: { scaleX: 0, transformOrigin: "left center" },
    to: { scaleX: 1, duration: 1, ease: "power2.inOut" },
  },
};

export function GsapScrollSetup() {
  const pathname = usePathname();
  const ctxRef = useRef(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const frame = requestAnimationFrame(() => {
      ctxRef.current = gsap.context(() => {
        document.querySelectorAll("[data-gsap]").forEach((el) => {
          const type = el.dataset.gsap;
          const delay = parseFloat(el.dataset.gsapDelay) || 0;
          const staggerVal = parseFloat(el.dataset.gsapStagger) || 0;
          const anim = ANIMATIONS[type];
          if (!anim) return;

          const useStagger = staggerVal > 0 && el.children.length > 1;
          const targets = useStagger ? Array.from(el.children) : el;

          gsap.fromTo(
            targets,
            { ...anim.from },
            {
              ...anim.to,
              delay,
              stagger: useStagger ? staggerVal : undefined,
              scrollTrigger: {
                trigger: el,
                start: "top 88%",
                once: true,
              },
            }
          );
        });
      });
    });

    return () => {
      cancelAnimationFrame(frame);
      ctxRef.current?.revert();
    };
  }, [pathname]);

  return null;
}
