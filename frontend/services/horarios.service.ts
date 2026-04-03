import type { BloqueHorario } from "@/types/horario";

export const HORARIOS_SEMANALES: BloqueHorario[] = [
  {
    id: "lun-0730",
    dia: "Lunes",
    hora: "07:30",
    clase: "Fundamentos BJJ",
    instructor: "Prof. Martín Acosta",
    nivel: "Inicial",
  },
  {
    id: "lun-1930",
    dia: "Lunes",
    hora: "19:30",
    clase: "No-Gi Competencia",
    instructor: "Prof. Nicolás Díaz",
    nivel: "Avanzado",
  },
  {
    id: "mie-1830",
    dia: "Miércoles",
    hora: "18:30",
    clase: "Drills y Pasajes",
    instructor: "Prof. Sofía Medina",
    nivel: "Intermedio",
  },
  {
    id: "jue-2030",
    dia: "Jueves",
    hora: "20:30",
    clase: "Sparring Técnico",
    instructor: "Prof. Lucía Ferraro",
    nivel: "Mixto",
  },
  {
    id: "sab-1030",
    dia: "Sábado",
    hora: "10:30",
    clase: "Open Mat Guiado",
    instructor: "Equipo Coral",
    nivel: "Mixto",
  },
];
