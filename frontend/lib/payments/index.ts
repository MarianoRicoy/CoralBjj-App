import type { CheckoutPayload } from "@/types/formularios";
import type { ItemCarrito } from "@/types/producto";

export interface PagoResultado {
  ok: boolean;
  mensaje: string;
  referencia?: string;
}

export interface GatewayPago {
  crearPreferencia: (payload: CheckoutPayload, items: ItemCarrito[]) => Promise<PagoResultado>;
}
