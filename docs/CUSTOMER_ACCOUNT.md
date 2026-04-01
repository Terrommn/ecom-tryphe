# Cuenta de cliente en storefront headless + Shopify

## MVP actual

- Enlaces a `https://{SHOPIFY_STORE_DOMAIN}/account/login`, `/account/register` y `/account/recover` (rutas clásicas del dominio de la tienda).
- Comprueba en el admin de Shopify qué experiencia de cuenta está activa (clásica vs nueva Customer Account).

## Opciones para avanzar (PDF sección 6)

1. **Solo redirección (menor esfuerzo)**  
   Mantener enlaces al dominio Shopify; el checkout ya identifica al cliente.

2. **Customer Account API (Shopify)**  
   Flujos OAuth y sesión alineados con Hydrogen / documentación oficial. Requiere configuración de cliente OAuth, URLs de callback y gestión de tokens en tu app Next.js.

3. **Multipass (legacy)**  
   Solo en casos específicos; no es el enfoque por defecto para B2C.

4. **Login social (Google/Facebook)**  
   Suele implementarse vía apps de Shopify o integraciones que soporten OAuth; validar compatibilidad con el tipo de cuenta activo en la tienda.

## Variables de entorno

- `SHOPIFY_STORE_DOMAIN`: usado en `app/account/page.js` para construir URLs (servidor).

## Referencias

- Documentación oficial Shopify: Customer Account, Storefront API, y checkout.
