"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useCarrito } from "@/hooks/use-carrito";
import { PLACEHOLDER_BASE64 } from "@/lib/media";
import { precioARS } from "@/lib/tienda-productos";
import type { Producto } from "@/types/producto";

type TiendaCatalogoGridProps = {
  productos: Producto[];
};

export function TiendaCatalogoGrid({ productos }: TiendaCatalogoGridProps) {
  const { agregarItem, items, totalItems } = useCarrito();
  const [productoAgregadoId, setProductoAgregadoId] = useState<string | null>(null);

  const agregarProducto = (producto: Producto) => {
    const varianteId = producto.variantes[0]?.id;

    if (!varianteId) {
      return;
    }

    agregarItem(producto, varianteId);
    setProductoAgregadoId(producto.id);

    setTimeout(() => {
      setProductoAgregadoId((actual) => (actual === producto.id ? null : actual));
    }, 1800);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Link
          className="inline-flex h-11 items-center justify-center rounded-md border border-white/70 bg-black/30 px-5 text-sm font-tertiary tracking-[0.08em] text-zinc-100 uppercase transition-all duration-200 hover:-translate-y-0.5 hover:border-white hover:bg-white/10"
          href="/carrito"
        >
          Ir al carrito ({totalItems})
        </Link>
      </div>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {productos.map((producto) => {
          const yaAgregado = items.some((item) => item.productoId === producto.id);

          return (
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
          <CardContent className="space-y-3 px-5 pb-5">
            <p className="text-sm text-zinc-300">{producto.descripcion}</p>
            <p className="text-xl font-secondary text-zinc-100">{precioARS(producto.precioBase)}</p>

            <div className="grid gap-2 sm:grid-cols-2">
              <Link
                className="inline-flex h-11 items-center justify-center rounded-md border border-white/70 bg-black/30 px-5 text-sm font-tertiary tracking-[0.08em] text-zinc-100 uppercase transition-all duration-200 hover:-translate-y-0.5 hover:border-white hover:bg-white/10"
                href={`/tienda/${producto.slug}`}
              >
                Ver producto
              </Link>

              <Button className="h-11 gap-2" onClick={() => agregarProducto(producto)} type="button">
                <Image
                  alt="Carrito"
                  className="h-4 w-4 brightness-0 invert"
                  height={128}
                  src="/icons/custom/coral_cart_skull@128.png"
                  width={128}
                />
                Añadir al carrito
              </Button>
            </div>

            {productoAgregadoId === producto.id || yaAgregado ? (
              <p className="feedback-message text-xs font-medium tracking-[0.08em] text-[#f2685d] uppercase">
                {productoAgregadoId === producto.id ? "Producto agregado" : "Ya lo agregaste"}
              </p>
            ) : null}
          </CardContent>
        </Card>
          );
        })}
      </section>
    </div>
  );
}
