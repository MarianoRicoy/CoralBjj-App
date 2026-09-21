"use client";

import { useSyncExternalStore } from "react";
import { useCarritoStore } from "@/store/use-carrito-store";

const noopSubscribe = () => () => {};

export function useCarrito() {
  // useSyncExternalStore resuelve la hidratación de forma idiomática en React 19 sin setState en useEffect
  const montado = useSyncExternalStore(
    noopSubscribe,
    () => true,
    () => false,
  );

  const items = useCarritoStore((state) => state.items);
  const agregarItem = useCarritoStore((state) => state.agregarItem);
  const quitarItem = useCarritoStore((state) => state.quitarItem);
  const incrementarCantidad = useCarritoStore((state) => state.incrementarCantidad);
  const decrementarCantidad = useCarritoStore((state) => state.decrementarCantidad);
  const actualizarItemRevalidado = useCarritoStore((state) => state.actualizarItemRevalidado);
  const limpiarCarrito = useCarritoStore((state) => state.limpiarCarrito);
  const totalItems = useCarritoStore((state) => state.totalItems());
  const totalMonto = useCarritoStore((state) => state.totalMonto());

  return {
    items: montado ? items : [],
    agregarItem,
    quitarItem,
    incrementarCantidad,
    decrementarCantidad,
    actualizarItemRevalidado,
    limpiarCarrito,
    totalItems: montado ? totalItems : 0,
    totalMonto: montado ? totalMonto : 0,
    estaListo: montado,
  };
}
