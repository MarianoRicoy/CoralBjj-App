import type { Producto } from "@/types/producto";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:4000";

const PRODUCTOS_MOCK: Producto[] = [
  {
    id: "gi-coral-pro",
    slug: "gi-coral-pro",
    nombre: "Kimono Coral Pro",
    descripcion: "Kimono premium para entrenamiento intenso y competencia.",
    precioBase: 169000,
    moneda: "ARS",
    stockTotal: 18,
    imagen:
      "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=1200&q=80",
    categoria: "indumentaria",
    destacado: true,
    variantes: [
      { id: "gcp-a1-blanco", nombre: "Talle", valor: "A1", stock: 7, precio: 169000 },
      { id: "gcp-a2-blanco", nombre: "Talle", valor: "A2", stock: 6, precio: 169000 },
      { id: "gcp-a3-blanco", nombre: "Talle", valor: "A3", stock: 5, precio: 174000 },
    ],
  },
  {
    id: "rashguard-coral",
    slug: "rashguard-coral",
    nombre: "Rashguard Studio",
    descripcion: "Compresión técnica para no-gi con secado rápido.",
    precioBase: 69000,
    moneda: "ARS",
    stockTotal: 32,
    imagen:
      "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=1200&q=80",
    categoria: "indumentaria",
    variantes: [
      { id: "rgs-s", nombre: "Talle", valor: "S", stock: 12, precio: 69000 },
      { id: "rgs-m", nombre: "Talle", valor: "M", stock: 11, precio: 69000 },
      { id: "rgs-l", nombre: "Talle", valor: "L", stock: 9, precio: 69000 },
    ],
  },
  {
    id: "cinturon-coral",
    slug: "cinturon-coral",
    nombre: "Cinturón Coral Signature",
    descripcion: "Tejido reforzado para máxima durabilidad.",
    precioBase: 39000,
    moneda: "ARS",
    stockTotal: 40,
    imagen:
      "https://images.unsplash.com/photo-1547347298-4074fc3086f0?auto=format&fit=crop&w=1200&q=80",
    categoria: "accesorios",
    variantes: [
      { id: "cc-azul", nombre: "Color", valor: "Azul", stock: 14, precio: 39000 },
      { id: "cc-marron", nombre: "Color", valor: "Marrón", stock: 13, precio: 39000 },
      { id: "cc-negro", nombre: "Color", valor: "Negro", stock: 13, precio: 42000 },
    ],
  },
];

export function obtenerProductos(): Producto[] {
  return PRODUCTOS_MOCK;
}

export function obtenerProductoPorId(productoId: string): Producto | undefined {
  return PRODUCTOS_MOCK.find((producto) => producto.id === productoId);
}

export async function obtenerProductosDesdeApi(): Promise<Producto[]> {
  try {
    const respuesta = await fetch(`${API_BASE_URL}/api/productos`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!respuesta.ok) {
      return PRODUCTOS_MOCK;
    }

    const data = (await respuesta.json()) as Producto[];
    return data.length ? data : PRODUCTOS_MOCK;
  } catch {
    return PRODUCTOS_MOCK;
  }
}
