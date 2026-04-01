const KEY = "store_wishlist";

function read() {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function write(items) {
  localStorage.setItem(KEY, JSON.stringify(items));
  window.dispatchEvent(new Event("store-wishlist"));
}

/** @typedef {{ handle: string, title: string }} WishlistItem */

export function getWishlistItems() {
  return read();
}

export function addWishlistItem(handle, title) {
  const items = read();
  if (items.some((x) => x.handle === handle)) return items;
  items.push({ handle, title });
  write(items);
  return items;
}

export function removeWishlistItem(handle) {
  const items = read().filter((x) => x.handle !== handle);
  write(items);
  return items;
}

export function isInWishlist(handle) {
  return read().some((x) => x.handle === handle);
}
