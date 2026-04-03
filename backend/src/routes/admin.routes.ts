import { Router } from "express";
import type { Request, Response } from "express";
import { z } from "zod";

import { appDataSource } from "../data-source.js";
import { ProductoEntity } from "../entities/producto.entity.js";
import { VarianteProductoEntity } from "../entities/variante-producto.entity.js";
import { validarTokenAdmin } from "../middlewares/admin-token.js";

const actualizarProductoSchema = z
  .object({
    slug: z.string().min(2).optional(),
    nombre: z.string().min(2).optional(),
    descripcion: z.string().min(5).optional(),
    precioBase: z.number().int().positive().optional(),
    moneda: z.string().min(1).optional(),
    imagen: z.string().url().optional(),
    categoria: z.string().min(2).optional(),
    destacado: z.boolean().optional(),
  })
  .refine((data) => Object.keys(data).length > 0, {
    message: "Debes enviar al menos un campo para actualizar.",
  });

const actualizarVarianteSchema = z
  .object({
    precio: z.number().int().positive().optional(),
    stock: z.number().int().min(0).optional(),
  })
  .refine((data) => data.precio !== undefined || data.stock !== undefined, {
    message: "Debes enviar precio o stock para actualizar.",
  });

export const adminRouter = Router();

adminRouter.patch("/productos/:id", validarTokenAdmin, async (req: Request, res: Response) => {
  const validacion = actualizarProductoSchema.safeParse(req.body);

  if (!validacion.success) {
    return res.status(400).json({
      mensaje: "Payload inválido para actualizar producto.",
      errores: validacion.error.flatten(),
    });
  }

  const repo = appDataSource.getRepository(ProductoEntity);
  const resultado = await repo.update({ id: req.params.id }, validacion.data);

  if (!resultado.affected) {
    return res.status(404).json({ mensaje: "Producto no encontrado." });
  }

  const productoActualizado = await repo.findOne({
    where: { id: req.params.id },
    relations: { variantes: true },
  });

  return res.status(200).json(productoActualizado);
});

adminRouter.patch("/variantes/:id", validarTokenAdmin, async (req: Request, res: Response) => {
  const validacion = actualizarVarianteSchema.safeParse(req.body);

  if (!validacion.success) {
    return res.status(400).json({
      mensaje: "Payload inválido para actualizar variante.",
      errores: validacion.error.flatten(),
    });
  }

  const varianteRepo = appDataSource.getRepository(VarianteProductoEntity);
  const productoRepo = appDataSource.getRepository(ProductoEntity);

  const variante = await varianteRepo.findOne({ where: { id: req.params.id } });

  if (!variante) {
    return res.status(404).json({ mensaje: "Variante no encontrada." });
  }

  await varianteRepo.update({ id: variante.id }, validacion.data);

  const sumatoriaStock = await varianteRepo
    .createQueryBuilder("variante")
    .select("COALESCE(SUM(variante.stock), 0)", "suma")
    .where("variante.productoId = :productoId", { productoId: variante.productoId })
    .getRawOne<{ suma: string }>();

  await productoRepo.update(
    { id: variante.productoId },
    { stockTotal: Number(sumatoriaStock?.suma ?? "0") },
  );

  const varianteActualizada = await varianteRepo.findOne({ where: { id: variante.id } });

  return res.status(200).json(varianteActualizada);
});
