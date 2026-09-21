"use client";

import { Minus, Plus, Trash2, AlertTriangle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { useCarrito } from "@/hooks/use-carrito";
import { obtenerProductosDesdeApi, precioARS } from "@/services/productos.service";
import { iniciarCheckout } from "@/services/checkout.service";

export function CarritoView() {
  const {
    items,
    totalItems,
    totalMonto,
    quitarItem,
    incrementarCantidad,
    decrementarCantidad,
    actualizarItemRevalidado,
    limpiarCarrito,
    estaListo,
  } = useCarrito();

  const [mensajeEliminadoVisible, setMensajeEliminadoVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [avisosRevalidacion, setAvisosRevalidacion] = useState<string[]>([]);
  const [revalidando, setRevalidando] = useState(false);
  const revalidadoRef = useState(false);

  // Revalidación contra API al montar el componente
  useEffect(() => {
    if (!estaListo || items.length === 0 || revalidadoRef[0]) {
      return;
    }

    revalidadoRef[1](true);
    let montado = true;

    async function revalidarStockYPrecios() {
      setRevalidando(true);
      try {
        const productosApi = await obtenerProductosDesdeApi();
        if (!montado) return;

        const nuevosAvisos: string[] = [];

        for (const item of items) {
          const productoReal = productosApi.find((p) => p.id === item.productoId);
          const varianteReal = productoReal?.variantes.find((v) => v.id === item.varianteId);

          // Si el producto o la variante no existen o quedaron sin stock
          if (!productoReal || !varianteReal || varianteReal.stock <= 0) {
            const motivo = !productoReal || !varianteReal
              ? "Este producto o variante ya no se encuentra en el catálogo comercial."
              : "Variante agotada sin stock disponible.";

            actualizarItemRevalidado(item.productoId, item.varianteId, {
              noDisponible: true,
              motivoNoDisponible: motivo,
              stockDisponible: 0,
            });

            nuevosAvisos.push(
              `"${item.nombre}" (${item.variante}) ya no tiene stock disponible para compra.`,
            );
          } else {
            // El producto está disponible: verificar precio y cantidades
            const stockActual = varianteReal.stock;
            const precioActual = varianteReal.precio;

            if (item.cantidad > stockActual) {
              actualizarItemRevalidado(item.productoId, item.varianteId, {
                cantidad: stockActual,
                stockDisponible: stockActual,
                precioUnitario: precioActual,
                noDisponible: false,
                motivoNoDisponible: undefined,
              });

              nuevosAvisos.push(
                `El stock de "${item.nombre}" (${item.variante}) cambió. Se actualizó la cantidad a ${stockActual} unidades disponibles.`,
              );
            } else if (
              item.noDisponible ||
              item.stockDisponible !== stockActual ||
              item.precioUnitario !== precioActual
            ) {
              actualizarItemRevalidado(item.productoId, item.varianteId, {
                stockDisponible: stockActual,
                precioUnitario: precioActual,
                noDisponible: false,
                motivoNoDisponible: undefined,
              });
            }
          }
        }

        if (nuevosAvisos.length > 0) {
          setAvisosRevalidacion(nuevosAvisos);
        }
      } catch {
        // Si la API no está disponible en este instante, el carrito persistido se mantiene
      } finally {
        if (montado) {
          setRevalidando(false);
        }
      }
    }

    revalidarStockYPrecios();

    return () => {
      montado = false;
    };
  }, [estaListo, items, actualizarItemRevalidado, revalidadoRef]);

  const hayItemsNoDisponibles = items.some((item) => item.noDisponible);

  const handleCheckout = async () => {
    if (items.length === 0 || hayItemsNoDisponibles) return;
    setLoading(true);
    try {
      const payloadMock = {
        nombreCompleto: "Consumidor Final",
        email: "correo@correo.com",
        telefono: "1122334455",
        direccion: "Dirección de Prueba 123",
        ciudad: "CABA",
        provincia: "Buenos Aires",
        codigoPostal: "1000",
      };
      const itemsComprables = items.filter((item) => !item.noDisponible);
      const resultado = await iniciarCheckout(payloadMock, itemsComprables);
      if (resultado.ok && resultado.checkoutUrl) {
        window.location.href = resultado.checkoutUrl;
      } else {
        alert(resultado.mensaje || "Error al procesar el pago");
      }
    } catch (error) {
      console.error("Error en checkout:", error);
      alert("Ocurrió un error inesperado al procesar la compra.");
    } finally {
      setLoading(false);
    }
  };

  const eliminarProducto = (productoId: string, varianteId: string) => {
    quitarItem(productoId, varianteId);
    setMensajeEliminadoVisible(true);

    setTimeout(() => {
      setMensajeEliminadoVisible(false);
    }, 1800);
  };

  if (!estaListo) {
    return (
      <section className="space-y-6 rounded-2xl border border-white/10 bg-zinc-900/70 p-6 md:p-8">
        <p className="text-sm text-zinc-400">Cargando carrito...</p>
      </section>
    );
  }

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
    <section className="space-y-6">
      {avisosRevalidacion.length > 0 && (
        <div className="rounded-xl border border-amber-500/30 bg-amber-500/10 p-4 text-amber-200 text-sm space-y-1">
          <div className="flex items-center gap-2 font-semibold">
            <AlertTriangle className="h-4 w-4 text-amber-400" />
            <span>Aviso de actualización de stock y disponibilidad</span>
          </div>
          {avisosRevalidacion.map((aviso, idx) => (
            <p key={idx} className="text-xs text-amber-300/90 pl-6">
              • {aviso}
            </p>
          ))}
        </div>
      )}

      <div className="grid gap-6 lg:grid-cols-[1.45fr_0.9fr]">
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

          <p className="text-sm text-zinc-400">
            Productos acumulados: {totalItems} {revalidando && "· Verificando stock con el servidor..."}
          </p>

          {mensajeEliminadoVisible ? (
            <p className="feedback-message text-xs font-medium tracking-[0.08em] text-[#f2685d] uppercase">
              Producto eliminado
            </p>
          ) : null}

          <div className="space-y-3">
            {items.map((item) => {
              const stockMaximo = item.stockDisponible ?? 99;
              const subtotalItem = item.cantidad * item.precioUnitario;

              return (
                <article
                  key={`${item.productoId}-${item.varianteId}`}
                  className={`grid gap-4 rounded-xl border p-4 transition-colors md:grid-cols-[110px_1fr_auto] md:items-center ${
                    item.noDisponible
                      ? "border-red-500/30 bg-red-950/20"
                      : "border-white/10 bg-black/30"
                  }`}
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
                    <div className="flex items-center gap-2">
                      <h2 className="text-lg text-zinc-100">{item.nombre}</h2>
                      {item.noDisponible && (
                        <span className="rounded-full bg-red-500/20 border border-red-500/30 px-2 py-0.5 text-[10px] uppercase font-bold tracking-wider text-red-400">
                          No disponible
                        </span>
                      )}
                    </div>
                    <p className="text-xs tracking-[0.08em] text-zinc-400 uppercase">{item.variante}</p>
                    {item.noDisponible ? (
                      <p className="text-xs text-red-300">
                        {item.motivoNoDisponible ?? "No hay stock para esta variante."}
                      </p>
                    ) : (
                      <>
                        <p className="text-sm text-zinc-300">
                          Precio unitario: {precioARS(item.precioUnitario)}
                        </p>
                        <p className="text-sm font-semibold text-zinc-100">
                          Subtotal: {precioARS(subtotalItem)}
                        </p>
                      </>
                    )}
                  </div>

                  <div className="flex items-center gap-2 md:flex-col md:items-end md:gap-3">
                    {!item.noDisponible ? (
                      <div className="inline-flex items-center rounded-md border border-white/15 bg-black/40">
                        <button
                          className="inline-flex h-9 w-9 items-center justify-center text-zinc-100 transition-colors hover:bg-white/10"
                          onClick={() => decrementarCantidad(item.productoId, item.varianteId)}
                          type="button"
                          aria-label="Disminuir cantidad"
                        >
                          <Minus className="h-4 w-4" />
                        </button>
                        <span className="inline-flex h-9 min-w-10 items-center justify-center text-sm text-zinc-100">
                          {item.cantidad}
                        </span>
                        <button
                          className="inline-flex h-9 w-9 items-center justify-center text-zinc-100 transition-colors hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-40"
                          disabled={item.cantidad >= stockMaximo}
                          onClick={() =>
                            incrementarCantidad(item.productoId, item.varianteId, stockMaximo)
                          }
                          type="button"
                          aria-label="Aumentar cantidad"
                        >
                          <Plus className="h-4 w-4" />
                        </button>
                      </div>
                    ) : null}

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
              <span>Productos disponibles</span>
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

          {hayItemsNoDisponibles && (
            <p className="text-xs text-red-400 bg-red-950/40 border border-red-500/20 p-3 rounded-lg">
              Tenés productos no disponibles en tu carrito. Por favor eliminalos para poder finalizar la compra.
            </p>
          )}

          <div className="grid gap-2">
            <Button
              className="h-11"
              disabled={loading || totalItems === 0 || hayItemsNoDisponibles}
              onClick={handleCheckout}
              type="button"
            >
              {loading ? "Procesando..." : "Finalizar compra"}
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
      </div>
    </section>
  );
}
