# Sistema de Promociones y Retencion de Carrito - Spec

**Fecha:** 2026-06-18
**Proyecto:** ecom-tryphe (Next.js 15 + Shopify Storefront API)

---

## Objetivo

Aumentar la conversion del checkout automatizando promociones y reteniendo usuarios que abandonan el carrito. Todos los descuentos se aplican automaticamente — el cliente NO teclea codigos.

---

## Feature 1: Popup "Desbloqueaste tu 60ml gratis"

### Trigger
- Se dispara inmediatamente despues de que `addLineItemAction` confirma que el carrito tiene 2+ perfumes de 100ml a precio regular (no flash sale).
- Se usa un evento custom `promo-2x100-unlocked` via `window.dispatchEvent`.
- Si el usuario ya tiene 2+ de 100ml al entrar al carrito y no ha elegido su 60ml, se muestra un banner recordatorio (ya existe parcialmente en CartLines).

### Componente: `PromoUnlockedPopup.jsx`
- Client component global, montado en `layout.js`.
- Escucha el evento `promo-2x100-unlocked`.
- Modal con:
  - Confetti (reutilizar la funcion existente de CartLines).
  - Titulo: "Has desbloqueado un regalo!"
  - Texto: "Por comprar 2 perfumes de 100ml, elige un perfume de 60ml totalmente gratis"
  - Boton CTA: "Elegir mi perfume gratis" -> abre la galeria de 60ml (Free60mlGallery)
- Estilo: mismo patron del WelcomePopup — `bg-black/40 backdrop-blur-sm`, card `bg-[#faf9f7]`, tipografia serif.
- Se muestra una vez por sesion (`sessionStorage`). Si el usuario ya eligio su 60ml, no vuelve a aparecer.

### Logica en ProductPurchase.jsx
- Despues de `addLineItemAction` exitoso, contar cuantos 100ml hay en el carrito (del response `res.cart`).
- Si `count100ml >= 2` y no hay 60ml en el carrito -> `window.dispatchEvent(new Event("promo-2x100-unlocked"))`.

---

## Feature 2: Galeria de 60ml (modal)

### Server Action: `getAll60mlProducts()`
- En `app/actions/cart.js`.
- Llama a `getProducts()` (ya existe en shopify.js, trae todos los productos).
- Filtra: solo productos que tengan al menos una variante con "60" en el titulo.
- Retorna array de `{ id, handle, title, featuredImage, variant60ml: { id, title, price } }`.

### Componente: `Free60mlGallery.jsx`
- Client component, modal/overlay.
- Recibe los productos 60ml como prop (pre-cargados).
- Grid: 2 columnas mobile, 3 desktop.
- Cada card: imagen, nombre, precio tachado + etiqueta "GRATIS".
- Boton "Elegir este" por producto que:
  1. Llama `addLineItemAction(variantId60ml, 1, [{ key: "_promo", value: "free_60ml" }])`.
  2. Auto-aplica `DOSPERFUMES60ML` via `applyDiscountAction("DOSPERFUMES60ML")`.
  3. Cierra el modal.
  4. Redirige al carrito con `router.push("/cart")`.

---

## Feature 3: Auto-aplicacion de descuentos

### Principio
Ningun descuento requiere que el cliente teclee nada. Todo se aplica via Storefront API o se pasa en el checkout URL.

### Codigos y cuando se aplican

| Codigo | Descuento | Trigger automatico |
|---|---|---|
| `DOSPERFUMES60ML` | 60ml gratis con 2x100ml | Al elegir el 60ml en la galeria |
| `YACASITERMINAS` | 5% adicional | Al aceptar el exit-intent |
| `BIENVENIDO5` | 5% primera compra | Al suscribirse en WelcomePopup (ya existe) |
| `RELAMPAGO` | 15% flash sale | Al agregar desde oferta relampago (ya existe) |

### Acumulacion
Todos los codigos son acumulables entre si. Se pasan como array a `updateCartDiscountCodes`.

### Implementacion
- `applyDiscountAction` se modifica para ACUMULAR codigos en vez de reemplazar. Actualmente pasa `[trimmed]` (un solo codigo). Se cambia para leer los codigos existentes del carrito y agregar el nuevo sin borrar los anteriores.
- `CheckoutButton` ya pasa `pending_discount` al checkout URL como fallback.

---

## Feature 4: Exit-Intent del Carrito

### Componente: `CartExitIntent.jsx`
- Client component, montado en `app/cart/page.js`.
- Una sola vez por sesion (`sessionStorage.getItem("exit_intent_shown")`).

### Triggers de deteccion
- **Desktop:** `mouseleave` en `document.documentElement` (mouse sale por arriba del viewport).
- **Mobile:** Intercepcion del boton back via `popstate` event, y tambien un boton "X" visible en el header del carrito.
- Solo se activa si el carrito tiene al menos 1 producto.

### UI del popup
- Fondo: `bg-black/40 backdrop-blur-sm` (mismo patron).
- Card con:
  - Titulo: "No te vayas!"
  - Texto: "Te damos un 5% adicional para que completes tu compra"
  - Boton primario: "Aplicar descuento" -> llama `applyDiscountAction("YACASITERMINAS")`, cierra popup, muestra feedback.
  - Boton secundario: "No, gracias" -> cierra popup, navega fuera.
- `sessionStorage.setItem("exit_intent_shown", "1")` al mostrarse.

---

## Feature 5: Limpieza de CartLines.jsx

### Cambios
- Eliminar toda referencia visual al codigo `DOSPERFUMES60ML` (el bloque que dice "Aplica el codigo...").
- El banner de promo desbloqueada se simplifica: solo dice que puede elegir su 60ml gratis con boton a la galeria.
- El banner de promo confirmada se simplifica: "Promocion activa — tu 60ml va gratis con tu pedido" sin mencion de codigos.
- El formulario de codigo de descuento se mantiene (por si el usuario tiene otro codigo).

---

## Archivos a crear

| Archivo | Descripcion |
|---|---|
| `components/promo/PromoUnlockedPopup.jsx` | Popup global de promo 2x100ml desbloqueada |
| `components/promo/Free60mlGallery.jsx` | Modal con galeria de productos 60ml |
| `components/cart/CartExitIntent.jsx` | Popup exit-intent con 5% YACASITERMINAS |

## Archivos a modificar

| Archivo | Cambios |
|---|---|
| `app/actions/cart.js` | Agregar `getAll60mlProducts()`, modificar `applyDiscountAction` para acumular codigos |
| `components/product/ProductPurchase.jsx` | Disparar evento `promo-2x100-unlocked` al agregar 2do 100ml |
| `components/cart/CartLines.jsx` | Quitar referencia a codigos manuales, simplificar banners, auto-aplicar descuento al elegir 60ml |
| `app/layout.js` | Montar `PromoUnlockedPopup` |
| `app/cart/page.js` | Montar `CartExitIntent`, pre-cargar productos 60ml para la galeria |
| `components/cart/CheckoutButton.jsx` | Asegurar que pase multiples codigos acumulados al checkout URL |

---

## Flujo completo del usuario

```
1. Agrega 1er perfume 100ml -> nada especial
2. Agrega 2do perfume 100ml -> popup "Desbloqueaste tu regalo!"
   -> CTA "Elegir mi perfume gratis"
   -> Se abre galeria de 60ml (modal)
   -> Elige uno -> se agrega al carrito + auto-aplica DOSPERFUMES60ML
   -> Va al carrito
3. En el carrito -> banner "Promocion activa, tu 60ml va gratis"
   -> Descuentos aplicados automaticamente
4. Intenta irse -> popup "No te vayas! 5% extra con YACASITERMINAS"
   -> Acepta -> se aplica automatico, sigue en carrito
   -> Rechaza -> navega fuera
5. Procede al pago -> todos los codigos van al checkout URL automaticamente
```

---

## Consideraciones tecnicas

- **Acumulacion de codigos:** Shopify Storefront API soporta multiples discount codes en un cart. Se pasan como array.
- **Identificacion de 60ml:** Por titulo de variante conteniendo "60" (case insensitive). No se necesita coleccion separada en Shopify.
- **Persistencia de sesion:** `sessionStorage` para popups (una vez por sesion). `localStorage` para welcome popup (una vez por siempre).
- **No afecta Shopify admin:** Todo es logica del frontend. El cliente confirmo que no importa si estas promos no se ven en el admin de Shopify.
- **El codigo de descuento debe existir en Shopify:** Los codigos DOSPERFUMES60ML, YACASITERMINAS, BIENVENIDO5, RELAMPAGO deben estar creados en Shopify > Descuentos para que funcionen en el checkout.
