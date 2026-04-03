"use client";

import { ShoppingCart } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { PLACEHOLDER_BASE64 } from "@/lib/media";
import { useCarrito } from "@/hooks/use-carrito";
import { obtenerProductos, obtenerProductosDesdeApi } from "@/services/productos.service";
import type { Producto } from "@/types/producto";

function precioARS(valor: number): string {
  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    maximumFractionDigits: 0,
  }).format(valor);
}

export function TiendaSection() {
  const { agregarItem, totalItems } = useCarrito();
  const [productos, setProductos] = useState<Producto[]>(obtenerProductos());

  useEffect(() => {
    let activo = true;

    void obtenerProductosDesdeApi().then((resultado) => {
      if (activo) {
        setProductos(resultado);
      }
    });

    return () => {
      activo = false;
    };
  }, []);

  return (
    <section aria-labelledby="tienda" className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div className="space-y-2">
          <h2 id="tienda" className="text-3xl font-primary text-white md:text-4xl">
            Tienda oficial
          </h2>
          <p className="text-sm text-zinc-400 md:text-base">
            Equipamiento seleccionado para entrenar con estilo y rendimiento.
          </p>
        </div>
        <p className="rounded-full border border-cyan-300/40 bg-cyan-300/10 px-4 py-2 text-sm text-cyan-100">
          Carrito activo: {totalItems} items
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {productos.map((producto) => (
          <Card key={producto.id} className="overflow-hidden border-white/10 bg-zinc-900/70">
            <CardHeader className="space-y-3 p-0">
              <div className="relative h-56 w-full">
                <Image
                  alt={producto.nombre}
                  blurDataURL={PLACEHOLDER_BASE64}
                  className="h-full w-full object-cover"
                  fill
                  placeholder="blur"
                  sizes="(max-width: 1024px) 100vw, 33vw"
                  src={producto.imagen}
                />
              </div>
              <div className="px-5">
                <CardTitle className="text-xl text-white">{producto.nombre}</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-3 px-5">
              <p className="text-sm text-zinc-300">{producto.descripcion}</p>
              <p className="text-xl font-secondary text-cyan-100">{precioARS(producto.precioBase)}</p>
            </CardContent>
            <CardFooter className="px-5 pb-5">
              <Button
                className="w-full gap-2"
                onClick={() => agregarItem(producto, producto.variantes[0].id)}
                type="button"
              >
                <ShoppingCart className="h-4 w-4" />
                Agregar al carrito
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  );
}
