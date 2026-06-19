"use client";

import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { X } from "lucide-react";
import { Free60mlGallery } from "./Free60mlGallery";
import { getAll60mlProducts } from "@/app/actions/cart";

function Confetti() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const colors = ["#d4a574", "#c9955f", "#fbbf24", "#f59e0b", "#a17952", "#34d399", "#f472b6"];
    const pieces = Array.from({ length: 50 }, () => {
      const d = document.createElement("div");
      const size = Math.random() * 8 + 4;
      Object.assign(d.style, {
        position: "absolute",
        width: `${size}px`,
        height: `${size}px`,
        backgroundColor: colors[Math.floor(Math.random() * colors.length)],
        borderRadius: Math.random() > 0.5 ? "50%" : "2px",
        left: `${Math.random() * 100}%`,
        top: "-10px",
        opacity: "1",
        pointerEvents: "none",
        zIndex: "20",
        transition: `all ${1.5 + Math.random()}s cubic-bezier(.25,.46,.45,.94)`,
      });
      el.appendChild(d);
      return d;
    });
    requestAnimationFrame(() => {
      pieces.forEach((d) => {
        d.style.top = `${70 + Math.random() * 50}%`;
        d.style.left = `${parseFloat(d.style.left) + (Math.random() - 0.5) * 40}%`;
        d.style.opacity = "0";
        d.style.transform = `rotate(${Math.random() * 720}deg)`;
      });
    });
    const t = setTimeout(() => pieces.forEach((d) => d.remove()), 3000);
    return () => { clearTimeout(t); pieces.forEach((d) => d.remove()); };
  }, []);
  return <div ref={ref} className="absolute inset-0 overflow-hidden pointer-events-none" />;
}

export function PromoUnlockedPopup() {
  const [visible, setVisible] = useState(false);
  const [showGallery, setShowGallery] = useState(false);
  const [products60ml, setProducts60ml] = useState([]);

  useEffect(() => {
    function handlePromoUnlocked() {
      console.log("[PROMO POPUP] Event received!");
      try {
        // Solo bloquear si ya se mostro Y el usuario eligio su 60ml
        const alreadyShown = sessionStorage.getItem("promo_2x100_shown");
        const alreadyChose = sessionStorage.getItem("promo_2x100_chose");
        if (alreadyShown && alreadyChose) {
          console.log("[PROMO POPUP] Already shown AND chose, skipping");
          return;
        }
      } catch {}
      console.log("[PROMO POPUP] Showing popup!");
      setVisible(true);
      try {
        sessionStorage.setItem("promo_2x100_shown", "1");
      } catch {}
      // Pre-cargar productos 60ml
      getAll60mlProducts().then((p) => {
        console.log("[PROMO POPUP] Loaded 60ml products:", p.length);
        setProducts60ml(p);
      }).catch((err) => {
        console.error("[PROMO POPUP] Error loading products:", err);
      });
    }

    window.addEventListener("promo-2x100-unlocked", handlePromoUnlocked);
    return () => window.removeEventListener("promo-2x100-unlocked", handlePromoUnlocked);
  }, []);

  function handleChoose() {
    setVisible(false);
    setShowGallery(true);
  }

  function dismiss() {
    setVisible(false);
  }

  if (showGallery && products60ml.length > 0) {
    return (
      <Free60mlGallery
        products={products60ml}
        onClose={() => setShowGallery(false)}
      />
    );
  }

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="relative mx-4 w-full max-w-md bg-[#faf9f7] shadow-2xl overflow-hidden">
        <Confetti />

        <button
          onClick={dismiss}
          className="absolute right-3 top-3 text-neutral-400 hover:text-neutral-950 transition-colors z-20"
          aria-label="Cerrar"
        >
          <X size={20} />
        </button>

        <div className="relative h-40 sm:h-48 w-full bg-neutral-950">
          <Image
            src="/home/hero-bottles-lineup.png"
            alt="Perfumes TRYPHE"
            fill
            className="object-cover opacity-90"
            sizes="448px"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#faf9f7] via-transparent to-transparent" />
        </div>

        <div className="relative z-10 px-8 pb-8 -mt-6">
          <div className="inline-flex items-center gap-2 rounded-full bg-[#d4a574]/15 px-4 py-1.5 mb-4">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#d4a574] opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[#d4a574]" />
            </span>
            <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-[#a17952]">
              Promocion Desbloqueada
            </span>
          </div>

          <h2 className="font-serif text-2xl font-medium text-neutral-950">
            Has desbloqueado un regalo!
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-neutral-600">
            Por comprar 2 perfumes de 100ml, elige un perfume de 60ml{" "}
            <strong className="text-neutral-950">totalmente gratis</strong>.
          </p>

          <div className="mt-5 flex items-center gap-3 bg-neutral-50 border border-neutral-200 rounded px-4 py-3">
            <span className="text-lg">🎁</span>
            <div>
              <p className="text-sm font-semibold text-neutral-950">Perfume de 60ml a tu eleccion</p>
              <p className="text-[11px] text-neutral-500">Elige el que mas te guste</p>
            </div>
            <span className="ml-auto text-xs font-bold text-[#d4a574]">GRATIS</span>
          </div>

          <button
            type="button"
            onClick={handleChoose}
            className="mt-6 w-full py-4 bg-neutral-950 text-[10px] font-bold uppercase tracking-[0.25em] text-white transition hover:bg-neutral-800"
          >
            Elegir mi perfume gratis
          </button>

          <button
            onClick={dismiss}
            className="mt-3 w-full text-center text-xs text-neutral-400 hover:text-neutral-600 transition-colors"
          >
            Ahora no
          </button>
        </div>
      </div>
    </div>
  );
}
