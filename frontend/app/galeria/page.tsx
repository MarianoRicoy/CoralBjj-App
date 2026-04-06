import { readdir } from "node:fs/promises";
import path from "node:path";

import type { Metadata } from "next";
import Image from "next/image";

import { ETAPAS_GALERIA_HISTORIA, EXTENSIONES_GALERIA_VALIDAS } from "@/lib/galeria-historia";
import { PLACEHOLDER_BASE64 } from "@/lib/media";

export const metadata: Metadata = {
  title: "Galería",
  description: "Recorrido visual de Coral BJJ Studio desde nuestros comienzos hasta hoy.",
};

type EtapaConFotos = {
  slug: string;
  titulo: string;
  descripcion: string;
  fotos: string[];
};

async function obtenerEtapasConFotos(): Promise<EtapaConFotos[]> {
  const basePath = path.join(process.cwd(), "public", "galeriaHistoria");

  return Promise.all(
    ETAPAS_GALERIA_HISTORIA.map(async (etapa) => {
      const etapaPath = path.join(basePath, etapa.slug);

      let archivos: string[] = [];

      try {
        archivos = await readdir(etapaPath);
      } catch {
        archivos = [];
      }

      const fotos = archivos
        .filter((archivo) => {
          const extension = path.extname(archivo).toLowerCase();
          return EXTENSIONES_GALERIA_VALIDAS.includes(
            extension as (typeof EXTENSIONES_GALERIA_VALIDAS)[number],
          );
        })
        .sort((a, b) => a.localeCompare(b, "es"))
        .map((archivo) => `/galeriaHistoria/${etapa.slug}/${encodeURIComponent(archivo)}`);

      return {
        ...etapa,
        fotos,
      };
    }),
  );
}

export default async function GaleriaPage() {
  const etapas = await obtenerEtapasConFotos();

  return (
    <main className="mx-auto flex w-full max-w-7xl flex-1 flex-col gap-8 px-4 py-8 md:px-8 md:py-12">
      <section className="space-y-4">
        <p className="inline-flex rounded-full border border-white/35 bg-white/10 px-3 py-1 text-xs tracking-[0.2em] text-zinc-100 uppercase">
          Galería histórica
        </p>
        <h1 className="text-4xl leading-tight font-primary text-white md:text-6xl">
          Nuestra historia, desde los comienzos hasta hoy.
        </h1>
        <p className="max-w-3xl text-base text-zinc-300 md:text-lg">
          Esta vista se actualiza automáticamente con las fotos que subas en cada etapa de
          <span className="font-medium text-zinc-100"> /public/galeriaHistoria</span>.
        </p>
      </section>

      <section className="rounded-2xl border border-white/15 bg-black/35 p-5 text-sm text-zinc-300 md:p-6 md:text-base">
        <p className="font-coralbold text-[#f2685d] uppercase">Dónde subir fotos</p>
        <ul className="mt-3 space-y-2">
          {ETAPAS_GALERIA_HISTORIA.map((etapa) => (
            <li key={etapa.slug}>
              <span className="text-zinc-100">{etapa.titulo}:</span> {`frontend/public/galeriaHistoria/${etapa.slug}/`}
            </li>
          ))}
        </ul>
      </section>

      <section className="space-y-8">
        {etapas.map((etapa) => (
          <article key={etapa.slug} className="space-y-4 rounded-2xl border border-white/10 bg-black/25 p-4 md:p-5">
            <div className="space-y-2">
              <h2 className="text-2xl font-primary text-white md:text-3xl">{etapa.titulo}</h2>
              <p className="max-w-3xl text-sm text-zinc-300 md:text-base">{etapa.descripcion}</p>
            </div>

            {etapa.fotos.length > 0 ? (
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {etapa.fotos.map((foto, index) => (
                  <figure key={`${etapa.slug}-${foto}`} className="group relative aspect-[4/3] overflow-hidden rounded-xl border border-white/10">
                    <Image
                      alt={`${etapa.titulo} ${index + 1}`}
                      blurDataURL={PLACEHOLDER_BASE64}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      fill
                      placeholder="blur"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      src={foto}
                    />
                  </figure>
                ))}
              </div>
            ) : (
              <div className="rounded-xl border border-dashed border-white/20 bg-black/20 px-4 py-8 text-sm text-zinc-400 md:text-base">
                Todavía no hay fotos en esta etapa. Agregá imágenes en
                <span className="font-medium text-zinc-100"> {`frontend/public/galeriaHistoria/${etapa.slug}/`}</span>.
              </div>
            )}
          </article>
        ))}
      </section>
    </main>
  );
}
