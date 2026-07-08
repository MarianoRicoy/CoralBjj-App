import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Embajadores",
  description:
    "Embajadores de Coral BJJ Studio: atletas y referentes que representan la identidad y los valores de Coral.",
};

const PLACEHOLDERS = Array.from({ length: 6 }, (_, i) => i);

export default function EmbajadoresPage() {
  return (
    <main className="relative flex-1 overflow-x-hidden">
      <div className="relative mx-auto max-w-6xl px-6 py-20 md:py-28 lg:py-36">
        <h1 className="font-primary mb-6 text-3xl uppercase tracking-tight text-white md:text-4xl">
          Embajadores
        </h1>

        <p className="mb-12 max-w-2xl font-tertiary text-lg leading-[1.8] text-zinc-300 md:mb-16 md:text-xl">
          Atletas y referentes que representan la identidad de Coral dentro y fuera
          del tatami. Cada uno lleva nuestra forma de entender el Jiu Jitsu como
          camino, comunidad y expresión.
        </p>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {PLACEHOLDERS.map((i) => (
            <article
              key={i}
              className="overflow-hidden rounded-xl border border-white/10 bg-black/40 shadow-2xl shadow-black/40 backdrop-blur-xl transition-colors hover:border-white/20"
            >
              <div className="flex aspect-[3/4] items-center justify-center bg-white/5">
                <span className="font-tertiary text-sm uppercase tracking-widest text-zinc-500">
                  Próximamente
                </span>
              </div>
              <div className="px-5 py-4">
                <div className="mb-2 h-5 w-2/3 rounded bg-white/10" />
                <div className="h-3 w-1/3 rounded bg-white/5" />
              </div>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}
