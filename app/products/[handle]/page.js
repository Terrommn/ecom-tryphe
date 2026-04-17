import Link from "next/link";
import { notFound } from "next/navigation";
import { isShopifyConfigured, getProductByHandleSafe } from "@/lib/shopify";
import { getMarketingNavLinks } from "@/lib/marketing-nav";
import { TrypheMarketingChrome } from "@/components/home/TrypheMarketingChrome";
import { ProductGallery } from "@/components/product/ProductGallery";
import { ProductPurchase } from "@/components/product/ProductPurchase";
import { ProductStory } from "@/components/product/ProductStory";
import { ProductSpecs } from "@/components/product/ProductSpecs";

export async function generateMetadata({ params }) {
  const { handle } = await params;
  const product = await getProductByHandleSafe(handle);
  if (!product) return { title: "Producto | Tienda" };
  return {
    title: `${product.title} | Tryphé`,
    description: product.title,
  };
}

const TRUST_FEATURES = [
  { icon: "droplet", label: "Larga duración", sub: "8 – 12 hrs" },
  { icon: "wind", label: "Alta proyección", sub: "Presencia sin exceso" },
  { icon: "shield", label: "100% original", sub: "Fórmula verificada" },
  { icon: "package", label: "Empaque premium", sub: "Listo para regalo" },
];

function TrustIcon({ name }) {
  const icons = {
    droplet: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 21.5c-3.6 0-6.5-2.8-6.5-6.3 0-4.2 5.2-11.2 6-12.3a.6.6 0 0 1 1 0c.8 1.1 6 8.1 6 12.3 0 3.5-2.9 6.3-6.5 6.3Z"
      />
    ),
    wind: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9.59 4.59A2 2 0 1 1 11 8H2m10.59 11.41A2 2 0 1 0 14 16H2m15.73-8.27A2.5 2.5 0 1 1 19.5 12H2"
      />
    ),
    shield: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z"
      />
    ),
    package: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m16.5 9.4-9-5.19M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z M3.27 6.96 12 12.01l8.73-5.05M12 22.08V12"
      />
    ),
  };
  return (
    <svg
      className="h-5 w-5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1.2}
    >
      {icons[name]}
    </svg>
  );
}

export default async function ProductPage({ params }) {
  const { handle } = await params;
  const product = await getProductByHandleSafe(handle);
  if (!product) notFound();

  const shopConfigured = isShopifyConfigured();
  const navLinks = await getMarketingNavLinks();
  const images = product.images?.edges?.map((e) => e.node) || [];
  const metafields = product.metafields;
  const secondaryImage = images[1] || images[0];

  return (
    <TrypheMarketingChrome shopConfigured={shopConfigured} navLinks={navLinks}>
      <article>
        {/* ── Breadcrumb ── */}
        <div className="bg-[#faf9f7]">
          <div className="mx-auto max-w-screen-2xl px-4 pt-8 pb-2 lg:px-10">
            <nav
              className="text-[9px] font-bold uppercase tracking-[0.3em] text-neutral-400"
              aria-label="Migas"
            >
              <Link href="/" className="transition-colors hover:text-neutral-950">
                Inicio
              </Link>
              <span className="mx-2 opacity-40">/</span>
              <span className="text-neutral-950">{product.title}</span>
            </nav>
          </div>
        </div>

        {/* ── Product hero: gallery + purchase ── */}
        <section className="bg-[#faf9f7]">
          <div className="mx-auto max-w-screen-2xl px-4 pb-16 md:pb-20 lg:px-10">
            <div
              className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_420px] lg:gap-16 xl:gap-20"
              data-gsap="fade-up"
            >
              <ProductGallery images={images} title={product.title} />

              <div className="lg:sticky lg:top-28 lg:self-start">
                <ProductPurchase product={product} />
              </div>
            </div>
          </div>
        </section>

        {/* ── Trust strip ── */}
        <section className="border-y border-neutral-950/10 bg-[#faf9f7]">
          <div className="mx-auto max-w-screen-2xl">
            <div
              className="grid grid-cols-2 gap-px bg-neutral-950/10 md:grid-cols-4"
              data-gsap="fade-up"
              data-gsap-stagger="0.06"
            >
              {TRUST_FEATURES.map((f) => (
                <div
                  key={f.label}
                  className="flex flex-col items-center gap-2.5 bg-[#faf9f7] px-4 py-8 text-center md:py-10"
                >
                  <span className="text-neutral-400">
                    <TrustIcon name={f.icon} />
                  </span>
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-950">
                    {f.label}
                  </p>
                  <p className="text-[11px] text-neutral-500">{f.sub}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Story — dark cinematic ── */}
        {product.descriptionHtml && (
          <ProductStory
            descriptionHtml={product.descriptionHtml}
            imageUrl={secondaryImage?.url}
            imageAlt={secondaryImage?.altText || product.title}
          />
        )}

        {/* ── Specs ── */}
        {metafields?.some(Boolean) && (
          <section className="bg-[#faf9f7]">
            <div className="mx-auto max-w-screen-2xl px-4 py-16 md:py-24 lg:px-10">
              <div className="mx-auto max-w-2xl" data-gsap="fade-up">
                <ProductSpecs metafields={metafields} />
              </div>
            </div>
          </section>
        )}

        {/* ── Guarantee strip ── */}
        <section className="border-y border-neutral-950/10 bg-[#f5f0e8]">
          <div
            className="mx-auto max-w-screen-2xl px-4 py-14 md:py-20 lg:px-10"
            data-gsap="fade-up"
          >
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-[9px] font-bold tracking-[0.4em] text-neutral-400 uppercase">
                Compromiso Tryphé
              </p>
              <h3 className="mt-5 font-serif text-2xl font-medium text-neutral-950 md:text-3xl">
                Misma fórmula, precio justo
              </h3>
              <p className="mt-6 text-sm leading-relaxed text-neutral-600">
                Referencia de mercado en boutiques de lujo frecuentemente por encima de{" "}
                <span className="font-semibold text-neutral-950">$8,000</span> — nuestro
                enfoque, desde{" "}
                <span className="font-semibold text-neutral-950">$649</span>, prioriza el
                acceso sin renunciar a la experiencia.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-6 text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-500">
                <span>Envío express</span>
                <span className="text-neutral-300">·</span>
                <span>Satisfacción garantizada</span>
                <span className="text-neutral-300">·</span>
                <span>Pago seguro</span>
              </div>
            </div>
          </div>
        </section>

      </article>
    </TrypheMarketingChrome>
  );
}
