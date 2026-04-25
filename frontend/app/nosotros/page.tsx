import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Nosotros",
  description: "Conocé el manifiesto y la filosofía de Coral BJJ Studio.",
};

export default function NosotrosPage() {
  return (
    <main className="relative flex-1 overflow-x-hidden">
      <div className="relative mx-auto max-w-[90rem] px-6 py-20 md:py-32 lg:py-40">
        <div className="flex flex-col gap-16 md:gap-24 text-left">
          
          {/* Bloque de texto Manifiesto con la tipografía Psyche Wide (font-primary) */}
          <div className="space-y-16 md:space-y-24">
            
            {/* Introducción */}
            <div className="space-y-6 md:space-y-10">
              <h1 className="text-4xl leading-[1.1] font-primary text-white md:text-7xl lg:text-[6rem] uppercase tracking-tight">
                Coral no es solo una academia de Jiu Jitsu. <br />
                Es la materialización de un estilo de vida.
              </h1>
              
              <p className="text-2xl md:text-5xl lg:text-[4rem] font-primary text-white uppercase leading-[1.2] tracking-tight max-w-[85rem]">
                Nace del vínculo entre el entrenamiento, el mar y la forma en que elegimos vivir. 
                Creemos en el Jiu Jitsu como una herramienta real de transformación: física, mental y personal. 
                Pero también entendemos que eso no sucede aislado, sino en un entorno, en una cultura, en una manera de hacer las cosas.
              </p>
            </div>

            {/* Ralph Gracie Section */}
            <div className="space-y-6 md:space-y-10 border-l-4 md:border-l-8 border-[#f2685d] pl-8 md:pl-16">
              <p className="text-2xl md:text-5xl lg:text-[4rem] font-primary text-white uppercase leading-[1.2] tracking-tight">
                En el plano técnico y formativo, somos filial autorizada de <span className="text-[#f2685d]">Ralph Gracie Mar del Plata</span>, 
                manteniendo un estándar claro, una línea y una forma de entender el Jiu Jitsu.
              </p>
            </div>

            {/* Core Values / Tripletas */}
            <div className="space-y-6 md:space-y-10">
              <div className="text-3xl md:text-6xl lg:text-[5rem] font-primary text-white uppercase leading-[1.1] tracking-tight space-y-4">
                <p>Coral es entrenamiento, pero también es comunidad.</p>
                <p>Es disciplina, pero también es expresión.</p>
                <p>Es tatami, pero también es agua, arte y territorio.</p>
              </div>
            </div>

            {/* Quality Statement */}
            <div className="space-y-6 md:space-y-10">
              <p className="text-2xl md:text-5xl lg:text-[4rem] font-primary text-white uppercase leading-[1.2] tracking-tight">
                Trabajamos con una lógica clara: calidad sobre cantidad, procesos reales sobre resultados rápidos, 
                pertenencia sobre consumo. Cada persona que entrena acá forma parte de algo más grande que una clase.
              </p>
            </div>

            {/* Final Statement */}
            <div className="space-y-8 md:space-y-12 pt-10">
              <p className="text-4xl md:text-7xl lg:text-[6.5rem] font-primary text-[#f2685d] uppercase leading-none tracking-tighter">
                Esto no es un servicio más.
              </p>
              <p className="text-3xl md:text-6xl lg:text-[5.5rem] font-primary text-white uppercase leading-none tracking-tight">
                Es un espacio donde se construye carácter, identidad y camino propio.
              </p>
              <p className="text-2xl md:text-5xl lg:text-[4.5rem] font-primary text-zinc-500 uppercase leading-[1.1] tracking-tight">
                Coral es para los que entienden que el Jiu Jitsu no termina cuando salís del tatami
              </p>
            </div>

          </div>

          {/* Cierre / Firma visual sutil */}
          <div className="pt-20">
            <div className="h-[2px] w-40 md:w-64 bg-[#f2685d]" />
          </div>
        </div>
      </div>
    </main>
  );
}
