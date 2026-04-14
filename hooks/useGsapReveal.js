"use client";

import { useLayoutEffect, useRef, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

function prefersReducedMotion() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/**
 * Fade + slide-up on scroll.
 * Attach the returned ref to the element you want to reveal.
 */
export function useScrollReveal({
  y = 40,
  duration = 0.8,
  delay = 0,
  ease = "power3.out",
  start = "top 85%",
} = {}) {
  const ref = useRef(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;

    gsap.set(el, { opacity: 0, y });

    const ctx = gsap.context(() => {
      gsap.to(el, {
        opacity: 1,
        y: 0,
        duration,
        delay,
        ease,
        scrollTrigger: { trigger: el, start, once: true },
      });
    });

    return () => ctx.revert();
  }, [y, duration, delay, ease, start]);

  return ref;
}

/**
 * Staggered reveal for children matching `selector`.
 * Attach the returned ref to the container.
 */
export function useStaggerReveal(
  selector = ":scope > *",
  {
    y = 60,
    duration = 0.7,
    stagger = 0.12,
    ease = "power3.out",
    start = "top 80%",
  } = {},
) {
  const ref = useRef(null);

  useLayoutEffect(() => {
    const container = ref.current;
    if (!container || prefersReducedMotion()) return;

    const children = container.querySelectorAll(selector);
    if (!children.length) return;

    gsap.set(children, { opacity: 0, y });

    const ctx = gsap.context(() => {
      gsap.to(children, {
        opacity: 1,
        y: 0,
        duration,
        stagger,
        ease,
        scrollTrigger: { trigger: container, start, once: true },
      });
    });

    return () => ctx.revert();
  }, [selector, y, duration, stagger, ease, start]);

  return ref;
}

/**
 * Parallax effect on scroll (scrub).
 * Attach the returned ref to the element.
 */
export function useParallax(speed = 50) {
  const ref = useRef(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { y: -speed },
        {
          y: speed,
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        },
      );
    });

    return () => ctx.revert();
  }, [speed]);

  return ref;
}

/**
 * Image zoom that plays on load (no scroll trigger).
 */
export function useImageZoom({ scale = 1.05, duration = 1.4, ease = "power2.out" } = {}) {
  const ref = useRef(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;

    gsap.set(el, { scale });
    const ctx = gsap.context(() => {
      gsap.to(el, { scale: 1, duration, ease });
    });

    return () => ctx.revert();
  }, [scale, duration, ease]);

  return ref;
}

/**
 * Horizontal slide-in on scroll.
 */
export function useSlideIn({
  x = -100,
  duration = 1,
  ease = "power3.out",
  start = "top 80%",
} = {}) {
  const ref = useRef(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;

    gsap.set(el, { opacity: 0, x });

    const ctx = gsap.context(() => {
      gsap.to(el, {
        opacity: 1,
        x: 0,
        duration,
        ease,
        scrollTrigger: { trigger: el, start, once: true },
      });
    });

    return () => ctx.revert();
  }, [x, duration, ease, start]);

  return ref;
}
