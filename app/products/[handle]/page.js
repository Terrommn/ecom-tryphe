import Link from "next/link";
import { notFound } from "next/navigation";
import { getProductByHandleSafe } from "@/lib/shopify";
import { ProductGallery } from "@/components/product/ProductGallery";
import { ProductPurchase } from "@/components/product/ProductPurchase";
import { ProductSpecs } from "@/components/product/ProductSpecs";
import { JudgeMePlaceholder } from "@/components/reviews/JudgeMePlaceholder";

export async function generateMetadata({ params }) {
  const { handle } = await params;
  const product = await getProductByHandleSafe(handle);
  if (!product) return { title: "Producto | Tienda" };
  return {
    title: `${product.title} | Tienda`,
    description: product.title,
  };
}

export default async function ProductPage({ params }) {
  const { handle } = await params;
  const product = await getProductByHandleSafe(handle);
  if (!product) notFound();

  const images = product.images?.edges?.map((e) => e.node) || [];
  const metafields = product.metafields;

  return (
    <div className="oob-container py-10 md:py-14">
      <nav className="text-xs text-[var(--oob-muted)] mb-8" aria-label="Migas">
        <Link href="/" className="hover:text-[var(--oob-gold)]">
          Inicio
        </Link>
        <span className="mx-2">/</span>
        <span className="text-[var(--oob-cream)]">{product.title}</span>
      </nav>

      <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16" data-gsap="fade-up">
        <ProductGallery images={images} title={product.title} />
        <div>
          <ProductPurchase product={product} />
          {product.descriptionHtml ? (
            <div
              className="prose prose-sm mt-10 max-w-none text-[var(--oob-muted)] [&_p]:text-[var(--oob-cream)] [&_a]:text-[var(--oob-fairway)] [&_a]:underline-offset-2"
              dangerouslySetInnerHTML={{ __html: product.descriptionHtml }}
            />
          ) : null}
          <ProductSpecs metafields={metafields} />
          <JudgeMePlaceholder productId={product.id} />
        </div>
      </div>
    </div>
  );
}
