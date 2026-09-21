import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

import type { ItemCarrito, Producto } from "@/types/producto";

interface CarritoState {
  items: ItemCarrito[];
  agregarItem: (producto: Producto, varianteId: string, cantidad?: number) => void;
  quitarItem: (productoId: string, varianteId: string) => void;
  incrementarCantidad: (productoId: string, varianteId: string, stockMaximo?: number) => void;
  decrementarCantidad: (productoId: string, varianteId: string) => void;
  actualizarItemRevalidado: (
    productoId: string,
    varianteId: string,
    cambios: Partial<ItemCarrito>,
  ) => void;
  limpiarCarrito: () => void;
  totalItems: () => number;
  totalMonto: () => number;
}

export const useCarritoStore = create<CarritoState>()(
  persist(
    (set, get) => ({
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
            const stockLimite = variante.stock;
            const nuevaCantidad = Math.min(itemExistente.cantidad + cantidad, stockLimite);

            itemsActualizados[indice] = {
              ...itemExistente,
              cantidad: Math.max(1, nuevaCantidad),
              stockDisponible: stockLimite,
              precioUnitario: variante.precio,
              noDisponible: false,
              motivoNoDisponible: undefined,
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
                cantidad: Math.max(1, Math.min(cantidad, variante.stock)),
                imagen: producto.imagen,
                stockDisponible: variante.stock,
                noDisponible: false,
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

      incrementarCantidad: (productoId, varianteId, stockMaximo) => {
        set((state) => ({
          items: state.items.map((item) => {
            if (item.productoId === productoId && item.varianteId === varianteId) {
              const limite = stockMaximo ?? item.stockDisponible ?? 99;
              return {
                ...item,
                cantidad: Math.min(item.cantidad + 1, Math.max(1, limite)),
              };
            }
            return item;
          }),
        }));
      },

      decrementarCantidad: (productoId, varianteId) => {
        set((state) => ({
          items: state.items.flatMap((item) => {
            if (item.productoId !== productoId || item.varianteId !== varianteId) {
              return [item];
            }

            if (item.cantidad <= 1) {
              return [];
            }

            return [
              {
                ...item,
                cantidad: item.cantidad - 1,
              },
            ];
          }),
        }));
      },

      actualizarItemRevalidado: (productoId, varianteId, cambios) => {
        set((state) => ({
          items: state.items.map((item) => {
            if (item.productoId === productoId && item.varianteId === varianteId) {
              return {
                ...item,
                ...cambios,
              };
            }
            return item;
          }),
        }));
      },

      limpiarCarrito: () => set({ items: [] }),

      totalItems: () =>
        get().items.reduce((acc, item) => (item.noDisponible ? acc : acc + item.cantidad), 0),

      totalMonto: () =>
        get().items.reduce(
          (acc, item) => (item.noDisponible ? acc : acc + item.precioUnitario * item.cantidad),
          0,
        ),
    }),
    {
      name: "coral-bjj-carrito",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ items: state.items }),
    },
  ),
);
