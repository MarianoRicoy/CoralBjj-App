import { Router } from "express";

import { adminRouter } from "./admin.routes.js";
import { checkoutRouter } from "./checkout.routes.js";
import { productosRouter } from "./productos.routes.js";
import { webhooksRouter } from "./webhooks.routes.js";

export const apiRouter = Router();

apiRouter.use("/productos", productosRouter);
apiRouter.use("/checkout", checkoutRouter);
apiRouter.use("/webhooks", webhooksRouter);
apiRouter.use("/admin", adminRouter);
