import { LegalPage } from "@/components/legal/LegalPage";

export const metadata = {
  title: "Política de envíos | Tienda",
  description: "Métodos, plazos y costes de envío.",
};

export default function ShippingPage() {
  return (
    <LegalPage title="Política de envíos" updated="[REVISAR FECHA]">
      <p className="text-[var(--oob-muted)] text-sm mb-6">
        [REVISIÓN JURÍDICA / OPERACIONES] Texto placeholder.
      </p>
      <h2>Métodos de envío</h2>
      <p>Estándar, express [REVISAR] según transportistas contratados.</p>
      <h2>Tiempos por zona (México)</h2>
      <p>
        Ciudades principales [X] días hábiles; resto del país [Y]. [REVISAR tabla detallada según
        paquetería]
      </p>
      <h2>Costes</h2>
      <p>
        [REVISAR] Tabla de precios en MXN. Envío gratis a partir del umbral indicado en la barra
        superior / carrito (variable{" "}
        <code className="text-sm">NEXT_PUBLIC_FREE_SHIPPING_THRESHOLD_MXN</code>, por defecto
        alineado a $3,000 MXN en texto promocional).
      </p>
      <h2>Rastreo</h2>
      <p>Recibirás un enlace de seguimiento cuando el pedido salga del almacén.</p>
      <h2>Envíos internacionales</h2>
      <p>[REVISAR] Países, aduanas e impuestos a cargo del cliente si procede.</p>
    </LegalPage>
  );
}
