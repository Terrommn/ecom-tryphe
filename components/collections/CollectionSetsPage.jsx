"use client";

import Link from "next/link";
import { useState } from "react";

const INSPIRATIONS = {
  MAGNA: "Baccarat Rouge 540",
  ETERNA: "La Vie Est Belle",
  SANTOR: "Santal 33",
  AZUR: "Polo Blue",
  VALIANT: "212 Men",
  ELAN: "Le Male",
  SOLARE: "Light Blue",
  ELYSSE: "Ralph",
  ASTER: "Burberry Her",
  VICTORIUM: "Invictus",
  ALVUS: "Lacoste White",
};

const COLLECTIONS = {
  "100ml": [
    {
      id: "lujo-inteligente-100",
      name: "Lujo Inteligente",
      price: 1199,
      compareAt: 1298,
      headline: "No gastas más... eliges mejor",
      subheadline:
        "Dos fragancias que representan el equilibrio entre estatus, criterio y percepción.",
      includes: ["MAGNA", "SANTOR"],
      usage: [
        { occasion: "Impacto", fragrance: "MAGNA" },
        { occasion: "Presencia constante", fragrance: "SANTOR" },
      ],
      cta: "Quiero elegir mejor",
      badge: null,
      shopifyHandle: "lujo-inteligente-100-ml",
    },
    {
      id: "presencia-impecable-100",
      name: "Presencia Impecable",
      price: 1749,
      compareAt: 1947,
      headline: "Domina cualquier entorno sin decir una palabra",
      subheadline:
        "Tres fragancias diseñadas para proyectar seguridad, elegancia y control en cada momento del día.",
      includes: ["AZUR", "SANTOR", "VALIANT"],
      usage: [
        { occasion: "Día / trabajo", fragrance: "AZUR" },
        { occasion: "Interacciones clave", fragrance: "SANTOR" },
        { occasion: "Social / after", fragrance: "VALIANT" },
      ],
      cta: "Quiero proyectar presencia",
      badge: null,
      shopifyHandle: "presencia-impecable-100-ml",
    },
    {
      id: "atraccion-silenciosa-100",
      name: "Atracción Silenciosa",
      price: 1799,
      compareAt: 1947,
      headline: "No persigues atención... la provocas",
      subheadline:
        "Una combinación diseñada para generar interés, conexión y magnetismo sin esfuerzo.",
      includes: ["MAGNA", "ETERNA", "SANTOR"],
      usage: [
        { occasion: "Primera impresión", fragrance: "MAGNA" },
        { occasion: "Cercanía / citas", fragrance: "ETERNA" },
        { occasion: "Momentos clave", fragrance: "SANTOR" },
      ],
      cta: "Quiero provocar atracción",
      badge: "Más elegido",
      featured: true,
      shopifyHandle: "atraccion-silenciosa-100-ml",
    },
    {
      id: "nivel-superior-100",
      name: "Nivel Superior",
      price: 1849,
      compareAt: 1947,
      headline: 'El salto de "normal" a "otro nivel"',
      subheadline:
        "Tres perfiles diseñados para elevar tu percepción y proyectar estatus desde el primer momento.",
      includes: ["MAGNA", "SANTOR", "AZUR"],
      usage: [
        { occasion: "Impacto / eventos", fragrance: "MAGNA" },
        { occasion: "Presencia refinada", fragrance: "SANTOR" },
        { occasion: "Uso diario", fragrance: "AZUR" },
      ],
      cta: "Quiero subir de nivel",
      badge: null,
      shopifyHandle: "nivel-superior-100-ml",
    },
    {
      id: "impacto-inmediato-100",
      name: "Impacto Inmediato",
      price: 1149,
      compareAt: 1298,
      headline: "Desde el primer momento... se nota",
      subheadline:
        "Una combinación diseñada para generar impresión, presencia y atención instantánea.",
      includes: ["MAGNA", "AZUR"],
      usage: [
        { occasion: "Primera impresión", fragrance: "MAGNA" },
        { occasion: "Uso diario", fragrance: "AZUR" },
      ],
      cta: "Quiero causar impacto",
      badge: null,
      shopifyHandle: "impacto-inmediato-100-ml",
    },
  ],
  "60ml": [
    {
      id: "impacto-inmediato-60",
      name: "Impacto Inmediato",
      price: 849,
      compareAt: 998,
      headline: "Desde el primer momento... se nota",
      subheadline:
        "Una combinación diseñada para generar impresión, presencia y atención instantánea.",
      includes: ["MAGNA", "AZUR"],
      usage: [
        { occasion: "Primera impresión", fragrance: "MAGNA" },
        { occasion: "Uso diario", fragrance: "AZUR" },
      ],
      cta: "Quiero causar impacto",
      badge: "Empieza aquí",
      featured: true,
      shopifyHandle: "impacto-inmediato-60-ml",
    },
    {
      id: "lujo-inteligente-60",
      name: "Lujo Inteligente",
      price: 899,
      compareAt: 998,
      headline: "No gastas más... eliges mejor",
      subheadline:
        "Dos fragancias que representan el equilibrio entre estatus, criterio y percepción.",
      includes: ["MAGNA", "SANTOR"],
      usage: [
        { occasion: "Impacto", fragrance: "MAGNA" },
        { occasion: "Presencia constante", fragrance: "SANTOR" },
      ],
      cta: "Quiero elegir mejor",
      badge: null,
      shopifyHandle: "lujo-inteligente-60-ml",
    },
    {
      id: "presencia-impecable-60",
      name: "Presencia Impecable",
      price: 1349,
      compareAt: 1497,
      headline: "Domina cualquier entorno sin decir una palabra",
      subheadline:
        "Tres fragancias diseñadas para proyectar seguridad, elegancia y control en cada momento del día.",
      includes: ["AZUR", "SANTOR", "VALIANT"],
      usage: [
        { occasion: "Día / trabajo", fragrance: "AZUR" },
        { occasion: "Interacciones clave", fragrance: "SANTOR" },
        { occasion: "Social / after", fragrance: "VALIANT" },
      ],
      cta: "Quiero proyectar presencia",
      badge: null,
      shopifyHandle: "presencia-impecable-60-ml",
    },
    {
      id: "atraccion-silenciosa-60",
      name: "Atracción Silenciosa",
      price: 1399,
      compareAt: 1497,
      headline: "No persigues atención... la provocas",
      subheadline:
        "Una combinación diseñada para generar interés, conexión y magnetismo sin esfuerzo.",
      includes: ["MAGNA", "ETERNA", "SANTOR"],
      usage: [
        { occasion: "Primera impresión", fragrance: "MAGNA" },
        { occasion: "Cercanía / citas", fragrance: "ETERNA" },
        { occasion: "Momentos clave", fragrance: "SANTOR" },
      ],
      cta: "Quiero provocar atracción",
      badge: null,
      shopifyHandle: "atraccion-silenciosa-60-ml",
    },
    {
      id: "nivel-superior-60",
      name: "Nivel Superior",
      price: 1449,
      compareAt: 1497,
      headline: 'El salto de "normal" a "otro nivel"',
      subheadline:
        "Tres perfiles diseñados para elevar tu percepción y proyectar estatus desde el primer momento.",
      includes: ["MAGNA", "SANTOR", "AZUR"],
      usage: [
        { occasion: "Impacto / eventos", fragrance: "MAGNA" },
        { occasion: "Presencia refinada", fragrance: "SANTOR" },
        { occasion: "Uso diario", fragrance: "AZUR" },
      ],
      cta: "Quiero subir de nivel",
      badge: null,
      shopifyHandle: "nivel-superior-60-ml",
    },
  ],
};

function formatPrice(amount) {
  return new Intl.NumberFormat("es-MX", {
    style: "currency",
    currency: "MXN",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

function CollectionCard({ collection }) {
  const isFeatured = collection.featured;
  return (
    <div
      className={`group relative flex flex-col border transition-all duration-500 ${
        isFeatured
          ? "border-[#a17952]/40 bg-[#faf9f7] shadow-lg ring-1 ring-[#a17952]/10 md:scale-[1.02]"
          : "border-neutral-200 bg-white hover:border-neutral-300 hover:shadow-md"
      }`}
    >
      {collection.badge && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10">
          <span className="inline-block bg-[#a17952] px-4 py-1 text-[10px] font-bold tracking-[0.3em] uppercase text-white">
            {collection.badge}
          </span>
        </div>
      )}

      <div className="flex flex-1 flex-col p-6 pt-8 md:p-8 md:pt-10">
        {/* Name */}
        <h3 className="font-serif text-2xl font-medium tracking-tight text-neutral-950 md:text-3xl">
          {collection.name}
        </h3>

        {/* Headline */}
        <p className="mt-3 font-serif text-lg italic text-neutral-700 leading-snug">
          {collection.headline}
        </p>

        {/* Subheadline */}
        <p className="mt-3 text-sm text-neutral-500 leading-relaxed">
          {collection.subheadline}
        </p>

        {/* Includes */}
        <div className="mt-6">
          <p className="text-[10px] font-bold tracking-[0.4em] uppercase text-neutral-400 mb-2">
            Incluye
          </p>
          <p className="text-sm font-medium text-neutral-800 tracking-wide">
            {collection.includes
              .map((name) =>
                INSPIRATIONS[name]
                  ? `${name} (insp. ${INSPIRATIONS[name]})`
                  : name
              )
              .join(" · ")}
          </p>
        </div>

        {/* Usage */}
        <div className="mt-5">
          <p className="text-[10px] font-bold tracking-[0.4em] uppercase text-neutral-400 mb-3">
            Uso recomendado
          </p>
          <div className="space-y-1.5">
            {collection.usage.map((u) => (
              <div
                key={u.occasion}
                className="flex items-center justify-between text-sm"
              >
                <span className="text-neutral-500">{u.occasion}</span>
                <span className="font-medium text-neutral-800">
                  {u.fragrance}
                  {INSPIRATIONS[u.fragrance] && (
                    <span className="font-normal text-neutral-400 text-xs ml-1">
                      (insp. {INSPIRATIONS[u.fragrance]})
                    </span>
                  )}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Spacer */}
        <div className="flex-1" />

        {/* Price */}
        <div className="mt-8 flex items-baseline gap-3">
          <span className="font-serif text-2xl font-medium text-neutral-950">
            {formatPrice(collection.price)}
          </span>
          <span className="text-sm text-neutral-400 line-through">
            {formatPrice(collection.compareAt)}
          </span>
        </div>

        {/* CTA */}
        <Link
          href={`/products/${collection.shopifyHandle}`}
          className={`mt-5 block w-full py-3.5 text-center text-sm font-bold tracking-[0.15em] uppercase transition-all duration-300 ${
            isFeatured
              ? "bg-neutral-950 text-[#faf9f7] hover:bg-neutral-800"
              : "border border-neutral-950 text-neutral-950 hover:bg-neutral-950 hover:text-[#faf9f7]"
          }`}
        >
          {collection.cta}
        </Link>
      </div>
    </div>
  );
}

const TABS = [
  { key: "100ml", label: "100 ml" },
  { key: "60ml", label: "60 ml" },
];

export function CollectionSetsPage() {
  const [activeTab, setActiveTab] = useState("100ml");
  const items = COLLECTIONS[activeTab];

  return (
    <div className="bg-[#faf9f7]">
      {/* Hero */}
      <section className="relative overflow-hidden bg-neutral-950 py-24 md:py-32">
        <div className="absolute inset-0 bg-gradient-to-b from-neutral-950/90 to-neutral-950" />
        <div className="relative mx-auto max-w-screen-xl px-4 text-center md:px-10">
          <p
            className="text-[10px] font-bold tracking-[0.6em] uppercase text-[#a17952]"
            data-gsap="fade-up"
          >
            Collections
          </p>
          <h1
            className="mx-auto mt-6 max-w-3xl font-serif text-3xl font-medium leading-tight text-[#faf9f7] md:text-5xl lg:text-6xl"
            data-gsap="fade-up"
          >
            No eliges un perfume...
            <br />
            <em className="italic text-[#faf9f7]/70">
              eliges cómo quieres ser percibido.
            </em>
          </h1>
          <p
            className="mx-auto mt-6 max-w-xl text-base text-neutral-400 leading-relaxed md:text-lg"
            data-gsap="fade-up"
          >
            Cada Collection representa una intención distinta: presencia,
            atracción, estatus, impacto.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="mx-auto max-w-screen-xl px-4 py-16 md:px-10 md:py-24">
        {/* Size description */}
        <div className="mb-10 text-center" data-gsap="fade-up">
          <p className="text-sm text-neutral-500 leading-relaxed max-w-2xl mx-auto">
            {activeTab === "100ml"
              ? "Aspiración, percepción premium y la experiencia completa de cada fragancia."
              : "Tu entrada a la marca. Menor fricción, misma intención."}
          </p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center mb-14" data-gsap="fade-up">
          <div className="inline-flex border border-neutral-300 bg-white">
            {TABS.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`px-8 py-3 text-xs font-bold tracking-[0.3em] uppercase transition-all duration-300 ${
                  activeTab === tab.key
                    ? "bg-neutral-950 text-[#faf9f7]"
                    : "text-neutral-500 hover:text-neutral-950"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {items.map((col) => (
            <CollectionCard key={col.id} collection={col} />
          ))}
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="bg-neutral-950 py-20 md:py-28">
        <div className="mx-auto max-w-screen-md px-4 text-center md:px-10">
          <p
            className="text-[10px] font-bold tracking-[0.5em] uppercase text-[#a17952]"
            data-gsap="fade-up"
          >
            Tryphé
          </p>
          <h2
            className="mt-5 font-serif text-2xl font-medium text-[#faf9f7] md:text-4xl"
            data-gsap="fade-up"
          >
            No vendemos perfumes.
            <br />
            Vendemos percepción.
          </h2>
          <Link
            href="/collections"
            className="mt-10 inline-block border border-[#faf9f7]/30 px-10 py-4 text-xs font-bold tracking-[0.3em] uppercase text-[#faf9f7] transition-all duration-300 hover:bg-[#faf9f7] hover:text-neutral-950"
            data-gsap="fade-up"
          >
            Explorar todas las fragancias
          </Link>
        </div>
      </section>
    </div>
  );
}
