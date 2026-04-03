import { Router } from "express";
import type { Request, Response } from "express";

import { appDataSource } from "../data-source.js";
import { ProductoEntity } from "../entities/producto.entity.js";

export const productosRouter = Router();

productosRouter.get("/", async (_req: Request, res: Response) => {
  try {
    const productos = await appDataSource.getRepository(ProductoEntity).find({
      relations: { variantes: true },
      order: { creadoEn: "DESC" },
    });

    return res.status(200).json(productos);
  } catch (error) {
    return res.status(500).json({
      mensaje: "No se pudieron obtener productos desde la base de datos.",
      detalle: error instanceof Error ? error.message : "Error desconocido",
    });
  }
});

productosRouter.get("/:id", async (req: Request, res: Response) => {
  try {
    const producto = await appDataSource.getRepository(ProductoEntity).findOne({
      where: { id: req.params.id },
      relations: { variantes: true },
    });

    if (!producto) {
      return res.status(404).json({ mensaje: "Producto no encontrado." });
    }

    return res.status(200).json(producto);
  } catch (error) {
    return res.status(500).json({
      mensaje: "No se pudo obtener el producto solicitado.",
      detalle: error instanceof Error ? error.message : "Error desconocido",
    });
  }
});
