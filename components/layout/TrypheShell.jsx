import { isShopifyConfigured } from "@/lib/shopify";
import { getMarketingNavLinks } from "@/lib/marketing-nav";
import { TrypheMarketingChrome } from "@/components/home/TrypheMarketingChrome";

const siteName = process.env.NEXT_PUBLIC_SITE_NAME?.trim() || "Tryphé";

/**
 * Server component that wraps any page with the Tryphé marketing chrome
 * (announcement bar + light editorial header + nav + footer).
 */
export async function TrypheShell({ children }) {
  const shopConfigured = isShopifyConfigured();
  const navLinks = await getMarketingNavLinks();

  return (
    <TrypheMarketingChrome shopConfigured={shopConfigured} navLinks={navLinks}>
      {children}
    </TrypheMarketingChrome>
  );
}
