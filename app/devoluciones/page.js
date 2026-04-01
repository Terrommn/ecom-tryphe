import { LegalPage } from "@/components/legal/LegalPage";

export const metadata = {
  title: "Devoluciones y cambios | Tienda",
  description: "Plazos, condiciones y proceso de devolución.",
};

export default function ReturnsPage() {
  return (
    <LegalPage title="Devoluciones y cambios" updated="[REVISAR FECHA]">
      <p className="text-[var(--oob-muted)] text-sm mb-6">
        [REVISIÓN JURÍDICA] Texto placeholder según PDF sección 5.4.
      </p>
      <h2>Plazo</h2>
      <p>
        Generalmente 30 días desde la recepción del producto, salvo excepciones indicadas en el checkout
        o en productos de liquidación.
      </p>
      <h2>Condiciones</h2>
      <p>
        El artículo debe estar sin uso, con etiquetas y embalaje original cuando sea posible. [REVISAR]
      </p>
      <h2>Proceso</h2>
      <ol className="list-decimal pl-5 space-y-2">
        <li>Contacta con nosotros indicando número de pedido.</li>
        <li>Te indicamos la dirección de devolución o etiqueta.</li>
        <li>Una vez recibido e inspeccionado, procedemos al reembolso o cambio.</li>
      </ol>
      <h2>Formulario de devolución</h2>
      <p>
        [REVISAR] Enlaza aquí un formulario Typeform/Google o email dedicado para tickets de
        devolución.
      </p>
      <h2>Outlet y liquidación</h2>
      <p>[REVISAR] Excepciones para productos rebajados.</p>
    </LegalPage>
  );
}
