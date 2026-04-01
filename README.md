# ecom-tryphe

Tienda headless **Tryphe** con Next.js 15 (App Router) y la [Shopify Storefront GraphQL API](https://shopify.dev/docs/api/storefront) (token de acceso público). Misma base que el proyecto hermano `ecom-out-of-bouds`: sin Hydrogen ni Liquid.

## Configuración

1. En esta carpeta, copia `.env.example` a `.env.local` y completa:

   - `SHOPIFY_STORE_DOMAIN` — solo el hostname (ej. `tu-tienda.myshopify.com`).
   - `SHOPIFY_STOREFRONT_ACCESS_TOKEN` — token público del canal Headless / Storefront API.
   - `NEXT_PUBLIC_SITE_URL` — URL del sitio (local: `http://localhost:3000`).

2. Instala y arranca:

   ```bash
   npm install
   npm run dev
   ```

   Tras crear o editar `.env.local`, reinicia `npm run dev` para que Next cargue las variables.

3. Opcional: `MAX_PRODUCTS` limita cuántos productos se piden en la home (por defecto 500).

### Branding en assets

Los logos en `public/brand/` siguen siendo los del proyecto de referencia. Sustituye `wordmark-full.svg`, `full-logo.png`, etc. por el wordmark de **Tryphe** cuando tengas los archivos finales.

## Estructura útil

- `lib/shopify.js` — cliente GraphQL y consultas
- `app/actions/cart.js` — acciones de carrito
- `app/page.js` — home
- `app/products/[handle]/page.js` — PDP
- `app/collections/` — listado y colección por handle
- `app/cart/page.js` — carrito

## Despliegue (Vercel u otro)

Define las mismas variables de entorno en el panel del proveedor y ejecuta `npm run build`.
# ecom-tryphe
