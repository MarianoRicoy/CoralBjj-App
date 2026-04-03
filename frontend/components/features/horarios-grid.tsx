import { HORARIOS_SEMANALES } from "@/services/horarios.service";

const ORDEN_DIAS = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"] as const;

export function HorariosGrid() {
  const bloquesPorDia = ORDEN_DIAS.map((dia) => ({
    dia,
    bloques: HORARIOS_SEMANALES.filter((bloque) => bloque.dia === dia),
  })).filter((grupo) => grupo.bloques.length > 0);

  return (
    <section aria-labelledby="horarios" className="space-y-6">
      <div className="space-y-2 text-center">
        <h2 id="horarios" className="text-3xl font-primary text-white md:text-4xl">
          Grilla de horarios
        </h2>
        <p className="text-sm text-zinc-400 md:text-base">
          Encontrá tu turno ideal y entrená con instructores especializados.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {bloquesPorDia.map((grupo) => (
          <article
            key={grupo.dia}
            className="rounded-2xl border border-white/10 bg-zinc-900/60 p-5 backdrop-blur-sm"
          >
            <p className="mb-4 text-lg font-semibold text-white">{grupo.dia}</p>

            <div className="space-y-2 text-sm text-zinc-200 md:text-base">
              {grupo.bloques.map((bloque) => (
                <p key={bloque.id}>
                  <span className="font-semibold text-cyan-100">{bloque.hora}</span> {bloque.clase}
                </p>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
