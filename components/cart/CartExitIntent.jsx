"use client";

import Image from "next/image";
import { useState, useEffect, useCallback } from "react";
import { X } from "lucide-react";
import { useRouter } from "next/navigation";
import { applyDiscountAction } from "@/app/actions/cart";

export function CartExitIntent({ hasItems }) {
  const router = useRouter();
  const [visible, setVisible] = useState(false);
  const [applied, setApplied] = useState(false);
  const [applying, setApplying] = useState(false);

  const showPopup = useCallback(() => {
    if (!hasItems) return;
    try {
      if (sessionStorage.getItem("exit_intent_shown")) return;
    } catch {}
    setVisible(true);
    try {
      sessionStorage.setItem("exit_intent_shown", "1");
    } catch {}
  }, [hasItems]);

  // Forzar popup al regresar del checkout (ignora exit_intent_shown)
  const forceShowFromCheckout = useCallback(() => {
    if (!hasItems) return;
    setVisible(true);
    try {
      sessionStorage.setItem("exit_intent_shown", "1");
    } catch {}
  }, [hasItems]);

  useEffect(() => {
    if (!hasItems) return;

    // Verificar al montar si viene de checkout
    try {
      if (sessionStorage.getItem("went_to_checkout")) {
        sessionStorage.removeItem("went_to_checkout");
        forceShowFromCheckout();
      }
    } catch {}

    // Detectar regreso via bfcache (back button desde checkout externo)
    function handlePageShow(e) {
      if (e.persisted) {
        try {
          if (sessionStorage.getItem("went_to_checkout")) {
            sessionStorage.removeItem("went_to_checkout");
            forceShowFromCheckout();
          }
        } catch {}
      }
    }

    // Desktop: mouse sale del viewport por arriba
    function handleMouseLeave(e) {
      if (e.clientY <= 0) {
        showPopup();
      }
    }

    window.addEventListener("pageshow", handlePageShow);
    document.documentElement.addEventListener("mouseleave", handleMouseLeave);
    return () => {
      window.removeEventListener("pageshow", handlePageShow);
      document.documentElement.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [hasItems, showPopup, forceShowFromCheckout]);

  const [error, setError] = useState(null);

  async function handleApply() {
    setApplying(true);
    setError(null);
    try {
      const res = await applyDiscountAction("YACASITERMINAS");
      setApplying(false);
      console.log("[EXIT INTENT] applyDiscountAction result:", JSON.stringify(res));
      if (res.ok) {
        setApplied(true);
        setTimeout(() => {
          setVisible(false);
          router.refresh();
        }, 1500);
      } else {
        setError(res.error || "No se pudo aplicar el descuento");
      }
    } catch (err) {
      setApplying(false);
      console.error("[EXIT INTENT] Error:", err);
      setError("Error de conexion. Intenta de nuevo.");
    }
  }

  function handleDismiss() {
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="relative mx-4 w-full max-w-sm bg-[#faf9f7] shadow-2xl overflow-hidden">
        <button
          onClick={handleDismiss}
          className="absolute right-3 top-3 text-white/80 hover:text-white transition-colors z-20"
          aria-label="Cerrar"
        >
          <X size={20} />
        </button>

        <div className="relative h-36 w-full bg-neutral-950">
          <Image
            src="/home/bottle-ignis.png"
            alt="Perfume TRYPHE Ignis"
            fill
            className="object-cover opacity-80"
            sizes="384px"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#faf9f7] via-transparent to-neutral-950/30" />
        </div>

        {!applied ? (
          <div className="px-8 pb-8 -mt-4 relative z-10">
            <p className="text-[9px] font-bold tracking-[0.4em] text-[#a17952] uppercase">
              Oferta especial
            </p>
            <h2 className="mt-3 font-serif text-2xl font-medium text-neutral-950">
              No te vayas!
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-neutral-600">
              Te damos un{" "}
              <strong className="text-neutral-950">5% adicional</strong>{" "}
              para que completes tu compra.
            </p>

            <div className="mt-5 flex items-center gap-3 bg-neutral-50 border border-neutral-200 rounded px-4 py-3">
              <span className="text-lg">🏷️</span>
              <div>
                <p className="text-sm font-semibold text-neutral-950">5% de descuento extra</p>
                <p className="text-[11px] text-neutral-500">Se aplica automaticamente</p>
              </div>
            </div>

            <button
              type="button"
              disabled={applying}
              onClick={handleApply}
              className="mt-6 w-full py-4 bg-neutral-950 text-[10px] font-bold uppercase tracking-[0.25em] text-white transition hover:bg-neutral-800 disabled:opacity-40"
            >
              {applying ? "Aplicando..." : "Aplicar descuento"}
            </button>

            {error && (
              <p className="mt-3 text-xs text-red-500 text-center">{error}</p>
            )}

            <button
              onClick={handleDismiss}
              className="mt-3 w-full text-center text-xs text-neutral-400 hover:text-neutral-600 transition-colors"
            >
              No, gracias
            </button>
          </div>
        ) : (
          <div className="text-center px-8 pb-8 -mt-4 relative z-10">
            <span className="text-3xl">✅</span>
            <h2 className="mt-3 font-serif text-xl font-medium text-neutral-950">
              Descuento aplicado!
            </h2>
            <p className="mt-2 text-sm text-neutral-600">
              Tu 5% extra ya esta en tu carrito.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
