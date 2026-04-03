"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";

import { PLACEHOLDER_BASE64 } from "@/lib/media";

const FOTOS_HOME = [
  {
    src: "/images/home/FotoCarrousel01.jpg",
    alt: "Foto principal del carrusel Coral BJJ 01",
  },
  {
    src: "/images/home/FotoCarrousel02.jpeg",
    alt: "Foto del carrusel Coral BJJ 02",
  },
  {
    src: "/images/home/FotoCarrousel03.jpeg",
    alt: "Foto del carrusel Coral BJJ 03",
  },
  {
    src: "/images/home/FotoCarrousel04.jpg",
    alt: "Foto del carrusel Coral BJJ 04",
  },
  {
    src: "/images/home/FotoCarrousel05.jpg",
    alt: "Foto del carrusel Coral BJJ 05",
  },
  {
    src: "/images/home/FotoCarrousel06.jpeg",
    alt: "Foto del carrusel Coral BJJ 06",
  },
  {
    src: "/images/home/FotoCarrousel07.jpeg",
    alt: "Foto del carrusel Coral BJJ 07",
  },
  {
    src: "/images/home/FotoCarrousel08.jpeg",
    alt: "Foto del carrusel Coral BJJ 08",
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
    <section className="relative min-h-[60vh] overflow-hidden rounded-3xl border border-white/10 md:min-h-[66vh]">
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
        className="relative z-10 flex min-h-[60vh] flex-col justify-end gap-5 p-8 md:min-h-[66vh] md:p-14"
        initial={{ opacity: 0, y: 24 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <p className="max-w-3xl text-lg text-zinc-100 md:text-2xl">
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
