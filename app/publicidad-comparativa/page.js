import { LegalPage } from "@/components/legal/LegalPage";
import { TrypheShell } from "@/components/layout/TrypheShell";

export const metadata = {
  title: "Acerca de la Publicidad Comparativa | Tryphe",
  description: "Información sobre el uso de publicidad comparativa en Tryphe.",
};

export default function PublicidadComparativaPage() {
  return (
    <TrypheShell>
      <div className="bg-[#faf9f7]">
        <LegalPage title="Acerca de la Publicidad Comparativa" updated="1 de enero de 2026">
          <p>
            Se hace del conocimiento al público consumidor que las marcas registradas mencionadas
            en este sitio con fines de publicidad comparativa, no deben de entenderse como licencias
            marcarias ni como relación comercial, de patrocinio, afiliación o asociación con dichas
            marcas o sus titulares.
          </p>
          <p>
            El uso de nombres de marcas de terceros en este sitio tiene como único propósito describir
            la similitud olfativa o inspiración de nuestras fragancias, conforme a lo permitido por la
            legislación mexicana en materia de propiedad industrial y competencia económica.
          </p>

          <h2>Fundamento legal</h2>
          <p>
            La publicidad comparativa en México está regulada por la Ley Federal de Protección al
            Consumidor y la Ley Federal de Competencia Económica. Toda referencia comparativa en este
            sitio cumple con los principios de veracidad, objetividad y no inducción al error.
          </p>

          <h2>Marcas propias</h2>
          <p>
            TRYPHÉ y todos sus productos son marcas y creaciones originales de Incubrands MX, S.A.P.I.
            de C.V. Las fragancias Tryphé son desarrolladas con ingredientes propios y no son réplicas
            ni imitaciones de ningún producto de terceros.
          </p>

          <h2>Contacto</h2>
          <p>
            Si tienes dudas sobre el uso de marcas en este sitio, contáctanos a{" "}
            <a href="mailto:info@tryphe.mx" className="underline">info@tryphe.mx</a>.
          </p>
        </LegalPage>
      </div>
    </TrypheShell>
  );
}
