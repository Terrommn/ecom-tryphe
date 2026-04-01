/** Maps UI sort keys to Storefront API ProductCollectionSortKeys + reverse */
export function getCollectionSort(searchParams) {
  const raw = searchParams?.sort;
  const sort = Array.isArray(raw) ? raw[0] : raw || "manual";
  const map = {
    manual: { sortKey: "MANUAL", reverse: false },
    "price-asc": { sortKey: "PRICE", reverse: false },
    "price-desc": { sortKey: "PRICE", reverse: true },
    newest: { sortKey: "CREATED", reverse: true },
    name: { sortKey: "TITLE", reverse: false },
    bestselling: { sortKey: "BEST_SELLING", reverse: false },
  };
  return map[sort] || map.manual;
}

/** Build ProductFilter[] from URL search params (Storefront API). */
export function parseCollectionProductFilters(searchParams) {
  const sp = searchParams || {};
  const get = (k) => {
    const v = sp[k];
    return Array.isArray(v) ? v[0] : v;
  };
  const filters = [];
  if (get("available") === "1") {
    filters.push({ available: true });
  }
  const min = parseFloat(get("minPrice"));
  const max = parseFloat(get("maxPrice"));
  if (!Number.isNaN(min) || !Number.isNaN(max)) {
    const price = {};
    if (!Number.isNaN(min)) price.min = min;
    if (!Number.isNaN(max)) price.max = max;
    if (Object.keys(price).length) filters.push({ price });
  }
  return filters;
}

export function getViewMode(searchParams) {
  const raw = searchParams?.view;
  const v = Array.isArray(raw) ? raw[0] : raw;
  return v === "list" ? "list" : "grid";
}

export function getCursor(searchParams) {
  const raw = searchParams?.cursor;
  const v = Array.isArray(raw) ? raw[0] : raw;
  return typeof v === "string" && v.length > 0 ? v : null;
}

export function flattenSearchParams(sp) {
  if (!sp || typeof sp !== "object") return {};
  const out = {};
  for (const [k, v] of Object.entries(sp)) {
    out[k] = Array.isArray(v) ? v[0] : v;
  }
  return out;
}

/** Next page with cursor (preserves sort/filters/view). */
export function collectionNextHref(handle, searchParams, endCursor) {
  const flat = flattenSearchParams(searchParams);
  const p = new URLSearchParams();
  Object.entries({ ...flat, cursor: endCursor }).forEach(([k, val]) => {
    if (val !== undefined && val !== null && String(val) !== "") {
      p.set(k, String(val));
    }
  });
  const q = p.toString();
  return q ? `/collections/${handle}?${q}` : `/collections/${handle}`;
}
