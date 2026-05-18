import Image from "next/image";
import { getProductByHandleSafe, isShopifyConfigured } from "@/lib/shopify";
import { getMarketingNavLinks } from "@/lib/marketing-nav";
import { TrypheMarketingChrome } from "@/components/home/TrypheMarketingChrome";
import { SantorCtaButton } from "./SantorCtaButton";

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

const CHIPS = [
  { emoji: "🎩", label: "Elegante" },
  { emoji: "📡", label: "Proyección: Alta" },
  { emoji: "☀️", label: "Temporada: Día" },
  { emoji: "🎯", label: "Ideal para: Todo" },
];

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
    num: 1,
    color: "#8B7355",
    nombre: "SANTOR 100 ml",
    desc: "Eau de Parfum, alta concentración. La fragancia central del sistema.",
    precio: "$649",
    badge: null,
  },
  {
    num: 2,
    color: "#6B8E5A",
    nombre: "SANTOR Pocket",
    desc: "Antibacterial o jabón líquido 30 ml. Cuidado de manos con la misma firma olfativa.",
    precio: "$249",
    badge: "INCLUIDO",
  },
  {
    num: 3,
    color: "#5A7B8E",
    nombre: "Manual de la Presencia",
    desc: "E-book con los 7 detalles invisibles que separan a los que son recordados.",
    precio: "$297",
    badge: null,
  },
  {
    num: 4,
    color: "#C0392B",
    nombre: "Crest Email: Primera Impresión",
    desc: "PDF con las 8 decisiones de los primeros 7 segundos.",
    precio: "$147",
    badge: null,
  },
];

const CIRCLED = ["①", "②", "③", "④", "⑤"];

function SectionNumber({ n }) {
  return (
    <span className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#e8e0d4] text-xs font-bold text-neutral-900">
      {CIRCLED[n - 1]}
    </span>
  );
}

function SectionTitle({ n, children }) {
  return (
    <div className="flex items-center gap-3 mb-5">
      <SectionNumber n={n} />
      <h2 className="text-xs font-bold uppercase tracking-[0.25em] text-[#888]">
        {children}
      </h2>
    </div>
  );
}

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

        {/* ── HERO ── */}
        <section>
          <div className="relative h-[200px] md:h-[300px] w-full overflow-hidden bg-stone-100">
            <Image
              src="/cambiosmayo/Producto%20irresistible.png"
              alt="SANTOR — The Santor Effect"
              fill
              className="object-cover object-center"
              priority
            />
            <div className="absolute inset-0 bg-black/50" />
            <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
              <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#c9b99a] mb-3">
                Tryphé — Colección Signature
              </p>
              <h1 className="font-serif text-[clamp(1.75rem,5vw,3rem)] font-medium text-white leading-tight">
                The Santor Effect
              </h1>
              <p className="mt-2 text-sm italic text-white/70 max-w-sm leading-relaxed">
                Todo lo que necesitas saber antes de decir que sí — o después de que ya lo sabías.
              </p>
            </div>
          </div>
        </section>

        {/* ── CONTENIDO — max 680px ── */}
        <div className="mx-auto max-w-[680px] px-5 md:px-8">

          {/* ① PERFIL OLFATIVO */}
          <section className="py-8">
            <SectionTitle n={1}>Perfil olfativo de SANTOR</SectionTitle>

            {/* 2 columnas: Familia + Carácter */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              <div>
                <div className="bg-[#5a5a42] px-4 py-2">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-white">Familia olfativa</p>
                </div>
                <div className="bg-[#faf9f6] px-4 py-3">
                  <p className="text-sm font-medium text-neutral-800">Amaderada aromática</p>
                  <p className="text-xs text-stone-400 mt-1">Inspirada en: Santal 33</p>
                </div>
              </div>
              <div>
                <div className="bg-[#e8e4dc] px-4 py-2">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-neutral-900">Carácter</p>
                </div>
                <div className="bg-[#faf9f6] px-4 py-3">
                  <p className="text-sm font-medium text-neutral-800">Elegante, magnético</p>
                  <p className="text-xs text-stone-400 mt-1">Proyección: Alta, duradera</p>
                </div>
              </div>
            </div>

            {/* Pirámide olfativa */}
            <p className="text-[11px] font-bold uppercase tracking-widest text-stone-400 mb-2">
              Pirámide olfativa
            </p>
            <div className="border border-stone-200 overflow-hidden mb-5">
              {NOTAS_PIRAMIDE.map((row, i) => (
                <div
                  key={row.fase}
                  className={`flex items-center gap-4 px-4 py-3 ${i % 2 === 0 ? "bg-[#faf7f2]" : "bg-white"}`}
                >
                  <span className="inline-block w-[70px] shrink-0 bg-[#e8e0d4] py-1 text-center text-[10px] font-bold uppercase tracking-wide text-neutral-800">
                    {row.fase}
                  </span>
                  <p className="text-sm text-neutral-700">{row.notas}</p>
                </div>
              ))}
            </div>

            {/* Chips */}
            <div className="flex flex-wrap gap-2">
              {CHIPS.map((chip) => (
                <span
                  key={chip.label}
                  className="bg-[#f0ebe3] border border-stone-300 text-stone-600 text-xs px-3 py-1.5 rounded-full"
                >
                  {chip.emoji} {chip.label}
                </span>
              ))}
            </div>
          </section>

          <hr className="border-stone-200" />

          {/* ② CUÁNDO USARLO */}
          <section className="py-8">
            <SectionTitle n={2}>Cuándo usarlo</SectionTitle>
            <div className="grid grid-cols-1 sm:grid-cols-2">
              {CUANDO.map((c, i) => (
                <div
                  key={c.titulo}
                  className={`p-5 ${
                    i % 2 === 0 ? "sm:border-r border-stone-200" : ""
                  } ${i < 2 ? "border-b border-stone-200" : ""}`}
                >
                  <p className="text-sm font-bold text-neutral-900 mb-1.5">{c.titulo}</p>
                  <p className="text-[13px] text-[#666] leading-relaxed">{c.desc}</p>
                </div>
              ))}
            </div>
          </section>

          <hr className="border-stone-200" />

          {/* ③ INSPIRADO EN SANTAL 33 */}
          <section className="py-8">
            <SectionTitle n={3}>Inspirado en Santal 33</SectionTitle>
            <div
              className="bg-[#faf9f6] px-6 py-5"
              style={{ borderLeft: "4px solid #b8c4a0" }}
            >
              <p className="text-sm text-[#444] leading-[1.75]">
                Le Labo Santal 33 es considerada una de las fragancias más influyentes del
                siglo. La reconoces en hoteles de lujo, en las personas que notas. SANTOR
                captura esa misma esencia — el cuero suave, el sándalo, el papel — con la
                misma fórmula de alta concentración.
              </p>
            </div>
            <div className="flex items-center gap-6 mt-5 px-2">
              <div>
                <p className="text-[10px] uppercase tracking-wider text-stone-400 mb-1">
                  Santal 33 (Le Labo)
                </p>
                <p className="text-xl text-gray-400 line-through font-medium">$7,250</p>
              </div>
              <span className="text-stone-300 text-xl">→</span>
              <div>
                <p className="text-[10px] uppercase tracking-wider text-stone-400 mb-1">
                  SANTOR (Tryphé)
                </p>
                <p className="text-2xl font-bold text-neutral-950">$649</p>
              </div>
            </div>
          </section>

          <hr className="border-stone-200" />

          {/* ④ DETALLE DE CADA ELEMENTO */}
          <section className="py-8">
            <SectionTitle n={4}>Detalle de cada elemento</SectionTitle>
            <div className="space-y-2.5">
              {ELEMENTOS.map((el) => (
                <div
                  key={el.num}
                  className="flex items-start gap-3.5 bg-[#faf9f6] px-4 py-4"
                  style={{ borderLeft: `4px solid ${el.color}` }}
                >
                  <span
                    className="inline-flex h-[30px] w-[30px] shrink-0 items-center justify-center rounded-full text-xs font-bold text-white mt-0.5"
                    style={{ backgroundColor: el.color }}
                  >
                    {el.num}
                  </span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <p className="text-sm font-bold text-neutral-900">{el.nombre}</p>
                      {el.badge && (
                        <span className="text-[10px] font-bold uppercase bg-[#27ae60] text-white px-2 py-0.5 rounded">
                          {el.badge}
                        </span>
                      )}
                    </div>
                    <p className="text-[13px] text-stone-500 leading-relaxed">{el.desc}</p>
                  </div>
                  <p className="text-sm font-bold text-neutral-900 shrink-0 mt-0.5">{el.precio}</p>
                </div>
              ))}
            </div>
            {/* Barra resumen */}
            <div className="mt-2.5 bg-[#b8c4a0] px-5 py-3 flex flex-wrap items-center justify-between gap-3">
              <p className="text-[11px] font-bold uppercase tracking-wider text-neutral-900">
                Valor total del sistema:{" "}
                <span className="line-through font-normal text-neutral-700">$1,342</span>
              </p>
              <p className="text-sm font-bold text-neutral-950 uppercase tracking-wider">
                Tu inversión: $649
              </p>
            </div>
          </section>

          <hr className="border-stone-200" />

          {/* ⑤ GARANTÍA */}
          <section className="py-8">
            <SectionTitle n={5}>Cómo funciona la garantía</SectionTitle>
            <div
              className="bg-white px-5 py-5 ring-1 ring-stone-100"
              style={{ borderLeft: "4px solid #e74c3c" }}
            >
              <p className="text-sm font-bold text-neutral-900 mb-5">
                🛡️ Garantía Santor Effect — 60 días
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                {[
                  { paso: "PASO 1", texto: "Úsalo 60 días sin prisa. Deja que el efecto ocurra." },
                  { paso: "PASO 2", texto: "Si no recibes cumplidos ni notas diferencia, escríbenos." },
                  { paso: "PASO 3", texto: "Te devolvemos el 100% a info@tryphe.mx. Sin preguntas." },
                ].map((p) => (
                  <div key={p.paso} className="bg-[#f5f3ef] px-4 py-4 text-center">
                    <p className="text-[11px] font-bold uppercase tracking-wider text-[#e74c3c] mb-2">
                      {p.paso}
                    </p>
                    <p className="text-[13px] text-stone-600 leading-relaxed">{p.texto}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

        </div>

        {/* ── CTA FINAL ── */}
        <section className="bg-[#faf5ef] py-14 px-6 text-center">
          <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#999] mb-4">
            Ya lo sabes todo
          </p>
          <h2 className="font-serif text-[clamp(1.75rem,4vw,2.5rem)] font-medium text-neutral-950 leading-tight">
            Pasa de invisible a inevitable.
          </h2>
          <p className="mt-3 text-[15px] text-stone-500 max-w-xs mx-auto leading-relaxed">
            Solo 99 lugares. Una sola ventana.
          </p>
          <div className="mt-8">
            <SantorCtaButton variantId={variantId} checkoutUrl={checkoutUrl} />
          </div>
        </section>

        {/* ── TRUST BAR ── */}
        <section className="bg-[#d4c4b0]">
          <div className="mx-auto max-w-screen-xl px-4 py-5">
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4 text-center">
              {[
                { icon: "↩", label: "Devoluciones gratis" },
                { icon: "📦", label: "Envíos sin costo" },
                { icon: "⭐", label: "+10,000 reseñas" },
                { icon: "🔒", label: "Pago 100% seguro" },
              ].map((t) => (
                <div key={t.label} className="flex items-center justify-center gap-2">
                  <span className="text-lg">{t.icon}</span>
                  <p className="text-xs font-bold text-neutral-900 tracking-wide">{t.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

      </article>
    </TrypheMarketingChrome>
  );
}
