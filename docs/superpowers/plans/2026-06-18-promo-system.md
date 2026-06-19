# Sistema de Promociones y Retencion de Carrito — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Automatizar las promos (2x100ml -> 60ml gratis, exit-intent 5%) y eliminar la necesidad de teclear codigos de descuento.

**Architecture:** Evento global `promo-2x100-unlocked` disparado desde ProductPurchase al detectar 2+ perfumes 100ml. PromoUnlockedPopup escucha ese evento y abre la galeria de 60ml. CartExitIntent detecta abandono en /cart y ofrece 5% extra. `applyDiscountAction` se modifica para acumular codigos en vez de reemplazar. CheckoutButton pasa todos los codigos al checkout URL.

**Tech Stack:** Next.js 15 (App Router, Server Actions), React 19, Shopify Storefront API (GraphQL), Tailwind CSS 4, Lucide icons.

---

### Task 1: Modificar `applyDiscountAction` para acumular codigos

**Files:**
- Modify: `app/actions/cart.js:107-123`

Este es el cambio fundacional — todo lo demas depende de que los codigos se acumulen.

- [ ] **Step 1: Leer el archivo actual y entender la funcion**

El archivo `app/actions/cart.js` contiene `applyDiscountAction(code)` en lineas 107-123. Actualmente pasa `[trimmed]` (un solo codigo), lo que REEMPLAZA cualquier codigo anterior. Necesitamos que ACUMULE.

- [ ] **Step 2: Modificar `applyDiscountAction` para acumular**

Editar `app/actions/cart.js` — reemplazar la funcion `applyDiscountAction` (lineas 107-123) con:

```javascript
export async function applyDiscountAction(code) {
  if (!isShopifyConfigured()) {
    return { ok: false, error: "Shopify no configurado" };
  }
  const cartId = await getCartCookieId();
  if (!cartId) return { ok: false, error: "Sin carrito" };
  const trimmed = (code || "").trim();
  if (!trimmed) return { ok: false, error: "Codigo vacio" };

  // Leer codigos existentes del carrito para acumular
  const currentCart = await getCart(cartId);
  const existingCodes = (currentCart?.discountCodes ?? [])
    .map((c) => c.code)
    .filter(Boolean);

  // No duplicar si ya esta aplicado
  if (existingCodes.includes(trimmed)) {
    return { ok: true, cart: currentCart };
  }

  const allCodes = [...existingCodes, trimmed];
  const { cart, userErrors } = await updateCartDiscountCodes(cartId, allCodes);
  if (userErrors?.length) {
    return { ok: false, error: userErrors.map((u) => u.message).join(", ") };
  }
  revalidatePath("/cart");
  return { ok: true, cart };
}
```

- [ ] **Step 3: Verificar que `getCart` esta importado**

En `app/actions/cart.js` linea 8, `getCart` ya esta importado: `import { addToCart, createCart, getCart, ... }`. Confirmado.

- [ ] **Step 4: Probar manualmente**

Ejecutar `npm run dev`, abrir la tienda, agregar un producto al carrito, ir al carrito, teclear un codigo en el formulario de descuento, verificar que aparece. Teclear otro codigo — verificar que AMBOS aparecen (no se reemplaza el primero).

- [ ] **Step 5: Commit**

```bash
git add app/actions/cart.js
git commit -m "feat: applyDiscountAction acumula codigos en vez de reemplazar"
```

---

### Task 2: Agregar server action `getAll60mlProducts`

**Files:**
- Modify: `app/actions/cart.js` (agregar al final)

- [ ] **Step 1: Agregar la funcion al final de `app/actions/cart.js`**

```javascript
export async function getAll60mlProducts() {
  if (!isShopifyConfigured()) return [];
  const { getProducts } = await import("@/lib/shopify");
  const allProducts = await getProducts();
  const results = [];
  for (const product of allProducts) {
    const variants = product.variants?.edges ?? [];
    const v60 = variants.find((e) => {
      const title = (e.node.title ?? "").toLowerCase();
      return title.includes("60");
    });
    if (v60) {
      results.push({
        id: product.id,
        handle: product.handle,
        title: product.title,
        featuredImage: product.featuredImage,
        variant60ml: {
          id: v60.node.id,
          title: v60.node.title,
          price: v60.node.price,
        },
      });
    }
  }
  return results;
}
```

- [ ] **Step 2: Verificar que compila**

Ejecutar `npm run dev` y verificar que no hay errores de compilacion en la consola.

- [ ] **Step 3: Commit**

```bash
git add app/actions/cart.js
git commit -m "feat: server action getAll60mlProducts filtra productos con variante 60ml"
```

---

### Task 3: Crear `Free60mlGallery.jsx`

**Files:**
- Create: `components/promo/Free60mlGallery.jsx`

- [ ] **Step 1: Crear el directorio promo**

```bash
mkdir -p components/promo
```

- [ ] **Step 2: Crear el componente**

Crear `components/promo/Free60mlGallery.jsx`:

```jsx
"use client";

import Image from "next/image";
import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { X } from "lucide-react";
import { addLineItemAction, applyDiscountAction } from "@/app/actions/cart";
import { formatMoney } from "@/lib/money";

export function Free60mlGallery({ products, onClose }) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [selectedId, setSelectedId] = useState(null);

  function handleSelect(product) {
    if (pending) return;
    setSelectedId(product.variant60ml.id);
    startTransition(async () => {
      await addLineItemAction(product.variant60ml.id, 1, [
        { key: "_promo", value: "free_60ml" },
      ]);
      await applyDiscountAction("DOSPERFUMES60ML");
      if (typeof window !== "undefined") {
        window.dispatchEvent(new Event("store-cart"));
      }
      onClose();
      router.push("/cart");
      router.refresh();
    });
  }

  if (!products?.length) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="relative mx-4 w-full max-w-2xl max-h-[85vh] overflow-y-auto bg-[#faf9f7] p-6 sm:p-8 shadow-2xl">
        <button
          onClick={onClose}
          className="absolute right-3 top-3 text-neutral-400 hover:text-neutral-950 transition-colors z-10"
          aria-label="Cerrar"
        >
          <X size={20} />
        </button>

        <p className="text-[9px] font-bold tracking-[0.4em] text-[#a17952] uppercase">
          Tu regalo
        </p>
        <h2 className="mt-2 font-serif text-2xl font-medium text-neutral-950">
          Elige tu perfume de 60ml gratis
        </h2>
        <p className="mt-2 text-sm text-neutral-500">
          Selecciona el que mas te guste. Se agregara a tu carrito sin costo.
        </p>

        <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 gap-4">
          {products.map((p) => {
            const img = p.featuredImage;
            const price = p.variant60ml?.price;
            const isThis = selectedId === p.variant60ml?.id;

            return (
              <div
                key={p.id}
                className="border border-neutral-200 bg-white overflow-hidden flex flex-col"
              >
                <div className="relative aspect-[3/4] bg-white">
                  <span className="absolute left-2 top-2 z-[1] bg-[#d4a574] px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-white">
                    Gratis
                  </span>
                  {img?.url ? (
                    <Image
                      src={img.url}
                      alt={img.altText || p.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 45vw, 200px"
                    />
                  ) : (
                    <div className="absolute inset-0 bg-gradient-to-br from-neutral-100 to-[#faf9f7] flex items-center justify-center">
                      <span className="text-neutral-400 text-xs">—</span>
                    </div>
                  )}
                </div>
                <div className="p-3 flex-1 flex flex-col">
                  <h3 className="text-sm font-medium text-neutral-950 leading-tight">
                    {p.title}
                  </h3>
                  {price && (
                    <p className="mt-1 text-xs text-neutral-400 line-through">
                      {formatMoney(price.amount, price.currencyCode)}
                    </p>
                  )}
                  <button
                    type="button"
                    disabled={pending}
                    onClick={() => handleSelect(p)}
                    className="mt-auto pt-3 w-full py-2.5 bg-neutral-950 text-[9px] font-bold uppercase tracking-[0.2em] text-white transition hover:bg-neutral-800 disabled:opacity-40"
                  >
                    {isThis && pending ? "Agregando..." : "Elegir este"}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 3: Verificar que compila**

Ejecutar `npm run dev`. El componente no esta montado aun, pero no debe dar errores de importacion.

- [ ] **Step 4: Commit**

```bash
git add components/promo/Free60mlGallery.jsx
git commit -m "feat: Free60mlGallery modal para elegir perfume 60ml gratis"
```

---

### Task 4: Crear `PromoUnlockedPopup.jsx`

**Files:**
- Create: `components/promo/PromoUnlockedPopup.jsx`

- [ ] **Step 1: Crear el componente**

Crear `components/promo/PromoUnlockedPopup.jsx`:

```jsx
"use client";

import { useState, useEffect, useRef } from "react";
import { X } from "lucide-react";
import { Free60mlGallery } from "./Free60mlGallery";
import { getAll60mlProducts } from "@/app/actions/cart";

function Confetti() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const colors = ["#d4a574", "#c9955f", "#fbbf24", "#f59e0b", "#a17952", "#34d399", "#f472b6"];
    const pieces = Array.from({ length: 50 }, () => {
      const d = document.createElement("div");
      const size = Math.random() * 8 + 4;
      Object.assign(d.style, {
        position: "absolute",
        width: `${size}px`,
        height: `${size}px`,
        backgroundColor: colors[Math.floor(Math.random() * colors.length)],
        borderRadius: Math.random() > 0.5 ? "50%" : "2px",
        left: `${Math.random() * 100}%`,
        top: "-10px",
        opacity: "1",
        pointerEvents: "none",
        zIndex: "20",
        transition: `all ${1.5 + Math.random()}s cubic-bezier(.25,.46,.45,.94)`,
      });
      el.appendChild(d);
      return d;
    });
    requestAnimationFrame(() => {
      pieces.forEach((d) => {
        d.style.top = `${70 + Math.random() * 50}%`;
        d.style.left = `${parseFloat(d.style.left) + (Math.random() - 0.5) * 40}%`;
        d.style.opacity = "0";
        d.style.transform = `rotate(${Math.random() * 720}deg)`;
      });
    });
    const t = setTimeout(() => pieces.forEach((d) => d.remove()), 3000);
    return () => { clearTimeout(t); pieces.forEach((d) => d.remove()); };
  }, []);
  return <div ref={ref} className="absolute inset-0 overflow-hidden pointer-events-none" />;
}

export function PromoUnlockedPopup() {
  const [visible, setVisible] = useState(false);
  const [showGallery, setShowGallery] = useState(false);
  const [products60ml, setProducts60ml] = useState([]);

  useEffect(() => {
    function handlePromoUnlocked() {
      try {
        if (sessionStorage.getItem("promo_2x100_shown")) return;
      } catch {}
      setVisible(true);
      try {
        sessionStorage.setItem("promo_2x100_shown", "1");
      } catch {}
      // Pre-cargar productos 60ml
      getAll60mlProducts().then(setProducts60ml).catch(() => {});
    }

    window.addEventListener("promo-2x100-unlocked", handlePromoUnlocked);
    return () => window.removeEventListener("promo-2x100-unlocked", handlePromoUnlocked);
  }, []);

  function handleChoose() {
    setVisible(false);
    setShowGallery(true);
  }

  function dismiss() {
    setVisible(false);
  }

  if (showGallery && products60ml.length > 0) {
    return (
      <Free60mlGallery
        products={products60ml}
        onClose={() => setShowGallery(false)}
      />
    );
  }

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="relative mx-4 w-full max-w-sm bg-[#faf9f7] p-8 shadow-2xl overflow-hidden">
        <Confetti />

        <button
          onClick={dismiss}
          className="absolute right-3 top-3 text-neutral-400 hover:text-neutral-950 transition-colors z-10"
          aria-label="Cerrar"
        >
          <X size={20} />
        </button>

        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 rounded-full bg-[#d4a574]/15 px-4 py-1.5 mb-4">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#d4a574] opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[#d4a574]" />
            </span>
            <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-[#a17952]">
              Promocion Desbloqueada
            </span>
          </div>

          <h2 className="font-serif text-2xl font-medium text-neutral-950">
            Has desbloqueado un regalo!
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-neutral-600">
            Por comprar 2 perfumes de 100ml, elige un perfume de 60ml{" "}
            <strong className="text-neutral-950">totalmente gratis</strong>.
          </p>

          <div className="mt-5 flex items-center gap-3 bg-neutral-50 border border-neutral-200 rounded px-4 py-3">
            <span className="text-lg">🎁</span>
            <div>
              <p className="text-sm font-semibold text-neutral-950">Perfume de 60ml a tu eleccion</p>
              <p className="text-[11px] text-neutral-500">Elige el que mas te guste</p>
            </div>
            <span className="ml-auto text-xs font-bold text-[#d4a574]">GRATIS</span>
          </div>

          <button
            type="button"
            onClick={handleChoose}
            className="mt-6 w-full py-4 bg-neutral-950 text-[10px] font-bold uppercase tracking-[0.25em] text-white transition hover:bg-neutral-800"
          >
            Elegir mi perfume gratis
          </button>

          <button
            onClick={dismiss}
            className="mt-3 w-full text-center text-xs text-neutral-400 hover:text-neutral-600 transition-colors"
          >
            Ahora no
          </button>
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add components/promo/PromoUnlockedPopup.jsx
git commit -m "feat: PromoUnlockedPopup popup global con confetti y enlace a galeria 60ml"
```

---

### Task 5: Montar `PromoUnlockedPopup` en layout.js

**Files:**
- Modify: `app/layout.js:4,77`

- [ ] **Step 1: Agregar import**

En `app/layout.js`, agregar despues de la linea 8 (import de PageViewTracker):

```javascript
import { PromoUnlockedPopup } from "@/components/promo/PromoUnlockedPopup";
```

- [ ] **Step 2: Montar el componente**

En `app/layout.js`, dentro del `<body>`, agregar despues de `<WelcomePopup />` (linea 78):

```jsx
<PromoUnlockedPopup />
```

- [ ] **Step 3: Commit**

```bash
git add app/layout.js
git commit -m "feat: montar PromoUnlockedPopup globalmente en layout"
```

---

### Task 6: Disparar evento promo desde `ProductPurchase.jsx`

**Files:**
- Modify: `components/product/ProductPurchase.jsx:76-97`

- [ ] **Step 1: Modificar la funcion `handleAdd`**

En `components/product/ProductPurchase.jsx`, reemplazar la funcion `handleAdd` (lineas 76-97) con:

```javascript
  function handleAdd() {
    if (!activeVariant?.id) return;
    setMsg(null);
    startTransition(async () => {
      const attrs = isFlashSale
        ? [{ key: "_source", value: "flash_sale" }]
        : [];
      const res = await addLineItemAction(activeVariant.id, 1, attrs);
      if (!res.ok) {
        setMsg(res.error || "No se pudo anadir");
        return;
      }
      // Auto-aplicar codigo RELAMPAGO si viene de oferta relampago
      if (isFlashSale) {
        await applyDiscountAction("RELAMPAGO");
      }
      if (typeof window !== "undefined") {
        window.dispatchEvent(new Event("store-cart"));

        // Detectar si se desbloqueo la promo 2x100ml
        if (!isFlashSale && res.cart) {
          const lines = res.cart.lines?.edges ?? [];
          let count100 = 0;
          let has60 = false;
          for (const { node: line } of lines) {
            const vTitle = (line.merchandise?.title ?? "").toLowerCase();
            const isFlash = (line.attributes ?? []).some(
              (a) => a.key === "_source" && a.value === "flash_sale"
            );
            if (vTitle.includes("100") && !isFlash) count100 += line.quantity;
            if (vTitle.includes("60")) has60 = true;
          }
          if (count100 >= 2 && !has60) {
            window.dispatchEvent(new Event("promo-2x100-unlocked"));
          }
        }
      }
      router.refresh();
    });
  }
```

- [ ] **Step 2: Verificar que compila y probar**

Ejecutar `npm run dev`. Navegar a un producto de 100ml, agregarlo dos veces. Verificar que el popup aparece despues del segundo add.

- [ ] **Step 3: Commit**

```bash
git add components/product/ProductPurchase.jsx
git commit -m "feat: disparar evento promo-2x100-unlocked al agregar 2do perfume 100ml"
```

---

### Task 7: Crear `CartExitIntent.jsx`

**Files:**
- Create: `components/cart/CartExitIntent.jsx`

- [ ] **Step 1: Crear el componente**

Crear `components/cart/CartExitIntent.jsx`:

```jsx
"use client";

import { useState, useEffect, useCallback } from "react";
import { X } from "lucide-react";
import { useRouter } from "next/navigation";
import { applyDiscountAction } from "@/app/actions/cart";

export function CartExitIntent({ hasItems }) {
  const router = useRouter();
  const [visible, setVisible] = useState(false);
  const [applied, setApplied] = useState(false);
  const [applying, setApplying] = useState(false);

  const showPopup = useCallback(() => {
    if (!hasItems) return;
    try {
      if (sessionStorage.getItem("exit_intent_shown")) return;
    } catch {}
    setVisible(true);
    try {
      sessionStorage.setItem("exit_intent_shown", "1");
    } catch {}
  }, [hasItems]);

  useEffect(() => {
    if (!hasItems) return;

    // Desktop: mouse sale del viewport por arriba
    function handleMouseLeave(e) {
      if (e.clientY <= 0) {
        showPopup();
      }
    }

    document.documentElement.addEventListener("mouseleave", handleMouseLeave);
    return () => {
      document.documentElement.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [hasItems, showPopup]);

  async function handleApply() {
    setApplying(true);
    const res = await applyDiscountAction("YACASITERMINAS");
    setApplying(false);
    if (res.ok) {
      setApplied(true);
      setTimeout(() => {
        setVisible(false);
        router.refresh();
      }, 1500);
    }
  }

  function handleDismiss() {
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="relative mx-4 w-full max-w-sm bg-[#faf9f7] p-8 shadow-2xl">
        <button
          onClick={handleDismiss}
          className="absolute right-3 top-3 text-neutral-400 hover:text-neutral-950 transition-colors"
          aria-label="Cerrar"
        >
          <X size={20} />
        </button>

        {!applied ? (
          <>
            <p className="text-[9px] font-bold tracking-[0.4em] text-[#a17952] uppercase">
              Oferta especial
            </p>
            <h2 className="mt-3 font-serif text-2xl font-medium text-neutral-950">
              No te vayas!
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-neutral-600">
              Te damos un{" "}
              <strong className="text-neutral-950">5% adicional</strong>{" "}
              para que completes tu compra.
            </p>

            <div className="mt-5 flex items-center gap-3 bg-neutral-50 border border-neutral-200 rounded px-4 py-3">
              <span className="text-lg">🏷️</span>
              <div>
                <p className="text-sm font-semibold text-neutral-950">5% de descuento extra</p>
                <p className="text-[11px] text-neutral-500">Se aplica automaticamente</p>
              </div>
            </div>

            <button
              type="button"
              disabled={applying}
              onClick={handleApply}
              className="mt-6 w-full py-4 bg-neutral-950 text-[10px] font-bold uppercase tracking-[0.25em] text-white transition hover:bg-neutral-800 disabled:opacity-40"
            >
              {applying ? "Aplicando..." : "Aplicar descuento"}
            </button>

            <button
              onClick={handleDismiss}
              className="mt-3 w-full text-center text-xs text-neutral-400 hover:text-neutral-600 transition-colors"
            >
              No, gracias
            </button>
          </>
        ) : (
          <div className="text-center py-4">
            <span className="text-3xl">✅</span>
            <h2 className="mt-3 font-serif text-xl font-medium text-neutral-950">
              Descuento aplicado!
            </h2>
            <p className="mt-2 text-sm text-neutral-600">
              Tu 5% extra ya esta en tu carrito.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add components/cart/CartExitIntent.jsx
git commit -m "feat: CartExitIntent popup exit-intent con 5% YACASITERMINAS"
```

---

### Task 8: Montar `CartExitIntent` en la pagina del carrito

**Files:**
- Modify: `app/cart/page.js`

- [ ] **Step 1: Agregar import y pasar datos**

En `app/cart/page.js`, agregar el import despues de la linea 7 (import de ProductCard):

```javascript
import { CartExitIntent } from "@/components/cart/CartExitIntent";
```

- [ ] **Step 2: Montar el componente dentro del JSX**

En `app/cart/page.js`, agregar `<CartExitIntent>` justo despues del `<TrypheShell>` de apertura (linea 22), antes del `<div className="bg-[#faf9f7]">`:

```jsx
<CartExitIntent hasItems={!!cart?.lines?.edges?.length} />
```

El return queda asi:

```jsx
    <TrypheShell>
      <CartExitIntent hasItems={!!cart?.lines?.edges?.length} />
      <div className="bg-[#faf9f7]">
```

- [ ] **Step 3: Commit**

```bash
git add app/cart/page.js
git commit -m "feat: montar CartExitIntent en pagina de carrito"
```

---

### Task 9: Simplificar banners de promo en `CartLines.jsx`

**Files:**
- Modify: `components/cart/CartLines.jsx:15,111-176`

- [ ] **Step 1: Eliminar la constante PROMO_CODE**

En `components/cart/CartLines.jsx`, eliminar la linea 15:

```javascript
const PROMO_CODE = "DOSPERFUMES60ML";
```

- [ ] **Step 2: Reemplazar el banner `showPromo` (lineas 112-164)**

Reemplazar el bloque `{showPromo && (...)}` con una version simplificada sin mencion de codigos y con un boton que dispare la galeria:

```jsx
      {showPromo && (
        <div className="relative overflow-hidden border border-neutral-200 bg-white p-6 sm:p-8 rounded-lg shadow-sm">
          <Confetti />
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 rounded-full bg-[#d4a574]/15 px-4 py-1.5 mb-4">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#d4a574] opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[#d4a574]" />
              </span>
              <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-[#a17952]">
                Promocion Desbloqueada
              </span>
            </div>

            <h3 className="font-serif text-2xl sm:text-3xl font-medium text-neutral-950 leading-tight">
              Has desbloqueado un regalo exclusivo
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-neutral-600 max-w-lg">
              Por comprar 2 perfumes de 100ml, te has ganado{" "}
              <strong className="text-neutral-950">cualquier perfume de 60ml totalmente gratis</strong>.
              El descuento se aplica automaticamente.
            </p>

            <div className="mt-5">
              <div className="flex items-center gap-3 bg-neutral-50 border border-neutral-200 rounded px-4 py-3">
                <span className="text-lg">🎁</span>
                <div>
                  <p className="text-sm font-semibold text-neutral-950">Perfume de 60ml a tu eleccion</p>
                  <p className="text-[11px] text-neutral-500">Agrega cualquier perfume en presentacion de 60ml a tu carrito</p>
                </div>
                <span className="ml-auto text-xs font-bold text-[#d4a574]">GRATIS</span>
              </div>
            </div>

            <Link
              href="/collections"
              className="mt-6 inline-block w-full sm:w-auto text-center px-8 py-4 bg-neutral-950 text-white text-[10px] font-bold uppercase tracking-[0.25em] transition hover:bg-neutral-800"
            >
              Elegir mi perfume de 60ml gratis
            </Link>
          </div>
        </div>
      )}
```

- [ ] **Step 3: Reemplazar el banner `showPromoConfirm` (lineas 166-177)**

Reemplazar el bloque `{showPromoConfirm && (...)}` con version sin mencion de codigos:

```jsx
      {showPromoConfirm && (
        <div className="flex items-center gap-3 rounded-lg border border-green-200 bg-green-50 px-5 py-4">
          <span className="text-xl">✅</span>
          <div>
            <p className="text-sm font-semibold text-neutral-900">Promocion activada</p>
            <p className="text-[11px] text-neutral-600">
              Tu perfume de 60ml va gratis con tu pedido. El descuento se aplica automaticamente al pagar.
            </p>
          </div>
        </div>
      )}
```

- [ ] **Step 4: Tambien limpiar el resumen de precio de 60ml (lineas 297-302)**

El bloque que muestra el precio del 60ml con mencion de promo se queda igual, ya no menciona codigos:

```jsx
        {showPromoConfirm && price60ml ? (
          <div className="flex justify-between text-neutral-400">
            <span>Perfume 60ml <span className="text-[#d4a574] font-medium">(gratis con tu promo)</span></span>
            <span className="line-through">{formatMoney(price60ml.amount, price60ml.currencyCode)}</span>
          </div>
        ) : null}
```

Este bloque ya esta bien — no menciona codigos. Dejarlo como esta.

- [ ] **Step 5: Verificar que compila y probar**

Ejecutar `npm run dev`, ir al carrito con 2+ perfumes de 100ml, verificar que los banners NO mencionan codigos.

- [ ] **Step 6: Commit**

```bash
git add components/cart/CartLines.jsx
git commit -m "feat: simplificar banners de promo, eliminar referencias a codigos manuales"
```

---

### Task 10: Modificar `CheckoutButton` para pasar multiples codigos

**Files:**
- Modify: `components/cart/CheckoutButton.jsx`

- [ ] **Step 1: Actualizar `CheckoutButton` para leer codigos del carrito**

El componente necesita recibir los discount codes del carrito y pasarlos al checkout URL. Reemplazar todo `components/cart/CheckoutButton.jsx` con:

```jsx
"use client";

export function CheckoutButton({ checkoutUrl, disabled, discountCodes }) {
  if (disabled || !checkoutUrl) {
    return (
      <button
        type="button"
        disabled
        className="w-full bg-neutral-500 px-8 py-4 text-[10px] font-bold uppercase tracking-[0.25em] text-white cursor-not-allowed"
      >
        Proceder al pago
      </button>
    );
  }

  function handleCheckout() {
    let url = checkoutUrl;
    // Pasar todos los codigos de descuento acumulados al checkout URL
    const codes = (discountCodes ?? [])
      .map((c) => c.code)
      .filter(Boolean);
    try {
      const pending = localStorage.getItem("pending_discount");
      if (pending && !codes.includes(pending)) {
        codes.push(pending);
      }
      localStorage.removeItem("pending_discount");
    } catch {}
    if (codes.length > 0) {
      const param = codes.join(",");
      url += (url.includes("?") ? "&" : "?") + `discount=${encodeURIComponent(param)}`;
    }
    window.location.href = url;
  }

  return (
    <button
      type="button"
      onClick={handleCheckout}
      className="flex w-full items-center justify-center bg-neutral-950 px-8 py-4 text-[10px] font-bold uppercase tracking-[0.25em] text-white transition hover:bg-neutral-800"
    >
      Proceder al pago
    </button>
  );
}
```

- [ ] **Step 2: Pasar `discountCodes` desde `cart/page.js`**

En `app/cart/page.js`, actualizar la linea del `CheckoutButton` (linea 40) para pasar los codigos:

```jsx
<CheckoutButton
  checkoutUrl={cart?.checkoutUrl}
  disabled={!cart?.lines?.edges?.length}
  discountCodes={cart?.discountCodes}
/>
```

- [ ] **Step 3: Verificar que compila**

Ejecutar `npm run dev`, ir al carrito, verificar que el boton "Proceder al pago" sigue funcionando.

- [ ] **Step 4: Commit**

```bash
git add components/cart/CheckoutButton.jsx app/cart/page.js
git commit -m "feat: CheckoutButton pasa multiples codigos acumulados al checkout URL"
```

---

### Task 11: Auto-aplicar `BIENVENIDO5` en WelcomePopup

**Files:**
- Modify: `components/layout/WelcomePopup.jsx:29-41`

Actualmente el WelcomePopup muestra el codigo para que el usuario lo copie. El cliente quiere que TODO sea automatico.

- [ ] **Step 1: Agregar import de applyDiscountAction**

En `components/layout/WelcomePopup.jsx`, agregar en los imports (despues de linea 4):

```javascript
import { applyDiscountAction } from "@/app/actions/cart";
```

- [ ] **Step 2: Auto-aplicar el codigo al suscribirse**

En la funcion `handleSubmit` (lineas 29-41), agregar la llamada a `applyDiscountAction` despues de `setSubmitted(true)`:

```javascript
  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const result = await subscribeAction(email);
    setLoading(false);
    if (result.ok) {
      setSubmitted(true);
      localStorage.setItem(LS_KEY, "1");
      // Auto-aplicar descuento sin que el cliente teclee nada
      applyDiscountAction(DISCOUNT_CODE).catch(() => {});
    } else {
      setError(result.error);
    }
  }
```

- [ ] **Step 3: Actualizar el mensaje de confirmacion**

En el JSX de la seccion `submitted` (lineas 105-131), cambiar el texto para que diga que ya esta aplicado automaticamente. Reemplazar el bloque `{submitted ? (...)}` con:

```jsx
          <div className="text-center">
            <p className="text-[9px] font-bold tracking-[0.4em] text-neutral-500 uppercase">
              Descuento aplicado
            </p>
            <h2 className="mt-3 font-serif text-2xl font-medium text-neutral-950">
              Gracias!
            </h2>
            <p className="mt-3 text-sm text-neutral-600">
              Tu <strong className="text-neutral-950">5% de descuento</strong> ya esta aplicado automaticamente en tu carrito.
            </p>
            <div className="mt-4 inline-block border-2 border-dashed border-[#d4a574] px-6 py-3 font-mono text-lg font-bold tracking-widest text-[#d4a574]">
              {DISCOUNT_CODE}
            </div>
            <p className="mt-2 text-xs text-neutral-400">
              Aplicado automaticamente
            </p>
            <button
              onClick={dismiss}
              className="mt-6 text-sm font-medium text-neutral-950 underline underline-offset-4 hover:text-neutral-600 transition-colors"
            >
              Cerrar
            </button>
          </div>
```

- [ ] **Step 4: Commit**

```bash
git add components/layout/WelcomePopup.jsx
git commit -m "feat: WelcomePopup auto-aplica BIENVENIDO5 sin que el cliente teclee"
```

---

### Task 12: Prueba integral de todo el flujo

**Files:**
- Ninguno (solo testing manual)

- [ ] **Step 1: Ejecutar `npm run build` para verificar que todo compila**

```bash
npm run build
```

Esperar que termine sin errores. Si hay errores de compilacion, corregirlos antes de continuar.

- [ ] **Step 2: Probar flujo completo con `npm run dev`**

```bash
npm run dev
```

Abrir http://localhost:3000 y ejecutar este flujo:

1. **WelcomePopup:** Esperar 3 segundos, popup aparece, suscribirse con email -> verificar que dice "aplicado automaticamente".
2. **Agregar 1er perfume 100ml:** Ir a un producto, seleccionar variante 100ml, agregar al carrito. No debe pasar nada especial.
3. **Agregar 2do perfume 100ml:** Agregar otro (o el mismo). Debe aparecer popup "Has desbloqueado un regalo!" con confetti.
4. **Elegir 60ml:** Click en "Elegir mi perfume gratis" -> galeria con productos 60ml -> click "Elegir este" -> se agrega al carrito, redirige a /cart.
5. **Carrito:** Verificar banner verde "Promocion activada" sin mencion de codigos. Verificar que precio de 60ml aparece tachado.
6. **Exit-intent:** Mover mouse fuera del viewport (arriba) -> popup "No te vayas!" -> click "Aplicar descuento" -> mensaje de confirmacion.
7. **Checkout:** Click "Proceder al pago" -> verificar que la URL del checkout contiene `?discount=...` con los codigos acumulados.

- [ ] **Step 3: Verificar codigos en el resumen del carrito**

En la pagina del carrito, la seccion "Codigos: ..." debe mostrar todos los codigos aplicados (BIENVENIDO5, DOSPERFUMES60ML, YACASITERMINAS).

- [ ] **Step 4: Probar edge cases**

- Agregar un solo perfume 100ml -> NO debe aparecer popup de promo.
- Agregar 2 perfumes 100ml desde flash sale (con `?oferta=relampago`) -> NO debe disparar la promo 2x100ml (son flash sale, no regular).
- Exit-intent: salir y volver al carrito en la misma sesion -> NO debe aparecer de nuevo.
- Promo popup: volver a agregar un 100ml despues de haber visto el popup -> NO debe reaparecer en la misma sesion.

- [ ] **Step 5: Commit final**

```bash
git add -A
git commit -m "feat: sistema completo de promociones y retencion de carrito

- Popup promo 2x100ml con confetti y galeria de 60ml
- Exit-intent con 5% YACASITERMINAS
- Auto-aplicacion de todos los descuentos (sin codigos manuales)
- Codigos acumulables: BIENVENIDO5, DOSPERFUMES60ML, YACASITERMINAS, RELAMPAGO
- CheckoutButton pasa todos los codigos al checkout URL"
```
