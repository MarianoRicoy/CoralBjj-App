import "dotenv/config";

import { appDataSource } from "../data-source.js";
import { ProductoEntity } from "../entities/producto.entity.js";
import { VarianteProductoEntity } from "../entities/variante-producto.entity.js";

// Script de Seed para Coral BJJ Studio
// NOTA IMPORTANTE:
// No sembrar productos con precios, stock, variantes ni fotos ficticias.
// Cuando se reciban los datos comerciales oficiales de Agustín (precios, stock por talle/color,
// fotografías en alta resolución y nombres comerciales definitivos), se registrarán en esta lista.
type ProductoSeedInput = {
  id: string;
  slug: string;
  nombre: string;
  descripcion: string;
  precioBase: number;
  moneda: string;
  stockTotal: number;
  imagen: string;
  categoria: string;
  destacado?: boolean;
  variantes: Array<{
    id: string;
    nombre: string;
    valor: string;
    stock: number;
    precio: number;
  }>;
};

// Catálogo pendiente de datos comerciales oficiales confirmados por el dueño.
const productosSeed: ProductoSeedInput[] = [];

async function main() {
  await appDataSource.initialize();

  const productoRepo = appDataSource.getRepository(ProductoEntity);
  const varianteRepo = appDataSource.getRepository(VarianteProductoEntity);

  for (const producto of productosSeed) {
    const existente = await productoRepo.findOne({ where: { id: producto.id } });

    const entidad = productoRepo.create({
      ...producto,
      variantes: undefined,
    });

    if (existente) {
      await productoRepo.update({ id: producto.id }, entidad);
    } else {
      await productoRepo.save(entidad);
    }

    for (const variante of producto.variantes) {
      const varianteExistente = await varianteRepo.findOne({ where: { id: variante.id } });

      if (varianteExistente) {
        await varianteRepo.update({ id: variante.id }, { ...variante, productoId: producto.id });
      } else {
        await varianteRepo.save(
          varianteRepo.create({
            ...variante,
            productoId: producto.id,
          }),
        );
      }
    }
  }

  await appDataSource.destroy();
  console.log("Seed TypeORM ejecutado correctamente.");
}

main().catch((error) => {
  console.error("Error en seed TypeORM:", error);
  process.exit(1);
});
