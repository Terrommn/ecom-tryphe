"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useRef } from "react";
import { Play, ChevronLeft, ChevronRight } from "lucide-react";
import { formatMoney } from "@/lib/money";
import { TrypheMarketingChrome } from "@/components/home/TrypheMarketingChrome";
import { PerfumeDiscoveryQuiz } from "@/components/quiz/PerfumeDiscoveryQuiz";

const siteName = process.env.NEXT_PUBLIC_SITE_NAME?.trim() || "Tryphe";
const tagline = process.env.NEXT_PUBLIC_SITE_TAGLINE?.trim() || "RAW -- ESENCIAL";

/** Fotos editoriales propias (public/home/). */
const IMG_DUO_CITY = "/home/hero-duo-city.png";
const IMG_DUO_URBAN = "/home/hero-duo-urban.png";

const HERO_EDITORIAL_SRC = IMG_DUO_CITY;

const COLLECTION_IMAGE_FALLBACK = [
  IMG_DUO_CITY,
  IMG_DUO_URBAN,
  IMG_DUO_CITY,
  IMG_DUO_URBAN,
];

const CELEBRITY_PLACEHOLDERS = [
  {
    quote: "<<Una firma que entiende el lujo sin el ruido.>>",
    source: "Revista -- proximamente",
    image: IMG_DUO_CITY,
  },
  {
    quote: "<<La promesa es clara: emocion antes que notas.>>",
    source: "Columna de estilo",
    image: IMG_DUO_URBAN,
  },
  {
    quote: "<<El empaque ya es un regalo en si mismo.>>",
    source: "Editorial belleza",
    image: IMG_DUO_CITY,
  },
  {
    quote: "<<Tryphe apuesta por la proyeccion, no por el cliche.>>",
    source: "Prensa digital",
    image: IMG_DUO_URBAN,
  },
];

const UGC_CITIES = [
  {
    city: "Monterrey",
    label: "N.L.",
    image: IMG_DUO_CITY,
  },
  {
    city: "Ciudad de Mexico",
    label: "CDMX",
    image: IMG_DUO_URBAN,
  },
  {
    city: "Guadalajara",
    label: "Jal.",
    image: IMG_DUO_CITY,
  },
];

/**
 * @param {object} props
 * @param {boolean} props.shopConfigured
 * @param {{ label: string, href: string }[]} props.navLinks
 * @param {{ handle: string, title: string, imageUrl: string|null, imageAlt: string }[]} props.featuredCollections
 * @param {{ handle: string, title: string, href: string, imageUrl: string|null, imageAlt: string, priceAmount: string|null, priceCurrency: string }[]} props.products
 * @param {{ handle: string, title: string, href: string, imageUrl: string|null, imageAlt: string, priceAmount: string|null, priceCurrency: string, tags: string[] }[]} props.quizProducts
 */
export function TrypheLanding({
  shopConfigured = false,
  navLinks = [],
  featuredCollections = [],
  products = [],
  quizProducts = [],
}) {
  const celebScrollRef = useRef(null);

  const heroImageUrl = HERO_EDITORIAL_SRC;

  const featuredTiles = useMemo(() => {
    const labels = [
      "Perfumes para El",
      "Perfumes para Ella",
      "Los mas vendidos",
      "Sets de regalo",
    ];
    return featuredCollections.map((c, i) => ({
      ...c,
      label: labels[i] ?? c.title,
    }));
  }, [featuredCollections]);

  const scrollCeleb = (dir) => {
    const el = celebScrollRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * 340, behavior: "smooth" });
  };

  return (
    <TrypheMarketingChrome navLinks={navLinks} shopConfigured={shopConfigured}>
      {/* 1.1 Hero -- editorial split */}
      <section className="grid min-h-[min(88vh,920px)] md:grid-cols-2">
        <div className="relative min-h-[42vh] overflow-hidden md:min-h-0" data-gsap="zoom-out">
          <Image
            src={heroImageUrl}
            alt="Pareja con estilo en calle urbana -- estetica editorial Tryphe"
            fill
            className="object-cover object-[center_25%]"
            sizes="(max-width:768px) 100vw, 50vw"
            priority
          />
        </div>
        <div
          className="flex flex-col justify-center border-neutral-950/10 bg-[#faf9f7] px-6 py-14 md:border-l md:px-12 lg:px-16 xl:px-20"
          data-gsap="fade-up"
          data-gsap-stagger="0.12"
        >
          <p className="text-[9px] font-bold tracking-[0.45em] text-neutral-500 uppercase">
            Estetica olfativa
          </p>
          <h2 className="mt-6 font-serif text-[clamp(2rem,5vw,3.75rem)] font-medium leading-[1.05] tracking-tight text-neutral-950">
            Huele al exito que mereces
          </h2>
          <p className="mt-8 max-w-md text-sm leading-[1.75] text-neutral-600 md:text-base">
            Inspiracion cercana a laboratorios de nicho: silencio, materia e intencion. Tu fragancia
            como firma -- no como adorno.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              href="/#encuentra-tu-aroma"
              className="inline-flex min-h-[48px] items-center justify-center border border-neutral-950 bg-neutral-950 px-10 text-[10px] font-bold tracking-[0.25em] text-[#faf9f7] uppercase transition hover:bg-neutral-800"
            >
              Encuentra tu Aroma
            </Link>
            <Link
              href="/collections"
              className="inline-flex min-h-[48px] items-center justify-center border border-neutral-950 px-10 text-[10px] font-bold tracking-[0.25em] text-neutral-950 uppercase transition hover:bg-neutral-950 hover:text-[#faf9f7]"
            >
              Catalogo
            </Link>
          </div>
        </div>
      </section>

      {/* 1.2 Quiz interactivo */}
      <section
        id="encuentra-tu-aroma"
        className="scroll-mt-28 border-y border-neutral-950/10 bg-[#faf9f7]"
      >
        <div className="mx-auto max-w-5xl px-4 py-12 md:px-8 md:py-16" data-gsap="fade-up">
          <PerfumeDiscoveryQuiz products={quizProducts} variant="embedded" />
        </div>
      </section>

      {/* 1.3 Colecciones destacadas */}
      {featuredTiles.length > 0 ? (
        <section className="bg-[#faf9f7] py-16 md:py-24">
          <div className="mx-auto max-w-screen-2xl px-4 md:px-10">
            <div className="mb-12 text-center md:mb-16" data-gsap="fade-up">
              <p className="text-[9px] font-bold tracking-[0.4em] text-neutral-500 uppercase">
                Colecciones destacadas
              </p>
              <h3 className="mt-4 font-serif text-3xl font-medium text-neutral-950 md:text-4xl">
                El catalogo en cuatro entradas
              </h3>
            </div>
            <div
              className="grid grid-cols-2 gap-px bg-neutral-950/10 md:grid-cols-4"
              data-gsap="scale-in"
              data-gsap-stagger="0.1"
            >
              {featuredTiles.map((c, idx) => {
                const fallback =
                  COLLECTION_IMAGE_FALLBACK[idx % COLLECTION_IMAGE_FALLBACK.length];
                const imgSrc = c.imageUrl || fallback;
                return (
                <Link
                  key={c.handle}
                  href={`/collections/${encodeURIComponent(c.handle)}`}
                  className="group relative aspect-[3/4] bg-neutral-200"
                >
                  <Image
                    src={imgSrc}
                    alt={c.imageAlt || c.title}
                    fill
                    className="object-cover transition duration-700 group-hover:opacity-90"
                    sizes="(max-width:768px) 50vw, 25vw"
                  />
                  <div className="absolute inset-x-0 bottom-0 bg-neutral-950 p-4 text-[#faf9f7]">
                    <p className="text-[8px] font-bold tracking-[0.25em] text-[#faf9f7]/60 uppercase">
                      {c.label}
                    </p>
                    <p className="mt-1 line-clamp-2 font-serif text-sm font-medium leading-tight">
                      {c.title}
                    </p>
                  </div>
                </Link>
                );
              })}
            </div>
          </div>
        </section>
      ) : null}

      {/* 1.4 Love by Celebrities */}
      <section className="border-t border-neutral-950/10 bg-white py-16 md:py-24">
        <div className="mx-auto max-w-screen-2xl px-4 md:px-10">
          <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end" data-gsap="fade-up">
            <div>
              <p className="text-[9px] font-bold tracking-[0.4em] text-neutral-500 uppercase">
                Prensa & cultura
              </p>
              <h3 className="mt-3 font-serif text-3xl font-medium text-neutral-950 md:text-4xl">
                Love by Celebrities
              </h3>
              <p className="mt-4 max-w-xl text-sm leading-relaxed text-neutral-600">
                Menciones y validaciones de estilo -- contenido editorial para situar la marca en el
                mismo universo que el lujo contemporaneo.
              </p>
            </div>
            <div className="hidden gap-2 md:flex">
              <button
                type="button"
                onClick={() => scrollCeleb(-1)}
                className="flex h-10 w-10 items-center justify-center border border-neutral-950/15 transition hover:border-neutral-950"
                aria-label="Anterior"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                type="button"
                onClick={() => scrollCeleb(1)}
                className="flex h-10 w-10 items-center justify-center border border-neutral-950/15 transition hover:border-neutral-950"
                aria-label="Siguiente"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>
          <div
            ref={celebScrollRef}
            className="mt-12 flex snap-x snap-mandatory gap-6 overflow-x-auto pb-4 [-webkit-overflow-scrolling:touch]"
            data-gsap="fade-in"
            data-gsap-delay="0.2"
          >
            {CELEBRITY_PLACEHOLDERS.map((item, i) => (
              <article
                key={i}
                className="min-w-[min(85vw,320px)] shrink-0 snap-start overflow-hidden border border-neutral-950/10 bg-[#faf9f7] md:min-w-[340px]"
              >
                <div className="relative aspect-[4/3] bg-neutral-200">
                  <Image
                    src={item.image}
                    alt={`Editorial ${i + 1} -- Love by Celebrities`}
                    fill
                    className="object-cover"
                    sizes="340px"
                  />
                </div>
                <div className="p-8 md:p-10">
                  <p className="font-serif text-xl leading-snug text-neutral-950 md:text-2xl">
                    {item.quote}
                  </p>
                  <p className="mt-8 text-[9px] font-bold tracking-[0.3em] text-neutral-500 uppercase">
                    {item.source}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 1.5 Confianza y calidad */}
      <section className="border-y border-neutral-950/10 bg-neutral-950 text-[#faf9f7]">
        <div className="mx-auto grid max-w-screen-2xl lg:grid-cols-2">
          <div className="relative min-h-[300px] overflow-hidden lg:min-h-[480px]" data-gsap="zoom-out">
            <Image
              src={IMG_DUO_URBAN}
              alt="Empaque regalo premium"
              fill
              className="object-cover"
              sizes="(max-width:1024px) 100vw, 50vw"
            />
          </div>
          <div
            className="flex flex-col justify-center px-6 py-16 md:px-12 lg:py-24"
            data-gsap="fade-up"
            data-gsap-delay="0.2"
            data-gsap-stagger="0.1"
          >
            <p className="text-[9px] font-bold tracking-[0.4em] text-[#faf9f7]/45 uppercase">
              Transparencia
            </p>
            <h3 className="mt-5 font-serif text-3xl font-medium leading-tight md:text-4xl">
              Confianza y calidad
            </h3>
            <p className="mt-10 text-base leading-[1.85] text-[#faf9f7]/80 md:text-lg">
              <span className="text-[#faf9f7]">Misma formula, precio justo.</span> Referencia de mercado
              en boutiques de lujo frecuentemente por encima de{" "}
              <span className="font-semibold text-[#faf9f7]">$8,000</span> -- nuestro enfoque, desde{" "}
              <span className="font-semibold text-[#faf9f7]">$649</span>, prioriza el acceso sin
              renunciar a la experiencia.
            </p>
            <p className="mt-8 text-sm leading-relaxed text-[#faf9f7]/65">
              Empaque premium, pensado para regalo desde el primer contacto.
            </p>
          </div>
        </div>
      </section>

      {/* 1.6 UGC -- prueba social */}
      <section className="bg-[#faf9f7] py-16 md:py-24">
        <div className="mx-auto max-w-screen-2xl px-4 md:px-10">
          <div className="mx-auto max-w-2xl text-center" data-gsap="fade-up">
            <p className="text-[9px] font-bold tracking-[0.4em] text-neutral-500 uppercase">
              Prueba social
            </p>
            <h3 className="mt-4 font-serif text-3xl font-medium text-neutral-950 md:text-4xl">
              Historias reales
            </h3>
            <p className="mt-5 text-sm leading-relaxed text-neutral-600">
              Contenido de personas reales -- no modelos -- en Monterrey, CDMX y Guadalajara. Las tomas
              de abajo son referencia visual; sustituye por tus clips cuando esten listos.
            </p>
          </div>
          <div
            className="mt-14 grid gap-6 md:grid-cols-3"
            data-gsap="scale-in"
            data-gsap-stagger="0.15"
          >
            {UGC_CITIES.map(({ city, label, image }) => (
              <div
                key={city}
                className="flex flex-col border border-neutral-950/10 bg-white"
              >
                <div className="relative aspect-video bg-neutral-200">
                  <Image
                    src={image}
                    alt={`${city} -- comunidad Tryphe`}
                    fill
                    className="object-cover"
                    sizes="(max-width:768px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-neutral-950/35">
                    <div className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-[#faf9f7] text-[#faf9f7]">
                      <Play className="ml-1 h-6 w-6" fill="currentColor" />
                    </div>
                  </div>
                </div>
                <div className="border-t border-neutral-950/10 p-5 text-center">
                  <p className="font-serif text-lg text-neutral-950">{city}</p>
                  <p className="mt-1 text-[9px] font-bold tracking-[0.3em] text-neutral-500 uppercase">
                    {label}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bestsellers */}
      {shopConfigured && products.length > 0 ? (
        <section className="border-t border-neutral-950/10 bg-white py-16 md:py-24">
          <div className="mx-auto max-w-screen-2xl px-4 md:px-10">
            <div
              className="mb-12 flex flex-col justify-between gap-6 md:mb-16 md:flex-row md:items-end"
              data-gsap="fade-up"
            >
              <div>
                <p className="text-[9px] font-bold tracking-[0.4em] text-neutral-500 uppercase">
                  Seleccion tienda
                </p>
                <h3 className="mt-3 font-serif text-3xl font-medium text-neutral-950 md:text-4xl">
                  Los mas buscados
                </h3>
              </div>
              <Link
                href="/collections"
                className="text-[9px] font-bold tracking-[0.25em] text-neutral-950 uppercase underline-offset-8 hover:underline"
              >
                Ver catalogo completo
              </Link>
            </div>
            <div
              className="grid grid-cols-2 gap-px bg-neutral-950/10 sm:grid-cols-3 lg:grid-cols-4"
              data-gsap="fade-up"
              data-gsap-stagger="0.06"
            >
              {products.map((p) => (
                <Link
                  key={p.handle}
                  href={p.href}
                  className="group flex flex-col bg-white"
                >
                  <div className="relative aspect-[3/4] bg-neutral-100">
                    {p.imageUrl ? (
                      <Image
                        src={p.imageUrl}
                        alt={p.imageAlt}
                        fill
                        className="object-cover transition duration-500 group-hover:opacity-90"
                        sizes="(max-width:640px) 50vw, 25vw"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center text-[10px] text-neutral-400">
                        --
                      </div>
                    )}
                  </div>
                  <div className="border-t border-neutral-950/5 p-4">
                    <p className="line-clamp-2 text-[10px] font-bold tracking-[0.15em] text-neutral-950 uppercase">
                      {p.title}
                    </p>
                    {p.priceAmount ? (
                      <p className="mt-2 font-serif text-sm text-neutral-700">
                        {formatMoney(p.priceAmount, p.priceCurrency)}
                      </p>
                    ) : null}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      ) : shopConfigured && products.length === 0 ? (
        <section className="border-t border-neutral-950/10 px-4 py-16 text-center text-sm text-neutral-500">
          No hay productos publicados en Shopify.
        </section>
      ) : null}

      <section className="border-t border-neutral-950/10 bg-white py-12" data-gsap="fade-in">
        <div className="mx-auto max-w-screen-lg px-4 text-center text-sm text-neutral-700">
          Envios y devoluciones:{" "}
          <Link href="/faq" className="font-semibold underline underline-offset-4">
            FAQ
          </Link>{" "}
          ·{" "}
          <Link href="/contacto" className="font-semibold underline underline-offset-4">
            Contacto
          </Link>
        </div>
      </section>

      <footer className="border-t border-neutral-950/10 bg-[#faf9f7]">
        <div
          className="mx-auto grid max-w-screen-2xl grid-cols-2 gap-y-2 px-4 py-10 text-center md:grid-cols-4 md:px-10 md:text-left"
          data-gsap="fade-in"
          data-gsap-stagger="0.08"
        >
          <Link
            href="/acerca"
            className="py-1 text-[9px] font-bold tracking-[0.2em] text-neutral-700 uppercase hover:text-neutral-950"
          >
            Sobre {siteName}
          </Link>
          <Link
            href="/faq"
            className="py-1 text-[9px] font-bold tracking-[0.2em] text-neutral-700 uppercase hover:text-neutral-950"
          >
            Atencion
          </Link>
          <Link
            href="/cart"
            className="py-1 text-[9px] font-bold tracking-[0.2em] text-neutral-700 uppercase hover:text-neutral-950"
          >
            Pedido
          </Link>
          <Link
            href="/contacto"
            className="py-1 text-[9px] font-bold tracking-[0.2em] text-neutral-700 uppercase hover:text-neutral-950"
          >
            Visitanos
          </Link>
        </div>
      </footer>
    </TrypheMarketingChrome>
  );
}
