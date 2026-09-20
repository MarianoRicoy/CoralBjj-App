"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";

import { PLACEHOLDER_BASE64 } from "@/lib/media";

const FOTOS_HOME = [
  {
    src: "/images/home/FotoCarrousel01.jpeg",
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
    src: "/images/home/FotoCarrousel04.jpeg",
    alt: "Foto del carrusel Coral BJJ 04",
  },
  {
    src: "/images/home/FotoCarrousel05.jpeg",
    alt: "Foto del carrusel Coral BJJ 05",
    position: "top",
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
  const [pausado, setPausado] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  const totalSlides = useMemo(() => FOTOS_HOME.length, []);

  // Autoplay accesible: deshabilitado con reduced-motion o si el usuario hace hover/focus
  useEffect(() => {
    if (shouldReduceMotion || pausado) {
      return;
    }

    const timer = window.setInterval(() => {
      setSlideActivo((prev) => (prev + 1) % totalSlides);
    }, 4500);

    return () => window.clearInterval(timer);
  }, [totalSlides, shouldReduceMotion, pausado]);

  function siguienteSlide() {
    setSlideActivo((prev) => (prev + 1) % totalSlides);
  }

  function anteriorSlide() {
    setSlideActivo((prev) => (prev - 1 + totalSlides) % totalSlides);
  }

  function alPresionarTeclas(evento: React.KeyboardEvent) {
    if (evento.key === "ArrowLeft") {
      evento.preventDefault();
      anteriorSlide();
    } else if (evento.key === "ArrowRight") {
      evento.preventDefault();
      siguienteSlide();
    }
  }

  return (
    <section
      aria-label="Galería destacada de Coral BJJ"
      aria-roledescription="carrusel"
      className="relative h-[100svh] w-full overflow-hidden focus-visible:outline-none"
      onBlur={() => setPausado(false)}
      onFocus={() => setPausado(true)}
      onKeyDown={alPresionarTeclas}
      onMouseEnter={() => setPausado(true)}
      onMouseLeave={() => setPausado(false)}
      tabIndex={0}
    >
      <div id="hero-carrusel-slides" aria-live="off" className="absolute inset-0">
        {FOTOS_HOME.map((foto, index) => (
          <div
            key={foto.src}
            aria-hidden={slideActivo !== index}
            aria-label={`Diapositiva ${index + 1} de ${totalSlides}`}
            aria-roledescription="diapositiva"
            role="group"
            className={`absolute inset-0 ${
              shouldReduceMotion ? "transition-none" : "transition-opacity duration-700"
            } ${slideActivo === index ? "opacity-100" : "pointer-events-none opacity-0"}`}
          >
            <Image
              alt={foto.alt}
              blurDataURL={PLACEHOLDER_BASE64}
              className={`h-full w-full object-cover ${foto.position === "top" ? "object-top" : ""}`}
              fill
              placeholder="blur"
              priority={index === 0}
              sizes="100vw"
              src={foto.src}
            />
          </div>
        ))}
      </div>

      <div className="absolute inset-0 bg-gradient-to-r from-black/45 via-black/20 to-black/10 pointer-events-none" />

      <div className="absolute right-4 bottom-4 z-20 flex items-center gap-2 md:right-6 md:bottom-6">
        <button
          aria-controls="hero-carrusel-slides"
          aria-label="Diapositiva anterior"
          className="rounded-full border border-white/30 bg-black/30 p-2 text-white transition-colors hover:bg-black/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f2685d]"
          onClick={anteriorSlide}
          type="button"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
        <button
          aria-controls="hero-carrusel-slides"
          aria-label="Diapositiva siguiente"
          className="rounded-full border border-white/30 bg-black/30 p-2 text-white transition-colors hover:bg-black/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f2685d]"
          onClick={siguienteSlide}
          type="button"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>

      <motion.div
        className="relative z-10 flex h-[100svh] flex-col justify-end gap-5 p-8 md:p-14 pointer-events-none"
        initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
        transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.7, ease: "easeOut" }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <p className="max-w-3xl text-lg text-zinc-100 md:text-2xl">
          Formamos atletas y personas con una metodología clara: disciplina, detalle y comunidad.
        </p>

        <div
          role="tablist"
          aria-label="Diapositivas del carrusel"
          className="mt-4 flex items-center gap-2 pointer-events-auto"
        >
          {FOTOS_HOME.map((foto, index) => (
            <button
              key={foto.src}
              role="tab"
              aria-selected={slideActivo === index}
              aria-controls="hero-carrusel-slides"
              aria-label={`Ir a la diapositiva ${index + 1} de ${totalSlides}`}
              className={`h-2.5 rounded-full transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f2685d] ${
                slideActivo === index ? "w-7 bg-white" : "w-2.5 bg-white/50"
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
