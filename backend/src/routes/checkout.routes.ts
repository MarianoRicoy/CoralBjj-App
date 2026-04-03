import { Router } from "express";
import type { Request, Response } from "express";
import { z } from "zod";

import { appDataSource } from "../data-source.js";
import { EstadoOrden } from "../entities/estado-orden.js";
import { ItemOrdenEntity } from "../entities/item-orden.entity.js";
import { OrdenEntity } from "../entities/orden.entity.js";
import { ProductoEntity } from "../entities/producto.entity.js";
import { VarianteProductoEntity } from "../entities/variante-producto.entity.js";
import { crearPreferenciaMercadoPago, type ItemPreferencia } from "../services/mercadopago.js";

const checkoutSchema = z.object({
  nombreCompleto: z.string().min(3),
  email: z.email(),
  telefono: z.string().min(8),
  direccion: z.string().min(5),
  ciudad: z.string().min(2),
  provincia: z.string().min(2),
  codigoPostal: z.string().min(3),
  items: z
    .array(
      z.object({
        productoId: z.string().min(1),
        varianteId: z.string().min(1),
        cantidad: z.number().int().positive(),
      }),
    )
    .min(1),
});

export const checkoutRouter = Router();

checkoutRouter.post("/", async (req: Request, res: Response) => {
  const validacion = checkoutSchema.safeParse(req.body);

  if (!validacion.success) {
    return res.status(400).json({
      mensaje: "Datos de checkout inválidos.",
      errores: validacion.error.flatten(),
    });
  }

  const payload = validacion.data;
  const queryRunner = appDataSource.createQueryRunner();

  await queryRunner.connect();
  await queryRunner.startTransaction();

  try {
    const itemsPreferencia: ItemPreferencia[] = [];

    const variantes = await queryRunner.manager.find(VarianteProductoEntity, {
      where: payload.items.map((item) => ({ id: item.varianteId })),
      relations: { producto: true },
    });

    if (variantes.length !== payload.items.length) {
      throw new Error("Hay variantes inexistentes en el carrito.");
    }

    for (const item of payload.items) {
      const variante = variantes.find((v: VarianteProductoEntity) => v.id === item.varianteId);

      if (!variante || variante.stock < item.cantidad) {
        throw new Error("Stock insuficiente para completar la compra.");
      }
    }

    let total = 0;

    const orden = queryRunner.manager.create(OrdenEntity, {
      nombreCompleto: payload.nombreCompleto,
      email: payload.email,
      telefono: payload.telefono,
      direccion: payload.direccion,
      ciudad: payload.ciudad,
      provincia: payload.provincia,
      codigoPostal: payload.codigoPostal,
      estado: EstadoOrden.PENDIENTE,
      total: 0,
      moneda: "ARS",
      proveedorPago: "MERCADOPAGO",
      referenciaExterna: null,
    });

    const ordenCreada = await queryRunner.manager.save(orden);

    for (const item of payload.items) {
      const variante = variantes.find((v: VarianteProductoEntity) => v.id === item.varianteId);

      if (!variante) {
        continue;
      }

      const subtotal = variante.precio * item.cantidad;
      total += subtotal;

      itemsPreferencia.push({
        title: variante.producto.nombre,
        quantity: item.cantidad,
        unit_price: variante.precio,
        currency_id: "ARS",
      });

      const nuevoItem = queryRunner.manager.create(ItemOrdenEntity, {
        ordenId: ordenCreada.id,
        productoId: variante.productoId,
        varianteId: variante.id,
        nombreProducto: variante.producto.nombre,
        detalleVariante: `${variante.nombre}: ${variante.valor}`,
        precioUnitario: variante.precio,
        cantidad: item.cantidad,
        subtotal,
      });

      await queryRunner.manager.save(nuevoItem);

      await queryRunner.manager.decrement(VarianteProductoEntity, { id: variante.id }, "stock", item.cantidad);

      await queryRunner.manager.decrement(ProductoEntity, { id: variante.productoId }, "stockTotal", item.cantidad);
    }

    ordenCreada.total = total;
    ordenCreada.referenciaExterna = `orden-${ordenCreada.id}`;
    const ordenFinal = await queryRunner.manager.save(ordenCreada);

    await queryRunner.commitTransaction();

    const preferencia = await crearPreferenciaMercadoPago({
      referenciaExterna: ordenFinal.referenciaExterna ?? `orden-${ordenFinal.id}`,
      emailComprador: ordenFinal.email,
      items: itemsPreferencia,
    });

    return res.status(201).json({
      mensaje: "Orden creada correctamente.",
      ordenId: ordenFinal.id,
      referencia: ordenFinal.referenciaExterna,
      preferenciaId: preferencia?.id ?? null,
      checkoutUrl: preferencia?.init_point ?? null,
    });
  } catch (error) {
    await queryRunner.rollbackTransaction();

    return res.status(500).json({
      mensaje: "No se pudo iniciar el checkout.",
      detalle: error instanceof Error ? error.message : "Error desconocido",
    });
  } finally {
    await queryRunner.release();
  }
});
