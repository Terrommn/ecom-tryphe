import Link from "next/link";

export default function ProductNotFound() {
  return (
    <div className="oob-container py-24 text-center">
      <h1 className="oob-heading-xl text-2xl text-[var(--oob-cream)]">Producto no encontrado</h1>
      <p className="mt-4 text-[var(--oob-muted)]">
        Ese artículo no existe o ya no está disponible.
      </p>
      <Link
        href="/"
        className="mt-8 inline-block text-[var(--oob-gold)] hover:underline"
      >
        Volver al inicio
      </Link>
    </div>
  );
}
