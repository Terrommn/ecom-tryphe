import { LegalPage } from "@/components/legal/LegalPage";

export const metadata = {
  title: "Política de privacidad | Tienda",
  description: "Uso de datos personales y cookies.",
};

export default function PrivacyPage() {
  return (
    <LegalPage title="Política de privacidad" updated="[REVISAR FECHA]">
      <p className="text-[var(--oob-muted)] text-sm mb-6">
        [REVISIÓN JURÍDICA OBLIGATORIA] Borrador no vinculante.
      </p>
      <h2>Responsable</h2>
      <p>[REVISAR] Identidad del responsable del tratamiento y contacto (DPO si aplica).</p>
      <h2>Datos que recopilamos</h2>
      <p>
        Datos identificativos, de contacto, transaccionales y de navegación según el uso del sitio y del
        checkout Shopify.
      </p>
      <h2>Finalidad y legitimación</h2>
      <p>Gestión de pedidos, atención al cliente, cumplimiento legal y, si consientes, marketing.</p>
      <h2>Cookies y tecnologías similares</h2>
      <p>
        El sitio puede usar cookies técnicas y de analítica. Configura tu banner de cookies y lista
        aquí las categorías.
      </p>
      <h2>Destinatarios</h2>
      <p>
        Proveedores que intervienen en el encargo del tratamiento (hosting, email, Shopify, pasarela de
        pago).
      </p>
      <h2>Derechos</h2>
      <p>
        Acceso, rectificación, supresión, oposición, limitación, portabilidad y reclamación ante la
        autoridad de protección de datos.
      </p>
      <h2>Conservación</h2>
      <p>[REVISAR] Plazos de conservación por finalidad.</p>
    </LegalPage>
  );
}
