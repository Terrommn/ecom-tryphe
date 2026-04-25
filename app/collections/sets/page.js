import { CollectionSetsPage } from "@/components/collections/CollectionSetsPage";
import { TrypheShell } from "@/components/layout/TrypheShell";

export const metadata = {
  title: "Collections | Tryphé",
  description:
    "No eliges un perfume… eliges cómo quieres ser percibido. Descubre nuestras Collections diseñadas para proyectar presencia, atracción, estatus e impacto.",
};

export default function SetsPage() {
  return (
    <TrypheShell>
      <CollectionSetsPage />
    </TrypheShell>
  );
}
