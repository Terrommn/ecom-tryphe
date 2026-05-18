import Image from "next/image";
import { getProductByHandleSafe, isShopifyConfigured } from "@/lib/shopify";
import { getMarketingNavLinks } from "@/lib/marketing-nav";
import { TrypheMarketingChrome } from "@/components/home/TrypheMarketingChrome";
import { SantorCtaButton } from "./SantorCtaButton";
import { SantorTabs } from "./SantorTabs";

const PRODUCT_HANDLE = "santor-effect";

export const metadata = {
  title: "The Santor Effect — Detalles | Tryphé",
  description:
    "Perfil olfativo, inspiración, garantía y por qué SANTOR es tu siguiente fragancia.",
};

const NOTAS_PIRAMIDE = [
  { fase: "Salida", notas: "Bergamota, cuero suave, especias limpias" },
  { fase: "Corazón", notas: "Sándalo, iris, violeta" },
  { fase: "Fondo", notas: "Cedro, cuero ahumado, papel, almizcle blanco" },
];

const CARACTER =
  "SANTOR es una fragancia de presencia quieta. No grita — ocupa el espacio con autoridad natural. Quienes lo usan describen la misma experiencia: las personas se acercan, preguntan, recuerdan.";

const CHIPS = ["Elegante", "Proyección: Alta", "Temporada: Día", "Ideal para: Todo"];

const CUANDO = [
  {
    titulo: "Trabajo / Oficina",
    desc: "Transmites seguridad e individualidad sin esfuerzo. La gente nota algo diferente en ti.",
  },
  {
    titulo: "Cita / Noche",
    desc: "Creas memorias olfativas. Presencia cálida e íntima que permanece después de que te vas.",
  },
  {
    titulo: "Evento / Networking",
    desc: "Te recuerdan después de irte del lugar. Tu fragancia hace el trabajo por ti.",
  },
  {
    titulo: "Uso diario",
    desc: "Tu firma constante — todos los días, en cualquier situación.",
  },
];

const ELEMENTOS = [
  {
    num: "01",
    color: "#92714a",
    nombre: "SANTOR 100 ml",
    desc: "Eau de Parfum, alta concentración. La fragancia central del sistema.",
    precio: "$649",
    badge: null,
  },
  {
    num: "02",
    color: "#5a6e4a",
    nombre: "SANTOR Pocket",
    desc: "Antibacterial o jabón líquido 30 ml. Cuidado de manos con la misma firma olfativa. Regalo exclusivo.",
    precio: "$249",
    badge: "INCLUIDO",
  },
  {
    num: "03",
    color: "#4a6e8a",
    nombre: "Manual de la Presencia",
    desc: "E-book con los 7 detalles invisibles que separan a los que son recordados de los que pasan inadvertidos.",
    precio: "$297",
    badge: null,
  },
  {
    num: "04",
    color: "#c0392b",
    nombre: "Crest Email: Primera Impresión",
    desc: "PDF con las 8 decisiones de los primeros 7 segundos. Las que nadie te enseñó.",
    precio: "$147",
    badge: null,
  },
];

export default async function OfertaIrresistiblePage() {
  const shopConfigured = isShopifyConfigured();
  const navLinks = await getMarketingNavLinks();
  const product = await getProductByHandleSafe(PRODUCT_HANDLE);

  const variants = product?.variants?.edges?.map((e) => e.node) || [];
  const firstVariant = variants.find((v) => v.availableForSale) || variants[0];
  const variantId = firstVariant?.id || null;
  const checkoutUrl = product?.onlineStoreUrl || null;

  return (
    <TrypheMarketingChrome shopConfigured={shopConfigured} navLinks={navLinks}>
      <article className="bg-white">

        {/* 1. HERO */}
        <section>
          <div className="relative h-[380px] md:h-[460px] w-full overflow-hidden bg-stone-100">
            <Image
              src="/cambiosmayo/Producto%20irresistible.png"
              alt="SANTOR — The Santor Effect"
              fill
              className="object-cover object-center"
              priority
            />
            <div className="absolute inset-0 bg-neutral-950/35" />
            <div className="absolute inset-0 flex flex-col items-center justify-end pb-14 px-6 text-center">
              <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-white/55 mb-3">
                Tryphé — Colección Signature
              </p>
              <h1 className="font-serif text-[clamp(2rem,5vw,3.25rem)] font-medium text-white leading-tight">
                The Santor Effect
              </h1>
              <p className="mt-3 text-sm text-white/70 max-w-sm leading-relaxed">
                Todo lo que necesitas saber antes de decir que sí — o después de que ya lo sabes.
              </p>
            </div>
          </div>
        </section>

        {/* Contenido — max 720px */}
        <div className="mx-auto max-w-[720px] px-6 md:px-8">

          {/* 2. PERFIL OLFATIVO */}
          <section className="py-14 border-b border-stone-200">
            <p className="text-[10px] font-bold uppercase tracking-[0.35em] text-stone-400 mb-6">
              Perfil olfativo de SANTOR
            </p>
            <SantorTabs piramide={NOTAS_PIRAMIDE} caracter={CARACTER} chips={CHIPS} />
          </section>

          {/* 3. CUÁNDO USARLO */}
          <section className="py-14 border-b border-stone-200">
            <p className="text-[10px] font-bold uppercase tracking-[0.35em] text-stone-400 mb-8">
              Cuándo usarlo
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {CUANDO.map((c) => (
                <div key={c.titulo} className="bg-stone-50 px-6 py-5">
                  <p className="text-sm font-bold text-neutral-900 mb-2">{c.titulo}</p>
                  <p className="text-sm text-stone-500 leading-relaxed">{c.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* 4. INSPIRADO EN SANTAL 33 */}
          <section className="py-14 border-b border-stone-200">
            <p className="text-[10px] font-bold uppercase tracking-[0.35em] text-stone-400 mb-6">
              Inspirado en Santal 33
            </p>
            <div
              className="bg-[#faf9f6] px-6 py-6"
              style={{ borderLeft: "4px solid #b8c4a0" }}
            >
              <p className="text-sm text-stone-600 leading-relaxed mb-8">
                Le Labo Santal 33 es considerada una de las fragancias más influyentes del
                siglo. La reconoces en hoteles de lujo, en las personas que notan. SANTOR
                captura esa misma esencia — el cuero suave, el sándalo, el papel — con la
                misma fórmula de alta concentración.
              </p>
              <div className="flex items-center gap-8">
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-stone-400 mb-1">
                    Santal 33 (Le Labo)
                  </p>
                  <p className="text-xl text-stone-400 line-through font-medium">$7,250</p>
                </div>
                <span className="text-stone-300 text-2xl">→</span>
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-stone-400 mb-1">
                    SANTOR (Tryphé)
                  </p>
                  <p className="text-2xl font-bold text-neutral-950">$649</p>
                </div>
              </div>
            </div>
          </section>

          {/* 5. DETALLE DE ELEMENTOS */}
          <section className="py-14 border-b border-stone-200">
            <p className="text-[10px] font-bold uppercase tracking-[0.35em] text-stone-400 mb-8">
              Detalle de cada elemento
            </p>
            <div className="space-y-3">
              {ELEMENTOS.map((el) => (
                <div
                  key={el.num}
                  className="flex items-start gap-4 bg-stone-50 px-5 py-5"
                  style={{ borderLeft: `4px solid ${el.color}` }}
                >
                  <span className="text-xs font-bold text-stone-300 mt-0.5 shrink-0 w-6">
                    {el.num}
                  </span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <p className="text-sm font-bold text-neutral-900">{el.nombre}</p>
                      {el.badge && (
                        <span className="text-[9px] font-bold uppercase tracking-wider bg-[#5a6e4a] text-white px-2 py-0.5">
                          {el.badge}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-stone-500 leading-relaxed">{el.desc}</p>
                  </div>
                  <p className="text-sm font-bold text-neutral-900 shrink-0">{el.precio}</p>
                </div>
              ))}
            </div>
            {/* Resumen */}
            <div className="mt-3 bg-[#e8e0d4] px-5 py-4 flex flex-wrap items-center justify-between gap-3">
              <p className="text-[11px] font-bold uppercase tracking-wider text-stone-600">
                Valor total:{" "}
                <span className="line-through text-stone-400 font-normal">$1,342</span>
              </p>
              <p className="text-sm font-bold text-[#5a6e4a] uppercase tracking-wider">
                Tu inversión: $649
              </p>
            </div>
          </section>

          {/* 6. GARANTÍA */}
          <section className="py-14">
            <p className="text-[10px] font-bold uppercase tracking-[0.35em] text-stone-400 mb-6">
              Cómo funciona la garantía
            </p>
            <div
              className="bg-white px-6 py-6 ring-1 ring-stone-100"
              style={{ borderLeft: "4px solid #e74c3c" }}
            >
              <p className="text-sm font-bold text-neutral-900 mb-6">
                Garantía Santor Effect — 60 días
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  { paso: "PASO 1", texto: "Úsalo 60 días sin prisa. Deja que el efecto ocurra." },
                  {
                    paso: "PASO 2",
                    texto: "Si no recibes cumplidos ni notas diferencia, escríbenos.",
                  },
                  {
                    paso: "PASO 3",
                    texto: "Te devolvemos el 100% a info@tryphe.mx. Sin preguntas.",
                  },
                ].map((p) => (
                  <div key={p.paso} className="bg-stone-50 px-4 py-5 text-center">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-stone-400 mb-2">
                      {p.paso}
                    </p>
                    <p className="text-xs text-stone-600 leading-relaxed">{p.texto}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

        </div>

        {/* 7. CTA FINAL */}
        <section className="bg-[#faf5ef] py-20 px-6 text-center">
          <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-stone-400 mb-5">
            Ya lo sabes todo
          </p>
          <h2 className="font-serif text-[clamp(1.75rem,4vw,2.75rem)] font-medium text-neutral-950 leading-tight">
            Pasa de invisible a inevitable.
          </h2>
          <p className="mt-4 text-sm text-stone-500 max-w-xs mx-auto leading-relaxed">
            Solo 99 lugares. Una sola ventana.
          </p>
          <div className="mt-10">
            <SantorCtaButton variantId={variantId} checkoutUrl={checkoutUrl} />
          </div>
        </section>

      </article>
    </TrypheMarketingChrome>
  );
}
