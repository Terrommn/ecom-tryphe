import Link from "next/link";
import { searchProducts } from "@/lib/shopify";
import { ProductCard } from "@/components/catalog/ProductCard";
import { TrypheShell } from "@/components/layout/TrypheShell";

export const metadata = {
  title: "Búsqueda | Tienda",
  description: "Buscar productos en el catálogo.",
};

export default async function SearchPage({ searchParams }) {
  const sp = await searchParams;
  const raw = sp.q;
  const q = typeof raw === "string" ? raw.trim() : Array.isArray(raw) ? raw[0]?.trim() ?? "" : "";

  const result = await searchProducts({ query: q, first: 24 });
  const products = (result.edges || [])
    .map((e) => e.node)
    .filter((n) => n && n.id);

  return (
    <TrypheShell>
      <div className="bg-[#faf9f7]">
        <div className="mx-auto max-w-screen-2xl px-4 lg:px-10 py-10 md:py-14">
          <h1 className="font-serif text-3xl md:text-4xl font-medium text-2xl md:text-3xl text-neutral-950 mb-2" data-gsap="fade-up">
            Busqueda
          </h1>
          {q ? (
            <p className="text-sm text-neutral-500 mb-8">
              Resultados para &ldquo;{q}&rdquo;
            </p>
          ) : (
            <p className="text-sm text-neutral-500 mb-8">
              Escribe un término en la barra de búsqueda del header.
            </p>
          )}

          {!q ? null : products.length === 0 ? (
            <div className="rounded-lg border border-neutral-200 bg-neutral-100/40 px-8 py-16 text-center">
              <p className="text-neutral-950">No se encontraron resultados.</p>
              <p className="mt-2 text-sm text-neutral-500">
                Prueba con otras palabras o navega por{" "}
                <Link href="/collections" className="text-neutral-950 hover:underline">
                  colecciones
                </Link>
                .
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-4 md:gap-6 lg:grid-cols-4" data-gsap="fade-up" data-gsap-stagger="0.06">
              {products.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          )}
        </div>
      </div>
    </TrypheShell>
  );
}
