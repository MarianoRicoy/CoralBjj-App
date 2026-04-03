import { NextResponse } from "next/server";

function obtenerTokenDesdeHeaders(headers: Headers): string | null {
  const authorization = headers.get("authorization");

  if (authorization?.toLowerCase().startsWith("bearer ")) {
    return authorization.slice(7).trim();
  }

  const tokenHeader = headers.get("x-admin-token");
  return tokenHeader?.trim() || null;
}

export function validarTokenAdmin(request: Request): NextResponse | null {
  const tokenEsperado = process.env.ADMIN_API_TOKEN;

  if (!tokenEsperado) {
    return NextResponse.json(
      { mensaje: "ADMIN_API_TOKEN no está configurado en el entorno." },
      { status: 500 },
    );
  }

  const tokenRecibido = obtenerTokenDesdeHeaders(request.headers);

  if (!tokenRecibido || tokenRecibido !== tokenEsperado) {
    return NextResponse.json({ mensaje: "No autorizado." }, { status: 401 });
  }

  return null;
}
