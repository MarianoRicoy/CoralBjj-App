import Image from "next/image";
import { HORARIOS_SEMANALES } from "@/services/horarios.service";

const ORDEN_DIAS = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"] as const;

// Mapeo de fotos para cada día para darle variedad visual
const FOTOS_DIAS: Record<string, string> = {
  "Lunes": "/horarios/Copia de IMG_9933.jpeg",
  "Martes": "/horarios/Copia de IMG_9946.jpeg",
  "Miércoles": "/horarios/Copia de IMG_9972.jpeg",
  "Jueves": "/horarios/Copia de IMG_9985.jpeg",
  "Viernes": "/horarios/Copia de IMG_9986.jpeg",
  "Sábado": "/horarios/Copia de IMG_9989.jpeg",
};

export function HorariosGrid() {
  const bloquesPorDia = ORDEN_DIAS.map((dia) => ({
    dia,
    bloques: HORARIOS_SEMANALES.filter((bloque) => bloque.dia === dia),
  })).filter((grupo) => grupo.bloques.length > 0);

  return (
    <section aria-labelledby="horarios" className="space-y-12 py-10">
      <div className="space-y-4 text-center">
        <h2 id="horarios" className="text-4xl font-primary text-white md:text-6xl uppercase tracking-tight">
          Grilla de horarios
        </h2>
        <p className="mx-auto max-w-2xl text-base font-medium text-zinc-400 uppercase tracking-widest md:text-lg">
          Encontrá tu turno ideal y entrená con instructores especializados.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {bloquesPorDia.map((grupo) => (
          <article
            key={grupo.dia}
            className="group relative overflow-hidden rounded-[2rem] border border-white/10 bg-zinc-950/40 p-8 shadow-2xl transition-all duration-500 hover:-translate-y-2 hover:border-white/20 hover:shadow-[#f2685d]/5"
          >
            {/* Foto de fondo sutil */}
            <div className="absolute inset-0 z-0 overflow-hidden">
              <Image 
                src={FOTOS_DIAS[grupo.dia]} 
                alt={grupo.dia}
                fill
                className="object-cover opacity-20 grayscale transition-all duration-700 group-hover:scale-110 group-hover:opacity-30 group-hover:grayscale-0"
              />
              {/* Overlay para legibilidad */}
              <div className="absolute inset-0 bg-gradient-to-br from-zinc-950/90 via-zinc-950/60 to-transparent backdrop-blur-[2px]" />
            </div>

            {/* Contenido */}
            <div className="relative z-10 space-y-8">
              <p className="text-3xl font-primary text-white uppercase tracking-wider">{grupo.dia}</p>

              <div className="space-y-4">
                {grupo.bloques.map((bloque) => {
                  const esJiuJitsu = bloque.clase.toLowerCase().includes("jiu jitsu") || bloque.clase.toLowerCase().includes("calaveritas");
                  
                  return (
                    <div key={bloque.id} className="flex items-center gap-4 group/item">
                      {/* Indicador visual de tipo de clase */}
                      <div className={`h-12 w-1 rounded-full transition-all duration-300 ${esJiuJitsu ? 'bg-[#f2685d] shadow-[0_0_10px_#f2685d]' : 'bg-white shadow-[0_0_10px_white]'}`} />
                      
                      <div className="flex flex-col">
                        <span className="text-sm font-bold text-[#f2685d] uppercase tracking-[0.15em]">
                          {bloque.hora}
                        </span>
                        <span className="text-lg font-bold text-white uppercase tracking-tight transition-colors group-hover/item:text-zinc-200">
                          {bloque.clase}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
