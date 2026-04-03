import "reflect-metadata";
import "dotenv/config";

import { DataSource } from "typeorm";

import { ItemOrdenEntity } from "./entities/item-orden.entity.js";
import { OrdenEntity } from "./entities/orden.entity.js";
import { ProductoEntity } from "./entities/producto.entity.js";
import { VarianteProductoEntity } from "./entities/variante-producto.entity.js";
import { WebhookPagoEntity } from "./entities/webhook-pago.entity.js";

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  throw new Error("DATABASE_URL no está configurada.");
}

export const appDataSource = new DataSource({
  type: "postgres",
  url: databaseUrl,
  synchronize: process.env.TYPEORM_SYNC === "true",
  logging: process.env.NODE_ENV === "development",
  entities: [
    ProductoEntity,
    VarianteProductoEntity,
    OrdenEntity,
    ItemOrdenEntity,
    WebhookPagoEntity,
  ],
});
