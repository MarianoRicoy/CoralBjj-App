import type { CheckoutPayload } from "@/types/formularios";
import type { ItemCarrito } from "@/types/producto";

import type { GatewayPago, PagoResultado } from "@/lib/payments";

export class MercadoPagoService implements GatewayPago {
  async crearPreferencia(
    payload: CheckoutPayload,
    items: ItemCarrito[],
  ): Promise<PagoResultado> {
    const total = items.reduce((acc, item) => acc + item.precioUnitario * item.cantidad, 0);

    return {
      ok: true,
      mensaje:
        "Capa de pago lista para integrar SDK de Mercado Pago. Implementar endpoint real en /services.",
      referencia: `MP-DEMO-${payload.email}-${total}`,
    };
  }
}
