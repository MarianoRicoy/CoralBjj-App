// Categorías y familias de producto confirmadas por el dueño para Coral BJJ Studio.
// Esta información es de carácter editorial e institucional ("Líneas en preparación / Próximamente").
// NO constituye fuente transaccional: no posee precios, stock, imágenes ni variantes inventadas.

export interface CategoriaConfirmada {
  id: string;
  nombre: string;
  descripcion: string;
  familias: string[];
}

export const CATEGORIAS_CONFIRMADAS_CORAL: CategoriaConfirmada[] = [
  {
    id: "indumentaria",
    nombre: "Indumentaria Coral",
    descripcion:
      "Línea de indumentaria oficial diseñada con la identidad, el calce y los estándares de Coral BJJ Studio.",
    familias: ["Buzos", "Remeras", "Joggers", "Shorts"],
  },
  {
    id: "accesorios",
    nombre: "Accesorios",
    descripcion:
      "Complementos y artículos para acompañar tu rutina dentro y fuera del estudio.",
    familias: ["Gorras", "Gorros", "Mochilas", "Tazas"],
  },
  {
    id: "equipamiento",
    nombre: "Equipamiento BJJ",
    descripcion:
      "Equipamiento técnico para entrenamiento intensivo, Gi y No-Gi sobre el tatami.",
    familias: ["Kimonos", "Faixas", "Lycra", "Bermudas", "Shorts"],
  },
];
