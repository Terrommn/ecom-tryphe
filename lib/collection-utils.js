import { PLACEHOLDER_COLLECTIONS } from "@/lib/placeholders";

/**
 * Up to 4 collections for the homepage. Uses only API data when any collections
 * exist — avoids linking to demo handles that may not exist in Shopify.
 */
export function mergeFeaturedCollections(apiCollections) {
  const api = apiCollections || [];
  if (api.length > 0) {
    return api.slice(0, 4);
  }
  return PLACEHOLDER_COLLECTIONS.slice(0, 4);
}
