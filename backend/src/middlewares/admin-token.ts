import type { NextFunction, Request, Response } from "express";

function obtenerTokenDesdeHeaders(headers: Request["headers"]): string | null {
  const authorization = headers.authorization;

  if (authorization?.toLowerCase().startsWith("bearer ")) {
    return authorization.slice(7).trim();
  }

  const tokenHeader = headers["x-admin-token"];

  if (typeof tokenHeader === "string") {
    return tokenHeader.trim();
  }

  return null;
}

export function validarTokenAdmin(req: Request, res: Response, next: NextFunction) {
  const tokenEsperado = process.env.ADMIN_API_TOKEN;

  if (!tokenEsperado) {
    return res.status(500).json({ mensaje: "ADMIN_API_TOKEN no está configurado en el entorno." });
  }

  const tokenRecibido = obtenerTokenDesdeHeaders(req.headers);

  if (!tokenRecibido || tokenRecibido !== tokenEsperado) {
    return res.status(401).json({ mensaje: "No autorizado." });
  }

  next();
}
