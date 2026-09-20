"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function Error({
  error,
  reset,
  unstable_retry,
}: {
  error: Error & { digest?: string };
  reset: () => void;
  unstable_retry?: () => void;
}) {
  useEffect(() => {
    console.error("Coral BJJ App Error:", error);
  }, [error]);

  const handleRetry = () => {
    if (typeof unstable_retry === "function") {
      unstable_retry();
    } else {
      reset();
    }
  };

  return (
    <main className="relative flex min-h-[70vh] flex-1 flex-col items-center justify-center px-6 py-20 text-center">
      <div className="mx-auto max-w-lg space-y-6">
        <p className="font-coralbold text-xs uppercase tracking-[0.25em] text-[#f2685d]">
          Aviso
        </p>

        <h1 className="font-primary text-3xl uppercase tracking-tight text-white md:text-5xl">
          Algo salió mal
        </h1>

        <p className="font-tertiary text-base leading-relaxed text-zinc-300 md:text-lg">
          Ocurrió un inconveniente inesperado al procesar la solicitud. Podés intentar recargar la sección o regresar al inicio.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
          <button
            type="button"
            onClick={handleRetry}
            className="inline-flex h-11 items-center justify-center rounded-lg bg-[#f2685d] px-8 text-xs font-coralbold uppercase tracking-widest text-white transition-colors hover:bg-[#ff766a]"
          >
            Reintentar
          </button>
          <Link
            href="/"
            className="inline-flex h-11 items-center justify-center rounded-lg border border-white/20 bg-black/40 px-8 text-xs font-coralbold uppercase tracking-widest text-zinc-200 transition-colors hover:border-white hover:text-white"
          >
            Ir al inicio
          </Link>
        </div>
      </div>
    </main>
  );
}
