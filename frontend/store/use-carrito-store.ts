import { create } from "zustand";

import type { ItemCarrito, Producto } from "@/types/producto";

interface CarritoState {
  items: ItemCarrito[];
  agregarItem: (producto: Producto, varianteId: string, cantidad?: number) => void;
  quitarItem: (productoId: string, varianteId: string) => void;
  limpiarCarrito: () => void;
  totalItems: () => number;
  totalMonto: () => number;
}

export const useCarritoStore = create<CarritoState>((set, get) => ({
  items: [],
  agregarItem: (producto, varianteId, cantidad = 1) => {
    const variante = producto.variantes.find((item) => item.id === varianteId);

    if (!variante || variante.stock <= 0) {
      return;
    }

    set((state) => {
      const indice = state.items.findIndex(
        (item) => item.productoId === producto.id && item.varianteId === varianteId,
      );

      if (indice >= 0) {
        const itemsActualizados = [...state.items];
        const itemExistente = itemsActualizados[indice];
        const nuevaCantidad = Math.min(itemExistente.cantidad + cantidad, variante.stock);

        itemsActualizados[indice] = {
          ...itemExistente,
          cantidad: nuevaCantidad,
        };

        return { items: itemsActualizados };
      }

      return {
        items: [
          ...state.items,
          {
            productoId: producto.id,
            varianteId,
            nombre: producto.nombre,
            variante: `${variante.nombre}: ${variante.valor}`,
            precioUnitario: variante.precio,
            cantidad: Math.min(cantidad, variante.stock),
            imagen: producto.imagen,
          },
        ],
      };
    });
  },
  quitarItem: (productoId, varianteId) => {
    set((state) => ({
      items: state.items.filter(
        (item) => item.productoId !== productoId || item.varianteId !== varianteId,
      ),
    }));
  },
  limpiarCarrito: () => set({ items: [] }),
  totalItems: () => get().items.reduce((acc, item) => acc + item.cantidad, 0),
  totalMonto: () =>
    get().items.reduce((acc, item) => acc + item.precioUnitario * item.cantidad, 0),
}));
