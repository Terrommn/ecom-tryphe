import Link from "next/link";

export default function CollectionNotFound() {
  return (
    <div className="mx-auto max-w-screen-2xl px-4 py-24 text-center lg:px-10">
      <h1 className="font-serif text-2xl font-medium text-neutral-950">Colección no encontrada</h1>
      <p className="mt-4 text-neutral-500">
        Esa colección no existe o no está disponible.
      </p>
      <Link
        href="/collections"
        className="mt-8 inline-block text-neutral-950 underline underline-offset-4 hover:opacity-60"
      >
        Ver todas las colecciones
      </Link>
    </div>
  );
}
