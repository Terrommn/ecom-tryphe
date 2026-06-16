"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

// ── Cookie helpers ─────────────────────────────────────────────────────────────
function readCookie(name) {
  const match = document.cookie.split(";").find((c) => c.trim().startsWith(name + "="));
  return match ? decodeURIComponent(match.trim().slice(name.length + 1)) : null;
}

function writeCookie(name, value, minutes) {
  const expires = new Date(Date.now() + minutes * 60 * 1000).toUTCString();
  document.cookie = `${name}=${encodeURIComponent(value)};expires=${expires};path=/;SameSite=Lax`;
}

function uuid() {
  if (typeof crypto !== "undefined" && crypto.randomUUID) return crypto.randomUUID();
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    return (c === "x" ? r : (r & 0x3) | 0x8).toString(16);
  });
}

// Shopify visitor cookie (1 año) y session cookie (30 min)
// Son los mismos que usa Shopify para atribuir visitas en su panel
function ensureShopifyCookies() {
  let visitorId = readCookie("shopify_y");
  if (!visitorId) {
    visitorId = uuid();
    writeCookie("shopify_y", visitorId, 525600); // 1 año
  }

  let sessionId = readCookie("shopify_s");
  if (!sessionId) {
    sessionId = uuid();
    writeCookie("shopify_s", sessionId, 30);
  }

  return { visitorId, sessionId };
}

// ── Envío a Shopify analytics ──────────────────────────────────────────────────
async function sendShopifyPageView({ path, visitorId, sessionId }) {
  try {
    await fetch("/api/shopify-analytics", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        url: window.location.href,
        path,
        title: document.title,
        referrer: document.referrer,
        visitorId,
        sessionId,
      }),
    });
  } catch {
    // Silencioso – no interrumpir la experiencia
  }
}

// ── Componente ─────────────────────────────────────────────────────────────────
export function PageViewTracker() {
  const pathname = usePathname();
  const isFirstRender = useRef(true);

  useEffect(() => {
    const { visitorId, sessionId } = ensureShopifyCookies();

    if (isFirstRender.current) {
      // En la primera carga el layout.js ya disparó Meta Pixel y GA.
      // Solo enviamos a Shopify analytics.
      isFirstRender.current = false;
      sendShopifyPageView({ path: pathname, visitorId, sessionId });
      return;
    }

    // ── Navegación SPA → re-disparar todos los pixels ──────────────────────
    if (typeof window.fbq === "function") {
      window.fbq("track", "PageView");
    }

    if (typeof window.gtag === "function") {
      window.gtag("event", "page_view", {
        page_path: pathname,
        page_title: document.title,
        page_location: window.location.href,
      });
    }

    sendShopifyPageView({ path: pathname, visitorId, sessionId });
  }, [pathname]);

  return null;
}
