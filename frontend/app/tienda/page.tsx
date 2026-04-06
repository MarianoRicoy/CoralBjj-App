import type { Metadata } from "next";
import { TiendaCatalogoGrid } from "@/components/features/tienda-catalogo-grid";
import { obtenerProductosTienda } from "@/lib/tienda-productos";

export const metadata: Metadata = {
  title: "Tienda",
  description: "Tienda oficial de accesorios Coral BJJ Studio.",
};

export default async function TiendaPage() {
  const productos = await obtenerProductosTienda();

  return (
    <main className="mx-auto flex w-full max-w-7xl flex-1 flex-col gap-8 px-4 py-8 md:px-8 md:py-12">
      <section className="space-y-4">
        <p className="inline-flex rounded-full border border-white/35 bg-white/10 px-3 py-1 text-xs tracking-[0.2em] text-zinc-100 uppercase">
          Tienda oficial
        </p>
        <h1 className="text-4xl leading-tight font-primary text-white md:text-6xl">
          Accesorios Coral BJJ Studio.
        </h1>
        <p className="max-w-3xl text-base text-zinc-300 md:text-lg">
          Artículos seleccionados para entrenamiento, estilo y rendimiento dentro y fuera del tatami.
        </p>
      </section>

      <TiendaCatalogoGrid productos={productos} />
    </main>
  );
}
