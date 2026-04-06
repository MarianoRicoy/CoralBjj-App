"use client";

import { Minus, Plus, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { useCarrito } from "@/hooks/use-carrito";
import { obtenerProductosTiendaIniciales, precioARS } from "@/lib/tienda-productos";

function obtenerStockMaximo(productoId: string, varianteId: string): number {
  const productos = obtenerProductosTiendaIniciales();
  const producto = productos.find((item) => item.id === productoId);
  const variante = producto?.variantes.find((item) => item.id === varianteId);
  return variante?.stock ?? 1;
}

export function CarritoView() {
  const {
    items,
    totalItems,
    totalMonto,
    quitarItem,
    incrementarCantidad,
    decrementarCantidad,
    limpiarCarrito,
  } = useCarrito();
  const [mensajeEliminadoVisible, setMensajeEliminadoVisible] = useState(false);

  const eliminarProducto = (productoId: string, varianteId: string) => {
    quitarItem(productoId, varianteId);
    setMensajeEliminadoVisible(true);

    setTimeout(() => {
      setMensajeEliminadoVisible(false);
    }, 1800);
  };

  const mensajeFinalizarCompra = encodeURIComponent(
    [
      "Hola Coral BJJ Studio, quiero finalizar mi compra:",
      ...items.map(
        (item) =>
          `- ${item.nombre} (${item.variante}) x${item.cantidad} · ${precioARS(item.precioUnitario * item.cantidad)}`,
      ),
      `Total: ${precioARS(totalMonto)}`,
    ].join("\n"),
  );

  if (items.length === 0) {
    return (
      <section className="space-y-6 rounded-2xl border border-white/10 bg-zinc-900/70 p-6 md:p-8">
        <div className="flex items-center justify-between gap-4">
          <h1 className="text-3xl font-primary text-white md:text-5xl">Carrito</h1>
          <Image
            alt="Carrito Coral"
            className="h-28 w-28 md:h-32 md:w-32"
            height={128}
            src="/icons/custom/coral_cart_skull@128.png"
            width={128}
          />
        </div>

        <p className="text-zinc-300">Todavía no agregaste productos al carrito.</p>

        <Link
          className="inline-flex h-11 items-center justify-center rounded-md border border-white/70 bg-black/30 px-5 text-sm font-tertiary tracking-[0.08em] text-zinc-100 uppercase transition-all duration-200 hover:-translate-y-0.5 hover:border-white hover:bg-white/10"
          href="/tienda"
        >
          Ir a tienda
        </Link>
      </section>
    );
  }

  return (
    <section className="grid gap-6 lg:grid-cols-[1.45fr_0.9fr]">
      <article className="space-y-4 rounded-2xl border border-white/10 bg-zinc-900/70 p-5 md:p-6">
        <div className="flex items-center justify-between gap-4">
          <h1 className="text-3xl font-primary text-white md:text-5xl">Carrito</h1>
          <Image
            alt="Carrito Coral"
            className="h-28 w-28 md:h-32 md:w-32"
            height={128}
            src="/icons/custom/coral_cart_skull@128.png"
            width={128}
          />
        </div>

        <p className="text-sm text-zinc-400">Productos acumulados: {totalItems}</p>
        {mensajeEliminadoVisible ? (
          <p className="feedback-message text-xs font-medium tracking-[0.08em] text-[#f2685d] uppercase">
            Producto eliminado
          </p>
        ) : null}

        <div className="space-y-3">
          {items.map((item) => {
            const stockMaximo = obtenerStockMaximo(item.productoId, item.varianteId);
            const subtotalItem = item.cantidad * item.precioUnitario;

            return (
              <article
                key={`${item.productoId}-${item.varianteId}`}
                className="grid gap-4 rounded-xl border border-white/10 bg-black/30 p-4 md:grid-cols-[110px_1fr_auto] md:items-center"
              >
                <div className="relative h-24 w-full overflow-hidden rounded-lg bg-zinc-950/80 md:w-[110px]">
                  <Image
                    alt={item.nombre}
                    className="h-full w-full object-contain p-2"
                    fill
                    sizes="110px"
                    src={item.imagen}
                  />
                </div>

                <div className="space-y-1">
                  <h2 className="text-lg text-zinc-100">{item.nombre}</h2>
                  <p className="text-xs tracking-[0.08em] text-zinc-400 uppercase">{item.variante}</p>
                  <p className="text-sm text-zinc-300">Precio unitario: {precioARS(item.precioUnitario)}</p>
                  <p className="text-sm font-semibold text-zinc-100">Subtotal: {precioARS(subtotalItem)}</p>
                </div>

                <div className="flex items-center gap-2 md:flex-col md:items-end md:gap-3">
                  <div className="inline-flex items-center rounded-md border border-white/15 bg-black/40">
                    <button
                      className="inline-flex h-9 w-9 items-center justify-center text-zinc-100 transition-colors hover:bg-white/10"
                      onClick={() => decrementarCantidad(item.productoId, item.varianteId)}
                      type="button"
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <span className="inline-flex h-9 min-w-10 items-center justify-center text-sm text-zinc-100">
                      {item.cantidad}
                    </span>
                    <button
                      className="inline-flex h-9 w-9 items-center justify-center text-zinc-100 transition-colors hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-40"
                      disabled={item.cantidad >= stockMaximo}
                      onClick={() => incrementarCantidad(item.productoId, item.varianteId, stockMaximo)}
                      type="button"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>

                  <button
                    className="inline-flex h-9 items-center gap-2 rounded-md border border-white/20 px-3 text-xs tracking-[0.08em] text-zinc-200 uppercase transition-colors hover:bg-white/10"
                    onClick={() => eliminarProducto(item.productoId, item.varianteId)}
                    type="button"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                    Eliminar
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      </article>

      <aside className="space-y-4 rounded-2xl border border-white/10 bg-zinc-900/70 p-5 md:p-6">
        <h2 className="text-xl font-primary text-white md:text-2xl">Resumen</h2>

        <div className="space-y-2 rounded-xl border border-white/10 bg-black/30 p-4">
          <div className="flex items-center justify-between text-sm text-zinc-300">
            <span>Productos</span>
            <span>{totalItems}</span>
          </div>
          <div className="flex items-center justify-between text-sm text-zinc-300">
            <span>Subtotal</span>
            <span>{precioARS(totalMonto)}</span>
          </div>
          <div className="h-px bg-white/10" />
          <div className="flex items-center justify-between text-lg font-semibold text-zinc-100">
            <span>Total</span>
            <span>{precioARS(totalMonto)}</span>
          </div>
        </div>

        <div className="grid gap-2">
          <Button
            className="h-11"
            onClick={() => window.open(`https://wa.me/?text=${mensajeFinalizarCompra}`, "_blank", "noopener,noreferrer")}
            type="button"
          >
            Finalizar compra
          </Button>

          <Link
            className="inline-flex h-11 items-center justify-center rounded-md border border-white/70 bg-black/30 px-5 text-sm font-tertiary tracking-[0.08em] text-zinc-100 uppercase transition-all duration-200 hover:-translate-y-0.5 hover:border-white hover:bg-white/10"
            href="/tienda"
          >
            Agregar más productos
          </Link>

          <Button className="h-11" onClick={limpiarCarrito} type="button" variant="secondary">
            Vaciar carrito
          </Button>
        </div>
      </aside>
    </section>
  );
}
