import "dotenv/config";

import { appDataSource } from "./data-source.js";
import { createApp } from "./app.js";

async function bootstrap() {
  await appDataSource.initialize();

  const app = createApp();
  const port = Number(process.env.BACKEND_PORT ?? 4000);

  app.listen(port, () => {
    console.log(`Backend Coral BJJ escuchando en http://localhost:${port}`);
  });
}

bootstrap().catch((error) => {
  console.error("No se pudo iniciar el backend:", error);
  process.exit(1);
});
