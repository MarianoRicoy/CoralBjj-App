import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const RUTA_CONSTRUCCION = "/construccion";
const COOKIE_ACCESO = "coral_acceso";
const PARAM_ACCESO = "acceso";

// Clave secreta para acceder al sitio real mientras está en construcción.
// Configurable en Vercel con la variable de entorno PREVIEW_SECRET.
const CLAVE_ACCESO = process.env.PREVIEW_SECRET ?? "coral-staff-2026";

export function proxy(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl;

  // 1. Activar acceso con ?acceso=CLAVE -> guarda cookie y limpia la URL.
  if (searchParams.get(PARAM_ACCESO) === CLAVE_ACCESO) {
    const url = request.nextUrl.clone();
    url.searchParams.delete(PARAM_ACCESO);
    const response = NextResponse.redirect(url);
    response.cookies.set(COOKIE_ACCESO, CLAVE_ACCESO, {
      httpOnly: true,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 30, // 30 días
    });
    return response;
  }

  // 2. Si tiene la cookie válida, accede al sitio real con normalidad.
  const tieneAcceso = request.cookies.get(COOKIE_ACCESO)?.value === CLAVE_ACCESO;
  if (tieneAcceso) {
    return NextResponse.next();
  }

  // 3. Sin acceso: dejar pasar solo la vista de construcción.
  if (pathname === RUTA_CONSTRUCCION) {
    return NextResponse.next();
  }

  // 4. Cualquier otra ruta redirige a la vista de construcción.
  const url = request.nextUrl.clone();
  url.pathname = RUTA_CONSTRUCCION;
  url.search = "";
  return NextResponse.redirect(url);
}

export const config = {
  matcher: [
    // Aplica a todas las rutas excepto assets estáticos, imágenes y archivos con extensión.
    "/((?!_next/static|_next/image|favicon.ico|.*\\..*).*)",
  ],
};
