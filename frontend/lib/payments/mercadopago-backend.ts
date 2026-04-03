interface PreferenciaItem {
  title: string;
  quantity: number;
  unit_price: number;
  currency_id: "ARS";
}

interface CrearPreferenciaInput {
  referenciaExterna: string;
  emailComprador: string;
  items: PreferenciaItem[];
}

interface PagoMercadoPago {
  id: number;
  status: string;
  external_reference: string | null;
}

const API_MP = "https://api.mercadopago.com";

export async function crearPreferenciaMercadoPago(input: CrearPreferenciaInput) {
  const accessToken = process.env.MERCADOPAGO_ACCESS_TOKEN;

  if (!accessToken) {
    return null;
  }

  const respuesta = await fetch(`${API_MP}/checkout/preferences`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      external_reference: input.referenciaExterna,
      payer: { email: input.emailComprador },
      items: input.items,
    }),
    cache: "no-store",
  });

  if (!respuesta.ok) {
    return null;
  }

  return (await respuesta.json()) as { id: string; init_point?: string };
}

export async function obtenerPagoMercadoPago(paymentId: string) {
  const accessToken = process.env.MERCADOPAGO_ACCESS_TOKEN;

  if (!accessToken) {
    return null;
  }

  const respuesta = await fetch(`${API_MP}/v1/payments/${paymentId}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    cache: "no-store",
  });

  if (!respuesta.ok) {
    return null;
  }

  return (await respuesta.json()) as PagoMercadoPago;
}
