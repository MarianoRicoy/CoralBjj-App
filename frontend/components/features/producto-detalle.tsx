"use client";

import Image from "next/image";
import { useMemo, useState } from "react";

import { Button } from "@/components/ui/button";
import { useCarrito } from "@/hooks/use-carrito";
import { precioARS } from "@/lib/tienda-productos";
import type { Producto } from "@/types/producto";

type ProductoDetalleProps = {
  producto: Producto;
};

export function ProductoDetalle({ producto }: ProductoDetalleProps) {
  const { agregarItem } = useCarrito();
  const [varianteIdSeleccionada, setVarianteIdSeleccionada] = useState(producto.variantes[0]?.id ?? "");
  const [mensajeAgregadoVisible, setMensajeAgregadoVisible] = useState(false);

  const varianteSeleccionada = useMemo(
    () => producto.variantes.find((variante) => variante.id === varianteIdSeleccionada),
    [producto.variantes, varianteIdSeleccionada],
  );

  const precioActual = varianteSeleccionada?.precio ?? producto.precioBase;

  return (
    <aside className="space-y-6 rounded-2xl border border-white/10 bg-zinc-900/70 p-5 md:p-6">
      <div className="space-y-2">
        <p className="text-sm tracking-[0.16em] text-zinc-400 uppercase">{producto.categoria}</p>
        <h1 className="text-3xl leading-tight font-primary text-white md:text-5xl">{producto.nombre}</h1>
      </div>

      <p className="text-base text-zinc-300 md:text-lg">{producto.descripcion}</p>

      <div className="space-y-2">
        <p className="text-sm text-zinc-400">Precio</p>
        <p className="text-3xl font-secondary text-zinc-100">{precioARS(precioActual)}</p>
      </div>

      {producto.variantes.length > 0 ? (
        <div className="space-y-2">
          <label className="text-sm text-zinc-300" htmlFor="variante">
            Elegí una opción
          </label>
          <select
            className="h-11 w-full rounded-md border border-white/20 bg-black/50 px-3 text-sm text-zinc-100 outline-none transition-colors focus:border-white/60"
            id="variante"
            onChange={(event) => setVarianteIdSeleccionada(event.target.value)}
            value={varianteIdSeleccionada}
          >
            {producto.variantes.map((variante) => (
              <option key={variante.id} value={variante.id}>
                {`${variante.nombre}: ${variante.valor} · Stock ${variante.stock}`}
              </option>
            ))}
          </select>
        </div>
      ) : null}

      <Button
        className="w-full gap-2"
        onClick={() => {
          if (varianteIdSeleccionada) {
            agregarItem(producto, varianteIdSeleccionada);
            setMensajeAgregadoVisible(true);

            setTimeout(() => {
              setMensajeAgregadoVisible(false);
            }, 1800);
          }
        }}
        type="button"
      >
        <Image
          alt="Carrito"
          className="h-4 w-4 brightness-0 invert"
          height={128}
          src="/icons/custom/coral_cart_skull@128.png"
          width={128}
        />
        Añadir al carrito
      </Button>

      {mensajeAgregadoVisible ? (
        <p className="feedback-message text-xs font-medium tracking-[0.08em] text-[#f2685d] uppercase">
          Producto agregado
        </p>
      ) : null}
    </aside>
  );
}
