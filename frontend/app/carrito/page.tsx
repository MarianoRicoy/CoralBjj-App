import type { Metadata } from "next";

import { CarritoView } from "@/components/features/carrito-view";

export const metadata: Metadata = {
  title: "Carrito",
  description: "Resumen de productos seleccionados en la tienda de Coral BJJ Studio.",
};

export default function CarritoPage() {
  return (
    <main className="mx-auto flex w-full max-w-7xl flex-1 flex-col gap-8 px-4 py-8 md:px-8 md:py-12">
      <CarritoView />
    </main>
  );
}
