import type { Producto } from "@/types/producto";
import {
  obtenerProductosDesdeApi,
  obtenerProductoPorSlugDesdeApi,
  precioARS,
} from "@/services/productos.service";

export { precioARS };

/**
 * Delegación unificada al servicio oficial de API.
 */
export async function obtenerProductosTienda(): Promise<Producto[]> {
  return obtenerProductosDesdeApi();
}

export async function obtenerProductoTiendaPorSlug(slug: string): Promise<Producto | null> {
  return obtenerProductoPorSlugDesdeApi(slug);
}
