import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Nosotros",
  description: "Conocé el manifiesto y la filosofía de Coral BJJ Studio.",
};

export default function NosotrosPage() {
  return (
    <main className="relative flex-1 overflow-x-hidden">
      <div className="relative mx-auto max-w-3xl px-6 py-20 md:py-28 lg:py-36">

        <h1 className="font-primary mb-12 text-3xl uppercase tracking-tight text-white md:mb-16 md:text-4xl">
          Nosotros
        </h1>

        <div className="space-y-8 font-tertiary text-lg leading-[1.8] text-zinc-200 md:text-xl">
          <p>
            Coral no es solo una academia de Jiu Jitsu. Es la materialización de un estilo de vida.
          </p>

          <p>
            Nace del vínculo entre el entrenamiento, el mar y la forma en que elegimos vivir.
            Creemos en el Jiu Jitsu como una herramienta real de transformación: física, mental y personal.
            Pero también entendemos que eso no sucede aislado, sino en un entorno, en una cultura, en una manera de hacer las cosas.
          </p>

          <p>
            En el plano técnico y formativo, somos filial autorizada de Ralph Gracie Mar del Plata,
            manteniendo un estándar claro, una línea y una forma de entender el Jiu Jitsu.
          </p>

          <p>
            Coral es entrenamiento, pero también es comunidad.
            Es disciplina, pero también es expresión.
            Es tatami, pero también es agua, arte y territorio.
          </p>

          <p>
            Trabajamos con una lógica clara: calidad sobre cantidad, procesos reales sobre resultados rápidos,
            pertenencia sobre consumo. Cada persona que entrena acá forma parte de algo más grande que una clase.
          </p>

          <p>
            Esto no es un servicio más. Es un espacio donde se construye carácter, identidad y camino propio.
          </p>

          <p className="text-zinc-400">
            Coral es para los que entienden que el Jiu Jitsu no termina cuando salís del tatami.
          </p>
        </div>

      </div>
    </main>
  );
}
