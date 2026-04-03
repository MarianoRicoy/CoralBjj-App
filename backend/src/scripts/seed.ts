import "dotenv/config";

import { appDataSource } from "../data-source.js";
import { ProductoEntity } from "../entities/producto.entity.js";
import { VarianteProductoEntity } from "../entities/variante-producto.entity.js";

const productosSeed = [
  {
    id: "gi-coral-pro",
    slug: "gi-coral-pro",
    nombre: "Kimono Coral Pro",
    descripcion: "Kimono premium para entrenamiento intenso y competencia.",
    precioBase: 169000,
    moneda: "ARS",
    stockTotal: 18,
    imagen:
      "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=1200&q=80",
    categoria: "indumentaria",
    destacado: true,
    variantes: [
      { id: "gcp-a1-blanco", nombre: "Talle", valor: "A1", stock: 7, precio: 169000 },
      { id: "gcp-a2-blanco", nombre: "Talle", valor: "A2", stock: 6, precio: 169000 },
      { id: "gcp-a3-blanco", nombre: "Talle", valor: "A3", stock: 5, precio: 174000 },
    ],
  },
  {
    id: "rashguard-coral",
    slug: "rashguard-coral",
    nombre: "Rashguard Studio",
    descripcion: "Compresión técnica para no-gi con secado rápido.",
    precioBase: 69000,
    moneda: "ARS",
    stockTotal: 32,
    imagen:
      "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=1200&q=80",
    categoria: "indumentaria",
    destacado: false,
    variantes: [
      { id: "rgs-s", nombre: "Talle", valor: "S", stock: 12, precio: 69000 },
      { id: "rgs-m", nombre: "Talle", valor: "M", stock: 11, precio: 69000 },
      { id: "rgs-l", nombre: "Talle", valor: "L", stock: 9, precio: 69000 },
    ],
  },
  {
    id: "cinturon-coral",
    slug: "cinturon-coral",
    nombre: "Cinturón Coral Signature",
    descripcion: "Tejido reforzado para máxima durabilidad.",
    precioBase: 39000,
    moneda: "ARS",
    stockTotal: 40,
    imagen:
      "https://images.unsplash.com/photo-1547347298-4074fc3086f0?auto=format&fit=crop&w=1200&q=80",
    categoria: "accesorios",
    destacado: false,
    variantes: [
      { id: "cc-azul", nombre: "Color", valor: "Azul", stock: 14, precio: 39000 },
      { id: "cc-marron", nombre: "Color", valor: "Marrón", stock: 13, precio: 39000 },
      { id: "cc-negro", nombre: "Color", valor: "Negro", stock: 13, precio: 42000 },
    ],
  },
] as const;

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
