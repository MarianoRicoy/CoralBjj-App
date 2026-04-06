import type { Metadata } from "next";
import Image from "next/image";

import { PLACEHOLDER_BASE64 } from "@/lib/media";

export const metadata: Metadata = {
  title: "Nosotros",
  description: "Conocé la filosofía, el equipo y la visión de Coral BJJ Studio.",
};

export default function NosotrosPage() {
  return (
    <main className="mx-auto flex w-full max-w-7xl flex-1 flex-col gap-10 px-4 py-8 md:px-8 md:py-12">
      <section className="grid items-center gap-8 md:grid-cols-2">
        <div className="space-y-4">
          <p className="inline-flex rounded-full border border-white/35 bg-white/10 px-3 py-1 text-xs tracking-[0.2em] text-zinc-100 uppercase">
            Sobre nosotros
          </p>
          <h1 className="text-4xl leading-tight font-primary text-white md:text-6xl">
            Somos una academia construida sobre técnica, respeto y comunidad.
          </h1>
          <p className="max-w-xl text-base text-zinc-300 md:text-lg">
            En Coral BJJ Studio formamos atletas y personas. Nuestro enfoque combina detalles técnicos,
            preparación progresiva y una cultura de entrenamiento donde cada alumno importa.
          </p>
        </div>

        <div className="relative min-h-[360px] overflow-hidden rounded-3xl border border-white/10">
          <Image
            alt="Entrenamiento en Coral BJJ Studio"
            blurDataURL={PLACEHOLDER_BASE64}
            className="h-full w-full object-cover"
            fill
            placeholder="blur"
            priority
            sizes="(max-width: 768px) 100vw, 50vw"
            src="/images/home/IMG_9696.jpeg"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/55 to-transparent" />
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        <article className="rounded-2xl border border-white/10 bg-zinc-900/70 p-5">
          <h2 className="mb-2 text-xl font-primary text-white">Nuestra misión</h2>
          <p className="text-sm text-zinc-300">
            Crear un espacio de mejora constante donde cada persona pueda evolucionar con disciplina y propósito.
          </p>
        </article>

        <article className="rounded-2xl border border-white/10 bg-zinc-900/70 p-5">
          <h2 className="mb-2 text-xl font-primary text-white">Nuestra metodología</h2>
          <p className="text-sm text-zinc-300">
            Entrenamientos estructurados por niveles, seguimiento técnico y foco en fundamentos sólidos.
          </p>
        </article>

        <article className="rounded-2xl border border-white/10 bg-zinc-900/70 p-5">
          <h2 className="mb-2 text-xl font-primary text-white">Nuestra comunidad</h2>
          <p className="text-sm text-zinc-300">
            Un equipo que empuja junto, celebra avances y prioriza el respeto dentro y fuera del tatami.
          </p>
        </article>
      </section>
    </main>
  );
}
