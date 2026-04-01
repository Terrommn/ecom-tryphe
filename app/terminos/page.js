import { LegalPage } from "@/components/legal/LegalPage";

export const metadata = {
  title: "Términos y condiciones | Tienda",
  description: "Condiciones de uso y compra.",
};

export default function TermsPage() {
  return (
    <LegalPage title="Términos y condiciones" updated="[REVISAR FECHA]">
      <p className="text-[var(--oob-muted)] text-sm mb-6">
        [REVISIÓN JURÍDICA OBLIGATORIA] Borrador no vinculante.
      </p>
      <h2>Uso del sitio</h2>
      <p>
        El acceso y uso de este sitio implica la aceptación de estos términos. Debes ser mayor de edad
        o actuar con autorización.
      </p>
      <h2>Contratación</h2>
      <p>
        Los pedidos se formalizan al completar el checkout. Los precios e impuestos mostrados son los
        vigentes salvo error manifesto.
      </p>
      <h2>Propiedad intelectual</h2>
      <p>
        Marca, imágenes y contenidos están protegidos. No está permitida su reproducción sin
        autorización.
      </p>
      <h2>Limitación de responsabilidad</h2>
      <p>[REVISAR] Alcance según jurisdicción aplicable.</p>
      <h2>Legislación y jurisdicción</h2>
      <p>[REVISAR] Ley aplicable y tribunales competentes.</p>
    </LegalPage>
  );
}
