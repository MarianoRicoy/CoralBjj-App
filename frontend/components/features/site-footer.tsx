import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="mt-12 border-t border-white/10 bg-zinc-950">
      <div className="mx-auto grid w-full max-w-7xl gap-8 px-4 py-10 md:grid-cols-3 md:px-8">
        <section className="space-y-3">
          <h2 className="text-2xl font-primary text-white">Coral BJJ Studio</h2>
          <p className="max-w-sm text-sm text-zinc-300">
            Academia de Brazilian Jiu-Jitsu enfocada en técnica, progreso real y comunidad.
          </p>
          <p className="text-sm text-zinc-400">Lunes a sábado · Palermo, Buenos Aires</p>
        </section>

        <section className="space-y-3">
          <h3 className="text-sm tracking-[0.18em] text-cyan-200 uppercase">Navegación</h3>
          <ul className="space-y-2 text-sm text-zinc-200">
            <li>
              <Link className="transition-colors hover:text-cyan-200" href="/nosotros">
                Nosotros
              </Link>
            </li>
            <li>
              <Link className="transition-colors hover:text-cyan-200" href="/#horarios">
                Horarios
              </Link>
            </li>
            <li>
              <Link className="transition-colors hover:text-cyan-200" href="/#tienda">
                Tienda
              </Link>
            </li>
            <li>
              <Link className="transition-colors hover:text-cyan-200" href="/#formularios">
                Contacto
              </Link>
            </li>
          </ul>
        </section>

        <section className="space-y-3">
          <h3 className="text-sm tracking-[0.18em] text-cyan-200 uppercase">Contacto</h3>
          <ul className="space-y-2 text-sm text-zinc-200">
            <li>WhatsApp: +54 9 11 0000-0000</li>
            <li>Email: hola@coralbjj.com</li>
            <li>Instagram: @coralbjjstudio</li>
          </ul>
          <Link
            className="inline-flex h-11 items-center justify-center rounded-md border border-white/70 bg-black/30 px-6 text-sm font-tertiary font-medium tracking-[0.08em] text-zinc-100 uppercase transition-all duration-200 hover:-translate-y-0.5 hover:border-white hover:bg-white/10"
            href="/#formularios"
          >
            Reservar clase
          </Link>
        </section>
      </div>

      <div className="border-t border-white/10 px-4 py-4 text-center text-xs text-zinc-400 md:px-8">
        © {new Date().getFullYear()} Coral BJJ Studio. Todos los derechos reservados.
      </div>
    </footer>
  );
}
