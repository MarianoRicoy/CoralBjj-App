import type { CheckoutPayload } from "@/types/formularios";
import type { ItemCarrito } from "@/types/producto";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:4000";

export async function iniciarCheckout(payload: CheckoutPayload, items: ItemCarrito[]) {
  const respuesta = await fetch(`${API_BASE_URL}/api/checkout`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ...payload,
      items: items.map((item) => ({
        productoId: item.productoId,
        varianteId: item.varianteId,
        cantidad: item.cantidad,
      })),
    }),
  });

  if (!respuesta.ok) {
    const errorBody = await respuesta.json().catch(() => ({ mensaje: "Error de checkout" }));
    return {
      ok: false,
      mensaje: errorBody.mensaje ?? "Error al iniciar checkout",
      referencia: "-",
    };
  }

  const data = (await respuesta.json()) as {
    mensaje: string;
    referencia: string;
    checkoutUrl: string | null;
  };

  return {
    ok: true,
    mensaje: data.checkoutUrl ? `Checkout creado. URL: ${data.checkoutUrl}` : data.mensaje,
    referencia: data.referencia,
  };
}
