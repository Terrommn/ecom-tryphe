/**
 * Resuelve hasta 4 colecciones destacadas: primero por handles de env, luego rellena con el catálogo.
 *
 * @param {{ handle: string, title: string, image?: { url?: string | null, altText?: string | null } | null }[]} allCollections
 * @param {string[]} envHandles ordered preferred handles
 */
export function resolveFeaturedCollections(allCollections, envHandles) {
  const map = new Map(allCollections.map((c) => [c.handle, c]));
  const out = [];
  const seen = new Set();

  for (const h of envHandles) {
    if (!h) continue;
    const c = map.get(h);
    if (c && !seen.has(c.handle)) {
      out.push(toCard(c));
      seen.add(c.handle);
    }
  }

  for (const c of allCollections) {
    if (out.length >= 4) break;
    if (!seen.has(c.handle)) {
      out.push(toCard(c));
      seen.add(c.handle);
    }
  }

  return out.slice(0, 4);
}

function toCard(c) {
  return {
    handle: c.handle,
    title: c.title,
    imageUrl: c.image?.url ?? null,
    imageAlt: c.image?.altText ?? c.title,
  };
}

/**
 * @param {string | undefined} handle
 * @param {{ handle: string, title: string }[]} allCollections
 * @param {string} keyword match en título o handle (ej. "hombre", "mujer")
 */
export function collectionHrefOrFallback(handle, allCollections, keyword) {
  if (handle) {
    return `/collections/${encodeURIComponent(handle)}`;
  }
  const lower = (s) => s.toLowerCase();
  const guess = allCollections.find(
    (c) =>
      lower(c.title).includes(keyword) || lower(c.handle).includes(keyword),
  );
  if (guess) {
    return `/collections/${encodeURIComponent(guess.handle)}`;
  }
  return "/collections";
}
