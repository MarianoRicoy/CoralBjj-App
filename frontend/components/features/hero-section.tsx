"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";

import { PLACEHOLDER_BASE64 } from "@/lib/media";

const FOTOS_HOME = [
  {
    src: "/images/home/Coral Bjj Estudio 16.2.2025-26.jpg",
    alt: "Clase de jiu-jitsu en Coral BJJ Studio",
  },
  {
    src: "/images/home/Coral Bjj Estudio 16.2.2025-34.jpg",
    alt: "Entrenamiento técnico en tatami",
  },
  {
    src: "/images/home/IMG_9694.jpeg",
    alt: "Comunidad entrenando en Coral BJJ",
  },
  {
    src: "/images/home/IMG_9696.jpeg",
    alt: "Clase grupal en la academia",
  },
  {
    src: "/images/home/IMG_9876.jpeg",
    alt: "Profesor guiando técnica en el estudio",
  },
];

export function HeroSection() {
  const [slideActivo, setSlideActivo] = useState(0);

  const totalSlides = useMemo(() => FOTOS_HOME.length, []);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setSlideActivo((prev) => (prev + 1) % totalSlides);
    }, 4500);

    return () => window.clearInterval(timer);
  }, [totalSlides]);

  function siguienteSlide() {
    setSlideActivo((prev) => (prev + 1) % totalSlides);
  }

  function anteriorSlide() {
    setSlideActivo((prev) => (prev - 1 + totalSlides) % totalSlides);
  }

  return (
    <section className="relative min-h-[78vh] overflow-hidden rounded-3xl border border-white/10">
      <div className="absolute inset-0">
        {FOTOS_HOME.map((foto, index) => (
          <div
            key={foto.src}
            className={`absolute inset-0 transition-opacity duration-700 ${
              slideActivo === index ? "opacity-100" : "opacity-0"
            }`}
          >
            <Image
              alt={foto.alt}
              blurDataURL={PLACEHOLDER_BASE64}
              className="h-full w-full object-cover"
              fill
              placeholder="blur"
              priority={index === 0}
              sizes="100vw"
              src={foto.src}
            />
          </div>
        ))}
      </div>

      <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/55 to-black/25" />

      <div className="absolute right-4 bottom-4 z-20 flex items-center gap-2 md:right-6 md:bottom-6">
        <button
          aria-label="Slide anterior"
          className="rounded-full border border-white/30 bg-black/30 p-2 text-white transition-colors hover:bg-black/60"
          onClick={anteriorSlide}
          type="button"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
        <button
          aria-label="Slide siguiente"
          className="rounded-full border border-white/30 bg-black/30 p-2 text-white transition-colors hover:bg-black/60"
          onClick={siguienteSlide}
          type="button"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>

      <motion.div
        className="relative z-10 flex min-h-[78vh] flex-col justify-end gap-5 p-8 md:p-14"
        initial={{ opacity: 0, y: 24 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <span className="max-w-max rounded-full border border-cyan-300/50 bg-cyan-300/10 px-3 py-1 text-xs tracking-[0.2em] text-cyan-200 uppercase">
          Academia Premium de Brazilian Jiu-Jitsu
        </span>
        <h1 className="max-w-4xl text-4xl leading-tight font-primary text-white md:text-7xl">
          Técnica, cultura y alto rendimiento en el corazón de Coral BJJ Studio.
        </h1>
        <p className="max-w-2xl text-base text-zinc-200 md:text-lg">
          Formamos atletas y personas con una metodología clara: disciplina, detalle y comunidad.
        </p>

        <div className="mt-2 flex items-center gap-2">
          {FOTOS_HOME.map((foto, index) => (
            <button
              key={foto.src}
              aria-label={`Ir al slide ${index + 1}`}
              className={`h-2.5 rounded-full transition-all ${
                slideActivo === index ? "w-7 bg-cyan-200" : "w-2.5 bg-white/50"
              }`}
              onClick={() => setSlideActivo(index)}
              type="button"
            />
          ))}
        </div>
      </motion.div>
    </section>
  );
}
