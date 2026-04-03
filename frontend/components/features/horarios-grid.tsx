import { CalendarClock, UserRound } from "lucide-react";

import { HORARIOS_SEMANALES } from "@/services/horarios.service";
import { Badge } from "@/components/ui/badge";

export function HorariosGrid() {
  return (
    <section aria-labelledby="horarios" className="space-y-6">
      <div className="space-y-2">
        <h2 id="horarios" className="text-3xl font-primary text-white md:text-4xl">
          Grilla de horarios
        </h2>
        <p className="text-sm text-zinc-400 md:text-base">
          Encontrá tu turno ideal y entrená con instructores especializados.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {HORARIOS_SEMANALES.map((bloque) => (
          <article
            key={bloque.id}
            className="rounded-2xl border border-white/10 bg-zinc-900/60 p-5 backdrop-blur-sm"
          >
            <div className="mb-3 flex items-center justify-between">
              <p className="text-lg font-semibold text-white">{bloque.dia}</p>
              <Badge variant="secondary" className="bg-cyan-200/20 text-cyan-100">
                {bloque.nivel}
              </Badge>
            </div>
            <p className="mb-3 text-xl font-secondary text-cyan-100">{bloque.clase}</p>
            <div className="space-y-2 text-sm text-zinc-300">
              <p className="flex items-center gap-2">
                <CalendarClock className="h-4 w-4" aria-hidden="true" />
                {bloque.hora} hs
              </p>
              <p className="flex items-center gap-2">
                <UserRound className="h-4 w-4" aria-hidden="true" />
                {bloque.instructor}
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
