"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { PLACEHOLDER_BASE64 } from "@/lib/media";
import { obtenerProductosTiendaIniciales, precioARS } from "@/lib/tienda-productos";
import { useCarrito } from "@/hooks/use-carrito";

export function TiendaSection() {
  const { agregarItem, totalItems } = useCarrito();
  const productos = obtenerProductosTiendaIniciales();
  const [productoAgregadoId, setProductoAgregadoId] = useState<string | null>(null);

  const agregarProducto = (productoId: string, varianteId: string) => {
    const producto = productos.find((item) => item.id === productoId);

    if (!producto) {
      return;
    }

    agregarItem(producto, varianteId);
    setProductoAgregadoId(productoId);

    setTimeout(() => {
      setProductoAgregadoId((actual) => (actual === productoId ? null : actual));
    }, 1800);
  };

  return (
    <section aria-labelledby="tienda" className="space-y-6">
      <div className="flex flex-col items-center gap-3">
        <div className="space-y-2 text-center">
          <h2 id="tienda" className="text-3xl font-primary text-white md:text-4xl">
            <Link className="transition-colors hover:text-[#f2685d]" href="/tienda">
              Tienda oficial
            </Link>
          </h2>
          <p className="text-sm text-zinc-400 md:text-base">
            Equipamiento seleccionado para entrenar con estilo y rendimiento.
          </p>
        </div>
        <p className="inline-flex h-11 items-center rounded-md border border-white/70 bg-black/30 px-5 text-xs font-tertiary tracking-[0.08em] text-zinc-100 uppercase">
          Carrito activo: {totalItems} items
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {productos.map((producto) => (
          <Card key={producto.id} className="overflow-hidden border-white/10 bg-zinc-900/70">
            <CardHeader className="space-y-3 p-0">
              <Link className="group relative block h-56 w-full bg-zinc-950/80" href={`/tienda/${producto.slug}`}>
                <Image
                  alt={producto.nombre}
                  blurDataURL={PLACEHOLDER_BASE64}
                  className="h-full w-full object-contain p-4 transition-transform duration-500 group-hover:scale-[1.02]"
                  fill
                  placeholder="blur"
                  sizes="(max-width: 1024px) 100vw, 33vw"
                  src={producto.imagen}
                />
              </Link>
              <div className="px-5">
                <CardTitle className="text-xl text-white">
                  <Link className="transition-colors hover:text-[#f2685d]" href={`/tienda/${producto.slug}`}>
                    {producto.nombre}
                  </Link>
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-3 px-5">
              <p className="text-sm text-zinc-300">{producto.descripcion}</p>
              <p className="text-xl font-secondary text-zinc-100">{precioARS(producto.precioBase)}</p>
            </CardContent>
            <CardFooter className="px-5 pb-5">
              <div className="w-full space-y-2">
                <Button
                  className="w-full gap-2"
                  onClick={() => agregarProducto(producto.id, producto.variantes[0].id)}
                  type="button"
                >
                  <Image
                    alt="Carrito"
                    className="h-4 w-4 brightness-0 invert"
                    height={128}
                    src="/icons/custom/coral_cart_skull@128.png"
                    width={128}
                  />
                  Agregar al carrito
                </Button>

                {productoAgregadoId === producto.id ? (
                  <p className="feedback-message text-xs font-medium tracking-[0.08em] text-[#f2685d] uppercase">
                    Producto agregado
                  </p>
                ) : null}
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  );
}
