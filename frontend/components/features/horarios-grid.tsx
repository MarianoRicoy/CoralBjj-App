"use client";

import { X } from "lucide-react";
import { useEffect, useState } from "react";

import { HORARIOS_SEMANALES } from "@/services/horarios.service";
import type { BloqueHorario } from "@/types/horario";

const ORDEN_DIAS = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"] as const;

type GrupoDia = {
  dia: string;
  bloques: BloqueHorario[];
};

function esJiuJitsu(clase: string) {
  const texto = clase.toLowerCase();
  return texto.includes("jiu jitsu") || texto.includes("calaveritas");
}

function ListaBloques({ bloques, grande = false }: { bloques: BloqueHorario[]; grande?: boolean }) {
  return (
    <div className={grande ? "space-y-6" : "space-y-4"}>
      {bloques.map((bloque) => (
        <div key={bloque.id} className="flex items-center gap-4 group/item">
          <div
            className={`${grande ? "h-16" : "h-12"} w-1 rounded-full transition-all duration-300 ${
              esJiuJitsu(bloque.clase)
                ? "bg-[#f2685d] shadow-[0_0_10px_#f2685d]"
                : "bg-white shadow-[0_0_10px_white]"
            }`}
          />
          <div className="flex flex-col">
            <span
              className={`${grande ? "text-base" : "text-sm"} font-bold text-[#f2685d] uppercase tracking-[0.15em]`}
            >
              {bloque.hora}
            </span>
            <span
              className={`${grande ? "text-2xl" : "text-lg"} font-bold text-white uppercase tracking-tight transition-colors group-hover/item:text-zinc-200`}
            >
              {bloque.clase}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}

export function HorariosGrid() {
  const bloquesPorDia: GrupoDia[] = ORDEN_DIAS.map((dia) => ({
    dia,
    bloques: HORARIOS_SEMANALES.filter((bloque) => bloque.dia === dia),
  })).filter((grupo) => grupo.bloques.length > 0);

  const [diaSeleccionado, setDiaSeleccionado] = useState<GrupoDia | null>(null);

  useEffect(() => {
    if (!diaSeleccionado) {
      return;
    }

    function alPresionar(evento: KeyboardEvent) {
      if (evento.key === "Escape") {
        setDiaSeleccionado(null);
      }
    }

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", alPresionar);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", alPresionar);
    };
  }, [diaSeleccionado]);

  return (
    <section aria-labelledby="horarios" className="space-y-12 py-10">
      <div className="space-y-4 text-center">
        <h2 id="horarios" className="text-4xl font-primary text-white md:text-6xl uppercase tracking-tight">
          horarios
        </h2>
        <p className="mx-auto max-w-2xl text-base font-medium text-zinc-400 uppercase tracking-widest md:text-lg">
          Encontrá tu turno ideal y entrená con instructores especializados.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {bloquesPorDia.map((grupo) => (
          <button
            key={grupo.dia}
            type="button"
            onClick={() => setDiaSeleccionado(grupo)}
            aria-label={`Ver horarios de ${grupo.dia}`}
            className="group relative cursor-pointer overflow-hidden rounded-[2rem] border border-white/10 bg-black/50 p-8 text-left shadow-2xl shadow-black/40 backdrop-blur-xl transition-all duration-500 hover:-translate-y-2 hover:border-white/20 hover:shadow-[#f2685d]/5"
          >
            <div className="relative z-10 space-y-8">
              <p className="text-3xl font-primary text-white uppercase tracking-wider">{grupo.dia}</p>
              <ListaBloques bloques={grupo.bloques} />
            </div>
          </button>
        ))}
      </div>

      {diaSeleccionado ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`Horarios de ${diaSeleccionado.dia}`}
          onClick={() => setDiaSeleccionado(null)}
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
        >
          <div
            onClick={(evento) => evento.stopPropagation()}
            className="relative max-h-[85vh] w-full max-w-2xl overflow-y-auto rounded-[2rem] border border-white/10 bg-black/50 p-10 shadow-2xl shadow-black/40 backdrop-blur-xl"
          >
            <button
              type="button"
              onClick={() => setDiaSeleccionado(null)}
              aria-label="Cerrar"
              className="absolute right-6 top-6 text-white/80 transition-colors hover:text-white"
            >
              <X className="h-8 w-8" />
            </button>

            <div className="space-y-8">
              <p className="text-5xl font-primary text-white uppercase tracking-wider">{diaSeleccionado.dia}</p>
              <ListaBloques bloques={diaSeleccionado.bloques} grande />
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
}
