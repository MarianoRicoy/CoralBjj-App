"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useCarrito } from "@/hooks/use-carrito";
import { PLACEHOLDER_BASE64 } from "@/lib/media";
import { CATEGORIAS_CONFIRMADAS_CORAL } from "@/lib/catalogo-confirmado";
import { obtenerProductosDesdeApi, precioARS } from "@/services/productos.service";
import type { Producto } from "@/types/producto";

export function TiendaSection() {
  const { agregarItem, totalItems } = useCarrito();
  const [productos, setProductos] = useState<Producto[]>([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [productoAgregadoId, setProductoAgregadoId] = useState<string | null>(null);

  useEffect(() => {
    let montado = true;

    async function cargarProductos() {
      try {
        const data = await obtenerProductosDesdeApi();
        if (montado) {
          setProductos(data);
          setError(null);
        }
      } catch (err) {
        if (montado) {
          setError(
            err instanceof Error
              ? err.message
              : "No se pudo conectar con el servidor de la tienda.",
          );
        }
      } finally {
        if (montado) {
          setCargando(false);
        }
      }
    }

    cargarProductos();

    return () => {
      montado = false;
    };
  }, []);

  const agregarProducto = (producto: Producto) => {
    const varianteConStock = producto.variantes.find((v) => v.stock > 0) ?? producto.variantes[0];

    if (!varianteConStock || varianteConStock.stock <= 0) {
      return;
    }

    agregarItem(producto, varianteConStock.id);
    setProductoAgregadoId(producto.id);

    setTimeout(() => {
      setProductoAgregadoId((actual) => (actual === producto.id ? null : actual));
    }, 1800);
  };

  return (
    <section aria-labelledby="tienda" className="space-y-6">
      <div className="flex flex-col items-center gap-3">
        <div className="space-y-2 text-center">
          <h2 id="tienda" className="text-3xl font-primary text-white md:text-4xl uppercase tracking-tight">
            <Link className="transition-colors hover:text-[#f2685d]" href="/tienda">
              Tienda oficial
            </Link>
          </h2>
          <p className="text-sm text-zinc-400 md:text-base">
            Equipamiento e indumentaria seleccionados para entrenar con estilo y rendimiento.
          </p>
        </div>
        <Link
          className="inline-flex h-11 items-center rounded-md border border-white/70 bg-black/30 px-5 text-xs font-tertiary tracking-[0.08em] text-zinc-100 uppercase transition-colors hover:bg-white/10"
          href="/carrito"
        >
          Carrito activo: {totalItems} items
        </Link>
      </div>

      {/* Cargando */}
      {cargando ? (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="h-80 animate-pulse rounded-2xl border border-white/10 bg-zinc-900/50 p-5 space-y-4"
            >
              <div className="h-44 w-full rounded-lg bg-white/5" />
              <div className="h-5 w-3/4 rounded bg-white/10" />
              <div className="h-4 w-1/2 rounded bg-white/5" />
            </div>
          ))}
        </div>
      ) : null}

      {/* Catálogo vacío o sin productos activos en la API -> Mostrar familias confirmadas */}
      {!cargando && (error || productos.length === 0) ? (
        <div className="space-y-6">
          <div className="rounded-2xl border border-white/10 bg-zinc-900/40 p-6 text-center space-y-2">
            <span className="text-xs uppercase tracking-[0.2em] text-[#f2685d] font-semibold">
              Próximamente
            </span>
            <p className="text-sm text-zinc-300">
              Estamos preparando la colección oficial de Coral BJJ Studio. Muy pronto vas a poder comprar
              directamente desde nuestra tienda online.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {CATEGORIAS_CONFIRMADAS_CORAL.map((cat) => (
              <div
                key={cat.id}
                className="rounded-2xl border border-white/10 bg-black/40 p-6 space-y-3"
              >
                <div className="flex items-center justify-between">
                  <p className="text-xs uppercase tracking-wider text-[#f2685d] font-bold">
                    {cat.nombre}
                  </p>
                  <span className="rounded bg-white/10 px-2 py-0.5 text-[10px] uppercase tracking-widest text-zinc-400">
                    Próximamente
                  </span>
                </div>
                <p className="text-xs text-zinc-400 leading-relaxed">{cat.descripcion}</p>
                <div className="flex flex-wrap gap-1.5 pt-2">
                  {cat.familias.map((f, i) => (
                    <span
                      key={i}
                      className="rounded bg-white/5 border border-white/10 px-2 py-0.5 text-[11px] text-zinc-300"
                    >
                      {f}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : null}

      {/* Productos comprables disponibles desde la API */}
      {!cargando && !error && productos.length > 0 ? (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {productos.map((producto) => {
            const sinStock = producto.stockTotal <= 0;

            return (
              <Card key={producto.id} className="overflow-hidden border-white/10 bg-zinc-900/70">
                <CardHeader className="space-y-3 p-0">
                  <Link
                    className="group relative block h-56 w-full bg-zinc-950/80"
                    href={`/tienda/${producto.slug}`}
                  >
                    <Image
                      alt={producto.nombre}
                      blurDataURL={PLACEHOLDER_BASE64}
                      className="h-full w-full object-contain p-4 transition-transform duration-500 group-hover:scale-[1.02]"
                      fill
                      placeholder="blur"
                      sizes="(max-width: 1024px) 100vw, 33vw"
                      src={producto.imagen}
                    />
                    {sinStock && (
                      <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px] flex items-center justify-center">
                        <span className="rounded-full bg-red-500/20 border border-red-500/40 px-3 py-1 text-xs uppercase font-bold tracking-widest text-red-300">
                          Agotado
                        </span>
                      </div>
                    )}
                  </Link>
                  <div className="px-5">
                    <CardTitle className="text-xl text-white">
                      <Link
                        className="transition-colors hover:text-[#f2685d]"
                        href={`/tienda/${producto.slug}`}
                      >
                        {producto.nombre}
                      </Link>
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3 px-5">
                  <p className="text-sm text-zinc-300 line-clamp-2">{producto.descripcion}</p>
                  <p className="text-xl font-secondary text-zinc-100">
                    {precioARS(producto.precioBase)}
                  </p>
                </CardContent>
                <CardFooter className="px-5 pb-5">
                  <div className="w-full space-y-2">
                    <Button
                      className="w-full gap-2"
                      disabled={sinStock}
                      onClick={() => agregarProducto(producto)}
                      type="button"
                    >
                      <Image
                        alt="Carrito"
                        className="h-4 w-4 brightness-0 invert"
                        height={128}
                        src="/icons/custom/coral_cart_skull@128.png"
                        width={128}
                      />
                      {sinStock ? "Sin stock disponible" : "Agregar al carrito"}
                    </Button>

                    {productoAgregadoId === producto.id ? (
                      <p className="feedback-message text-xs font-medium tracking-[0.08em] text-[#f2685d] uppercase">
                        Producto agregado
                      </p>
                    ) : null}
                  </div>
                </CardFooter>
              </Card>
            );
          })}
        </div>
      ) : null}
    </section>
  );
}
