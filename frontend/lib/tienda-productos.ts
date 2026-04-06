import type { Producto } from "@/types/producto";
import { CATALOGO_TIENDA } from "@/lib/tienda-catalogo";

export async function obtenerProductosTienda(): Promise<Producto[]> {
  return CATALOGO_TIENDA;
}

export function obtenerProductosTiendaIniciales(): Producto[] {
  return CATALOGO_TIENDA;
}

export async function obtenerProductoTiendaPorSlug(slug: string): Promise<Producto | undefined> {
  const productos = await obtenerProductosTienda();
  return productos.find((producto) => producto.slug === slug);
}

export function precioARS(valor: number): string {
  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    maximumFractionDigits: 0,
  }).format(valor);
}
