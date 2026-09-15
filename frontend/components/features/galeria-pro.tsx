"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Maximize2, X } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

import { FOTOS_GALERIA, PLACEHOLDER_BASE64 } from "@/lib/media";

const CANTIDAD_SLOTS = 6;
const INTERVALO_ROTACION_MS = 5000;

export function GaleriaPro() {
  const [fotoSeleccionadaIndex, setFotoSeleccionadaIndex] = useState<number | null>(null);
  const [offset, setOffset] = useState(0);
  const [pausado, setPausado] = useState(false);

  const fotoSeleccionada =
    fotoSeleccionadaIndex !== null ? FOTOS_GALERIA[fotoSeleccionadaIndex] : null;

  // Escuchar evento personalizado desde la navbar o parámetro de la URL
  useEffect(() => {
    function alDispararAbrir() {
      setFotoSeleccionadaIndex(0);
    }

    window.addEventListener("coral:abrir-galeria", alDispararAbrir);

    if (typeof window !== "undefined") {
      const url = new URL(window.location.href);
      if (url.searchParams.get("abrirGaleria") === "true") {
        url.searchParams.delete("abrirGaleria");
        window.history.replaceState({}, "", url.pathname + (url.hash || ""));
        setTimeout(() => {
          setFotoSeleccionadaIndex(0);
          document.getElementById("galeria")?.scrollIntoView({ behavior: "smooth" });
        }, 100);
      }
    }

    return () => {
      window.removeEventListener("coral:abrir-galeria", alDispararAbrir);
    };
  }, []);

  // Control del modal con teclado y bloqueo de scroll
  useEffect(() => {
    if (fotoSeleccionadaIndex === null) {
      return;
    }

    function alPresionar(evento: KeyboardEvent) {
      if (evento.key === "Escape") {
        setFotoSeleccionadaIndex(null);
      } else if (evento.key === "ArrowRight") {
        setFotoSeleccionadaIndex((prev) =>
          prev !== null ? (prev + 1) % FOTOS_GALERIA.length : null,
        );
      } else if (evento.key === "ArrowLeft") {
        setFotoSeleccionadaIndex((prev) =>
          prev !== null ? (prev - 1 + FOTOS_GALERIA.length) % FOTOS_GALERIA.length : null,
        );
      }
    }

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", alPresionar);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", alPresionar);
    };
  }, [fotoSeleccionadaIndex]);

  // Rotación suave automática de las 6 fotos cada 5 segundos
  useEffect(() => {
    if (pausado || fotoSeleccionadaIndex !== null || FOTOS_GALERIA.length <= 1) {
      return;
    }

    const timer = setInterval(() => {
      setOffset((prev) => (prev + 1) % FOTOS_GALERIA.length);
    }, INTERVALO_ROTACION_MS);

    return () => clearInterval(timer);
  }, [pausado, fotoSeleccionadaIndex]);

  const irFotoAnterior = () => {
    setFotoSeleccionadaIndex((prev) =>
      prev !== null ? (prev - 1 + FOTOS_GALERIA.length) % FOTOS_GALERIA.length : null,
    );
  };

  const irFotoSiguiente = () => {
    setFotoSeleccionadaIndex((prev) =>
      prev !== null ? (prev + 1) % FOTOS_GALERIA.length : null,
    );
  };

  const rotarAnterior = () => {
    setOffset((prev) => (prev - 1 + FOTOS_GALERIA.length) % FOTOS_GALERIA.length);
  };

  const rotarSiguiente = () => {
    setOffset((prev) => (prev + 1) % FOTOS_GALERIA.length);
  };

  // Generamos los 6 espacios de la grilla tomando fotos del pool según el offset actual
  const fotosVisibles = Array.from({ length: CANTIDAD_SLOTS }, (_, indiceSlot) => {
    const indexFoto = (indiceSlot + offset) % FOTOS_GALERIA.length;
    return {
      slot: indiceSlot,
      indexFoto,
      foto: FOTOS_GALERIA[indexFoto],
    };
  });

  return (
    <section id="galeria" aria-labelledby="galeria-titulo" className="scroll-mt-32 space-y-6">
      <div className="flex flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-left">
        <div className="space-y-2">
          <h2 id="galeria-titulo" className="text-3xl font-primary uppercase tracking-tight text-white md:text-4xl">
            Galería de fotos
          </h2>
          <p className="text-sm text-zinc-400 md:text-base">
            Nuestra historia, la energía del estudio y la comunidad que da vida a Coral BJJ.
          </p>
        </div>

        {/* Controles de rotación manual */}
        <div className="flex items-center gap-3 self-center sm:self-end">
          <span className="text-xs uppercase tracking-widest text-zinc-500">
            {FOTOS_GALERIA.length} fotos
          </span>
          <button
            type="button"
            onClick={rotarAnterior}
            aria-label="Rotar fotos anteriores"
            className="rounded-full border border-white/10 bg-black/40 p-2 text-zinc-300 backdrop-blur-sm transition-all hover:border-white/30 hover:bg-white/10 hover:text-white"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={rotarSiguiente}
            aria-label="Rotar fotos siguientes"
            className="rounded-full border border-white/10 bg-black/40 p-2 text-zinc-300 backdrop-blur-sm transition-all hover:border-white/30 hover:bg-white/10 hover:text-white"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div
        onMouseEnter={() => setPausado(true)}
        onMouseLeave={() => setPausado(false)}
        className="grid auto-rows-[180px] grid-cols-2 gap-3 md:auto-rows-[240px] md:grid-cols-4 md:gap-4"
      >
        {fotosVisibles.map(({ slot, indexFoto, foto }) => (
          <motion.button
            key={slot}
            type="button"
            onClick={() => setFotoSeleccionadaIndex(indexFoto)}
            aria-label={`Ver foto ampliada: ${foto.alt}`}
            className={`group relative cursor-pointer overflow-hidden rounded-2xl border border-white/10 bg-black/40 text-left transition-all duration-300 hover:border-white/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f2685d] ${
              slot === 0 || slot === 3 ? "col-span-2" : "col-span-1"
            }`}
            initial={{ opacity: 0, y: 18 }}
            transition={{ delay: slot * 0.08, duration: 0.5 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={foto.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6 }}
                className="relative h-full w-full"
              >
                <Image
                  alt={foto.alt}
                  blurDataURL={PLACEHOLDER_BASE64}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  fill
                  placeholder="blur"
                  sizes="(max-width: 768px) 50vw, 25vw"
                  src={foto.src}
                />
              </motion.div>
            </AnimatePresence>

            {/* Overlay sutil al hacer hover */}
            <div className="absolute inset-0 flex items-center justify-center bg-black/25 opacity-0 backdrop-blur-[1px] transition-opacity duration-300 group-hover:opacity-100">
              <span className="rounded-full border border-white/20 bg-black/60 p-2.5 text-white/90 shadow-lg backdrop-blur-md transition-transform duration-300 group-hover:scale-110">
                <Maximize2 className="h-4 w-4 md:h-5 md:w-5" />
              </span>
            </div>
          </motion.button>
        ))}
      </div>

      {/* Modal Lightbox */}
      {fotoSeleccionada ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={fotoSeleccionada.alt}
          onClick={() => setFotoSeleccionadaIndex(null)}
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
        >
          <div
            onClick={(evento) => evento.stopPropagation()}
            className="relative flex max-h-[90vh] w-full max-w-4xl flex-col items-center gap-6 overflow-y-auto rounded-[2rem] border border-white/10 bg-black/70 p-6 shadow-2xl shadow-black/60 backdrop-blur-xl md:p-8"
          >
            {/* Botón cerrar */}
            <button
              type="button"
              onClick={() => setFotoSeleccionadaIndex(null)}
              aria-label="Cerrar vista previa"
              className="absolute right-6 top-6 z-20 rounded-full border border-white/10 bg-black/60 p-2 text-white/80 backdrop-blur-md transition-colors hover:bg-white/10 hover:text-white"
            >
              <X className="h-6 w-6 md:h-7 md:w-7" />
            </button>

            {/* Contenedor de la foto con controles de navegación */}
            <div className="relative flex aspect-[4/3] max-h-[62vh] w-full items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-black/40">
              <AnimatePresence mode="wait">
                <motion.div
                  key={fotoSeleccionada.id}
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.25 }}
                  className="relative h-full w-full"
                >
                  <Image
                    alt={fotoSeleccionada.alt}
                    blurDataURL={PLACEHOLDER_BASE64}
                    className="h-full w-full object-contain"
                    fill
                    placeholder="blur"
                    priority
                    sizes="(max-width: 1024px) 95vw, 1000px"
                    src={fotoSeleccionada.src}
                  />
                </motion.div>
              </AnimatePresence>

              {/* Botón Anterior */}
              <button
                type="button"
                onClick={irFotoAnterior}
                aria-label="Foto anterior"
                className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full border border-white/10 bg-black/60 p-2 text-white/80 backdrop-blur-md transition-all hover:scale-110 hover:bg-black/90 hover:text-white"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>

              {/* Botón Siguiente */}
              <button
                type="button"
                onClick={irFotoSiguiente}
                aria-label="Foto siguiente"
                className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full border border-white/10 bg-black/60 p-2 text-white/80 backdrop-blur-md transition-all hover:scale-110 hover:bg-black/90 hover:text-white"
              >
                <ChevronRight className="h-6 w-6" />
              </button>
            </div>

            {/* Pie del modal: Información y controles de navegación rápida */}
            <div className="flex w-full flex-col items-center justify-between gap-3 text-center sm:flex-row sm:text-left">
              <div className="space-y-1">
                <p className="font-primary text-xl uppercase tracking-wider text-white md:text-2xl">
                  {fotoSeleccionada.alt}
                </p>
                <p className="text-xs uppercase tracking-widest text-zinc-400">
                  Foto {(fotoSeleccionadaIndex ?? 0) + 1} de {FOTOS_GALERIA.length} · Coral BJJ Studio
                </p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={irFotoAnterior}
                  className="rounded-full border border-white/20 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-zinc-300 transition-colors hover:bg-white/10 hover:text-white"
                >
                  Anterior
                </button>
                <button
                  type="button"
                  onClick={irFotoSiguiente}
                  className="rounded-full border border-[#f2685d]/60 bg-[#f2685d]/20 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-white transition-colors hover:bg-[#f2685d] hover:text-white"
                >
                  Siguiente
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
}
