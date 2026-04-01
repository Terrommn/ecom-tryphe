import { LegalPage } from "@/components/legal/LegalPage";

export const metadata = {
  title: "Acerca de nosotros | Tienda",
  description: "Historia y valores de la marca.",
};

export default function AboutPage() {
  return (
    <LegalPage title="Acerca de nosotros" updated={null}>
      <p>
        Este contenido es un marcador de posición. Sustitúyelo por la historia de tu marca, equipo y
        valores cuando definas la narrativa.
      </p>
      <h2>Próximos pasos</h2>
      <p>
        Añade secciones (historia, misión, proceso) y medios cuando tengas fotos o vídeo aprobados.
      </p>
    </LegalPage>
  );
}
