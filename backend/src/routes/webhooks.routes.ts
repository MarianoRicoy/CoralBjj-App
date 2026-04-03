import { Router } from "express";
import type { Request, Response } from "express";

import { appDataSource } from "../data-source.js";
import { EstadoOrden } from "../entities/estado-orden.js";
import { OrdenEntity } from "../entities/orden.entity.js";
import { WebhookPagoEntity } from "../entities/webhook-pago.entity.js";
import { obtenerPagoMercadoPago } from "../services/mercadopago.js";

interface EventoMercadoPago {
  action?: string;
  type?: string;
  data?: {
    id?: string;
  };
}

function estadoDesdeMp(estado?: string): EstadoOrden {
  if (estado === "approved") {
    return EstadoOrden.PAGADO;
  }

  if (estado === "rejected") {
    return EstadoOrden.FALLIDO;
  }

  if (estado === "cancelled") {
    return EstadoOrden.CANCELADO;
  }

  return EstadoOrden.PENDIENTE;
}

export const webhooksRouter = Router();

webhooksRouter.post("/mercadopago", async (req: Request, res: Response) => {
  const firmaHeader = req.headers["x-signature"];
  const firma = typeof firmaHeader === "string" ? firmaHeader : "";
  const secreto = process.env.MERCADOPAGO_WEBHOOK_SECRET;

  if (secreto && !firma.includes(secreto)) {
    return res.status(401).json({ mensaje: "Firma inválida." });
  }

  const evento = req.body as EventoMercadoPago;

  const webhookRepo = appDataSource.getRepository(WebhookPagoEntity);
  const ordenRepo = appDataSource.getRepository(OrdenEntity);

  const registro = await webhookRepo.save(
    webhookRepo.create({
      proveedor: "MERCADOPAGO",
      tipo: evento.type ?? evento.action ?? null,
      payload: JSON.parse(JSON.stringify(evento)) as Record<string, unknown>,
      procesado: false,
    }),
  );

  if (evento.type !== "payment" || !evento.data?.id) {
    return res.status(200).json({ ok: true, procesado: false });
  }

  const pago = await obtenerPagoMercadoPago(evento.data.id);

  if (!pago?.external_reference) {
    return res.status(200).json({ ok: true, procesado: false });
  }

  await ordenRepo.update(
    { referenciaExterna: pago.external_reference },
    { estado: estadoDesdeMp(pago.status) },
  );

  await webhookRepo.update({ id: registro.id }, { procesado: true });

  return res.status(200).json({ ok: true, procesado: true });
});
