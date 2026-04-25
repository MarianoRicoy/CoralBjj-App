import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Nosotros",
  description: "Conocé el manifiesto y la filosofía de Coral BJJ Studio.",
};

export default function NosotrosPage() {
  return (
    <main className="relative flex-1 overflow-x-hidden">
      <div className="relative mx-auto max-w-4xl px-6 py-20 md:py-28 lg:py-36">
        <div className="flex flex-col gap-14 md:gap-20 text-left">

          {/* Título principal — único uso de la tipografía hardcore (Psyche Wide) */}
          <div className="space-y-6">
            <h1 className="font-primary text-3xl leading-[1.15] text-white md:text-5xl lg:text-6xl uppercase tracking-tight">
              Coral no es solo una academia de Jiu Jitsu.
            </h1>
            <p className="font-coralbold text-2xl leading-[1.3] text-zinc-300 md:text-4xl">
              Es la materialización de un estilo de vida.
            </p>
          </div>

          {/* Cuerpo del manifiesto - Satoshi Bold (la fuente seria) */}
          <div className="space-y-12 md:space-y-16">

            <p className="font-coralbold text-lg md:text-xl leading-relaxed text-zinc-100 tracking-wide">
              Nace del vínculo entre el entrenamiento, el mar y la forma en que elegimos vivir. 
              Creemos en el Jiu Jitsu como una herramienta real de transformación: física, mental y personal. 
              Pero también entendemos que eso no sucede aislado, sino en un entorno, en una cultura, en una manera de hacer las cosas.
            </p>

            {/* Ralph Gracie - destacado sutil */}
            <div className="border-l-2 border-[#f2685d] pl-6 md:pl-8 py-2">
              <p className="font-coralbold text-lg md:text-xl leading-relaxed text-zinc-100 tracking-wide">
                En el plano técnico y formativo, somos filial autorizada de{" "}
                <span className="text-[#f2685d]">Ralph Gracie Mar del Plata</span>, 
                manteniendo un estándar claro, una línea y una forma de entender el Jiu Jitsu.
              </p>
            </div>

            {/* Tripletas - Satoshi Bold con tracking generoso para peso visual */}
            <div className="space-y-4 py-4">
              <p className="font-coralbold text-xl md:text-2xl text-white leading-relaxed">
                Coral es entrenamiento, pero también es comunidad.
              </p>
              <p className="font-coralbold text-xl md:text-2xl text-white leading-relaxed">
                Es disciplina, pero también es expresión.
              </p>
              <p className="font-coralbold text-xl md:text-2xl text-white leading-relaxed">
                Es tatami, pero también es agua, arte y territorio.
              </p>
            </div>

            <p className="font-coralbold text-lg md:text-xl leading-relaxed text-zinc-100 tracking-wide">
              Trabajamos con una lógica clara: calidad sobre cantidad, procesos reales sobre resultados rápidos, 
              pertenencia sobre consumo. Cada persona que entrena acá forma parte de algo más grande que una clase.
            </p>

            {/* Cierre - jerarquía decreciente con acento hardcore al final */}
            <div className="space-y-6 pt-8 border-t border-white/10">
              <p className="font-primary text-2xl md:text-3xl text-[#f2685d] uppercase tracking-tight">
                Esto no es un servicio más.
              </p>
              <p className="font-coralbold text-xl md:text-2xl text-white leading-relaxed">
                Es un espacio donde se construye carácter, identidad y camino propio.
              </p>
              <p className="font-tertiary text-base md:text-lg text-zinc-400 leading-relaxed">
                Coral es para los que entienden que el Jiu Jitsu no termina cuando salís del tatami.
              </p>
            </div>

          </div>

        </div>
      </div>
    </main>
  );
}
