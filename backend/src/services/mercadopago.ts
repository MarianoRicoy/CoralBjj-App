export interface ItemPreferencia {
  title: string;
  quantity: number;
  unit_price: number;
  currency_id: "ARS";
}

interface CrearPreferenciaPayload {
  referenciaExterna: string;
  emailComprador: string;
  items: ItemPreferencia[];
}

interface PreferenciaMercadoPago {
  id?: string;
  init_point?: string;
}

interface PagoMercadoPago {
  status?: string;
  external_reference?: string;
}

const API_MP = "https://api.mercadopago.com";

export async function crearPreferenciaMercadoPago(
  payload: CrearPreferenciaPayload,
): Promise<PreferenciaMercadoPago | null> {
  const token = process.env.MERCADOPAGO_ACCESS_TOKEN;

  if (!token) {
    return null;
  }

  const response = await fetch(`${API_MP}/checkout/preferences`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      items: payload.items,
      external_reference: payload.referenciaExterna,
      payer: {
        email: payload.emailComprador,
      },
      back_urls: {
        success: process.env.NEXT_PUBLIC_BASE_URL,
        pending: process.env.NEXT_PUBLIC_BASE_URL,
        failure: process.env.NEXT_PUBLIC_BASE_URL,
      },
      auto_return: "approved",
    }),
  });

  if (!response.ok) {
    return null;
  }

  return (await response.json()) as PreferenciaMercadoPago;
}

export async function obtenerPagoMercadoPago(paymentId: string): Promise<PagoMercadoPago | null> {
  const token = process.env.MERCADOPAGO_ACCESS_TOKEN;

  if (!token) {
    return null;
  }

  const response = await fetch(`${API_MP}/v1/payments/${paymentId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    method: "GET",
  });

  if (!response.ok) {
    return null;
  }

  return (await response.json()) as PagoMercadoPago;
}
