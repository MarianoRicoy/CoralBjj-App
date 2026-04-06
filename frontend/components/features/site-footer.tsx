import Image from "next/image";
import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="relative mt-12 overflow-hidden border-t border-white/10 bg-black/55">
      <div className="pointer-events-none absolute inset-0 bg-black/52" aria-hidden="true" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.095]"
        style={{
          backgroundImage: "url('/Forro%20calaveras.png'), url('/Forro%20calaveras.png')",
          backgroundPosition: "0 0, 170px 170px",
          backgroundRepeat: "repeat, repeat",
          backgroundSize: "340px 340px, 340px 340px",
        }}
      />

      <div className="relative w-full px-4 py-8 md:px-10 md:py-10 lg:px-14">
        <div className="flex flex-col items-center justify-center gap-10 text-center md:grid md:grid-cols-[1fr_auto_1fr] md:items-center md:gap-16 md:text-left">
          <section className="flex flex-col items-center gap-3 md:justify-self-start md:items-start">
            <Image
              alt="Coral BJJ Studio"
              className="h-auto w-[300px] max-w-full md:w-[460px]"
              height={512}
              src="/Isologo_Coral.png"
              width={512}
            />
          </section>

          <section className="space-y-3 md:justify-self-center">
            <h3 className="font-coralbold text-base tracking-[0.18em] text-[#f2685d] uppercase md:text-lg">Navegación</h3>
            <ul className="space-y-2 text-base text-zinc-100 md:text-lg">
              <li>
                <Link className="transition-colors hover:text-[#f2685d]" href="/nosotros">
                  Nosotros
                </Link>
              </li>
              <li>
                <Link className="transition-colors hover:text-[#f2685d]" href="/#horarios">
                  Horarios
                </Link>
              </li>
              <li>
                <Link className="transition-colors hover:text-[#f2685d]" href="/tienda">
                  Tienda
                </Link>
              </li>
              <li>
                <Link className="transition-colors hover:text-[#f2685d]" href="/#formularios">
                  Contacto
                </Link>
              </li>
            </ul>
          </section>

          <section className="space-y-3 md:justify-self-center md:text-right">
            <h3 className="font-coralbold text-base tracking-[0.18em] text-[#f2685d] uppercase md:text-lg">Contacto</h3>
            <ul className="space-y-2 text-base text-zinc-100 md:text-lg">
              <li>WhatsApp: +54 9 11 0000-0000</li>
              <li>Email: hola@coralbjj.com</li>
              <li>Instagram: @coralbjjstudio</li>
            </ul>
            <Link
              className="inline-flex h-12 items-center justify-center rounded-md border border-white/70 bg-black/30 px-7 text-base font-tertiary font-medium tracking-[0.08em] text-zinc-100 uppercase transition-all duration-200 hover:-translate-y-0.5 hover:border-white hover:bg-white/10"
              href="/#formularios"
            >
              Reservar clase
            </Link>
          </section>
        </div>

        <div className="mt-8 border-t border-white/30 pt-4 text-center text-xs text-zinc-300">
          © {new Date().getFullYear()} Coral BJJ Studio. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  );
}
