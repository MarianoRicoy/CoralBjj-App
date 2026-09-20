import Link from "next/link";

export default function NotFound() {
  return (
    <main className="relative flex min-h-[70vh] flex-1 flex-col items-center justify-center px-6 py-20 text-center">
      <div className="mx-auto max-w-lg space-y-6">
        <p className="font-coralbold text-xs uppercase tracking-[0.25em] text-[#f2685d]">
          Error 404
        </p>

        <h1 className="font-primary text-3xl uppercase tracking-tight text-white md:text-5xl">
          Página no encontrada
        </h1>

        <p className="font-tertiary text-base leading-relaxed text-zinc-300 md:text-lg">
          La página que buscás no existe o fue trasladada. Podés volver a la pantalla de inicio para continuar explorando Coral.
        </p>

        <div className="pt-2">
          <Link
            href="/"
            className="inline-flex h-11 items-center justify-center rounded-lg bg-[#f2685d] px-8 text-xs font-coralbold uppercase tracking-widest text-white transition-colors hover:bg-[#ff766a]"
          >
            Volver al inicio
          </Link>
        </div>
      </div>
    </main>
  );
}
