import { isShopifyConfigured, getProductsFirst } from "@/lib/shopify";
import { getMarketingNavLinks } from "@/lib/marketing-nav";
import { getProductHref } from "@/lib/product-href";
import { TrypheMarketingChrome } from "@/components/home/TrypheMarketingChrome";
import { QuizLanding } from "@/components/quiz/QuizLanding";

export const metadata = {
  title: "Encuentra tu Aroma | Tryphé",
  description:
    "Cuestionario sensorial para recomendarte una fragancia Tryphé según proyección, emoción y contexto.",
};

export const revalidate = 120;

export default async function EncuentraTuAromaPage() {
  const shopConfigured = isShopifyConfigured();
  const navLinks = await getMarketingNavLinks();

  let quizProducts = [];
  if (shopConfigured) {
    const all = await getProductsFirst(48);
    quizProducts = all.map((p) => ({
      handle: p.handle,
      title: p.title,
      href: getProductHref(p),
      imageUrl: p.featuredImage?.url ?? null,
      imageAlt: p.featuredImage?.altText ?? p.title,
      priceAmount: p.priceRange?.minVariantPrice?.amount ?? null,
      priceCurrency: p.priceRange?.minVariantPrice?.currencyCode ?? "MXN",
      tags: p.tags ?? [],
    }));
  }

  return (
    <TrypheMarketingChrome navLinks={navLinks} shopConfigured={shopConfigured}>
      <QuizLanding quizProducts={quizProducts} />
    </TrypheMarketingChrome>
  );
}
