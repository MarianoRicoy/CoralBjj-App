"use client";

import { useCarritoStore } from "@/store/use-carrito-store";

export function useCarrito() {
  const items = useCarritoStore((state) => state.items);
  const agregarItem = useCarritoStore((state) => state.agregarItem);
  const quitarItem = useCarritoStore((state) => state.quitarItem);
  const incrementarCantidad = useCarritoStore((state) => state.incrementarCantidad);
  const decrementarCantidad = useCarritoStore((state) => state.decrementarCantidad);
  const limpiarCarrito = useCarritoStore((state) => state.limpiarCarrito);
  const totalItems = useCarritoStore((state) => state.totalItems());
  const totalMonto = useCarritoStore((state) => state.totalMonto());

  return {
    items,
    agregarItem,
    quitarItem,
    incrementarCantidad,
    decrementarCantidad,
    limpiarCarrito,
    totalItems,
    totalMonto,
  };
}
