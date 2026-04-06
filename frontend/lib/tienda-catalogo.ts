import type { Producto } from "@/types/producto";

export const CATALOGO_TIENDA: Producto[] = [
  {
    id: "botella-termica-coral",
    slug: "botella-termica-coral",
    nombre: "Botella Térmica Coral",
    descripcion:
      "Botella reutilizable de alta resistencia para mantener tu hidratación durante entrenamientos y competencias.",
    precioBase: 32000,
    moneda: "ARS",
    stockTotal: 20,
    imagen: "/AccesoriosMockup/botellasCoral.png",
    categoria: "accesorios",
    destacado: true,
    variantes: [{ id: "btc-unica", nombre: "Presentación", valor: "Única", stock: 20, precio: 32000 }],
  },
  {
    id: "gorra-coral-studio",
    slug: "gorra-coral-studio",
    nombre: "Gorra Coral Studio",
    descripcion:
      "Gorra de calce cómodo y visera curva, ideal para el día a día con identidad Coral BJJ Studio.",
    precioBase: 28000,
    moneda: "ARS",
    stockTotal: 18,
    imagen: "/AccesoriosMockup/gorraCoral.png",
    categoria: "accesorios",
    variantes: [{ id: "gcs-unica", nombre: "Talle", valor: "Único", stock: 18, precio: 28000 }],
  },
  {
    id: "taza-coral-signature",
    slug: "taza-coral-signature",
    nombre: "Taza Coral Signature",
    descripcion:
      "Taza de cerámica con terminación premium para acompañarte antes y después de cada sesión.",
    precioBase: 19000,
    moneda: "ARS",
    stockTotal: 24,
    imagen: "/AccesoriosMockup/tazaCoral.png",
    categoria: "accesorios",
    variantes: [{ id: "tcs-unica", nombre: "Presentación", valor: "Única", stock: 24, precio: 19000 }],
  },
  {
    id: "calcos-coral-pack",
    slug: "calcos-coral-pack",
    nombre: "Pack de Calcos Coral",
    descripcion:
      "Set de calcos resistentes para personalizar notebook, botella, casco o equipamiento de entrenamiento.",
    precioBase: 12000,
    moneda: "ARS",
    stockTotal: 40,
    imagen: "/AccesoriosMockup/calcosCoral.png",
    categoria: "accesorios",
    variantes: [{ id: "ccp-pack", nombre: "Formato", valor: "Pack x5", stock: 40, precio: 12000 }],
  },
  {
    id: "cinta-coral-athletic",
    slug: "cinta-coral-athletic",
    nombre: "Cinta Coral Athletic",
    descripcion:
      "Cinta adhesiva de soporte para dedos y muñecas, diseñada para entrenamientos intensos en el tatami.",
    precioBase: 9500,
    moneda: "ARS",
    stockTotal: 36,
    imagen: "/AccesoriosMockup/cintaCoral.png",
    categoria: "equipamiento",
    variantes: [{ id: "cca-unica", nombre: "Medida", valor: "Única", stock: 36, precio: 9500 }],
  },
];
