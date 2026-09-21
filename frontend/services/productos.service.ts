import type { Producto } from "@/types/producto";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:4000";

export class ApiError extends Error {
  codigo?: number;
  constructor(mensaje: string, codigo?: number) {
    super(mensaje);
    this.name = "ApiError";
    this.codigo = codigo;
  }
}

/**
 * Consulta la lista de productos transaccionables desde el backend API.
 * El backend es la única fuente de verdad: no recurre silenciosamente a mocks.
 */
export async function obtenerProductosDesdeApi(): Promise<Producto[]> {
  try {
    const respuesta = await fetch(`${API_BASE_URL}/api/productos`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });

    if (!respuesta.ok) {
      throw new ApiError(
        `Error del servidor al obtener productos (${respuesta.status})`,
        respuesta.status,
      );
    }

    const data = (await respuesta.json()) as Producto[];
    return Array.isArray(data) ? data : [];
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw new ApiError(
      "No se pudo establecer conexión con el servidor de la tienda.",
      503,
    );
  }
}

/**
 * Consulta un producto por su slug desde el backend API.
 * Si el producto no existe, retorna null (404).
 */
export async function obtenerProductoPorSlugDesdeApi(slug: string): Promise<Producto | null> {
  try {
    const respuesta = await fetch(`${API_BASE_URL}/api/productos/slug/${encodeURIComponent(slug)}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });

    if (respuesta.status === 404) {
      return null;
    }

    if (!respuesta.ok) {
      throw new ApiError(
        `Error del servidor al obtener el producto (${respuesta.status})`,
        respuesta.status,
      );
    }

    const data = (await respuesta.json()) as Producto;
    return data;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw new ApiError(
      "No se pudo conectar con el servidor para obtener el detalle del producto.",
      503,
    );
  }
}

/**
 * Formatea valores numéricos a moneda de curso legal argentina (ARS).
 */
export function precioARS(valor: number): string {
  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    maximumFractionDigits: 0,
  }).format(valor);
}
