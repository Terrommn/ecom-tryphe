"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useLayoutEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";
import { ChevronLeft, ChevronRight, Sparkles } from "lucide-react";
import { formatMoney } from "@/lib/money";
import { scoreQuiz } from "@/lib/quiz-recommendation";

const IDENTITY_OPTIONS = [
  "Elegancia discreta",
  "Poder y presencia",
  "Misterio y magnetismo",
  "Naturalidad auténtica",
  "Sofisticación urbana",
  "Innovación y frescura",
];

const EMOTION_OPTIONS = [
  "Sensualidad",
  "Energía y vitalidad",
  "Calma y serenidad",
  "Nostalgia cálida",
  "Confianza absoluta",
  "Curiosidad y asombro",
];

const CONTEXT_OPTIONS = [
  "Oficina / día laboral",
  "Cita o encuentro especial",
  "Noche y celebración",
  "Día a día relajado",
  "Eventos formales",
  "Viajes y escapadas",
];

const INTENSITY_OPTIONS = [
  "Sutil, casi una segunda piel",
  "Moderada, perceptible sin dominar",
  "Marcada, que deje huella",
  "Intensa, parte de tu firma",
];

const PRESENCE_OPTIONS = [
  "Que me acompañe sin anunciarse",
  "Que se note cuando alguien se acerca",
  "Que proyecte sin esfuerzo",
  "Que sea recordada después de irme",
];

const INITIAL = {
  identity: /** @type {string[]} */ ([]),
  impression: "",
  emotion: "",
  contexts: /** @type {string[]} */ ([]),
  intensity: "",
  presence: "",
  inspiration: "",
  olfactive: "",
  avoid: "",
  ideal: "",
};

const MOOD_CHIPS = ["Exitoso", "Conquistador", "Atractivo"];

/**
 * @param {object} props
 * @param {{ handle: string, title: string, href: string, imageUrl: string|null, imageAlt: string, priceAmount: string|null, priceCurrency: string, tags: string[] }[]} props.products
 * @param {'page' | 'embedded'} [props.variant]
 */
export function PerfumeDiscoveryQuiz({ products = [], variant = "page" }) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState(INITIAL);
  const stepRef = useRef(null);
  const resultRef = useRef(null);
  const reducedMotion = useReducedMotion();

  const recommended = useMemo(
    () => scoreQuiz(answers, products),
    [answers, products],
  );

  const duration = reducedMotion ? 0.01 : 0.35;

  useLayoutEffect(() => {
    const el = stepRef.current;
    if (!el || step === 4) return;
    if (reducedMotion) {
      gsap.set(el, { opacity: 1, y: 0 });
      return;
    }
    gsap.fromTo(
      el,
      { opacity: 0, y: 14 },
      { opacity: 1, y: 0, duration, ease: "power2.out" },
    );
  }, [step, duration, reducedMotion]);

  useLayoutEffect(() => {
    if (step !== 4) return;
    const el = resultRef.current;
    if (!el) return;
    if (reducedMotion) {
      gsap.set(el, { opacity: 1, y: 0 });
      return;
    }
    gsap.fromTo(
      el,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" },
    );
  }, [step, recommended, reducedMotion]);

  const toggleMulti = useCallback((field, value) => {
    setAnswers((a) => {
      const arr = a[field];
      const next = Array.isArray(arr) ? [...arr] : [];
      const i = next.indexOf(value);
      if (i >= 0) next.splice(i, 1);
      else next.push(value);
      return { ...a, [field]: next };
    });
  }, []);

  const canAdvance = useMemo(() => {
    if (step === 0) return answers.identity.length > 0;
    if (step === 1) return Boolean(answers.emotion?.trim());
    if (step === 2) {
      return (
        answers.contexts.length > 0 &&
        Boolean(answers.intensity) &&
        Boolean(answers.presence)
      );
    }
    if (step === 3) return Boolean(answers.ideal?.trim());
    return true;
  }, [step, answers]);

  const goNext = () => {
    if (step < 4 && canAdvance) setStep((s) => s + 1);
  };

  const goBack = () => setStep((s) => Math.max(0, s - 1));

  const restart = () => {
    setAnswers(INITIAL);
    setStep(0);
  };

  const totalSteps = 4;
  const embedded = variant === "embedded";

  return (
    <div
      className={
        embedded
          ? "mx-auto w-full max-w-3xl pb-16 md:max-w-4xl"
          : "mx-auto max-w-2xl px-4 py-10 pb-24"
      }
    >
      {embedded ? (
        <div className="mb-12 rounded-2xl border border-[#c9a227]/20 border-t-[3px] border-t-[#c9a227] bg-[#1a1816] p-8 shadow-[0_20px_40px_-12px_rgba(0,0,0,0.35)] md:p-10">
          <div className="mx-auto max-w-lg text-center">
            <p className="text-[10px] font-bold uppercase tracking-[0.45em] text-[#c9a227]">
              Encuentra tu aroma
            </p>
            <h2 className="mt-4 font-serif text-[clamp(1.5rem,4vw,2.25rem)] font-medium leading-tight tracking-tight text-[#f4f1ec]">
              ¿Cómo te quieres sentir hoy?
            </h2>
            <p className="mt-3 text-sm text-[#a8a29e]">
              Tres palabras para orientar tu recomendación.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
              {MOOD_CHIPS.map((m) => (
                <span
                  key={m}
                  className="rounded-full border border-[#f4f1ec]/15 bg-[#f4f1ec]/5 px-4 py-2 text-[10px] font-bold tracking-[0.2em] text-[#e8e4df] uppercase backdrop-blur-sm"
                >
                  {m}
                </span>
              ))}
            </div>
            <p className="mt-8 text-xs leading-relaxed text-[#78716c]">
              Proyección y emoción, no lista de notas. Respuestas solo en tu navegador.
            </p>
          </div>
        </div>
      ) : (
        <div className="mb-8 text-center">
          <p className="text-[10px] font-bold uppercase tracking-[0.35em] text-stone-500">
            Tryphé · Descubrimiento sensorial
          </p>
          <h1 className="mt-3 font-serif text-3xl font-medium tracking-tight text-stone-900 md:text-4xl">
            Encuentra tu aroma
          </h1>
          <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-stone-600">
            No se trata de &ldquo;qué olor te gusta&rdquo;, sino de proyección, sensación y emoción.
            Responde con honestidad; no guardamos tus respuestas.
          </p>
        </div>
      )}

      <div
        className={
          embedded
            ? "mt-1 rounded-xl border border-neutral-200/90 bg-white p-5 shadow-[0_4px_28px_rgba(0,0,0,0.06)] md:p-8"
            : "contents"
        }
      >
      {step < 4 ? (
        <div
          className={`mb-6 flex items-center justify-between text-[10px] font-bold uppercase tracking-widest ${
            embedded ? "text-[#78716c]" : "text-stone-400"
          }`}
          aria-hidden
        >
          <span>
            Paso {step + 1} / {totalSteps}
          </span>
          <div className="flex gap-1">
            {Array.from({ length: totalSteps }, (_, i) => (
              <span
                key={i}
                className={`h-1 w-8 rounded-full ${
                  embedded
                    ? i <= step
                      ? "bg-[#c9a227]"
                      : "bg-[#44403c]"
                    : i <= step
                      ? "bg-stone-800"
                      : "bg-stone-200"
                }`}
              />
            ))}
          </div>
        </div>
      ) : null}

      {step === 0 ? (
        <section ref={stepRef} className="quiz-step space-y-6">
          <fieldset>
            <legend className="mb-3 text-sm font-medium text-stone-800">
              1. ¿Qué idea quieres proyectar? (elige una o varias)
            </legend>
            <div className="grid gap-2 sm:grid-cols-2">
              {IDENTITY_OPTIONS.map((opt) => (
                <label
                  key={opt}
                  className={`flex cursor-pointer items-center gap-3 rounded border px-3 py-2 text-sm transition-colors ${
                    answers.identity.includes(opt)
                      ? "border-stone-900 bg-stone-50"
                      : "border-stone-200 hover:border-stone-400"
                  }`}
                >
                  <input
                    type="checkbox"
                    className="h-4 w-4 rounded border-stone-400"
                    checked={answers.identity.includes(opt)}
                    onChange={() => toggleMulti("identity", opt)}
                  />
                  {opt}
                </label>
              ))}
            </div>
          </fieldset>
        </section>
      ) : null}

      {step === 1 ? (
        <section ref={stepRef} className="quiz-step space-y-8">
          <div>
            <label htmlFor="impression" className="mb-2 block text-sm font-medium text-stone-800">
              2. ¿Qué te gustaría que piensen la primera vez que te perciben?
            </label>
            <textarea
              id="impression"
              rows={3}
              value={answers.impression}
              onChange={(e) =>
                setAnswers((a) => ({ ...a, impression: e.target.value }))
              }
              className="w-full rounded border border-stone-200 bg-white px-3 py-2 text-sm outline-none ring-stone-400 focus:ring-2"
              placeholder="Una frase o unas palabras bastan."
            />
          </div>
          <fieldset>
            <legend className="mb-3 text-sm font-medium text-stone-800">
              3. ¿Qué emoción quieres que evoque tu fragancia?
            </legend>
            <div className="grid gap-2 sm:grid-cols-2">
              {EMOTION_OPTIONS.map((opt) => (
                <label
                  key={opt}
                  className={`flex cursor-pointer items-center gap-3 rounded border px-3 py-2 text-sm ${
                    answers.emotion === opt
                      ? "border-stone-900 bg-stone-50"
                      : "border-stone-200 hover:border-stone-400"
                  }`}
                >
                  <input
                    type="radio"
                    name="emotion"
                    className="h-4 w-4 border-stone-400"
                    checked={answers.emotion === opt}
                    onChange={() => setAnswers((a) => ({ ...a, emotion: opt }))}
                  />
                  {opt}
                </label>
              ))}
            </div>
          </fieldset>
        </section>
      ) : null}

      {step === 2 ? (
        <section ref={stepRef} className="quiz-step space-y-8">
          <fieldset>
            <legend className="mb-3 text-sm font-medium text-stone-800">
              4. ¿En qué contextos te imaginas usando esta fragancia?
            </legend>
            <div className="grid gap-2 sm:grid-cols-2">
              {CONTEXT_OPTIONS.map((opt) => (
                <label
                  key={opt}
                  className={`flex cursor-pointer items-center gap-3 rounded border px-3 py-2 text-sm ${
                    answers.contexts.includes(opt)
                      ? "border-stone-900 bg-stone-50"
                      : "border-stone-200 hover:border-stone-400"
                  }`}
                >
                  <input
                    type="checkbox"
                    className="h-4 w-4 rounded border-stone-400"
                    checked={answers.contexts.includes(opt)}
                    onChange={() => toggleMulti("contexts", opt)}
                  />
                  {opt}
                </label>
              ))}
            </div>
          </fieldset>
          <fieldset>
            <legend className="mb-3 text-sm font-medium text-stone-800">
              5. ¿Qué intensidad buscas?
            </legend>
            <div className="space-y-2">
              {INTENSITY_OPTIONS.map((opt) => (
                <label
                  key={opt}
                  className={`flex cursor-pointer items-center gap-3 rounded border px-3 py-2 text-sm ${
                    answers.intensity === opt
                      ? "border-stone-900 bg-stone-50"
                      : "border-stone-200 hover:border-stone-400"
                  }`}
                >
                  <input
                    type="radio"
                    name="intensity"
                    className="h-4 w-4 border-stone-400"
                    checked={answers.intensity === opt}
                    onChange={() => setAnswers((a) => ({ ...a, intensity: opt }))}
                  />
                  {opt}
                </label>
              ))}
            </div>
          </fieldset>
          <fieldset>
            <legend className="mb-3 text-sm font-medium text-stone-800">
              6. ¿Cómo quieres sentir tu presencia olfativa?
            </legend>
            <div className="space-y-2">
              {PRESENCE_OPTIONS.map((opt) => (
                <label
                  key={opt}
                  className={`flex cursor-pointer items-center gap-3 rounded border px-3 py-2 text-sm ${
                    answers.presence === opt
                      ? "border-stone-900 bg-stone-50"
                      : "border-stone-200 hover:border-stone-400"
                  }`}
                >
                  <input
                    type="radio"
                    name="presence"
                    className="h-4 w-4 border-stone-400"
                    checked={answers.presence === opt}
                    onChange={() => setAnswers((a) => ({ ...a, presence: opt }))}
                  />
                  {opt}
                </label>
              ))}
            </div>
          </fieldset>
        </section>
      ) : null}

      {step === 3 ? (
        <section ref={stepRef} className="quiz-step space-y-6">
          <div>
            <label htmlFor="inspiration" className="mb-2 block text-sm font-medium text-stone-800">
              7. Una persona, lugar o recuerdo que te inspire…
            </label>
            <textarea
              id="inspiration"
              rows={2}
              value={answers.inspiration}
              onChange={(e) =>
                setAnswers((a) => ({ ...a, inspiration: e.target.value }))
              }
              className="w-full rounded border border-stone-200 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-stone-400"
            />
          </div>
          <div>
            <label htmlFor="olfactive" className="mb-2 block text-sm font-medium text-stone-800">
              8. Si pudieras describirlo en tres palabras olfativas…
            </label>
            <input
              id="olfactive"
              type="text"
              value={answers.olfactive}
              onChange={(e) =>
                setAnswers((a) => ({ ...a, olfactive: e.target.value }))
              }
              className="w-full rounded border border-stone-200 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-stone-400"
            />
          </div>
          <div>
            <label htmlFor="avoid" className="mb-2 block text-sm font-medium text-stone-800">
              9. ¿Qué te molesta en otros perfumes? (opcional)
            </label>
            <textarea
              id="avoid"
              rows={2}
              value={answers.avoid}
              onChange={(e) => setAnswers((a) => ({ ...a, avoid: e.target.value }))}
              className="w-full rounded border border-stone-200 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-stone-400"
            />
          </div>
          <div>
            <label htmlFor="ideal" className="mb-2 block text-sm font-medium text-stone-800">
              10. Describe tu fragancia ideal en una frase.
            </label>
            <textarea
              id="ideal"
              rows={3}
              value={answers.ideal}
              onChange={(e) => setAnswers((a) => ({ ...a, ideal: e.target.value }))}
              className="w-full rounded border border-stone-200 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-stone-400"
              placeholder="La frase que cerraría este retrato."
            />
          </div>
        </section>
      ) : null}

      {step === 4 && recommended ? (
        <section
          ref={resultRef}
          className={
            embedded
              ? "rounded-2xl border border-[#c9a227]/25 bg-[#faf9f7] p-6 shadow-sm md:p-8"
              : "rounded-2xl border border-stone-200 bg-stone-50/80 p-6 shadow-sm md:p-8"
          }
        >
          <div
            className={`flex items-center gap-2 ${embedded ? "text-[#1a1816]" : "text-stone-800"}`}
          >
            <Sparkles
              className={`h-5 w-5 shrink-0 ${embedded ? "text-[#c9a227]" : ""}`}
              aria-hidden
            />
            <h2 className="font-serif text-2xl font-medium tracking-tight">
              Tu recomendación
            </h2>
          </div>
          <p className={`mt-2 text-sm ${embedded ? "text-neutral-600" : "text-stone-600"}`}>
            Según lo que proyectas y lo que buscas sentir, este acorde encaja con tu retrato.
          </p>

          <div className="mt-6 flex flex-col gap-6 sm:flex-row sm:items-start">
            <div className="relative mx-auto aspect-[3/4] w-full max-w-[200px] shrink-0 overflow-hidden rounded-lg bg-stone-200 sm:mx-0">
              {recommended.imageUrl ? (
                <Image
                  src={recommended.imageUrl}
                  alt={recommended.imageAlt}
                  fill
                  className="object-cover"
                  sizes="200px"
                />
              ) : (
                <div className="flex h-full items-center justify-center p-4 text-center text-xs text-stone-500">
                  Sin imagen
                </div>
              )}
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="text-lg font-semibold uppercase tracking-wide text-stone-900">
                {recommended.title}
              </h3>
              {recommended.priceAmount ? (
                <p className="mt-1 text-base text-stone-700">
                  {formatMoney(recommended.priceAmount, recommended.priceCurrency)}
                </p>
              ) : null}
              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  href={recommended.href}
                  className="inline-flex items-center justify-center rounded bg-stone-900 px-5 py-2.5 text-xs font-bold uppercase tracking-widest text-white transition hover:bg-stone-800"
                >
                  Ver producto
                </Link>
                <Link
                  href="/collections"
                  className="inline-flex items-center justify-center rounded border border-stone-300 bg-white px-5 py-2.5 text-xs font-bold uppercase tracking-widest text-stone-800 transition hover:bg-stone-50"
                >
                  Explorar colecciones
                </Link>
              </div>
              <button
                type="button"
                onClick={restart}
                className="mt-6 text-[11px] font-medium uppercase tracking-widest text-stone-500 underline-offset-4 hover:underline"
              >
                Hacer el cuestionario de nuevo
              </button>
            </div>
          </div>
        </section>
      ) : null}

      {step === 4 && !recommended && products.length === 0 ? (
        <p className="rounded border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-950">
          No hay productos en catálogo para recomendar. Conecta Shopify o añade productos en el
          admin.
        </p>
      ) : null}

      {step < 4 ? (
        <div className="mt-10 flex items-center justify-between gap-4 border-t border-stone-200 pt-6">
          <button
            type="button"
            onClick={goBack}
            disabled={step === 0}
            className="inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-widest text-stone-600 disabled:opacity-30"
          >
            <ChevronLeft className="h-4 w-4" aria-hidden />
            Atrás
          </button>
          <button
            type="button"
            onClick={goNext}
            disabled={!canAdvance}
            className={`inline-flex items-center gap-1 rounded px-5 py-2.5 text-[11px] font-bold uppercase tracking-widest text-white disabled:opacity-40 ${
              embedded
                ? "bg-[#1a1816] hover:bg-[#2a2624]"
                : "bg-stone-900 hover:bg-stone-800"
            }`}
          >
            {step === 3 ? "Ver recomendación" : "Siguiente"}
            <ChevronRight className="h-4 w-4" aria-hidden />
          </button>
        </div>
      ) : null}
      </div>
    </div>
  );
}

function useReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useLayoutEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const fn = () => setReduced(mq.matches);
    mq.addEventListener("change", fn);
    return () => mq.removeEventListener("change", fn);
  }, []);
  return reduced;
}
