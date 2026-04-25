"use client";

import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { subscribeAction } from "@/app/actions/subscribe";

const LS_KEY = "tryphe_welcome_dismissed";
const DISCOUNT_CODE = "BIENVENIDO5";

export function WelcomePopup() {
  const [visible, setVisible] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (localStorage.getItem(LS_KEY)) return;
    const t = setTimeout(() => setVisible(true), 3000);
    return () => clearTimeout(t);
  }, []);

  function dismiss() {
    setVisible(false);
    localStorage.setItem(LS_KEY, "1");
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const result = await subscribeAction(email);
    setLoading(false);
    if (result.ok) {
      setSubmitted(true);
      localStorage.setItem(LS_KEY, "1");
    } else {
      setError(result.error);
    }
  }

  function copyCode() {
    navigator.clipboard.writeText(DISCOUNT_CODE);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="relative mx-4 w-full max-w-sm bg-[#faf9f7] p-8 shadow-2xl">
        {/* Close */}
        <button
          onClick={dismiss}
          className="absolute right-3 top-3 text-neutral-400 hover:text-neutral-950 transition-colors"
          aria-label="Cerrar"
        >
          <X size={20} />
        </button>

        {!submitted ? (
          <>
            <p className="text-[9px] font-bold tracking-[0.4em] text-neutral-500 uppercase">
              Oferta exclusiva
            </p>
            <h2 className="mt-3 font-serif text-2xl font-medium text-neutral-950">
              Bienvenido a TRYPHÉ
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-neutral-600">
              Suscríbete y obtén{" "}
              <span className="font-semibold text-neutral-950">5% de descuento</span>{" "}
              en tu primera compra.
            </p>

            <form onSubmit={handleSubmit} className="mt-6 space-y-3">
              <input
                type="email"
                required
                placeholder="Tu correo electrónico"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-neutral-300 bg-white px-4 py-3 text-sm text-neutral-950 placeholder:text-neutral-400 focus:border-neutral-950 focus:outline-none transition-colors"
              />
              {error && (
                <p className="text-xs text-red-600">{error}</p>
              )}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-neutral-950 py-3 text-sm font-medium tracking-wide text-[#faf9f7] uppercase transition-colors hover:bg-neutral-800 disabled:opacity-50"
              >
                {loading ? "Enviando..." : "Obtener mi descuento"}
              </button>
            </form>

            <button
              onClick={dismiss}
              className="mt-4 w-full text-center text-xs text-neutral-400 hover:text-neutral-600 transition-colors"
            >
              No, gracias
            </button>
          </>
        ) : (
          <div className="text-center">
            <p className="text-[9px] font-bold tracking-[0.4em] text-neutral-500 uppercase">
              Tu código de descuento
            </p>
            <h2 className="mt-3 font-serif text-2xl font-medium text-neutral-950">
              ¡Gracias!
            </h2>
            <p className="mt-3 text-sm text-neutral-600">
              Usa este código en tu primera compra:
            </p>
            <button
              onClick={copyCode}
              className="mt-4 inline-block border-2 border-dashed border-neutral-950 px-6 py-3 font-mono text-lg font-bold tracking-widest text-neutral-950 transition-colors hover:bg-neutral-950 hover:text-[#faf9f7]"
            >
              {DISCOUNT_CODE}
            </button>
            <p className="mt-2 text-xs text-neutral-400">
              {copied ? "¡Código copiado!" : "Toca para copiar"}
            </p>
            <button
              onClick={dismiss}
              className="mt-6 text-sm font-medium text-neutral-950 underline underline-offset-4 hover:text-neutral-600 transition-colors"
            >
              Cerrar
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
