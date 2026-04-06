"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

import { FOTOS_GALERIA, PLACEHOLDER_BASE64 } from "@/lib/media";

export function GaleriaPro() {
  return (
    <section aria-labelledby="galeria" className="space-y-6">
      <div className="space-y-2 text-center">
        <h2 id="galeria" className="text-3xl font-primary text-white md:text-4xl">
          <Link className="transition-colors hover:text-[#f2685d]" href="/galeria">
            Galería Coral
          </Link>
        </h2>
        <p className="text-sm text-zinc-400 md:text-base">
          Nuestra historia, la energía del estudio y la comunidad que da vida a Coral BJJ.
        </p>
      </div>

      <div className="grid auto-rows-[180px] grid-cols-2 gap-3 md:auto-rows-[240px] md:grid-cols-4 md:gap-4">
        {FOTOS_GALERIA.map((foto, indice) => (
          <motion.figure
            key={foto.id}
            className={`group relative overflow-hidden rounded-2xl border border-white/10 ${
              indice === 0 || indice === 3 ? "col-span-2" : "col-span-1"
            }`}
            initial={{ opacity: 0, y: 18 }}
            transition={{ delay: indice * 0.08, duration: 0.5 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
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
          </motion.figure>
        ))}
      </div>
    </section>
  );
}
