"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { AlertCircle, RefreshCw } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useCarrito } from "@/hooks/use-carrito";
import { PLACEHOLDER_BASE64 } from "@/lib/media";
import { CATEGORIAS_CONFIRMADAS_CORAL } from "@/lib/catalogo-confirmado";
import { precioARS } from "@/services/productos.service";
import type { Producto } from "@/types/producto";

type TiendaCatalogoGridProps = {
  productos: Producto[];
  error?: string | null;
  cargando?: boolean;
  onReintentar?: () => void;
};

export function TiendaCatalogoGrid({
  productos,
  error = null,
  cargando = false,
  onReintentar,
}: TiendaCatalogoGridProps) {
  const { agregarItem, items, totalItems } = useCarrito();
  const [productoAgregadoId, setProductoAgregadoId] = useState<string | null>(null);

  const agregarProducto = (producto: Producto) => {
    // Buscar la primera variante con stock
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
    <div className="space-y-8">
      {/* Botón superior de acceso al carrito */}
      <div className="flex justify-end">
        <Link
          className="inline-flex h-11 items-center justify-center rounded-md border border-white/70 bg-black/30 px-5 text-sm font-tertiary tracking-[0.08em] text-zinc-100 uppercase transition-all duration-200 hover:-translate-y-0.5 hover:border-white hover:bg-white/10"
          href="/carrito"
        >
          Ir al carrito ({totalItems})
        </Link>
      </div>

      {/* Estado: Cargando */}
      {cargando ? (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="h-96 animate-pulse rounded-2xl border border-white/10 bg-zinc-900/50 p-5 space-y-4"
            >
              <div className="h-48 w-full rounded-lg bg-white/5" />
              <div className="h-6 w-3/4 rounded bg-white/10" />
              <div className="h-4 w-1/2 rounded bg-white/5" />
              <div className="h-10 w-full rounded bg-white/5" />
            </div>
          ))}
        </div>
      ) : null}

      {/* Estado: Error de conexión con API */}
      {!cargando && error ? (
        <div className="rounded-2xl border border-red-500/30 bg-red-950/20 p-8 text-center space-y-4 max-w-xl mx-auto">
          <div className="inline-flex rounded-full bg-red-500/10 p-3 text-red-400">
            <AlertCircle className="h-8 w-8" />
          </div>
          <h3 className="text-xl font-primary text-white uppercase tracking-wider">
            No pudimos conectar con la tienda
          </h3>
          <p className="text-sm text-zinc-300">
            {error} Estamos trabajando para restablecer el catálogo a la brevedad.
          </p>
          {onReintentar ? (
            <Button
              className="gap-2 mx-auto"
              onClick={onReintentar}
              type="button"
              variant="outline"
            >
              <RefreshCw className="h-4 w-4" />
              Reintentar conexión
            </Button>
          ) : null}
        </div>
      ) : null}

      {/* Estado: Catálogo vacío en API -> Mostrar líneas confirmadas en preparación */}
      {!cargando && !error && productos.length === 0 ? (
        <div className="space-y-8">
          <div className="rounded-2xl border border-white/10 bg-zinc-900/60 p-8 text-center space-y-3">
            <p className="text-xs uppercase tracking-[0.2em] text-[#f2685d] font-semibold">
              Catálogo oficial en preparación
            </p>
            <h3 className="text-2xl font-primary text-white md:text-3xl uppercase tracking-tight">
              Próximamente en Coral BJJ Studio
            </h3>
            <p className="max-w-2xl mx-auto text-sm text-zinc-400 md:text-base">
              Estamos preparando los detalles de stock, talles y fotografías de los productos oficiales.
              Conocé las líneas confirmadas que estarán disponibles muy pronto:
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {CATEGORIAS_CONFIRMADAS_CORAL.map((cat) => (
              <article
                key={cat.id}
                className="rounded-2xl border border-white/10 bg-black/40 p-6 space-y-4 shadow-xl backdrop-blur-md"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs uppercase tracking-[0.15em] text-[#f2685d] font-bold">
                    Línea oficial
                  </span>
                  <span className="rounded-full bg-white/10 border border-white/10 px-2.5 py-0.5 text-[10px] uppercase tracking-wider text-zinc-300">
                    Próximamente
                  </span>
                </div>
                <h4 className="text-xl font-primary text-white uppercase tracking-wider">
                  {cat.nombre}
                </h4>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  {cat.descripcion}
                </p>
                <div className="pt-2 border-t border-white/10">
                  <p className="text-[11px] uppercase tracking-widest text-zinc-500 mb-2">
                    Productos confirmados:
                  </p>
                  <ul className="flex flex-wrap gap-1.5">
                    {cat.familias.map((familia, idx) => (
                      <li
                        key={idx}
                        className="rounded-md bg-white/5 border border-white/10 px-2.5 py-1 text-xs text-zinc-200"
                      >
                        {familia}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </div>
      ) : null}

      {/* Estado: Productos comprables disponibles desde la API */}
      {!cargando && !error && productos.length > 0 ? (
        <div className="space-y-12">
          <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {productos.map((producto) => {
              const yaAgregado = items.some(
                (item) => item.productoId === producto.id && !item.noDisponible,
              );
              const sinStock = producto.stockTotal <= 0;

              return (
                <Card
                  key={producto.id}
                  className="overflow-hidden border-white/10 bg-zinc-900/70 flex flex-col justify-between"
                >
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
                  <CardContent className="space-y-3 px-5 pb-5">
                    <p className="text-sm text-zinc-300 line-clamp-2">{producto.descripcion}</p>
                    <p className="text-xl font-secondary text-zinc-100">
                      {precioARS(producto.precioBase)}
                    </p>

                    <div className="grid gap-2 sm:grid-cols-2 pt-2">
                      <Link
                        className="inline-flex h-11 items-center justify-center rounded-md border border-white/70 bg-black/30 px-4 text-sm font-tertiary tracking-[0.08em] text-zinc-100 uppercase transition-all duration-200 hover:-translate-y-0.5 hover:border-white hover:bg-white/10 text-center"
                        href={`/tienda/${producto.slug}`}
                      >
                        Ver detalle
                      </Link>

                      <Button
                        className="h-11 gap-2"
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
                        {sinStock ? "Agotado" : "Añadir"}
                      </Button>
                    </div>

                    {productoAgregadoId === producto.id || yaAgregado ? (
                      <p className="feedback-message text-xs font-medium tracking-[0.08em] text-[#f2685d] uppercase pt-1">
                        {productoAgregadoId === producto.id
                          ? "Producto agregado"
                          : "En tu carrito"}
                      </p>
                    ) : null}
                  </CardContent>
                </Card>
              );
            })}
          </section>

          {/* Sección complementaria con las líneas oficiales confirmadas */}
          <section className="border-t border-white/10 pt-10 space-y-6">
            <div className="space-y-1 text-center md:text-left">
              <h3 className="text-2xl font-primary text-white uppercase tracking-tight">
                Líneas Oficiales Coral BJJ
              </h3>
              <p className="text-sm text-zinc-400">
                Familias de producto oficiales que integran la colección del estudio.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {CATEGORIAS_CONFIRMADAS_CORAL.map((cat) => (
                <div
                  key={cat.id}
                  className="rounded-xl border border-white/10 bg-black/30 p-5 space-y-2"
                >
                  <p className="text-xs uppercase tracking-widest text-[#f2685d] font-bold">
                    {cat.nombre}
                  </p>
                  <p className="text-xs text-zinc-400">{cat.descripcion}</p>
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
          </section>
        </div>
      ) : null}
    </div>
  );
}
