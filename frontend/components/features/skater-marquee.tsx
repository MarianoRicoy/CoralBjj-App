"use client";

import { motion } from "framer-motion";
import Image from "next/image";

interface SkaterMarqueeProps {
  speed?: number;
  direction?: "left" | "right";
  size?: number;
}

export function SkaterMarquee({ 
  speed = 10, 
  direction = "left",
  size = 120 
}: SkaterMarqueeProps) {
  const isLeft = direction === "left";

  return (
    <div className="relative w-full overflow-hidden py-10 pointer-events-none select-none">
      <div className="flex w-full">
        <motion.div
          initial={{ x: isLeft ? "0%" : "-100%" }}
          animate={{ x: isLeft ? "-100%" : "0%" }}
          transition={{
            duration: speed,
            ease: "linear",
            repeat: Infinity,
          }}
          className="flex whitespace-nowrap min-w-full"
        >
          {/* Renderizamos múltiples instancias para asegurar el loop infinito sin saltos */}
          {[...Array(4)].map((_, i) => (
            <div 
              key={i} 
              className="flex items-center justify-around min-w-[50vw] px-10"
            >
              <motion.div
                animate={{ 
                  y: [0, -4, 0],
                  rotate: [0, -1, 1, 0]
                }}
                transition={{
                  duration: 0.6,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="relative"
                style={{ 
                  width: size, 
                  height: size * 0.8,
                  filter: "brightness(0) invert(1)" // Asegura que se vea blanco sobre el fondo oscuro
                }}
              >
                <Image
                  src="/surfer.PNG"
                  alt="Skater Skeleton"
                  fill
                  className="object-contain"
                  priority
                />
              </motion.div>
            </div>
          ))}
        </motion.div>
        
        {/* Segunda instancia idéntica para el loop infinito perfecto */}
        <motion.div
          initial={{ x: isLeft ? "0%" : "-100%" }}
          animate={{ x: isLeft ? "-100%" : "0%" }}
          transition={{
            duration: speed,
            ease: "linear",
            repeat: Infinity,
          }}
          className="flex whitespace-nowrap min-w-full"
        >
          {[...Array(4)].map((_, i) => (
            <div 
              key={i} 
              className="flex items-center justify-around min-w-[50vw] px-10"
            >
              <motion.div
                animate={{ 
                  y: [0, -4, 0],
                  rotate: [0, -1, 1, 0]
                }}
                transition={{
                  duration: 0.6,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="relative"
                style={{ 
                  width: size, 
                  height: size * 0.8,
                  filter: "brightness(0) invert(1)" 
                }}
              >
                <Image
                  src="/surfer.PNG"
                  alt="Skater Skeleton"
                  fill
                  className="object-contain"
                  priority
                />
              </motion.div>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
