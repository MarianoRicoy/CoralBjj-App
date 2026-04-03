import "dotenv/config";

import { appDataSource } from "../data-source.js";

async function main() {
  await appDataSource.initialize();
  await appDataSource.synchronize();
  await appDataSource.destroy();
  console.log("Schema TypeORM sincronizado correctamente.");
}

main().catch((error) => {
  console.error("Error al sincronizar schema:", error);
  process.exit(1);
});
