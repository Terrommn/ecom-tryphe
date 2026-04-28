import { CollectionSetsPage } from "@/components/collections/CollectionSetsPage";
import { TrypheShell } from "@/components/layout/TrypheShell";

export const metadata = {
  title: "Bundles | Tryphé",
  description:
    "No eliges un perfume… eliges cómo quieres ser percibido. Descubre nuestros Bundles diseñados para proyectar presencia, atracción, estatus e impacto.",
};

export default function SetsPage() {
  return (
    <TrypheShell>
      <CollectionSetsPage />
    </TrypheShell>
  );
}
