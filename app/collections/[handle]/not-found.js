import Link from "next/link";

export default function CollectionNotFound() {
  return (
    <div className="oob-container py-24 text-center">
      <h1 className="oob-heading-xl text-2xl text-[var(--oob-cream)]">Colección no encontrada</h1>
      <p className="mt-4 text-[var(--oob-muted)]">
        Esa colección no existe o no está disponible.
      </p>
      <Link href="/collections" className="mt-8 inline-block text-[var(--oob-gold)] hover:underline">
        Ver todas las colecciones
      </Link>
    </div>
  );
}
