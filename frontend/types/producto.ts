export type Moneda = "ARS";

export interface VarianteProducto {
  id: string;
  nombre: string;
  valor: string;
  stock: number;
  precio: number;
}

export interface Producto {
  id: string;
  slug: string;
  nombre: string;
  descripcion: string;
  precioBase: number;
  moneda: Moneda;
  stockTotal: number;
  imagen: string;
  categoria: "indumentaria" | "accesorios" | "equipamiento";
  variantes: VarianteProducto[];
  destacado?: boolean;
}

export interface ItemCarrito {
  productoId: string;
  varianteId: string;
  nombre: string;
  variante: string;
  precioUnitario: number;
  cantidad: number;
  imagen: string;
}
