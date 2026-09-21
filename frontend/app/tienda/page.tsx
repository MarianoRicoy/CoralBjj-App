import type { Metadata } from "next";
import { TiendaCatalogoGrid } from "@/components/features/tienda-catalogo-grid";
import { obtenerProductosDesdeApi } from "@/services/productos.service";
import type { Producto } from "@/types/producto";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Tienda",
  description: "Tienda oficial de indumentaria, accesorios y equipamiento Coral BJJ Studio.",
};

export default async function TiendaPage() {
  let productos: Producto[] = [];
  let error: string | null = null;

  try {
    productos = await obtenerProductosDesdeApi();
  } catch (err) {
    error =
      err instanceof Error
        ? err.message
        : "No se pudo conectar con el servidor de la tienda.";
  }

  return (
    <main className="mx-auto flex w-full max-w-7xl flex-1 flex-col gap-8 px-4 py-8 md:px-8 md:py-12">
      <section className="space-y-4">
        <p className="inline-flex rounded-full border border-white/35 bg-white/10 px-3 py-1 text-xs tracking-[0.2em] text-zinc-100 uppercase">
          Tienda oficial
        </p>
        <h1 className="text-4xl leading-tight font-primary text-white md:text-6xl">
          Colección Coral BJJ Studio.
        </h1>
        <p className="max-w-3xl text-base text-zinc-300 md:text-lg">
          Indumentaria, accesorios y equipamiento técnico para entrenamiento y rendimiento dentro y fuera del tatami.
        </p>
      </section>

      <TiendaCatalogoGrid error={error} productos={productos} />
    </main>
  );
}
